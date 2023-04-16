// requerindo todos as funcionalidades do express rotas e jogando numa constante
const route = require("express").Router();

// importando a função da pasta controllers para uma constante e passando o endereço da mesma.
const userController = require('../controllers/user.controller');

// rota de pegar
route.get("/", userController.soma);

// nesse caso como estamos esportando so uma coisa basta enviar ela de forma simples 
module.exports = route;