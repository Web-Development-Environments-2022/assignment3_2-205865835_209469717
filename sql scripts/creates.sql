CREATE DATABASE mydb

-- CREATE TABLE Recipe (  
--     recipeId INT NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
--     imageUrl VARCHAR(512) NOT NULL,
--     title VARCHAR(255) NOT NULL,
--     totalTime VARCHAR(255) NOT NULL,
--     popularity VARCHAR(255) NOT NULL,
--     vegan BOOLEAN NOT NULL,
--     gluten BOOLEAN NOT NULL
-- );


CREATE TABLE users (      
    userId INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255)  NOT NULL,
    firstName VARCHAR(512) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    cuntry VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
)AUTO_INCREMENT=1;


-- CREATE TABLE favoriteRecipes (  
--     username VARCHAR(255) NOT NULL,
--     recipeId INT NOT NULL
-- );

CREATE TABLE userRecipes (  
    userId INT NOT NULL PRIMARY KEY COMMENT 'Primary Key',    
    imageUrl VARCHAR(512) NOT NULL,
    title VARCHAR(255) NOT NULL,
    totalTime VARCHAR(255) NOT NULL,
    popularity VARCHAR(255) NOT NULL,
    vegan BOOLEAN NOT NULL,
    gluten BOOLEAN NOT NULL,
    ingredients VARCHAR(1024) NOT NULL,
    instructions VARCHAR(1024) NOT NULL,
    servings INT NOT NULL
);


-- CREATE TABLE familyRecipes (  
--     username VARCHAR(255) NOT NULL,
--     recipeId INT NOT NULL
-- );

CREATE TABLE FamilyRecipes (  
    imageUrl VARCHAR(512) NOT NULL,
    title VARCHAR(255) NOT NULL,
    recipeOwner VARCHAR (256) NOT NULL,
    cookingEvent VARCHAR(512) NOT NULL,
    popularity VARCHAR(255) NOT NULL,
    vegan BOOLEAN NOT NULL,
    gluten BOOLEAN NOT NULL,
    ingredients VARCHAR(1024) NOT NULL,
    instructions VARCHAR(1024) NOT NULL,
    servings INT NOT NULL
);

