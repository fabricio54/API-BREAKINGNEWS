// criando uma função específica que faz alguma coisa
const soma = (req, res) => {
    const soma = 100 + 1;

    res.send({soma: soma});
}

// exportando a função para outras modulos terem acesso (module de rotas)
module.exports = { soma };