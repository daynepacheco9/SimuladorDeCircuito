// CANVAS

class Componente {
  constructor(nome, valor, medida, x, y, width, height) {
      this.nome = nome;
      this.valor = valor;
      this.medida = medida;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
  }
}

let displayWidth = 1280;
let displayHeight = 720;
const canvas = document.getElementById("canvas");
const scale = 3;
let qtdComp = 0;
canvas.style.width = displayWidth + 'px';
canvas.style.height = displayHeight + 'px';
canvas.width = displayWidth * scale;
canvas.height = displayHeight * scale;
const ctx = canvas.getContext("2d");

let startX, startY;
let x = [];
let y = [];
let endX, endY;
let isDrawing = false;
const widthImage = 250;
const heightImage = 250;
let imgSrc;


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

  for (let i = 0; i < qtdComp; i++) {
    // Concatenando 'i' ao ID do elemento para acessá-lo dinamicamente
    let nomeElement = document.getElementById('nome' + i);
    let valorElement = document.getElementById('valor' + i);
    let medidaElement = document.getElementById('medida' + i);

    // Verificando se os elementos foram encontrados
    if (nomeElement && valorElement) {
      // Armazenando os valores de texto desses elementos em arrays
      let nome = nomeElement.innerText.trim();
      let valor = valorElement.innerText.trim();
      let medida = medidaElement.innerText.trim();


      let componente = new Componente(nome, valor, medida, x[i], y[i], widthImage, heightImage);
      comp.push(componente);
    }
  }

  // for (let index = 0; index < comp.length; index++) {
  //   if ((comp[index] == 'resistor' && comp[index+1] == 'Diodo') || (comp[index+1] == 'resistor' && comp[index] == 'Diodo')) {
  //     for (let j = 0; j < comp.length; j++) {
  //       if (comp[j] == 'Diodo') {
  //         const tensaoR = valor[j];
  //         console.log(tensaoR);   
  //       } 
  //     } 
  //   } 
  // }
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


  // Manipulador de eventos para iniciar o arrasto
  document.querySelectorAll('.card-img-top').forEach(item => {
    item.addEventListener('dragstart', event => {
      imgSrc = event.target.dataset.src;
    });
  });

  // Manipulador de eventos para soltar o item no canvas
  canvas.addEventListener('drop', event => {
    event.preventDefault();
    const xCoord = (event.clientX - canvas.getBoundingClientRect().left) * scale;
    const yCoord = (event.clientY - canvas.getBoundingClientRect().top) * scale;
    x.push(xCoord);
    y.push(yCoord);

    const img = new Image();
    img.onload = function () {
      ctx.drawImage(img, xCoord, yCoord, widthImage, heightImage); // Defina o tamanho desejado da imagem
    };

    console.log(x[qtdComp], y[qtdComp]);
    img.src = imgSrc;
    qtdComp++;
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
