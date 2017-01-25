var data = [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15];
var labels = ["Noon", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM",
                "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM",
                "Midnight", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM",
                "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM"];
var colors = ["#EFF", "#EFF", "#EFF", "#EFF", "#EFF", "#EFF",
                "#EFF", "#EFF", "#EFF", "#EFF", "#EFF", "#EFF",
                "#EFF", "#EFF", "#EFF", "#EFF", "#EFF", "#EFF",
                "#EFF", "#EFF", "#EFF", "#EFF", "#EFF", "#EFF", ];

function drawSegment(canvas, context, i) {
    context.save();
    var centerX = Math.floor(canvas.width / 2);
    var centerY = Math.floor(canvas.height / 2);
    radius = Math.floor(canvas.width / 2);
    var startingAngle = degreesToRadians(sumTo(data, i));
    var arcSize = degreesToRadians(data[i]);
    var endingAngle = startingAngle + arcSize;

    context.beginPath();
    context.moveTo(centerX, centerY);
    context.arc(centerX, centerY, radius,
                startingAngle, endingAngle, false);
    context.closePath();
    context.fillStyle = colors[i];
    context.fill();
    context.restore();
    drawSegmentLabel(canvas, context, i);
}

function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
}

function sumTo(a, i) {
    var sum = 0;
    for (var j = 0; j < i; j++) {
        sum += a[j];
    }
    return sum;
}

function drawSegmentLabel(canvas, context, i) {
    context.save();
    var x = Math.floor(canvas.width / 2);
    var y = Math.floor(canvas.height / 2);
    var angle = degreesToRadians(sumTo(data, i));
    context.translate(x, y);
    context.rotate(angle);
    var dx = Math.floor(canvas.width * 0.5) - 10;
    var dy = Math.floor(canvas.height * 0.05);
    context.textAlign = "right";
    var fontSize = Math.floor(canvas.height / 25);
    context.font = fontSize + "pt Helvetica";
    context.fillText(labels[i], dx, dy);
    context.restore();
}

canvas = document.getElementById("piechart");
var context = canvas.getContext("2d");
for (var i = 0; i < data.length; i++) {
    drawSegment(canvas, context, i);
}

function buttonPressed() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    var cycles = document.getElementsByName('cycles');
    var selectedCycle;
    for (var i = 0; i < cycles.length; i++) {
        if (cycles[i].checked == true) {
            selectedCycle = cycles[i].value;
        }
    }
    if (selectedCycle == "monophasic"){
        colors = ["#EFF", "#EFF", "#EFF", "#EFF", "#EFF", "#EFF",
                   "#EFF", "#EFF", "#EFF", "#84A", "#84A", "#84A",
                   "#84A", "#84A", "#84A", "#84A", "#84A", "#84A",
                   "#EFF", "#EFF", "#EFF", "#EFF", "#EFF", "#EFF", ];
        $('#hours').html('9');
        $('#schedule').html('Mono-Phasic (Normal)');
    }   
    else if (selectedCycle == "siesta") {
        colors = ["#EFF", "#EFF", "#EFF", "#EFF", "#EFF", "#EFF",
                   "#84A", "#39D", "#EFF", "#EFF", "#EFF", "#EFF",
                   "#EFF", "#84A", "#84A", "#84A", "#84A", "#84A",
                   "#EFF", "#EFF", "#EFF", "#EFF", "#EFF", "#EFF", ];
        $('#hours').html('6.5');
        $('#schedule').html('Bi-Phasic (Siesta)');
    }
    else if (selectedCycle == "triphasic") {
        colors = ["#EFF", "#EFF", "#EFF", "#EFF", "#84A", "#39D",
                   "#EFF", "#EFF", "#EFF", "#EFF", "#84A", "#84A",
                   "#EFF", "#EFF", "#EFF", "#EFF", "#84A", "#39D",
                   "#EFF", "#EFF", "#EFF", "#EFF", "#EFF", "#EFF", ];
        $('#hours').html('5');
        $('#schedule').html('Tri-Phasic');
    }
    else if (selectedCycle == "uberman") {
        colors = ["#2C7", "#EFF", "#EFF", "#EFF", "#2C7", "#EFF",
                "#EFF", "#EFF", "#2C7", "#EFF", "#EFF", "#EFF",
                "#2C7", "#EFF", "#EFF", "#EFF", "#2C7", "#EFF",
                "#EFF", "#EFF", "#2C7", "#EFF", "#EFF", "#EFF", ];
        $('#hours').html('2');
        $('#schedule').html('Uberman');
    }
    else if (selectedCycle == "dymaxion") {
        colors = ["#39D", "#EFF", "#EFF", "#EFF", "#EFF", "#EFF",
                "#39D", "#EFF", "#EFF", "#EFF", "#EFF", "#EFF",
                "#39D", "#EFF", "#EFF", "#EFF", "#EFF", "#EFF",
                "#39D", "#EFF", "#EFF", "#EFF", "#EFF", "#EFF", ];
        $('#hours').html('2');
        $('#schedule').html('Dymaxion');
    }
    for (var i = 0; i < data.length; i++) {
        drawSegment(canvas, context, i);
    }
}