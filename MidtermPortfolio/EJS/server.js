const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

let posts = [];
let loggedInUser = '';

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/login', (req, res) => {
    const name = req.body.name;
    const securityLevel = req.body.security === 'secure' ? 'secured' : 'unsecured';
    loggedInUser = name;  
    res.render('test', { name, securityLevel });
});

app.get('/home', (req, res) => {
    if (!loggedInUser) {
        return res.redirect('/');
    }
    res.render('home', { name: loggedInUser, posts });
});

app.post('/post', (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    posts.push({ title, content });
    res.redirect('/home');
});

app.get('/post/:index', (req, res) => {
    const index = req.params.index;
    const post = posts[index];
    res.render('post', { post, index });
});


app.post('/post/update/:index', (req, res) => {
    const index = req.params.index;
    posts[index] = { title: req.body.title, content: req.body.content };
    res.redirect('/home');
});

app.post('/post/delete/:index', (req, res) => {
    const index = req.params.index;
    posts.splice(index, 1);
    res.redirect('/home');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
