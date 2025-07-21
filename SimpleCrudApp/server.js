
require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000; 
const mongoUri = process.env.MONGO_URI; 

app.use(express.json());

app.use(cors());

mongoose.connect(mongoUri)
    .then(() => console.log('Connecté à MongoDB !'))
    .catch(err => console.error('Erreur de connexion à MongoDB :', err));

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true }, 
    age: { type: Number, required: true, min: 0 },      
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema); 

app.post('/api/users', async (req, res) => {
    try {
        const newUser = new User(req.body); 
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message }); 
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find(); 
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
});

app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id); 
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' }); 
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/api/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); 
        if (!updatedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id); 
        if (!deletedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});