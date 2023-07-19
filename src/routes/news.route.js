import { Router } from 'express';
const router = Router();

// importando os services de noticias
import { create, findAll } from '../controllers/news.controller.js';

// rotas

// criando uma notícia
router.post("/", create);
// pegar todas as noticias
router.get("/", findAll)


export default router;

