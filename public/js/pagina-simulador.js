// // Obtém o elemento canvas e seu contexto 2D
// var canvas = document.getElementById('canvas');
// var context = canvas.getContext('2d');

// // Obtém a div contendo o canvas
// var canvasContainer = document.getElementById('circuito');

// // Define variáveis para acompanhar a posição do mouse
// var painting = false;
// var lastX = 0;
// var lastY = 0;

// // Função para começar o desenho
// function startPosition(e) {
//     painting = true;
//     draw(e);
// }

// // Função para parar o desenho
// function endPosition() {
//     painting = false;
//     context.beginPath();
// }

// // Função para desenhar na tela
// function draw(e) {
//     if (!painting) return;
    
//     // Configurações de estilo para o desenho
//     context.lineWidth = 5;
//     context.lineCap = 'round';
//     context.strokeStyle = 'black';

//     // Ajusta as coordenadas do mouse para refletir a posição relativa do canvas
//     var rect = canvas.getBoundingClientRect();
//     console.log(rect.left)
//     console.log(e.clientX)
//     var mouseX = e.clientX - rect.left;
//     var mouseY = e.clientY - rect.top;

//     // Desenha uma linha do ponto anterior ao ponto atual
//     context.beginPath();
//     context.moveTo(lastX, lastY); // Define o ponto inicial
//     context.lineTo(mouseX, mouseY); // Define o ponto final
//     context.stroke(); // Desenha a linha
    
//     // Atualiza as coordenadas do último ponto
//     lastX = mouseX;
//     lastY = mouseY;
// }

// // Adiciona eventos de mouse para interação do usuário
// canvas.addEventListener('mousedown', startPosition);
// canvas.addEventListener('mouseup', endPosition);
// canvas.addEventListener('mousemove', draw);


var displayWidth = 1280;
var displayHeight = 720;
var canvas = document.getElementById("canvas");
var scale = 2;
canvas.style.width = displayWidth + 'px';
canvas.style.height = displayHeight + 'px';
canvas.width = displayWidth * scale;
canvas.height = displayHeight * scale;
var ctx = canvas.getContext("2d");

var drawing = false;
var mousePos = { x:0, y:0 };
var lastPos = mousePos;
canvas.addEventListener("mousemove", function (e) {
  mousePos = getMousePos(canvas, e);
    drawing = true;
}, false);

// Get the position of the mouse relative to the canvas
function getMousePos(canvasDom, mouseEvent) {
  var rect = canvasDom.getBoundingClientRect();
  return {
    x: (mouseEvent.clientX - rect.left) * scale,
    y: (mouseEvent.clientY - rect.top) * scale
  };
}

// Get a regular interval for drawing to the screen
window.requestAnimFrame = (function (callback) {
        return window.requestAnimationFrame || 
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           window.oRequestAnimationFrame ||
           window.msRequestAnimaitonFrame ||
           function (callback) {
        window.setTimeout(callback, 1000/60);
           };
})();

// Draw to the canvas
function renderCanvas() {
  if (drawing) {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(mousePos.x, mousePos.y, 25, 25);

    ctx.strokeStyle = "#000000";
    ctx.lineWidth   = 1;
    ctx.strokeRect(mousePos.x, mousePos.y, 25, 25);
    lastPos = mousePos;
  }
}

// Allow for animation
(function drawLoop () {
  requestAnimFrame(drawLoop);
  renderCanvas();
})();