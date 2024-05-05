const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 1000;

app.use(bodyParser.json());

let animals = [];

app.get("/animals", (req, res) => {
  res.json(animals);
});

app.post("/animals", (req, res) => {
  const { name, species } = req.body;
  const newAnimal = { name, species };
  animals.push(newAnimal);
  res.status(201).json(newAnimal);
});

app.put("/animals/:name", (req, res) => {
  const { name } = req.params;
  const { species } = req.body;
  const index = animals.findIndex((animal) => animal.name === name);
  if (index !== -1) {
    animals[index].species = species;
    res.json(animals[index]);
  } else {
    res.status(404).json({ message: "Animal not found" });
  }
});

app.delete("/animals/:name", (req, res) => {
  const { name } = req.params;
  animals = animals.filter((animal) => animal.name !== name);
  res.json({ message: "Animal deleted" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
