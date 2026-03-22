/**
 * Locale routing: respects localStorage lm-lang (user choice), otherwise
 * matches the browser's primary language. Redirects to /en/*.html or back
 * to the Spanish sibling page when the current file does not match the target locale.
 */
(function () {
    var KEY = 'lm-lang';
    var storage;
    try {
        storage = window.localStorage;
    } catch (e) {
        return;
    }

    function pathFilename(pathname) {
        var parts = pathname.split('/').filter(function (p) {
            return p.length;
        });
        var last = parts[parts.length - 1] || '';
        if (!last || last.indexOf('.') === -1) return 'index.html';
        return last;
    }

    function inEnFolder(pathname) {
        var parts = pathname.split('/').filter(function (p) {
            return p.length;
        });
        if (parts.length < 2) return false;
        return parts[parts.length - 2] === 'en';
    }

    function currentLocale() {
        return inEnFolder(window.location.pathname) ? 'en' : 'es';
    }

    function browserPreferredLocale() {
        var langs =
            navigator.languages && navigator.languages.length
                ? navigator.languages
                : [navigator.language || 'es'];
        var first = String(langs[0] || 'es').toLowerCase();
        return first.indexOf('en') === 0 ? 'en' : 'es';
    }

    var pref = storage.getItem(KEY);
    var u = new URL(window.location.href);
    var file = pathFilename(u.pathname);

    var target;
    if (pref === 'es' || pref === 'en') {
        target = pref;
    } else {
        if (file !== 'index.html') return;
        target = browserPreferredLocale();
    }

    var current = currentLocale();
    if (target === current) return;

    if (target === 'en') {
        var dir = u.pathname.replace(/[^/]*$/, '');
        u.pathname = dir + 'en/' + file;
        window.location.replace(u.href);
        return;
    }

    u.pathname = u.pathname.replace(/\/en\/([^/]+)$/, '/$1');
    window.location.replace(u.href);
})();

document.addEventListener('click', function (e) {
    var link = e.target && e.target.closest && e.target.closest('a[data-lm-lang]');
    if (!link) return;
    var v = link.getAttribute('data-lm-lang');
    if (v !== 'es' && v !== 'en') return;
    try {
        window.localStorage.setItem('lm-lang', v);
    } catch (err) {
        /* ignore */
    }
});
