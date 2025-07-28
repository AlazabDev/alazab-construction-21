// Azab Projects Page JavaScript
(function() {
    'use strict';

    // Initialize projects page functionality
    document.addEventListener('DOMContentLoaded', function() {
        initProjectFilter();
        initProjectGallery();
        initProjectAnimations();
        initProjectStats();
    });

    // Project Filter Functionality
    function initProjectFilter() {
        const filterButtons = document.querySelectorAll('.azab-filter-btn');
        const projectItems = document.querySelectorAll('.project-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter projects
                projectItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, 100);
                    } else {
                        item.classList.remove('visible');
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
                
                // Update projects count
                updateProjectsCount(filter);
            });
        });
    }

    // Update projects count
    function updateProjectsCount(filter) {
        const projectItems = document.querySelectorAll('.project-item');
        let visibleCount = 0;
        
        projectItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                visibleCount++;
            }
        });
        
        // Update count display if exists
        const countDisplay = document.querySelector('.azab-projects-count');
        if (countDisplay) {
            countDisplay.textContent = `عرض ${visibleCount} مشروع`;
        }
    }

    // Project Gallery
    function initProjectGallery() {
        const projectCards = document.querySelectorAll('.azab-project-card');
        
        projectCards.forEach(card => {
            const overlay = card.querySelector('.azab-project-overlay');
            const image = card.querySelector('.azab-project-image img');
            
            card.addEventListener('mouseenter', function() {
                this.classList.add('hovered');
                if (image) {
                    image.style.transform = 'scale(1.1)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('hovered');
                if (image) {
                    image.style.transform = 'scale(1)';
                }
            });
            
            // Add lightbox functionality
            const viewButton = card.querySelector('.azab-btn');
            if (viewButton) {
                viewButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    const projectId = this.getAttribute('href').split('/').pop();
                    openProjectLightbox(projectId, card);
                });
            }
        });
    }

    // Project Lightbox
    function openProjectLightbox(projectId, card) {
        const lightbox = document.createElement('div');
        lightbox.className = 'azab-project-lightbox';
        
        const projectTitle = card.querySelector('.azab-project-info h3').textContent;
        const projectImage = card.querySelector('.azab-project-image img').src;
        const projectDescription = card.querySelector('.azab-project-info p').textContent;
        const projectCategory = card.querySelector('.azab-project-category').textContent;
        
        lightbox.innerHTML = `
            <div class="azab-lightbox-content">
                <div class="azab-lightbox-header">
                    <h2>${projectTitle}</h2>
                    <button class="azab-lightbox-close">&times;</button>
                </div>
                <div class="azab-lightbox-body">
                    <div class="azab-lightbox-image">
                        <img src="${projectImage}" alt="${projectTitle}">
                    </div>
                    <div class="azab-lightbox-info">
                        <span class="azab-project-category">${projectCategory}</span>
                        <p>${projectDescription}</p>
                        <div class="azab-lightbox-actions">
                            <a href="/projects/${projectId}" class="azab-btn azab-btn-primary">عرض التفاصيل الكاملة</a>
                            <button onclick="closeLightbox()" class="azab-btn azab-btn-outline">إغلاق</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="azab-lightbox-overlay"></div>
        `;
        
        document.body.appendChild(lightbox);
        
        // Show lightbox
        setTimeout(() => {
            lightbox.classList.add('active');
        }, 50);
        
        // Close lightbox events
        lightbox.querySelector('.azab-lightbox-close').addEventListener('click', closeLightbox);
        lightbox.querySelector('.azab-lightbox-overlay').addEventListener('click', closeLightbox);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    // Close lightbox
    window.closeLightbox = function() {
        const lightbox = document.querySelector('.azab-project-lightbox');
        if (lightbox) {
            lightbox.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(lightbox);
                document.body.style.overflow = '';
            }, 300);
        }
    };

    // Project Animations
    function initProjectAnimations() {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 100);
                }
            });
        }, observerOptions);

        // Observe project cards
        document.querySelectorAll('.azab-project-card').forEach(card => {
            observer.observe(card);
        });
    }

    // Project Statistics Animation
    function initProjectStats() {
        const statNumbers = document.querySelectorAll('.azab-stat-number');
        
        const animateNumber = (element, target) => {
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                // Format number
                let displayValue = Math.floor(current);
                if (target >= 100) {
                    displayValue = displayValue + '+';
                }
                
                element.textContent = displayValue;
            }, 20);
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.textContent.replace('+', ''));
                    animateNumber(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }

    // Load More Projects
    function initLoadMore() {
        const loadMoreBtn = document.querySelector('.azab-load-more');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', function() {
                this.textContent = 'جاري التحميل...';
                this.disabled = true;
                
                // Simulate loading more projects
                setTimeout(() => {
                    loadMoreProjects();
                    this.textContent = 'عرض المزيد';
                    this.disabled = false;
                }, 1500);
            });
        }
    }

    // Load more projects (simulate)
    function loadMoreProjects() {
        const projectsContainer = document.getElementById('projects-container');
        const newProjects = [
            {
                title: 'مشروع جديد 1',
                category: 'residential',
                image: '/assets/azab_template_refinement/img/projects/project4.jpg',
                description: 'وصف المشروع الجديد'
            },
            // Add more projects as needed
        ];
        
        newProjects.forEach(project => {
            const projectElement = createProjectElement(project);
            projectsContainer.appendChild(projectElement);
        });
    }

    // Create project element
    function createProjectElement(project) {
        const projectDiv = document.createElement('div');
        projectDiv.className = 'col-md-4 mb-4 project-item';
        projectDiv.setAttribute('data-category', project.category);
        
        projectDiv.innerHTML = `
            <div class="azab-project-card">
                <div class="azab-project-image">
                    <img src="${project.image}" alt="${project.title}">
                    <div class="azab-project-overlay">
                        <button class="azab-btn azab-btn-light">عرض التفاصيل</button>
                    </div>
                </div>
                <div class="azab-project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <span class="azab-project-category">${project.category}</span>
                </div>
            </div>
        `;
        
        return projectDiv;
    }

    // Search Projects
    function initProjectSearch() {
        const searchInput = document.querySelector('.azab-project-search');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const projectItems = document.querySelectorAll('.project-item');
                
                projectItems.forEach(item => {
                    const title = item.querySelector('h3').textContent.toLowerCase();
                    const description = item.querySelector('p').textContent.toLowerCase();
                    
                    if (title.includes(searchTerm) || description.includes(searchTerm)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        }
    }

    // Initialize additional features
    initLoadMore();
    initProjectSearch();

})();