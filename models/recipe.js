const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    name: String,
    ingredients: String,
    directions: String
})

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;