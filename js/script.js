// Portfolio Interactive Features - Core Functionality
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

function initializePortfolio() {
    // Initialize core features
    setupScrollAnimations();
    setupMobileMenu();
    setupContactForm();
    setupScrollEffects();
    setupProjectCardInteractions();
    setupSmoothScrolling();
    setupSkillAnimations();
    setupToolInteractions();
}

// Scroll Animations with Intersection Observer
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.project-card, .contact-method, .skill-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Mobile Menu Navigation System
function setupMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (!navToggle || !navMenu) return;
    
    // Toggle menu on button click
    navToggle.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking on navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', handleOutsideClick);
    
    function toggleMobileMenu() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    }
    
    function closeMobileMenu() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    function handleOutsideClick(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    }
}

// Contact Form Management System
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const elements = {
        submitBtn: form.querySelector('.submit-btn'),
        btnText: form.querySelector('.btn-text'),
        btnLoading: form.querySelector('.btn-loading'),
        formSuccess: document.getElementById('formSuccess')
    };
    
    form.addEventListener('submit', handleFormSubmit);
    setupRealTimeValidation(form);
    
    async function handleFormSubmit(e) {
        e.preventDefault();
        
        if (validateForm()) {
            await submitForm();
        }
    }
    
    function validateForm() {
        const validationRules = {
            name: {
                element: document.getElementById('name'),
                error: document.getElementById('nameError'),
                rules: [(value) => value.trim().length >= 2 || 'Name must be at least 2 characters long']
            },
            email: {
                element: document.getElementById('email'),
                error: document.getElementById('emailError'),
                rules: [
                    (value) => value.trim() !== '' || 'Email is required',
                    (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Please enter a valid email address'
                ]
            },
            subject: {
                element: document.getElementById('subject'),
                error: document.getElementById('subjectError'),
                rules: [(value) => value !== '' || 'Please select a subject']
            },
            message: {
                element: document.getElementById('message'),
                error: document.getElementById('messageError'),
                rules: [(value) => value.trim().length >= 10 || 'Message must be at least 10 characters long']
            }
        };
        
        return Object.keys(validationRules).every(fieldName => 
            validateField(validationRules[fieldName])
        );
    }
    
    function validateField(field) {
        const value = field.element.value;
        
        // Clear previous errors
        clearFieldError(field);
        
        // Run validation rules
        for (let rule of field.rules) {
            const result = rule(value);
            if (result !== true) {
                showFieldError(field, result);
                return false;
            }
        }
        return true;
    }
    
    function clearFieldError(field) {
        field.error.textContent = '';
        field.element.classList.remove('error');
    }
    
    function showFieldError(field, message) {
        field.error.textContent = message;
        field.element.classList.add('error');
    }
    
    async function submitForm() {
        setLoadingState(true);
        
        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            showSuccessMessage();
            form.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            alert('There was an error sending your message. Please try again.');
        } finally {
            setLoadingState(false);
        }
    }
    
    function setLoadingState(isLoading) {
        elements.btnText.style.display = isLoading ? 'none' : 'inline';
        elements.btnLoading.style.display = isLoading ? 'inline-flex' : 'none';
        elements.submitBtn.disabled = isLoading;
    }
    
    function showSuccessMessage() {
        form.style.display = 'none';
        elements.formSuccess.style.display = 'block';
    }
    
    function setupRealTimeValidation(form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateForm());
            input.addEventListener('input', () => clearInputError(input));
        });
    }
    
    function clearInputError(input) {
        const errorElement = document.getElementById(input.name + 'Error');
        if (errorElement) {
            errorElement.textContent = '';
            input.classList.remove('error');
        }
    }
}

