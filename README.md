# LM-Landing

Landing page profesional para **Liz Maleni - Traductora Certificada**

## 📁 Estructura del Proyecto

```
LM-Landing/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos completos
├── js/
│   └── main.js         # Animaciones e interactividad
├── images/             # Carpeta para imágenes (vacía por ahora)
└── README.md           # Documentación
```

## 🎨 Características de Diseño

- **Paleta de colores**: Navy y dorado para transmitir profesionalismo y elegancia
- **Tipografía**: 
  - Display: Cormorant Garamond (elegante, serif)
  - Body: Outfit (moderna, sans-serif)
- **Responsive**: Diseño adaptable a móvil, tablet y desktop
- **Animaciones**: Fade-in al scroll, transiciones suaves

## ⚡ Funcionalidades

1. **Navegación sticky** con efecto al hacer scroll
2. **Menú móvil** con animación hamburguesa
3. **Toggle de idioma** (Español/English) en la sección de tarifas
4. **Animaciones de scroll** con Intersection Observer
5. **Formulario de contacto** con estados de loading/success
6. **Smooth scroll** para navegación interna

## 🚀 Cómo usar

1. Abre `index.html` en un navegador
2. No requiere servidor local (funciona con file://)
3. Para producción, sube todos los archivos a tu hosting

## 📝 Personalización

### Cambiar colores
Edita las CSS variables en `css/styles.css`:
```css
:root {
    --color-primary: #1a2744;
    --color-accent: #c9a55c;
    /* ... */
}
```

### Agregar imágenes
Coloca las imágenes en `/images/` y referéncialas en HTML:
```html
<img src="images/tu-imagen.jpg" alt="Descripción">
```

### Actualizar tarifas
Modifica los valores en `index.html` dentro de la sección `#tarifas`

### Cambiar datos de contacto
Actualiza los enlaces de WhatsApp y email en las secciones correspondientes

## 📱 Breakpoints Responsive

- **Desktop**: > 992px
- **Tablet**: 768px - 992px  
- **Móvil**: < 768px
- **Móvil pequeño**: < 480px

## 🔧 Tecnologías

- HTML5 semántico
- CSS3 (Custom Properties, Flexbox, Grid)
- JavaScript Vanilla (ES6+)
- Google Fonts

## 📄 Licencia

© 2026 Liz Maleni. Todos los derechos reservados.
