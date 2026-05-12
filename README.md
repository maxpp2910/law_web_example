# Estudio Jurídico — Sitio Web Corporativo

Sitio web multipágina para estudio de abogados en Lima, Perú.  
Construido con HTML, CSS y JavaScript puros. Sin frameworks ni dependencias de build.

---

## Árbol de carpetas

```
/
├── index.html                          ← Inicio
├── estudio/
│   └── index.html                      ← El Estudio
├── equipo/
│   └── index.html                      ← Equipo (con modal)
├── especialidades/
│   ├── index.html                      ← Listado de especialidades
│   └── derecho-penal/
│       └── index.html                  ← Derecho Penal
├── contactanos/
│   └── index.html                      ← Contáctanos (con formulario)
├── assets/
│   ├── css/
│   │   ├── main.css                    ← Variables, reset, base, botones
│   │   ├── components.css              ← Header, footer, hero, cards, modal, form
│   │   └── responsive.css             ← Media queries
│   └── js/
│       ├── main.js                     ← Entry point (páginas estándar)
│       ├── data/
│       │   ├── site.js                 ← Datos globales: nombre, contacto, logo, hero
│       │   ├── team.js                 ← Datos del equipo
│       │   └── specialties.js         ← Datos de especialidades
│       └── modules/
│           ├── header.js               ← Render logo, nav activo, menú móvil
│           ├── footer.js               ← Render datos de contacto en footer
│           ├── modal.js                ← Modal de perfil de abogados
│           ├── form.js                 ← Validación del formulario de contacto
│           └── helpers.js             ← sanitize, lazyLoadImages, animateOnScroll
├── favicon.svg                         ← Favicon placeholder (reemplazar)
├── .htaccess                           ← Configuración Apache (URLs limpias + headers)
└── _redirects                          ← Regla de redirección para Netlify
```

---

## Cómo abrir localmente

Este sitio usa módulos ES (`type="module"`), por lo que **no puede abrirse directamente
con `file://`**. Se necesita un servidor local:

```bash
# Opción 1 — Python (sin instalación extra)
python3 -m http.server 3000 --directory .

# Opción 2 — Node.js (npx, sin instalar nada global)
npx serve .

# Opción 3 — VS Code
# Instalar extensión "Live Server" y clic derecho → "Open with Live Server" en index.html
```

Luego abrir: `http://localhost:3000`

---

## Cómo reemplazar assets

Todos los datos y URLs de imágenes están centralizados en archivos de datos.
**No edites los HTML para cambiar imágenes o datos de contacto.**

### 1. Datos globales — `assets/js/data/site.js`

```js
const SITE = {
  name: 'Nombre Real del Estudio',
  phone: '+51 1 XXX XXXX',
  whatsapp: '+51 9XXXXXXXX',          // Solo dígitos, sin espacios
  email: 'contacto@tudominio.pe',
  address: 'Dirección real, Lima',
  schedule: 'Lunes a Viernes, 9:00 am – 7:00 pm',
  logo: {
    src: '/assets/img/logo.svg',       // Ruta al logo real
    alt: 'Nombre del estudio',
    text: 'NOMBRE DEL ESTUDIO'         // Texto fallback si src está vacío
  },
  favicon: '',                         // No se usa directamente, reemplazar favicon.svg
  hero: {
    src: '/assets/img/hero.jpg',       // Imagen del hero de la home
    alt: 'Descripción para SEO'
  }
};
```

### 2. Fotos del equipo — `assets/js/data/team.js`

```js
{
  id: 'socio-fundador',
  name: 'Dr. Nombre Real',
  role: 'Cargo Real',
  photo: '/assets/img/team/socio-fundador.jpg',   // ← Aquí va la URL real
  photoAlt: 'Dr. Nombre Real, Cargo Real',
  bio: 'Biografía breve del abogado...',
  facebook: 'https://facebook.com/perfil',
  whatsapp: '+51900000001',
  linkedin: 'https://linkedin.com/in/perfil'
}
```

### 3. Favicon

