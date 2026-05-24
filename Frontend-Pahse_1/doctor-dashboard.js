/* =====================================================
   DOCTOR DASHBOARD — doctor-dashboard.js
===================================================== */

// ══════════ DATA ══════════
const doctorData = {
    name: "Dr. Hassan Mahmoud",
    firstName: "Hassan",
    specialty: "Cardiologist",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
};

const appointmentsData = [
    { id: 1, patient: "Rana Mostafa",    age: 34, avatar: "https://randomuser.me/api/portraits/women/68.jpg", date: "Today",     time: "9:00 AM",  reason: "Follow-up on cardiac stress test results",   status: "pending",   price: 600 },
    { id: 2, patient: "Khaled Ibrahim",  age: 45, avatar: "https://randomuser.me/api/portraits/men/54.jpg",   date: "Today",     time: "10:00 AM", reason: "Chest pain and shortness of breath",          status: "confirmed", price: 600 },
    { id: 3, patient: "Dina Farouk",     age: 29, avatar: "https://randomuser.me/api/portraits/women/12.jpg", date: "Today",     time: "11:00 AM", reason: "Routine heart checkup",                       status: "pending",   price: 600 },
    { id: 4, patient: "Mohamed Ali",     age: 58, avatar: "https://randomuser.me/api/portraits/men/78.jpg",   date: "Today",     time: "12:00 PM", reason: "Hypertension management consultation",        status: "confirmed", price: 600 },
    { id: 5, patient: "Sara Hassan",     age: 41, avatar: "https://randomuser.me/api/portraits/women/33.jpg", date: "Today",     time: "2:00 PM",  reason: "Arrhythmia monitoring follow-up",             status: "pending",   price: 600 },
    { id: 6, patient: "Ahmed Samir",     age: 52, avatar: "https://randomuser.me/api/portraits/men/91.jpg",   date: "Tomorrow",  time: "9:30 AM",  reason: "Post-surgery cardiac rehabilitation",         status: "upcoming",  price: 600 },
    { id: 7, patient: "Nadia El-Sheikh", age: 37, avatar: "https://randomuser.me/api/portraits/women/55.jpg", date: "Apr 22",    time: "11:00 AM", reason: "Second opinion on catheterization",           status: "upcoming",  price: 600 },
    { id: 8, patient: "Tarek Mansour",   age: 63, avatar: "https://randomuser.me/api/portraits/men/44.jpg",   date: "Apr 20",    time: "3:00 PM",  reason: "Heart failure medication review",             status: "completed", price: 600 },
    { id: 9, patient: "Layla Youssef",   age: 48, avatar: "https://randomuser.me/api/portraits/women/79.jpg", date: "Apr 19",    time: "10:00 AM", reason: "Pre-operative cardiac evaluation",            status: "cancelled", price: 600 },
];

