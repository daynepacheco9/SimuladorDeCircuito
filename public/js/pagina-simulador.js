// CANVAS

let displayWidth = 1280;
let displayHeight = 720;
let canvas = document.getElementById("canvas");
let scale = 3;
canvas.style.width = displayWidth + 'px';
canvas.style.height = displayHeight + 'px';
canvas.width = displayWidth * scale;
canvas.height = displayHeight * scale;
let ctx = canvas.getContext("2d");

let drawing = false;
let mousePos = { x:0, y:0 };
let lastPos = mousePos;
canvas.addEventListener("mousemove", function (e) {
  mousePos = getMousePos(canvas, e);
  drawing = true;
}, false);

canvas.addEventListener("mouseup", function (e) {
  drawing = false;
}, false);

// Get the position of the mouse relative to the canvas
function getMousePos(canvasDom, mouseEvent) {
  let rect = canvasDom.getBoundingClientRect();
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
    ctx.strokeStyle = "#000000"; // Cor da linha
    ctx.lineWidth   = 5; // Largura da linha
    ctx.lineCap = "round"; // Estilo das extremidades da linha
    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y); // Move para a última posição do mouse
    ctx.lineTo(mousePos.x, mousePos.y); // Desenha uma linha até a posição atual do mouse
    ctx.stroke(); // Aplica o desenho
    
    lastPos = mousePos; // Atualiza a última posição do mouse
  }
}

// Allow for animation
(function drawLoop () {
  requestAnimFrame(drawLoop);
  renderCanvas();
  
})();  

// DRAG AND DROP
document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  // Manipulador de eventos para iniciar o arrasto
  document.querySelectorAll('.card-img-top').forEach(item => {
      item.addEventListener('dragstart', event => {
          event.dataTransfer.setData('text/plain', event.target.dataset.src);
      });
  });

  // Manipulador de eventos para soltar o item no canvas
  canvas.addEventListener('drop', event => {
      event.preventDefault();
      const x = event.clientX - canvas.offsetLeft;
      const y = event.clientY - canvas.offsetTop;

      const imgSrc = event.dataTransfer.getData('text/plain');
      const img = new Image();
      img.onload = function () {
          ctx.drawImage(img, x, y, 250, 250); // Defina o tamanho desejado da imagem
      };
      img.src = imgSrc;
  });

  canvas.addEventListener('dragover', event => {
      event.preventDefault();
  });
});








// DARK MODE
const modeToggle = document.getElementById('change-mode');
const logo = document.getElementById('logo');
const solPath = "img/icons8-sol-50.png"
const luaPath = "img/icons8-lua-brilhante-96.png"
const logo_clara = "img/Logo-claro.svg"
const logo_esc = "img/Logo-escuro.svg"

modeToggle.addEventListener('click', function() {
    document.querySelector("html").classList.toggle('dark-mode')
    modeToggle.src = modeToggle.src.includes("sol") ? luaPath : solPath
    logo.src = logo.src.includes("escuro") ? logo_clara : logo_esc
});
