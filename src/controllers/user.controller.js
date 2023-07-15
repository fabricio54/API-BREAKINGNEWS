// importantdo o serviço de usuario
import userService from '../services/user.service.js';

// observação: como esse servidor não faz parte deste temos que acessar primeiro ele. fazemos isso com a palavra reservada async de assincrono esta externo ao app

const create = async (req, res) => {
    // utilizando try e catch: utilizado caso ache um erro de servidor e temos que mostra-lo ao usuário
    try {
        const { name, username, email, password, avatar, background } = req.body; // isso aqui é um objeto que tem campos e temos que desmembrar e tambem validar

        // validade dados
        if (!name || !username || !email || !password || !avatar || !background) {
            // com o json
            /*
            res.json("Submit all fields for registration")
            */
            // com o message mais elegante
            // para informar de onde partiu o erro e tem uma lista variada. mais especifimente e um erro do clinte por que não preencheu todos os campos então antes do sendo colocamos o status e o número do erro informado
            res.status(400).send({ message: "Submit all fields for registration" });
        }

        // criando uma constante que recebe userService.create

        // temos que usar o await porque essa função e externa ao servidor. primeiramente utilizando o asycn em cima (espera)
        const user = await userService.create(req.body);

        // verificando a constante tem os valores 
        if (!user) {
            return res.status(400).send({ message: "Error creating User" });
        }

        res.status(201).send({
            message: "User created succefully",

            user: {
                id: user._id, // cria um id automaticamente
                name,
                username,
                email,
                avatar,
                background,
            },
        });
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
};

const findAll = async (req, res) => {
    try {
        const users = await userService.findAll();

        if (users.length === 0) {
            return res.status(400).send({ message: "There are no registered users" })
        }

        res.send(users)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const findById = async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const update = async (req, res) => {

    try {
        const { name, username, email, password, avatar, background } = req.body;

        if (!name && !username && !email && !password && !avatar && !background) {

            res.status(400).send({ message: "Submit at least one field for update" });
        }

        const { id, user } = req;

        await userService.updateService(
            id,
            name,
            username,
            email,
            password,
            avatar,
            background
        );

        res.send({ message: "User successfully updated" })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }

}
// exportando a função para outras modulos terem acesso (module de rotas)
export default{ create, findAll, findById, update };