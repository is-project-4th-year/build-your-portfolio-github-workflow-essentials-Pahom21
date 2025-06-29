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
        texts: ['Web Developer', 'Fullstack Developer', 'Problem Solver', 'Tech Enthusiast', 'Machine Learning Engineer'],
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

// Portfolio Performance Optimizations & Advanced Features

// Performance: Throttle utility for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance: Debounce utility for input events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance: Optimized scroll event handling
function setupOptimizedScrollEffects() {
    const navbar = document.querySelector('.navbar');
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    // Throttled scroll handler for better performance
    const throttledScrollHandler = throttle((scrollY) => {
        // Batch DOM updates using requestAnimationFrame
        requestAnimationFrame(() => {
            updateNavbarBackground(navbar, scrollY);
            updateScrollToTopVisibility(scrollToTopBtn, scrollY);
        });
    }, 16); // ~60fps
    
    window.addEventListener('scroll', () => {
        throttledScrollHandler(window.scrollY);
    }, { passive: true });
}

// Performance: Lazy Loading Implementation
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    // Use modern IntersectionObserver for better performance
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadImage(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Load images 100px before they come into view
        rootMargin: '100px 0px',
        threshold: 0.01
    });
    
    function loadImage(img) {
        // Create a promise-based image loader
        return new Promise((resolve, reject) => {
            const newImg = new Image();
            newImg.onload = () => {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                img.classList.add('loaded');
                resolve();
            };
            newImg.onerror = reject;
            newImg.src = img.dataset.src;
        });
    }
    
    images.forEach(img => {
        img.classList.add('lazy');
        imageObserver.observe(img);
    });
}

// Performance: Efficient Animation Frame Management
class AnimationManager {
    constructor() {
        this.animations = new Set();
        this.isRunning = false;
    }
    
    add(callback) {
        this.animations.add(callback);
        if (!this.isRunning) {
            this.start();
        }
    }
    
    remove(callback) {
        this.animations.delete(callback);
        if (this.animations.size === 0) {
            this.stop();
        }
    }
    
    start() {
        this.isRunning = true;
        this.tick();
    }
    
    stop() {
        this.isRunning = false;
    }
    
    tick() {
        if (!this.isRunning) return;
        
        this.animations.forEach(callback => {
            try {
                callback();
            } catch (error) {
                console.error('Animation callback error:', error);
                this.animations.delete(callback);
            }
        });
        
        if (this.animations.size > 0) {
            requestAnimationFrame(() => this.tick());
        } else {
            this.stop();
        }
    }
}

// Performance: Optimized skill bar animations
function setupOptimizedSkillAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const animationManager = new AnimationManager();
    let animatedBars = new Set();
    
    const skillBarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animatedBars.has(entry.target)) {
                animateSkillBarOptimized(entry.target);
                animatedBars.add(entry.target);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });
    
    function animateSkillBarOptimized(bar) {
        const targetWidth = parseInt(bar.getAttribute('data-width'));
        let currentWidth = 0;
        const increment = targetWidth / 60; // 60 frames animation
        
        const animateFrame = () => {
            currentWidth += increment;
            if (currentWidth >= targetWidth) {
                currentWidth = targetWidth;
                bar.style.width = currentWidth + '%';
                animationManager.remove(animateFrame);
            } else {
                bar.style.width = currentWidth + '%';
            }
        };
        
        animationManager.add(animateFrame);
    }
    
    skillBars.forEach(bar => skillBarObserver.observe(bar));
}

// Performance: Theme Management with System Preference Detection
// function setupThemeToggle() {
//     const themeToggle = document.getElementById('theme-toggle');
//     if (!themeToggle) return;
    
//     // Check for system preference
//     const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
//     const currentTheme = localStorage.getItem('theme') || 
//                         (prefersDarkScheme.matches ? 'dark' : 'light');
    
//     // Apply theme efficiently
//     applyTheme(currentTheme);
    
//     // Listen for system theme changes
//     prefersDarkScheme.addEventListener('change', (e) => {
//         if (!localStorage.getItem('theme')) {
//             applyTheme(e.matches ? 'dark' : 'light');
//         }
//     });
    
//     themeToggle.addEventListener('click', toggleTheme);
    
//     function applyTheme(theme) {
//         // Use CSS custom properties for efficient theme switching
//         document.documentElement.setAttribute('data-theme', theme);
        
//         // Update meta theme-color for mobile browsers
//         const metaThemeColor = document.querySelector('meta[name="theme-color"]');
//         if (metaThemeColor) {
//             metaThemeColor.setAttribute('content', 
//                 theme === 'dark' ? '#1a1a1a' : '#ffffff'
//             );
//         }
//     }
    
