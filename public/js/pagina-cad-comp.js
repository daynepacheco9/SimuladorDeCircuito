let photo = document.getElementById('imgFoto');
let file = document.getElementById('flImage');


photo.addEventListener('click', () => {
    file.click();
});

file.addEventListener('change', () => {
    // Sem essa verificação, ele irá dar erro quando o usuário clicar em cancelar
    // pois enviará uma "imagem" vazia
    if (file.files.length == 0) {
        return;
    }
    // Inicializando a função que pega o caminho da imagem
    let reader = new FileReader();
    // Está pegando o caminho da imagem
    reader.readAsDataURL(file.files[0]);
    // Coloca o caminho da imagem no Source da tag IMG
    reader.onload = () => {
        photo.src = reader.result
    }
});

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
