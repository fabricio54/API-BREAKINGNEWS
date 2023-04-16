const express = require("express");

// exportando uma todo(s) a(s) rota(s) dispovil nesse caminho. no caso está uma única rota
const userRoute = require('./src/routes/user.router');

const app = express();

// função que faz de uma rota
app.use("/soma", userRoute);

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

app.listen(3000);