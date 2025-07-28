// Azab Services Page JavaScript
(function() {
    'use strict';

    // Initialize services page functionality
    document.addEventListener('DOMContentLoaded', function() {
        initServiceCards();
        initServiceAnimations();
        initCTAButtons();
    });

    // Service Cards Interactions
    function initServiceCards() {
        const serviceCards = document.querySelectorAll('.azab-service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.classList.add('hovered');
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('hovered');
            });
            
            // Add click event for mobile devices
            card.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    this.classList.toggle('active');
                }
            });
        });
    }

    // Service Animations
    function initServiceAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe service cards
        document.querySelectorAll('.azab-service-card').forEach(card => {
            observer.observe(card);
        });
    }

    // CTA Buttons
    function initCTAButtons() {
        const ctaButtons = document.querySelectorAll('.azab-btn');
        
        ctaButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Add click animation
                this.classList.add('clicked');
                
                setTimeout(() => {
                    this.classList.remove('clicked');
                }, 300);
            });
        });
    }

    // Service Filter (if needed in future)
    function initServiceFilter() {
        const filterButtons = document.querySelectorAll('.azab-filter-btn');
        const serviceCards = document.querySelectorAll('.azab-service-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter cards
                serviceCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, 100);
                    } else {
                        card.classList.remove('visible');
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Contact Form Handler (if contact form exists on services page)
    function initContactForm() {
        const contactForm = document.getElementById('services-contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(this);
                const data = Object.fromEntries(formData);
                
                // Add service type if selected
                const activeService = document.querySelector('.azab-service-card.active');
                if (activeService) {
                    data.service_type = activeService.querySelector('h3').textContent;
                }
                
                // Submit form (integrate with your backend)
                submitContactForm(data);
            });
        }
    }

    // Submit contact form
    function submitContactForm(data) {
        // Show loading state
        const submitBtn = document.querySelector('#services-contact-form button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'جاري الإرسال...';
        submitBtn.disabled = true;
        
        // Here you would integrate with your backend API
        // Example: fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
        
        // Simulate API call
        setTimeout(() => {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');
            
            // Reset form
            document.getElementById('services-contact-form').reset();
        }, 2000);
    }

    // Show notification
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `azab-notification azab-notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Hide notification after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Initialize smooth scrolling
    initSmoothScrolling();

})();