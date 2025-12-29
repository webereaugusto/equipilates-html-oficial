// ==========================================
// EQUIPILATES - ADVANCED SCROLL EXPERIENCE
// ==========================================

let currentScroll = 0;
let targetScroll = 0;
let ease = 0.075;

// ==========================================
// ELASTIC SLIDE ANIMATIONS
// ==========================================
function initElasticAnimations() {
    const slideElements = document.querySelectorAll('.slide-left, .slide-right');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    slideElements.forEach(el => observer.observe(el));
}

// ==========================================
// FIGMA-STYLE MOTION DESIGN
// ==========================================
function initFigmaMotion() {
    // Reveal animations for all scroll elements
    const revealElements = document.querySelectorAll('[data-scroll-reveal], [data-scroll-scale], [data-scroll-fade]');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
    
    // Magnetic button effect
    const buttons = document.querySelectorAll('.cta-primary, .cta-secondary');
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.05)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0) scale(1)';
        });
    });
    
    // Ripple effect on click
    const clickables = document.querySelectorAll('.benefit-card, .product-card, .gallery-item, .testimonial-clean, .cta-primary');
    clickables.forEach(card => {
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Stats reveal animation
    const statsItems = document.querySelectorAll('.stat-item');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.3
    });
    
    statsItems.forEach(item => statsObserver.observe(item));
}

// ==========================================
// PARALLAX SCROLL EFFECT
// ==========================================
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const inView = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (inView) {
                const speed = parseFloat(el.dataset.parallax) || 0.5;
                const yPos = -(scrolled * speed * 0.5);
                el.style.transform = `translate3d(0, ${yPos}px, 0)`;
            }
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

// ==========================================
// SMOOTH SCROLL WITH MOMENTUM
// ==========================================
function initSmoothScrollMomentum() {
    let currentScroll = 0;
    let targetScroll = 0;
    let ease = 0.08;
    let isScrolling = false;
    
    function smoothScrollUpdate() {
        targetScroll = window.pageYOffset;
        currentScroll += (targetScroll - currentScroll) * ease;
        
        // Apply parallax effect during smooth scroll
        const diff = targetScroll - currentScroll;
        if (Math.abs(diff) > 0.5) {
            isScrolling = true;
            requestAnimationFrame(smoothScrollUpdate);
        } else {
            currentScroll = targetScroll;
            isScrolling = false;
        }
    }
    
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            smoothScrollUpdate();
        }
        
        clearTimeout(scrollTimeout);
        document.body.classList.add('is-scrolling');
        
        scrollTimeout = setTimeout(() => {
            document.body.classList.remove('is-scrolling');
        }, 150);
    }, { passive: true });
}

// Init all
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollProgress();
    initHeroSlider();
    initStickyScroll();
    initHorizontalScroll();
    initTextReveal();
    initImageGridScale();
    initCounters();
    initInnovationCards();
    initSplitText();
    initFormAnimations();
    initSmoothScroll();
    initElasticAnimations();
    initFigmaMotion();
    initParallax();
    initSmoothScrollMomentum();
});

