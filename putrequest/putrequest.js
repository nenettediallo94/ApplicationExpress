const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());

app.put('/utilisateur/:id', (req, res) => {
  const id = req.params.id;
  const { nom, email } = req.body;

  res.send(`Utilisateur ${id} mis à jour : ${nom} (${email})`);
});

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
