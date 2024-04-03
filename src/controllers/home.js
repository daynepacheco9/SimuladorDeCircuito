const usuario = require('../model/usuario');
const componente = require('../model/componente');


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
    async pagSimuladorGet(req, res){
        res.render('../views/pagina-simulador');
    },
    async pagSimulaADMGet(req, res){
        res.render('../views/pagina-simula-adm');
    },
    async usuarioInsert(req, res)
    {
        const dados = req.body;

        await usuario.create({
            Nome: dados.nome,
            Email: dados.email,
            Telefone: dados.telefone,
            Acesso: dados.acesso,
            Senha: dados.senha
        });
        res.redirect('/pagina-login');
    },
    async componentesInsert(req, res){

        const dados = req.body;
        
        await componentes.create({
            Nome: dados.nome,
            Valor: dados.valor,
            Medida: dados.medida,
            Foto: dados.foto
        });
        // Redirecionar para a página principal
        res.redirect('/');
    },
    
}