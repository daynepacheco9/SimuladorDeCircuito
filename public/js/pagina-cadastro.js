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