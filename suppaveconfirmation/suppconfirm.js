const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let comments = [
  { id: "1", text: "Premier commentaire" },
  { id: "2", text: "Deuxième commentaire" },
  { id: "3", text: "Troisième commentaire" }
];

app.delete("/comments/:commentId", (req, res) => {
  const id = req.params.commentId;

  const exists = comments.some(comment => comment.id === id);

  if (!exists) {
    return res.status(404).json({ error: "Commentaire non trouvé" });
  }

  comments = comments.filter(comment => comment.id !== id);

  res.json({
    success: true,
    deletedCommentId: id
  });
});

app.listen(PORT, () => {
  console.log(`Serveur en ligne sur http://localhost:${PORT}`);
});
