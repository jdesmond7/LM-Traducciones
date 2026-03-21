/**
 * Navbar Component
 * Renders the navigation bar into any page.
 *
 * Usage:
 *   <div id="navbar-root"></div>
 *   <script src="js/components/navbar.js"></script>
 *
 * The component auto-detects the current page to highlight the active link
 * and resolves paths based on the page's depth relative to the project root.
 */

const NavbarComponent = (() => {
    const CONFIG = {
        logo: {
            text: 'LM',
            subtitle: 'Perita Traductora',
            href: 'index.html',
        },
        links: [
            { label: 'Inicio',    href: 'index.html' },
            { label: 'Sobre mí',  href: 'sobre-mi.html' },
            { label: 'Servicios', href: 'servicios.html' },
            { label: 'Tarifas',   href: 'tarifas.html' },
            { label: 'FAQs',      href: 'preguntas-frecuentes.html' },
            { label: 'Solicitar traducción', href: '#contacto', isCta: true },
        ],
    };

    function resolvePath(href, basePath) {
        return basePath ? basePath + href : href;
    }

    function isActive(linkHref) {
        const current = window.location.pathname.split('/').pop() || 'index.html';
        return current === linkHref;
    }

    function render(rootEl, options = {}) {
        const base = options.basePath || '';

        const linksHTML = CONFIG.links.map(link => {
            const classes = ['nav-link'];
            if (link.isCta) classes.push('nav-cta');
            const active = isActive(link.href);
            if (active) classes.push('active');
            const ariaCurrent = active ? ' aria-current="page"' : '';

            return `<li><a href="${resolvePath(link.href, base)}" class="${classes.join(' ')}"${ariaCurrent}>${link.label}</a></li>`;
        }).join('\n                ');

        rootEl.innerHTML = `
    <nav class="navbar" id="navbar">
        <div class="nav-container">
            <a href="${resolvePath(CONFIG.logo.href, base)}" class="nav-logo">
                <span class="logo-text">${CONFIG.logo.text}</span>
                <span class="logo-divider"></span>
                <span class="logo-subtitle">${CONFIG.logo.subtitle}</span>
            </a>
            <ul class="nav-menu" id="nav-menu">
                ${linksHTML}
            </ul>
            <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </nav>`;
    }

    function init(selector = '#navbar-root', options = {}) {
        const rootEl = document.querySelector(selector);
        if (!rootEl) return;
        render(rootEl, options);
    }

    return { init, CONFIG };
})();

document.addEventListener('DOMContentLoaded', () => {
    NavbarComponent.init();
});