const patientsData = [
    { id: 1, name: "Rana Mostafa",    age: 34, gender: "Female", phone: "+20 100 111 2233", visits: 4,  lastVisit: "Apr 20, 2026", condition: "Hypertension",    avatar: "https://randomuser.me/api/portraits/women/68.jpg", blood: "A+",  notes: "Patient responds well to beta blockers. Monitor BP weekly.", history: [{ date: "Apr 20, 2026", diagnosis: "Hypertension Follow-up", notes: "BP stabilized at 130/85. Continue current regimen." }, { date: "Mar 15, 2026", diagnosis: "Stress Test", notes: "Normal results. No ischemia detected." }, { date: "Feb 02, 2026", diagnosis: "Initial Consultation", notes: "Referred by GP. Started lisinopril 10mg." }] },
    { id: 2, name: "Khaled Ibrahim",  age: 45, gender: "Male",   phone: "+20 100 444 5566", visits: 2,  lastVisit: "Apr 18, 2026", condition: "Atrial Fibrillation", avatar: "https://randomuser.me/api/portraits/men/54.jpg",   blood: "B+",  notes: "On anticoagulation. ECG showed persistent AF.", history: [{ date: "Apr 18, 2026", diagnosis: "AF Management", notes: "Rate controlled. Started Bisoprolol 5mg." }, { date: "Apr 01, 2026", diagnosis: "Emergency Visit", notes: "Palpitations and syncope episode. Holter ordered." }] },
    { id: 3, name: "Dina Farouk",     age: 29, gender: "Female", phone: "+20 100 777 8899", visits: 1,  lastVisit: "Apr 15, 2026", condition: "Routine Checkup",  avatar: "https://randomuser.me/api/portraits/women/12.jpg", blood: "O+",  notes: "Healthy young patient, family history of CAD.", history: [{ date: "Apr 15, 2026", diagnosis: "Annual Cardiac Screening", notes: "All normal. Echo and ECG clear. Lifestyle counseling given." }] },
    { id: 4, name: "Mohamed Ali",     age: 58, gender: "Male",   phone: "+20 100 222 3344", visits: 7,  lastVisit: "Apr 10, 2026", condition: "Heart Failure",   avatar: "https://randomuser.me/api/portraits/men/78.jpg",   blood: "AB-", notes: "EF 40%. Optimized HF therapy. Monthly follow-up.", history: [{ date: "Apr 10, 2026", diagnosis: "HF Follow-up", notes: "Edema reduced. Weight stable. Furosemide dose adjusted." }, { date: "Mar 10, 2026", diagnosis: "HF Follow-up", notes: "Echo EF 40%. Added spironolactone." }, { date: "Feb 10, 2026", diagnosis: "Decompensation", notes: "Admitted for acute HF. IV diuretics given. Discharged in 3 days." }] },
    { id: 5, name: "Sara Hassan",     age: 41, gender: "Female", phone: "+20 100 555 6677", visits: 3,  lastVisit: "Apr 05, 2026", condition: "SVT",            avatar: "https://randomuser.me/api/portraits/women/33.jpg", blood: "A-",  notes: "Recurrent SVT episodes. Discussing ablation.", history: [{ date: "Apr 05, 2026", diagnosis: "SVT Monitoring", notes: "Holter shows 3 SVT runs. Cardiology referral for ablation discussed." }, { date: "Mar 01, 2026", diagnosis: "SVT Evaluation", notes: "Echocardiogram normal. Started flecainide." }] },
    { id: 6, name: "Ahmed Samir",     age: 52, gender: "Male",   phone: "+20 100 333 4455", visits: 5,  lastVisit: "Mar 30, 2026", condition: "Post-CABG",      avatar: "https://randomuser.me/api/portraits/men/91.jpg",   blood: "O-",  notes: "6 months post CABG. Doing well. Continue cardiac rehab.", history: [{ date: "Mar 30, 2026", diagnosis: "Post-CABG Follow-up", notes: "Wound healed. Echo shows EF 55%. Continue rehab." }] },
];

const notificationsData = [
    { id: 1, type: "booking",      title: "New Appointment Request", body: "Rana Mostafa has requested a consultation for April 20 at 9:00 AM regarding her cardiac stress test.", time: "5 mins ago",  color: "blue",  icon: "fa-calendar-plus",    read: false },
    { id: 2, type: "booking",      title: "New Appointment Request", body: "Dina Farouk booked an appointment for April 20 at 11:00 AM for a routine heart checkup.", time: "12 mins ago", color: "blue",  icon: "fa-calendar-plus",    read: false },
    { id: 3, type: "cancellation", title: "Appointment Cancelled",   body: "Layla Youssef has cancelled her appointment scheduled for April 19 at 10:00 AM.", time: "1 hr ago",    color: "red",   icon: "fa-calendar-times",   read: false },
    { id: 4, type: "booking",      title: "New Appointment Request", body: "Sara Hassan requests a follow-up consultation for arrhythmia monitoring on April 20, 2:00 PM.", time: "2 hrs ago",   color: "blue",  icon: "fa-calendar-plus",    read: false },
    { id: 5, type: "reminder",     title: "Schedule Reminder",       body: "You have 8 appointments scheduled for today. Your first patient arrives at 9:00 AM.", time: "3 hrs ago",   color: "amber", icon: "fa-bell",             read: false },
    { id: 6, type: "payment",      title: "Payment Received",        body: "Payment of 600 EGP received from Tarek Mansour for appointment on April 20.", time: "Yesterday",   color: "green", icon: "fa-check-circle",     read: true  },
    { id: 7, type: "reminder",     title: "Document Review Pending", body: "Your Fellowship Certificate is currently under review by the verification team.", time: "2 days ago",  color: "amber", icon: "fa-file-alt",         read: true  },
];

const scheduleData = {
    days: [
        { day: "Mon", active: true,  from: "09:00", to: "17:00" },
        { day: "Tue", active: true,  from: "09:00", to: "17:00" },
        { day: "Wed", active: true,  from: "10:00", to: "15:00" },
        { day: "Thu", active: true,  from: "09:00", to: "17:00" },
        { day: "Fri", active: false, from: "09:00", to: "13:00" },
        { day: "Sat", active: false, from: "10:00", to: "14:00" },
        { day: "Sun", active: false, from: "09:00", to: "12:00" },
    ],
    blockedDates: [
        { date: "2026-04-25", reason: "Medical Conference" },
        { date: "2026-05-01", reason: "National Holiday" }
    ]
};

