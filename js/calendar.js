/* ================================
   STUDENT PORTAL / CALENDAR JS
   Cirrus Flight Academy Auburn
   Role-Based Permissions System
================================ */

// User Database (Demo)
const usersDB = {
    admin: {
        id: 'admin',
        username: 'admin',
        password: 'admin123',
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@cirrusflightauburn.com',
        role: 'admin',
        hours: null,
        phase: null
    },
    instructor: {
        id: 'jd',
        username: 'instructor',
        password: 'cfi123',
        firstName: 'John',
        lastName: 'Davis',
        email: 'john.davis@cirrusflightauburn.com',
        role: 'instructor',
        certificates: 'CFI, CFII, MEI',
        hours: 2450,
        students: ['student1', 'student2']
    },
    student: {
        id: 'student1',
        username: 'student',
        password: 'fly123',
        firstName: 'Demo',
        lastName: 'Student',
        email: 'demo.student@email.com',
        role: 'student',
        hours: 28.5,
        phase: 'Phase 3',
        instructor: 'jd',
        program: 'Private Pilot'
    }
};

// All Users List (for admin view)
const allUsers = [
    { id: 'student1', firstName: 'Demo', lastName: 'Student', email: 'demo.student@email.com', role: 'student', status: 'active', hours: 28.5, instructor: 'jd', program: 'Private Pilot', phase: 'Phase 3' },
    { id: 'student2', firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@email.com', role: 'student', status: 'active', hours: 45.2, instructor: 'jd', program: 'Instrument', phase: 'Phase 2' },
    { id: 'student3', firstName: 'Mike', lastName: 'Johnson', email: 'mike.j@email.com', role: 'student', status: 'active', hours: 12.0, instructor: 'sm', program: 'Private Pilot', phase: 'Phase 1' },
    { id: 'student4', firstName: 'Sarah', lastName: 'Williams', email: 'sarah.w@email.com', role: 'student', status: 'inactive', hours: 89.5, instructor: 'jd', program: 'Commercial', phase: 'Phase 4' },
    { id: 'jd', firstName: 'John', lastName: 'Davis', email: 'john.davis@cirrusflightauburn.com', role: 'instructor', status: 'active', hours: 2450, certificates: 'CFI, CFII, MEI' },
    { id: 'sm', firstName: 'Sarah', lastName: 'Mitchell', email: 'sarah.m@cirrusflightauburn.com', role: 'instructor', status: 'active', hours: 1890, certificates: 'CFI, CFII' }
];

// Documents Database
const documentsDB = {
    student1: [
        { id: 'd1', type: 'medical', name: 'Third Class Medical', expiry: '2025-06-15', status: 'valid', uploadDate: '2024-01-10' },
        { id: 'd2', type: 'license', name: 'Student Pilot Certificate', expiry: null, status: 'valid', uploadDate: '2023-09-01' },
        { id: 'd3', type: 'id', name: 'Driver License', expiry: '2027-03-22', status: 'valid', uploadDate: '2023-09-01' }
    ],
    student2: [
        { id: 'd4', type: 'medical', name: 'Third Class Medical', expiry: '2024-04-01', status: 'expiring', uploadDate: '2023-04-01' },
        { id: 'd5', type: 'written', name: 'PAR Written Exam', expiry: null, status: 'valid', uploadDate: '2023-11-15' }
    ],
    student3: [
        { id: 'd6', type: 'medical', name: 'Third Class Medical', expiry: '2025-08-20', status: 'valid', uploadDate: '2024-02-01' }
    ],
    student4: [
        { id: 'd7', type: 'medical', name: 'Second Class Medical', expiry: '2024-02-01', status: 'expired', uploadDate: '2023-02-01' },
        { id: 'd8', type: 'license', name: 'Private Pilot Certificate', expiry: null, status: 'valid', uploadDate: '2023-06-15' },
        { id: 'd9', type: 'written', name: 'IRA Written Exam', expiry: null, status: 'valid', uploadDate: '2023-10-20' }
    ]
};

// Bookings Database
const bookingsDB = [
    { id: 'b1', day: 'mon', startHour: 14, duration: 2, student: 'student1', instructor: 'jd', type: 'dual', notes: 'Maneuvers practice' },
    { id: 'b2', day: 'wed', startHour: 10, duration: 2, student: 'student1', instructor: 'jd', type: 'dual', notes: 'Cross-country prep' },
    { id: 'b3', day: 'fri', startHour: 9, duration: 3, student: 'student1', instructor: null, type: 'solo', notes: 'Solo practice' },
    { id: 'b4', day: 'tue', startHour: 9, duration: 2, student: 'student2', instructor: 'jd', type: 'dual', notes: '' },
    { id: 'b5', day: 'wed', startHour: 15, duration: 2, student: 'student3', instructor: 'sm', type: 'dual', notes: '' },
    { id: 'b6', day: 'thu', startHour: 13, duration: 3, student: 'student2', instructor: 'jd', type: 'dual', notes: '' },
    { id: 'b7', day: 'sat', startHour: 8, duration: 3, student: 'student3', instructor: 'sm', type: 'dual', notes: '' },
    { id: 'b8', day: 'mon', startHour: 8, duration: 2, student: null, instructor: null, type: 'maintenance', notes: 'Oil change' }
];

// Current user session
let currentUser = null;
let currentWeekOffset = 0;
let selectedBookingSlot = null;
let viewingUserId = null;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initLoginForm();
    initBookingForm();
    initMobileMenuPortal();
    initUploadZone();
    initAddUserForm();
    initUploadDocForm();

    // Check if user is already "logged in"
    const savedUser = sessionStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showDashboard();
    }
});

