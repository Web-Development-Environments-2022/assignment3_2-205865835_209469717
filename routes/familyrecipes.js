var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const familyrecipes_utils = require("./utils/familyrecipes_utils");

  router.get("/getFamRecipes", async (req, res, next) => {
    try{
      let famRecipes = await familyrecipes_utils.getFamilyRecipes();
      res.send(famRecipes);
    }catch (error){
      next(error);
    }
  });


  module.exports = router;