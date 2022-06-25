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

async function getUserRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select * from userrecipes where user_id='${user_id}'`);
    return recipes_id;
}

async function getHistoryRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select DISTINCT recipe_id from userhistory where user_id='${user_id}' ORDER BY recipe_count desc`);
    return recipes_id;
}

exports.getHistoryRecipes = getHistoryRecipes;
exports.markWatched = markWatched;
exports.getUserRecipes = getUserRecipes
exports.markAsFavorite = markAsFavorite;
exports.getFavoriteRecipes = getFavoriteRecipes;
