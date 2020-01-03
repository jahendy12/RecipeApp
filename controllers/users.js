const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Recipe = require('../models/recipe');

// New route
router.get('/new', async (req, res) => {
	res.render('users/new.ejs');
});

// Create route
router.post('/', async (req, res) => {
	try {
		console.log(req.body);
		await User.create(req.body);

		res.redirect('/users');
	} catch (err) {
		res.send(err);
	}
});

// Index route
router.get('/', async (req, res) => {
	console.log('req.session in users index', req.session);
	try {
		const foundUsers = await User.find();
 
		res.render('users/index.ejs', {
			users: foundUsers
		});
		
	} catch (err) {
		res.send(err);
	}
});

// Show route
router.get('/:id', async (req, res) => {
	try {
		const foundUser = await User.findById(req.params.id);

		const usersRecipes = await Recipe.find({ user: foundUser._id });

		res.render('users/show.ejs', {
			user: foundUser,
			recipes: usersRecipes
		});
		
	} catch (err) {
		res.send(err);
	}
});

// Edit route
router.get('/:id/edit', async (req, res) => {
	try {
		const foundUser = await User.findById(req.params.id);

		res.render('users/edit.ejs', {
			user: foundUser
		});
		
	} catch (err) {
		res.send(err);
	}
});

// Update route
router.put('/:id', async (req, res) => {
	try {
		await User.findByIdAndUpdate(req.params.id, req.body);
		
		res.redirect(`/users/${req.params.id}`);
	} catch (err) {
		res.send(err);
	}
});

// Delete route
router.delete('/:id', async (req, res) => {
	try {
		await User.findByIdAndRemove(req.params.id);

		await Recipe.deleteMany({ user: req.params.id });		
		
		res.redirect('/users');
	} catch (err) {
		res.send(err);
	}
});

//Log in route
router.post('/', async (req, res) => {
	try {
		console.log(req.body);
		await User.create(req.body);

		res.redirect('/users');
	} catch (err) {
		res.send(err);
	}
});

module.exports = router;	  
