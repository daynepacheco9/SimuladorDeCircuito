// Obtém o elemento canvas e seu contexto 2D
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

// Obtém a div contendo o canvas
var canvasContainer = document.getElementById('circuito');

// Define variáveis para acompanhar a posição do mouse
var painting = false;
var lastX = 0;
var lastY = 0;

// Função para começar o desenho
function startPosition(e) {
    painting = true;
    draw(e);
}

// Função para parar o desenho
function endPosition() {
    painting = false;
    context.beginPath();
}

// Função para desenhar na tela
function draw(e) {
    if (!painting) return;
    
    // Configurações de estilo para o desenho
    context.lineWidth = 5;
    context.lineCap = 'round';
    context.strokeStyle = 'black';

    // Ajusta as coordenadas do mouse para refletir a posição relativa do canvas
    var rect = canvas.getBoundingClientRect();
    var mouseX = e.clientX - rect.left;
    var mouseY = e.clientY - rect.top;

    // Desenha uma linha do ponto anterior ao ponto atual
    context.beginPath();
    context.moveTo(lastX, lastY); // Define o ponto inicial
    context.lineTo(mouseX, mouseY); // Define o ponto final
    context.stroke(); // Desenha a linha
    
    // Atualiza as coordenadas do último ponto
    lastX = mouseX;
    lastY = mouseY;
}

// Adiciona eventos de mouse para interação do usuário
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);
