// importando o modulo services
import { createService, findAllService } from '../services/news.services.js';

const create = async (req, res) => {

    try {
        // descontruindo os dados que vieram no body
        const {title, text, banner} = req.body;

        if(!title || !text || !banner) {
            res.status(400).send({ message: "Submit all fields for registration"});
        }

        await createService({
            title,
            text,
            banner,
            id: "objectidfake"
        })
        
        res.send(201);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
    
}
const findAll = (req, res) => {
    const news = [];
    res.send(news)
}

export default {
    create,
    findAll,
}