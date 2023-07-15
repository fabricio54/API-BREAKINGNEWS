/* (forma de importar utilizando o método antigo)
const express = require("express");
const app = express();
// trazendo a função de conecção do bd
const connectDatabase = require('./src/database/db');
// exportando uma todo(s) a(s) rota(s) dispovil nesse caminho. no caso está uma única rota
const userRoute = require('./src/routes/user.router');
*/

// importando todos os modulos com métodos mais recentes (Common JS)
import express from 'express';
const app = express();
import connectDatabase from './src/database/db.js';
import userRoute from './src/routes/user.router.js';
const port = 3000;

// conectando o mongoDb atlas conectado
connectDatabase();

// expecificando que a aplicação vai utilizar o json

app.use(express.json());

// função que faz de uma rota
app.use("/user", userRoute);

// descrição do método http get abaixo, o primeiro parâmetro e a rota barra e uma função de callback que tem dois parâmetros e que retorna um hello word

// Rota 
// Method HTTP - CRUDI (CREATE, READ, UPDATE, DELETE)

// Método http por definição é como a internet se comunica (requisição e resposta)
// GET - Pega um info
// POST - Cria uma info
// PUT - Altera toda a info
// PATH - Altera parte da info
// DELETE - Apaga um info

// Name - identificador da rota

// Function (calback) - Responsável por executar algum comando

//a porta de entrada da nossa api/servidor e a rota (api roda entorno da rota)

/*app.get("/soma", (req, res) => {
  //res.send("Hello World");
  const soma = 1 + 1;

  res.json({soma: soma});
})*/

// importando uma rota para esse arquivo
// começando a deixar as coisas mais elegantes
app.listen(3000, () => console.log(`Servidor rodando na porta ${port}`));