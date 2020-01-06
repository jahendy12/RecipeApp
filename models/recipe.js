const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    name: String,
    ingredients: String,
    directions: String, 
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
})

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;