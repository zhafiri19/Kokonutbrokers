// Main JavaScript for Kokonut Insurance Brokers Website

document.addEventListener('DOMContentLoaded', function() {
    // Show loading screen
    showLoadingScreen();
    
    // Load components
    loadComponents();
    
    // Initialize all functionality after loading
    setTimeout(() => {
        initNavigation();
        initScrollAnimations();
        initCounters();
        initAccordions();
        initContactForm();
        initMobileMenu();
        initSmoothScroll();
        initParallax();
        initFAQ();
        initBackToTop();
        initBlogFilters();
        initJobFilters();
        initFAQSearch();
        hideLoadingScreen();
    }, 2000);
});

// Loading Screen Functions
function showLoadingScreen() {
    const loadingContainer = document.getElementById('loading-screen-container');
    const navbar = document.getElementById('navbar');
    
    // Hide navbar during loading
    if (navbar) {
        navbar.style.display = 'none';
    }
    
    if (loadingContainer) {
        fetch('src/components/LoadingScreen.html')
            .then(response => response.text())
            .then(html => {
                loadingContainer.innerHTML = html;
            })
            .catch(error => console.error('Error loading loading screen:', error));
    }
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const navbar = document.getElementById('navbar');
    
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                // Show navbar after loading screen is hidden
                if (navbar) {
                    navbar.style.display = 'block';
                }
            }, 500);
        }, 1000);
    }
}

// Load Components
function loadComponents() {
    loadNavbar();
    loadFooter();
}

function loadNavbar() {
    const navbarContainer = document.getElementById('navbar');
    if (navbarContainer) {
        fetch('src/components/Navbar.html')
            .then(response => response.text())
            .then(html => {
                navbarContainer.innerHTML = html;
            })
            .catch(error => console.error('Error loading navbar:', error));
    }
}

function loadFooter() {
    const footerContainer = document.getElementById('footer');
    if (footerContainer) {
        fetch('src/components/Footer.html')
            .then(response => response.text())
            .then(html => {
                footerContainer.innerHTML = html;
            })
            .catch(error => console.error('Error loading footer:', error));
    }
}

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }

        // Update active navigation link
        updateActiveNavLink();
    });

    // Update active page on load and resize
    setTimeout(() => {
        updateActivePage();
        updateActiveNavLink();
    }, 100);
    window.addEventListener('resize', updateActivePage);

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            const hamburgerIcon = document.getElementById('hamburger-icon');
            const closeIcon = document.getElementById('close-icon');
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                // Reset to hamburger icon
                hamburgerIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
                closeIcon.classList.remove('rotate-90');
            }
        });
    });

    function updateActiveNavLink() {
        const scrollY = window.pageYOffset;
        let currentSection = '';

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });

        // Update all nav links (desktop and mobile)
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref && linkHref.startsWith('#')) {
                const targetId = linkHref.substring(1);
                
                // Remove active class from all nav links
                link.classList.remove('active');
                
                // Add active class to current section link
                if (targetId === currentSection) {
                    link.classList.add('active');
                }
            }
        });

        // Also check current page from URL
        updateActivePage();
    }

    function updateActivePage() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop().replace('.html', '') || 'home';
        
        // Update desktop navbar links based on current page
        navLinks.forEach(link => {
            const dataPage = link.getAttribute('data-page');
            
            // Remove active class from all links first
            link.classList.remove('active');
            
            // Add active class to current page link (desktop only)
            if (dataPage === currentPage && window.innerWidth >= 1024) {
                link.classList.add('active');
            }
        });
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-icon');

    if (mobileMenuButton && mobileMenu && hamburgerIcon && closeIcon) {
        mobileMenuButton.addEventListener('click', function() {
            const isHidden = mobileMenu.classList.contains('hidden');
            
            // Toggle menu
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icons with animation
            if (isHidden) {
                // Show close icon (X), hide hamburger
                hamburgerIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
                closeIcon.classList.add('rotate-90');
            } else {
                // Show hamburger icon, hide close icon (X)
                hamburgerIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
                closeIcon.classList.remove('rotate-90');
            }
        });
    }
}

