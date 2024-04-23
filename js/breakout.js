show = document.getElementById('rules-btn');
close = document.getElementById('close-btn');
rules = document.getElementById('rules');
canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

score = 0;
BrickRowCount = 9;
BrickColumnCount = 5;

ball = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4
};

paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0
};

BrickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
};

bricks = [];
for (let i = 0; i < BrickRowCount; i++) {
    bricks[i] = [];
    for (let j = 0; j < BrickColumnCount; j++) {
        const x = i * (BrickInfo.w + BrickInfo.padding) + BrickInfo.offsetX;
        const y = j * (BrickInfo.h + BrickInfo.padding) + BrickInfo.offsetY;
        bricks[i][j] = {
            x,
            y,
            ...BrickInfo
        };
    }
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2, true);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

function drawBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            if (brick.visible) {
                ctx.beginPath();
                ctx.rect(brick.x, brick.y, brick.w, brick.h);
                ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
                ctx.fill();
                ctx.closePath();
            }
        });
    });
}

function movePaddle() {
    paddle.x += paddle.dx;

    if (paddle.x < 0) {
        paddle.x = 0;
    }

    if (paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w;
    }
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *= -1;
    }

    if (ball.y - ball.size < 0) {
        ball.dy *= -1;
    }

    if (ball.y + ball.size > canvas.height) {
        if (!gameover) {
            ball.dy *= -1;
        }
    }

    if (
        ball.x - ball.size > paddle.x &&
        ball.x + ball.size < paddle.x + paddle.w &&
        ball.y + ball.size > paddle.y
    ) {
        ball.dy = -ball.speed;
    }

    bricks.forEach(column => {
        column.forEach(brick => {
            if (brick.visible) {
                if (
                    ball.x - ball.size > brick.x &&
                    ball.x + ball.size < brick.x + brick.w &&
                    ball.y - ball.size < brick.y + brick.h &&
                    ball.y + ball.size > brick.y
                ) {
                    ball.dy *= -1;
                    brick.visible = false;
                    increaseScore();
                }
            }
        });
    });
}

function increaseScore() {
    score++;
    if (score == BrickRowCount * BrickColumnCount) {
        score = 0;
        showAllBricks();
    }
}

function showAllBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            brick.visible = true;
        });
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBall();
    drawScore();
    drawBricks();
}

let gamePaused = true;
let darkMode = false;
let gameover = false;

const startButton = document.getElementById('start-btn');
const restartButton = document.getElementById('restart-btn');

const darkModeButton = document.getElementById('dark-mode-btn');

function toggleDarkMode() {
    darkMode = !darkMode;
    document.body.style.backgroundColor = darkMode ? '#222' : '#0095DD';
    canvas.style.background = darkMode ? '#333' : '#f0f0f0';
    ctx.fillStyle = darkMode ? '#fff' : '#0095DD';
    draw();
}

darkModeButton.addEventListener('click', toggleDarkMode);

startButton.addEventListener('click', () => {
    if (gamePaused) {
        gamePaused = false;
        startButton.style.display = 'none';
        requestAnimationFrame(update);
    }
});

restartButton.style.display = 'none';

document.body.appendChild(restartButton);

function checkGameOver() {
    if (ball.y + ball.size > canvas.height) {
        gameover = true;
        restartButton.style.display = 'block'; // Display restart button
        startButton.style.display = 'none'; // Hide start button
        gamePaused = true; // Pause the game
        prevScore = score; // Store the score just before the ball hits the bottom
        drawScore(); // Redraw the score
    }
}

// Function to restart the game
function restartGame() {
    score = 0;
    gameover = false;
    gamePaused = false; // Unpause the game
    startButton.style.display = 'none'; // Hide start button
    restartButton.style.display = 'none'; // Hide restart button
    paddle.x = canvas.width / 2 - 40; // Reset paddle position
    ball.x = canvas.width / 2; // Reset ball position
    ball.y = canvas.height - 30;
    bricks.forEach(column => {
        column.forEach(brick => {
            brick.visible = true; // Reset brick visibility
        });
    });
}

// Event listener for restart button
restartButton.addEventListener('click', () => {
    restartGame();
    gamePaused = false; // Unpause the game
    restartButton.style.display = 'none'; // Hide restart button
    requestAnimationFrame(update);
});

function update() {
    if (!gamePaused && !gameover) {
        moveBall();
        movePaddle();
        draw();
        checkGameOver();
        requestAnimationFrame(update);
    }

    if (gameover && gamePaused) {
        restartButton.style.display = 'block';
    }
}

update();

function keyDown(e) {
    if (e.key == 'ArrowRight' || e.key == 'Right' || e.key == 'd') {
        paddle.dx = paddle.speed;
    }

    if (e.key == 'ArrowLeft' || e.key == 'Left' || e.key == 'a') {
        paddle.dx = -paddle.speed;
    }
}

function keyUp(e) {
    if (e.key == 'ArrowRight' || e.key == 'Right' || e.key == 'd' || e.key == 'ArrowLeft' || e.key == 'Left' || e.key == 'a') {
        paddle.dx = 0;
    }
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

show.addEventListener('click', () => {
    rules.classList.toggle('show');
});

close.addEventListener('click', () => {
    rules.classList.toggle('show');
});