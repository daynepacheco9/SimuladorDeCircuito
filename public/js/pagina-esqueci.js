const modeToggle = document.getElementById('change-mode');
const logo = document.getElementById('logo');
const solPath = "img/icons8-sol-50.png"
const luaPath = "img/icons8-lua-brilhante-96.png"
const logo_clara = "img/Logo-claro.svg"
const logo_esc = "img/Logo-escuro.svg"

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("form").addEventListener("submit", function(event){
      const email = form.querySelector('input[name="email"]').value;
      const senha = form.querySelector('input[name="senha"]').value;
      const csenha = form.querySelector('input[name="csenha"]').value;
    });
});


modeToggle.addEventListener('click', function() {
    document.querySelector("html").classList.toggle('dark-mode')
    modeToggle.src = modeToggle.src.includes("sol") ? luaPath : solPath
    logo.src = logo.src.includes("escuro") ? logo_clara : logo_esc
});