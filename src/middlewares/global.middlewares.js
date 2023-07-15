// middleware: por definição e uma função que interceptara a rota de uma função de callback (no meio das duas)
// precisamos do mongoose para gerarmos as funções
import mongoose from 'mongoose';

// importando os services
import userService from '../services/user.service.js';

const validId = (req, res, next) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: "Invalid ID" })
        }

        next();
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
};

const validUser = async (req, res, next) => {
    try {
        const id = req.params.id;

        const user = await userService.findById(id);

        if (!user) {
            return res.status(400).send({ message: "User not found" })
        }

        req.id = id
        req.user = user

        next();
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

export {
    validId,
    validUser
}