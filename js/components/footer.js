/**
 * Footer Component
 * Renders the footer into any page.
 *
 * Usage:
 *   <div id="footer-root"></div>
 *   <script src="js/components/footer.js"></script>
 */

const FooterComponent = (() => {
    function detectLocale() {
        const parts = window.location.pathname.split('/').filter(Boolean);
        if (parts.length >= 2 && parts[parts.length - 2] === 'en') return 'en';
        return 'es';
    }

    const COPY = {
        es: {
            tagline: 'Traducciones certificadas aceptadas para fines oficiales y legales',
            copyright: '&copy; 2026 Liz Maleni. Todos los derechos reservados.',
            navHeading: 'Navegación',
            contactHeading: 'Contacto',
            logoSubtitle: 'PERITA TRADUCTORA',
            navigation: [
                { label: 'Inicio', key: 'inicio' },
                { label: 'Sobre mí', href: 'sobre-mi.html' },
                { label: 'Servicios', href: 'servicios.html' },
                { label: 'Tarifas', href: 'tarifas.html' },
                { label: 'FAQs', href: 'preguntas-frecuentes.html' },
            ],
        },
        en: {
            tagline: 'Certified translations accepted for official and legal purposes',
            copyright: '&copy; 2026 Liz Maleni. All rights reserved.',
            navHeading: 'Navigation',
            contactHeading: 'Contact',
            logoSubtitle: 'SWORN TRANSLATOR',
            navigation: [
                { label: 'Home', key: 'inicio' },
                { label: 'About', href: 'sobre-mi.html' },
                { label: 'Services', href: 'servicios.html' },
                { label: 'Rates', href: 'tarifas.html' },
                { label: 'FAQs', href: 'preguntas-frecuentes.html' },
            ],
        },
    };

    const CONTACT_LINKS = [
        { labelEs: 'WhatsApp', labelEn: 'WhatsApp', href: 'https://wa.me/528116009783' },
        { labelEs: 'Email', labelEn: 'Email', href: 'mailto:maleni.uribe.mtz@gmail.com' },
        { labelEs: 'LinkedIn', labelEn: 'LinkedIn', href: 'https://www.linkedin.com/in/lizmaleni/' },
        {
            labelEs: 'Perfil profesional',
            labelEn: 'Professional profile',
            href: 'https://www.uanl.mx/investigadores/liz-maleni-uribe-martinez/',
        },
        {
            labelEs: 'Instagram',
            labelEn: 'Instagram',
            href: 'https://www.instagram.com/lizmalenitraduccion?igsh=a3MxbWJubjM4cWFs',
        },
    ];

    function resolvePath(href, basePath) {
        return basePath ? basePath + href : href;
    }

    function getCurrentPage() {
        let name = window.location.pathname.split('/').filter(Boolean).pop() || 'index.html';
        if (!name.includes('.')) name = 'index.html';
        return name;
    }

    function buildAnchorHref(anchorKey, currentPage, basePath) {
        const anchor = `#${anchorKey}`;
        if (currentPage === 'index.html') return anchor;
        return resolvePath(`index.html${anchor}`, basePath);
    }

    function getLinkHref(link, currentPage, basePath) {
        if (link.key) {
            return buildAnchorHref(link.key, currentPage, basePath);
        }
        return resolvePath(link.href, basePath);
    }

    function render(rootEl, options = {}) {
        const base = options.basePath || '';
        const locale = options.locale || detectLocale();
        const t = COPY[locale];
        const currentPage = getCurrentPage();

        const navigationHTML = t.navigation
            .map(
                link =>
                    `<li><a href="${getLinkHref(link, currentPage, base)}">${link.label}</a></li>`
            )
            .join('\n                            ');

        const contactHTML = CONTACT_LINKS.map(link => {
            const label = locale === 'en' ? link.labelEn : link.labelEs;
            const externalAttrs = link.href.startsWith('http')
                ? ' target="_blank" rel="noopener noreferrer"'
                : '';
            return `<li><a href="${link.href}"${externalAttrs}>${label}</a></li>`;
        }).join('\n                            ');

        rootEl.innerHTML = `
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-brand">
                    <a href="${resolvePath('index.html', base)}" class="footer-logo">
                        <span class="logo-text">LM</span>
                        <span class="logo-divider"></span>
                        <span class="logo-subtitle">${t.logoSubtitle}</span>
                    </a>
                    <p class="footer-tagline">
                        ${t.tagline}
                    </p>
                </div>

                <div class="footer-links">
                    <div class="footer-column">
                        <h4>${t.navHeading}</h4>
                        <ul>
                            ${navigationHTML}
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h4>${t.contactHeading}</h4>
                        <ul>
                            ${contactHTML}
                        </ul>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <p>${t.copyright}</p>
            </div>
        </div>
    </footer>`;
    }

    function init(selector = '#footer-root', options = {}) {
        const rootEl = document.querySelector(selector);
        if (!rootEl) return;
        if (!options.locale) options = { ...options, locale: detectLocale() };
        render(rootEl, options);
    }

    return { init, detectLocale };
})();

document.addEventListener('DOMContentLoaded', () => {
    FooterComponent.init();
});
