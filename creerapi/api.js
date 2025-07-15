const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let contacts = [
    { id: 1, name: 'Nenette', email: 'nenette@gmail.com', phone: '622561090' },
    { id: 2, name: 'Thierno', email: 'sad@gmail.com', phone: '622894803' }
];

let nextId = 3;

app.get('/contacts', (req, res) => {
    res.json(contacts);
});

app.get('/contacts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const contact = contacts.find(c => c.id === id);

    if (!contact) {
        return res.status(404).json({ message: 'Contact non trouvé' });
    }
    res.json(contact);
});


app.post('/contacts', (req, res) => {
    const { name, email, phone } = req.body;
    const newContact = {
        id: nextId++, 
        name,
        email,
        phone
    };
    contacts.push(newContact);
    res.status(201).json(newContact);
});

app.put('/contacts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const contact = contacts.find(c => c.id === id);
    if (!contact) {
        return res.status(404).json({ message: 'Contact non trouvé' });
    }

    contact.name = req.body.name;
    contact.email = req.body.email;
    contact.phone = req.body.phone; 
    res.json(contact);
});

app.delete('/contacts/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const initialLength = contacts.length; 
    contacts = contacts.filter(c => c.id !== id);

    if (contacts.length < initialLength) {
        res.json({ message: 'Contact supprimé avec succès' });
    } else {
        res.status(404).json({ message: 'Contact non trouvé' });
    }
});


app.listen(PORT, () => {
   console.log(`Accédez à votre API via http://localhost:${PORT}`);
});