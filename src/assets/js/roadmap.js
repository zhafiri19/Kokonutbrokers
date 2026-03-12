// Roadmap Timeline JavaScript
class RoadmapTimeline {
    constructor() {
        this.roadmapItems = [];
        this.progressDots = [];
        this.currentIndex = 0;
        this.isScrolling = false;
        
        this.init();
    }
    
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    setup() {
        // Get all roadmap items
        this.roadmapItems = document.querySelectorAll('.roadmap-item');
        
        if (this.roadmapItems.length === 0) {
            console.log('No roadmap items found');
            return;
        }
        
        console.log('Found', this.roadmapItems.length, 'roadmap items');
        
        // Make items visible immediately
        this.roadmapItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 200);
        });
        
        // Create progress dots
        this.createProgressDots();
        
        // Setup intersection observer for animations
        this.setupIntersectionObserver();
        
        // Setup scroll events
        this.setupScrollEvents();
        
        // Setup click events for navigation
        this.setupClickEvents();
        
        // Initial update
        this.updateActiveState();
        
        // Add smooth scroll behavior
        this.addSmoothScroll();
    }
    
    createProgressDots() {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'roadmap-progress';
        
        this.roadmapItems.forEach((item, index) => {
            const dot = document.createElement('div');
            dot.className = 'progress-dot';
            dot.dataset.index = index;
            
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => this.scrollToItem(index));
            progressContainer.appendChild(dot);
            this.progressDots.push(dot);
        });
        
        document.body.appendChild(progressContainer);
    }
    
    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, options);
        
        this.roadmapItems.forEach(item => {
            observer.observe(item);
        });
    }
    
    setupScrollEvents() {
        let scrollTimeout;
        
        window.addEventListener('scroll', () => {
            if (this.isScrolling) return;
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.updateActiveState();
            }, 100);
        });
    }
    
    setupClickEvents() {
        // Add click events to roadmap nodes
        document.querySelectorAll('.roadmap-node').forEach((node, index) => {
            node.addEventListener('click', () => {
                this.scrollToItem(index);
            });
            
            // Add hover effects
            node.addEventListener('mouseenter', () => {
                this.highlightItem(index);
            });
            
            node.addEventListener('mouseleave', () => {
                this.clearHighlight();
            });
        });
        
        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                this.next();
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                this.previous();
            }
        });
    }
    
    updateActiveState() {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        let activeIndex = 0;
        
        this.roadmapItems.forEach((item, index) => {
            const itemTop = item.offsetTop;
            const itemBottom = itemTop + item.offsetHeight;
            
            if (scrollPosition >= itemTop && scrollPosition <= itemBottom) {
                activeIndex = index;
            }
        });
        
        this.setActiveItem(activeIndex);
    }
    
    setActiveItem(index) {
        // Update progress dots
        this.progressDots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i < index) {
                dot.classList.add('completed');
            } else {
                dot.classList.remove('completed');
            }
        });
        
        if (this.progressDots[index]) {
            this.progressDots[index].classList.add('active');
        }
        
        // Update roadmap nodes
        document.querySelectorAll('.roadmap-node').forEach((node, i) => {
            node.classList.remove('active');
            if (i === index) {
                node.classList.add('active');
            }
        });
        
        this.currentIndex = index;
    }
    
    scrollToItem(index) {
        if (index < 0 || index >= this.roadmapItems.length) return;
        
        this.isScrolling = true;
        const targetItem = this.roadmapItems[index];
        
        // Calculate scroll position to center the item
        const itemTop = targetItem.offsetTop;
        const itemHeight = targetItem.offsetHeight;
        const viewportHeight = window.innerHeight;
        const scrollPosition = itemTop - (viewportHeight / 2) + (itemHeight / 2);
        
        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        });
        
        setTimeout(() => {
            this.isScrolling = false;
            this.setActiveItem(index);
        }, 1000);
    }
    
    highlightItem(index) {
        // Add highlight effect to roadmap content
        const content = this.roadmapItems[index].querySelector('.roadmap-content');
        if (content) {
            content.style.transform = 'translateY(-8px) scale(1.02)';
            content.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.2)';
        }
        
        // Highlight the node
        const node = this.roadmapItems[index].querySelector('.roadmap-node');
        if (node) {
            node.style.transform = 'translateX(-50%) scale(1.2)';
        }
    }
    
    clearHighlight() {
        // Remove highlight effect
        document.querySelectorAll('.roadmap-content').forEach(content => {
            content.style.transform = '';
            content.style.boxShadow = '';
        });
        
        document.querySelectorAll('.roadmap-node').forEach(node => {
            node.style.transform = '';
        });
    }
    
    addSmoothScroll() {
        // Add smooth scrolling for the entire page
        document.documentElement.style.scrollBehavior = 'smooth';
    }
    
    // Public methods
    next() {
        if (this.currentIndex < this.roadmapItems.length - 1) {
            this.scrollToItem(this.currentIndex + 1);
        }
    }
    
    previous() {
        if (this.currentIndex > 0) {
            this.scrollToItem(this.currentIndex - 1);
        }
    }
    
    goTo(index) {
        this.scrollToItem(index);
    }
    
    // Auto-scroll feature (optional)
    startAutoScroll(interval = 5000) {
        this.autoScrollInterval = setInterval(() => {
            if (this.currentIndex < this.roadmapItems.length - 1) {
                this.next();
            } else {
                this.goTo(0); // Loop back to start
            }
        }, interval);
    }
    
    stopAutoScroll() {
        if (this.autoScrollInterval) {
            clearInterval(this.autoScrollInterval);
        }
    }
}

// Initialize roadmap when DOM is ready
let roadmapTimeline;

// Multiple initialization attempts
function initRoadmap() {
    if (!roadmapTimeline) {
        roadmapTimeline = new RoadmapTimeline();
    }
}

// Try different initialization methods
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRoadmap);
} else {
    initRoadmap();
}

// Also try after window load
window.addEventListener('load', initRoadmap);

// Export for global access
window.RoadmapTimeline = RoadmapTimeline;
window.roadmapTimeline = roadmapTimeline;
