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
    recipes_ids_list.map((id) =>{
        promises.push(getRecipeInformation(id));
    });
    let info_res = await Promise.all(promises);
    return getRecipeDetails(info_res)
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