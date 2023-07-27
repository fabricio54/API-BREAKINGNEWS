// importando o dotenv
import dotenv from "dotenv";
// importando o jwt
import jwt from 'jsonwebtoken';
// importando o modullo de service
import userService from "../services/user.service.js";

// configurando-o
dotenv.config();

export const authMiddleware = (req, res, next) => {
    try {
        // pegando o authorization do headers
        const { authorization } = req.headers;
        // verificando se o usuário está autorizado entrar. se não retorna o status http 401 de não autorizado 
        if (!authorization) {
            return res.send(401);
        }
        // agora vamos desmembrar o autorization em partes com a função split() do javascript
        const parts = authorization.split(" ");

        // verificando se os parts tem o tamanho 2
        if (parts.length !== 2) {
            res.send(401);
        }

        // desmembrando o array criado com as strings
        const [schema, token] = parts;

        // verificando o schema
        if (schema !== "Bearer") {
            return res.send(401);
        }

        // validando o token

        // função do jwt que vai validar o token. essa função recebe três parâmetros: token, secrety variavel e uma função de callback que recebe o erro e um decoded 
        jwt.verify(token, process.env.SECRET_JWT, async(error, decoded) => {
            if (error) {
                return res.status(401).send({ message: "Token invalid" });
            }
            // procurando se o id é válido
            const user = await userService.findById(decoded.id)

            // verificando se o usuário existe
            if (!user || !user.id) {
                return res.status(401).send({ message: "Invalid token" })
            }
            // criando constantes para passar para a próxima função a de id usuário
            req.userId = user.id;

            // passando para a próxima etapa do código
            return next();
        })
        
        
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

}

