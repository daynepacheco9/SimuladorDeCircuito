// Importação
const Sequelize = require('sequelize');
const database = require('../config/db');
// Criando a tabela Sala
const componente = database.define('Componente', {
    IDComp: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Nome: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    Valor: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    Medida: {
        type: Sequelize.STRING(12),
        allowNull: false
    },
    Foto: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
});
// Exportando essa tabela
module.exports = componente;