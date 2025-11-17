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

sidebarToggle?.addEventListener('click', openSidebar);
menuToggle?.addEventListener('click', openSidebar);
sidebarClose?.addEventListener('click', closeSidebar);
sidebarOverlay?.addEventListener('click', closeSidebar);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && sidebar.classList.contains('open')) {
        closeSidebar();
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeSidebar();
    }
});

const revenueLineCtx = document.getElementById('revenueLineChart');
if (revenueLineCtx) {
    new Chart(revenueLineCtx, {
        type: 'line',
        data: {
            labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
            datasets: [{
                label: 'الإيرادات ($)',
                data: [2000, 2300, 2600, 2800, 3000, 3200],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255,255,255,0.1)' }
                },
                x: {
                    grid: { color: 'rgba(255,255,255,0.05)' }
                }
            }
        }
    });
}

const listenedBooksCtx = document.getElementById('listenedBooksChart');
if (listenedBooksCtx) {
    new Chart(listenedBooksCtx, {
        type: 'bar',
        data: {
            labels: ['فن اللامبالاة', 'العادات الذرية', 'قوة الآن', 'التفكير السريع والبطيء'],
            datasets: [{
                label: 'دقائق الاستماع',
                data: [480, 420, 360, 240],
                backgroundColor: '#3b82f6',
                borderRadius: 6
            }]
        },
        options: {
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255,255,255,0.1)' }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
}

const topSellingCtx = document.getElementById('topSellingChart');
if (topSellingCtx) {
    new Chart(topSellingCtx, {
        type: 'bar',
        data: {
            labels: ['فن اللامبالاة', 'العادات الذرية', 'قوة الآن', 'التفكير السريع والبطيء'],
            datasets: [{
                label: 'الإيرادات ($)',
                data: [2200, 1800, 1500, 1000],
                backgroundColor: ['#fbbf24', '#facc15', '#22c55e', '#60a5fa'],
                borderRadius: 6
            }]
        },
        options: {
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255,255,255,0.1)' }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
}

