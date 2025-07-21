
require('dotenv').config(); 
const express = require('express'); 
const mongoose = require('mongoose'); 
const Contact = require('./models/Contact'); 

const app = express(); 
const PORT = process.env.PORT || 3000; 

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connecté à MongoDB !')) 
    .catch(err => console.error('Erreur de connexion:', err.message)); 


app.get('/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find(); 
        res.json(contacts); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
});

app.get('/contacts/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id); 
        res.json(contact); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
});

app.post('/contacts', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        const savedContact = await newContact.save(); 
        res.json(savedContact); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
});

app.put('/contacts/:id', async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedContact); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
});


app.delete('/contacts/:id', async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id); 
        res.json({ message: 'Contact supprimé.' }); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});