const earningsData = {
    daily: {
        total: "4,800 EGP", sessions: 8, cancelled: 1,
        bars: [
            { label: "9 AM",  val: 600,  cancelled: false },
            { label: "10 AM", val: 600,  cancelled: false },
            { label: "11 AM", val: 600,  cancelled: false },
            { label: "12 PM", val: 600,  cancelled: false },
            { label: "2 PM",  val: 600,  cancelled: false },
            { label: "3 PM",  val: 0,    cancelled: true  },
            { label: "4 PM",  val: 600,  cancelled: false },
            { label: "5 PM",  val: 600,  cancelled: false },
        ],
        subtitle: "Today — April 20, 2026",
        transactions: [
            { name: "Tarek Mansour",   type: "Completed", amount: "+600 EGP", date: "Today, 3:00 PM",  icon: "fa-check-circle", positive: true,  avatar: "https://randomuser.me/api/portraits/men/44.jpg" },
            { name: "Mohamed Ali",     type: "Completed", amount: "+600 EGP", date: "Today, 12:00 PM", icon: "fa-check-circle", positive: true,  avatar: "https://randomuser.me/api/portraits/men/78.jpg" },
            { name: "Layla Youssef",   type: "Cancelled", amount: "0 EGP",   date: "Today, 10:00 AM", icon: "fa-times-circle", positive: false, avatar: "https://randomuser.me/api/portraits/women/79.jpg" },
        ]
    },
    weekly: {
        total: "24,000 EGP", sessions: 40, cancelled: 3,
        bars: [
            { label: "Mon", val: 3600, cancelled: false },
            { label: "Tue", val: 4200, cancelled: false },
            { label: "Wed", val: 2400, cancelled: false },
            { label: "Thu", val: 4800, cancelled: false },
            { label: "Fri", val: 3000, cancelled: false },
            { label: "Sat", val: 3600, cancelled: false },
            { label: "Sun", val: 2400, cancelled: false },
        ],
        subtitle: "This Week — Apr 14–20, 2026",
        transactions: [
            { name: "Weekly Earnings",   type: "Completed", amount: "+24,000 EGP", date: "Apr 14–20, 2026", icon: "fa-chart-bar",   positive: true,  avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
        ]
    },
    monthly: {
        total: "94,200 EGP", sessions: 157, cancelled: 9,
        bars: [
            { label: "W1", val: 22000, cancelled: false },
            { label: "W2", val: 25000, cancelled: false },
            { label: "W3", val: 23200, cancelled: false },
            { label: "W4", val: 24000, cancelled: false },
        ],
        subtitle: "This Month — April 2026",
        transactions: [
            { name: "Monthly Summary",  type: "Completed", amount: "+94,200 EGP", date: "April 2026", icon: "fa-chart-line", positive: true, avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
        ]
    }
};

// ══════════ INIT ══════════
$(document).ready(function () {

    // Set today's date
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-EG', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' });
    $('#today-date').text(dateStr);

    // Greeting
    const hour = now.getHours();
    const greet = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";
    $('#greeting-text').text(`${greet}, Dr. Hassan`);

    // Render everything
    renderTodayAppointments();
    renderMiniNotifications();
    renderAppointments('pending');
    renderSchedule();
    renderPatients();
    renderEarnings('daily');
    renderNotifications();

    // Nav link clicks
    $(document).on('click', '.nav-link[data-section]', function (e) {
        e.preventDefault();
        const section = $(this).data('section');
        showSection(section);
    });

    // Topbar notif bell
    $('#notif-bell').on('click', function () { showSection('notifications'); });

    // Sidebar toggle (mobile)
    $('#sidebar-toggle').on('click', function () {
        $('#dash-sidebar').toggleClass('open');
    });

    // Appointment tabs
    $(document).on('click', '.appt-tab', function () {
        $('.appt-tab').removeClass('active');
        $(this).addClass('active');
        renderAppointments($(this).data('filter'));
    });

    // Period tabs (earnings)
    $(document).on('click', '.period-tab', function () {
        $('.period-tab').removeClass('active');
        $(this).addClass('active');
        renderEarnings($(this).data('period'));
    });

    // Duration buttons
    $(document).on('click', '.dur-btn', function () {
        $('.dur-btn').removeClass('active');
        $(this).addClass('active');
    });

    // Profile tabs
    $(document).on('click', '.ptab', function () {
        const tab = $(this).data('ptab');
        $('.ptab').removeClass('active');
        $(this).addClass('active');
        $('.ptab-content').removeClass('active');
        $(`#ptab-${tab}`).addClass('active');
    });

    // Close modal
    $('#appt-modal-close, #appt-action-modal').on('click', function (e) {
        if (e.target === this) $('#appt-action-modal').removeClass('active');
    });
    $('#notes-modal-close, #notes-modal').on('click', function (e) {
        if (e.target === this) $('#notes-modal').removeClass('active');
    });

    // Patient search
    $(document).on('input', '#patient-search', function () {
        const q = $(this).val().toLowerCase();
        const filtered = patientsData.filter(p => p.name.toLowerCase().includes(q) || p.condition.toLowerCase().includes(q));
        renderPatients(filtered);
    });

    // Patient detail close
    $(document).on('click', '#panel-close, #patient-detail-overlay', function (e) {
        if (e.target === this || $(e.target).closest('#panel-close').length) {
            $('#patient-detail-overlay').removeClass('open');
        }
    });

    // Avatar preview
    $('#avatar-upload').on('change', function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                $('#profile-img, #sidebar-avatar, #topbar-avatar').attr('src', e.target.result);
                showToast('Profile photo updated!', 'success');
            };
            reader.readAsDataURL(file);
        }
    });

    // Day toggle
    $(document).on('click', '.day-toggle', function () {
        $(this).toggleClass('on');
        $(this).closest('.day-row').toggleClass('active');
    });
});