// ==========================================
// HERO AUTO SLIDER WITH FADE
// ==========================================
function initHeroSlider() {
    const hero = document.querySelector('.hero');
    const bgItems = document.querySelectorAll('.bg-item');
    const navDots = document.querySelectorAll('.nav-dot');
    const contentNumber = document.querySelector('.content-number');
    
    let currentIndex = 0;
    const totalSlides = 4;
    const autoPlayInterval = 5000; // 5 seconds per slide
    let autoPlayTimer = null;
    
    const slides = [
        {
            number: '01',
            tag: 'EQUIPILATES 2024',
            title: ['EXCELÊNCIA', 'ABSOLUTA'],
            description: 'Equipamentos premium que redefinem<br/>o padrão de qualidade no Pilates',
            cta1: { text: 'Conhecer Produtos', link: '#manifesto' },
            cta2: { text: 'Solicitar Orçamento', link: '#contact' }
        },
        {
            number: '02',
            tag: 'DESIGN & FUNÇÃO',
            title: ['QUALIDADE', 'SUPERIOR'],
            description: 'Fabricação artesanal com tecnologia<br/>de ponta para resultados excepcionais',
            cta1: { text: 'Explorar Linha', link: '#classic' },
            cta2: { text: 'Ver Galeria', link: '#contemporary' }
        },
        {
            number: '03',
            tag: '20 ANOS DE HISTÓRIA',
            title: ['CONFIANÇA', 'COMPROVADA'],
            description: '2500+ studios em 3 continentes<br/>escolhem nossa excelência',
            cta1: { text: 'Nossa História', link: '#innovation' },
            cta2: { text: 'Fale Conosco', link: '#contact' }
        },
        {
            number: '04',
            tag: 'INOVAÇÃO CONSTANTE',
            title: ['TECNOLOGIA', 'AVANÇADA'],
            description: 'Equipamentos inteligentes para<br/>resultados superiores e mensuráveis',
            cta1: { text: 'Ver Tecnologia', link: '#contemporary' },
            cta2: { text: 'Solicitar Demo', link: '#contact' }
        }
    ];
    
    function updateContent(index) {
        const slide = slides[index];
        
        // Update number with modern animation
        contentNumber.style.opacity = '0';
        contentNumber.style.transform = 'scale(0.8) rotate(-10deg)';
        setTimeout(() => {
            contentNumber.textContent = slide.number;
            contentNumber.style.opacity = '1';
            contentNumber.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
        
        // Get elements
        const tag = document.querySelector('.content-tag');
        const titleLines = document.querySelectorAll('.title-line');
        const description = document.querySelector('.content-description');
        const ctaContainer = document.querySelector('.content-cta');
        const ctas = document.querySelectorAll('.content-cta a');
        
        // Remove motion-in class to reset
        tag.classList.remove('motion-in');
        titleLines.forEach(line => line.classList.remove('motion-in'));
        description.classList.remove('motion-in');
        ctaContainer.classList.remove('motion-in-reverse');
        
        // Trigger reflow to restart animation
        void tag.offsetWidth;
        
        setTimeout(() => {
            // Update content
            tag.textContent = slide.tag;
            titleLines[0].textContent = slide.title[0];
            titleLines[1].textContent = slide.title[1];
            description.innerHTML = slide.description;
            ctas[0].innerHTML = `<span>${slide.cta1.text}</span><div class="btn-arrow">→</div>`;
            ctas[0].href = slide.cta1.link;
            ctas[1].textContent = slide.cta2.text;
            ctas[1].href = slide.cta2.link;
            
            // Add motion classes with stagger
            setTimeout(() => {
                tag.classList.add('motion-in');
            }, 100);
            
            setTimeout(() => {
                titleLines[0].classList.add('motion-in');
            }, 200);
            
            setTimeout(() => {
                titleLines[1].classList.add('motion-in');
            }, 350);
            
            setTimeout(() => {
                description.classList.add('motion-in');
            }, 500);
            
            setTimeout(() => {
                ctaContainer.classList.add('motion-in-reverse');
            }, 650);
        }, 400);
    }
    
    function goToSlide(index) {
        if (index === currentIndex || index < 0 || index >= totalSlides) return;
        
        // Remove active from current slide
        bgItems[currentIndex].classList.remove('active');
        navDots[currentIndex].classList.remove('active');
        
        // Add active to new slide
        bgItems[index].classList.add('active');
        navDots[index].classList.add('active');
        
        currentIndex = index;
        updateContent(index);
        
        // Reset auto-play timer
        resetAutoPlay();
    }
    
    // Auto-play functionality
    function startAutoPlay() {
        autoPlayTimer = setInterval(() => {
            const nextIndex = (currentIndex + 1) % totalSlides;
            goToSlide(nextIndex);
        }, autoPlayInterval);
    }
    
    function stopAutoPlay() {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
    }
    
    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            const prev = (currentIndex - 1 + totalSlides) % totalSlides;
            goToSlide(prev);
        }
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            const next = (currentIndex + 1) % totalSlides;
            goToSlide(next);
        }
    });
    
    // Touch support - swipe left/right
    let touchStartX = 0;
    let touchEndX = 0;
    
    hero.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        stopAutoPlay(); // Stop auto-play on touch
    }, { passive: true });
    
    hero.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                // Swipe left - next slide
                const next = (currentIndex + 1) % totalSlides;
                goToSlide(next);
            } else {
                // Swipe right - prev slide
                const prev = (currentIndex - 1 + totalSlides) % totalSlides;
                goToSlide(prev);
            }
        } else {
            startAutoPlay(); // Resume auto-play if no swipe
        }
    }, { passive: true });
    
    // Click on dots
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Navigation arrows
    const prevBtn = document.querySelector('.hero-arrow-prev');
    const nextBtn = document.querySelector('.hero-arrow-next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const prev = (currentIndex - 1 + totalSlides) % totalSlides;
            goToSlide(prev);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const next = (currentIndex + 1) % totalSlides;
            goToSlide(next);
        });
    }
    
    // Initialize first slide content with animations
    function initFirstSlide() {
        const tag = document.querySelector('.content-tag');
        const titleLines = document.querySelectorAll('.title-line');
        const description = document.querySelector('.content-description');
        const ctaContainer = document.querySelector('.content-cta');
        
        // Add motion classes with stagger for initial load
        setTimeout(() => {
            tag.classList.add('motion-in');
        }, 500);
        
        setTimeout(() => {
            titleLines[0].classList.add('motion-in');
        }, 650);
        
        setTimeout(() => {
            titleLines[1].classList.add('motion-in');
        }, 800);
        
        setTimeout(() => {
            description.classList.add('motion-in');
        }, 950);
        
        setTimeout(() => {
            ctaContainer.classList.add('motion-in-reverse');
        }, 1100);
    }
    
    // Initialize first slide on load
    initFirstSlide();
    
    // Start auto-play on load
    startAutoPlay();
    
    // Pause auto-play when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoPlay();
        } else {
            startAutoPlay();
        }
    });
}

