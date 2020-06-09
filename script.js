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

// Build a matrix of bricks

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

// Move paddle

function movePaddle() {
    paddle.x += paddle.dx; 
    if(paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w;
    }
    if(paddle.x < 0) {
        paddle.x = 0;
    }
}

// Move Ball

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
    // Wall collision x
    if(ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *= -1;
    }
    // Wall collision y
    if(ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy *= -1;
    }
    // Paddle collision
    if(ball.x - ball.size > paddle.x && ball.x + ball.size < paddle.x + paddle.w && ball.y + ball.size > paddle.y) {
        ball.dy = -ball.speed;
    }
    // Brick collision
    bricks.forEach(column => {
        column.forEach(brick => {
            if(brick.visible) {
                if (
                    ball.x - ball.size > brick.x &&
                    ball.x + ball.size < brick.x + brick.w &&
                    ball.y + ball.size > brick.y &&
                    ball.y - ball.size < brick.y + brick.h
                  ) {
                    ball.dy *= -1;
                    brick.visible = false;
                    increaseScore();
                  }
            }
        })
    })
    if(ball.y + ball.size > canvas.height) {
        showAllBricks();
        score = 0;
    }
}

function increaseScore() {
    score++;
    if(score % (brickRowCount * brickRowCount) === 0) {
        showAllBricks();
    }
}

function showAllBricks() {
    bricks.forEach(column => {
        column.forEach(brick => brick.visible = true)
    })
}

// Draw everything

function draw() {
    context.clearRect(0,0,canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
}

function update() {
    movePaddle();
    moveBall();
    draw();
    requestAnimationFrame(update);
}

update();

function keyDown(event) {
   if(event.key === 'ArrowRight' || event.key === 'Right') {
       paddle.dx = paddle.speed;
   } else if(event.key === 'ArrowLeft' || event.key === 'Left') {
       paddle.dx = -paddle.speed;
   }
}

function keyUp(event) {
    if(event.key === 'ArrowRight' || event.key === 'Right' || event.key === 'ArrowLeft' || event.key === 'Left') {
        paddle.dx = 0;
    }
}

// Keyboard Events

document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);