// ══════════ SECTION NAVIGATION ══════════
function showSection(name) {
    $('.dash-section').removeClass('active');
    $(`#section-${name}`).addClass('active');
    $('.nav-link').removeClass('active');
    $(`.nav-link[data-section="${name}"]`).addClass('active');
    $('#page-title').text(name.charAt(0).toUpperCase() + name.slice(1));
    $('#dash-sidebar').removeClass('open');

    if (name === 'notifications') {
        $('#notif-dot').hide();
        $('#badge-notif').text('0');
        notificationsData.forEach(n => n.read = true);
    }
}

// ══════════ TODAY'S APPOINTMENTS (Overview) ══════════
function renderTodayAppointments() {
    const today = appointmentsData.filter(a => a.date === "Today").slice(0, 5);
    let html = '';
    today.forEach(a => {
        html += `
        <div class="today-appt-item">
            <div class="appt-time-badge">${a.time}</div>
            <div class="appt-item-avatar"><img src="${a.avatar}" alt="${a.patient}"></div>
            <div>
                <div class="appt-item-name">${a.patient}</div>
                <div class="appt-item-reason">${a.reason.substring(0,40)}...</div>
            </div>
            <span class="appt-item-status status-${a.status}">${capitalize(a.status)}</span>
        </div>`;
    });
    $('#today-appointments-list').html(html);
}

// ══════════ MINI NOTIFICATIONS (Overview) ══════════
function renderMiniNotifications() {
    const recent = notificationsData.slice(0, 4);
    let html = '';
    recent.forEach(n => {
        html += `
        <div class="mini-notif-item">
            <div class="mini-notif-icon notif-${n.color}"><i class="fas ${n.icon}"></i></div>
            <div>
                <div class="mini-notif-text"><strong>${n.title}</strong> — ${n.body.substring(0, 55)}...</div>
                <div class="mini-notif-time">${n.time}</div>
            </div>
        </div>`;
    });
    $('#mini-notifs-list').html(html);
}

// ══════════ APPOINTMENTS ══════════
function renderAppointments(filter) {
    let data;
    if (filter === 'pending')   data = appointmentsData.filter(a => a.status === 'pending');
    else if (filter === 'upcoming')  data = appointmentsData.filter(a => a.status === 'upcoming' || a.status === 'confirmed');
    else if (filter === 'completed') data = appointmentsData.filter(a => a.status === 'completed');
    else if (filter === 'cancelled') data = appointmentsData.filter(a => a.status === 'cancelled');
    else data = appointmentsData;

    if (!data.length) {
        $('#appointments-list').html(`<div style="text-align:center;padding:5rem;color:#94a3b8;font-size:1.5rem;"><i class="fas fa-calendar-check" style="font-size:4rem;display:block;margin-bottom:1.5rem;"></i>No ${filter} appointments.</div>`);
        return;
    }

    let html = '';
    data.forEach(a => {
        const actions = getAppointmentActions(a);
        html += `
        <div class="appt-card" id="appt-card-${a.id}">
            <div class="appt-card-avatar"><img src="${a.avatar}" alt="${a.patient}"></div>
            <div class="appt-card-info">
                <div class="appt-card-name">${a.patient} <span style="font-size:1.3rem;font-weight:400;color:#94a3b8;">· Age ${a.age}</span></div>
                <div class="appt-card-meta">
                    <span><i class="fas fa-calendar-alt"></i> ${a.date}</span>
                    <span><i class="fas fa-clock"></i> ${a.time}</span>
                    <span><i class="fas fa-coins"></i> ${a.price} EGP</span>
                </div>
                <div class="appt-card-reason"><i class="fas fa-comment-medical" style="margin-right:0.6rem;color:#2563eb;"></i>${a.reason}</div>
            </div>
            <div class="appt-card-actions">${actions}</div>
        </div>`;
    });
    $('#appointments-list').html(html);
}

