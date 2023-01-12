var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,
    particle = [],
    particleCount = 0,
    gravity = 0.3,
    colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
        '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50',
        '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
        '#FF5722', '#795548'
    ],
    r1 = {
        x: width / 2 - 150,
        y: height / 2 - 150,
        width: 300,
        height: 300,
        velX: 0,
        velY: -10,
        alphatop: 0
    },
    frameId = undefined,
    animation = undefined,
    startTime = 0;

// 生成庆祝小块
function resetParticle() {
    particle = [];
    for (var i = 0; i < 200; i++) {
        var item = {
            x: width / 2,
            y: height / 2,
            boxW: randomOne(5, 20),
            boxH: randomOne(5, 20),
            size: randomOne(2, 8),

            spikeran: randomOne(3, 5),

            velX: randomOne(-8, 8),
            velY: randomOne(-50, -10),

            angle: randomOne(0, 360) * (Math.PI / 180),
            color: colors[randomOne(0, colors.length - 1)],
            anglespin: -0.2 + Math.random() * (0.2 - -0.2)
        }
        item.draw = function () {
            context.save();
            context.translate(this.x, this.y);
            context.rotate(this.angle);
            context.fillStyle = this.color;
            context.beginPath();
            context.fillRect(this.boxW / 2 * -1, this.boxH / 2 * -1, this.boxW, this.boxH);
            context.fill();
            context.closePath();
            context.restore();
            this.angle += this.anglespin;
            this.velY *= 0.999;
            this.velY += 0.3;

            this.x += this.velX;
            this.y += this.velY;
            if (this.y < 0) {
                this.velY *= -0.2;
                this.velX *= 0.9;
            };
            if (this.y > height) {
                this.anglespin = 0;
                this.y = height;
                this.velY *= -0.2;
                this.velX *= 0.9;
            };
            if (this.x > width || this.x < 0) {
                this.velX *= -0.5;
            };
        }
        particle.push(item);
    }
}

// 绘制屏幕
function drawScreen() {
    if (r1.alphatop === 1) {
        r1.velY *= 0.999;
        r1.velY += 0.3;

        r1.x += r1.velX;
        r1.y += r1.velY;
    }

    if (r1.y + r1.height > height) {
        r1.anglespin = 0;
        r1.y = height - r1.height;
        r1.velY *= -0.8;
        r1.velX *= 0.9;
    };

    context.globalAlpha = 1;
    for (var i = 0; i < particle.length; i++) {
        particle[i].draw();
    }
}

// 庆祝
function celebrate() {
    startTime = 0; // 重置开始时间
    resetParticle();
    if (frameId) animation = window.cancelAnimationFrame(frameId);
    animation = function (timestamp) {
        if (timestamp !== undefined && startTime === 0) {
            startTime = timestamp;
        }
        context.clearRect(0, 0, width, height); // 清屏
        drawScreen();
        if (timestamp === undefined || timestamp - startTime < 4000) {
            frameId = window.requestAnimationFrame(animation);
        } else {
            animation = window.cancelAnimationFrame(frameId);
            context.clearRect(0, 0, width, height); // 清屏
        }
    };
    animation.call();
}