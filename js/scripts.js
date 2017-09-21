(function () {
    var canvas = document.querySelector('#gameCanvas');
    var context = canvas.getContext('2d');
    var ballX = 400;
    var ballSpeedX = -7;
    var ballY = 150;
    var ballSpeedY = -3;
    var paddle1Y = 250;
    var paddle2Y = 250;
    var paddleHeight = 100;

    var player1Score = 0;
    var player2Score = 0;
    const WINNING_SCORE = 3;
    var showWinScreen = false;


    function getMousePos(evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }


    var framesPerSecond = 30;
    setInterval(function () {
        moveBall();
        drawGame();
    }, 1000 / framesPerSecond);

    canvas.addEventListener('mousemove', function (evt) {
        var mousePos = getMousePos(evt);
        paddle1Y = mousePos.y - paddleHeight / 2;
        // paddle2Y = mousePos.y - paddleHeight / 2;


    }, false)


    function computerMovment() {
        if (ballY - 35 > paddle2Y + paddleHeight / 2) paddle2Y += 5;
        else paddle2Y -= 5;

    }

    function moveBall() {
        computerMovment();
        ballX += ballSpeedX;
        ballY += ballSpeedY;
        if (ballX <= 5) {
            if (ballY >= paddle1Y && ballY <= paddle1Y + paddleHeight) {
                ballSpeedX = -ballSpeedX;
                var deltaY = ballY - (paddle1Y + paddleHeight / 2);
                ballSpeedY = deltaY * 0.35;
            }
            else {
                player2Score += 1;
                resetBallPosition();
            }
        }

        if (ballX >= canvas.width - 5) {
            if (ballY >= paddle2Y && ballY <= paddle2Y + paddleHeight) {
                ballSpeedX = -ballSpeedX;
                var deltaY = ballY - (paddle2Y + paddleHeight / 2);
                ballSpeedY = deltaY * 0.35;
            }
            else {
                player1Score += 1;
                resetBallPosition();
            }
        }

        if (ballY >= canvas.height) ballSpeedY = -ballSpeedY;
        if (ballY <= 0) ballSpeedY = -ballSpeedY;
    }

    function resetBallPosition() {
        if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
            player1Score=0;
            player2Score=0;
            showWinScreen = true;
        }

        ballSpeedX = -ballSpeedX;
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
    }


    function drawGame() {
        if (showWinScreen) {
            colorField("red");
            context.fillStyle="white";
            context.font = "40px Impact";
            context.fillText("Koniec Gry", 300, 50);
            context.font = "30px Impact";
            // context.fillText("You: " + player1Score, 100, 150);
            // context.fillText("Component: " + player2Score, canvas.width - 250, 150);
            return;
           
        } else {
            colorField("black");
            colorRect(0, paddle1Y, 20, paddleHeight, "red");
            colorRect(canvas.width - 20, paddle2Y, 20, paddleHeight, "green");
            drawBall(ballX, ballY, 10, "white");

            context.font = "28px Impact";
            context.fillText("You: " + player1Score, 100, 40);
            context.fillText("Component: " + player2Score, canvas.width - 250, 40);
        }




    }

    function colorField(color) {
        context.fillStyle = color;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    function colorRect(leftX, topY, width, height, color) {
        context.fillStyle = color;
        context.fillRect(leftX, topY, width, height);

    }

    function drawBall(leftX, topY, radius, color) {
        context.fillStyle = color;
        context.beginPath();
        context.arc(leftX, topY, radius, 0, Math.PI * 2, true);
        context.fill();
    }


})()