const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

let names = [];
let tasks = [];

// GET endpoint for /greet
app.get('/greet', (req, res) => {
    res.json({ names });
});

// POST endpoint for /task
app.post('/task', (req, res) => {
    const { task } = req.body;
    if (task) {
        tasks.push(task);
        res.status(201).send('Task added');
    } else {
        res.status(400).send('Task cannot be empty');
    }
});

// GET endpoint for /task
app.get('/task', (req, res) => {
    res.json(tasks);
});

// DELETE endpoint for /task/:index
app.delete('/task/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
        res.send('Task deleted');
    } else {
        res.status(404).send('Task not found');
    }
});

// PUT endpoint for moving tasks
app.put('/task/:index/move/:direction', (req, res) => {
    const index = parseInt(req.params.index);
    const direction = parseInt(req.params.direction);
    
    if (index >= 0 && index < tasks.length) {
        const newIndex = index + direction;

        if (newIndex >= 0 && newIndex < tasks.length) {
            const [task] = tasks.splice(index, 1);
            tasks.splice(newIndex, 0, task);
            res.send('Task moved');
        } else {
            res.status(400).send('Cannot move task in that direction');
        }
    } else {
        res.status(404).send('Task not found');
    }
});

// Handle the request for wazzup.html
app.get('/wazzup.html', (req, res) => {
    const name = req.query.name;
    const index = names.indexOf(name);
    if (index === -1 || index >= names.length) {
        return res.status(404).send('Name not found');
    }
    res.sendFile(path.join(__dirname, 'public', 'wazzup.html'));
});

// Redirect for POST request to add a name
app.post('/greet', (req, res) => {
    const name = req.body.name;
    if (name) {
        names.push(name);
    }
    res.redirect('/');
});

// PUT method for /greet
app.put('/greet/:name', (req, res) => {
    const name = req.params.name;
    if (name) {
        names.push(name);
    }
    res.json({ names });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
