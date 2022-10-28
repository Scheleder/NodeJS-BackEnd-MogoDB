const router = require("express").Router();
const Person = require("../models/Person");

//Rota Post Person
router.post("/", async (req, res) => {
  //req.body.params

  const { name, salary, approved } = req.body;
  if (!name) {
    res.status(422).json({ error: "O nome é obrigatório" });
    return;
  }
  const person = {
    name,
    salary,
    approved,
  };

  try {
    await Person.create(person);
    res.status(201).json({ message: "Usuário inserido com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Falha: " + error }); //comentar depois de deploy
    console.log(chalk.red("Falha na criação: " + error));
  }
});

//TODOS usuarios
router.get("/", async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json({ people });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//UM usuário
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const person = await Person.findById(id);
    if (!person) {
      res.status(422).json({ message: "Usuário não encontrado!" });
      return;
    }
    res.status(200).json({ person });
    //console.log(req);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//ATUALIZA usuário patch= parcial put=total
router.patch("/:id", async (req, res) => {
  const { name, salary, approved } = req.body;
  const person = {
    name,
    salary,
    approved,
  };

  try {
    const id = req.params.id;
    const updatedPerson = await Person.updateOne({ _id: id }, person);
    if (updatedPerson.matchedCount === 0) {
      res.status(422).json({ message: "Usuário não encontrado!" });
      return;
    }
    res.status(200).json({ person });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//DELETA usuario
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const person = await Person.findOneAndDelete({ _id: id });
    // console.log(res);
    if (!person) {
      res.status(422).json({ message: "Usuário não encontrado!" });
      return;
    }
    res.status(200).json({ message: "Usuário excluído com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
