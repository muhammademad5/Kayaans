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

