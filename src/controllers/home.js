


module.exports = {
    async pagInicialGet(req, res){
    res.render('../views/index');
    },
    async pagCadCompGet(req, res){
        res.render('../views/pagina-cad-comp');
    },
    async pagCadastroGet(req, res){
        res.render('../views/pagina-cadastro');
    },
    async pagLoginGet(req, res){
        res.render('../views/pagina-login');
    },
    async pagPrincipalGet(req, res){
        res.render('../views/pagina-principal');
    },
    async pagSenhaGet(req, res){
        res.render('../views/pagina-senha');
    },
    async pagSimuladorGet(req, res){
        res.render('../views/pagina-simulador');
    }
    
}