const express = require('express');
const app = express();
const port = 3000;


app.get('/users/:userId/orders/:orderId', (req, res) => {
  const userId = req.params.userId; 
  const orderId = req.params.orderId; 
  const details = req.query.details; 

  
  const responseObject = {
    userId: userId,
    orderId: orderId,
    details: details ? details : 'false'
  };

  res.json(responseObject);
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);

});