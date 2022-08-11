-- Active: 1659103822858@@127.0.0.1@3306@mydb
-- CREATE DATABASE mydb

CREATE TABLE Recipe (  
    recipeId INT NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    imageUrl VARCHAR(512) NOT NULL,
    title VARCHAR(255) NOT NULL,
    totalTime VARCHAR(255) NOT NULL,
    popularity VARCHAR(255) NOT NULL,
    vegan BOOLEAN NOT NULL,
    gluten BOOLEAN NOT NULL
);


CREATE TABLE users (      
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255)  NOT NULL,
    firstName VARCHAR(512) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    cuntry VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
)AUTO_INCREMENT=1;


CREATE TABLE favoriteRecipes (  
    user_id INT NOT NULL,
    recipe_id INT NOT NULL
);

CREATE TABLE userRecipes (  
    recipe_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,    
    imageUrl VARCHAR(512) NOT NULL,
    title VARCHAR(255) NOT NULL,
    totalTime INT NOT NULL,
    popularity VARCHAR(255) NOT NULL,
    vegan BOOLEAN NOT NULL,
    gluten BOOLEAN NOT NULL,
    ingredients VARCHAR(1024) NOT NULL,
    instructions VARCHAR(1024) NOT NULL,
    servings INT NOT NULL
)AUTO_INCREMENT=1;


CREATE TABLE userHistory (  
    recipe_id INT NOT NULL,
    user_id INT NOT NULL,    
    recipe_count int NOT NULL PRIMARY KEY AUTO_INCREMENT
)AUTO_INCREMENT=1;


CREATE TABLE familyRecipes (  
    recipeId INT NOT NULL PRIMARY KEY,
    familyOwner VARCHAR(255) NOT NULL,
    recipeName VARCHAR(255) NOT NULL,
    occasion VARCHAR(255) NOT NULL,
    ingredients VARCHAR(2096) NOT NULL,
    instructions VARCHAR(2096) NOT NULL,
    recipeImage VARCHAR(255) NOT NULL
);


INSERT INTO familyRecipes VALUES (1, 'Aunt Gordon Ramsay', 'Beef Wellington', 'Hanukkah', 'a good beef fillet (preferably Aberdeen Angus) of around 1kg/2lb 4oz. 3 tbsp olive oil. 250g/9oz chestnut mushroom, include some wild ones if you like. 50g/2oz butter. 1 large sprig fresh thyme. 100ml/3.5 fl oz dry white wine. 12 slices prosciutto. 500g/1lb 2oz pack puff pastry, thawed if frozen. a little flour, for dusting. 2 egg yolks beaten with 1 tsp water.', 'Heat oven to 220C/fan 200C/gas 7. Sit the 1kg beef fillet on a roasting tray, brush with 1 tbsp olive oil and season with pepper, then roast for 15 mins for medium-rare or 20 mins for medium. While the beef is cooling, chop 250g chestnut (and wild, if you like) mushrooms as finely as possible so they have the texture of coarse breadcrumbs. Heat 2 tbsp of the olive oil and 50g butter in a large pan and fry the mushrooms on a medium heat, with 1 large sprig fresh thyme, for about 10 mins stirring often, until you have a softened mixture. Season the mushroom mixture, pour over 100ml dry white wine and cook for about 10 mins until all the wine has been absorbed. Remove the mushroom duxelle from the pan to cool and discard the thyme. Overlap two pieces of cling film over a large chopping board. Lay 12 slices prosciutto on the cling film, slightly overlapping, in a double row. Spread half the duxelles over the prosciutto, then sit the fillet on it and spread the remaining duxelles over. Unravel the fillet from the cling film and sit it in the centre of the smaller strip of pastry. Brush the Wellington with a little more egg yolk and cook until golden and crisp – 20-25 mins for medium-rare beef, 30 mins for medium.', 'https://en.wikipedia.org/wiki/Beef_Wellington#/media/File:Beef_Wellington_2019.jpg'  );

 INSERT INTO familyRecipes
VALUES (2,
 "Grandfather Abraham Lincoln",
 "Thanksgiving Turkey",
 "Thanksgiving",
 "2 tablespoons dried parsley. 2 tablespoons ground dried rosemary. 2 tablespoons rubbed dried sage. 2 tablespoons dried thyme leaves. 1 tablespoon lemon-pepper seasoning. 1 tablespoon salt. 1 (15 pound) whole turkey, neck and giblets removed. 2 stalks celery, chopped. 1 medium orange, cut into wedges. 1 medium onion, chopped. 1 medium carrot, chopped. 1 (750 milliliter) bottle champagne.",
 "Stir together parsley, rosemary, sage, thyme, lemon-pepper, and salt in a small bowl. Rub herb mixture into cavity of turkey, then stuff with celery, orange, onion, and carrot. Truss if desired, then place turkey into the roasting pan. Pour champagne and chicken broth over turkey, making sure to get some champagne in cavity. Bring aluminum foil over top of turkey and seal; try to keep foil from touching turkey. Bake turkey in the preheated oven for 2 1/2 to 3 hours until juices run clear. Uncover turkey and continue baking until skin turns golden brown, 30 minutes to 1 hour longer. An instant-read thermometer inserted into the thickest part of thigh, near the bone, should read 180 degrees F (82 degrees C). Remove turkey from the oven, cover with two sheets of aluminum foil, and allow to rest in a warm area before slicing, 10 to 15 minutes.",
 "https://en.wikipedia.org/wiki/Thanksgiving_dinner#/media/File:Thanksgiving_Turkey_2021_(cropped).jpg"
 );

 
 INSERT INTO familyRecipes
VALUES (3,
 "Mother Teresa",
 "Cheesecake",
 "Birthdays",
 "1 cup graham cracker crumbs. ¼ cup unsalted butter, melted. 2 tablespoons white sugar. 4 (8 ounce) packages full-fat cream cheese, at room temperature. 15 cups white sugar. 1 cup full-fat sour cream, at room temperature. 1 tablespoon vanilla extract. 4 large eggs, at room temperature.",
 "Preheat the oven to 325 degrees F (165 degrees C). Grease a 9-inch springform pan. Combine graham cracker crumbs, melted butter, and sugar for crust in a bowl until mixture resembles wet sand. Transfer to the prepared pan. Use the bottom of a measuring cup to press crumbs firmly into an even layer. Bake crust in the preheated oven until golden brown, 8 to 10 minutes. Remove from the oven and let sit on a wire rack until completely cool. Leave the oven on. While the crust is cooling, beat cream cheese in a stand mixer fitted with the paddle attachment on low speed until smooth. Add sugar, sour cream, and vanilla. Scrape down the bottom and sides of the bowl and continue to beat until combined. Gently whisk one egg with a fork in a small bowl; add to the cream cheese mixture and beat just until combined. Repeat with each remaining egg, whisking and adding just one at a time. Place the springform pan in a large roasting pan and move it to the lower rack of the oven. Pour 2 inches of boiling water into the roasting pan. Bake cheesecake until edges are puffed and surface is firm except for a small spot in the center that will jiggle when the pan is gently shaken, about 1 ½ hours. Tent the cheesecake with a sheet of foil if the top is browning too much during baking.",
 "https://en.wikipedia.org/wiki/Cheesecake#/media/File:South-African_Rose_baked_Cheese_Cake.JPG"
 );