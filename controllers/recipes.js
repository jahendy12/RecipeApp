const express = require('express');
const router = express.Router();

const Recipe = require('../models/recipe');
const User = require('../models/user');

// const fs = require('fs'); 
// const multer = require('multer'); 
// let filepath = './uploads/recipe'; 

// const storage = multer.diskStorage({
//     destination: function(req, file, cb){
        
//         const localpath = filepath.split('/')
//             .map((dir,i)=>{if(i>0){return "/"+dir;}})
//             .join('');

//         cb(null, './public'+localpath);
//     },

//     filename: function(req,file,cb){
//         cb(null,file.originalname);
//     }
// })

// const upload = multer({storage: storage});

// app.post('/single', upload.single('profile'), async (req,res)=>{
// 	try{
// 		const relpath = `${filepath}/${req.file.filename}`
// 		req.body.imgPath = relpath;
// 		const createdUser = await User.create(req.body);
// 		res.redirect(`/${createdUser._id}`);
// 	}
// 	catch(err){
// 		res.send(400);
// 	}
// })


// New route
router.get('/new', async (req, res) => {
	try {
		const allUsers = await User.find();

		res.render('recipes/new.ejs', {
			users: allUsers
		});
	} catch (err) {
		res.send(err);
	}
});

// Create route
router.post('/', async (req, res) => {
	try {
		const foundUser = await User.findOne({username:req.session.username})
		req.body.user = foundUser._id
		await Recipe.create(req.body);

		res.redirect('/recipes');
	} catch (err) {
		res.send(err);
	}
});

// Index route
router.get('/', async (req, res) => {
	try {
		const foundRecipes = await Recipe.find();

		res.render('recipes/index.ejs', {
			recipes: foundRecipes
		});
	} catch (err) {
		res.send(err);
	}
});

// Show route
router.get('/:id', async (req, res) => {
	try {
		const foundRecipe = await Recipe.findById(req.params.id).populate('user');

		res.render('recipes/show.ejs', {
			recipe: foundRecipe
		});
	} catch (err) {
		res.send(err);
	}
});

// Edit route
router.get('/:id/edit', async (req, res) => {
	try {
		const foundRecipe = await Recipe.findById(req.params.id);
		console.log(foundRecipe);
		const allUsers = await User.find();

		res.render('recipes/edit.ejs', {
			recipe: foundRecipe,
			users: allUsers,
		});
	} catch (err) {
		res.send(err);
	}
});

// Update route
router.put('/:id', async (req, res) => {
	try {
        await Recipe.findByIdAndUpdate(req.params.id, req.body);
        
		res.redirect(`/recipes/${req.params.id}`);
	} catch (err) {
		res.send(err);
	}
});

// Delete route
router.delete('/:id', async (req, res) => {
	try {
		await Recipe.findByIdAndRemove(req.params.id);

		res.redirect('/recipes');
	} catch (err) {
		res.send(err);
	}
});

module.exports = router;