// ==========================================
// CUSTOM CURSOR
// ==========================================

// ==========================================
// NAVIGATION
// ==========================================
function initNavigation() {
    const nav = document.querySelector('.nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const navLinks = document.querySelectorAll('.nav-menu a');
    let lastScroll = 0;
    
    function closeMenu() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function openMenu() {
        navToggle.classList.add('active');
        navMenu.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Hamburger menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });
    
    // Close menu when clicking on overlay
    if (menuOverlay) {
        menuOverlay.addEventListener('click', () => {
            closeMenu();
        });
    }
    
    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Hide nav on scroll down, show on scroll up
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 500) {
            nav.classList.add('hidden');
            // Close menu if open when scrolling
            if (navMenu.classList.contains('active')) {
                closeMenu();
            }
        } else {
            nav.classList.remove('hidden');
        }
        
        lastScroll = currentScroll;
    });
}

// ==========================================
// SCROLL PROGRESS
// ==========================================
function initScrollProgress() {
    const progress = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progress.style.width = scrolled + '%';
    });
}

// Parallax for slide backgrounds
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        const activeSlide = hero.querySelector('.hero-slide.active .slide-bg img');
        if (activeSlide) {
            activeSlide.style.transform = `scale(1.1) translateY(${scrolled * 0.3}px)`;
        }
    }
});

// ==========================================
// STICKY SCROLL EFFECTS
// ==========================================
function initStickyScroll() {
    const sections = document.querySelectorAll('.sticky-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Animate split chars
                const splitChars = entry.target.querySelectorAll('.split-chars');
                splitChars.forEach(el => animateSplitChars(el));
            }
        });
    }, { threshold: 0.3 });
    
    sections.forEach(section => observer.observe(section));
}

function animateSplitChars(element) {
    if (element.dataset.animated) return;
    element.dataset.animated = 'true';
    
    const text = element.textContent;
    element.textContent = '';
    
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(100px) rotate(10deg)';
        span.style.transition = `all 0.6s cubic-bezier(0.75, 0, 0.27, 1) ${index * 0.03}s`;
        element.appendChild(span);
        
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0) rotate(0)';
            });
        });
    });
}

// ==========================================
// HORIZONTAL SCROLL
// ==========================================
function initHorizontalScroll() {
    const section = document.querySelector('.horizontal-scroll');
    if (!section) return;
    
    const content = document.querySelector('.horizontal-content');
    
    window.addEventListener('scroll', () => {
        const rect = section.getBoundingClientRect();
        const scrollPercentage = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
        
        if (rect.top < 0 && rect.bottom > window.innerHeight) {
            const maxScroll = content.scrollWidth - window.innerWidth;
            const scrollAmount = scrollPercentage * maxScroll;
            content.style.transform = `translateX(-${scrollAmount}px)`;
        }
    });
}

