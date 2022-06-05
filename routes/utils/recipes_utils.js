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

async function getRandomRecipes(){ // not currently working
    const response = await axios.get(`${api_domain}/random`,{
        params: {
            number: 10,
            apiKey: process.env.spooncular_apiKey
        }
    });
    return response;
}


async function getRecipeDetails(recipe_id) {
    let recipe_info = await getRecipeInformation(recipe_id);
    let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree } = recipe_info.data;
    return {
        id: id,
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        popularity: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
        
    }
}

async function getRecipesPreview(recipes_ids_list){
    let promises = [];
    recipes_ids_list.map((id) =>{
        promises.push(getRecipeInformation(id));
    });
    let info_res = await Promise.all(promises);
    return getRecipeDetails(info_res)
}

async function getRandomThreeRecipes(){ // not currently working. has an error that says it isnt a function
    let random_pool = await getRandomRecipes();
    let filtered_random_pool = random_pool.data.recipes.filter((random) => (random.instructions != "") && (random.id && random.title && random.readyInMinutes && random.image && random.popularity && random.vegan && random.vegetarian && random.glutenFree));
    if (filtered_random_pool.length < 3){
        return getRandomThreeRecipes();
    }
    return ([getRecipeDetails(filtered_random_pool[0]),getRecipeDetails(filtered_random_pool[1]),getRecipeDetails(filtered_random_pool[2])]);
}


exports.getRecipeDetails = getRecipeDetails;

exports.getRandomThreeRecipes = getRandomThreeRecipes;
