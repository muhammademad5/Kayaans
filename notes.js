const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const menuToggle = document.getElementById('menuToggle');
const sidebarClose = document.getElementById('sidebarClose');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function openSidebar() {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (sidebarToggle) {
    sidebarToggle.addEventListener('click', openSidebar);
}

if (menuToggle) {
    menuToggle.addEventListener('click', openSidebar);
}

if (sidebarClose) {
    sidebarClose.addEventListener('click', closeSidebar);
}

if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && sidebar.classList.contains('open')) {
        closeSidebar();
    }
});

window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

const datePickerToggle = document.getElementById('datePickerToggle');
const dateDropdown = document.getElementById('dateDropdown');
const dateMonthLabel = document.getElementById('dateMonthLabel');
const dateDays = document.getElementById('dateDays');
const navButtons = document.querySelectorAll('.date-nav-btn');

let currentCalendarDate = new Date();
let selectedCalendarDate = new Date();

function closeDateDropdown() {
    if (dateDropdown) {
        dateDropdown.classList.remove('open');
    }
}

function renderCalendar(date) {
    if (!dateDropdown || !dateDays || !dateMonthLabel) {
        return;
    }

    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const startPadding = firstDay.getDay();
    const totalCells = Math.ceil((startPadding + lastDay.getDate()) / 7) * 7;

    dateMonthLabel.textContent = date.toLocaleString('en-US', {
        month: 'long',
        year: 'numeric'
    });

    dateDays.innerHTML = '';

    for (let i = 0; i < totalCells; i += 1) {
        const dayButton = document.createElement('button');
        dayButton.type = 'button';
        dayButton.className = 'date-day';

        if (i < startPadding) {
            const prevDay = prevLastDay.getDate() - (startPadding - i - 1);
            dayButton.textContent = prevDay;
            dayButton.classList.add('muted');
            dayButton.disabled = true;
        } else {
            const dayNumber = i - startPadding + 1;
            if (dayNumber > lastDay.getDate()) {
                dayButton.textContent = dayNumber - lastDay.getDate();
                dayButton.classList.add('muted');
                dayButton.disabled = true;
            } else {
                dayButton.textContent = dayNumber;
                const isSelected = selectedCalendarDate.getFullYear() === year
                    && selectedCalendarDate.getMonth() === month
                    && selectedCalendarDate.getDate() === dayNumber;

                if (isSelected) {
                    dayButton.classList.add('selected');
                }

                dayButton.addEventListener('click', () => {
                    selectedCalendarDate = new Date(year, month, dayNumber);
                    renderCalendar(date);
                    closeDateDropdown();
                });
            }
        }

        dateDays.appendChild(dayButton);
    }
}

if (datePickerToggle && dateDropdown) {
    renderCalendar(currentCalendarDate);

    datePickerToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        dateDropdown.classList.toggle('open');
    });
}

navButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        const direction = button.dataset.dir === 'next' ? 1 : -1;
        currentCalendarDate = new Date(
            currentCalendarDate.getFullYear(),
            currentCalendarDate.getMonth() + direction,
            1
        );
        renderCalendar(currentCalendarDate);
    });
});

const noteFilters = document.querySelectorAll('.note-filter');
const noteCards = document.querySelectorAll('.note-card');
const emptyState = document.getElementById('notesEmptyState');

function applyNoteFilter(category) {
    let visibleCount = 0;
    noteCards.forEach((card) => {
        const match = category === 'all' || card.dataset.category === category;
        card.classList.toggle('hidden', !match);
        if (match) {
            visibleCount += 1;
        }
    });

    if (emptyState) {
        emptyState.classList.toggle('visible', visibleCount === 0);
    }
}

noteFilters.forEach((button) => {
    button.addEventListener('click', () => {
        noteFilters.forEach((filter) => filter.classList.remove('active'));
        button.classList.add('active');
        const category = button.dataset.filter || 'all';
        applyNoteFilter(category);
    });
});

document.addEventListener('click', (event) => {
    const isCalendarClick = event.target.closest('.calendar-wrapper');
    if (!isCalendarClick) {
        closeDateDropdown();
    }
});

applyNoteFilter('all');

