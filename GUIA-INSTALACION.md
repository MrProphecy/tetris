# 🎮 GUÍA DE INSTALACIÓN TETRIS ELITE - DESDE CERO

## ⚡ ¿Necesito una Máquina Virtual?

**NO** ❌ - Este juego es una aplicación web estática que funciona directamente en el navegador.
**NO necesitas**:
- ❌ Máquina virtual
- ❌ Servidor dedicado
- ❌ Instalación de software complejo
- ❌ Conocimientos avanzados de programación

---

## 🎯 MÉTODO 1: GitHub Pages (100% GRATIS - MÁS FÁCIL)

### Paso 1: Crear cuenta en GitHub (si no tienes)
1. Ve a [github.com](https://github.com)
2. Haz clic en **"Sign up"**
3. Completa el registro con tu email

### Paso 2: Crear un repositorio
1. Una vez logueado, haz clic en el botón **"+"** (arriba derecha)
2. Selecciona **"New repository"**
3. Nombre del repositorio: **tetris** (o el nombre que quieras)
4. Marca como **"Public"**
5. Haz clic en **"Create repository"**

### Paso 3: Subir los archivos del juego
1. En la página del repositorio, haz clic en **"uploading an existing file"**
2. Arrastra estos archivos a la ventana:
   - `index.html`
   - `styles.css`
   - `game.js`
3. Haz clic en **"Commit changes"**

### Paso 4: Activar GitHub Pages
1. Ve a **Settings** (Configuración) de tu repositorio
2. En el menú lateral, busca **"Pages"**
3. En **"Source"**, selecciona **"main"** branch
4. Haz clic en **"Save"**
5. Espera 2-3 minutos

### ✅ ¡Listo!
Tu juego estará disponible en:
```
https://TU-USUARIO.github.io/tetris/
```

**Ejemplo**: Si tu usuario es "juanperez", la URL será:
```
https://juanperez.github.io/tetris/
```

---

## 🚀 MÉTODO 2: Vercel (SUPER RÁPIDO)

### Paso 1: Crear cuenta en Vercel
1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en **"Sign Up"**
3. Regístrate con tu cuenta de GitHub (más fácil)

### Paso 2: Desplegar
1. Haz clic en **"Add New..."** → **"Project"**
2. Selecciona **"Import Git Repository"**
3. Elige tu repositorio **"tetris"** de GitHub
4. Haz clic en **"Deploy"**
5. ¡Espera 30 segundos!

### ✅ ¡Listo!
Vercel te dará una URL como:
```
https://tetris-tu-nombre.vercel.app
```

---

## 🎨 MÉTODO 3: Netlify Drop (EL MÁS SIMPLE)

### Paso 1: Descargar los archivos
1. Crea una carpeta en tu computadora llamada **"tetris"**
2. Guarda dentro estos archivos:
   - `index.html`
   - `styles.css`
   - `game.js`

### Paso 2: Subir a Netlify
1. Ve a [app.netlify.com/drop](https://app.netlify.com/drop)
2. **Arrastra la carpeta "tetris"** a la ventana del navegador
3. ¡Espera 10 segundos!

### ✅ ¡Listo!
Netlify te dará una URL como:
```
https://random-name-123456.netlify.app
```

Puedes cambiar el nombre en la configuración después.

---

## 💻 MÉTODO 4: Probar en tu Computadora (SIN INTERNET)

### Opción A: Abrir directamente
1. Descarga los archivos en una carpeta
2. Haz **doble clic** en `index.html`
3. Se abrirá en tu navegador
4. ¡Ya puedes jugar!

### Opción B: Con servidor local simple

#### Si tienes Python instalado:
```bash
# Abre terminal en la carpeta del juego
cd ruta/a/tu/carpeta/tetris

# Python 3
python -m http.server 8000

# Abre el navegador en: http://localhost:8000
```

#### Si tienes Node.js instalado:
```bash
# Instala http-server (solo una vez)
npm install -g http-server

# En la carpeta del juego
http-server

# Abre el navegador en: http://localhost:8080
```

---

## 🔗 INTEGRAR EN INVERNALIA CAFÉ

Una vez que tengas tu URL del juego, añade este código a tu sitio web:

### HTML (donde quieras el botón):
```html
<!-- Botón para jugar -->
<a href="TU-URL-DEL-JUEGO-AQUI"
   class="btn-tetris"
   target="_blank">
   🎮 Jugar Tetris Elite
</a>
```

### CSS (en tu archivo de estilos):
```css
.btn-tetris {
    display: inline-block;
    padding: 15px 30px;
    background: linear-gradient(45deg, #00f5ff, #ff00ff);
    color: white;
    text-decoration: none;
    border-radius: 50px;
    font-family: 'Arial', sans-serif;
    font-weight: bold;
    font-size: 1.1rem;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    box-shadow: 0 5px 25px rgba(0, 245, 255, 0.4);
    border: 2px solid rgba(255, 255, 255, 0.3);
}

.btn-tetris:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 35px rgba(0, 245, 255, 0.6);
    background: linear-gradient(45deg, #ff00ff, #00f5ff);
}

/* Animación del emoji */
.btn-tetris::before {
    content: '🎮 ';
    display: inline-block;
    animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
}
```

### Ejemplo de implementación completa:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Invernalia Café</title>
    <style>
        /* Aquí va el CSS de arriba */
    </style>
</head>
<body>
    <header>
        <h1>Invernalia Café</h1>
        <nav>
            <a href="/">Inicio</a>
            <a href="/menu">Menú</a>
            <!-- Tu botón del juego -->
            <a href="https://tu-juego.vercel.app"
               class="btn-tetris"
               target="_blank">
               🎮 Jugar Tetris
            </a>
        </nav>
    </header>

    <!-- Resto de tu sitio web -->
</body>
</html>
```

---

## 📱 COMPATIBILIDAD

El juego funciona en:
- ✅ Chrome, Firefox, Safari, Edge
- ✅ Computadoras (Windows, Mac, Linux)
- ✅ Tablets
- ✅ Móviles (con controles táctiles limitados)

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### Problema: El juego no se ve
**Solución**: Asegúrate de que todos los archivos estén en la misma carpeta:
```
carpeta-tetris/
  ├── index.html
  ├── styles.css
  └── game.js
```

### Problema: Los estilos no cargan
**Solución**: Verifica que en `index.html` las rutas sean correctas:
```html
<link rel="stylesheet" href="styles.css">
<script src="game.js"></script>
```

### Problema: GitHub Pages muestra 404
**Solución**:
1. Espera 5 minutos (puede tardar)
2. Verifica que el repositorio sea "Public"
3. Asegúrate de haber activado Pages en Settings

### Problema: El juego funciona local pero no online
**Solución**: Abre la consola del navegador (F12) y verifica errores de rutas

---

## 🎯 RECOMENDACIÓN FINAL

**Para principiantes**: Usa **GitHub Pages** (Método 1)
- Es gratis para siempre
- Fácil de actualizar
- URL profesional
- No requiere mantenimiento

**Para rapidez**: Usa **Netlify Drop** (Método 3)
- Despliegue en segundos
- No necesitas cuenta de Git
- Ideal para pruebas rápidas

**Para profesionales**: Usa **Vercel** (Método 2)
- Mejor rendimiento
- Analytics incluido
- Integración con Git automática

---

## 📞 SOPORTE

Si tienes problemas:
1. Verifica que todos los archivos estén presentes
2. Revisa la consola del navegador (F12)
3. Asegúrate de tener conexión a internet
4. Prueba en modo incógnito del navegador

---

## ✨ MEJORAS FUTURAS (Opcional)

Puedes añadir:
- 🎵 Música de fondo
- 📊 Tabla de clasificación online
- 👥 Modo multijugador
- 🏆 Sistema de logros
- 📱 Controles táctiles mejorados

---

<div align="center">

# ¡DISFRUTA TU JUEGO! 🎮

**No necesitas ser programador para publicarlo**
**No necesitas servidor ni máquina virtual**
**Todo es 100% GRATIS**

</div>

---

## 📝 RESUMEN ULTRA-RÁPIDO

1. **Crea cuenta** en GitHub → [github.com](https://github.com)
2. **Crea repositorio** llamado "tetris"
3. **Sube archivos**: index.html, styles.css, game.js
4. **Activa Pages** en Settings → Pages → main branch
5. **Espera 2 minutos** y visita: `https://TU-USUARIO.github.io/tetris/`

**¡ESO ES TODO!** 🎉
