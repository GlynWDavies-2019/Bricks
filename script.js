// Show Rules Button

const rulesButton = document.getElementById('rules-btn');
const closeButton = document.getElementById('close-btn');
const rulesPanel = document.getElementById('rules');

rulesButton.addEventListener('click',() => rulesPanel.classList.add('show'));
closeButton.addEventListener('click',() => rulesPanel.classList.remove('show'));

// Canvas

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Ball

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4
};

// Draw ball on canvas

function drawBall() {
    context.beginPath();
    context.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2, true);
    context.fillStyle = '#0095DD';
    context.fill();
    context.closePath();
}

// Paddle

const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0
};

// Draw paddle on canvas

function drawPaddle() {
    context.beginPath();
    context.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    context.fillStyle = '#0095DD';
    context.fill();
    context.closePath();
}

// Draw score on canvas

let score = 0;

function drawScore() {
    context.font = '20px Arial';
    context.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

// Bricks

const brickRowCount = 9;
const brickColumnCount = 5;

const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
};

const bricks = [];
for(let i = 0 ; i < brickRowCount; i++) {
    bricks[i] = [];
    for(let j = 0 ; j < brickColumnCount ; j++) {
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
        bricks[i][j] = {x,y, ...brickInfo}
    }
}

// Draw bricks on canvas

function drawBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            context.beginPath();
            context.rect(brick.x, brick.y, brick.w, brick.h);
            context.fillStyle = brick.visible ? '#0095DD' : 'transparent';
            context.fill();
            context.closePath();
        });
    });
}

// Draw everything

function draw() {
    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
}

draw();