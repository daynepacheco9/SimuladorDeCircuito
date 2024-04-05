const usuario = require('../model/usuario');
const componente = require('../model/componente');

module.exports = {
   
    async usuario(req, res){
        res.render('../views/pagina-cadastro');
    },
    async pagExcluirUser(req, res){
        res.render('../views/pagina-excluir-user')
    },
    async usuarioInsert(req, res){
        const dados = req.body;
        const senha = dados.senha;
        const csenha = dados.csenha;
        if (senha == csenha) {
            await usuario.create({
                Nome: dados.nome,
                Email: dados.email,
                Telefone: dados.telefone,
                Acesso: dados.acesso,
                Senha: dados.senha
            });    
            res.redirect('/pagina-login');
        }   
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
        res.redirect('/pagina-simula-adm');
    },
    async usuarioUpdate(req, res)
    {
        const dados = req.body;
        const email = dados.email;

        try{
            const user = await usuario.findOne({where: { Email: email}});

            if (!user) {
                return "Usuário não encontrado";
            }

            user.Senha = dados.senha;

            await user.save();

            res.redirect('/pagina-login');
        }
        catch(error){
            console.error("Erro ao atualizar a senha!", error);
        }
    },

    async usuarioDelete(req, res)
    {
        const dados= req.body;
        const email = dados.email;   
        console.log(dados);
        try {
            // Encontrar o usuário pelo e-mail
            const user = await usuario.findOne({ where: { Email: email } });
            if (!user) {
                return res.status(404).send("Usuário não encontrado");
            }
            // Excluir o usuário
            await user.destroy();

            res.redirect('/pagina-principal');
        } catch (error) {
            console.error("Erro ao excluir o usuário:", error);
            res.status(500).send("Erro ao excluir o usuário");
        }        
    },

    async componente(req, res){
        // Encontrando todas as salas disponíveis no SQL
        try {
            // Encontrando todos os componentes disponíveis no banco de dados
            const componentes = await componente.findAll({
                raw: true, // Retorna somente os valores de uma tabela, sem os metadados.
                attributes: ['IDComp', 'Nome', 'Valor', 'Medida', 'Foto']
            });
            
            // Renderizando a página com os componentes
            res.render('../views/pagina-simulador', { componentes });
        } catch (error) {
            console.error("Erro ao buscar componentes:", error);
            // Tratar o erro adequadamente
            res.status(500).send('Erro ao buscar componentes.');
        }
    },

    async componente_adm(req, res){
        // Encontrando todas as salas disponíveis no SQL
        try {
            // Encontrando todos os componentes disponíveis no banco de dados
            const componentes = await componente.findAll({
                raw: true, // Retorna somente os valores de uma tabela, sem os metadados.
                attributes: ['IDComp', 'Nome', 'Valor', 'Medida', 'Foto']
            });
            
            // Renderizando a página com os componentes
            res.render('../views/pagina-simula-adm', { componentes });
        } catch (error) {
            console.error("Erro ao buscar componentes:", error);
            // Tratar o erro adequadamente
            res.status(500).send('Erro ao buscar componentes.');
        }
    },
    async usuariologin(req, res) {
        const dados = req.body;
        const email = dados.email;
        const senha = dados.senha;

        console.log('entrou');

        try {
            // Verificar se o usuário com o e-mail fornecido existe no banco de dados
            const user = await usuario.findOne({ where: { Email: email } });
            console.log('ele viu');

            if (!user) {
                return res.status(404).send("Usuário não encontrado");
            }

            // Verificar se a senha fornecida corresponde à senha armazenada no banco de dados
            if (user.Senha !== senha) {
                return res.status(401).send("Senha incorreta");
            }
            console.log('verificou');
            // Se o usuário e a senha estiverem corretos, redirecione para a página principal ou página de perfil, etc.
            res.redirect('/');
        } catch (error) {
            console.error("Erro ao fazer login:", error);
        }
    }

}