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
        ],
        'de': [
            {
                number: '01',
                tag: 'GLOBALE AUTORITÄT',
                title: ['EQUIPILATES:', '18 JAHRE PILATES BEWEGEN'],
                description: 'Über 30.000 Studios ausgestattet und internationale Präsenz.<br/>Die Wahl für alle, die Referenz sein wollen.',
                cta1: { text: 'Angebot Anfordern', link: buildWhatsAppLink('Hallo, ich habe Equipilates über die Website gefunden und möchte ein Angebot für die Erweiterung/Modernisierung meines Studios.') },
                cta2: { text: 'Unsere Geschichte', link: '#manifesto' }
            },
            {
                number: '02',
                tag: 'KLASSISCHE LINIE',
                title: ['TOTALE TREUE', 'ZUM VERMÄCHTNIS VON JOSEPH PILATES'],
                description: 'Geräte streng nach Originalmaßen entwickelt.<br/>Der Goldstandard für die klassische Methode.',
                cta1: { text: 'Klassische Linie Sehen', link: '#classic' },
                cta2: { text: 'Mit Berater Sprechen', link: buildWhatsAppLink('Hallo, ich möchte die Klassische Linie (Originalmaße) für mein Studio verstehen. Können Sie mich beraten?') }
            },
            {
                number: '03',
                tag: 'GESCHÄFT & ROI',
                title: ['VERWANDELN SIE IHREN TRAUM', 'IN EIN ERFOLGREICHES GESCHÄFT'],
                description: 'Margen von bis zu 62,7% zeigen, dass Pilates rentabel sein kann<br/>mit den richtigen Partnern. Starten Sie jetzt.',
                cta1: { text: 'Mein Studio Planen', link: '#wizard' },
                cta2: { text: 'Zahlungsbedingungen Sehen', link: buildWhatsAppLink('Hallo, ich möchte die Zahlungs-/Finanzierungsmöglichkeiten für Pilates-Geräte sehen.') }
            },
            {
                number: '04',
                tag: 'INNOVATION & GARANTIE',
                title: ['EXZELLENZ UND INNOVATION', 'IN JEDER BEWEGUNG'],
                description: 'Robustheit und fortschrittliches Design mit 2 Jahren Garantie.<br/>Bis zu 36 Raten direkt ab Werk.',
                cta1: { text: 'Zeitgenössische Linie Sehen', link: '#contemporary' },
                cta2: { text: 'Katalog Herunterladen', link: buildWhatsAppLink('Hallo! Ich möchte den Equipilates-Katalog erhalten (klassisch und zeitgenössisch).') }
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
        // Update desktop lang buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        // Update mobile lang bar buttons
        document.querySelectorAll('.mobile-lang-btn').forEach(btn => {
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
            'hero.scrollHint': 'Role para explorar',
            'manifesto.kicker': 'EQUIPILATES',
            'manifesto.title': 'Seu estúdio merece equipamentos que sustentam crescimento',
            'manifesto.body': 'Quem já tem estúdio sabe: o "barato" vira manutenção, aula interrompida e aluno insatisfeito. A Equipilates existe para tirar esse risco do seu caminho — com fábrica própria, padrão de qualidade e um time comercial que ajuda você a decidir o upgrade certo.',
            'manifesto.img1': 'Reformer Premium',
            'manifesto.img2': 'Cadillac Pro',
            'manifesto.img3': 'Wunda Chair',
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
            'wizard.q3.hint': 'Se não souber, tudo bem — escreva "não sei".',
            'wizard.primaryCta': 'Ver recomendação e falar no WhatsApp',
            'wizard.secondaryCta': 'Prefiro receber por e-mail',
            'wizard.trust': 'Dica: estúdios bem geridos podem alcançar margens de lucro de até 62,7%. Vamos te ajudar a planejar o upgrade certo.',
            'wizard.lead.name': 'Nome',
            'wizard.lead.namePh': 'Seu nome',
            'wizard.lead.email': 'E-mail',
            'wizard.lead.emailPh': 'voce@exemplo.com',
            'wizard.lead.send': 'Enviar para o time',
            'wizard.lead.note': 'Abrirá seu cliente de e-mail com a mensagem pronta.',
            // Why Section
            'why.kicker': 'NOSSOS DIFERENCIAIS',
            'why.title': 'Por que escolher EquiPilates',
            'why.b1.title': 'Qualidade Superior',
            'why.b1.desc': 'Materiais premium selecionados e processos de fabricação rigorosos garantem equipamentos que duram décadas.',
            'why.b2.title': 'Design Exclusivo',
            'why.b2.desc': 'Estética sofisticada que valoriza seu studio e impressiona seus alunos desde o primeiro contato.',
            'why.b3.title': 'Ergonomia Perfeita',
            'why.b3.desc': 'Desenvolvidos com fisioterapeutas para proporcionar a melhor experiência e resultados em cada movimento.',
            'why.b4.title': 'Suporte Total',
            'why.b4.desc': 'Equipe especializada em todo Brasil para instalação, manutenção e treinamento da sua equipe.',
            'why.b5.title': 'Garantia Estendida',
            'why.b5.desc': '2 anos de garantia que demonstram nossa confiança absoluta na qualidade de cada equipamento.',
            'why.b6.title': 'Personalização',
            'why.b6.desc': 'Cores, acabamentos e configurações exclusivas para criar a identidade única do seu studio.',
            // Classic Section
            'classic.kicker': 'LINHA CLÁSSICA',
            'classic.title': 'Tradição reinventada com excelência contemporânea',
            'classic.body': 'A essência do método Joseph Pilates preservada em cada detalhe. Madeira nobre certificada, aço inox cirúrgico e artesanato excepcional se encontram para criar equipamentos atemporais que honram a tradição enquanto abraçam a modernidade.',
            'classic.p1.title': 'Reformer Premium',
            'classic.p1.desc': 'Design atemporal com performance moderna. Madeira nobre e ajustes suaves para uma experiência excepcional.',
            'classic.p2.title': 'Cadillac Pro',
            'classic.p2.desc': 'Versatilidade absoluta com estrutura robusta. Perfeita para todos os níveis de praticantes.',
            'classic.p3.title': 'Wunda Chair',
            'classic.p3.desc': 'Compacta sem comprometer funcionalidade. Ideal para studios com limitação de espaço.',
            'classic.p4.title': 'Barrel Arc',
            'classic.p4.desc': 'Curvatura perfeita para alongamento profundo da coluna vertebral com máximo conforto.',
            'classic.p5.title': 'Ladder Barrel',
            'classic.p5.desc': 'Flexibilidade e força em um único equipamento versátil e elegante.',
            'classic.p6.title': 'Mat Premium',
            'classic.p6.desc': 'Base essencial com materiais superiores e design ergonômico exclusivo.',
            // Contemporary Section
            'contemporary.kicker': 'LINHA CONTEMPORÂNEA',
            'contemporary.title': 'Inovação que redefine padrões de qualidade',
            'contemporary.body': 'Design visionário que desafia convenções. Tecnologia inteligente, materiais aeroespaciais e estética minimalista convergem para criar a próxima geração de equipamentos de Pilates.',
            'contemporary.f1.title': 'Sistema Digital Integrado',
            'contemporary.f1.desc': 'Interface touch intuitiva com ajustes precisos e feedback em tempo real para otimizar cada movimento.',
            'contemporary.f2.title': 'Materiais Aeroespaciais',
            'contemporary.f2.desc': 'Polímeros de alta performance e liga de alumínio aeronáutico garantem leveza e resistência superior.',
            'contemporary.f3.title': 'Design Modular Inteligente',
            'contemporary.f3.desc': 'Personalização infinita com módulos intercambiáveis que se adaptam às necessidades do seu studio.',
            'contemporary.f4.title': 'Conectividade Smart',
            'contemporary.f4.desc': 'App dedicado para tracking completo de treinos, manutenção preventiva e análise de performance.',
            // Gallery Section
            'gallery.kicker': 'NOSSOS PROJETOS',
            'gallery.title': 'Studios que confiam na nossa qualidade',
            'gallery.g1.title': 'Studio Premium',
            'gallery.g1.loc': 'São Paulo, SP',
            'gallery.g2.title': 'Centro Wellness',
            'gallery.g2.loc': 'Rio de Janeiro, RJ',
            'gallery.g3.title': 'Boutique Pilates',
            'gallery.g3.loc': 'Belo Horizonte, MG',
            'gallery.g4.title': 'Academia Gold',
            'gallery.g4.loc': 'Porto Alegre, RS',
            'gallery.g5.title': 'Clínica Move',
            'gallery.g5.loc': 'Florianópolis, SC',
            'gallery.g6.title': 'Studio Exclusive',
            'gallery.g6.loc': 'Curitiba, PR',
            // Stats Section
            'stats.s1': 'Studios equipados em 3 continentes',
            'stats.s2': 'Mil vidas transformadas diariamente',
            'stats.s3': '% taxa de recomendação',
            // Testimonials Section
            'testimonials.kicker': 'DEPOIMENTOS',
            'testimonials.title': 'O que nossos clientes têm a dizer',
            'testimonials.t1.quote': '"Os equipamentos da EquiPilates elevaram meu studio a outro nível. Design deslumbrante e qualidade incomparável."',
            'testimonials.t1.name': 'Mariana Silva',
            'testimonials.t1.role': 'Studio Equilíbrio, São Paulo',
            'testimonials.t2.quote': '"Investimento que transformou nosso centro. A durabilidade e precisão são excepcionais. Simplesmente perfeito."',
            'testimonials.t2.name': 'Carlos Mendes',
            'testimonials.t2.role': 'Centro Reabilitação, Rio de Janeiro',
            'testimonials.t3.quote': '"Design sofisticado e funcionalidade impecável. Cada detalhe pensado com maestria. Recomendo sem hesitar."',
            'testimonials.t3.name': 'Ana Paula Costa',
            'testimonials.t3.role': 'Studio Harmonia, Belo Horizonte',
            // Contact Section
            'contact.kicker': 'FALE CONOSCO',
            'contact.title': 'Pronto para planejar o próximo passo do seu estúdio?',
            'contact.body': 'Fale com um consultor e receba orientação para escolher linha, kit e layout ideal para o seu espaço.',
            'contact.addrTitle': 'Endereço',
            'contact.emailTitle': 'Email',
            'contact.phoneTitle': 'WhatsApp',
            'contact.phoneHint': 'Atendimento comercial',
            'contact.primaryCta': 'Falar no WhatsApp',
            'contact.secondaryCta': 'Ou preencha o Wizard acima e envie tudo já organizado.',
            // Footer
            'footer.tagline': 'Excelência em equipamentos de pilates desde 2006',
            'footer.products': 'Produtos',
            'footer.classicLink': 'Linha Clássica',
            'footer.contemporaryLink': 'Linha Contemporânea',
            'footer.company': 'Empresa',
            'footer.about': 'Sobre Nós',
            'footer.contactLink': 'Contato',
            'footer.social': 'Redes Sociais',
            'footer.copyright': '© 2024 EquiPilates. Todos os direitos reservados.'
        },
        'en': {
            'nav.home': 'Home',
            'nav.manifesto': 'Manifesto',
            'nav.classic': 'Classic',
            'nav.contemporary': 'Contemporary',
            'nav.contact': 'Contact',
            'hero.trustLine': 'Since 2006 • Factory in Resende-RJ • Present in 15+ countries',
            'hero.scrollHint': 'Scroll to explore',
            'manifesto.kicker': 'EQUIPILATES',
            'manifesto.title': 'Your studio deserves equipment that supports growth',
            'manifesto.body': 'If you run a studio, you know: "cheap" becomes maintenance, interrupted sessions and unhappy clients. Equipilates exists to remove that risk — with our own factory, quality standards and a sales team that helps you choose the right upgrade.',
            'manifesto.img1': 'Premium Reformer',
            'manifesto.img2': 'Cadillac Pro',
            'manifesto.img3': 'Wunda Chair',
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
            'wizard.q3.hint': 'If you don't know, it's ok — type "not sure".',
            'wizard.primaryCta': 'See recommendation & WhatsApp',
            'wizard.secondaryCta': 'Send by email',
            'wizard.trust': 'Tip: well-managed studios can reach up to 62.7% margins. We'll help you plan the right upgrade.',
            'wizard.lead.name': 'Name',
            'wizard.lead.namePh': 'Your name',
            'wizard.lead.email': 'Email',
            'wizard.lead.emailPh': 'you@example.com',
            'wizard.lead.send': 'Send to the team',
            'wizard.lead.note': 'Opens your email client with the message ready.',
            // Why Section
            'why.kicker': 'OUR DIFFERENTIALS',
            'why.title': 'Why choose EquiPilates',
            'why.b1.title': 'Superior Quality',
            'why.b1.desc': 'Premium selected materials and rigorous manufacturing processes ensure equipment that lasts decades.',
            'why.b2.title': 'Exclusive Design',
            'why.b2.desc': 'Sophisticated aesthetics that add value to your studio and impress your clients from day one.',
            'why.b3.title': 'Perfect Ergonomics',
            'why.b3.desc': 'Developed with physiotherapists to provide the best experience and results in every movement.',
            'why.b4.title': 'Full Support',
            'why.b4.desc': 'Specialized team throughout Brazil for installation, maintenance and training of your staff.',
            'why.b5.title': 'Extended Warranty',
            'why.b5.desc': '2-year warranty that demonstrates our absolute confidence in the quality of each equipment.',
            'why.b6.title': 'Customization',
            'why.b6.desc': 'Exclusive colors, finishes and configurations to create the unique identity of your studio.',
            // Classic Section
            'classic.kicker': 'CLASSIC LINE',
            'classic.title': 'Tradition reinvented with contemporary excellence',
            'classic.body': 'The essence of the Joseph Pilates method preserved in every detail. Certified noble wood, surgical stainless steel and exceptional craftsmanship come together to create timeless equipment that honors tradition while embracing modernity.',
            'classic.p1.title': 'Premium Reformer',
            'classic.p1.desc': 'Timeless design with modern performance. Noble wood and smooth adjustments for an exceptional experience.',
            'classic.p2.title': 'Cadillac Pro',
            'classic.p2.desc': 'Absolute versatility with robust structure. Perfect for all practitioner levels.',
            'classic.p3.title': 'Wunda Chair',
            'classic.p3.desc': 'Compact without compromising functionality. Ideal for studios with limited space.',
            'classic.p4.title': 'Barrel Arc',
            'classic.p4.desc': 'Perfect curvature for deep spinal stretching with maximum comfort.',
            'classic.p5.title': 'Ladder Barrel',
            'classic.p5.desc': 'Flexibility and strength in a single versatile and elegant equipment.',
            'classic.p6.title': 'Premium Mat',
            'classic.p6.desc': 'Essential base with superior materials and exclusive ergonomic design.',
            // Contemporary Section
            'contemporary.kicker': 'CONTEMPORARY LINE',
            'contemporary.title': 'Innovation that redefines quality standards',
            'contemporary.body': 'Visionary design that challenges conventions. Smart technology, aerospace materials and minimalist aesthetics converge to create the next generation of Pilates equipment.',
            'contemporary.f1.title': 'Integrated Digital System',
            'contemporary.f1.desc': 'Intuitive touch interface with precise adjustments and real-time feedback to optimize each movement.',
            'contemporary.f2.title': 'Aerospace Materials',
            'contemporary.f2.desc': 'High-performance polymers and aerospace aluminum alloy ensure lightness and superior resistance.',
            'contemporary.f3.title': 'Intelligent Modular Design',
            'contemporary.f3.desc': 'Infinite customization with interchangeable modules that adapt to your studio needs.',
            'contemporary.f4.title': 'Smart Connectivity',
            'contemporary.f4.desc': 'Dedicated app for complete workout tracking, preventive maintenance and performance analysis.',
            // Gallery Section
            'gallery.kicker': 'OUR PROJECTS',
            'gallery.title': 'Studios that trust our quality',
            'gallery.g1.title': 'Premium Studio',
            'gallery.g1.loc': 'São Paulo, SP',
            'gallery.g2.title': 'Wellness Center',
            'gallery.g2.loc': 'Rio de Janeiro, RJ',
            'gallery.g3.title': 'Boutique Pilates',
            'gallery.g3.loc': 'Belo Horizonte, MG',
            'gallery.g4.title': 'Gold Academy',
            'gallery.g4.loc': 'Porto Alegre, RS',
            'gallery.g5.title': 'Move Clinic',
            'gallery.g5.loc': 'Florianópolis, SC',
            'gallery.g6.title': 'Exclusive Studio',
            'gallery.g6.loc': 'Curitiba, PR',
            // Stats Section
            'stats.s1': 'Studios equipped on 3 continents',
            'stats.s2': 'Thousand lives transformed daily',
            'stats.s3': '% recommendation rate',
            // Testimonials Section
            'testimonials.kicker': 'TESTIMONIALS',
            'testimonials.title': 'What our clients have to say',
            'testimonials.t1.quote': '"EquiPilates equipment elevated my studio to another level. Stunning design and unparalleled quality."',
            'testimonials.t1.name': 'Mariana Silva',
            'testimonials.t1.role': 'Studio Equilíbrio, São Paulo',
            'testimonials.t2.quote': '"Investment that transformed our center. Durability and precision are exceptional. Simply perfect."',
            'testimonials.t2.name': 'Carlos Mendes',
            'testimonials.t2.role': 'Rehabilitation Center, Rio de Janeiro',
            'testimonials.t3.quote': '"Sophisticated design and impeccable functionality. Every detail crafted with mastery. I recommend without hesitation."',
            'testimonials.t3.name': 'Ana Paula Costa',
            'testimonials.t3.role': 'Studio Harmonia, Belo Horizonte',
            // Contact Section
            'contact.kicker': 'CONTACT',
            'contact.title': 'Ready to plan your studio's next step?',
            'contact.body': 'Talk to a consultant and get guidance on line, kit and layout for your space.',
            'contact.addrTitle': 'Address',
            'contact.emailTitle': 'Email',
            'contact.phoneTitle': 'WhatsApp',
            'contact.phoneHint': 'Sales team',
            'contact.primaryCta': 'Chat on WhatsApp',
            'contact.secondaryCta': 'Or use the Wizard above and send everything organized.',
            // Footer
            'footer.tagline': 'Excellence in Pilates equipment since 2006',
            'footer.products': 'Products',
            'footer.classicLink': 'Classic Line',
            'footer.contemporaryLink': 'Contemporary Line',
            'footer.company': 'Company',
            'footer.about': 'About Us',
            'footer.contactLink': 'Contact',
            'footer.social': 'Social Media',
            'footer.copyright': '© 2024 EquiPilates. All rights reserved.'
        },
        'es': {
            'nav.home': 'Inicio',
            'nav.manifesto': 'Manifiesto',
            'nav.classic': 'Clásica',
            'nav.contemporary': 'Contemporánea',
            'nav.contact': 'Contacto',
            'hero.trustLine': 'Desde 2006 • Fábrica en Resende-RJ • Presencia en 15+ países',
            'hero.scrollHint': 'Desplaza para explorar',
            'manifesto.kicker': 'EQUIPILATES',
            'manifesto.title': 'Tu estudio merece equipos que sostienen el crecimiento',
            'manifesto.body': 'Si ya tienes estudio, lo sabes: lo "barato" se convierte en mantenimiento, clases interrumpidas y clientes insatisfechos. Equipilates existe para quitar ese riesgo — con fábrica propia, estándar de calidad y un equipo comercial que te ayuda a elegir el upgrade correcto.',
            'manifesto.img1': 'Reformer Premium',
            'manifesto.img2': 'Cadillac Pro',
            'manifesto.img3': 'Wunda Chair',
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
            'wizard.q3.hint': 'Si no sabes, está bien — escribe "no sé".',
            'wizard.primaryCta': 'Ver recomendación y WhatsApp',
            'wizard.secondaryCta': 'Enviar por email',
            'wizard.trust': 'Tip: estudios bien gestionados pueden llegar hasta 62,7% de margen. Te ayudamos a planificar el upgrade correcto.',
            'wizard.lead.name': 'Nombre',
            'wizard.lead.namePh': 'Tu nombre',
            'wizard.lead.email': 'Email',
            'wizard.lead.emailPh': 'tu@ejemplo.com',
            'wizard.lead.send': 'Enviar al equipo',
            'wizard.lead.note': 'Abre tu cliente de correo con el mensaje listo.',
            // Why Section
            'why.kicker': 'NUESTROS DIFERENCIALES',
            'why.title': 'Por qué elegir EquiPilates',
            'why.b1.title': 'Calidad Superior',
            'why.b1.desc': 'Materiales premium seleccionados y procesos de fabricación rigurosos garantizan equipos que duran décadas.',
            'why.b2.title': 'Diseño Exclusivo',
            'why.b2.desc': 'Estética sofisticada que valoriza tu estudio e impresiona a tus alumnos desde el primer contacto.',
            'why.b3.title': 'Ergonomía Perfecta',
            'why.b3.desc': 'Desarrollados con fisioterapeutas para proporcionar la mejor experiencia y resultados en cada movimiento.',
            'why.b4.title': 'Soporte Total',
            'why.b4.desc': 'Equipo especializado en todo Brasil para instalación, mantenimiento y capacitación de tu equipo.',
            'why.b5.title': 'Garantía Extendida',
            'why.b5.desc': '2 años de garantía que demuestran nuestra confianza absoluta en la calidad de cada equipo.',
            'why.b6.title': 'Personalización',
            'why.b6.desc': 'Colores, acabados y configuraciones exclusivas para crear la identidad única de tu estudio.',
            // Classic Section
            'classic.kicker': 'LÍNEA CLÁSICA',
            'classic.title': 'Tradición reinventada con excelencia contemporánea',
            'classic.body': 'La esencia del método Joseph Pilates preservada en cada detalle. Madera noble certificada, acero inoxidable quirúrgico y artesanía excepcional se encuentran para crear equipos atemporales que honran la tradición mientras abrazan la modernidad.',
            'classic.p1.title': 'Reformer Premium',
            'classic.p1.desc': 'Diseño atemporal con rendimiento moderno. Madera noble y ajustes suaves para una experiencia excepcional.',
            'classic.p2.title': 'Cadillac Pro',
            'classic.p2.desc': 'Versatilidad absoluta con estructura robusta. Perfecta para todos los niveles de practicantes.',
            'classic.p3.title': 'Wunda Chair',
            'classic.p3.desc': 'Compacta sin comprometer funcionalidad. Ideal para estudios con limitación de espacio.',
            'classic.p4.title': 'Barrel Arc',
            'classic.p4.desc': 'Curvatura perfecta para estiramiento profundo de la columna vertebral con máximo confort.',
            'classic.p5.title': 'Ladder Barrel',
            'classic.p5.desc': 'Flexibilidad y fuerza en un único equipo versátil y elegante.',
            'classic.p6.title': 'Mat Premium',
            'classic.p6.desc': 'Base esencial con materiales superiores y diseño ergonómico exclusivo.',
            // Contemporary Section
            'contemporary.kicker': 'LÍNEA CONTEMPORÁNEA',
            'contemporary.title': 'Innovación que redefine estándares de calidad',
            'contemporary.body': 'Diseño visionario que desafía convenciones. Tecnología inteligente, materiales aeroespaciales y estética minimalista convergen para crear la próxima generación de equipos de Pilates.',
            'contemporary.f1.title': 'Sistema Digital Integrado',
            'contemporary.f1.desc': 'Interfaz táctil intuitiva con ajustes precisos y feedback en tiempo real para optimizar cada movimiento.',
            'contemporary.f2.title': 'Materiales Aeroespaciales',
            'contemporary.f2.desc': 'Polímeros de alto rendimiento y aleación de aluminio aeronáutico garantizan ligereza y resistencia superior.',
            'contemporary.f3.title': 'Diseño Modular Inteligente',
            'contemporary.f3.desc': 'Personalización infinita con módulos intercambiables que se adaptan a las necesidades de tu estudio.',
            'contemporary.f4.title': 'Conectividad Smart',
            'contemporary.f4.desc': 'App dedicada para tracking completo de entrenamientos, mantenimiento preventivo y análisis de rendimiento.',
            // Gallery Section
            'gallery.kicker': 'NUESTROS PROYECTOS',
            'gallery.title': 'Estudios que confían en nuestra calidad',
            'gallery.g1.title': 'Studio Premium',
            'gallery.g1.loc': 'São Paulo, SP',
            'gallery.g2.title': 'Centro Wellness',
            'gallery.g2.loc': 'Río de Janeiro, RJ',
            'gallery.g3.title': 'Boutique Pilates',
            'gallery.g3.loc': 'Belo Horizonte, MG',
            'gallery.g4.title': 'Academia Gold',
            'gallery.g4.loc': 'Porto Alegre, RS',
            'gallery.g5.title': 'Clínica Move',
            'gallery.g5.loc': 'Florianópolis, SC',
            'gallery.g6.title': 'Studio Exclusive',
            'gallery.g6.loc': 'Curitiba, PR',
            // Stats Section
            'stats.s1': 'Estudios equipados en 3 continentes',
            'stats.s2': 'Mil vidas transformadas diariamente',
            'stats.s3': '% tasa de recomendación',
            // Testimonials Section
            'testimonials.kicker': 'TESTIMONIOS',
            'testimonials.title': 'Lo que dicen nuestros clientes',
            'testimonials.t1.quote': '"Los equipos de EquiPilates elevaron mi estudio a otro nivel. Diseño deslumbrante y calidad incomparable."',
            'testimonials.t1.name': 'Mariana Silva',
            'testimonials.t1.role': 'Studio Equilíbrio, São Paulo',
            'testimonials.t2.quote': '"Inversión que transformó nuestro centro. La durabilidad y precisión son excepcionales. Simplemente perfecto."',
            'testimonials.t2.name': 'Carlos Mendes',
            'testimonials.t2.role': 'Centro Rehabilitación, Río de Janeiro',
            'testimonials.t3.quote': '"Diseño sofisticado y funcionalidad impecable. Cada detalle pensado con maestría. Recomiendo sin dudar."',
            'testimonials.t3.name': 'Ana Paula Costa',
            'testimonials.t3.role': 'Studio Harmonia, Belo Horizonte',
            // Contact Section
            'contact.kicker': 'CONTACTO',
            'contact.title': '¿Listo para planificar el próximo paso de tu estudio?',
            'contact.body': 'Habla con un asesor y recibe orientación sobre línea, kit y layout para tu espacio.',
            'contact.addrTitle': 'Dirección',
            'contact.emailTitle': 'Email',
            'contact.phoneTitle': 'WhatsApp',
            'contact.phoneHint': 'Equipo comercial',
            'contact.primaryCta': 'Hablar por WhatsApp',
            'contact.secondaryCta': 'O usa el Wizard arriba y envía todo organizado.',
            // Footer
            'footer.tagline': 'Excelencia en equipos de pilates desde 2006',
            'footer.products': 'Productos',
            'footer.classicLink': 'Línea Clásica',
            'footer.contemporaryLink': 'Línea Contemporánea',
            'footer.company': 'Empresa',
            'footer.about': 'Sobre Nosotros',
            'footer.contactLink': 'Contacto',
            'footer.social': 'Redes Sociales',
            'footer.copyright': '© 2024 EquiPilates. Todos los derechos reservados.'
        },
        'de': {
            'nav.home': 'Start',
            'nav.manifesto': 'Manifest',
            'nav.classic': 'Klassisch',
            'nav.contemporary': 'Zeitgenössisch',
            'nav.contact': 'Kontakt',
            'hero.trustLine': 'Seit 2006 • Fabrik in Resende-RJ • Präsenz in 15+ Ländern',
            'hero.scrollHint': 'Scrollen zum Erkunden',
            'manifesto.kicker': 'EQUIPILATES',
            'manifesto.title': 'Ihr Studio verdient Geräte, die Wachstum unterstützen',
            'manifesto.body': 'Wer ein Studio betreibt, weiß: "Billig" wird zu Wartung, unterbrochenen Stunden und unzufriedenen Kunden. Equipilates gibt es, um dieses Risiko zu beseitigen — mit eigener Fabrik, Qualitätsstandards und einem Vertriebsteam, das Ihnen bei der richtigen Auswahl hilft.',
            'manifesto.img1': 'Premium Reformer',
            'manifesto.img2': 'Cadillac Pro',
            'manifesto.img3': 'Wunda Chair',
            'wizard.kicker': 'PLANEN SIE IHR UPGRADE',
            'wizard.title': 'In 2 Minuten ein empfohlenes Kit für Ihren Raum erhalten',
            'wizard.subtitle': 'Beantworten Sie 3 kurze Fragen und erhalten Sie einen ersten Vorschlag. Wenn es passt, sprechen Sie mit einem Berater.',
            'wizard.q1.label': 'Raumgröße',
            'wizard.q1.placeholder': 'Bereich auswählen',
            'wizard.q1.opt1': 'Bis 25m²',
            'wizard.q1.opt2': '25–40m²',
            'wizard.q1.opt3': '40–70m²',
            'wizard.q1.opt4': '70m²+',
            'wizard.q2.label': 'Upgrade-Ziel',
            'wizard.q2.placeholder': 'Ziel auswählen',
            'wizard.q2.opt1': 'Kapazität erhöhen (mehr Kunden/Termine)',
            'wizard.q2.opt2': 'Geräte ersetzen und Wartung reduzieren',
            'wizard.q2.opt3': 'Fokus auf Rehabilitation/Physio',
            'wizard.q2.opt4': 'Auf zeitgenössische Linie umsteigen',
            'wizard.q3.label': 'Aktuelle Geräte (optional)',
            'wizard.q3.placeholder': 'Z.B.: Reformer + Cadillac (oder aktuelle Marke)',
            'wizard.q3.hint': 'Wenn Sie es nicht wissen, kein Problem — schreiben Sie "weiß nicht".',
            'wizard.primaryCta': 'Empfehlung sehen & WhatsApp',
            'wizard.secondaryCta': 'Per E-Mail senden',
            'wizard.trust': 'Tipp: Gut geführte Studios können Margen von bis zu 62,7% erreichen. Wir helfen Ihnen, das richtige Upgrade zu planen.',
            'wizard.lead.name': 'Name',
            'wizard.lead.namePh': 'Ihr Name',
            'wizard.lead.email': 'E-Mail',
            'wizard.lead.emailPh': 'sie@beispiel.com',
            'wizard.lead.send': 'An das Team senden',
            'wizard.lead.note': 'Öffnet Ihr E-Mail-Programm mit der fertigen Nachricht.',
            // Why Section
            'why.kicker': 'UNSERE UNTERSCHIEDE',
            'why.title': 'Warum EquiPilates wählen',
            'why.b1.title': 'Überlegene Qualität',
            'why.b1.desc': 'Premium ausgewählte Materialien und strenge Herstellungsprozesse garantieren Geräte, die Jahrzehnte halten.',
            'why.b2.title': 'Exklusives Design',
            'why.b2.desc': 'Anspruchsvolle Ästhetik, die Ihr Studio aufwertet und Ihre Kunden vom ersten Kontakt an beeindruckt.',
            'why.b3.title': 'Perfekte Ergonomie',
            'why.b3.desc': 'Mit Physiotherapeuten entwickelt, um die beste Erfahrung und Ergebnisse bei jeder Bewegung zu bieten.',
            'why.b4.title': 'Voller Support',
            'why.b4.desc': 'Spezialisiertes Team in ganz Brasilien für Installation, Wartung und Schulung Ihres Teams.',
            'why.b5.title': 'Erweiterte Garantie',
            'why.b5.desc': '2 Jahre Garantie, die unser absolutes Vertrauen in die Qualität jedes Geräts zeigt.',
            'why.b6.title': 'Personalisierung',
            'why.b6.desc': 'Exklusive Farben, Oberflächen und Konfigurationen, um die einzigartige Identität Ihres Studios zu schaffen.',
            // Classic Section
            'classic.kicker': 'KLASSISCHE LINIE',
            'classic.title': 'Tradition neu erfunden mit zeitgenössischer Exzellenz',
            'classic.body': 'Die Essenz der Joseph Pilates Methode in jedem Detail bewahrt. Zertifiziertes Edelholz, chirurgischer Edelstahl und außergewöhnliche Handwerkskunst vereinen sich zu zeitlosen Geräten, die Tradition ehren und Modernität umarmen.',
            'classic.p1.title': 'Premium Reformer',
            'classic.p1.desc': 'Zeitloses Design mit moderner Leistung. Edelholz und sanfte Einstellungen für ein außergewöhnliches Erlebnis.',
            'classic.p2.title': 'Cadillac Pro',
            'classic.p2.desc': 'Absolute Vielseitigkeit mit robuster Struktur. Perfekt für alle Übungsniveaus.',
            'classic.p3.title': 'Wunda Chair',
            'classic.p3.desc': 'Kompakt ohne Kompromisse bei der Funktionalität. Ideal für Studios mit begrenztem Platz.',
            'classic.p4.title': 'Barrel Arc',
            'classic.p4.desc': 'Perfekte Krümmung für tiefe Wirbelsäulendehnung mit maximalem Komfort.',
            'classic.p5.title': 'Ladder Barrel',
            'classic.p5.desc': 'Flexibilität und Stärke in einem einzigen vielseitigen und eleganten Gerät.',
            'classic.p6.title': 'Premium Mat',
            'classic.p6.desc': 'Essentielle Basis mit überlegenen Materialien und exklusivem ergonomischem Design.',
            // Contemporary Section
            'contemporary.kicker': 'ZEITGENÖSSISCHE LINIE',
            'contemporary.title': 'Innovation, die Qualitätsstandards neu definiert',
            'contemporary.body': 'Visionäres Design, das Konventionen herausfordert. Intelligente Technologie, Aerospace-Materialien und minimalistische Ästhetik vereinen sich zur nächsten Generation von Pilates-Geräten.',
            'contemporary.f1.title': 'Integriertes Digitalsystem',
            'contemporary.f1.desc': 'Intuitive Touch-Oberfläche mit präzisen Einstellungen und Echtzeit-Feedback zur Optimierung jeder Bewegung.',
            'contemporary.f2.title': 'Aerospace-Materialien',
            'contemporary.f2.desc': 'Hochleistungspolymere und Luftfahrt-Aluminiumlegierung garantieren Leichtigkeit und überlegene Beständigkeit.',
            'contemporary.f3.title': 'Intelligentes Modulares Design',
            'contemporary.f3.desc': 'Unendliche Anpassung mit austauschbaren Modulen, die sich an Ihre Studiobedürfnisse anpassen.',
            'contemporary.f4.title': 'Smart Connectivity',
            'contemporary.f4.desc': 'Dedizierte App für komplettes Training-Tracking, vorbeugende Wartung und Leistungsanalyse.',
            // Gallery Section
            'gallery.kicker': 'UNSERE PROJEKTE',
            'gallery.title': 'Studios, die unserer Qualität vertrauen',
            'gallery.g1.title': 'Premium Studio',
            'gallery.g1.loc': 'São Paulo, SP',
            'gallery.g2.title': 'Wellness Center',
            'gallery.g2.loc': 'Rio de Janeiro, RJ',
            'gallery.g3.title': 'Boutique Pilates',
            'gallery.g3.loc': 'Belo Horizonte, MG',
            'gallery.g4.title': 'Gold Academy',
            'gallery.g4.loc': 'Porto Alegre, RS',
            'gallery.g5.title': 'Move Klinik',
            'gallery.g5.loc': 'Florianópolis, SC',
            'gallery.g6.title': 'Exclusive Studio',
            'gallery.g6.loc': 'Curitiba, PR',
            // Stats Section
            'stats.s1': 'Studios auf 3 Kontinenten ausgestattet',
            'stats.s2': 'Tausend Leben täglich transformiert',
            'stats.s3': '% Empfehlungsrate',
            // Testimonials Section
            'testimonials.kicker': 'TESTIMONIALS',
            'testimonials.title': 'Was unsere Kunden sagen',
            'testimonials.t1.quote': '"Die EquiPilates-Geräte haben mein Studio auf ein anderes Niveau gehoben. Atemberaubendes Design und unvergleichliche Qualität."',
            'testimonials.t1.name': 'Mariana Silva',
            'testimonials.t1.role': 'Studio Equilíbrio, São Paulo',
            'testimonials.t2.quote': '"Investition, die unser Zentrum transformiert hat. Haltbarkeit und Präzision sind außergewöhnlich. Einfach perfekt."',
            'testimonials.t2.name': 'Carlos Mendes',
            'testimonials.t2.role': 'Rehabilitationszentrum, Rio de Janeiro',
            'testimonials.t3.quote': '"Anspruchsvolles Design und tadellose Funktionalität. Jedes Detail mit Meisterschaft durchdacht. Ich empfehle ohne zu zögern."',
            'testimonials.t3.name': 'Ana Paula Costa',
            'testimonials.t3.role': 'Studio Harmonia, Belo Horizonte',
            // Contact Section
            'contact.kicker': 'KONTAKT',
            'contact.title': 'Bereit, den nächsten Schritt für Ihr Studio zu planen?',
            'contact.body': 'Sprechen Sie mit einem Berater und erhalten Sie Beratung zu Linie, Kit und Layout für Ihren Raum.',
            'contact.addrTitle': 'Adresse',
            'contact.emailTitle': 'E-Mail',
            'contact.phoneTitle': 'WhatsApp',
            'contact.phoneHint': 'Vertriebsteam',
            'contact.primaryCta': 'Auf WhatsApp chatten',
            'contact.secondaryCta': 'Oder nutzen Sie den Wizard oben und senden Sie alles organisiert.',
            // Footer
            'footer.tagline': 'Exzellenz in Pilates-Geräten seit 2006',
            'footer.products': 'Produkte',
            'footer.classicLink': 'Klassische Linie',
            'footer.contemporaryLink': 'Zeitgenössische Linie',
            'footer.company': 'Unternehmen',
            'footer.about': 'Über Uns',
            'footer.contactLink': 'Kontakt',
            'footer.social': 'Soziale Medien',
            'footer.copyright': '© 2024 EquiPilates. Alle Rechte vorbehalten.'
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

    // Language switch (desktop)
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            setCurrentLang(lang);
            applyLangUI(lang);
            applyI18nStrings(lang);
            updateContent(currentIndex, { animate: false });
        });
    });

    // Language switch (mobile app-style bar)
    document.querySelectorAll('.mobile-lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            setCurrentLang(lang);
            applyLangUI(lang);
            applyI18nStrings(lang);
            updateContent(currentIndex, { animate: false });
        });
    });

    // Hide mobile lang bar on scroll
    const mobileLangBar = document.querySelector('.mobile-lang-bar');
    if (mobileLangBar) {
        let lastScrollY = window.scrollY;
        let ticking = false;
        
        const handleLangBarScroll = () => {
            const currentScrollY = window.scrollY;
            // Hide after scrolling 80px
            if (currentScrollY > 80) {
                mobileLangBar.classList.add('hidden');
            } else {
                mobileLangBar.classList.remove('hidden');
            }
            lastScrollY = currentScrollY;
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(handleLangBarScroll);
                ticking = true;
            }
        }, { passive: true });
    }
    
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
