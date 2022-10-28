//Configuração inicial
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const chalk = require("chalk");
const Person = require("./models/Person");
require("dotenv").config();

//Para ler JSON - MiddleWares
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//Configuração da Porta
const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri)
  .then(() => {
    app.listen(3000);
    console.log(chalk.blue("Conectado com sucesso ao MongoDB!"));
  })
  .catch((error) => {
    console.log(chalk.red("Falha na conexão ao mongoDB: " + error));
  });

//Rotas
app.get("/", (req, res) => {
  //res.send('Home Works');
  res.json({ message: "Olá Mundo Node!" });
});

const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);
