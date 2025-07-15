const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());


let articles = [
  { id: 1, title: "Titre 1", content: "Contenu 1" },
  { id: 2, title: "Titre 2", content: "Contenu 2" }
];

app.put("/articles/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const data = req.body;

  const article = articles.find(a => a.id === id);

  if (!article) {
    return res.status(404).send("Article non trouvé");
  }

  
  Object.assign(article, data);

  res.send({
    message: "Article mis à jour",
    article
  });
});

app.listen(PORT, () => {
  console.log(`Serveur sur http://localhost:${PORT}`);
});