// ==========================================
// TEXT REVEAL
// ==========================================
function initTextReveal() {
    const reveals = document.querySelectorAll('[data-scroll-reveal]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    reveals.forEach(el => observer.observe(el));
}

// ==========================================
// IMAGE GRID SCALE
// ==========================================
function initImageGridScale() {
    const items = document.querySelectorAll('[data-scroll-scale]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'scale(0.8)';
                entry.target.style.transition = 'all 0.8s cubic-bezier(0.75, 0, 0.27, 1)';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    items.forEach(item => observer.observe(item));
}

// ==========================================
// COUNTERS
// ==========================================
function initCounters() {
    const counters = document.querySelectorAll('[data-target]');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const update = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(update);
            } else {
                counter.textContent = target;
            }
        };
        
        update();
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// ==========================================
// INNOVATION CARDS FADE
// ==========================================
function initInnovationCards() {
    const cards = document.querySelectorAll('[data-scroll-fade]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.2 });
    
    cards.forEach(card => observer.observe(card));
}

// ==========================================
// SPLIT TEXT ANIMATION
// ==========================================
function initSplitText() {
    const elements = document.querySelectorAll('.split-text');
    
    elements.forEach(el => {
        const lines = el.querySelectorAll('.line');
        
        lines.forEach((line, index) => {
            const span = document.createElement('span');
            span.textContent = line.textContent;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(100%)';
            line.textContent = '';
            line.appendChild(span);
        });
    });
}

// ==========================================
// FORM ANIMATIONS
// ==========================================
function initFormAnimations() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateX(10px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateX(0)';
        });
    });
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('.submit-btn');
        const originalText = btn.querySelector('span').textContent;
        
        btn.querySelector('span').textContent = 'ENVIANDO...';
        btn.disabled = true;
        btn.style.transform = 'scale(0.95)';
        
        // Simulate sending
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        btn.querySelector('span').textContent = 'ENVIADO ✓';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        setTimeout(() => {
            form.reset();
            btn.querySelector('span').textContent = originalText;
            btn.disabled = false;
            btn.style.transform = 'scale(1)';
            btn.style.background = '';
        }, 3000);
    });
}

// ==========================================
// SMOOTH SCROLL TO ANCHOR
// ==========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

// ==========================================
// PARALLAX ON SCROLL
// ==========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax backgrounds
    document.querySelectorAll('.sticky-bg').forEach(bg => {
        const section = bg.closest('.sticky-section');
        if (!section) return;
        
        const rect = section.getBoundingClientRect();
        const progress = 1 - (rect.top + rect.height) / (window.innerHeight + rect.height);
        
        if (progress >= 0 && progress <= 1) {
            bg.style.transform = `scale(1.1) translateY(${progress * 100}px)`;
        }
    });
});

// ==========================================
// INTERSECTION OBSERVER FOR FADE IN
// ==========================================
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            entry.target.style.transition = 'all 1s cubic-bezier(0.75, 0, 0.27, 1)';
            
            requestAnimationFrame(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            });
            
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

fadeElements.forEach(el => fadeObserver.observe(el));

// ==========================================
// MOUSE MOVE PARALLAX
// ==========================================
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    document.querySelectorAll('.feature-item, .innovation-card').forEach(el => {
        const speed = 20;
        const x = mouseX * speed;
        const y = mouseY * speed;
        
        el.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ==========================================
// DUPLICATE TESTIMONIALS FOR INFINITE SCROLL
// ==========================================
const testimonialTrack = document.querySelector('.testimonials-track');
if (testimonialTrack) {
    const clone = testimonialTrack.cloneNode(true);
    testimonialTrack.parentElement.appendChild(clone);
}

// ==========================================
// IMAGE LAZY LOAD
// ==========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// PERFORMANCE: RAF THROTTLE
// ==========================================
let rafPending = false;
window.addEventListener('scroll', () => {
    if (!rafPending) {
        requestAnimationFrame(() => {
            rafPending = false;
        });
        rafPending = true;
    }
}, { passive: true });

// ==========================================
// LOADING ANIMATION
// ==========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ==========================================
// 3D TILT CARDS
// ==========================================
document.querySelectorAll('.innovation-card, .testimonial-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// ==========================================
// MAGNETIC BUTTONS
// ==========================================
document.querySelectorAll('.submit-btn, .nav-menu a').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// ==========================================
// CONSOLE EASTER EGG
// ==========================================
console.log('%c EQUIPILATES ', 'font-size: 50px; font-weight: bold; background: linear-gradient(135deg, #00F5FF, #FF00FF); padding: 20px; color: white;');
console.log('%c🚀 Website desenvolvido com tecnologia de ponta', 'font-size: 16px; color: #00F5FF;');
console.log('%c💜 Scroll experience by EquiPilates', 'font-size: 14px; color: #FF00FF;');

// ==========================================
// DEBUG MODE
// ==========================================
if (window.location.search.includes('debug')) {
    document.body.style.outline = '2px solid red';
    console.log('Debug mode enabled');
    
    document.querySelectorAll('section').forEach((section, index) => {
        const label = document.createElement('div');
        label.textContent = `Section ${index + 1}`;
        label.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: red;
            color: white;
            padding: 10px;
            font-size: 12px;
            z-index: 10000;
        `;
        section.style.position = 'relative';
        section.appendChild(label);
    });
}
