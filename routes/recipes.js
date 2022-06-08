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
 router.get("/search/:query/:number?/:cuisine?/:diet?/:intolerance?", async (req, res, next) => {
  try{    
    let seach_results = await recipes_utils.recipeSearch(req.params.query, req.params.number, req.params.cuisine, req.params.diet, req.params.intolerance);
    res.send(seach_results);
  }catch (error){
    next(error);
  }
});



router.post("/createRecipe", async (req, res, next) => {
  try {
    let recipe_details = {
      imageUrl: req.body.imageUrl,
      title: req.body.title,
      totalTime: req.body.totalTime,
      popularity: req.body.popularity,
      vegan: req.body.vegan,
      gluten: req.body.gluten,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      servings: req.body.servings
    }    
    // const user_id = req.session.user_id;
    user_id = req.session.user_id;

    await DButils.execQuery(
      `INSERT INTO userrecipes VALUES ('${user_id}', '${recipe_details.imageUrl}', '${recipe_details.title}', '${recipe_details.totalTime}', '${recipe_details.popularity}', '${recipe_details.vegan}', '${recipe_details.gluten}', '${recipe_details.ingredients}', '${recipe_details.instructions}', '${recipe_details.servings}')`
    );
    res.status(201).send({ message: "recipe added", success: true });
  } catch (error) {
    next(error);
  }
});




module.exports = router;