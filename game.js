// Game constants
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const COLORS = [
    '#00f5ff', // Cyan
    '#ff00ff', // Magenta
    '#00ff88', // Green
    '#ffd700', // Gold
    '#ff6600', // Orange
    '#ff0080', // Pink
    '#00ffcc'  // Turquoise
];

// Tetromino shapes
const SHAPES = [
    [[1, 1, 1, 1]], // I
    [[1, 1], [1, 1]], // O
    [[0, 1, 0], [1, 1, 1]], // T
    [[1, 0, 0], [1, 1, 1]], // L
    [[0, 0, 1], [1, 1, 1]], // J
    [[0, 1, 1], [1, 1, 0]], // S
    [[1, 1, 0], [0, 1, 1]]  // Z
];

// Game state
let canvas, ctx, nextCanvas, nextCtx;
let board = [];
let currentPiece = null;
let nextPiece = null;
let score = 0;
let lines = 0;
let level = 1;
let gameOver = false;
let paused = false;
let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;
let highScore = 0;
let particles = [];

// Particle system
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 4 - 2;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.01;
        this.size = Math.random() * 4 + 2;
        this.color = color;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.1; // gravity
        this.life -= this.decay;
        return this.life > 0;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// Initialize game
function init() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    nextCanvas = document.getElementById('nextCanvas');
    nextCtx = nextCanvas.getContext('2d');

    // Load high score
    highScore = parseInt(localStorage.getItem('tetrisHighScore') || '0');
    document.getElementById('highScore').textContent = highScore;

    // Initialize board
    board = Array(ROWS).fill(null).map(() => Array(COLS).fill(0));

    // Setup particle canvas
    const particleCanvas = document.getElementById('particleCanvas');
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;

    // Event listeners
    document.addEventListener('keydown', handleKeyPress);

    // Start game when space is pressed
    showOverlay('gameOverlay');
}

// Create new piece
function createPiece() {
    const shapeIndex = Math.floor(Math.random() * SHAPES.length);
    const shape = SHAPES[shapeIndex];
    const color = COLORS[shapeIndex];

    return {
        shape: shape,
        color: color,
        x: Math.floor(COLS / 2) - Math.ceil(shape[0].length / 2),
        y: 0
    };
}

// Draw board
function drawBoard() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = 'rgba(0, 245, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= COLS; i++) {
        ctx.beginPath();
        ctx.moveTo(i * BLOCK_SIZE, 0);
        ctx.lineTo(i * BLOCK_SIZE, canvas.height);
        ctx.stroke();
    }
    for (let i = 0; i <= ROWS; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * BLOCK_SIZE);
        ctx.lineTo(canvas.width, i * BLOCK_SIZE);
        ctx.stroke();
    }

    // Draw placed pieces
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (board[row][col]) {
                drawBlock(ctx, col, row, board[row][col]);
            }
        }
    }
}

// Draw block with glow effect
function drawBlock(context, x, y, color) {
    const px = x * BLOCK_SIZE;
    const py = y * BLOCK_SIZE;

    // Glow effect
    context.shadowBlur = 15;
    context.shadowColor = color;

    // Main block
    context.fillStyle = color;
    context.fillRect(px + 1, py + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2);

    // Highlight
    const gradient = context.createLinearGradient(px, py, px + BLOCK_SIZE, py + BLOCK_SIZE);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    context.fillStyle = gradient;
    context.fillRect(px + 1, py + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2);

    // Border
    context.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    context.lineWidth = 2;
    context.strokeRect(px + 2, py + 2, BLOCK_SIZE - 4, BLOCK_SIZE - 4);

    context.shadowBlur = 0;
}

// Draw current piece
function drawPiece() {
    if (!currentPiece) return;

    for (let row = 0; row < currentPiece.shape.length; row++) {
        for (let col = 0; col < currentPiece.shape[row].length; col++) {
            if (currentPiece.shape[row][col]) {
                drawBlock(ctx, currentPiece.x + col, currentPiece.y + row, currentPiece.color);
            }
        }
    }

    // Draw ghost piece (preview of where it will land)
    drawGhostPiece();
}

