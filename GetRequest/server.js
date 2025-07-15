const express = require('express');
const app = express();
const port = 8080;


app.get('/utilisateur/:id', (req, res) => {
  const id = req.params.id;
  res.send(`Utilisateur avec ID ${id}`);
});

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
