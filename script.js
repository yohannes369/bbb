// Data for the application
const gradesData = [
    { id: 1, name: "Grade 1", level: "primary", subjects: 5, color: "#1E4D2B" },
    { id: 2, name: "Grade 2", level: "primary", subjects: 5, color: "#2D6A3D" },
    { id: 3, name: "Grade 3", level: "primary", subjects: 5, color: "#3E8C4F" },
    { id: 4, name: "Grade 4", level: "primary", subjects: 5, color: "#1E4D2B" },
    { id: 5, name: "Grade 5", level: "primary", subjects: 5, color: "#2D6A3D" },
    { id: 6, name: "Grade 6", level: "primary", subjects: 5, color: "#3E8C4F" },
    { id: 7, name: "Grade 7", level: "primary", subjects: 5, color: "#1E4D2B" },
    { id: 8, name: "Grade 8", level: "primary", subjects: 5, color: "#2D6A3D" },
    { id: 9, name: "Grade 9", level: "secondary", subjects: 5, color: "#3E8C4F" },
    { id: 10, name: "Grade 10", level: "secondary", subjects: 5, color: "#1E4D2B" },
    { id: 11, name: "Grade 11", level: "secondary", subjects: 5, color: "#2D6A3D" },
    { id: 12, name: "Grade 12", level: "secondary", subjects: 5, color: "#3E8C4F" }
];

const subjectsData = {
    "Grade 1": [
        { name: "English", icon: "fas fa-language" },
        { name: "Mathematics", icon: "fas fa-calculator" },
        { name: "Biology", icon: "fas fa-leaf" },
        { name: "Chemistry", icon: "fas fa-flask" },
        { name: "Physics", icon: "fas fa-atom" }
    ],
    "Grade 2": [
        { name: "English", icon: "fas fa-language" },
        { name: "Mathematics", icon: "fas fa-calculator" },
        { name: "Biology", icon: "fas fa-leaf" },
        { name: "Chemistry", icon: "fas fa-flask" },
        { name: "Physics", icon: "fas fa-atom" }
    ],
    // Add similar data for other grades
};

const studentData = [
    { name: "Yohannes Yeneakal", grade: "Grade 1", phone: "0996318291", progress: "Good" },
    { name: "Saba Alem", grade: "Grade 2", phone: "0996318292", progress: "Excellent" },
    { name: "Mikias Bekele", grade: "Grade 3", phone: "0996318293", progress: "Good" },
    { name: "Hanna Solomon", grade: "Grade 4", phone: "0996318294", progress: "Excellent" },
    { name: "Daniel Teklu", grade: "Grade 5", phone: "0996318295", progress: "Average" },
    { name: "Eyerusalem Getachew", grade: "Grade 6", phone: "0996318296", progress: "Good" },
    { name: "Samuel Kassahun", grade: "Grade 7", phone: "0996318297", progress: "Excellent" },
    { name: "Mekdes Alemu", grade: "Grade 8", phone: "0996318298", progress: "Good" },
    { name: "Tewodros Assefa", grade: "Grade 9", phone: "0996318299", progress: "Excellent" },
    { name: "Kalkidan Mulugeta", grade: "Grade 10", phone: "0996318300", progress: "Good" }
];

const progressData = [
    { grade: "Grade 1", score: 85 },
    { grade: "Grade 2", score: 88 },
    { grade: "Grade 3", score: 87 },
    { grade: "Grade 4", score: 86 },
    { grade: "Grade 5", score: 89 },
    { grade: "Grade 6", score: 84 },
    { grade: "Grade 7", score: 87 },
    { grade: "Grade 8", score: 88 },
    { grade: "Grade 9", score: 85 },
    { grade: "Grade 10", score: 86 },
    { grade: "Grade 11", score: 87 },
    { grade: "Grade 12", score: 89 }
];

// DOM Elements
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebarClose = document.getElementById('sidebar-close');
const gradesGrid = document.querySelector('.grades-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const gradeDetails = document.getElementById('grade-details');
const selectedGradeTitle = document.getElementById('selected-grade-title');
const gradeDescription = document.getElementById('grade-description');
const subjectsList = document.getElementById('subjects-list');
const closeDetails = document.getElementById('close-details');
const studentTableBody = document.getElementById('student-table-body');
const gradeProgressList = document.getElementById('grade-progress-list');
const loadMoreStudentsBtn = document.getElementById('load-more-students');
const shownCount = document.getElementById('shown-count');
const totalCount = document.getElementById('total-count');
const contactForm = document.getElementById('contact-form');
const navLinks = document.querySelectorAll('.nav-link');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize grades grid
    renderGradesGrid('all');
    
    // Initialize student table
    renderStudentTable();
    
    // Initialize progress list
    renderProgressList();
    
    // Initialize Chart.js
    initializeProgressChart();
    
    // Set up event listeners
    setupEventListeners();
});

// Render grades grid based on filter
function renderGradesGrid(filter) {
    gradesGrid.innerHTML = '';
    
    const filteredGrades = filter === 'all' 
        ? gradesData 
        : gradesData.filter(grade => grade.level === filter);
    
    filteredGrades.forEach(grade => {
        const gradeCard = document.createElement('div');
        gradeCard.className = 'grade-card';
        gradeCard.dataset.grade = grade.name;
        gradeCard.dataset.level = grade.level;
        
        gradeCard.innerHTML = `
            <i class="fas fa-graduation-cap"></i>
            <h4>${grade.name}</h4>
            <p>${grade.subjects} Subjects</p>
            <small>Click to view details</small>
        `;
        
        gradesGrid.appendChild(gradeCard);
    });
    
    // Add click event to grade cards
    document.querySelectorAll('.grade-card').forEach(card => {
        card.addEventListener('click', function() {
            const gradeName = this.dataset.grade;
            showGradeDetails(gradeName);
        });
    });
}

