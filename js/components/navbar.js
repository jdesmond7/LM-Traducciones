/**
 * Navbar Component
 * Renders the navigation bar into any page.
 *
 * Usage:
 *   <div id="navbar-root"></div>
 *   <script src="js/components/navbar.js"></script>
 *
 * Spanish pages (project root): default init().
 * English pages under /en/: NavbarComponent.init('#navbar-root', { locale: 'en', assetPrefix: '../' });
 */

const NavbarComponent = (() => {
    const LINKS_ES = [
        { label: 'Inicio', href: 'index.html' },
        { label: 'Sobre mí', href: 'sobre-mi.html' },
        { label: 'Servicios', href: 'servicios.html' },
        { label: 'Tarifas', href: 'tarifas.html' },
        { label: 'FAQs', href: 'preguntas-frecuentes.html' },
        { label: 'Solicitar traducción', href: '#contacto', isCta: true },
    ];

    const LINKS_EN = [
        { label: 'Home', href: 'index.html' },
        { label: 'About', href: 'sobre-mi.html' },
        { label: 'Services', href: 'servicios.html' },
        { label: 'Rates', href: 'tarifas.html' },
        { label: 'FAQs', href: 'preguntas-frecuentes.html' },
        { label: 'Request translation', href: '#contacto', isCta: true },
    ];

    function detectLocale() {
        const parts = window.location.pathname.split('/').filter(Boolean);
        if (parts.length >= 2 && parts[parts.length - 2] === 'en') return 'en';
        return 'es';
    }

    function getLogo(locale) {
        if (locale === 'en') {
            return {
                text: 'LM',
                subtitle: 'Sworn Translator',
                href: 'index.html',
            };
        }
        return {
            text: 'LM',
            subtitle: 'Perita Traductora',
            href: 'index.html',
        };
    }

    function resolvePath(href, basePath) {
        return basePath ? basePath + href : href;
    }

    function isActive(linkHref) {
        const current = window.location.pathname.split('/').pop() || 'index.html';
        return current === linkHref;
    }

    function langSwitchHtml(locale, basePath) {
        let samePage = window.location.pathname.split('/').filter(Boolean).pop() || 'index.html';
        if (!samePage.includes('.')) samePage = 'index.html';
        const esPage = locale === 'en' ? resolvePath('../' + samePage, basePath) : resolvePath(samePage, basePath);
        const enPage =
            locale === 'en' ? resolvePath(samePage, basePath) : resolvePath('en/' + samePage, basePath);

        const esActive = locale === 'es' ? ' nav-lang-link--active' : '';
        const enActive = locale === 'en' ? ' nav-lang-link--active' : '';
        const esCurrent = locale === 'es' ? ' aria-current="true"' : '';
        const enCurrent = locale === 'en' ? ' aria-current="true"' : '';

        return `
            <li class="nav-lang" role="presentation">
                <span class="nav-lang-inner" role="group" aria-label="${locale === 'en' ? 'Site language' : 'Idioma del sitio'}">
                    <a href="${esPage}" class="nav-lang-link${esActive}" data-lm-lang="es"${esCurrent}>ES</a>
                    <span class="nav-lang-sep" aria-hidden="true">|</span>
                    <a href="${enPage}" class="nav-lang-link${enActive}" data-lm-lang="en"${enCurrent}>EN</a>
                </span>
            </li>`;
    }

    function render(rootEl, options = {}) {
        const locale = options.locale || detectLocale();
        const base = options.basePath || '';
        const links = locale === 'en' ? LINKS_EN : LINKS_ES;
        const logo = getLogo(locale);

        const linksHTML = links
            .map(link => {
                const classes = ['nav-link'];
                if (link.isCta) classes.push('nav-cta');
                const active = isActive(link.href);
                if (active) classes.push('active');
                const ariaCurrent = active ? ' aria-current="page"' : '';

                return `<li><a href="${resolvePath(link.href, base)}" class="${classes.join(' ')}"${ariaCurrent}>${link.label}</a></li>`;
            })
            .join('\n                ');

        const langHTML = langSwitchHtml(locale, base);

        rootEl.innerHTML = `
    <nav class="navbar" id="navbar">
        <div class="nav-container">
            <a href="${resolvePath(logo.href, base)}" class="nav-logo">
                <span class="logo-text">${logo.text}</span>
                <span class="logo-divider"></span>
                <span class="logo-subtitle">${logo.subtitle}</span>
            </a>
            <ul class="nav-menu" id="nav-menu">
                ${linksHTML}
                ${langHTML}
            </ul>
            <button class="nav-toggle" id="nav-toggle" aria-label="${locale === 'en' ? 'Toggle menu' : 'Abrir menú'}">
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
        if (!options.locale) options = { ...options, locale: detectLocale() };
        render(rootEl, options);
    }

    return { init, detectLocale };
})();

document.addEventListener('DOMContentLoaded', () => {
    NavbarComponent.init();
});
