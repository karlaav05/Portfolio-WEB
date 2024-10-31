
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90;

function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#000';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 5;
    ctx.stroke();

    // Draw clock ticks
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 4;
    for (var i = 0; i < 60; i++) {
        var angle = i * Math.PI / 30; // 30 degrees
        var x1 = radius * 0.88 * Math.cos(angle);
        var y1 = radius * 0.88 * Math.sin(angle);
        var x2 = radius * 0.95 * Math.cos(angle);
        var y2 = radius * 0.95 * Math.sin(angle);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
}

function drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.fillStyle = '#fff';
    ctx.font = radius * 0.15 + "px Arial";
    for (num = 1; num < 13; num++) {
        ang = num * Math.PI / 6; // 30 degrees
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}

function drawTime(ctx, radius) {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();

    // Hour hand
     hour = hour % 12; // Adjust for 12-hour format
    var hourAngle = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)); // Hour angle
    drawHand(ctx, hourAngle, radius * 0.5, 8); // Draw hour hand

    // Minute hand
    var minuteAngle = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60)); // Minute angle
    drawHand(ctx, minuteAngle, radius * 0.8, 6); // Draw minute hand

    // Second hand
    var secondAngle = second * Math.PI / 30; // Second angle
    drawHand(ctx, secondAngle, radius * 0.9, 2, '#ff0000'); // Draw second hand in red
}

function drawHand(ctx, angle, length, width, color = '#fff') {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.moveTo(0, 0);
    ctx.lineTo(length * Math.cos(angle), length * Math.sin(angle));
    ctx.stroke();
}

setInterval(drawClock, 1000);
