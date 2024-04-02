// Iniciando Route do Express
const express = require('express');
const route = express.Router();
// Importando os Controllers
const home = require('./src/controllers/home');

const cadastro = require('./src/controllers/cadastro');


// Iniciando as rotas
route.get('/', home.pagInicialGet);
route.get('/pagina-cad-comp', home.pagCadCompGet);
route.get('/pagina-cadastro', home.pagCadastroGet);
route.get('/pagina-login', home.pagLoginGet);
route.get('/pagina-principal', home.pagPrincipalGet);
route.get('/pagina-simulador', home.pagSimuladorGet);




module.exports = route;