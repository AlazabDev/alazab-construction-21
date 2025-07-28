// Azab About Page JavaScript
(function() {
    'use strict';

    // Initialize about page functionality
    document.addEventListener('DOMContentLoaded', function() {
        initAboutAnimations();
        initTeamCards();
        initAchievementCounters();
        initTimelineAnimations();
        initCompanyValues();
    });

    // About Page Animations
    function initAboutAnimations() {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 200);
                }
            });
        }, observerOptions);

        // Observe sections
        document.querySelectorAll('.azab-story-content, .azab-vision-card, .azab-value-card, .azab-team-card').forEach(element => {
            observer.observe(element);
        });
    }

    // Team Cards Interactions
    function initTeamCards() {
        const teamCards = document.querySelectorAll('.azab-team-card');
        
        teamCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.classList.add('hovered');
                
                // Add team member details animation
                const teamInfo = this.querySelector('.azab-team-info');
                if (teamInfo) {
                    teamInfo.style.transform = 'translateY(-10px)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('hovered');
                
                const teamInfo = this.querySelector('.azab-team-info');
                if (teamInfo) {
                    teamInfo.style.transform = 'translateY(0)';
                }
            });
            
            // Add click event for more details
            card.addEventListener('click', function() {
                const memberName = this.querySelector('h4').textContent;
                const memberPosition = this.querySelector('.azab-team-position').textContent;
                const memberDescription = this.querySelector('p:not(.azab-team-position)').textContent;
                
                showTeamMemberModal(memberName, memberPosition, memberDescription);
            });
        });
    }

    // Show team member modal
    function showTeamMemberModal(name, position, description) {
        const modal = document.createElement('div');
        modal.className = 'azab-team-modal';
        
        modal.innerHTML = `
            <div class="azab-modal-content">
                <div class="azab-modal-header">
                    <h2>${name}</h2>
                    <button class="azab-modal-close">&times;</button>
                </div>
                <div class="azab-modal-body">
                    <h3>${position}</h3>
                    <p>${description}</p>
                    <div class="azab-member-contact">
                        <a href="mailto:${name.toLowerCase().replace(' ', '.')}@al-azab.co" class="azab-btn azab-btn-outline">
                            <i class="fa fa-envelope"></i> تواصل معي
                        </a>
                    </div>
                </div>
            </div>
            <div class="azab-modal-overlay"></div>
        `;
        
        document.body.appendChild(modal);
        
        // Show modal
        setTimeout(() => {
            modal.classList.add('active');
        }, 50);
        
        // Close modal events
        modal.querySelector('.azab-modal-close').addEventListener('click', closeTeamModal);
        modal.querySelector('.azab-modal-overlay').addEventListener('click', closeTeamModal);
        
        document.body.style.overflow = 'hidden';
    }

    // Close team modal
    function closeTeamModal() {
        const modal = document.querySelector('.azab-team-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(modal);
                document.body.style.overflow = '';
            }, 300);
        }
    }

    // Achievement Counters Animation
    function initAchievementCounters() {
        const achievementNumbers = document.querySelectorAll('.azab-achievement-number');
        
        const animateCounter = (element, target) => {
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                let displayValue = Math.floor(current);
                if (target >= 100) {
                    displayValue = displayValue + '+';
                }
                
                element.textContent = displayValue;
            }, 30);
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.textContent.replace('+', ''));
                    animateCounter(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        achievementNumbers.forEach(number => {
            observer.observe(number);
        });
    }

    // Timeline Animations (if timeline exists)
    function initTimelineAnimations() {
        const timelineItems = document.querySelectorAll('.azab-timeline-item');
        
        if (timelineItems.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('timeline-animate');
                    }
                });
            }, { threshold: 0.3 });
            
            timelineItems.forEach(item => {
                observer.observe(item);
            });
        }
    }

    // Company Values Animation
    function initCompanyValues() {
        const valueCards = document.querySelectorAll('.azab-value-card');
        
        valueCards.forEach((card, index) => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.05)';
                
                // Add ripple effect
                createRippleEffect(this);
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Create ripple effect
    function createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.className = 'azab-ripple-effect';
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            element.removeChild(ripple);
        }, 600);
    }

    // Company History Slider (if exists)
    function initHistorySlider() {
        const historySlider = document.querySelector('.azab-history-slider');
        if (historySlider) {
            let currentSlide = 0;
            const slides = historySlider.querySelectorAll('.azab-history-slide');
            const totalSlides = slides.length;
            
            // Auto-advance slides
            setInterval(() => {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % totalSlides;
                slides[currentSlide].classList.add('active');
            }, 5000);
        }
    }

    // Vision and Mission Interactive Elements
    function initVisionMission() {
        const visionCards = document.querySelectorAll('.azab-vision-card');
        
        visionCards.forEach(card => {
            card.addEventListener('click', function() {
                // Toggle expanded state
                this.classList.toggle('expanded');
                
                // Show/hide additional content if available
                const extraContent = this.querySelector('.azab-extra-content');
                if (extraContent) {
                    extraContent.style.display = this.classList.contains('expanded') ? 'block' : 'none';
                }
            });
        });
    }

    // Company Statistics Progress Bars
    function initStatsProgressBars() {
        const progressBars = document.querySelectorAll('.azab-progress-bar');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const targetWidth = progressBar.getAttribute('data-progress') || '100';
                    
                    progressBar.style.width = targetWidth + '%';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        progressBars.forEach(bar => {
            observer.observe(bar);
        });
    }

    // Awards and Certifications (if exists)
    function initAwardsSection() {
        const awards = document.querySelectorAll('.azab-award-item');
        
        awards.forEach((award, index) => {
            award.addEventListener('click', function() {
                // Show award details modal
                const awardTitle = this.querySelector('.azab-award-title').textContent;
                const awardDescription = this.querySelector('.azab-award-description').textContent;
                
                showAwardModal(awardTitle, awardDescription);
            });
        });
    }

    // Show award modal
    function showAwardModal(title, description) {
        const modal = document.createElement('div');
        modal.className = 'azab-award-modal';
        
        modal.innerHTML = `
            <div class="azab-modal-content">
                <div class="azab-modal-header">
                    <h2>${title}</h2>
                    <button class="azab-modal-close">&times;</button>
                </div>
                <div class="azab-modal-body">
                    <p>${description}</p>
                </div>
            </div>
            <div class="azab-modal-overlay"></div>
        `;
        
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.classList.add('active');
        }, 50);
        
        modal.querySelector('.azab-modal-close').addEventListener('click', function() {
            modal.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        });
    }

    // Initialize additional features
    initHistorySlider();
    initVisionMission();
    initStatsProgressBars();
    initAwardsSection();

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
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

})();