/* ================================
   LOGIN FUNCTIONALITY
================================ */
function initLoginForm() {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Check credentials
            const user = usersDB[username];
            if (user && user.password === password) {
                currentUser = user;
                sessionStorage.setItem('currentUser', JSON.stringify(user));
                showNotificationPortal('Welcome back, ' + user.firstName + '!', 'success');
                setTimeout(() => showDashboard(), 500);
            } else {
                showNotificationPortal('Invalid credentials. Please try the demo logins above.', 'error');
            }
        });
    }
}

function showDashboard() {
    const loginSection = document.getElementById('loginSection');
    const dashboardSection = document.getElementById('dashboardSection');

    if (loginSection && dashboardSection) {
        loginSection.style.display = 'none';
        dashboardSection.style.display = 'block';

        // Update UI based on role
        updateUIForRole();

        // Generate calendar
        generateCalendar();

        // Generate sidebar content
        generateInstructorList();
        generateUpcomingFlights();

        // Update METAR
        updateMetar();
    }
}

function updateUIForRole() {
    const userName = document.getElementById('userName');
    const userSubtitle = document.getElementById('userSubtitle');
    const userRoleBadge = document.getElementById('userRoleBadge');
    const userAvatar = document.getElementById('userAvatar');
    const dashboardTabs = document.getElementById('dashboardTabs');
    const myDocuments = document.getElementById('myDocuments');
    const uploadDocBtn = document.getElementById('uploadDocBtn');

    // Update name
    userName.textContent = currentUser.firstName;

    // Update role badge
    userRoleBadge.textContent = currentUser.role.toUpperCase();
    userRoleBadge.className = 'role-badge-sm ' + currentUser.role;

    // Update avatar
    userAvatar.textContent = currentUser.firstName[0] + (currentUser.lastName ? currentUser.lastName[0] : '');
    userAvatar.className = 'user-avatar ' + currentUser.role;

    // Role-specific UI
    if (currentUser.role === 'admin') {
        userSubtitle.textContent = 'System Administrator';
        dashboardTabs.style.display = 'flex';
        myDocuments.style.display = 'none';

        // Update stats for admin
        document.getElementById('statHours').textContent = allUsers.length;
        document.getElementById('statFlights').textContent = bookingsDB.length;
        document.getElementById('statPhase').textContent = 'Admin';
        document.querySelector('.dash-stat:nth-child(1) .dash-stat-label').textContent = 'Total Users';
        document.querySelector('.dash-stat:nth-child(2) .dash-stat-label').textContent = 'Bookings Today';
        document.querySelector('.dash-stat:nth-child(3) .dash-stat-label').textContent = 'Access Level';
    } else if (currentUser.role === 'instructor') {
        userSubtitle.textContent = currentUser.certificates + ' • ' + currentUser.hours + ' hours';
        dashboardTabs.style.display = 'flex';
        myDocuments.style.display = 'none';

        // Hide user management for instructors (only students)
        document.querySelector('[data-tab="users"]').style.display = 'none';

        // Update stats
        const myStudents = allUsers.filter(u => u.instructor === currentUser.id);
        document.getElementById('statHours').textContent = currentUser.hours;
        document.getElementById('statFlights').textContent = myStudents.length;
        document.getElementById('statPhase').textContent = 'CFI';
        document.querySelector('.dash-stat:nth-child(2) .dash-stat-label').textContent = 'Active Students';
        document.querySelector('.dash-stat:nth-child(3) .dash-stat-label').textContent = 'Certificate';
    } else {
        // Student
        userSubtitle.textContent = currentUser.program + ' • ' + currentUser.hours + ' hours logged';
        dashboardTabs.style.display = 'none';
        myDocuments.style.display = 'block';
        uploadDocBtn.style.display = 'inline-flex';

        document.getElementById('statHours').textContent = currentUser.hours;
        document.getElementById('statPhase').textContent = currentUser.phase;

        // Generate student's documents
        generateMyDocuments();
    }

    // Generate users table if admin/instructor
    if (currentUser.role === 'admin' || currentUser.role === 'instructor') {
        generateUsersTable();
        generateStudentDocsGrid();
    }
}

