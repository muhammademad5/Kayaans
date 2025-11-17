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

const tabChips = document.querySelectorAll('.tab-chip');
const cardSubtitle = document.querySelector('.books-card-head .card-subtitle');

tabChips.forEach((chip) => {
    chip.addEventListener('click', () => {
        tabChips.forEach((item) => item.classList.remove('active'));
        chip.classList.add('active');

        if (cardSubtitle && chip.dataset.label) {
            cardSubtitle.textContent = `عرض ${chip.dataset.label} للكتب الصوتية`;
        }
    });
});

const filterSelects = document.querySelectorAll('.filter-select');
const tableRows = document.querySelectorAll('.books-table tbody tr');
const emptyState = document.getElementById('noResults');
const filterState = {
    period: 'all',
    platform: 'all'
};

function applyTableFilters() {
    if (!tableRows.length) {
        return;
    }

    let visibleCount = 0;

    tableRows.forEach((row) => {
        const periods = (row.dataset.periods || '')
            .split(',')
            .map((value) => value.trim())
            .filter(Boolean);
        const platforms = (row.dataset.platforms || '')
            .split(',')
            .map((value) => value.trim())
            .filter(Boolean);

        const matchPeriod = filterState.period === 'all' || periods.includes(filterState.period);
        const matchPlatform = filterState.platform === 'all' || platforms.includes(filterState.platform);
        const shouldShow = matchPeriod && matchPlatform;

        row.classList.toggle('hidden-row', !shouldShow);

        if (shouldShow) {
            visibleCount += 1;
        }
    });

    if (emptyState) {
        emptyState.style.display = visibleCount ? 'none' : 'flex';
    }
}

function closeAllFilterSelects(exception) {
    filterSelects.forEach((select) => {
        if (select !== exception) {
            select.classList.remove('open');
        }
    });
}

filterSelects.forEach((select) => {
    const trigger = select.querySelector('.filter-trigger');
    const options = select.querySelectorAll('.filter-menu li');
    const label = trigger.querySelector('.filter-label');
    const filterType = select.dataset.filter;

    trigger.addEventListener('click', (event) => {
        event.stopPropagation();
        const isOpen = select.classList.contains('open');
        closeAllFilterSelects();
        if (!isOpen) {
            select.classList.add('open');
        }
    });

    options.forEach((option) => {
        option.addEventListener('click', () => {
            options.forEach((item) => item.classList.remove('active'));
            option.classList.add('active');
            label.textContent = option.textContent;
            if (filterType && option.dataset.value) {
                filterState[filterType] = option.dataset.value;
                applyTableFilters();
            }
            select.classList.remove('open');
        });
    });
});

const calendarWrapper = document.querySelector('.calendar-wrapper');
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
    if (!dateDropdown || !dateMonthLabel || !dateDays) {
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

document.addEventListener('click', (event) => {
    const isFilterClick = event.target.closest('.filter-select');
    if (!isFilterClick) {
        closeAllFilterSelects();
    }

    const isCalendarClick = event.target.closest('.calendar-wrapper');
    if (!isCalendarClick) {
        closeDateDropdown();
    }
});

applyTableFilters();

