const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());

app.post('/utilisateur', (req, res) => {
  const { nom, email } = req.body;
  res.send(`Utilisateur reçu : ${nom} (${email})`);
});

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
