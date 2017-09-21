(function () {
    var canvas = document.querySelector('#gameCanvas');
    var context = canvas.getContext('2d');
    var ballX = 400;
    var ballSpeedX = -10;
    var ballY = 150;
    var ballSpeedY = -5;
    var paddle1Y = 250;
    var paddle2Y = 250;
    var paddleHeight = 100;

    var player1Score = 0;
    var player2Score = 0;
    const WINNING_SCORE = 5;
    var showWinScreen = false;

    function getMousePos(evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    var framesPerSecond = 35;
    setInterval(function () {
        moveBall();
        drawGame();
    }, 1000 / framesPerSecond);


    canvas.addEventListener('click', function () {
        if (showWinScreen) {
            player1Score = 0;
            player2Score = 0;
            showWinScreen = false;
            resetBallPosition();
        }
    });
    canvas.addEventListener('mousemove', function (evt) {
        var mousePos = getMousePos(evt);
        paddle1Y = mousePos.y - paddleHeight / 2;
        // paddle2Y = mousePos.y - paddleHeight / 2;


    }, false)


    function computerMovment() {
        if (ballY - 35 > paddle2Y + paddleHeight / 2) paddle2Y += 10;
        if ((ballY + 35 < paddle2Y + paddleHeight / 2)) paddle2Y -= 10;

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
                // alert('Punkt dla przeciwnika');
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
                // alert('Punkt dla przeciwnika');
                resetBallPosition();
            }
        }

        if (ballY >= canvas.height) ballSpeedY = -ballSpeedY;
        if (ballY <= 0) ballSpeedY = -ballSpeedY;
    }

    function resetBallPosition() { //przy wyświetlaniu wyniku gra nadal gra!!
        if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
            showWinScreen = true;
        }
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = -ballSpeedX;
    }

    function drawGame() {
        if (showWinScreen) {
            colorField("black");
            context.fillStyle = "white";
            context.font = "40px Impact";
            if (player1Score === WINNING_SCORE) context.fillText("Wygrał gracz nr 1", 360, 100);
            else context.fillText("Wygrał gracz nr 2", 360, 100);
            context.font = "20px Impact";
            context.fillText("Kliknij aby zagrać ponownie", 370, 500);
            return;
        } else {
            colorField("#0e71b4");
            colorRect(canvas.width/2-1,0,3,canvas.height,"white");

            colorRect(0,canvas.height/2-1,canvas.width,1,"white");
            colorRect(0, paddle1Y, 20, paddleHeight, "white");
            colorRect(canvas.width - 20, paddle2Y, 20, paddleHeight, "white");
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