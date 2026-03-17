# LM-Landing

Landing page profesional para **Liz Maleni - Traductora Certificada**

## Estructura del Proyecto

```
LM-Landing/
├── index.html                  # Pagina principal
├── css/
│   ├── styles.css              # Agregador principal de imports
│   ├── base/
│   │   ├── reset.css           # Variables CSS, reset y estilos base
│   │   └── typography.css      # Tipografia y estilos de seccion
│   ├── layout/
│   │   ├── header.css          # Navegacion / header
│   │   ├── hero.css            # Seccion hero
│   │   └── footer.css          # Footer
│   ├── components/
│   │   ├── buttons.css         # Botones (primary, secondary, small)
│   │   ├── cards.css           # Tarjetas, pricing, proceso, contacto
│   │   └── carousel.css        # Carrusel de logos
│   └── utilities/
│       ├── spacing.css         # Container y espaciado
│       └── helpers.css         # Animaciones y media queries responsive
├── js/
│   ├── main.js                 # Animaciones e interactividad
│   └── components/
│       └── navbar.js           # Componente reutilizable de navegacion
├── images/
│   ├── LM-Hero.png
│   ├── ITESM-logo.png
│   └── UANL-logo.png
└── README.md
```

## Arquitectura CSS

`styles.css` actua como agregador y controla el orden de carga:

1. **Base** — Variables, reset, tipografia
2. **Spacing** — Container
3. **Layout** — Header, hero, footer
4. **Components** — Botones, tarjetas, carrusel
5. **Helpers** — Animaciones y responsive (carga al final para ganar por cascada)

## Componentes JS

### Navbar (`js/components/navbar.js`)

Componente reutilizable que genera la barra de navegacion. La configuracion de links y logo se centraliza en un solo archivo.

**Uso en cualquier pagina:**

```html
<div id="navbar-root"></div>
<script src="js/components/navbar.js"></script>
```

Para paginas en subcarpetas, pasar un `basePath`:

```html
<script>
    NavbarComponent.init('#navbar-root', { basePath: '../' });
</script>
```

### Botones

Clases disponibles:

| Clase | Uso |
|---|---|
| `.btn .btn-primary` | Boton principal (fondo solido) |
| `.btn .btn-secondary` | Boton secundario (borde) |
| `.btn .btn--small` | Variante pequena (para FAQs, etc.) |
| `.btn .btn-full` | Ancho completo |

## Caracteristicas de Diseno

- **Paleta de colores**: Golden Chestnut y Seashell para transmitir profesionalismo y elegancia
- **Tipografia**:
  - Display: Cormorant Garamond (elegante, serif)
  - Body: Outfit (moderna, sans-serif)
- **Responsive**: Diseno adaptable a movil, tablet y desktop
- **Animaciones**: Fade-in al scroll, transiciones suaves

## Funcionalidades

1. **Navegacion sticky** con efecto al hacer scroll
2. **Menu movil** con animacion hamburguesa
3. **Toggle de idioma** (Espanol/English) en la seccion de tarifas
4. **Animaciones de scroll** con Intersection Observer
5. **Formulario de contacto** con estados de loading/success
6. **Smooth scroll** para navegacion interna
7. **Carrusel de logos** con scroll infinito

## Como usar (con backend propio)

1. Instala dependencias:
   ```bash
   npm install
   ```
2. Crea tu archivo `.env` basado en `.env.example` y configura SMTP.
3. Inicia el servidor:
   ```bash
   npm start
   ```
4. Abre el sitio en `http://localhost:3000`.

### Variables de entorno

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`: credenciales del servidor SMTP.
- `MAIL_FROM`: remitente del correo (opcional, por defecto usa `SMTP_USER`).
- `MAIL_TO`: correo principal que recibe el formulario.
- `MAIL_CC`: copia opcional.

## Personalizacion

### Cambiar colores

Edita las CSS variables en `css/base/reset.css`:

```css
:root {
    --color-primary: var(--golden-chestnut-600);
    --color-accent: #c9a55c;
}
```

### Cambiar navegacion

Edita el `CONFIG` en `js/components/navbar.js`:

```javascript
links: [
    { label: 'Sobre mi',  href: 'sobre-mi.html' },
    { label: 'Servicios', href: 'servicios.html' },
    { label: 'Tarifas',   href: 'tarifas.html' },
    { label: 'FAQs',      href: 'preguntas-frecuentes.html' },
    { label: 'Solicitar traduccion', href: '#contacto', isCta: true },
],
```

### Actualizar tarifas

Modifica los valores en `index.html` dentro de la seccion `#tarifas`.

### Cambiar datos de contacto

Actualiza los enlaces de WhatsApp y email en las secciones correspondientes.

## Breakpoints Responsive

- **Desktop**: > 992px
- **Tablet**: 768px - 992px
- **Movil**: < 768px (imagen hero oculta, contenido centrado)
- **Movil pequeno**: < 480px (botones full-width)

## Tecnologias

- HTML5 semantico
- CSS3 (Custom Properties, Flexbox, Grid)
- JavaScript Vanilla (ES6+)
- Google Fonts

## Licencia

(c) 2026 Liz Maleni. Todos los derechos reservados.
