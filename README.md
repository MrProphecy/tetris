# 🎮 Tetris Elite - Juego Online

Un juego de Tetris moderno y visualmente impresionante con efectos especiales, sistema de puntuación progresivo y niveles de dificultad.

![Tetris Elite](https://img.shields.io/badge/Game-Tetris%20Elite-00f5ff?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Online-00ff88?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-ffd700?style=for-the-badge)

## ✨ Características

- 🎯 **Sistema de Puntuación Progresivo**: Gana más puntos a medida que subes de nivel
- 📈 **Niveles de Dificultad**: La velocidad aumenta progresivamente cada 10 líneas
- 🎨 **Efectos Visuales Impresionantes**:
  - Efectos de partículas al colocar piezas
  - Gradientes animados
  - Sombras y brillos neón
  - Fondo estrellado animado
- 👻 **Pieza Fantasma**: Visualiza dónde caerá tu pieza
- 💾 **Récord Guardado**: Tu mejor puntuación se guarda localmente
- 📱 **Diseño Responsivo**: Juega en cualquier dispositivo
- ⚡ **Rendimiento Optimizado**: Canvas HTML5 para gráficos fluidos

## 🎮 Controles

| Tecla | Acción |
|-------|--------|
| **←→** | Mover pieza |
| **↑** | Rotar pieza |
| **↓** | Bajar más rápido |
| **ESPACIO** | Caída instantánea |
| **P** | Pausa |

## 📊 Sistema de Puntos

- **1 línea**: 100 puntos × nivel
- **2 líneas**: 300 puntos × nivel
- **3 líneas**: 500 puntos × nivel
- **4 líneas (Tetris)**: 800 puntos × nivel

## 🚀 Despliegue

### Opción 1: Vercel (Recomendado)

1. **Instalación de Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Desplegar**:
   ```bash
   vercel
   ```

3. **Seguir las instrucciones** y tu juego estará online en segundos

### Opción 2: GitHub Pages

1. **Subir el código a GitHub**:
   ```bash
   git add .
   git commit -m "Tetris Elite game"
   git push origin main
   ```

2. **Configurar GitHub Pages**:
   - Ve a Settings → Pages
   - Selecciona la rama `main`
   - Guarda y espera unos minutos

3. **Tu juego estará en**: `https://tu-usuario.github.io/tetris/`

### Opción 3: Netlify

1. **Arrastra y suelta** la carpeta del proyecto en [Netlify Drop](https://app.netlify.com/drop)
2. ¡Listo! Tu juego estará online instantáneamente

### Opción 4: Servidor Local

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx http-server
```

Luego abre `http://localhost:8000` en tu navegador.

## 🔗 Integración con Invernalia Café

Para añadir un botón en tu sitio web de Invernalia Café que enlace al juego:

```html
<a href="https://tu-dominio-del-juego.vercel.app"
   class="game-button"
   target="_blank">
   🎮 Jugar Tetris Elite
</a>
```

Con estilos CSS sugeridos:

```css
.game-button {
    display: inline-block;
    padding: 15px 30px;
    background: linear-gradient(45deg, #00f5ff, #ff00ff);
    color: white;
    text-decoration: none;
    border-radius: 50px;
    font-weight: bold;
    transition: transform 0.3s ease;
    box-shadow: 0 5px 25px rgba(0, 245, 255, 0.4);
}

.game-button:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 35px rgba(0, 245, 255, 0.6);
}
```

## 🛠️ Tecnologías Utilizadas

- **HTML5 Canvas** - Renderizado de gráficos
- **CSS3** - Animaciones y efectos visuales
- **JavaScript Vanilla** - Lógica del juego
- **LocalStorage** - Guardar récords

## 📁 Estructura del Proyecto

```
tetris/
├── index.html      # Estructura principal del juego
├── styles.css      # Estilos y animaciones
├── game.js         # Lógica del juego
├── vercel.json     # Configuración para Vercel
└── README.md       # Este archivo
```

## 🎯 Características Técnicas

- **Sistema de Partículas**: Efectos visuales al colocar piezas y limpiar líneas
- **Detección de Colisiones**: Algoritmo optimizado para fluidez
- **Rotación de Piezas**: Sistema SRS (Super Rotation System)
- **Niveles Dinámicos**: Velocidad que aumenta progresivamente
- **Guardado Automático**: Récord guardado en LocalStorage

## 🌟 Niveles de Dificultad

| Nivel | Líneas Requeridas | Velocidad | Dificultad |
|-------|------------------|-----------|------------|
| 1-2 | 0-19 | Normal | Principiante |
| 3-4 | 20-39 | Rápido | Fácil |
| 5-6 | 40-59 | Muy Rápido | Intermedio |
| 7-8 | 60-79 | Extremo | Avanzado |
| 9+ | 80+ | Imposible | Experto+ |

## 💡 Consejos para Jugar

1. **Usa la pieza fantasma** para planificar tus movimientos
2. **Limpia líneas múltiples** para más puntos
3. **Mantén el tablero bajo** para tener más tiempo de reacción
4. **Practica las rotaciones** para dominar las piezas difíciles

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si quieres mejorar el juego:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/mejora`)
3. Commit tus cambios (`git commit -m 'Añadir mejora'`)
4. Push a la rama (`git push origin feature/mejora`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Siéntete libre de usarlo y modificarlo.

## 🎊 Créditos

Desarrollado con ❤️ por Claude para **Invernalia Café**

---

<div align="center">

**[🎮 Jugar Ahora](.)** | **[☕ Visitar Invernalia Café](https://www.invernaliacafe.com/)**

¡Disfruta del juego y rompe todos los récords! 🏆

</div>
