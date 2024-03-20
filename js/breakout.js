show = document.getElementById('rules-btn');
close = document.getElementById('close-btn');
rules = document.getElementById('rules');
canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

ball = {
    x: canvas.width /2,
    y: canvas.height /2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4,
}


paddle = {
    x: canvas.width /2 - 40,
    y: canvas.height -20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0,
}

function drawBall() {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2, true)
    ctx.fillStyle = '#0095DD'
    ctx.fill()
    ctx.closePath()
    ctx.stroke()
}

drawBall()

show.addEventListener('click', () => {
    rules.classList.toggle('show')
})

close.addEventListener('click', () => {
    rules.classList.toggle('show')
})