//     function toggleTheme() {
//         const currentTheme = document.documentElement.getAttribute('data-theme');
//         const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
//         applyTheme(newTheme);
//         localStorage.setItem('theme', newTheme);
        
//         // Add transition class for smooth theme switching
//         document.documentElement.classList.add('theme-transition');
//         setTimeout(() => {
//             document.documentElement.classList.remove('theme-transition');
//         }, 300);
//     }
// }

// Performance: Optimized Contact Form with Input Debouncing
function setupOptimizedContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    // Debounced validation for better performance
    const debouncedValidation = debounce(() => {
        validateFormOptimized();
    }, 300);
    
    // Setup optimized real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        // Use passive listeners where possible
        input.addEventListener('input', debouncedValidation, { passive: true });
        input.addEventListener('blur', validateFormOptimized);
    });
    
    function validateFormOptimized() {
        // Use DocumentFragment for efficient DOM manipulation
        const fragment = document.createDocumentFragment();
        let isValid = true;
        
        inputs.forEach(input => {
            const isFieldValid = validateFieldOptimized(input);
            if (!isFieldValid) isValid = false;
        });
        
        return isValid;
    }
    
    function validateFieldOptimized(input) {
        const errorElement = document.getElementById(input.name + 'Error');
        if (!errorElement) return true;
        
        // Clear previous error efficiently
        if (errorElement.textContent) {
            errorElement.textContent = '';
        }
        input.classList.remove('error');
        
        // Validation logic here...
        return true; // Simplified for example
    }
}

// Performance: Resource Preloading
function setupResourcePreloading() {
    // Preload critical images
    const criticalImages = [
        '/images/profile-photo.JPG'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
    
    // Preload fonts
    // const criticalFonts = [
    //     '/fonts/primary-font.woff2',
    //     '/fonts/heading-font.woff2'
    // ];
    
    // criticalFonts.forEach(src => {
    //     const link = document.createElement('link');
    //     link.rel = 'preload';
    //     link.as = 'font';
    //     link.type = 'font/woff2';
    //     link.crossOrigin = 'anonymous';
    //     link.href = src;
    //     document.head.appendChild(link);
    // });
}

// Performance: Memory Management for Event Listeners
class EventManager {
    constructor() {
        this.listeners = new Map();
    }
    
    add(element, event, handler, options = {}) {
        const key = `${element}-${event}`;
        
        // Store reference for cleanup
        if (!this.listeners.has(key)) {
            this.listeners.set(key, []);
        }
        this.listeners.get(key).push({ handler, options });
        
        // Add event listener
        element.addEventListener(event, handler, options);
    }
    
    remove(element, event, handler) {
        const key = `${element}-${event}`;
        element.removeEventListener(event, handler);
        
        // Clean up reference
        if (this.listeners.has(key)) {
            const handlers = this.listeners.get(key);
            const index = handlers.findIndex(h => h.handler === handler);
            if (index > -1) {
                handlers.splice(index, 1);
                if (handlers.length === 0) {
                    this.listeners.delete(key);
                }
            }
        }
    }
    
    cleanup() {
        this.listeners.clear();
    }
}

// Performance: Optimized Intersection Observer Pool
class ObserverPool {
    constructor() {
        this.observers = new Map();
    }
    
    getObserver(options) {
        const key = JSON.stringify(options);
        
        if (!this.observers.has(key)) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const callback = entry.target._observerCallback;
                    if (callback && typeof callback === 'function') {
                        callback(entry);
                    }
                });
            }, options);
            
            this.observers.set(key, observer);
        }
        
        return this.observers.get(key);
    }
    
    observe(element, callback, options = {}) {
        element._observerCallback = callback;
        const observer = this.getObserver(options);
        observer.observe(element);
    }
    
    unobserve(element) {
        this.observers.forEach(observer => {
            observer.unobserve(element);
        });
        delete element._observerCallback;
    }
}

// Performance: Initialize optimized features
function initializePerformanceFeatures() {
    // Setup performance optimizations
    setupOptimizedScrollEffects();
    setupLazyLoading();
    setupOptimizedSkillAnimations();
    // setupThemeToggle();
    setupOptimizedContactForm();
    setupResourcePreloading();
    
    // Initialize managers
    window.eventManager = new EventManager();
    window.observerPool = new ObserverPool();
    window.animationManager = new AnimationManager();
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (window.eventManager) window.eventManager.cleanup();
        if (window.animationManager) window.animationManager.stop();
    });
}

// Performance: Critical resource loading
document.addEventListener('DOMContentLoaded', () => {
    // Use requestIdleCallback for non-critical initialization
    if ('requestIdleCallback' in window) {
        requestIdleCallback(initializePerformanceFeatures, { timeout: 2000 });
    } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(initializePerformanceFeatures, 100);
    }
});

// Performance: Service Worker Registration (if available)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}