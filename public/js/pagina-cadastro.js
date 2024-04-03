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





document.addEventListener("DOMContentLoaded", function(){

    const senha = form.querySelector('input[name="senha"]').value;
    const confirmacaoSenha = form.querySelector('input[name="csenha"]').value;
    let botaosubmit = document.getElementById("botaosubmit");

    function validarSenha(){
        if (senha.value !== confirmacaoSenha.value) {
            botaosubmit.disabled = true;      
            alert("As senhas não coincidem");

        }
        else{
            botaosubmit.disabled = false;
        }
    }

    senha.onchange = validarSenha;
    confirmacaoSenha.onchange = validarSenha;

    document.getElementById("form").addEventListener("submit", function(event){
        event.preventDefault();

    });
});