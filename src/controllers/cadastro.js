const usuario = require('../model/usuario');
const componente = require('../model/componente');

module.exports = {
    async usuario(req, res){
        res.render('../views/pagina-cadastro');
    },
    async usuarioInsert(req, res){
        // Recebe as informações do front-end
        const dados = req.body;
        // Criando sala no banco de dados
        await usuario.create({
            Nome: dados.nome,
            Email: dados.email,
            Telefone: dados.telefone,
            Acesso: dados.acesso,
            Senha: dados.senha
        });
        // Redirecionar para a página principal
        res.redirect('/');
    },

    async componenteInsert(req, res){
        // Recebendo as informações pelo Body
        const dados = req.body;
        // Nome padrão da foto
        let foto = 'usuario.png';


        if (req.file) {
            // Pegar novo nome da foto
            foto = req.file.filename;
        }
        // Criando aluno no banco de dados
        await componente.create({
            Nome: dados.nome,
            Valor: dados.valor,
            Medida: dados.medida,
            Foto: foto
        });
        // Redirecionar para a página principal
        res.redirect('/');
    }
}