import News from '../models/News.js';

// inserindo dados na collection news
export const createService = (body) => News.create(body);

// pegando todas as noticias
// na busca dos dados utilizamos duas funções do mongodb: sort de onde começamos no caso de baixo pra cima e o skip de quantos em quantos pula e o limit que traz o limit, tambem com a função populate informamos um campo e ele vai descrever ele
export const findAllService = (offset, limit) => News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

export const countNews = () => News.countDocuments();

export const topNewsService = () => News.findOne().sort({ _id: -1 }).populate("user");

export const findByIdService = (id) => News.findById(id).populate("user");

// fazendo um query mais espécifico e com mais uma nova funcionalidade do mongodb: nas configurações que mandamos no find colocamos no title um objeto com duas configurações regex e o options (variáveis que são nativas do mongo db onde especificamos pelo sifrão) a chave options recebe o valor "i" para indicar busca sendo case sensitive
export const searchByTitleService = (title) => News.find({
    title: { $regex: `${title || ""}`, $options: "i" }
})
    .sort({ _id: -1 })
    .populate('user');

export const byUserService = (id) => News.find({ user: id })
    .sort({ _id: -1 })
    .populate("user");