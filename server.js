require('dotenv').config();

const express = require('express');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');
const port = process.env.PORT;

require('dotenv').config();
require('./db/db.js');

// MIDDLEWARE
app.use(session({
    secret: 'ilovesecrets',
    resave: false,
    saveUninitialized: false
}));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

// CONTROLLERS
const usersController = require('./controllers/users.js');
app.use('/users', usersController);

const recipesController = require('./controllers/recipes.js');
app.use('/recipes', recipesController);

app.get('/', (req, res) => {
    res.render('index.ejs', {
        message: req.session.message,
        logged: req.session.logged,
        username: req.session.username
    });
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})