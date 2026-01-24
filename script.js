// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const closeSidebar = document.getElementById('closeSidebar');
const sidebar = document.getElementById('sidebar');
const navLinks = document.querySelectorAll('.nav-link, .sidebar-link');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const studentForm = document.getElementById('studentForm');
const studentList = document.getElementById('studentList');
const clearStudentsBtn = document.getElementById('clearStudents');
const teachersContainer = document.getElementById('teachersContainer');

// Teachers Data
const teachers = [
    { name: 'Yohannes Teshome', subject: 'ኮምፒውተር ሳይንስ', education: 'የኮምፒውተር ሳይንስ ባችለር' },
    { name: 'Danial Abebe', subject: 'ሒሳብ', education: 'የሒሳብ ማስተርስ' },
    { name: 'Kidist Hailemariyam', subject: 'ባዮሎጂ', education: 'የባዮሎጂ ባችለር' },
    { name: 'Birku Alemayehu', subject: 'ፊዚክስ', education: 'የፊዚክስ ማስተርስ' },
    { name: 'Hana Gebru', subject: 'ኬሚስትሪ', education: 'የኬሚስትሪ ባችለር' },
    { name: 'Melat Abebe', subject: 'እንግሊዝኛ', education: 'የእንግሊዝኛ ባችለር' }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Load teachers
    loadTeachers();
    
    // Load students from localStorage
    loadStudents();
    
    // Set up event listeners
    setupEventListeners();
    
    // Set active nav link based on scroll position
    window.addEventListener('scroll', setActiveNavLink);
    
    // Initialize with home section active
    setActiveNavLink();
});

// Load teachers to the page
function loadTeachers() {
    teachersContainer.innerHTML = '';
    
    teachers.forEach(teacher => {
        const teacherCard = document.createElement('div');
        teacherCard.className = 'teacher-card';
        
        teacherCard.innerHTML = `
            <div class="teacher-img">
                <i class="fas fa-chalkboard-teacher"></i>
            </div>
            <div class="teacher-info">
                <h3>${teacher.name}</h3>
                <div class="teacher-subject">${teacher.subject}</div>
                <p>${teacher.education}</p>
            </div>
        `;
        
        teachersContainer.appendChild(teacherCard);
    });
}

// Load students from localStorage
function loadStudents() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    studentList.innerHTML = '';
    
    if (students.length === 0) {
        studentList.innerHTML = '<p class="no-students">እስካሁን ምንም ተማሪ አልተመዘገበም።</p>';
        return;
    }
    
    students.forEach((student, index) => {
        const studentItem = document.createElement('div');
        studentItem.className = 'student-item';
        studentItem.dataset.index = index;
        
        studentItem.innerHTML = `
            <h4>${student.name}</h4>
            <div class="student-detail"><strong>ደረጃ:</strong> ${student.grade}ኛ ክፍል</div>
            <div class="student-detail"><strong>ኮርሶች:</strong> ${student.coursesTaken}</div>
            <div class="student-detail"><strong>ጠንካራ ትምህርት:</strong> ${student.strongSubject}</div>
            <div class="student-detail"><strong>ደካማ ትምህርት:</strong> ${student.weakSubject}</div>
            <div class="student-detail"><strong>የሂደት:</strong> ${student.progressFrom}% ወደ ${student.progressTo}%</div>
            <button class="delete-student" onclick="deleteStudent(${index})">ሰርዝ</button>
        `;
        
        studentList.appendChild(studentItem);
    });
}

// Save student to localStorage
function saveStudent(student) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));
    loadStudents();
}

// Delete student from localStorage
function deleteStudent(index) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    loadStudents();
}

// Clear all students
function clearAllStudents() {
    if (confirm('ሁሉንም ተማሪዎች ማጥፋት እወዳለሁ?')) {
        localStorage.removeItem('students');
        loadStudents();
    }
}

// Set up event listeners
function setupEventListeners() {
    // Sidebar toggle
    menuToggle.addEventListener('click', () => {
        sidebar.classList.add('active');
    });
    
    closeSidebar.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });
    
    // Close sidebar when clicking on a link
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.remove('active');
        });
    });
    
    // Navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get target section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            // Scroll to section
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active link
            setActiveNavLink(this);
        });
    });
    
    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-content`).classList.add('active');
        });
    });
    
    // Student form submission
    studentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const student = {
            name: document.getElementById('studentName').value,
            grade: document.getElementById('studentGrade').value,
            coursesTaken: document.getElementById('coursesTaken').value,
            strongSubject: document.getElementById('strongSubject').value,
            weakSubject: document.getElementById('weakSubject').value,
            progressFrom: document.getElementById('progressFrom').value,
            progressTo: document.getElementById('progressTo').value
        };
        
        // Save student
        saveStudent(student);
        
        // Reset form
        studentForm.reset();
        
        // Show success message
        alert('ተማሪ በተሳካ ሁኔታ ተመዝግቧል!');
    });
    
    // Clear all students button
    clearStudentsBtn.addEventListener('click', clearAllStudents);
}

// Set active navigation link based on scroll or click
function setActiveNavLink(clickedLink = null) {
    // If a link was clicked, use it
    if (clickedLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        clickedLink.classList.add('active');
        return;
    }
    
    // Otherwise determine based on scroll position
    const sections = document.querySelectorAll('.section');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}