function getAppointmentActions(a) {
    if (a.status === 'pending') return `
        <button class="btn-accept" onclick="acceptAppt(${a.id})"><i class="fas fa-check"></i> Accept</button>
        <button class="btn-reject" onclick="rejectAppt(${a.id})"><i class="fas fa-times"></i> Reject</button>`;
    if (a.status === 'confirmed' || a.status === 'upcoming') return `
        <span class="appt-item-status status-confirmed" style="margin-right:1rem;">Confirmed</span>
        <button class="btn-reschedule" onclick="openReschedule(${a.id})"><i class="fas fa-calendar-alt"></i> Reschedule</button>
        <button class="btn-reject" onclick="cancelAppt(${a.id})"><i class="fas fa-times"></i> Cancel</button>`;
    if (a.status === 'completed') return `
        <span class="appt-item-status status-completed" style="margin-right:1rem;">Completed</span>
        <button class="btn-notes" onclick="openNotesModal(${a.id})" style="padding:0.8rem 1.4rem;"><i class="fas fa-notes-medical"></i> Add Notes</button>`;
    if (a.status === 'cancelled') return `<span class="appt-item-status status-cancelled">Cancelled</span>`;
    return '';
}

function acceptAppt(id) {
    const appt = appointmentsData.find(a => a.id === id);
    if (!appt) return;
    appt.status = 'confirmed';
    const pendingCount = appointmentsData.filter(a => a.status === 'pending').length;
    $('#badge-appt').text(pendingCount);
    renderAppointments('pending');
    renderTodayAppointments();
    showToast(`Appointment with ${appt.patient} confirmed!`, 'success');
    addNotification('booking', 'Appointment Confirmed', `You confirmed ${appt.patient}'s appointment at ${appt.time}.`, 'green', 'fa-check-circle');
}

function rejectAppt(id) {
    const appt = appointmentsData.find(a => a.id === id);
    if (!appt) return;
    appt.status = 'cancelled';
    const pendingCount = appointmentsData.filter(a => a.status === 'pending').length;
    $('#badge-appt').text(pendingCount);
    renderAppointments('pending');
    renderTodayAppointments();
    showToast(`Appointment with ${appt.patient} rejected.`, 'error');
}

function cancelAppt(id) {
    const appt = appointmentsData.find(a => a.id === id);
    if (!appt) return;
    appt.status = 'cancelled';
    renderAppointments('upcoming');
    showToast(`Appointment with ${appt.patient} cancelled.`, 'warning');
}

function openReschedule(id) {
    const appt = appointmentsData.find(a => a.id === id);
    if (!appt) return;
    $('#appt-modal-content').html(`
        <div class="modal-header"><i class="fas fa-calendar-alt"></i><h2>Reschedule Appointment</h2></div>
        <div style="margin:2rem 0 1rem;"><strong style="font-size:1.5rem;">Patient:</strong> <span style="font-size:1.5rem;color:#64748b;">${appt.patient}</span></div>
        <div class="form-field-dash" style="margin-bottom:1.5rem;"><label>New Date</label><input type="date" class="dash-input" id="new-date"></div>
        <div class="form-field-dash" style="margin-bottom:2rem;"><label>New Time</label>
        <select class="dash-input" id="new-time">
            ${['9:00 AM','10:00 AM','11:00 AM','12:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM'].map(t => `<option ${t===appt.time?'selected':''}>${t}</option>`).join('')}
        </select></div>
        <button class="btn-primary-dash" style="width:100%;justify-content:center;" onclick="confirmReschedule(${id})"><i class="fas fa-save"></i> Confirm Reschedule</button>
    `);
    $('#appt-action-modal').addClass('active');
}

