const sequelize = require('sequelize');
//configurações da base de dados
const database = new sequelize('ProjetoJesDay', 'ProjetoJesDay', 'jesday',
{
dialect: 'mssql', host:'localhost', port: 55054
});
database.sync();
module.exports = database;