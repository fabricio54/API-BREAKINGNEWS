// importando o modulo services
import { createService, findAllService, countNews, topNewsService, findByIdService, searchByTitleService, byUserService } from '../services/news.services.js';



export const create = async (req, res) => {

    try {

        // descontruindo os dados que vieram no body
        const { title, text, banner } = req.body;

        if (!title || !banner || !text) {
            return res.status(400).send({ message: "Submit all fields for registration" });
        }

        await createService({
            title,
            text,
            banner,
            user: req.userId,
        })

        res.status(201).send({ message: "News created Succefuly" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }


};


export const findAll = async (req, res) => {
    try {
        // pegando os parâmetros enviados na url (queres)
        let { limit, offset } = req.query;

        limit = Number(limit);
        offset = Number(offset);

        if (!limit) {
            limit = 5;
        }

        if (!offset) {
            offset = 0;
        }

        const news = await findAllService(offset, limit);
        // total de noticias
        const total = await countNews();
        // pegando a url de forma dinâmica na req.base
        const currentUrl = req.baseUrl;

        const next = offset + limit;
        // se o next for menor que o total mandara uma url (template string)
        const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

        const previous = offset - limit < 0 ? null : offset - limit;

        const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

        if (news.length === 0) {
            return res.status(400).send({ message: "There are no registered news" });
        }
        // mandando um objeto no send com algumas informações para utilizarmos no front
        res.send({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,

            // map um array que retorna item por item
            results: news.map((item) => [{
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                name: item.user.name,
                username: item.user.username,
                userAvatar: item.user.avatar,
            }])
        });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }

};

export const topNews = async (req, res) => {
    try {
        // fazendo a consulta da noticia
        const news = await topNewsService();
        // verificando se a noticia existe
        if (!news) {
            return res.status(400).send({ message: "There is no registered post" });
        }

        res.send({
            // map um array que retorna item por item
            news: {
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                name: news.user.name,
                username: news.user.username,
                userAvatar: news.user.avatar,
            }
        })
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const findById = async (req, res) => {
    try {
        // pegando o id da url
        const { id } = req.params;

        // fazendo a cosulta ao banco dessa noticia pelo id
        const news = await findByIdService(id);

        return res.send({
            news: {
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                name: news.user.name,
                username: news.user.username,
                userAvatar: news.user.avatar,
            }
        })
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const searchByTitle = async (req, res) => {
    try {

        const { title } = req.query;

        const news = await searchByTitleService(title);

        if (news.length === 0) {
            return res.status(400).send({ message: "There are no news with this title" });
        }

        return res.send({
            results: news.map((item) => [{
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                name: item.user.name,
                username: item.user.username,
                userAvatar: item.user.avatar
            }]),
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

export const byUser = async (req, res) => {
    try {
        // pegando o id do middleware de autenticação caso passe
        const id = req.userId;
        // pegando as noticias que tem que tem ligação com esse id
        const news = await byUserService(id);

        // jogando na tela as noticias
        return res.send({
            results: news.map((item) => [{
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                name: item.user.name,
                username: item.user.username,
                userAvatar: item.user.avatar
            }]),
        })
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}