/* ========================================
   NAVIGATION JAVASCRIPT
   ======================================== */

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

// Desktop active link on click
function initDesktopActiveLinks() {
    const desktopLinks = document.querySelectorAll('.nav-link');
    
    desktopLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all desktop links
            desktopLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Store active link in localStorage for persistence
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                localStorage.setItem('activeNavLink', href);
            }
        });
    });
    
    // Restore active link from localStorage on page load
    const savedActiveLink = localStorage.getItem('activeNavLink');
    if (savedActiveLink) {
        desktopLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === savedActiveLink) {
                link.classList.add('active');
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
}

// Update active navigation link based on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
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
}

// Initialize navigation
function initNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    // Update active link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Initial update
    updateActiveNavLink();
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

// Initialize all navigation functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initDesktopActiveLinks(); // Add desktop active link initialization
    initSmoothScroll();
    initNavigation();
    initNavbarScroll();
});

// ESC key to close mobile menu
document.addEventListener('keydown', function(e) {
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
});

// Close menu when clicking outside
document.addEventListener('click', function(e) {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    
    if (mobileMenu && !mobileMenu.classList.contains('hidden') && 
        !mobileMenu.contains(e.target) && 
        !mobileMenuButton.contains(e.target)) {
        mobileMenuButton.click();
    }
});
