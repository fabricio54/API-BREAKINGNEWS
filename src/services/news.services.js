import News from '../models/News.js';

// inserindo dados na collection news
const createService = (body) => News.create(body);

// pegando todas as noticias
const findAllService = () => News.find();

export default {
    createService,
    findAllService
}