function logout() {
    currentUser = null;
    sessionStorage.removeItem('currentUser');

    const loginSection = document.getElementById('loginSection');
    const dashboardSection = document.getElementById('dashboardSection');

    if (loginSection && dashboardSection) {
        dashboardSection.style.display = 'none';
        loginSection.style.display = 'block';
    }

    // Reset form
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';

    showNotificationPortal('You have been signed out.', 'info');
}

/* ================================
   TAB SWITCHING
================================ */
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tabName) btn.classList.add('active');
    });

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabName + 'Tab').classList.add('active');
}

/* ================================
   24-HOUR CALENDAR
================================ */
function generateCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    if (!calendarGrid) return;

    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // Get week dates
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1 + (currentWeekOffset * 7));

    // Update week display
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    const options = { month: 'long', day: 'numeric' };
    document.getElementById('currentWeek').textContent =
        startOfWeek.toLocaleDateString('en-US', options) + ' - ' +
        endOfWeek.toLocaleDateString('en-US', { day: 'numeric' }) + ', ' +
        startOfWeek.getFullYear();

    let html = '';

    // Time column
    html += '<div class="time-column-24">';
    html += '<div class="time-header"></div>';
    for (let hour = 6; hour <= 21; hour++) {
        const displayHour = hour > 12 ? (hour - 12) + ' PM' : (hour === 12 ? '12 PM' : hour + ' AM');
        html += `<div class="time-slot-24">${displayHour}</div>`;
    }
    html += '</div>';

    // Day columns
    days.forEach((day, dayIndex) => {
        const currentDate = new Date(startOfWeek);
        currentDate.setDate(startOfWeek.getDate() + dayIndex);
        const isToday = currentDate.toDateString() === today.toDateString();

        html += `<div class="day-column-24 ${isToday ? 'today' : ''}" data-day="${day}">`;
        html += `<div class="day-header">
            <span class="day-name">${dayNames[dayIndex]}</span>
            <span class="day-date">${currentDate.getDate()}</span>
        </div>`;
        html += '<div class="day-slots-24">';

        for (let hour = 6; hour <= 21; hour++) {
            const slot = getSlotInfo(day, hour);
            const slotClass = getSlotClass(slot);
            const canBook = canUserBook(slot);
            const clickHandler = canBook ? `onclick="openBooking('${day}', ${hour})"` : '';

            html += `<div class="slot-24 ${slotClass}" data-hour="${hour}" ${clickHandler}>`;
            if (slot.booking) {
                html += `<span class="booking-label">${slot.label}</span>`;
            }
            html += '</div>';
        }

        html += '</div></div>';
    });

    calendarGrid.innerHTML = html;
}

