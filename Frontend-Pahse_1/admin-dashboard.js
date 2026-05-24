/* =====================================================
   ADMIN DASHBOARD — admin-dashboard.js
   DoctorsCares Admin Control Panel Logic
===================================================== */

/* ── Date ─────────────────────────────────────────── */
const today = new Date();
const dateEl = document.getElementById('today-date');
if (dateEl) {
    dateEl.textContent = today.toLocaleDateString('en-EG', {
        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
    });
}

/* ── Section Navigation ───────────────────────────── */
const sectionTitles = {
    overview: 'Dashboard',
    doctors: 'Doctor Management',
    patients: 'Patient Management',
    appointments: 'Appointments',
    payments: 'Payments & Finance',
    categories: 'Content & Categories',
    reports: 'Reports & Analytics',
    notifications: 'Notifications',
    settings: 'System Settings',
};

function showSection(name) {
    document.querySelectorAll('.dash-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

    const target = document.getElementById('section-' + name);
    if (target) target.classList.add('active');

    const link = document.querySelector(`.nav-link[data-section="${name}"]`);
    if (link) link.classList.add('active');

    const titleEl = document.getElementById('page-title');
    if (titleEl) titleEl.textContent = sectionTitles[name] || name;

    // Close sidebar on mobile
    if (window.innerWidth <= 900) {
        document.getElementById('dash-sidebar').classList.remove('open');
    }

    window.scrollTo(0, 0);
}

// Nav link clicks
document.querySelectorAll('.nav-link[data-section]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        showSection(link.dataset.section);
    });
});

// Notif bell
const notifBell = document.getElementById('notif-bell');
if (notifBell) {
    notifBell.addEventListener('click', () => showSection('notifications'));
}

/* ── Sidebar Toggle (mobile) ──────────────────────── */
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.getElementById('dash-sidebar');
if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });
}

/* ── Tabs ─────────────────────────────────────────── */
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;
        const tabSection = btn.closest('.dash-section');
        tabSection.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        tabSection.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        const tab = document.getElementById('tab-' + tabId);
        if (tab) tab.classList.add('active');
    });
});

/* ── Toast ────────────────────────────────────────── */
function showToast(msg, icon = 'check-circle') {
    const toast = document.getElementById('admin-toast');
    const msgEl = document.getElementById('toast-msg');
    const iconEl = toast.querySelector('i');
    if (msgEl) msgEl.textContent = msg;
    if (iconEl) iconEl.className = 'fas fa-' + icon;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ── Doctor Actions ───────────────────────────────── */
function approveDoctor(btn) {
    const row = btn.closest('tr');
    const name = row.querySelector('.table-user strong')?.textContent || 'Doctor';
    row.style.opacity = '0.5';
    row.style.transition = 'opacity 0.3s';
    setTimeout(() => row.remove(), 400);

    // Update badge
    const badge = document.getElementById('badge-doctors');
    if (badge) {
        const count = Math.max(0, parseInt(badge.textContent) - 1);
        badge.textContent = count;
        if (count === 0) badge.style.display = 'none';
    }

    showToast(`${name} approved and activated.`);
    updateTabCount('pending-doctors', -1);
}

function rejectDoctor(btn) {
    const row = btn.closest('tr');
    const name = row.querySelector('.table-user strong')?.textContent || 'Doctor';
    row.style.opacity = '0.5';
    row.style.transition = 'opacity 0.3s';
    setTimeout(() => row.remove(), 400);
    showToast(`${name} registration rejected.`, 'times-circle');
    updateTabCount('pending-doctors', -1);
}

function toggleFeatured(btn) {
    btn.classList.toggle('featured');
    const isFeatured = btn.classList.contains('featured');
    showToast(isFeatured ? 'Doctor marked as Featured.' : 'Doctor removed from Featured.');
}

/* ── Refund Processing ────────────────────────────── */
function processRefund(btn) {
    const row = btn.closest('tr');
    const txn = row.querySelector('td:first-child strong')?.textContent || 'Booking';
    row.style.opacity = '0.5';
    setTimeout(() => row.remove(), 400);
    showToast(`Refund for ${txn} approved and processed.`);
}

/* ── Notifications ────────────────────────────────── */
function sendNotification() {
    closeAllModals();
    showToast('Announcement sent to all users.');
}

/* ── Settings ─────────────────────────────────────── */
function saveSettings() {
    showToast('Settings saved successfully.');
}

/* ── Modal System ─────────────────────────────────── */
function openModal(id) {
    document.getElementById('modal-overlay').classList.add('active');
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('active');
}

function closeAllModals() {
    document.getElementById('modal-overlay').classList.remove('active');
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
}

/* ── Tab Count Helper ─────────────────────────────── */
function updateTabCount(tabId, delta) {
    const btn = document.querySelector(`[data-tab="${tabId}"] .tab-count`);
    if (btn) {
        const val = Math.max(0, parseInt(btn.textContent) + delta);
        btn.textContent = val;
    }
}

/* ── Channel Toggle Chips ─────────────────────────── */
document.querySelectorAll('.toggle-chip').forEach(chip => {
    chip.addEventListener('click', () => {
        chip.classList.toggle('active');
    });
});

/* ── Table Search (live filter) ───────────────────── */
document.querySelectorAll('.table-search').forEach(input => {
    input.addEventListener('input', function () {
        const query = this.value.toLowerCase();
        const table = this.closest('.dash-card').querySelector('.admin-table tbody');
        if (!table) return;
        table.querySelectorAll('tr').forEach(row => {
            row.style.display = row.textContent.toLowerCase().includes(query) ? '' : 'none';
        });
    });
});

/* ── Animate stat values on load ──────────────────── */
function animateCounters() {
    document.querySelectorAll('.stat-value').forEach(el => {
        const raw = el.textContent.replace(/[^0-9]/g, '');
        const target = parseInt(raw);
        if (!target || target > 999999) return;
        const prefix = el.textContent.replace(/[0-9,]+/, '').split(target.toLocaleString())[0] || '';
        let start = 0;
        const duration = 900;
        const step = target / (duration / 16);
        const tick = () => {
            start = Math.min(start + step, target);
            el.textContent = prefix + Math.floor(start).toLocaleString() + suffix;
            if (start < target) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    });
}

// Animate on section change
const observer = new MutationObserver(mutations => {
    mutations.forEach(m => {
        if (m.target.classList.contains('active') && m.type === 'attributes') {
            animateCounters();
        }
    });
});
document.querySelectorAll('.dash-section').forEach(s => {
    observer.observe(s, { attributes: true, attributeFilter: ['class'] });
});

// Initial
animateCounters();

/* ── Init ─────────────────────────────────────────── */
showSection('overview');