// Draw ghost piece
function drawGhostPiece() {
    if (!currentPiece) return;

    let ghostY = currentPiece.y;
    while (!collision(currentPiece.x, ghostY + 1, currentPiece.shape)) {
        ghostY++;
    }

    ctx.save();
    ctx.globalAlpha = 0.2;
    for (let row = 0; row < currentPiece.shape.length; row++) {
        for (let col = 0; col < currentPiece.shape[row].length; col++) {
            if (currentPiece.shape[row][col]) {
                drawBlock(ctx, currentPiece.x + col, ghostY + row, currentPiece.color);
            }
        }
    }
    ctx.restore();
}

// Draw next piece
function drawNext() {
    if (!nextPiece) return;

    nextCtx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    nextCtx.fillRect(0, 0, nextCanvas.width, nextCanvas.height);

    const offsetX = (nextCanvas.width - nextPiece.shape[0].length * 25) / 2;
    const offsetY = (nextCanvas.height - nextPiece.shape.length * 25) / 2;

    for (let row = 0; row < nextPiece.shape.length; row++) {
        for (let col = 0; col < nextPiece.shape[row].length; col++) {
            if (nextPiece.shape[row][col]) {
                const px = offsetX + col * 25;
                const py = offsetY + row * 25;

                nextCtx.shadowBlur = 10;
                nextCtx.shadowColor = nextPiece.color;
                nextCtx.fillStyle = nextPiece.color;
                nextCtx.fillRect(px, py, 24, 24);
                nextCtx.shadowBlur = 0;
            }
        }
    }
}

// Check collision
function collision(x, y, shape) {
    for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
            if (shape[row][col]) {
                const newX = x + col;
                const newY = y + row;

                if (newX < 0 || newX >= COLS || newY >= ROWS) {
                    return true;
                }

                if (newY >= 0 && board[newY][newX]) {
                    return true;
                }
            }
        }
    }
    return false;
}

// Merge piece to board
function merge() {
    for (let row = 0; row < currentPiece.shape.length; row++) {
        for (let col = 0; col < currentPiece.shape[row].length; col++) {
            if (currentPiece.shape[row][col]) {
                const boardY = currentPiece.y + row;
                const boardX = currentPiece.x + col;

                if (boardY >= 0) {
                    board[boardY][boardX] = currentPiece.color;

                    // Create particles
                    createParticles(
                        boardX * BLOCK_SIZE + BLOCK_SIZE / 2 + canvas.offsetLeft,
                        boardY * BLOCK_SIZE + BLOCK_SIZE / 2 + canvas.offsetTop,
                        currentPiece.color
                    );
                }
            }
        }
    }
}

// Create particle effect
function createParticles(x, y, color) {
    for (let i = 0; i < 8; i++) {
        particles.push(new Particle(x, y, color));
    }
}

// Clear lines
function clearLines() {
    let linesCleared = 0;

    for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row].every(cell => cell !== 0)) {
            // Create explosion effect
            for (let col = 0; col < COLS; col++) {
                createParticles(
                    col * BLOCK_SIZE + BLOCK_SIZE / 2 + canvas.offsetLeft,
                    row * BLOCK_SIZE + BLOCK_SIZE / 2 + canvas.offsetTop,
                    board[row][col]
                );
            }

            board.splice(row, 1);
            board.unshift(Array(COLS).fill(0));
            linesCleared++;
            row++; // Check same row again
        }
    }

    if (linesCleared > 0) {
        lines += linesCleared;

        // Score calculation
        const points = [0, 100, 300, 500, 800];
        score += points[linesCleared] * level;

        // Level up every 10 lines
        const newLevel = Math.floor(lines / 10) + 1;
        if (newLevel > level) {
            level = newLevel;
            dropInterval = Math.max(100, 1000 - (level - 1) * 80);
            updateDifficulty();
        }

        updateUI();

        // Update high score
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('tetrisHighScore', highScore);
            document.getElementById('highScore').textContent = highScore;
        }
    }
}

// Update UI
function updateUI() {
    document.getElementById('score').textContent = score;
    document.getElementById('lines').textContent = lines;
    document.getElementById('level').textContent = level;

    // Update speed bar
    const speedPercent = Math.min(100, (level - 1) * 10);
    document.getElementById('speedBar').style.width = speedPercent + '%';

    const speedTexts = ['Normal', 'Rápido', 'Muy Rápido', 'Extremo', 'Imposible'];
    const speedIndex = Math.min(4, Math.floor((level - 1) / 2));
    document.getElementById('speedText').textContent = speedTexts[speedIndex];
}