function getSlotInfo(day, hour) {
    // Check for existing booking
    const booking = bookingsDB.find(b =>
        b.day === day &&
        hour >= b.startHour &&
        hour < b.startHour + b.duration
    );

    if (booking) {
        const isOwn = currentUser && (
            booking.student === currentUser.id ||
            (currentUser.role === 'instructor' && booking.instructor === currentUser.id)
        );

        let label = '';
        if (booking.type === 'maintenance') {
            label = 'Maintenance';
        } else if (isOwn) {
            label = hour === booking.startHour ? 'Your Flight' : '';
        } else {
            const student = allUsers.find(u => u.id === booking.student);
            label = hour === booking.startHour ? (student ? student.firstName[0] + '. ' + student.lastName : 'Booked') : '';
        }

        return { booking, isOwn, label };
    }

    // Check if hour is within operating hours (6 AM - 9 PM)
    if (hour < 6 || hour > 20) {
        return { unavailable: true };
    }

    return { available: true };
}

function getSlotClass(slot) {
    if (slot.unavailable) return 'unavailable';
    if (slot.available) return 'available';
    if (slot.booking) {
        if (slot.booking.type === 'maintenance') return 'booked other';
        return slot.isOwn ? 'booked mine' : 'booked other';
    }
    return '';
}

function canUserBook(slot) {
    if (!currentUser) return false;
    if (slot.unavailable) return false;
    if (slot.available) return true;
    if (slot.booking && slot.isOwn) return true; // Can view/edit own bookings
    if (currentUser.role === 'admin') return true; // Admin can edit all
    return false;
}

function prevWeek() {
    currentWeekOffset--;
    generateCalendar();
}

function nextWeek() {
    currentWeekOffset++;
    generateCalendar();
}

/* ================================
   BOOKING
================================ */
function openBooking(day, hour) {
    selectedBookingSlot = { day, hour };

    const modal = document.getElementById('bookingModal');
    const dateDisplay = document.getElementById('bookingDate');
    const timeDisplay = document.getElementById('bookingTime');
    const studentSelectGroup = document.getElementById('studentSelectGroup');
    const studentSelect = document.getElementById('studentSelect');

    // Format display
    const dayNames = {
        'mon': 'Monday', 'tue': 'Tuesday', 'wed': 'Wednesday',
        'thu': 'Thursday', 'fri': 'Friday', 'sat': 'Saturday', 'sun': 'Sunday'
    };

    const displayTime = hour > 12 ? `${hour - 12}:00 PM` : (hour === 12 ? '12:00 PM' : `${hour}:00 AM`);

    dateDisplay.textContent = `${dayNames[day]}, February 2024`;
    timeDisplay.textContent = displayTime;

    // Show student selector for instructors/admin
    if (currentUser.role === 'instructor' || currentUser.role === 'admin') {
        studentSelectGroup.style.display = 'block';

        // Populate students
        let studentsToShow = allUsers.filter(u => u.role === 'student' && u.status === 'active');
        if (currentUser.role === 'instructor') {
            studentsToShow = studentsToShow.filter(u => u.instructor === currentUser.id);
        }

        studentSelect.innerHTML = '<option value="">Select a student...</option>';
        studentsToShow.forEach(s => {
            studentSelect.innerHTML += `<option value="${s.id}">${s.firstName} ${s.lastName}</option>`;
        });
    } else {
        studentSelectGroup.style.display = 'none';
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
    document.getElementById('bookingModal').classList.remove('active');
    document.body.style.overflow = '';
    selectedBookingSlot = null;
}

function initBookingForm() {
    const bookingForm = document.getElementById('bookingForm');

    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Create booking (demo)
            showNotificationPortal('Flight booked successfully! Confirmation sent.', 'success');
            closeBookingModal();

            // Refresh calendar
            setTimeout(() => {
                showNotificationPortal('Your flight has been added to the schedule.', 'info');
            }, 1500);
        });
    }

    // Close on overlay click
    document.getElementById('bookingModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'bookingModal') closeBookingModal();
    });
}

