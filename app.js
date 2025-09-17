// Portfolio and modal functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const categoryButtons = document.querySelectorAll('.category-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioTrack = document.getElementById('portfolioTrack');
    const modal = document.getElementById('videoModal');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');

    // Duplicate portfolio items for seamless scrolling
    function duplicatePortfolioItems() {
        const originalItems = Array.from(portfolioItems);
        originalItems.forEach(item => {
            const clone = item.cloneNode(true);
            portfolioTrack.appendChild(clone);
        });
        
        // Add event listeners to cloned items
        const allItems = document.querySelectorAll('.portfolio-item');
        allItems.forEach(item => {
            item.addEventListener('click', openVideoModal);
        });
    }

    // Initialize duplicated items
    duplicatePortfolioItems();

    // Category filtering
    function filterPortfolio(category) {
        const allItems = document.querySelectorAll('.portfolio-item');
        
        allItems.forEach(item => {
            const itemCategories = item.getAttribute('data-categories');
            
            if (category === 'all' || itemCategories.includes(category)) {
                item.style.display = 'block';
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    if (!itemCategories.includes(category) && category !== 'all') {
                        item.style.display = 'none';
                    }
                }, 300);
            }
        });

        // Restart animation after filtering
        setTimeout(() => {
            portfolioTrack.style.animation = 'none';
            portfolioTrack.offsetHeight; // Trigger reflow
            portfolioTrack.style.animation = 'scroll 20s linear infinite';
        }, 300);
    }

    // Category button click handlers
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter portfolio
            const category = this.getAttribute('data-category');
            filterPortfolio(category);
        });
    });

    // Open video modal
    function openVideoModal(e) {
        e.preventDefault();
        const videoUrl = this.getAttribute('data-video');
        
        // Add some visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);

        // Show modal with animation
        modal.classList.remove('hidden');
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            modal.style.transition = 'all 0.3s ease';
            modal.style.opacity = '1';
            modal.style.transform = 'scale(1)';
        }, 10);

        // Pause the scrolling animation when modal is open
        portfolioTrack.style.animationPlayState = 'paused';
    }

    // Close video modal
    function closeVideoModal() {
        modal.style.transition = 'all 0.3s ease';
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.style.transition = '';
        }, 300);

        // Resume the scrolling animation
        portfolioTrack.style.animationPlayState = 'running';
    }

    // Modal event listeners
    modalClose.addEventListener('click', closeVideoModal);
    modalOverlay.addEventListener('click', closeVideoModal);

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeVideoModal();
        }
    });

    // Portfolio item click handlers (for original items)
    portfolioItems.forEach(item => {
        item.addEventListener('click', openVideoModal);
    });

    // Smooth scroll for better UX
    function smoothScrollTo(element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    // Add hover effects to category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Telegram button interaction
    const telegramBtn = document.querySelector('.telegram-btn');
    if (telegramBtn) {
        telegramBtn.addEventListener('click', function(e) {
            // Add click effect
            this.style.transform = 'translateY(-3px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-3px) scale(1)';
            }, 150);
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    const sections = document.querySelectorAll('.portfolio, .contact');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        observer.observe(section);
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image img');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add glow effect to hero name on mouse move
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xPercent = (clientX / innerWidth) * 100;
            const yPercent = (clientY / innerHeight) * 100;
            
            heroName.style.textShadow = `
                ${xPercent / 10}px ${yPercent / 10}px 30px rgba(0, 243, 255, 0.5),
                ${-xPercent / 20}px ${-yPercent / 20}px 60px rgba(176, 0, 255, 0.3)
            `;
        });
    }

    // Performance optimization: Reduce animation on slower devices
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
        const animatedElements = document.querySelectorAll('[style*="animation"]');
        animatedElements.forEach(el => {
            el.style.animation = 'none';
        });
    }

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    console.log('Portfolio app initialized successfully!');
});