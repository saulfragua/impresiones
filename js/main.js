/**
 * Impresiones Plotter - JavaScript Principal
 * Efectos modernos: scroll reveal, parallax, transiciones
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavToggle();
    initSmoothScroll();
    initHeaderScroll();
    initActiveNav();
    initHeroVideo();
    initContactForm();
    initNewsletterForm();
    initScrollReveal();
    initParallax();
    initSectionTransitions();
    initScrollProgress();
    initSectionParallax();
});

/**
 * Video de fondo en Hero - máquinas plotter
 */
function initHeroVideo() {
    const video = document.getElementById('heroVideo');
    const hero = document.querySelector('.hero');

    if (video && hero) {
        video.muted = true;
        video.playsInline = true;
        video.loop = true;

        video.addEventListener('loadeddata', () => {
            hero.classList.add('has-video');
            video.play().catch(() => {});
        });

        video.addEventListener('error', () => {
            hero.classList.remove('has-video');
        });

        video.play().catch(() => {});
    }
}

/**
 * Menú móvil - Toggle del menú hamburguesa
 */
function initNavToggle() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navOverlay = document.querySelector('.nav-overlay');

    const closeMenu = () => {
        navMenu?.classList.remove('active');
        navToggle?.classList.remove('active');
        document.body.classList.remove('menu-open');
    };

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open', navMenu.classList.contains('active'));
        });

        navOverlay?.addEventListener('click', closeMenu);

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }
}

/**
 * Scroll suave al hacer clic en enlaces
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Efecto en header al hacer scroll
 */
function initHeaderScroll() {
    const header = document.getElementById('mainHeader');

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

/**
 * Resaltar enlace activo según la sección visible
 */
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

/**
 * Scroll Reveal - Animaciones al entrar en viewport
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-scale');
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
}

/**
 * Efecto Parallax en elementos con data-parallax
 */
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    if (parallaxElements.length === 0) return;

    const handleParallax = () => {
        const scrolled = window.scrollY;
        const windowHeight = window.innerHeight;

        parallaxElements.forEach(el => {
            const speed = parseFloat(el.getAttribute('data-parallax')) || 0.3;
            const rect = el.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;
            const viewportCenter = windowHeight / 2;

            if (rect.top < windowHeight) {
                const distance = elementCenter - viewportCenter;
                const offset = distance * speed * 0.1;
                el.style.transform = `translateY(calc(-50% + ${offset}px))`;
            }
        });
    };

    window.addEventListener('scroll', handleParallax, { passive: true });
    window.addEventListener('resize', handleParallax);
    handleParallax();
}

/**
 * Transiciones únicas entre secciones - cada sección con su propia animación
 */
function initSectionTransitions() {
    const sections = document.querySelectorAll('.section-reveal[data-reveal]');

    const observerOptions = {
        root: null,
        rootMargin: '-5% 0px -5% 0px',
        threshold: 0.08
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

/**
 * Indicador de progreso de scroll - barra en la parte superior
 */
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (!progressBar) return;

    const updateProgress = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = `${progress}%`;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
}

/**
 * Parallax con más movimiento - contenido se desplaza según scroll entre secciones
 */
function initSectionParallax() {
    const containers = document.querySelectorAll('.section-reveal[data-reveal] .container');
    let ticking = false;

    const handleParallax = () => {
        const viewportHeight = window.innerHeight;

        containers.forEach(container => {
            const section = container.closest('section');
            if (!section || !section.classList.contains('section-visible')) return;

            const rect = section.getBoundingClientRect();
            const sectionCenter = rect.top + rect.height / 2;
            const viewportCenter = viewportHeight * 0.35;
            const distance = sectionCenter - viewportCenter;
            const offset = Math.max(-35, Math.min(35, distance * 0.06));

            container.style.transform = `translateY(${offset}px)`;
        });
        ticking = false;
    };

    const onScroll = () => {
        if (!ticking) {
            requestAnimationFrame(handleParallax);
            ticking = true;
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
}

/**
 * Manejo del formulario de newsletter
 */
function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input[type="email"]');
            if (input && input.value) {
                const btn = form.querySelector('button[type="submit"]');
                const originalText = btn.textContent;
                btn.textContent = '¡Gracias por suscribirte!';
                btn.style.background = '#22c55e';
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    form.reset();
                }, 3000);
            }
        });
    }
}

/**
 * Animación de contador (no usado en diseño actual)
 */
function initCounterAnimation() {
    const counterEl = document.querySelector('.big-number');
    if (!counterEl) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = 15;
                let current = 0;
                const duration = 1500;
                const step = target / (duration / 16);
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        counterEl.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        counterEl.textContent = Math.floor(current) + '+';
                    }
                }, 16);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(counterEl);
}

/**
 * Manejo del formulario de contacto
 */
function initContactForm() {
    const form = document.querySelector('.contacto-form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries([...formData.entries()]);
            console.log('Datos del formulario:', data);

            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = '¡Mensaje enviado!';
            btn.style.background = '#22c55e';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                form.reset();
            }, 3000);
        });
    }
}
