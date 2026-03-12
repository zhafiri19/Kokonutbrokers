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
            
            // Toggle menu with smooth animation
            if (isHidden) {
                // Show menu
                mobileMenu.classList.remove('hidden');
                setTimeout(() => {
                    mobileMenu.classList.add('show');
                    mobileMenu.classList.remove('hidden');
                }, 10);
                
                // Show close icon (X), hide hamburger
                hamburgerIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
                closeIcon.classList.add('rotate-90');
                
                // Prevent body scroll when menu is open
                document.body.style.overflow = 'hidden';
                
            } else {
                // Hide menu
                mobileMenu.classList.remove('show');
                mobileMenu.classList.add('hidden');
                
                // Show hamburger icon, hide close icon (X)
                hamburgerIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
                closeIcon.classList.remove('rotate-90');
                
                // Restore body scroll
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.remove('show');
                    mobileMenu.classList.add('hidden');
                    hamburgerIcon.classList.remove('hidden');
                    closeIcon.classList.add('hidden');
                    closeIcon.classList.remove('rotate-90');
                    document.body.style.overflow = '';
                }
            }
        });

        // Close menu when pressing Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('show');
                mobileMenu.classList.add('hidden');
                hamburgerIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
                closeIcon.classList.remove('rotate-90');
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking on mobile nav links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('show');
                mobileMenu.classList.add('hidden');
                hamburgerIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
                closeIcon.classList.remove('rotate-90');
                document.body.style.overflow = '';
            });
        });
    }
}

// Desktop active link on click - DISABLED (handled by router.js)
function initDesktopActiveLinks() {
    // DISABLED - router.js handles active state
    console.log('initDesktopActiveLinks disabled - using router.js instead');
}

// Smooth scroll behavior - DISABLED (handled by router.js)
function initSmoothScroll() {
    // DISABLED - router.js handles smooth scroll
    console.log('initSmoothScroll disabled - using router.js instead');
}

// Update active navigation link based on scroll - DISABLED (handled by router.js)
function updateActiveNavLink() {
    // DISABLED - router.js handles active state
    console.log('updateActiveNavLink disabled - using router.js instead');
}

// Initialize navigation - DISABLED (handled by router.js)
function initNavigation() {
    // DISABLED - router.js handles navigation
    console.log('initNavigation disabled - using router.js instead');
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
    initMobileMenu(); // Mobile menu functionality
    // initDesktopActiveLinks(); // DISABLED - router.js handles active state
    // initSmoothScroll(); // DISABLED - router.js handles smooth scroll
    // initNavigation(); // DISABLED - router.js handles navigation
    initNavbarScroll(); // Navbar scroll effect
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
