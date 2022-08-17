var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const user_utils = require("./utils/user_utils");
const recipe_utils = require("./utils/recipes_utils");

/**
 * Authenticate all incoming requests by middleware
 */
router.use(async function (req, res, next) {
  if (req.session && req.session.user_id) {
    DButils.execQuery("SELECT user_id FROM users").then((users) => {
      if (users.find((x) => x.user_id === req.session.user_id)) {
        req.user_id = req.session.user_id;
        next();
      }
    }).catch(err => next(err));
  } else {
    res.sendStatus(401);
  }
});


/**
 * This path gets body with recipe_id and save this recipe in the favorites list of the logged-in user
 */
router.post('/favorites', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipe_id = req.body.recipe_id;
    await user_utils.markAsFavorite(user_id,recipe_id);
    res.status(200).send("The Recipe successfully saved as favorite");
    } catch(error){
    next(error);
  }
})

/**
 * This path returns the favorites recipes that were saved by the logged-in user
 */
router.get('/favorites', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipes_id = await user_utils.getFavoriteRecipes(user_id);
    // let recipes_id_array = [];
    // recipes_id.map((element) => recipes_id_array.push(element.recipe_id)); //extracting the recipe ids into array
    // const results = await recipe_utils.getRecipesPreview(recipes_id_array);
    res.status(200).send(recipes_id);
  } catch(error){
    next(error); 
  }
});

/**
 * This path creates a user recipe
 */
 router.post("/createRecipe", async (req, res, next) => {
  try {
    let recipe_details = {
      title: req.body.title,
      imageUrl: req.body.imageUrl,
      totalTime: req.body.totalTime,
      popularity: req.body.popularity,
      vegan: req.body.vegan,
      vegeterian: req.body.vegetarian,
      glutenFree: req.body.glutenFree,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      servings: req.body.servings
    }    
    const user_id = req.session.user_id;

    await DButils.execQuery(
      `INSERT INTO userrecipes (user_id ,imageUrl ,title ,totalTime ,aggregateLikes ,vegetarian, vegan,glutenFree ,ingredients ,instructions ,servings) VALUES ('${user_id}', '${recipe_details.imageUrl}', '${recipe_details.title}', '${recipe_details.totalTime}', '${recipe_details.popularity}', '${recipe_details.vegeterian}', '${recipe_details.vegan}', '${recipe_details.glutenFree}', '${recipe_details.ingredients}', '${recipe_details.instructions}', '${recipe_details.servings}')`
    );
    res.status(201).send({ message: "recipe added", success: true });
  } catch (error) {
    next(error);
  }
});


/**
 * This path returns the user made recipes of the currrent user in the sessionr
 */
 router.get('/userRecipes', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const results = await user_utils.getUserRecipes(user_id);
    res.status(200).send(results);
  } catch(error){
    next(error); 
  }
});

/**
 * This path returns a user made recipe
 */
router.get('/userRecipes/:recipeId', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const results = await user_utils.getUserRecipes(user_id);
    res.status(200).send(results);
  } catch(error){
    next(error); 
  }
});
<<<<<<< HEAD
=======


// router.get('/userRecipes/:recipeId', async (req,res,next) => {
//   try{
//     const user_id = req.session.user_id;
//     const results = await user_utils.getUserRecipes(user_id);
//     res.status(200).send(results);
//   } catch(error){
//     next(error); 
//   }
// });

>>>>>>> 9a76f9b1581988eb98dd1fdcb23c948605920b8f

/**
 * This path gets body with recipe_id and save this recipe in the history list of the logged-in user
 */
 router.post('/history', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipe_id = req.body.recipe_id;
    await user_utils.markWatched(user_id,recipe_id);
    res.status(200).send("The Recipe is successfully saved to history");
    } catch(error){
    next(error);
  }
})



/**
 * This route returns the recipes the logged-in user has watched
 */
 router.get('/history', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipes_id = await user_utils.getHistoryRecipes(user_id);
    res.status(200).send(recipes_id);
  } catch(error){
    next(error); 
  }
});

/**
 * This route returns the last 3 recipes the logged-in user has watched
 */
router.get("/latestHistory", async (req,res,next)=>{
  try{
   const user_id = req.session.user_id;
   const latest = await user_utils.getLatestThree(user_id);
   res.status(200).send(latest);
  }catch(err){next(err)}
 });



/*
* Returns the recipes in the meal of the current user
* Needs a recipe ID, recipe title, recipe image
*/
router.get('/mealRecipes', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipes = await user_utils.getMealRecipes(user_id);

    res.status(200).send(recipes);
  } catch(error){
    next(error); 
  }
});

/*
* Adds a new recipe to the meal of the current user
*/
router.post('/addRecipeToMeal', async (req,res,next) => {
    try {
      let recipe_details = {
        imageUrl: req.body.imageUrl,
        title: req.body.title,
        id: req.body.id
    }    
    const user_id = req.session.user_id;    
    const result = await user_utils.addRecipeToMeal(user_id, recipe_details);

    res.status(200).send(result);
    // res.status(201).send({ message: "recipe added", success: true });
  } catch(error){
    next(error); 
  }
});


/*
* Changes the order of the current user's meal
*/
router.put('/changeMealOrderAbove', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipe_count = req.body.recipe_count;
    const recipe_id = req.body.recipe_id;
    const result = await user_utils.chageMealOrderAbove(user_id,recipe_id, recipe_count);

    // res.status(200).send({ message: "change succeeded", success: true });
    res.status(200).send(result);

  } catch(error){
    next(error); 
  }
});

/*
* Changes the order of the current user's meal
*/
router.put('/changeMealOrderBellow', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipe_count = req.body.recipe_count;
    const recipe_id = req.body.recipe_id;
    const result = await user_utils.chageMealOrderBellow(user_id,recipe_id ,recipe_count);

    // res.status(200).send({ message: "change succeeded", success: true });
    res.status(200).send(result);

  } catch(error){
    next(error); 
  }
});


/*
* Removes a single recipe from the user's meal
*/
router.delete('/RemoveRecipeFromMeal', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipe_id = req.body.recipe_id;
    const result = await user_utils.RemoveRecipeFromMeal(user_id, recipe_id);

    // res.status(200).send({ message: "delete succeeded", success: true });
    res.status(200).send(result);

  } catch(error){
    next(error); 
  }
});

/*
* Resets the current user's meal
*/
router.delete('/resetMeal', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const result = await user_utils.resetMeal(user_id);

    res.status(200).send(result);

  } catch(error){
    next(error); 
  }
});


<<<<<<< HEAD
=======
// router.get("/latestHistory", async (req,res,next)=>{
//   try{
//    const user_id = req.session.user_id;
//    const latest = await user_utils.getLatestThree(user_id);
//    res.status(200).send(latest);
//   }catch(err){next(err)}
//  });

>>>>>>> 9a76f9b1581988eb98dd1fdcb23c948605920b8f

module.exports = router;