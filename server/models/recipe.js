const db = require('../../database');

const findRecipe = (recipeId) => {
  const queryString = `
    SELECT 
      recipe_id AS recipeId, 
      username, 
      favorited_amt AS favoritedCount, 
      recipe_name AS recipeName, 
      description, 
      active_time AS activeTime, 
      total_time AS totalTime,
      photo, 
      instructions,
      ingredient_name AS ingredientName,
      measurement_unit AS measurementUnit,
      amount_int AS amount,
      meal_type AS mealType, 
      protein,
      serving_size AS servingSize, 
      created_at AS createdAt
    FROM (
            SELECT *
            FROM (
                SELECT *
                FROM (
                    SELECT
                        recipe_id,
                        amount_int,
                        measurement_unit,
                        ingredient_name 
                    FROM base_schema.ingredients, base_schema.ingredient_list 
                    WHERE ingredients.macro_ingredient_id = ingredient_list.macro_ingredient_id
                ) AS recipe_ingredients, base_schema.recipes
                WHERE recipe_ingredients.recipe_id = recipes.id) AS ingredient_recipe
            WHERE ingredient_recipe.id = $1) AS detailed_recipe, (
                SELECT user_id, username FROM base_schema.users
            ) AS user_name
    WHERE detailed_recipe.user_id = user_name.user_id`;
    return db.query(queryString, [recipeId])
}

const findRecipeCards = (mealType, protien, orderBy, count) => {
    if (count) {
        if (orderBy === 'newest') {
            const queryString = `
            SELECT recipe_name, username, description, photo FROM (SELECT *
              FROM base_schema.recipes, (
                  SELECT 
                  user_id,
                  username 
                  FROM base_schema.users) AS user_name
                  WHERE base_schema.recipes.user_id = user_name.user_id) AS full_recipe
              WHERE full_recipe.meal_type = $1::boolean[]
              AND full_recipe.protein = $2::boolean[]
              ORDER BY created_at DESC
              LIMIT $3
              `;
              return db.query(queryString, [mealType, protien, count])
        } else if (orderBy === 'favorite') {
            const queryString = `
            SELECT recipe_name, username, description, photo FROM (SELECT *
              FROM base_schema.recipes, (
                  SELECT 
                  user_id,
                  username 
                  FROM base_schema.users) AS user_name
                  WHERE base_schema.recipes.user_id = user_name.user_id) AS full_recipe
              WHERE full_recipe.meal_type = $1::boolean[]
              AND full_recipe.protein = $2::boolean[]
              ORDER BY favorited_amt DESC
              LIMIT $3
              `;
              return db.query(queryString, [mealType, protien, count])
        } else {
            const queryString = `
            SELECT recipe_name, username, description, photo FROM (SELECT *
              FROM base_schema.recipes, (
                  SELECT 
                  user_id,
                  username 
                  FROM base_schema.users) AS user_name
                  WHERE base_schema.recipes.user_id = user_name.user_id) AS full_recipe
              WHERE full_recipe.meal_type = $1::boolean[]
              AND full_recipe.protein = $2::boolean[]
              ORDER BY RANDOM()
              LIMIT $3
              `;
              return db.query(queryString, [mealType, protien, count])
        }
    } else {
        if (orderBy === 'newest') {
            const queryString = `
            SELECT recipe_name, username, description, photo FROM (SELECT *
              FROM base_schema.recipes, (
                  SELECT 
                  user_id,
                  username 
                  FROM base_schema.users) AS user_name
                  WHERE base_schema.recipes.user_id = user_name.user_id) AS full_recipe
              WHERE full_recipe.meal_type = $1::boolean[]
              AND full_recipe.protein = $2::boolean[]
              ORDER BY created_at DESC
              `;
              return db.query(queryString, [mealType, protien])
        } else if (orderBy === 'favorite') {
            const queryString = `
            SELECT recipe_name, username, description, photo FROM (SELECT *
              FROM base_schema.recipes, (
                  SELECT 
                  user_id,
                  username 
                  FROM base_schema.users) AS user_name
                  WHERE base_schema.recipes.user_id = user_name.user_id) AS full_recipe
              WHERE full_recipe.meal_type = $1::boolean[]
              AND full_recipe.protein = $2::boolean[]
              ORDER BY favorited_amt DESC
              `;
              return db.query(queryString, [mealType, protien])
        } else {
            const queryString = `
            SELECT recipe_name, username, description, photo FROM (SELECT *
              FROM base_schema.recipes, (
                  SELECT 
                  user_id,
                  username 
                  FROM base_schema.users) AS user_name
                  WHERE base_schema.recipes.user_id = user_name.user_id) AS full_recipe
              WHERE full_recipe.meal_type = $1::boolean[]
              AND full_recipe.protein = $2::boolean[]
              ORDER BY RANDOM()
              `;
              return db.query(queryString, [mealType, protien])
        }
    }
}


const getRecipeCount = () => {
    const queryString = `SELECT count(*) FROM base_schema.recipes`;
    return db.query(queryString)
}

const addRecipe = () => {

}

const addIngredients = () => {

}

const addToIngredientList = () => {

}

module.exports = {
    findRecipe,
    findRecipeCards,
    getRecipeCount,
    addRecipe,
    addIngredients,
    addToIngredientList
}