// Scroll Effects Management
function setupScrollEffects() {
    const navbar = document.querySelector('.navbar');
    const scrollToTopBtn = createScrollToTopButton();
    
    window.addEventListener('scroll', handleScroll);
    
    function handleScroll() {
        const scrollY = window.scrollY;
        
        updateNavbarBackground(scrollY);
        updateScrollToTopVisibility(scrollY);
    }
    
    function updateNavbarBackground(scrollY) {
        if (!navbar) return;
        
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    function updateScrollToTopVisibility(scrollY) {
        const isVisible = scrollY > 300;
        scrollToTopBtn.style.opacity = isVisible ? '1' : '0';
        scrollToTopBtn.style.visibility = isVisible ? 'visible' : 'hidden';
    }
    
    function createScrollToTopButton() {
        const button = document.createElement('button');
        button.innerHTML = '↑';
        button.className = 'scroll-to-top';
        button.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--primary-color);
            color: white;
            border: none;
            font-size: 20px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
        `;
        
        button.addEventListener('click', scrollToTop);
        document.body.appendChild(button);
        
        return button;
    }
    
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Interactive Project Cards
function setupProjectCardInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => enhanceCard(card));
        card.addEventListener('mouseleave', () => resetCard(card));
    });
    
    function enhanceCard(card) {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
    }
    
    function resetCard(card) {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
    }
}

// Smooth Navigation Scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });
    
    function handleSmoothScroll(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

// Skills Section Animations
function setupSkillAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillItems = document.querySelectorAll('.skill-item');
    
    // Animate skill bars on scroll
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            if (isElementInViewport(bar)) {
                animateSkillBar(bar);
            }
        });
    };
    
    function isElementInViewport(element) {
        const barPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        return barPosition < screenPosition;
    }
    
    function animateSkillBar(bar) {
        const width = bar.getAttribute('data-width');
        if (width) {
            bar.style.width = width + '%';
            bar.style.setProperty('--target-width', width + '%');
        }
    }
    
    // Setup skill item hover effects
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => highlightSkill(item));
        item.addEventListener('mouseleave', () => resetSkill(item));
    });
    
    function highlightSkill(item) {
        item.style.borderLeftColor = '#e74c3c';
    }
    
    function resetSkill(item) {
        item.style.borderLeftColor = 'var(--primary-color)';
    }
    
    // Initial check and scroll listener
    animateSkillBars();
    window.addEventListener('scroll', animateSkillBars);
}

// Interactive Tool Items
function setupToolInteractions() {
    const toolItems = document.querySelectorAll('.tool-item');
    
    toolItems.forEach(item => {
        item.addEventListener('click', () => handleToolClick(item));
        item.addEventListener('mouseenter', () => enhanceTool(item));
        item.addEventListener('mouseleave', () => resetTool(item));
    });
    
    function handleToolClick(item) {
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
            item.style.transform = 'translateY(-2px)';
        }, 150);
    }
    
    function enhanceTool(item) {
        item.style.transform = 'translateY(-2px)';
    }
    
    function resetTool(item) {
        item.style.transform = 'translateY(0)';
    }
}

// Dynamic Typing Animation for Hero Section
function setupTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const config = {
        texts: ['Web Developer', 'Problem Solver', 'Tech Enthusiast'],
        typeSpeed: 100,
        deleteSpeed: 50,
        pauseDuration: 2000
    };
    
    let state = {
        textIndex: 0,
        charIndex: 0,
        isDeleting: false
    };
    
    function typeText() {
        const currentText = config.texts[state.textIndex];
        
        updateDisplayText(currentText);
        updateCharIndex();
        
        const speed = calculateTypeSpeed();
        setTimeout(typeText, speed);
    }
    
    function updateDisplayText(currentText) {
        if (state.isDeleting) {
            typingElement.textContent = currentText.substring(0, state.charIndex - 1);
        } else {
            typingElement.textContent = currentText.substring(0, state.charIndex + 1);
        }
    }
    
    function updateCharIndex() {
        if (state.isDeleting) {
            state.charIndex--;
        } else {
            state.charIndex++;
        }
    }
    
    function calculateTypeSpeed() {
        const currentText = config.texts[state.textIndex];
        let speed = state.isDeleting ? config.deleteSpeed : config.typeSpeed;
        
        if (!state.isDeleting && state.charIndex === currentText.length) {
            speed = config.pauseDuration;
            state.isDeleting = true;
        } else if (state.isDeleting && state.charIndex === 0) {
            state.isDeleting = false;
            state.textIndex = (state.textIndex + 1) % config.texts.length;
        }
        
        return speed;
    }
    
    typeText();
}

// Initialize typing animation
document.addEventListener('DOMContentLoaded', setupTypingAnimation);