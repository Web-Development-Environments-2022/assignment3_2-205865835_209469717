var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const recipes_utils = require("./utils/recipes_utils");

router.get("/", (req, res) => res.send("im here at the recipes"));


/**
 * This path returns a full details of a recipe by its id
 */
 router.get("/recipeDetails/:recipeId", async (req, res, next) => {
  try {
    const recipe = await recipes_utils.getRecipeDetails(req.params.recipeId);
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});


/**
 * This path returns 3 random preview recipes
 */
 router.get("/random", async (req, res, next) => {
  try{
    let random_3_recipes = await recipes_utils.getRandomThreeRecipes();
    res.send(random_3_recipes);
  }catch (error){
    next(error);
  }
});


/**
 * This path returns recipes based on a search
 */
 router.get("/search/:query/:number/:cuisine?/:diet?/:intolerance?", async (req, res, next) => {
  try{    
    let seach_results = await recipes_utils.recipeSearch(req.params.query, req.params.number, req.params.cuisine, req.params.diet, req.params.intolerance);
    res.send(seach_results);
  }catch (error){
    next(error);
  }
});






module.exports = router;