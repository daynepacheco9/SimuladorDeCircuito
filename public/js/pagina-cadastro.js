document.addEventListener("DOMContentLoaded", function(){

    let senha1 = document.getElementById("senha");
    let senha2 = document.getElementById("csenha");

    let botaosubmit = document.getElementById("botaosubmit");

    function validarSenha(){
        if (senha1.value !== senha2.value) {
            alert("Senha incompatível");
            botaosubmit.disabled = true;          
        }
        else{
            botaosubmit.disabled = false;
        }
    }

    senha1.onchange = validarSenha;
    senha2.onchange = validarSenha;

    document.getElementById("form").addEventListener("submit", function(event){
        event.preventDefault();

        alert("Formulário enviado!");
    });
});