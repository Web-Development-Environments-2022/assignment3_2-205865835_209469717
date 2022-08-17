const axios = require("axios");
const api_domain = "https://api.spoonacular.com/recipes";



/**
 * Get recipes list from spooncular response and extract the relevant recipe data for preview
 * @param {*} recipes_info 
 */


async function getRecipeInformation(recipe_id) {
    return await axios.get(`${api_domain}/${recipe_id}/information`, {
        params: {
            includeNutrition: false,
            apiKey: process.env.spooncular_apiKey
        }
    });
}


async function getRecipeAnalyzed(recipe_id) {
    let instructions =  await axios.get(`${api_domain}/${recipe_id}/analyzedInstructions`, {
        params: {
            apiKey: process.env.spooncular_apiKey
        }
    });
    return instructions.data;
}


async function getRandomRecipes(){ 
    return await axios.get(`${api_domain}/random`,{
        params: {
            number: 10,
            instructionsRequired: true,
            apiKey: process.env.spooncular_apiKey
        }
    });    
}

async function getSeachResults(query, number, cuisine, diet, intolerance){
    return await axios.get(`${api_domain}/complexSearch`,{
        params: {
            query: query,
            number: number,
            cuisine: cuisine,
            diet: diet,
            intolerance: intolerance,
            instructionsRequired: true,
            addRecipeInformation: true,
            apiKey: process.env.spooncular_apiKey            
        }
    });    
}


async function getRecipeDetails(recipe_id) {
    let recipe_info = await getRecipeInformation(recipe_id);
    let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree, extendedIngredients, instructions, servings } = recipe_info.data;
    return {
        id: id,
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        popularity: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
        extendedIngredients: originalIngredients(extendedIngredients),
        instructions: instructions,
        servings: servings
    }
}

function originalIngredients(extendedIngredients){
    ingredients = [];
    for (let i = 0 ; i < extendedIngredients.length; i ++){
        ingredients.push(extendedIngredients[i]);
    }
    return ingredients;
}

function extractPreviewRecipesDetails(recipes_info){
    return recipes_info.map((recipe_info) => {
        let data = recipe_info;
        if (recipe_info.data){
            data=recipe_info.data;
        }
        const {
            id,
            title,
            readyInMinutes,
            image,
            aggregateLikes,
            vegan,
            vegetarian,
            glutenFree
        } = data;
        return {
            id:id,
            title:title,
            readyInMinutes:readyInMinutes,
            image:image,
            aggregateLikes:aggregateLikes,
            vegan:vegan,
            vegetarian:vegetarian,
            glutenFree:glutenFree
        }
    })
}

async function getRecipesPreview(recipes_ids_list){
    let promises = [];  
    for (let i = 0 ; i < recipes_ids_list.length; i ++) {        
        promises.push(getRecipeDetails(recipes_ids_list[i]));        
    }
    let info_res = await Promise.all(promises);
    return info_res;
}


async function getRandomThreeRecipes(){ 
    let random_pool = await getRandomRecipes();
    let filtered_random_pool = random_pool.data.recipes.filter((random) => (random.instructions != ""));
    if (filtered_random_pool.length < 3){
        return getRandomThreeRecipes();
    }
    return extractPreviewRecipesDetails([filtered_random_pool[0],filtered_random_pool[1],filtered_random_pool[2]]);
}


async function recipeSearch(query, number, cuisine, diet, intolerance){
    let seach_results = await getSeachResults(query, number, cuisine, diet, intolerance);   
    let all_recipes = []
    for (let i = 0; i < seach_results.data.results.length; i++){
        if (i == number)
            break;
        all_recipes.push(seach_results.data.results[i]);
    }    
    return  extractPreviewRecipesDetails(all_recipes);    
}

exports.getRecipesPreview = getRecipesPreview;
exports.getRecipeDetails = getRecipeDetails;
exports.recipeSearch = recipeSearch;
exports.getRandomThreeRecipes = getRandomThreeRecipes;
exports.getRecipeAnalyzed = getRecipeAnalyzed;