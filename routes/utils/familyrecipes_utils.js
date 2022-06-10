const axios = require("axios");
const api_domain = "https://api.spoonacular.com/familyrecipes";
const DButils = require("./DButils");




async function getFamilyRecipes() {

    let getRecipes = await DButils.execQuery("SELECT * FROM familyrecipes");
    return getRecipes
};

exports.getFamilyRecipes = getFamilyRecipes;