// Smooth scroll behavior
function initSmoothScroll() {
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counter animation if element has counter
                if (entry.target.classList.contains('counter')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe all fade-in and slide-up elements
    document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
        observer.observe(el);
    });

    // Observe counter elements
    document.querySelectorAll('.counter').forEach(el => {
        observer.observe(el);
    });
}

// Counter animation
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;

        function updateCounter() {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        }

        // Store the update function for later use
        counter.updateCounter = updateCounter;
    });
}

function animateCounter(counter) {
    if (counter.updateCounter && !counter.classList.contains('animated')) {
        counter.classList.add('animated');
        counter.updateCounter();
    }
}

// Accordion functionality
function initAccordions() {
    // Product accordions
    const accordionToggles = document.querySelectorAll('.accordion-toggle');
    
    accordionToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const productId = this.getAttribute('data-product');
            const content = document.getElementById(productId);
            
            if (content) {
                content.classList.toggle('active');
                
                // Update button text and icon
                const icon = this.querySelector('i');
                if (content.classList.contains('active')) {
                    icon.classList.remove('fa-info-circle');
                    icon.classList.add('fa-times-circle');
                    this.innerHTML = '<i class="fas fa-times-circle mr-2"></i>Tutup Detail';
                } else {
                    icon.classList.remove('fa-times-circle');
                    icon.classList.add('fa-info-circle');
                    this.innerHTML = '<i class="fas fa-info-circle mr-2"></i>Detail Produk';
                }
            }
        });
    });

    // FAQ accordions
    const faqToggles = document.querySelectorAll('.faq-toggle');
    
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            const content = faqItem.querySelector('.faq-content');
            const icon = this.querySelector('i');
            
            // Close other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.querySelector('.faq-content').classList.add('hidden');
                    item.querySelector('.faq-toggle i').classList.remove('fa-chevron-up');
                    item.querySelector('.faq-toggle i').classList.add('fa-chevron-down');
                }
            });
            
            // Toggle current FAQ item
            content.classList.toggle('hidden');
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        });
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Hide any existing messages
            successMessage.classList.add('hidden');
            errorMessage.classList.add('hidden');
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!validateForm(data)) {
                errorMessage.classList.remove('hidden');
                return;
            }
            
            // Simulate form submission (replace with actual API call)
            simulateFormSubmission();
        });
    }

    function validateForm(data) {
        const required = ['nama', 'email', 'telepon', 'pesan'];
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        
        for (let field of required) {
            if (!data[field] || data[field].trim() === '') {
                return false;
            }
        }
        
        if (!emailRegex.test(data.email)) {
            return false;
        }
        
        if (!phoneRegex.test(data.telepon)) {
            return false;
        }
        
        return true;
    }

    function simulateFormSubmission() {
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Mengirim...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success message
            successMessage.classList.remove('hidden');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 2000);
    }
}

// FAQ functionality (separate from accordions)
function initFAQ() {
    // Additional FAQ-specific functionality if needed
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('shadow-xl');
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('shadow-xl');
        });
    });
}

// Parallax effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Utility functions
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

// Add hover effects to cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card-hover');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Logo grayscale to color effect
document.addEventListener('DOMContentLoaded', function() {
    const logos = document.querySelectorAll('.logo-grayscale');
    
    logos.forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            this.style.filter = 'grayscale(0%)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.filter = 'grayscale(100%)';
        });
    });
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/300x200/cccccc/666666?text=Image+Not+Found';
        });
    });
});

// Performance optimization - lazy loading
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});

// Initialize page transitions
function initPageTransitions() {
    const links = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"])');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // Add fade-out effect
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease-out';
            
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        const hamburgerIcon = document.getElementById('hamburger-icon');
        const closeIcon = document.getElementById('close-icon');
        
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            // Reset icons to hamburger
            if (hamburgerIcon && closeIcon) {
                hamburgerIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
                closeIcon.classList.remove('rotate-90');
            }
        }
    }
    
    // Tab key navigation improvements
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-nav');
});

