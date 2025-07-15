const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json()); 

app.post("/products", (req, res) => {
  const { name, price, category } = req.body;

  if (!name || typeof name !== "string" || name === "") {
    return res.status(400).send("Erreur : le nom est requis et doit être une chaîne non vide.");
  }

  if (typeof price !== "number" || price <= 0) {
    return res.status(400).send("Erreur : le prix doit être un nombre positif.");
  }

  if (!category) {
    return res.status(400).send("Erreur : la catégorie est requise.");
  }

  res.send({
    message: "Produit ajouté avec succès !",
    produit: { name, price, category }
  });
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