// Update difficulty indicator
function updateDifficulty() {
    const difficultyPercent = Math.min(100, (level - 1) * 10);
    document.getElementById('difficultyBar').style.width = difficultyPercent + '%';

    const difficulties = [
        'Principiante',
        'Fácil',
        'Intermedio',
        'Avanzado',
        'Experto',
        'Maestro',
        'Leyenda',
        'Imposible'
    ];
    const diffIndex = Math.min(7, Math.floor((level - 1) / 2));
    document.getElementById('difficultyText').textContent = difficulties[diffIndex];
}

// Rotate piece
function rotate() {
    const rotated = currentPiece.shape[0].map((_, i) =>
        currentPiece.shape.map(row => row[i]).reverse()
    );

    if (!collision(currentPiece.x, currentPiece.y, rotated)) {
        currentPiece.shape = rotated;
    }
}

// Move piece
function move(dir) {
    if (!collision(currentPiece.x + dir, currentPiece.y, currentPiece.shape)) {
        currentPiece.x += dir;
    }
}

// Drop piece
function drop() {
    if (!collision(currentPiece.x, currentPiece.y + 1, currentPiece.shape)) {
        currentPiece.y++;
        dropCounter = 0;
    } else {
        merge();
        clearLines();
        currentPiece = nextPiece;
        nextPiece = createPiece();

        if (collision(currentPiece.x, currentPiece.y, currentPiece.shape)) {
            endGame();
        }

        drawNext();
    }
}

// Hard drop
function hardDrop() {
    while (!collision(currentPiece.x, currentPiece.y + 1, currentPiece.shape)) {
        currentPiece.y++;
    }
    drop();
}

// Handle key press
function handleKeyPress(e) {
    if (e.key === ' ') {
        e.preventDefault();
        if (gameOver) {
            resetGame();
        } else if (document.getElementById('gameOverlay').classList.contains('hidden')) {
            if (!paused) {
                hardDrop();
            }
        } else {
            startGame();
        }
    }

    if (gameOver || paused || !currentPiece) return;

    switch (e.key) {
        case 'ArrowLeft':
            move(-1);
            break;
        case 'ArrowRight':
            move(1);
            break;
        case 'ArrowDown':
            drop();
            break;
        case 'ArrowUp':
            rotate();
            break;
        case 'p':
        case 'P':
            togglePause();
            break;
    }
}

// Toggle pause
function togglePause() {
    paused = !paused;
    if (paused) {
        showOverlay('pauseOverlay');
    } else {
        hideOverlay('pauseOverlay');
    }
}

// Show overlay
function showOverlay(id) {
    document.getElementById(id).classList.remove('hidden');
}

// Hide overlay
function hideOverlay(id) {
    document.getElementById(id).classList.add('hidden');
}

// Start game
function startGame() {
    hideOverlay('gameOverlay');
    currentPiece = createPiece();
    nextPiece = createPiece();
    drawNext();
    lastTime = performance.now();
    update();
}

// Reset game
function resetGame() {
    board = Array(ROWS).fill(null).map(() => Array(COLS).fill(0));
    score = 0;
    lines = 0;
    level = 1;
    dropInterval = 1000;
    gameOver = false;
    particles = [];

    updateUI();
    updateDifficulty();
    hideOverlay('gameOverOverlay');
    startGame();
}

// End game
function endGame() {
    gameOver = true;
    document.getElementById('finalScore').textContent = score;
    document.getElementById('finalLevel').textContent = level;
    showOverlay('gameOverOverlay');
}

// Update particles
function updateParticles() {
    const particleCanvas = document.getElementById('particleCanvas');
    const pCtx = particleCanvas.getContext('2d');

    pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

    particles = particles.filter(particle => {
        if (particle.update()) {
            particle.draw(pCtx);
            return true;
        }
        return false;
    });
}

// Game loop
function update(time = 0) {
    if (gameOver) return;

    const deltaTime = time - lastTime;
    lastTime = time;

    if (!paused) {
        dropCounter += deltaTime;

        if (dropCounter > dropInterval) {
            drop();
        }

        drawBoard();
        drawPiece();
    }

    updateParticles();

    requestAnimationFrame(update);
}

// Initialize on load
window.addEventListener('load', init);

// Handle window resize
window.addEventListener('resize', () => {
    const particleCanvas = document.getElementById('particleCanvas');
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
});