function confirmReschedule(id) {
    const newDate = $('#new-date').val();
    const newTime = $('#new-time').val();
    const appt = appointmentsData.find(a => a.id === id);
    if (appt && newDate) {
        appt.date = new Date(newDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        appt.time = newTime;
        $('#appt-action-modal').removeClass('active');
        showToast('Appointment rescheduled successfully!', 'success');
        renderAppointments('upcoming');
    } else {
        showToast('Please select a date.', 'warning');
    }
}

function openNotesModal(id) {
    const appt = appointmentsData.find(a => a.id === id);
    const patient = patientsData.find(p => p.name === appt?.patient);
    $('#notes-modal-content').html(`
        <div class="modal-header"><i class="fas fa-notes-medical"></i><h2>Post-Visit Notes</h2></div>
        <div style="margin:1.8rem 0 0.8rem;color:#64748b;font-size:1.4rem;">Patient: <strong style="color:#0f172a;">${appt?.patient}</strong></div>
        <div class="notes-form">
            <div class="form-field-dash"><label>Diagnosis / Assessment</label><input type="text" class="dash-input" id="note-diagnosis" placeholder="e.g. Stable Angina, BP controlled..."></div>
            <div class="form-field-dash"><label>Clinical Notes</label><textarea class="dash-input" id="note-content" rows="5" placeholder="Write your clinical observations and recommendations..."></textarea></div>
            <div class="form-field-dash">
                <label>Upload Prescription / File</label>
                <label class="doc-upload-zone" for="prescription-upload" style="padding:1.5rem;">
                    <i class="fas fa-cloud-upload-alt"></i>
                    <span>Click to attach file</span>
                    <small>PDF, JPG, PNG</small>
                </label>
                <input type="file" id="prescription-upload" style="display:none;" onchange="showToast('File attached!', 'success')">
            </div>
            <button class="btn-primary-dash" style="width:100%;justify-content:center;" onclick="saveNotes(${id})"><i class="fas fa-save"></i> Save Notes</button>
        </div>
    `);
    $('#notes-modal').addClass('active');
}

function saveNotes(id) {
    const diagnosis = $('#note-diagnosis').val();
    const notes = $('#note-content').val();
    const appt = appointmentsData.find(a => a.id === id);
    const patient = patientsData.find(p => p.name === appt?.patient);
    if (patient && diagnosis) {
        patient.history.unshift({ date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), diagnosis, notes });
    }
    $('#notes-modal').removeClass('active');
    showToast('Notes saved successfully!', 'success');
}

// ══════════ SCHEDULE ══════════
function renderSchedule() {
    let html = '';
    scheduleData.days.forEach((d, i) => {
        html += `
        <div class="day-row ${d.active ? 'active' : ''}">
            <button class="day-toggle ${d.active ? 'on' : ''}"></button>
            <span class="day-name">${d.day}</span>
            <div class="day-hours">
                <input type="time" value="${d.from}" class="day-from">
                <span style="font-size:1.3rem;color:#94a3b8;">–</span>
                <input type="time" value="${d.to}" class="day-to">
            </div>
        </div>`;
    });
    $('#days-grid').html(html);
    renderBlockedDates();
}

function renderBlockedDates() {
    if (!scheduleData.blockedDates.length) {
        $('#blocked-dates-list').html('<div style="font-size:1.3rem;color:#94a3b8;text-align:center;padding:1.5rem 0;">No blocked dates</div>');
        return;
    }
    let html = '';
    scheduleData.blockedDates.forEach((b, i) => {
        html += `
        <div class="blocked-date-item">
            <span><i class="fas fa-ban" style="margin-right:0.6rem;"></i>${b.date} ${b.reason ? '– '+b.reason : ''}</span>
            <button onclick="removeBlockedDate(${i})"><i class="fas fa-times"></i></button>
        </div>`;
    });
    $('#blocked-dates-list').html(html);
}

function addBlockedDate() {
    const date = $('#block-date').val();
    const reason = $('#block-reason').val();
    if (!date) { showToast('Please select a date to block.', 'warning'); return; }
    scheduleData.blockedDates.push({ date, reason });
    $('#block-date').val('');
    $('#block-reason').val('');
    renderBlockedDates();
    showToast('Date blocked successfully!', 'success');
}

function removeBlockedDate(index) {
    scheduleData.blockedDates.splice(index, 1);
    renderBlockedDates();
    showToast('Date unblocked.', 'success');
}

function saveScheduleSettings() {
    showToast('Schedule settings saved!', 'success');
}

// ══════════ PATIENTS ══════════
function renderPatients(data) {
    const list = data || patientsData;
    let html = '';
    list.forEach(p => {
        html += `
        <div class="patient-card" onclick="openPatientDetail(${p.id})">
            <div class="patient-card-top">
                <img src="${p.avatar}" alt="${p.name}">
                <div>
                    <div class="patient-card-name">${p.name}</div>
                    <div class="patient-card-info">${p.age} yrs · ${p.gender} · ${p.blood}</div>
                </div>
            </div>
            <div class="patient-card-stats">
                <div class="pstat">
                    <div class="pstat-val">${p.visits}</div>
                    <div class="pstat-label">Total Visits</div>
                </div>
                <div class="pstat">
                    <div class="pstat-val" style="font-size:1.3rem;">${p.lastVisit}</div>
                    <div class="pstat-label">Last Visit</div>
                </div>
            </div>
            <div style="margin-top:1rem;background:#f0f7ff;border-radius:0.8rem;padding:0.8rem 1.2rem;">
                <span style="font-size:1.25rem;color:#2563eb;font-weight:600;">${p.condition}</span>
            </div>
            <div class="patient-card-footer">
                <button class="btn-notes" onclick="event.stopPropagation(); openPatientNotes(${p.id})"><i class="fas fa-notes-medical"></i> Add Note</button>
                <button class="btn-history" onclick="event.stopPropagation(); openPatientDetail(${p.id})"><i class="fas fa-history"></i> History</button>
            </div>
        </div>`;
    });
    if (!html) html = '<div style="grid-column:1/-1;text-align:center;padding:5rem;color:#94a3b8;font-size:1.5rem;">No patients found.</div>';
    $('#patients-grid').html(html);
}

