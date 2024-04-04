// Iniciando Route do Express
const express = require('express');
const route = express.Router();

const multer = require("multer");

const config = require('./src/config/multer')
// Importando os Controllers
const home = require('./src/controllers/home');

const cadastro = require('./src/controllers/cadastro');


// Iniciando as rotas
route.get('/', home.pagInicialGet);
route.get('/pagina-cad-comp', home.pagCadCompGet);
route.get('/pagina-cadastro', home.pagCadastroGet);
route.get('/pagina-esqueci', home.pagEsqueci);
route.get('/pagina-login', home.pagLoginGet);
route.get('/pagina-principal', home.pagPrincipalGet);
route.get('/pagina-simulador', home.pagSimuladorGet);
route.get('/pagina-simula-adm', home.pagSimulaADMGet);
route.get('/pagina-excluir-user', home.pagExcluirUser);

route.post('/pagina-cad-comp', multer(config).single('foto'), cadastro.componenteInsert);
route.post('/pagina-cadastro', cadastro.usuarioInsert);
route.post('/pagina-esqueci', cadastro.usuarioAlter);

module.exports = route;