/* ================================
   USER MANAGEMENT
================================ */
function generateUsersTable(filter = 'all') {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;

    let users = [...allUsers];

    // Filter by role
    if (filter !== 'all') {
        users = users.filter(u => u.role === filter);
    }

    // For instructors, only show their students
    if (currentUser.role === 'instructor') {
        users = users.filter(u => u.role === 'student' && u.instructor === currentUser.id);
    }

    tbody.innerHTML = users.map(user => {
        const initials = user.firstName[0] + user.lastName[0];
        const roleColors = { student: '#22c55e', instructor: '#3b82f6', admin: '#ef4444' };

        return `
            <tr data-user-id="${user.id}" data-role="${user.role}">
                <td>
                    <div class="user-name-cell">
                        <div class="avatar" style="background: ${roleColors[user.role]}; color: white;">${initials}</div>
                        <span>${user.firstName} ${user.lastName}</span>
                    </div>
                </td>
                <td><span class="role-badge ${user.role}">${user.role.toUpperCase()}</span></td>
                <td>${user.email}</td>
                <td><span class="status-badge ${user.status}">${user.status}</span></td>
                <td>${user.hours || '-'}</td>
                <td>
                    <div class="action-btns">
                        <button class="action-btn view" onclick="viewUserProfile('${user.id}')" title="View Profile">
                            <i class="fas fa-eye"></i>
                        </button>
                        ${currentUser.role === 'admin' ? `
                        <button class="action-btn edit" onclick="editUser('${user.id}')" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete" onclick="deleteUser('${user.id}')" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                        ` : ''}
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function filterUsers(filter) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) btn.classList.add('active');
    });
    generateUsersTable(filter);
}

function openAddUserModal() {
    document.getElementById('addUserModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAddUserModal() {
    document.getElementById('addUserModal').classList.remove('active');
    document.body.style.overflow = '';
}

function toggleRoleFields() {
    const role = document.getElementById('newRole').value;
    document.getElementById('studentFields').style.display = role === 'student' ? 'block' : 'none';
    document.getElementById('instructorFields').style.display = role === 'instructor' ? 'block' : 'none';
}

function initAddUserForm() {
    const form = document.getElementById('addUserForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotificationPortal('User created successfully! Welcome email sent.', 'success');
            closeAddUserModal();
            form.reset();
        });
    }

    document.getElementById('addUserModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'addUserModal') closeAddUserModal();
    });
}

function viewUserProfile(userId) {
    viewingUserId = userId;
    const user = allUsers.find(u => u.id === userId);
    if (!user) return;

    const modal = document.getElementById('userProfileModal');
    const initials = user.firstName[0] + user.lastName[0];

    document.getElementById('profileAvatar').textContent = initials;
    document.getElementById('profileName').textContent = user.firstName + ' ' + user.lastName;
    document.getElementById('profileRole').textContent = user.role.toUpperCase();
    document.getElementById('profileRole').className = 'role-badge ' + user.role;
    document.getElementById('profileEmail').textContent = user.email;
    document.getElementById('profileHours').textContent = user.hours || '0';
    document.getElementById('profileFlights').textContent = Math.floor((user.hours || 0) * 1.5);
    document.getElementById('profilePhase').textContent = user.phase || (user.role === 'instructor' ? 'CFI' : '-');

    // Generate documents list
    const docs = documentsDB[userId] || [];
    const docsList = document.getElementById('profileDocsList');

    if (docs.length > 0) {
        docsList.innerHTML = docs.map(doc => {
            const icon = getDocIcon(doc.type);
            const expiryClass = doc.status;
            const expiryText = doc.expiry ? new Date(doc.expiry).toLocaleDateString() : 'No expiry';

            return `
                <div class="doc-item">
                    <div class="doc-icon"><i class="fas ${icon}"></i></div>
                    <div class="doc-details">
                        <strong>${doc.name}</strong>
                        <span>Uploaded ${doc.uploadDate}</span>
                    </div>
                    <span class="doc-expiry ${expiryClass}">${doc.status === 'valid' ? expiryText : doc.status.toUpperCase()}</span>
                    <div class="doc-actions">
                        <button class="action-btn view" title="View"><i class="fas fa-eye"></i></button>
                        <button class="action-btn delete" title="Delete"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `;
        }).join('');
    } else {
        docsList.innerHTML = '<p style="color: var(--gray); text-align: center; padding: 20px;">No documents uploaded</p>';
    }

    // Show/hide upload button based on permissions
    const uploadBtn = document.getElementById('uploadForBtn');
    if (currentUser.role === 'admin' ||
        (currentUser.role === 'instructor' && user.instructor === currentUser.id)) {
        uploadBtn.style.display = 'inline-flex';
    } else {
        uploadBtn.style.display = 'none';
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeUserProfileModal() {
    document.getElementById('userProfileModal').classList.remove('active');
    document.body.style.overflow = '';
    viewingUserId = null;
}

function editUser(userId) {
    showNotificationPortal('Edit user functionality - coming soon!', 'info');
}

function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        showNotificationPortal('User deleted successfully.', 'success');
        generateUsersTable();
    }
}