function openPatientDetail(id) {
    const p = patientsData.find(pt => pt.id === id);
    if (!p) return;
    const historyHtml = p.history.map(h => `
        <div class="visit-history-item">
            <div class="visit-date"><i class="fas fa-calendar-alt" style="margin-right:0.5rem;"></i>${h.date}</div>
            <div class="visit-diagnosis">${h.diagnosis}</div>
            <div class="visit-notes">${h.notes}</div>
        </div>`).join('');
    $('#patient-detail-content').html(`
        <div class="patient-detail-header">
            <img src="${p.avatar}" alt="${p.name}" class="patient-detail-avatar">
            <div>
                <div class="patient-detail-name">${p.name}</div>
                <div class="patient-detail-sub">${p.age} yrs · ${p.gender} · Blood Type: ${p.blood}</div>
                <div class="patient-detail-sub" style="margin-top:0.3rem;"><i class="fas fa-phone" style="margin-right:0.5rem;color:#2563eb;"></i>${p.phone}</div>
            </div>
        </div>
        <div class="patient-detail-section">
            <h4>Current Condition</h4>
            <div style="background:#f0f7ff;border-radius:1rem;padding:1.2rem 1.6rem;font-size:1.4rem;color:#2563eb;font-weight:600;">${p.condition}</div>
        </div>
        <div class="patient-detail-section">
            <h4>Doctor's Notes</h4>
            <div style="background:#f8fafc;border-radius:1rem;padding:1.2rem 1.6rem;font-size:1.4rem;color:#334155;line-height:1.6;">${p.notes}</div>
        </div>
        <div class="patient-detail-section">
            <h4>Visit History (${p.history.length} visits)</h4>
            ${historyHtml}
        </div>
        <button class="btn-primary-dash" style="width:100%;justify-content:center;margin-top:1rem;" onclick="openPatientNotes(${p.id})">
            <i class="fas fa-plus"></i> Add Visit Note
        </button>
    `);
    $('#patient-detail-overlay').addClass('open');
}

function openPatientNotes(id) {
    const p = patientsData.find(pt => pt.id === id);
    if (!p) return;
    $('#patient-detail-overlay').removeClass('open');
    $('#notes-modal-content').html(`
        <div class="modal-header"><i class="fas fa-notes-medical"></i><h2>Add Visit Note</h2></div>
        <div style="margin:1.8rem 0 0.8rem;color:#64748b;font-size:1.4rem;">Patient: <strong style="color:#0f172a;">${p.name}</strong></div>
        <div class="notes-form">
            <div class="form-field-dash"><label>Diagnosis / Assessment</label><input type="text" class="dash-input" id="pnote-diagnosis" placeholder="e.g. Blood pressure review..."></div>
            <div class="form-field-dash"><label>Clinical Notes</label><textarea class="dash-input" id="pnote-content" rows="5" placeholder="Observations, treatment plan, follow-up instructions..."></textarea></div>
            <div class="form-field-dash">
                <label>Upload Prescription / File</label>
                <label class="doc-upload-zone" for="presc-upload2" style="padding:1.5rem;">
                    <i class="fas fa-cloud-upload-alt"></i><span>Attach file</span><small>PDF, JPG, PNG</small>
                </label>
                <input type="file" id="presc-upload2" style="display:none;" onchange="showToast('File attached!','success')">
            </div>
            <button class="btn-primary-dash" style="width:100%;justify-content:center;" onclick="savePatientNote(${id})"><i class="fas fa-save"></i> Save Note</button>
        </div>
    `);
    $('#notes-modal').addClass('active');
}

function savePatientNote(id) {
    const diagnosis = $('#pnote-diagnosis').val();
    const notes = $('#pnote-content').val();
    const p = patientsData.find(pt => pt.id === id);
    if (p && diagnosis) {
        p.history.unshift({ date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), diagnosis, notes });
        p.visits++;
        p.lastVisit = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    $('#notes-modal').removeClass('active');
    renderPatients();
    showToast('Note saved!', 'success');
}

