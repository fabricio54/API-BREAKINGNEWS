const express = require("express");
const app = express();

// descrição do método http get abaixo, o primeiro parâmetro e a rota barra e uma função de callback que tem dois parâmetros e que retorna um hello word
app.get("/home", (req, res) => {
  res.send("Hello World");
})

app.listen(3000);