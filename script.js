const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const lineWidthSlider = document.getElementById('lineWidth');
const eraserButton = document.getElementById('eraser');
const clearButton = document.getElementById('clear');

let drawing = false;
let erasing = false;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

eraserButton.addEventListener('click', toggleEraser);
clearButton.addEventListener('click', clearCanvas);

function startDrawing(e) {
    drawing = true;
    draw(e);
}

function draw(e) {
    if (!drawing) return;

    ctx.lineWidth = lineWidthSlider.value;
    ctx.lineCap = 'round';

    if (erasing) {
        ctx.strokeStyle = 'white';
    } else {
        ctx.strokeStyle = colorPicker.value;
    }

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function stopDrawing() {
    drawing = false;
    ctx.beginPath();
}

function toggleEraser() {
    erasing = !erasing;
    eraserButton.textContent = erasing ? '描画モード' : '消しゴム';
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