// Show grade details
function showGradeDetails(gradeName) {
    // Update UI
    selectedGradeTitle.textContent = `${gradeName} Subjects`;
    gradeDescription.textContent = `Available subjects and learning materials for ${gradeName}.`;
    
    // Clear previous subjects
    subjectsList.innerHTML = '';
    
    // Get subjects for this grade
    const subjects = subjectsData[gradeName] || subjectsData["Grade 1"];
    
    // Add subjects to the list
    subjects.forEach(subject => {
        const subjectItem = document.createElement('div');
        subjectItem.className = 'subject-item';
        
        subjectItem.innerHTML = `
            <h5><i class="${subject.icon}"></i> ${subject.name}</h5>
            <p>Comprehensive study materials and quizzes for ${subject.name} in ${gradeName}.</p>
            <div class="subject-actions">
                <a href="#"><i class="fas fa-book"></i> Short Notes</a>
                <a href="#"><i class="fas fa-robot"></i> AI Quiz</a>
                <a href="#"><i class="fas fa-video"></i> Tutorial</a>
            </div>
        `;
        
        subjectsList.appendChild(subjectItem);
    });
    
    // Show the details section
    gradeDetails.style.display = 'block';
    
    // Scroll to the details section
    gradeDetails.scrollIntoView({ behavior: 'smooth' });
}

// Render student table
function renderStudentTable(limit = 10) {
    studentTableBody.innerHTML = '';
    
    // Determine how many students to show
    const studentsToShow = studentData.slice(0, limit);
    
    studentsToShow.forEach(student => {
        const row = document.createElement('tr');
        
        // Determine progress badge class
        const progressClass = student.progress.toLowerCase();
        const badgeClass = progressClass === 'excellent' ? 'excellent' : 
                          progressClass === 'good' ? 'good' : 'average';
        
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.grade}</td>
            <td>${student.phone}</td>
            <td><span class="progress-badge ${badgeClass}">${student.progress}</span></td>
            <td>
                <a href="#" title="View Profile"><i class="fas fa-eye"></i></a>
                <a href="#" title="Contact Student" style="margin-left: 10px;"><i class="fas fa-envelope"></i></a>
            </td>
        `;
        
        studentTableBody.appendChild(row);
    });
    
    // Update counts
    shownCount.textContent = studentsToShow.length;
    totalCount.textContent = studentData.length;
}

// Render progress list
function renderProgressList() {
    gradeProgressList.innerHTML = '';
    
    progressData.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.grade}</span>
            <span><strong>${item.score}%</strong></span>
        `;
        gradeProgressList.appendChild(li);
    });
}

// Initialize progress chart
function initializeProgressChart() {
    const ctx = document.getElementById('progressChart').getContext('2d');
    
    // Prepare data for chart
    const labels = progressData.map(item => item.grade);
    const scores = progressData.map(item => item.score);
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(30, 77, 43, 0.8)');
    gradient.addColorStop(1, 'rgba(30, 77, 43, 0.1)');
    
    // Create chart
    const progressChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Average Score (%)',
                data: scores,
                backgroundColor: gradient,
                borderColor: 'rgba(30, 77, 43, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(30, 77, 43, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
                fill: true,
                tension: 0.2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: {
                            family: 'Poppins',
                            size: 14
                        },
                        color: '#333'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(30, 77, 43, 0.9)',
                    titleFont: {
                        family: 'Poppins',
                        size: 14
                    },
                    bodyFont: {
                        family: 'Roboto',
                        size: 14
                    },
                    padding: 12,
                    cornerRadius: 6
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 80,
                    max: 95,
                    ticks: {
                        font: {
                            family: 'Roboto',
                            size: 12
                        },
                        color: '#666'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    ticks: {
                        font: {
                            family: 'Roboto',
                            size: 12
                        },
                        color: '#666'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            }
        }
    });
}

// Set up event listeners
function setupEventListeners() {
    // Sidebar toggle
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
    
    // Sidebar close
    sidebarClose.addEventListener('click', function() {
        sidebar.classList.remove('active');
    });
    
    // Close sidebar when clicking on a link (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                sidebar.classList.remove('active');
            }
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Grade filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filter = this.dataset.filter;
            
            // Render filtered grades
            renderGradesGrid(filter);
        });
    });
    
    // Close grade details
    closeDetails.addEventListener('click', function() {
        gradeDetails.style.display = 'none';
    });
    
    // Load more students
    let studentLimit = 10;
    loadMoreStudentsBtn.addEventListener('click', function() {
        studentLimit += 5;
        if (studentLimit > studentData.length) {
            studentLimit = studentData.length;
            this.disabled = true;
            this.innerHTML = '<i class="fas fa-check"></i> All Students Loaded';
        }
        renderStudentTable(studentLimit);
    });
    
    // Contact form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        
        // Show success message
        alert(`Thank you, ${name}! Your message has been sent. We will contact you soon.`);
        
        // Reset form
        this.reset();
    });
    
    // Close sidebar when clicking outside (mobile)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992 && 
            !sidebar.contains(e.target) && 
            !sidebarToggle.contains(e.target) && 
            sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
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
    });
}