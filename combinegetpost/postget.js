const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [];
let nextId = 1;

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const task = {
    id: nextId++,
    title: req.body.title,
    done: req.body.done || false
  };

  tasks.push(task);
  res.json(task);
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
