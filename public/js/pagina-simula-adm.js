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

let startX, startY;
let endX, endY;
let isDrawing = false;


canvas.addEventListener('mousedown', function (e) {
  if (!isDrawing) {
    startX = (e.clientX - canvas.getBoundingClientRect().left) * scale;
    startY = (e.clientY - canvas.getBoundingClientRect().top) * scale;
    isDrawing = true;
  } else {
    endX = (e.clientX - canvas.getBoundingClientRect().left) * scale;
    endY = (e.clientY - canvas.getBoundingClientRect().top) * scale;
    isDrawing = false;

    // Desenha a linha
    conexoes.push({ startX, startY });
    drawLine(startX, startY, endX, endY);
  }
});

function drawLine(startX, startY, endX, endY) {
  ctx.strokeStyle = "#000000"; // Cor da linha
  ctx.lineWidth = 5; // Largura da linha
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
};

function listarComponentes() {
  let comp = [];
  let valor = [];
  

  for (let i = 0; i < 3; i++) {
    // Concatenando 'i' ao ID do elemento para acessá-lo dinamicamente
    let nomeElement = document.getElementById('nome' + i);
    let valorElement = document.getElementById('valor' + i);

    // Verificando se os elementos foram encontrados
    if (nomeElement && valorElement) {
      // Armazenando os valores de texto desses elementos em arrays
      comp.push(nomeElement.innerText.trim());
      valor.push(valorElement.innerText.trim());
    }
  }
  
  for (let index = 0; index < comp.length; index++) {
    if ((comp[index] == 'resistor' && comp[index+1] == 'Diodo') || (comp[index+1] == 'resistor' && comp[index] == 'Diodo')) {
      for (let j = 0; j < comp.length; j++) {
        if (comp[j] == 'Diodo') {
          const tensaoR = valor[j];
          console.log(tensaoR);   
        } 
      } 
    } 
  }
}

// Get a regular interval for drawing to the screen
window.requestAnimFrame = (function (callback) {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimaitonFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
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
    const x = (event.clientX - canvas.getBoundingClientRect().left) * scale;
    const y = (event.clientY - canvas.getBoundingClientRect().top) * scale;

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

modeToggle.addEventListener('click', function () {
  document.querySelector("html").classList.toggle('dark-mode')
  modeToggle.src = modeToggle.src.includes("sol") ? luaPath : solPath
  logo.src = logo.src.includes("escuro") ? logo_clara : logo_esc
});
