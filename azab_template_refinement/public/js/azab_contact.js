// Azab Contact Page JavaScript
(function() {
    'use strict';

    // Initialize contact page functionality
    document.addEventListener('DOMContentLoaded', function() {
        initContactForm();
        initContactCards();
        initMapInteractions();
        initBusinessHours();
        initContactAnimations();
    });

    // Contact Form Handler
    function initContactForm() {
        const contactForm = document.getElementById('azab-contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Validate form
                if (validateContactForm()) {
                    submitContactForm();
                }
            });
            
            // Real-time validation
            const inputs = contactForm.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', function() {
                    validateField(this);
                });
                
                input.addEventListener('input', function() {
                    // Clear error state on input
                    this.classList.remove('error');
                    const errorMsg = this.parentNode.querySelector('.azab-error-message');
                    if (errorMsg) {
                        errorMsg.remove();
                    }
                });
            });
        }
    }

    // Validate contact form
    function validateContactForm() {
        const form = document.getElementById('azab-contact-form');
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        // Validate email format
        const emailField = form.querySelector('input[type="email"]');
        if (emailField && emailField.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                showFieldError(emailField, 'يرجى إدخال بريد إلكتروني صحيح');
                isValid = false;
            }
        }
        
        // Validate phone number
        const phoneField = form.querySelector('input[type="tel"]');
        if (phoneField && phoneField.value) {
            const phoneRegex = /^[+]?[\d\s\-()]{10,}$/;
            if (!phoneRegex.test(phoneField.value)) {
                showFieldError(phoneField, 'يرجى إدخال رقم هاتف صحيح');
                isValid = false;
            }
        }
        
        return isValid;
    }

    // Validate individual field
    function validateField(field) {
        const value = field.value.trim();
        
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'هذا الحقل مطلوب');
            return false;
        }
        
        // Clear any existing errors
        field.classList.remove('error');
        const errorMsg = field.parentNode.querySelector('.azab-error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
        
        return true;
    }

    // Show field error
    function showFieldError(field, message) {
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.azab-error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorElement = document.createElement('div');
        errorElement.className = 'azab-error-message';
        errorElement.textContent = message;
        field.parentNode.appendChild(errorElement);
    }

    // Submit contact form
    function submitContactForm() {
        const form = document.getElementById('azab-contact-form');
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'جاري الإرسال...';
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Add timestamp
        data.submitted_at = new Date().toISOString();
        
        // Simulate API call (replace with actual endpoint)
        setTimeout(() => {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            
            // Show success message
            showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك خلال 24 ساعة.', 'success');
            
            // Reset form
            form.reset();
            
            // Send confirmation email (if needed)
            sendConfirmationEmail(data.email, data.name);
            
        }, 2000);
        
        // Here you would integrate with your actual backend
        // Example: submitToBackend(data);
    }

    // Submit to backend (example)
    function submitToBackend(data) {
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                showNotification('تم إرسال رسالتك بنجاح!', 'success');
                document.getElementById('azab-contact-form').reset();
            } else {
                showNotification('حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.', 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showNotification('حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.', 'error');
        });
    }

    // Send confirmation email
    function sendConfirmationEmail(email, name) {
        // This would integrate with your email service
        console.log(`Sending confirmation to ${email} for ${name}`);
    }

    // Contact Cards Interactions
    function initContactCards() {
        const contactCards = document.querySelectorAll('.azab-contact-card');
        
        contactCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.classList.add('hovered');
                
                // Add subtle animation to icon
                const icon = this.querySelector('.azab-contact-icon i');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('hovered');
                
                const icon = this.querySelector('.azab-contact-icon i');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
            
            // Add click to call/email functionality
            card.addEventListener('click', function() {
                const phoneLink = this.querySelector('p:contains("الهاتف")');
                if (phoneLink) {
                    const phoneNumber = phoneLink.textContent.match(/[\d+]+/);
                    if (phoneNumber) {
                        window.open(`tel:${phoneNumber[0]}`);
                    }
                }
            });
        });
    }

    // Map Interactions
    function initMapInteractions() {
        // If you have embedded maps, add interaction handlers here
        const mapContainers = document.querySelectorAll('.azab-map-container');
        
        mapContainers.forEach(container => {
            container.addEventListener('click', function() {
                const address = this.getAttribute('data-address');
                if (address) {
                    openInMaps(address);
                }
            });
        });
    }

    // Open address in maps
    function openInMaps(address) {
        const encodedAddress = encodeURIComponent(address);
        const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
        window.open(mapUrl, '_blank');
    }

    // Business Hours
    function initBusinessHours() {
        const currentTime = new Date();
        const currentDay = currentTime.getDay(); // 0 = Sunday, 6 = Saturday
        const currentHour = currentTime.getHours();
        
        // Check if business is open (assuming Saturday-Thursday 8AM-6PM)
        const isBusinessDay = currentDay >= 6 || currentDay <= 4; // Saturday to Thursday
        const isBusinessHours = currentHour >= 8 && currentHour < 18;
        const isOpen = isBusinessDay && isBusinessHours;
        
        // Update business status
        const statusIndicator = document.querySelector('.azab-business-status');
        if (statusIndicator) {
            statusIndicator.className = `azab-business-status ${isOpen ? 'open' : 'closed'}`;
            statusIndicator.textContent = isOpen ? 'مفتوح الآن' : 'مغلق حالياً';
        }
        
        // Highlight current day
        const hoursItems = document.querySelectorAll('.azab-hours-item');
        if (hoursItems[currentDay]) {
            hoursItems[currentDay].classList.add('current-day');
        }
    }

    // Contact Animations
    function initContactAnimations() {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 150);
                }
            });
        }, observerOptions);

        // Observe contact elements
        document.querySelectorAll('.azab-contact-card, .azab-form-card, .azab-hours-card').forEach(element => {
            observer.observe(element);
        });
    }

    // Show notification
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `azab-notification azab-notification-${type}`;
        
        notification.innerHTML = `
            <div class="azab-notification-content">
                <i class="fa fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="azab-notification-close">&times;</button>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Auto hide after 5 seconds
        const autoHideTimer = setTimeout(() => {
            hideNotification(notification);
        }, 5000);
        
        // Manual close
        notification.querySelector('.azab-notification-close').addEventListener('click', () => {
            clearTimeout(autoHideTimer);
            hideNotification(notification);
        });
    }

    // Hide notification
    function hideNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }

    // Quick Actions
    function initQuickActions() {
        const quickButtons = document.querySelectorAll('.azab-quick-buttons .azab-btn');
        
        quickButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Add click animation
                this.classList.add('clicked');
                setTimeout(() => {
                    this.classList.remove('clicked');
                }, 200);
                
                // Track button clicks (analytics)
                const buttonText = this.textContent.trim();
                console.log(`Quick action clicked: ${buttonText}`);
            });
        });
    }

    // Copy contact info to clipboard
    function initCopyToClipboard() {
        const contactMethods = document.querySelectorAll('.azab-contact-method');
        
        contactMethods.forEach(method => {
            method.addEventListener('dblclick', function() {
                const text = this.querySelector('a').textContent;
                navigator.clipboard.writeText(text).then(() => {
                    showNotification('تم نسخ معلومات الاتصال', 'success');
                });
            });
        });
    }

    // Initialize additional features
    initQuickActions();
    initCopyToClipboard();

    // Auto-refresh business hours every minute
    setInterval(initBusinessHours, 60000);

})();