Reemplazar `favicon.svg` con tu archivo real (`.svg`, `.ico` o `.png`).  
Actualizar la línea en todos los `<head>`:

```html
<link rel="icon" href="/favicon.ico" type="image/x-icon">
```

### 4. Imágenes de sección (hero interior, dos columnas)

En los HTML de cada página, buscar las etiquetas:

```html
<img class="hero__bg-image" data-src="" alt="...">
<img class="two-col__visual-img" data-src="" alt="...">
```

Rellenar el atributo `data-src` con la URL real de cada imagen.  
Las imágenes se cargan lazy automáticamente gracias a `helpers.js`.

---

## Formato de imágenes recomendado

| Uso | Formato | Tamaño aprox. |
|---|---|---|
| Hero fondo | WebP / JPG | 1920×1080 px |
| Foto abogado (tarjeta) | WebP / JPG | 600×800 px (3:4) |
| Foto modal (busto) | WebP / JPG | 800×450 px (16:9) |
| Imágenes de sección | WebP / JPG | 1200×900 px |
| Logo | SVG (preferido) | — |
| Favicon | SVG o ICO | 32×32 px |

---

## Cómo desplegar

### Netlify (recomendado)
1. Subir la carpeta completa a un repositorio GitHub / GitLab.
2. Conectar el repositorio en [netlify.com](https://netlify.com).
3. Build command: *(dejar vacío)*
4. Publish directory: `.` (raíz)
5. El archivo `_redirects` ya gestiona las rutas limpias.

### Vercel
1. Igual que Netlify. En "Framework preset" seleccionar **Other**.
2. El archivo `_redirects` es suficiente.

### Hosting Apache (cPanel, etc.)
1. Subir todos los archivos a `public_html/`.
2. El archivo `.htaccess` ya gestiona las rutas y los headers de seguridad.

### GitHub Pages
GitHub Pages no soporta rutas limpias multipágina de forma nativa.  
Alternativa: usar la estructura de carpetas tal cual; las rutas `/equipo/` funcionan
porque cada carpeta tiene su propio `index.html`.

---

## Agregar un nuevo abogado

1. Añadir entrada en `assets/js/data/team.js` con todos los campos.
2. Copiar una tarjeta `.team-card` en `equipo/index.html` y ajustar el `data-member-id`
   para que coincida con el campo `id` del nuevo registro en `team.js`.
3. Subir la foto a `/assets/img/team/`.

## Agregar una nueva especialidad con subpágina

1. Añadir entrada en `assets/js/data/specialties.js`.
2. Crear la carpeta: `especialidades/nombre-especialidad/index.html`.
3. Usar `especialidades/derecho-penal/index.html` como plantilla.
4. Añadir el ítem en `especialidades/index.html`.

---

## Migración a React / Angular / Vue

La estructura de datos (`/assets/js/data/`) mapea directamente a:
- **React**: objetos para props y estado.
- **Angular**: servicios de datos (`DataService`).
- **Vue**: estado de Pinia / Vuex o `reactive()`.

Los módulos de `assets/js/modules/` equivalen a composables / servicios.  
Los componentes HTML están claramente delimitados y documentados con clases BEM.

---

## SEO — checklist implementado

- [x] HTML semántico (`<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`, `<article>`)
- [x] Un único `<h1>` por página
- [x] `<title>` único por ruta
- [x] `<meta name="description">` único por ruta
- [x] `alt` en todas las imágenes
- [x] URLs limpias (`/especialidades/derecho-penal/`)
- [x] `rel="noopener noreferrer"` en todos los enlaces externos
- [x] Contenido orientado a búsquedas como "abogados en Lima"

---

## Seguridad — checklist implementado

- [x] Sin `inline scripts` en HTML
- [x] Sin atributos `onclick` en HTML — todo mediante `addEventListener`
- [x] Validación de formulario en frontend con mensajes de error accesibles
- [x] Función `sanitize()` disponible en `helpers.js` para inputs no confiables
- [x] Sin uso de `innerHTML` con datos del usuario
- [x] Headers de seguridad en `.htaccess` (X-Frame-Options, X-Content-Type-Options, etc.)