// Console branding
console.log('%c🥥 Kokonut Insurance Brokers', 'font-size: 20px; font-weight: bold; color: #10b981;');
console.log('%cThe Next Level of Insurance Brokers', 'font-size: 14px; color: #6b7280;');
console.log('%c🌐 https://kokonutinsurance.com', 'font-size: 12px; color: #9ca3af;');

// Additional Functions for New Features

// Back to Top Button
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.remove('opacity-0', 'invisible');
                backToTopButton.classList.add('opacity-100', 'visible');
            } else {
                backToTopButton.classList.add('opacity-0', 'invisible');
                backToTopButton.classList.remove('opacity-100', 'visible');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Blog Category Filters
function initBlogFilters() {
    const categoryFilters = document.querySelectorAll('.category-filter');
    const blogCards = document.querySelectorAll('.blog-card');

    if (categoryFilters.length > 0) {
        categoryFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Update active filter
                categoryFilters.forEach(f => {
                    f.classList.remove('active', 'bg-emerald-600', 'text-white');
                    f.classList.add('bg-white', 'text-gray-700', 'border', 'border-gray-300');
                });
                this.classList.add('active', 'bg-emerald-600', 'text-white');
                this.classList.remove('bg-white', 'text-gray-700', 'border', 'border-gray-300');

                // Filter blog cards
                blogCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.classList.add('fade-in');
                        }, 100);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
}

// Job Filters (if needed)
function initJobFilters() {
    const jobCards = document.querySelectorAll('.job-card');
    
    // Add hover effects for job cards
    jobCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// FAQ Search Functionality
function initFAQSearch() {
    const searchInput = document.getElementById('faqSearch');
    const searchResults = document.getElementById('searchResults');
    const resultCount = document.getElementById('resultCount');
    const searchTerm = document.getElementById('searchTerm');
    const faqItems = document.querySelectorAll('.faq-item');

    if (searchInput && faqItems.length > 0) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            let visibleCount = 0;

            faqItems.forEach(item => {
                const question = item.querySelector('h3').textContent.toLowerCase();
                const answer = item.querySelector('.faq-content').textContent.toLowerCase();
                
                if (question.includes(query) || answer.includes(query)) {
                    item.style.display = 'block';
                    visibleCount++;
                } else {
                    item.style.display = 'none';
                }
            });

            // Update search results
            if (query.length > 0) {
                searchResults.classList.remove('hidden');
                resultCount.textContent = visibleCount;
                searchTerm.textContent = query;
            } else {
                searchResults.classList.add('hidden');
                faqItems.forEach(item => {
                    item.style.display = 'block';
                });
            }
        });
    }
}

// Download Button Functionality
function initDownloadButtons() {
    const downloadButtons = document.querySelectorAll('button[data-download]');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const file = this.getAttribute('data-download');
            
            // Show loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Downloading...';
            this.disabled = true;
            
            // Simulate download
            setTimeout(() => {
                // Create download link
                const link = document.createElement('a');
                link.href = `https://via.placeholder.com/file/${file}`;
                link.download = file;
                link.click();
                
                // Reset button
                this.innerHTML = originalText;
                this.disabled = false;
                
                // Show success message
                showNotification('Download started successfully!', 'success');
            }, 1500);
        });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300`;
    
    if (type === 'success') {
        notification.classList.add('bg-green-500', 'text-white');
    } else if (type === 'error') {
        notification.classList.add('bg-red-500', 'text-white');
    } else {
        notification.classList.add('bg-blue-500', 'text-white');
    }
    
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Hide notification
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize download buttons when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initDownloadButtons();
        initNavbarScroll();
    }, 2500);
    
    // Set current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            // Change navbar style when scrolled
            navbar.classList.add('navbar-scrolled');
            
            // Adjust text colors for better contrast
            const navLinks = navbar.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                if (!link.classList.contains('text-emerald-300')) {
                    link.classList.add('text-emerald-100');
                }
            });
        } else {
            // Reset navbar style when at top
            navbar.classList.remove('navbar-scrolled');
            
            // Reset text colors
            const navLinks = navbar.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                if (!link.classList.contains('text-emerald-300')) {
                    link.classList.remove('text-emerald-100');
                    link.classList.add('text-white');
                }
            });
        }
        
        lastScrollTop = scrollTop;
    });
}
