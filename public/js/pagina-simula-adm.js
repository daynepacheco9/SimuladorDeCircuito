// CANVAS

class Componente {
  constructor(nome, valor, medida, x, y, width, height, porta1, porta2) {
    this.nome = nome;
    this.valor = valor;
    this.medida = medida;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.porta1 = porta1;
    this.porta2 = porta2;
  }

  left = []
  right = []

  connectLeft(component)
  {
    this.left.push(component)
  }

  connectRight(component)
  {
    this.right.push(component)
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
let conexoes1 = [];
let conexoes2 = [];
let x = 0;
let y = 0;
let ident1;
let ident2;
let porta1;
let porta2;
let endX, endY;
let tensao1 = 0;
let isDrawing = false;
const widthImage = 250;
const heightImage = 250;
let imgSrc;
let comp = [];

canvas.addEventListener('dragover', function (e) {
  x = (e.clientX - canvas.getBoundingClientRect().left) * scale;
  y = (e.clientY - canvas.getBoundingClientRect().top) * scale;
})

canvas.addEventListener('mousemove', function (e) {
  x = (e.clientX - canvas.getBoundingClientRect().left) * scale;
  y = (e.clientY - canvas.getBoundingClientRect().top) * scale;
})

canvas.addEventListener('mousedown', function (e) {
  if (!isDrawing) {
    startX = (e.clientX - canvas.getBoundingClientRect().left) * scale;
    startY = (e.clientY - canvas.getBoundingClientRect().top) * scale;
    isDrawing = true;
  } else {
    endX = (e.clientX - canvas.getBoundingClientRect().left) * scale;
    endY = (e.clientY - canvas.getBoundingClientRect().top) * scale;
    isDrawing = false;

    let obj = verificarConexao(startX, startY, endX, endY)
    startX = -1
    startY = -1
    endX = -1
    endY = -1

    if (obj == null)
      return
    
    drawLine(
      obj.porta1 ? comp[obj.comp1].x : comp[obj.comp1].x + widthImage, 
      comp[obj.comp1].y + heightImage / 2,
      obj.porta2 ? comp[obj.comp2].x :  comp[obj.comp2].x + widthImage, 
      comp[obj.comp2].y + heightImage / 2);
  }
});

function inBox(x, y, rectX, rectY, rectWidth, rectHeight)
{
  return x > rectX && x < rectX + rectWidth
    && y > rectY && y < rectY + rectHeight
}

function verificarConexao(startX, startY, endX, endY) {
  let result = false;
  let connectionData = { }
  
  for (let i = 0; i < comp.length; i++)
  {
    if (!inBox(startX, startY, comp[i].x, comp[i].y, widthImage, heightImage))
      continue;

    result = true;
    connectionData['porta1'] = inBox(
      startX, startY, 
      comp[i].x, comp[i].y, 
      widthImage / 2, heightImage
    )
    connectionData['comp1'] = i
    calcularCorrente();
    break;
  }

  if (!result)
    return null
  result = false;

  for (let i = 0; i < comp.length; i++)
  {
    if (i == connectionData['comp1'])
      continue;

    if (!inBox(endX, endY, comp[i].x, comp[i].y, widthImage, heightImage))
      continue;

    result = true
    connectionData['porta2'] = inBox(
      endX, endY, 
      comp[i].x, comp[i].y, 
      widthImage / 2, heightImage
    )
    connectionData['comp2'] = i
    break;
  }

  if (!result)
    return null

  if (connectionData['porta1'])
    comp[connectionData['comp1']].connectRight(comp[connectionData['comp2']])
  else
    comp[connectionData['comp1']].connectLeft(comp[connectionData['comp2']])
  
  if (connectionData['porta2'])
    comp[connectionData['comp2']].connectRight(comp[connectionData['comp1']])
  else
    comp[connectionData['comp2']].connectLeft(comp[connectionData['comp1']])

  validarConexoes();
  
  return connectionData;
}

function drawLine(startX, startY, endX, endY) {
  ctx.strokeStyle = "#000000"; // Cor da linha
  ctx.lineWidth = 5; // Largura da linha
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
};

function validarConexoes() {
  let validar;
  for (let i = 0; i < comp.length; i++) {
    if ((comp[i].left.length == 1) && (comp[i].right.length == 1)) {
      validar = true;
    }
    else if (comp[i].left.length > 1 && comp[i].right.length > 1) {
      validar = false;
    }
  }

  if (!validar)
    return null;

  calcularCorrente();
}

function listarComponentes(index) {

  let nomeElement = document.getElementById('nome' + index);
  let valorElement = document.getElementById('valor' + index);
  let medidaElement = document.getElementById('medida' + index);
  
  // Verificando se os elementos foram encontrados
  if (nomeElement && valorElement) {
    // Armazenando os valores de texto desses elementos em arrays
    let nome = nomeElement.innerText.trim();
    let valor = valorElement.innerText.trim();
    let medida = medidaElement.innerText.trim();

    let componente = new Componente(
      nome, valor, medida, 
      x, y, widthImage, heightImage
    );
    
    comp.push(componente);
    const img = new Image();
    img.onload = function () {
      ctx.drawImage(img, 
        x, 
        y,
        widthImage, heightImage
      );
   };
   img.src = imgSrc;
  }

}

function calcularCorrente() {
  let tensao = 0;
  let corrente = 0; 
  let resistor = 0;
  for (let i = 0; i < comp.length; i++) {
    if (comp[i].nome == "fonte") {
      tensao += parseFloat(comp[i].valor);
      console.log(tensao);
    }
    if (comp[i].nome == "resistor") {
      resistor += parseFloat(comp[i].valor);
    }
  }
  corrente = tensao/resistor;
  calcularTensao(corrente);
}

function calcularTensao(corrente) {
  for (let i = 0; i < comp.length; i++) {
    if (comp[i].nome == "resistor") {
      tensao1 = corrente * parseFloat(comp[i].valor);
      ctx.font = "60px serif";
      ctx.fillText("Componente: " + comp[i].nome, 3300, 1900);
      ctx.fillText("Tensão: " + tensao1 + "V", 3300, 2000);
      ctx.fillText("Corrente: " + corrente + "A", 3300, 2100);
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


  // Manipulador de eventos para iniciar o arrasto
  document.querySelectorAll('.card-img-top').forEach(item => {
    item.addEventListener('dragstart', event => {
      imgSrc = event.target.dataset.src;
    });
  });

  // Manipulador de eventos para soltar o item no canvas
  canvas.addEventListener('drop', event => {
    event.preventDefault();
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
