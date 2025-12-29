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
    initUpgradeWizard();
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
    
    const WHATSAPP_NUMBER = '5521967329318';
    function buildWhatsAppLink(text) {
        const msg = encodeURIComponent(text);
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
    }

    // Language + copy (embedded to work even on file://)
    const HERO_COPY = {
        'pt-BR': [
            {
                number: '01',
                tag: 'AUTORIDADE GLOBAL',
                title: ['EQUIPILATES:', '18 ANOS MOVENDO O PILATES'],
                description: 'Mais de 30.000 estúdios montados e presença internacional.<br/>A escolha de quem quer ser referência.',
                cta1: { text: 'Solicitar Orçamento', link: buildWhatsAppLink('Olá, vim pelo site da Equipilates e gostaria de solicitar um orçamento para upgrade/expansão do meu estúdio.') },
                cta2: { text: 'Conhecer Nossa História', link: '#manifesto' }
            },
            {
                number: '02',
                tag: 'LINHA CLÁSSICA',
                title: ['FIDELIDADE TOTAL', 'AO LEGADO DE JOSEPH PILATES'],
                description: 'Equipamentos desenvolvidos rigorosamente nas medidas originais.<br/>O padrão ouro para o método clássico.',
                cta1: { text: 'Ver Linha Clássica', link: '#classic' },
                cta2: { text: 'Falar com Consultor', link: buildWhatsAppLink('Olá, vim pelo site da Equipilates e quero entender a Linha Clássica (medidas originais) para meu estúdio. Pode me orientar?') }
            },
            {
                number: '03',
                tag: 'NEGÓCIO & ROI',
                title: ['TRANSFORME SEU SONHO', 'EM UM NEGÓCIO DE SUCESSO'],
                description: 'Margens de lucro de até 62,7% mostram: Pilates pode ser muito rentável<br/>com os parceiros certos. Comece seu projeto agora.',
                cta1: { text: 'Monte seu Studio', link: '#wizard' },
                cta2: { text: 'Ver Condições de Pagamento', link: buildWhatsAppLink('Olá, vim pelo site da Equipilates e gostaria de ver as condições de pagamento (parcelamento) para equipamentos de Pilates.') }
            },
            {
                number: '04',
                tag: 'INOVAÇÃO & GARANTIA',
                title: ['EXCELÊNCIA E INOVAÇÃO', 'EM CADA MOVIMENTO'],
                description: 'Robustez e design avançado com 2 anos de garantia.<br/>Pagamento facilitado em até 36x direto de fábrica.',
                cta1: { text: 'Ver Linha Contemporânea', link: '#contemporary' },
                cta2: { text: 'Baixar Catálogo', link: buildWhatsAppLink('Olá! Vim pelo site da Equipilates e gostaria de receber o catálogo (linha clássica e contemporânea).') }
            }
        ],
        'en': [
            {
                number: '01',
                tag: 'GLOBAL AUTHORITY',
                title: ['EQUIPILATES:', '18 YEARS MOVING PILATES WORLDWIDE'],
                description: '30,000+ studios built and international presence.<br/>Chosen by those who want to be a reference.',
                cta1: { text: 'Request a Quote', link: buildWhatsAppLink('Hello, I found Equipilates through the website and would like a quote for a studio upgrade/expansion.') },
                cta2: { text: 'Our Story', link: '#manifesto' }
            },
            {
                number: '02',
                tag: 'CLASSIC LINE',
                title: ['FULL FIDELITY', 'TO JOSEPH PILATES’ LEGACY'],
                description: 'Built strictly to the original measurements.<br/>The gold standard for classical method.',
                cta1: { text: 'See Classic Line', link: '#classic' },
                cta2: { text: 'Talk to a Consultant', link: buildWhatsAppLink('Hello, I want to understand the Classic Line (original measurements) for my studio. Can you help?') }
            },
            {
                number: '03',
                tag: 'BUSINESS & ROI',
                title: ['TURN YOUR DREAM', 'INTO A SUCCESSFUL STUDIO'],
                description: 'Up to 62.7% margins show Pilates can be highly profitable<br/>with the right partners. Start now.',
                cta1: { text: 'Build My Studio', link: '#wizard' },
                cta2: { text: 'Payment Options', link: buildWhatsAppLink('Hello, I would like to see payment options/financing for Pilates equipment.') }
            },
            {
                number: '04',
                tag: 'INNOVATION & WARRANTY',
                title: ['EXCELLENCE & INNOVATION', 'IN EVERY MOVE'],
                description: 'Robust design with 2-year warranty.<br/>Up to 36 installments direct from factory.',
                cta1: { text: 'See Contemporary Line', link: '#contemporary' },
                cta2: { text: 'Get the Catalog', link: buildWhatsAppLink('Hello! I would like to receive the Equipilates catalog (classic & contemporary).') }
            }
        ],
        'es': [
            {
                number: '01',
                tag: 'AUTORIDAD GLOBAL',
                title: ['EQUIPILATES:', '18 AÑOS MOVIENDO EL PILATES'],
                description: 'Más de 30.000 estudios montados y presencia internacional.<br/>La elección de quienes quieren ser referencia.',
                cta1: { text: 'Solicitar Cotización', link: buildWhatsAppLink('Hola, encontré Equipilates por el sitio y quisiera una cotización para la ampliación/actualización de mi estudio.') },
                cta2: { text: 'Nuestra Historia', link: '#manifesto' }
            },
            {
                number: '02',
                tag: 'LÍNEA CLÁSICA',
                title: ['FIDELIDAD TOTAL', 'AL LEGADO DE JOSEPH PILATES'],
                description: 'Equipos desarrollados estrictamente con medidas originales.<br/>El estándar de oro para el método clásico.',
                cta1: { text: 'Ver Línea Clásica', link: '#classic' },
                cta2: { text: 'Hablar con un Asesor', link: buildWhatsAppLink('Hola, quiero entender la Línea Clásica (medidas originales) para mi estudio. ¿Me orientan?') }
            },
            {
                number: '03',
                tag: 'NEGOCIO & ROI',
                title: ['CONVIERTE TU SUEÑO', 'EN UN NEGOCIO EXITOSO'],
                description: 'Márgenes de hasta 62,7% muestran que Pilates puede ser rentable<br/>con los socios correctos. Empieza ahora.',
                cta1: { text: 'Armar mi Estudio', link: '#wizard' },
                cta2: { text: 'Ver Formas de Pago', link: buildWhatsAppLink('Hola, quisiera ver las formas de pago/financiación para equipos de Pilates.') }
            },
            {
                number: '04',
                tag: 'INNOVACIÓN & GARANTÍA',
                title: ['EXCELENCIA E INNOVACIÓN', 'EN CADA MOVIMIENTO'],
                description: 'Robustez y diseño avanzado con 2 años de garantía.<br/>Hasta 36 cuotas directo de fábrica.',
                cta1: { text: 'Ver Línea Contemporánea', link: '#contemporary' },
                cta2: { text: 'Descargar Catálogo', link: buildWhatsAppLink('Hola! Quisiera recibir el catálogo de Equipilates (clásico y contemporáneo).') }
            }
        ]
    };

    function getCurrentLang() {
        return localStorage.getItem('eq_lang') || 'pt-BR';
    }

    function setCurrentLang(lang) {
        localStorage.setItem('eq_lang', lang);
    }

    function getSlidesForLang(lang) {
        return HERO_COPY[lang] || HERO_COPY['pt-BR'];
    }

    function applyLangUI(lang) {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        document.documentElement.lang = lang === 'pt-BR' ? 'pt-BR' : lang;
    }

    function applyI18nStrings(lang) {
        const dict = I18N[lang] || I18N['pt-BR'];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const value = dict[key];
            if (typeof value === 'string') el.textContent = value;
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            const value = dict[key];
            if (typeof value === 'string') el.setAttribute('placeholder', value);
        });
    }

    // Minimal site-wide i18n for nav + wizard texts
    const I18N = {
        'pt-BR': {
            'nav.home': 'Início',
            'nav.manifesto': 'Manifesto',
            'nav.classic': 'Clássica',
            'nav.contemporary': 'Contemporânea',
            'nav.contact': 'Contato',
            'hero.trustLine': 'Desde 2006 • Fábrica em Resende-RJ • Presença em 15+ países',
            'manifesto.kicker': 'EQUIPILATES',
            'manifesto.title': 'Seu estúdio merece equipamentos que sustentam crescimento',
            'manifesto.body': 'Quem já tem estúdio sabe: o “barato” vira manutenção, aula interrompida e aluno insatisfeito. A Equipilates existe para tirar esse risco do seu caminho — com fábrica própria, padrão de qualidade e um time comercial que ajuda você a decidir o upgrade certo.',
            'wizard.kicker': 'MONTE SEU UPGRADE',
            'wizard.title': 'Em 2 minutos, descubra um kit recomendado para o seu espaço',
            'wizard.subtitle': 'Responda 3 perguntas rápidas e receba uma sugestão inicial. Se fizer sentido, você fala com um consultor com tudo já resumido.',
            'wizard.q1.label': 'Tamanho do seu espaço',
            'wizard.q1.placeholder': 'Selecione uma faixa',
            'wizard.q1.opt1': 'Até 25m²',
            'wizard.q1.opt2': '25–40m²',
            'wizard.q1.opt3': '40–70m²',
            'wizard.q1.opt4': '70m²+',
            'wizard.q2.label': 'Objetivo do upgrade',
            'wizard.q2.placeholder': 'Selecione o objetivo',
            'wizard.q2.opt1': 'Expandir capacidade (mais alunos/horários)',
            'wizard.q2.opt2': 'Trocar equipamentos e reduzir manutenção',
            'wizard.q2.opt3': 'Foco em reabilitação/fisioterapia',
            'wizard.q2.opt4': 'Atualizar para linha contemporânea',
            'wizard.q3.label': 'Equipamentos atuais (opcional)',
            'wizard.q3.placeholder': 'Ex: Reformer + Cadillac (ou marca atual)',
            'wizard.q3.hint': 'Se não souber, tudo bem — escreva “não sei”.',
            'wizard.primaryCta': 'Ver recomendação e falar no WhatsApp',
            'wizard.secondaryCta': 'Prefiro receber por e-mail',
            'wizard.trust': 'Dica: estúdios bem geridos podem alcançar margens de lucro de até 62,7%. Vamos te ajudar a planejar o upgrade certo.',
            'wizard.lead.name': 'Nome',
            'wizard.lead.namePh': 'Seu nome',
            'wizard.lead.email': 'E-mail',
            'wizard.lead.emailPh': 'voce@exemplo.com',
            'wizard.lead.send': 'Enviar para o time',
            'wizard.lead.note': 'Abrirá seu cliente de e-mail com a mensagem pronta.',
            'contact.kicker': 'FALE CONOSCO',
            'contact.title': 'Pronto para planejar o próximo passo do seu estúdio?',
            'contact.body': 'Fale com um consultor e receba orientação para escolher linha, kit e layout ideal para o seu espaço.',
            'contact.addrTitle': 'Endereço',
            'contact.emailTitle': 'Email',
            'contact.phoneTitle': 'WhatsApp',
            'contact.phoneHint': 'Atendimento comercial',
            'contact.primaryCta': 'Falar no WhatsApp',
            'contact.secondaryCta': 'Ou preencha o Wizard acima e envie tudo já organizado.'
        },
        'en': {
            'nav.home': 'Home',
            'nav.manifesto': 'Manifesto',
            'nav.classic': 'Classic',
            'nav.contemporary': 'Contemporary',
            'nav.contact': 'Contact',
            'hero.trustLine': 'Since 2006 • Factory in Resende-RJ • Present in 15+ countries',
            'manifesto.kicker': 'EQUIPILATES',
            'manifesto.title': 'Your studio deserves equipment that supports growth',
            'manifesto.body': 'If you run a studio, you know: “cheap” becomes maintenance, interrupted sessions and unhappy clients. Equipilates exists to remove that risk — with our own factory, quality standards and a sales team that helps you choose the right upgrade.',
            'wizard.kicker': 'BUILD YOUR UPGRADE',
            'wizard.title': 'In 2 minutes, get a recommended kit for your space',
            'wizard.subtitle': 'Answer 3 quick questions and get an initial suggestion. If it fits, talk to a consultant with everything summarized.',
            'wizard.q1.label': 'Your space size',
            'wizard.q1.placeholder': 'Select a range',
            'wizard.q1.opt1': 'Up to 25m²',
            'wizard.q1.opt2': '25–40m²',
            'wizard.q1.opt3': '40–70m²',
            'wizard.q1.opt4': '70m²+',
            'wizard.q2.label': 'Upgrade goal',
            'wizard.q2.placeholder': 'Select a goal',
            'wizard.q2.opt1': 'Increase capacity (more clients/schedule)',
            'wizard.q2.opt2': 'Replace equipment and reduce maintenance',
            'wizard.q2.opt3': 'Rehab/physio focus',
            'wizard.q2.opt4': 'Move to contemporary line',
            'wizard.q3.label': 'Current equipment (optional)',
            'wizard.q3.placeholder': 'Ex: Reformer + Cadillac (or current brand)',
            'wizard.q3.hint': 'If you don’t know, it’s ok — type “not sure”.',
            'wizard.primaryCta': 'See recommendation & WhatsApp',
            'wizard.secondaryCta': 'Send by email',
            'wizard.trust': 'Tip: well-managed studios can reach up to 62.7% margins. We’ll help you plan the right upgrade.',
            'wizard.lead.name': 'Name',
            'wizard.lead.namePh': 'Your name',
            'wizard.lead.email': 'Email',
            'wizard.lead.emailPh': 'you@example.com',
            'wizard.lead.send': 'Send to the team',
            'wizard.lead.note': 'Opens your email client with the message ready.',
            'contact.kicker': 'CONTACT',
            'contact.title': 'Ready to plan your studio’s next step?',
            'contact.body': 'Talk to a consultant and get guidance on line, kit and layout for your space.',
            'contact.addrTitle': 'Address',
            'contact.emailTitle': 'Email',
            'contact.phoneTitle': 'WhatsApp',
            'contact.phoneHint': 'Sales team',
            'contact.primaryCta': 'Chat on WhatsApp',
            'contact.secondaryCta': 'Or use the Wizard above and send everything organized.'
        },
        'es': {
            'nav.home': 'Inicio',
            'nav.manifesto': 'Manifiesto',
            'nav.classic': 'Clásica',
            'nav.contemporary': 'Contemporánea',
            'nav.contact': 'Contacto',
            'hero.trustLine': 'Desde 2006 • Fábrica en Resende-RJ • Presencia en 15+ países',
            'manifesto.kicker': 'EQUIPILATES',
            'manifesto.title': 'Tu estudio merece equipos que sostienen el crecimiento',
            'manifesto.body': 'Si ya tienes estudio, lo sabes: lo “barato” se convierte en mantenimiento, clases interrumpidas y clientes insatisfechos. Equipilates existe para quitar ese riesgo — con fábrica propia, estándar de calidad y un equipo comercial que te ayuda a elegir el upgrade correcto.',
            'wizard.kicker': 'ARMA TU UPGRADE',
            'wizard.title': 'En 2 minutos, recibe un kit recomendado para tu espacio',
            'wizard.subtitle': 'Responde 3 preguntas rápidas y recibe una sugerencia inicial. Si encaja, habla con un asesor con todo resumido.',
            'wizard.q1.label': 'Tamaño del espacio',
            'wizard.q1.placeholder': 'Selecciona un rango',
            'wizard.q1.opt1': 'Hasta 25m²',
            'wizard.q1.opt2': '25–40m²',
            'wizard.q1.opt3': '40–70m²',
            'wizard.q1.opt4': '70m²+',
            'wizard.q2.label': 'Objetivo del upgrade',
            'wizard.q2.placeholder': 'Selecciona un objetivo',
            'wizard.q2.opt1': 'Aumentar capacidad (más clientes/horarios)',
            'wizard.q2.opt2': 'Reemplazar equipos y reducir mantenimiento',
            'wizard.q2.opt3': 'Enfoque en rehabilitación/fisio',
            'wizard.q2.opt4': 'Pasar a línea contemporánea',
            'wizard.q3.label': 'Equipos actuales (opcional)',
            'wizard.q3.placeholder': 'Ej: Reformer + Cadillac (o marca actual)',
            'wizard.q3.hint': 'Si no sabes, está bien — escribe “no sé”.',
            'wizard.primaryCta': 'Ver recomendación y WhatsApp',
            'wizard.secondaryCta': 'Enviar por email',
            'wizard.trust': 'Tip: estudios bien gestionados pueden llegar hasta 62,7% de margen. Te ayudamos a planificar el upgrade correcto.',
            'wizard.lead.name': 'Nombre',
            'wizard.lead.namePh': 'Tu nombre',
            'wizard.lead.email': 'Email',
            'wizard.lead.emailPh': 'tu@ejemplo.com',
            'wizard.lead.send': 'Enviar al equipo',
            'wizard.lead.note': 'Abre tu cliente de correo con el mensaje listo.',
            'contact.kicker': 'CONTACTO',
            'contact.title': '¿Listo para planificar el próximo paso de tu estudio?',
            'contact.body': 'Habla con un asesor y recibe orientación sobre línea, kit y layout para tu espacio.',
            'contact.addrTitle': 'Dirección',
            'contact.emailTitle': 'Email',
            'contact.phoneTitle': 'WhatsApp',
            'contact.phoneHint': 'Equipo comercial',
            'contact.primaryCta': 'Hablar por WhatsApp',
            'contact.secondaryCta': 'O usa el Wizard arriba y envía todo organizado.'
        }
    };
    
    function updateContent(index, opts = { animate: true }) {
        const lang = getCurrentLang();
        const slides = getSlidesForLang(lang);
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
        
        // Update content immediately (used on first load / language switch)
        const applyText = () => {
            tag.textContent = slide.tag;
            titleLines[0].textContent = slide.title[0];
            titleLines[1].textContent = slide.title[1];
            description.innerHTML = slide.description;
            ctas[0].innerHTML = `<span>${slide.cta1.text}</span><div class="btn-arrow">→</div>`;
            ctas[0].href = slide.cta1.link;
            ctas[0].setAttribute('target', slide.cta1.link.startsWith('http') ? '_blank' : '_self');
            ctas[0].setAttribute('rel', slide.cta1.link.startsWith('http') ? 'noopener' : '');
            ctas[1].textContent = slide.cta2.text;
            ctas[1].href = slide.cta2.link;
            ctas[1].setAttribute('target', slide.cta2.link.startsWith('http') ? '_blank' : '_self');
            ctas[1].setAttribute('rel', slide.cta2.link.startsWith('http') ? 'noopener' : '');
        };

        if (!opts.animate) {
            applyText();
            return;
        }

        // Remove motion-in class to reset
        tag.classList.remove('motion-in');
        titleLines.forEach(line => line.classList.remove('motion-in'));
        description.classList.remove('motion-in');
        ctaContainer.classList.remove('motion-in-reverse');

        // Trigger reflow to restart animation
        void tag.offsetWidth;

        setTimeout(() => {
            applyText();

            // Add motion classes with stagger
            setTimeout(() => tag.classList.add('motion-in'), 100);
            setTimeout(() => titleLines[0].classList.add('motion-in'), 200);
            setTimeout(() => titleLines[1].classList.add('motion-in'), 350);
            setTimeout(() => description.classList.add('motion-in'), 500);
            setTimeout(() => ctaContainer.classList.add('motion-in-reverse'), 650);
        }, 260);
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
        const lang = getCurrentLang();
        applyLangUI(lang);
        applyI18nStrings(lang);
        updateContent(0, { animate: false });

        const tag = document.querySelector('.content-tag');
        const titleLines = document.querySelectorAll('.title-line');
        const description = document.querySelector('.content-description');
        const ctaContainer = document.querySelector('.content-cta');

        // Add motion classes with stagger for initial load
        setTimeout(() => tag.classList.add('motion-in'), 350);
        setTimeout(() => titleLines[0].classList.add('motion-in'), 520);
        setTimeout(() => titleLines[1].classList.add('motion-in'), 680);
        setTimeout(() => description.classList.add('motion-in'), 830);
        setTimeout(() => ctaContainer.classList.add('motion-in-reverse'), 980);
    }
    
    // Initialize first slide on load
    initFirstSlide();

    // Language switch
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            setCurrentLang(lang);
            applyLangUI(lang);
            applyI18nStrings(lang);
            updateContent(currentIndex, { animate: false });
        });
    });
    
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
// UPGRADE WIZARD (MVP)
// ==========================================
function initUpgradeWizard() {
    const form = document.getElementById('upgradeWizard');
    if (!form) return;

    const spaceEl = document.getElementById('wiz-space');
    const goalEl = document.getElementById('wiz-goal');
    const currentEl = document.getElementById('wiz-current');
    const resultEl = document.getElementById('wizardResult');
    const leadEl = document.getElementById('wizardLead');
    const secondaryBtn = document.getElementById('wizardSecondaryCta');
    const mailtoBtn = document.getElementById('wizardMailtoCta');

    const WHATSAPP_NUMBER = '5521967329318';
    const wa = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

    const kitBySpace = {
        'Até 25m²': ['Reformer', 'Chair', 'Acessórios'],
        '25–40m²': ['Reformer', 'Cadillac (ou Tower)', 'Chair'],
        '40–70m²': ['2x Reformers', 'Cadillac', 'Chair + acessórios'],
        '70m²+': ['3–4x Reformers', 'Cadillac', 'Barrels + acessórios']
    };

    function recommend(space, goal, current) {
        const base = kitBySpace[space] || ['Reformer', 'Cadillac', 'Chair'];
        let focus = '';
        if (/reabilita|fisioterapia/i.test(goal)) focus = 'Foco em reabilitação: priorize Cadillac + acessórios terapêuticos.';
        if (/reduzir manutenção/i.test(goal)) focus = 'Upgrade para reduzir manutenção: avalie troca de molas, estofamento e revisão de componentes.';
        if (/contemporânea/i.test(goal)) focus = 'Linha contemporânea: layout moderno, robustez e design avançado para performance e experiência premium.';
        if (/capacidade/i.test(goal)) focus = 'Expansão: mais estações = mais horários e melhor previsibilidade de agenda.';

        const currentStr = (current || '').trim();
        const currentNote = currentStr ? `Equipamentos atuais: ${currentStr}` : 'Equipamentos atuais: não informado';
        return {
            kitTitle: 'Sugestão inicial de kit (ponto de partida):',
            kit: base,
            focus,
            note: currentNote
        };
    }

    function setResultHtml(rec) {
        resultEl.classList.add('active');
        resultEl.innerHTML = `
            <strong>${rec.kitTitle}</strong>
            <div style="margin-top:10px; display:flex; flex-wrap:wrap; gap:10px;">
                ${rec.kit.map(i => `<span style="display:inline-flex; padding:8px 12px; border-radius:999px; background: rgba(0,0,0,0.06); border:1px solid rgba(0,0,0,0.08); font-weight:700; font-size:13px;">${i}</span>`).join('')}
            </div>
            <div style="margin-top:12px; color:#2b2b2b; font-size:14px; line-height:1.7;">${rec.focus || ''}</div>
            <div style="margin-top:10px; color:#404040; font-size:13px;">${rec.note}</div>
        `;
    }

    function buildMessage(space, goal, current, rec) {
        return [
            'Olá, vim pelo site da Equipilates e quero ajuda para planejar meu upgrade.',
            '',
            `Espaço: ${space}`,
            `Objetivo: ${goal}`,
            `Equipamentos atuais: ${(current || 'não informado').trim() || 'não informado'}`,
            '',
            `Sugestão inicial (site): ${rec.kit.join(', ')}.`,
            'Podem me orientar com kit ideal e layout?'
        ].join('\n');
    }

    secondaryBtn?.addEventListener('click', () => {
        leadEl.hidden = !leadEl.hidden ? true : false;
        if (!leadEl.hidden) {
            leadEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    mailtoBtn?.addEventListener('click', () => {
        const space = spaceEl.value;
        const goal = goalEl.value;
        const current = currentEl.value;
        if (!space || !goal) return;
        const rec = recommend(space, goal, current);
        const name = (document.getElementById('wiz-name')?.value || '').trim();
        const email = (document.getElementById('wiz-email')?.value || '').trim();
        const subject = encodeURIComponent('Equipilates | Upgrade do estúdio - dados do Wizard');
        const body = encodeURIComponent([
            name ? `Nome: ${name}` : '',
            email ? `Email: ${email}` : '',
            '',
            buildMessage(space, goal, current, rec)
        ].filter(Boolean).join('\n'));
        window.location.href = `mailto:email@equipilates.com.br?subject=${subject}&body=${body}`;
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const space = spaceEl.value;
        const goal = goalEl.value;
        const current = currentEl.value;
        if (!space || !goal) return;

        const rec = recommend(space, goal, current);
        setResultHtml(rec);

        const link = wa(buildMessage(space, goal, current, rec));
        window.open(link, '_blank', 'noopener');
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
