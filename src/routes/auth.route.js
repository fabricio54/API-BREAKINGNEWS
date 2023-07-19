// rota de autenticação
// novo modo para importar router de express (maneira mais elegante)

import { Router } from 'express';
const router = Router();

import { login } from '../controllers/auth.controller.js';

router.post("/", login);

export default router;