// ══════════ EARNINGS ══════════
function renderEarnings(period) {
    const d = earningsData[period];
    $('#earn-total').text(d.total);
    $('#earn-sessions').text(d.sessions);
    $('#earn-cancelled').text(d.cancelled);
    $('#chart-subtitle').text(d.subtitle);

    const maxVal = Math.max(...d.bars.map(b => b.val), 1);
    let barsHtml = '';
    d.bars.forEach(b => {
        const pct = b.cancelled ? 8 : Math.max((b.val / maxVal) * 100, 5);
        barsHtml += `
        <div class="bar-col">
            <div class="bar-fill ${b.cancelled ? 'cancelled' : ''}" style="height:${pct}%" data-val="${b.cancelled ? 'Cancelled' : b.val+' EGP'}"></div>
            <div class="bar-label">${b.label}</div>
        </div>`;
    });
    $('#bar-chart').html(barsHtml);

    let txHtml = '';
    d.transactions.forEach(t => {
        const iconBg = t.positive ? '#dcfce7' : '#fee2e2';
        const iconColor = t.positive ? '#16a34a' : '#dc2626';
        txHtml += `
        <div class="transaction-item">
            <div class="trans-icon" style="background:${iconBg};color:${iconColor};"><i class="fas ${t.icon}"></i></div>
            <div class="trans-info">
                <div class="trans-name">${t.name}</div>
                <div class="trans-date">${t.type} · ${t.date}</div>
            </div>
            <div class="trans-amount ${t.positive ? 'positive' : 'negative'}">${t.amount}</div>
        </div>`;
    });
    $('#transactions-list').html(txHtml);
}

// ══════════ NOTIFICATIONS ══════════
function renderNotifications() {
    let html = '';
    notificationsData.forEach(n => {
        const colorClass = n.color === 'red' ? 'red-notif' : n.color === 'amber' ? 'amber-notif' : '';
        html += `
        <div class="notif-full-item ${n.read ? '' : 'unread'} ${colorClass}" id="notif-${n.id}">
            <div class="notif-full-icon notif-${n.color}"><i class="fas ${n.icon}"></i></div>
            <div class="notif-full-content">
                <div class="notif-full-title">${n.title} ${!n.read ? '<span style="background:#ef4444;color:#fff;font-size:1rem;padding:0.2rem 0.7rem;border-radius:999px;margin-left:0.8rem;">New</span>' : ''}</div>
                <div class="notif-full-body">${n.body}</div>
                <div class="notif-full-time"><i class="fas fa-clock" style="margin-right:0.5rem;"></i>${n.time}</div>
            </div>
            <button class="notif-dismiss" onclick="dismissNotification(${n.id})"><i class="fas fa-times"></i></button>
        </div>`;
    });
    if (!html) html = '<div style="text-align:center;padding:5rem;color:#94a3b8;font-size:1.5rem;"><i class="fas fa-bell-slash" style="font-size:4rem;display:block;margin-bottom:1.5rem;"></i>No notifications.</div>';
    $('#notifications-list').html(html);
}

function dismissNotification(id) {
    const idx = notificationsData.findIndex(n => n.id === id);
    if (idx !== -1) notificationsData.splice(idx, 1);
    renderNotifications();
    const unread = notificationsData.filter(n => !n.read).length;
    $('#badge-notif').text(unread || '0');
}

function clearAllNotifications() {
    notificationsData.forEach(n => n.read = true);
    notificationsData.length = 0;
    renderNotifications();
    $('#badge-notif').text('0');
    $('#notif-dot').hide();
    showToast('All notifications cleared.', 'success');
}

function addNotification(type, title, body, color, icon) {
    const id = Date.now();
    notificationsData.unshift({ id, type, title, body, time: 'Just now', color, icon, read: false });
    const unread = notificationsData.filter(n => !n.read).length;
    $('#badge-notif').text(unread);
    $('#notif-dot').show();
    renderMiniNotifications();
}

// ══════════ HELPERS ══════════
function showToast(message, type = 'success') {
    const icons = { success: 'fa-check-circle', error: 'fa-times-circle', warning: 'fa-exclamation-circle' };
    const id = 'toast-' + Date.now();
    const toast = $(`
        <div class="toast ${type}" id="${id}">
            <i class="fas ${icons[type]}"></i>
            <span>${message}</span>
        </div>`);
    $('#toast-container').append(toast);
    setTimeout(() => { $(`#${id}`).fadeOut(400, function () { $(this).remove(); }); }, 3500);
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function handleDocUpload(input) {
    if (input.files && input.files[0]) {
        showToast(`"${input.files[0].name}" uploaded for review.`, 'success');
    }
}