/* ================================
   DOCUMENTS
================================ */
function generateStudentDocsGrid() {
    const grid = document.getElementById('studentDocsGrid');
    if (!grid) return;

    let students = allUsers.filter(u => u.role === 'student');

    // For instructors, only show their students
    if (currentUser.role === 'instructor') {
        students = students.filter(u => u.instructor === currentUser.id);
    }

    grid.innerHTML = students.map(student => {
        const docs = documentsDB[student.id] || [];
        const expiring = docs.filter(d => d.status === 'expiring').length;
        const expired = docs.filter(d => d.status === 'expired').length;

        return `
            <div class="student-doc-card" onclick="viewUserProfile('${student.id}')">
                <div class="doc-card-header">
                    <div class="doc-card-avatar">${student.firstName[0]}${student.lastName[0]}</div>
                    <div class="doc-card-info">
                        <h4>${student.firstName} ${student.lastName}</h4>
                        <span>${student.program} • ${student.phase}</span>
                    </div>
                </div>
                <div class="doc-card-stats">
                    <div class="doc-stat">
                        <span class="doc-stat-value">${docs.length}</span>
                        <span class="doc-stat-label">Documents</span>
                    </div>
                    <div class="doc-stat">
                        <span class="doc-stat-value" style="color: ${expiring > 0 ? '#fbbf24' : '#4ade80'}">${expiring}</span>
                        <span class="doc-stat-label">Expiring</span>
                    </div>
                    <div class="doc-stat">
                        <span class="doc-stat-value" style="color: ${expired > 0 ? '#ef4444' : '#4ade80'}">${expired}</span>
                        <span class="doc-stat-label">Expired</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function searchStudentDocs() {
    const query = document.getElementById('docSearchInput').value.toLowerCase();
    document.querySelectorAll('.student-doc-card').forEach(card => {
        const name = card.querySelector('h4').textContent.toLowerCase();
        card.style.display = name.includes(query) ? 'block' : 'none';
    });
}

function generateMyDocuments() {
    const list = document.getElementById('myDocumentsList');
    if (!list || !currentUser) return;

    const docs = documentsDB[currentUser.id] || [];

    if (docs.length > 0) {
        list.innerHTML = docs.map(doc => {
            const icon = getDocIcon(doc.type);
            const expiryText = doc.expiry ? new Date(doc.expiry).toLocaleDateString() : 'No expiry';

            return `
                <div class="doc-item">
                    <div class="doc-icon"><i class="fas ${icon}"></i></div>
                    <div class="doc-details">
                        <strong>${doc.name}</strong>
                        <span>Uploaded ${doc.uploadDate}</span>
                    </div>
                    <span class="doc-expiry ${doc.status}">${doc.status === 'valid' ? expiryText : doc.status.toUpperCase()}</span>
                    <div class="doc-actions">
                        <button class="action-btn view" title="View"><i class="fas fa-eye"></i></button>
                    </div>
                </div>
            `;
        }).join('');
    } else {
        list.innerHTML = '<p style="color: var(--gray); text-align: center; padding: 20px;">No documents uploaded yet</p>';
    }
}

function getDocIcon(type) {
    const icons = {
        medical: 'fa-heartbeat',
        license: 'fa-id-card',
        written: 'fa-file-alt',
        endorsement: 'fa-stamp',
        logbook: 'fa-book',
        insurance: 'fa-shield-alt',
        id: 'fa-address-card',
        other: 'fa-file'
    };
    return icons[type] || 'fa-file';
}

function openUploadModal() {
    viewingUserId = currentUser.id;
    document.getElementById('uploadDocModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function uploadDocumentFor() {
    document.getElementById('uploadDocModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeUploadModal() {
    document.getElementById('uploadDocModal').classList.remove('active');
    document.body.style.overflow = '';
    clearSelectedFile();
}

function initUploadZone() {
    const zone = document.getElementById('uploadZone');
    const input = document.getElementById('docFile');

    if (zone && input) {
        zone.addEventListener('click', () => input.click());

        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.style.borderColor = 'var(--gold)';
            zone.style.background = 'rgba(201, 162, 39, 0.1)';
        });

        zone.addEventListener('dragleave', () => {
            zone.style.borderColor = '';
            zone.style.background = '';
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.style.borderColor = '';
            zone.style.background = '';
            if (e.dataTransfer.files.length) {
                handleFileSelect(e.dataTransfer.files[0]);
            }
        });

        input.addEventListener('change', () => {
            if (input.files.length) {
                handleFileSelect(input.files[0]);
            }
        });
    }
}

function handleFileSelect(file) {
    document.getElementById('uploadZone').style.display = 'none';
    document.getElementById('selectedFile').style.display = 'flex';
    document.getElementById('selectedFileName').textContent = file.name;
}

function clearSelectedFile() {
    document.getElementById('uploadZone').style.display = 'block';
    document.getElementById('selectedFile').style.display = 'none';
    document.getElementById('docFile').value = '';
}

function initUploadDocForm() {
    const form = document.getElementById('uploadDocForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotificationPortal('Document uploaded successfully!', 'success');
            closeUploadModal();
            form.reset();
            clearSelectedFile();

            // Refresh documents
            if (currentUser.role === 'student') {
                generateMyDocuments();
            }
        });
    }

    document.getElementById('uploadDocModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'uploadDocModal') closeUploadModal();
    });
}

/* ================================
   METAR
================================ */
function updateMetar() {
    // Simulated METAR data for KAUO
    const metarData = {
        raw: 'KAUO 201853Z AUTO 18008KT 10SM CLR 20/12 A3002 RMK AO2',
        time: '18:53Z',
        wind: '180° @ 8 KT',
        visibility: '10+ SM',
        ceiling: 'Clear',
        temp: '20°C / 12°C',
        altimeter: '30.02"',
        flightCat: 'VFR'
    };

    document.getElementById('metarRaw').textContent = metarData.raw;
    document.getElementById('metarTime').textContent = metarData.time;
    document.getElementById('metarWind').textContent = metarData.wind;
    document.getElementById('metarVis').textContent = metarData.visibility;
    document.getElementById('metarCeiling').textContent = metarData.ceiling;
    document.getElementById('metarTemp').textContent = metarData.temp;
    document.getElementById('metarAlt').textContent = metarData.altimeter;

    // Update flight category
    const catEl = document.querySelector('.flight-cat');
    catEl.textContent = metarData.flightCat;
    catEl.className = 'flight-cat ' + metarData.flightCat.toLowerCase();

    // Update dashboard stat
    document.getElementById('metarCondition').textContent = metarData.flightCat;
    const metarIcon = document.getElementById('metarIcon');
    metarIcon.className = 'dash-stat-icon weather';

    if (metarData.flightCat === 'VFR') {
        metarIcon.innerHTML = '<i class="fas fa-sun"></i>';
    } else if (metarData.flightCat === 'MVFR') {
        metarIcon.innerHTML = '<i class="fas fa-cloud-sun"></i>';
        metarIcon.classList.add('mvfr');
    } else {
        metarIcon.innerHTML = '<i class="fas fa-cloud"></i>';
        metarIcon.classList.add('ifr');
    }
}

function refreshMetar() {
    const btn = document.querySelector('.metar-refresh');
    btn.innerHTML = '<i class="fas fa-sync-alt fa-spin"></i> Refreshing...';

    setTimeout(() => {
        updateMetar();
        btn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh METAR';
        showNotificationPortal('METAR updated', 'success');
    }, 1000);
}

/* ================================
   SIDEBAR CONTENT
================================ */
function generateInstructorList() {
    const list = document.getElementById('instructorList');
    if (!list) return;

    const instructors = allUsers.filter(u => u.role === 'instructor');

    list.innerHTML = instructors.map(inst => `
        <div class="instructor-item">
            <div class="instructor-avatar">${inst.firstName[0]}${inst.lastName[0]}</div>
            <div class="instructor-info">
                <strong>${inst.firstName} ${inst.lastName}</strong>
                <span>${inst.certificates}</span>
            </div>
            <span class="instructor-status available">Available</span>
        </div>
    `).join('');
}

function generateUpcomingFlights() {
    const list = document.getElementById('upcomingList');
    if (!list || !currentUser) return;

    let flights = [];

    if (currentUser.role === 'student') {
        flights = bookingsDB.filter(b => b.student === currentUser.id);
    } else if (currentUser.role === 'instructor') {
        flights = bookingsDB.filter(b => b.instructor === currentUser.id);
    } else {
        flights = bookingsDB.slice(0, 3);
    }

    const dayNames = { mon: 'MON', tue: 'TUE', wed: 'WED', thu: 'THU', fri: 'FRI', sat: 'SAT', sun: 'SUN' };
    const dayDates = { mon: 19, tue: 20, wed: 21, thu: 22, fri: 23, sat: 24, sun: 25 };

    list.innerHTML = flights.slice(0, 3).map(flight => {
        const student = allUsers.find(u => u.id === flight.student);
        const instructor = allUsers.find(u => u.id === flight.instructor);
        const startTime = flight.startHour > 12 ? `${flight.startHour - 12}:00 PM` : `${flight.startHour}:00 AM`;
        const endHour = flight.startHour + flight.duration;
        const endTime = endHour > 12 ? `${endHour - 12}:00 PM` : `${endHour}:00 AM`;

        let title = flight.type === 'dual' ? 'Dual Instruction' : (flight.type === 'solo' ? 'Solo Flight' : 'Ground Lesson');
        let subtitle = '';

        if (currentUser.role === 'student') {
            subtitle = instructor ? `w/ ${instructor.firstName} ${instructor.lastName}` : 'Solo';
        } else {
            subtitle = student ? `${student.firstName} ${student.lastName}` : 'N/A';
        }

        return `
            <div class="upcoming-item">
                <div class="upcoming-date">
                    <span class="day">${dayDates[flight.day]}</span>
                    <span class="month">FEB</span>
                </div>
                <div class="upcoming-details">
                    <strong>${title}</strong>
                    <span>${startTime} - ${endTime}</span>
                    <span class="instructor">${subtitle}</span>
                </div>
            </div>
        `;
    }).join('');

    if (flights.length === 0) {
        list.innerHTML = '<p style="color: var(--gray); text-align: center; padding: 20px;">No upcoming flights</p>';
    }
}

/* ================================
   MOBILE MENU
================================ */
function initMobileMenuPortal() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

/* ================================
   NOTIFICATIONS
================================ */
function showNotificationPortal(message, type = 'info') {
    const existing = document.querySelector('.portal-notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `portal-notification notification-${type}`;

    const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle' };
    const colors = { success: '#4ade80', error: '#ef4444', info: 'var(--gold)' };

    notification.innerHTML = `<i class="fas ${icons[type]}"></i><span>${message}</span>`;

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--navy-light);
        border: 1px solid ${colors[type]};
        color: var(--white);
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 12px;
        animation: slideInRight 0.5s ease;
        max-width: 400px;
    `;

    notification.querySelector('i').style.color = colors[type];
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Close modals on escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeBookingModal();
        closeAddUserModal();
        closeUserProfileModal();
        closeUploadModal();
    }
});

// Close modals on overlay click
document.getElementById('userProfileModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'userProfileModal') closeUserProfileModal();
});
