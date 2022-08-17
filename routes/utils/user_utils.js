const e = require("express");
const { default: Axios } = require("axios");
const DButils = require("./DButils");

async function markAsFavorite(user_id, recipe_id){
    await DButils.execQuery(`insert into FavoriteRecipes values ('${user_id}',${recipe_id})`);
}

async function markWatched(user_id, recipe_id){
    await DButils.execQuery(`insert into userhistory values ('${recipe_id}','${user_id}',0)`);
}

async function getFavoriteRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select DISTINCT recipe_id from FavoriteRecipes where user_id='${user_id}'`);
    return recipes_id;
}

async function getUserRecipes(user_id){ // add select (columns) from..
    const recipes_id = await DButils.execQuery(`select * from userrecipes where user_id='${user_id}'`);
    return recipes_id;
}

async function getHistoryRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select DISTINCT recipe_id from userhistory where user_id='${user_id}' ORDER BY recipe_count desc`);
    return recipes_id;
}

async function getLatestThree(user_id){
    const recipes_id = await DButils.execQuery(`select DISTINCT recipe_id from userhistory where user_id='${user_id}' ORDER BY recipe_count desc LIMIT 3`);
    return recipes_id;
}


async function getUserMadeRecipe(user_id,recipe_id){
    DButils.execQuery(`select recipe_id from userhistory where user_id='${user_id}' ORDER BY recipe_count desc LIMIT 3`);
    return recipes_id;
}


async function getMealRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select * from userMeals where user_id='${user_id}' ORDER BY recipe_count`);
    return recipes_id;
}

async function addRecipeToMeal(user_id, recipe_details){
    const recipe_already_added = await DButils.execQuery(`select count(*) from userMeals where user_id='${user_id}'and recipe_id =  '${recipe_details.id}'`);
    if (Object.values(recipe_already_added[0])[0] != 0)
        return;

    const has_recipes = await DButils.execQuery(`select count(*) from userMeals where user_id='${user_id}'`);
    let max_num;
    if (Object.values(has_recipes[0])[0] != 0){
        let order_value = await DButils.execQuery(`select MAX(recipe_count) from userMeals where user_id='${user_id}'`);
        max_num = Object.values(order_value[0])[0] +1;        
    }
    else{
        max_num = 1;
    }
    await DButils.execQuery(`insert into userMeals values ('${user_id}','${recipe_details.id}','${recipe_details.title}','${recipe_details.imageUrl}','${max_num}')`);   
}

async function chageMealOrderAbove(user_id, recipe_id, recipe_count){
    let otherId = await DButils.execQuery(`select recipe_id from userMeals where user_id='${user_id}' and recipe_count = '${recipe_count - 1}'`);
    otherId = Object.values(otherId[0])[0];
    DButils.execQuery(`update userMeals set recipe_count = '${recipe_count - 1}' where user_id='${user_id}' and recipe_id ='${recipe_id}'`);
    DButils.execQuery(`update userMeals set recipe_count = '${recipe_count}' where user_id='${user_id}' and recipe_id ='${otherId}'`);
}

async function chageMealOrderBellow(user_id,recipe_id ,recipe_count){
    let otherId = await DButils.execQuery(`select recipe_id from userMeals where user_id='${user_id}' and recipe_count = '${recipe_count + 1}'`);
    otherId = Object.values(otherId[0])[0];
    DButils.execQuery(`update userMeals set recipe_count = '${recipe_count + 1}' where user_id='${user_id}' and recipe_id ='${recipe_id}'`) ;
    DButils.execQuery(`update userMeals set recipe_count = '${recipe_count}' where user_id='${user_id}' and recipe_id ='${otherId}'`);    

}

async function RemoveRecipeFromMeal(user_id, recipe_id){
    const count = await DButils.execQuery(`select recipe_count from userMeals where user_id='${user_id}' and recipe_id='${recipe_id}' `);
    DButils.execQuery(`delete from userMeals where user_id='${user_id}' and recipe_id='${recipe_id}' `);
    DButils.execQuery(`update userMeals set recipe_count = recipe_count - 1 where recipe_count > '${Object.values(count[0])[0]}' `);        
}

async function resetMeal(user_id){
    await DButils.execQuery(`delete from userMeals where user_id='${user_id}'`);
}


exports.getUserMadeRecipe=getUserMadeRecipe;
exports.getLatestThree = getLatestThree;
exports.getHistoryRecipes = getHistoryRecipes;
exports.markWatched = markWatched;
exports.getUserRecipes = getUserRecipes
exports.markAsFavorite = markAsFavorite;
exports.getFavoriteRecipes = getFavoriteRecipes;
exports.getMealRecipes = getMealRecipes;
exports.addRecipeToMeal = addRecipeToMeal;
exports.chageMealOrderAbove = chageMealOrderAbove;
exports.chageMealOrderBellow = chageMealOrderBellow;
exports.RemoveRecipeFromMeal = RemoveRecipeFromMeal;
exports.resetMeal = resetMeal;