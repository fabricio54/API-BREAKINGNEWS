// requerindo todos as funcionalidades do express rotas e jogando numa constante
import userController from '../controllers/user.controller.js';

import express from 'express';
const route = express.Router();

// importando os middlewares
import { validId, validUser } from '../middlewares/global.middlewares.js';

// importando a função da pasta controllers para uma constante e passando o endereço da mesma.


// rota de pegar
/*
route.get("/", userController.soma); criando uma rota que tem / e recebe uma função de callback
*/

// trabalhando com post (criar)
route.post('/',userController.create);
route.get('/', userController.findAll);
route.get('/:id', validId, validUser,userController.findById)
route.patch('/:id',validId, validUser, userController.update)

// nesse caso como estamos esportando so uma coisa basta enviar ela de forma simples 
export default route;