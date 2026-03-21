/**
 * Footer Component
 * Renders the footer into any page.
 *
 * Usage:
 *   <div id="footer-root"></div>
 *   <script src="js/components/footer.js"></script>
 */

const FooterComponent = (() => {
    const CONFIG = {
        logo: {
            text: 'LM',
            subtitle: 'PERITA TRADUCTORA',
            href: 'index.html',
        },
        tagline: 'Traducciones certificadas aceptadas para fines oficiales y legales',
        copyright: '&copy; 2026 Liz Maleni. Todos los derechos reservados.',
        navigation: [
            { label: 'Inicio', key: 'inicio' },
            { label: 'Sobre mí', href: 'sobre-mi.html' },
            { label: 'Servicios', href: 'servicios.html' },
            { label: 'Tarifas', href: 'tarifas.html' },
            { label: 'FAQs', href: 'preguntas-frecuentes.html' },
        ],
        contact: [
            { label: 'WhatsApp', href: 'https://wa.me/528116009783' },
            { label: 'Email', href: 'mailto:maleni.uribe.mtz@gmail.com' },
        ],
    };

    function resolvePath(href, basePath) {
        return basePath ? basePath + href : href;
    }

    function getCurrentPage() {
        return window.location.pathname.split('/').pop() || 'index.html';
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
        const currentPage = getCurrentPage();

        const navigationHTML = CONFIG.navigation
            .map(link => `<li><a href="${getLinkHref(link, currentPage, base)}">${link.label}</a></li>`)
            .join('\n                            ');

        const contactHTML = CONFIG.contact
            .map(link => `<li><a href="${link.href}">${link.label}</a></li>`)
            .join('\n                            ');

        rootEl.innerHTML = `
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-brand">
                    <a href="${resolvePath(CONFIG.logo.href, base)}" class="footer-logo">
                        <span class="logo-text">${CONFIG.logo.text}</span>
                        <span class="logo-divider"></span>
                        <span class="logo-subtitle">${CONFIG.logo.subtitle}</span>
                    </a>
                    <p class="footer-tagline">
                        ${CONFIG.tagline}
                    </p>
                </div>

                <div class="footer-links">
                    <div class="footer-column">
                        <h4>Navegación</h4>
                        <ul>
                            ${navigationHTML}
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h4>Contacto</h4>
                        <ul>
                            ${contactHTML}
                        </ul>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <p>${CONFIG.copyright}</p>
            </div>
        </div>
    </footer>`;
    }

    function init(selector = '#footer-root', options = {}) {
        const rootEl = document.querySelector(selector);
        if (!rootEl) return;
        render(rootEl, options);
    }

    return { init, CONFIG };
})();

document.addEventListener('DOMContentLoaded', () => {
    FooterComponent.init();
});
