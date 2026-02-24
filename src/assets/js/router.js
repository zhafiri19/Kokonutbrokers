// Router for single page application functionality

class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = null;
        this.init();
    }

    init() {
        // Define routes
        this.routes = {
            'home': 'src/pages/home.html',
            'tentang': 'src/pages/tentang.html',
            'produk': 'src/pages/produk.html',
            'penghargaan-mitra': 'src/pages/penghargaan-mitra.html',
            'kontak': 'src/pages/kontak.html',
            'faq': 'src/pages/faq.html',
            'blog': 'src/pages/blog.html',
            'karir': 'src/pages/karir.html',
            'download': 'src/pages/download.html',
            'asuransi-alat-berat': 'src/pages/asuransi-alat-berat.html',
            'asuransi-cargo': 'src/pages/asuransi-cargo.html',
            'asuransi-kendaraan': 'src/pages/asuransi-kendaraan.html',
            'asuransi-kredit': 'src/pages/asuransi-kredit.html',
            'asuransi-project-liability': 'src/pages/asuransi-project-liability.html',
            'asuransi-kesehatan-internasional': 'src/pages/asuransi-kesehatan-internasional.html',
            'asuransi-jaminan': 'src/pages/asuransi-jaminan.html',
            'property-all-risk': 'src/pages/property-all-risk.html',
            'asuransi-kesehatan-karyawan': 'src/pages/asuransi-kesehatan-karyawan.html',
            'asuransi-property-all-risk': 'src/pages/asuransi-property-all-risk.html'
        };

        // Handle initial route
        this.handleRoute();
        
        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            this.handleRoute();
        });

        // Handle navigation clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const route = e.target.getAttribute('href').substring(1);
                if (this.routes[route]) {
                    this.navigateTo(route);
                    
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobile-menu');
                    const hamburgerIcon = document.getElementById('hamburger-icon');
                    const closeIcon = document.getElementById('close-icon');
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                        if (hamburgerIcon) hamburgerIcon.classList.remove('hidden');
                        if (closeIcon) {
                            closeIcon.classList.add('hidden');
                            closeIcon.classList.remove('rotate-90');
                        }
                    }
                }
            }
        });
        
        // Initialize active navigation for current page
        setTimeout(() => {
            const currentRoute = window.location.hash.substring(1) || 'home';
            this.updateActiveNav(currentRoute);
        }, 100);
    }

    handleRoute() {
        const hash = window.location.hash.substring(1) || 'home';
        this.loadPage(hash);
    }

    async navigateTo(route) {
        window.location.hash = route;
        await this.loadPage(route);
    }

    async loadPage(route) {
        if (!this.routes[route]) {
            route = 'home';
        }

        try {
            const response = await fetch(this.routes[route]);
            if (!response.ok) {
                throw new Error(`Failed to load ${route}`);
            }

            const content = await response.text();
            const mainContent = document.getElementById('main-content');
            
            if (mainContent) {
                // Add fade out effect
                mainContent.style.opacity = '0';
                
                setTimeout(() => {
                    mainContent.innerHTML = content;
                    mainContent.style.opacity = '1';
                    
                    // Re-initialize animations for new content
                    this.reinitializeAnimations();
                    
                    // Update active navigation
                    this.updateActiveNav(route);
                    
                    // Scroll to top
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 300);
            }

            this.currentRoute = route;
        } catch (error) {
            console.error('Error loading page:', error);
            this.loadErrorPage();
        }
    }

    loadErrorPage() {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.innerHTML = `
                <section class="py-20 bg-white">
                    <div class="container mx-auto px-4 text-center">
                        <h1 class="text-4xl font-bold text-gray-900 mb-4">Halaman Tidak Ditemukan</h1>
                        <p class="text-xl text-gray-600 mb-8">Maaf, halaman yang Anda cari tidak tersedia.</p>
                        <button onclick="router.navigateTo('home')" class="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300">
                            Kembali ke Beranda
                        </button>
                    </div>
                </section>
            `;
        }
    }

    updateActiveNav(route) {
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, .footer-link');
        
        navLinks.forEach(link => {
            // Remove active classes
            link.classList.remove('active', 'text-emerald-300', 'font-semibold');
            link.classList.add('text-white');
            
            // Reset underline (only for navbar links)
            const underline = link.querySelector('span');
            if (underline) {
                underline.classList.remove('w-full');
                underline.classList.add('w-0');
            }
            
            // Check if this link should be active
            const href = link.getAttribute('href');
            const dataPage = link.getAttribute('data-page');
            
            // Check if current route is a product detail page
            const isProductDetail = this.isProductDetailRoute(route);
            
            if ((href === '#' + route) || (dataPage === route) || 
                (isProductDetail && (href === '#produk' || dataPage === 'produk'))) {
                // Add active classes
                link.classList.remove('text-white');
                link.classList.add('active', 'text-emerald-300', 'font-semibold');
                
                // Show underline for active link (only for navbar links)
                if (underline) {
                    underline.classList.remove('w-0');
                    underline.classList.add('w-full');
                }
            }
        });
    }

    isProductDetailRoute(route) {
        const productRoutes = [
            'asuransi-alat-berat',
            'asuransi-cargo', 
            'asuransi-kendaraan',
            'asuransi-kredit',
            'asuransi-project-liability',
            'asuransi-kesehatan-internasional',
            'asuransi-jaminan',
            'asuransi-kesehatan-karyawan',
            'asuransi-property-all-risk'
        ];
        return productRoutes.includes(route);
    }

    reinitializeAnimations() {
        // Re-initialize scroll animations for new content
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
                        const target = parseInt(entry.target.getAttribute('data-target'));
                        const increment = target / 100;
                        let current = 0;

                        function updateCounter() {
                            if (current < target) {
                                current += increment;
                                entry.target.textContent = Math.ceil(current);
                                setTimeout(updateCounter, 20);
                            } else {
                                entry.target.textContent = target;
                            }
                        }

                        updateCounter();
                    }
                }
            });
        }, observerOptions);

        // Observe all fade-in and slide-up elements in new content
        document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
            observer.observe(el);
        });

        // Re-initialize accordions
        this.reinitializeAccordions();
        
        // Re-initialize contact form if present
        this.reinitializeContactForm();
        
        // Re-initialize FAQ if present
        this.reinitializeFAQ();
    }

    reinitializeAccordions() {
        // Product accordions
        const accordionToggles = document.querySelectorAll('.accordion-toggle');
        
        accordionToggles.forEach(toggle => {
            // Remove existing listeners to avoid duplicates
            toggle.replaceWith(toggle.cloneNode(true));
        });

        // Add fresh event listeners
        document.querySelectorAll('.accordion-toggle').forEach(toggle => {
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
    }

    reinitializeContactForm() {
        const contactForm = document.getElementById('contactForm');
        const successMessage = document.getElementById('successMessage');
        const errorMessage = document.getElementById('errorMessage');

        if (contactForm) {
            // Remove existing listeners
            const newForm = contactForm.cloneNode(true);
            contactForm.parentNode.replaceChild(newForm, contactForm);

            // Add fresh event listener
            newForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Hide any existing messages
                successMessage.classList.add('hidden');
                errorMessage.classList.add('hidden');
                
                // Get form data
                const formData = new FormData(newForm);
                const data = Object.fromEntries(formData);
                
                // Basic validation
                if (!validateContactForm(data)) {
                    errorMessage.classList.remove('hidden');
                    return;
                }
                
                // Simulate form submission
                simulateContactFormSubmission(newForm, successMessage);
            });
        }

        function validateContactForm(data) {
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

        function simulateContactFormSubmission(form, successMessage) {
            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Mengirim...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Show success message
                successMessage.classList.remove('hidden');
                
                // Reset form
                form.reset();
                
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 2000);
        }
    }

    reinitializeFAQ() {
        const faqToggles = document.querySelectorAll('.faq-toggle');
        
        faqToggles.forEach(toggle => {
            // Remove existing listeners
            toggle.replaceWith(toggle.cloneNode(true));
        });

        // Add fresh event listeners
        document.querySelectorAll('.faq-toggle').forEach(toggle => {
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
}

// Initialize router when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.router = new Router();
});
