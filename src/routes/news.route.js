import { Router } from 'express';
const router = Router();

// importando os services de noticias
import { create, findAll, topNews, findById, searchByTitle, byUser } from '../controllers/news.controller.js';

// importando middlewares
import { authMiddleware } from '../middlewares/auth.middleware.js';

// rotas

// criando uma notícia
router.post("/", authMiddleware, create);
// pegar todas as noticias
router.get("/", findAll);
// rota da noticia mais recente
router.get("/top", topNews);
// pesquisando um título
router.get("/search", searchByTitle);
// rota de buscas de noticias de um usuário
router.get("/byUser", authMiddleware, byUser);

// pegando noticias pelo id
router.get("/:id", authMiddleware, findById);
export default router;

