//-- Search recipes--
export function searchBy (recipesList, query){
    if(!query) return recipesList;

const lowerQuery = query.toLowerCase();

return recipesList.filter(recipe =>{
    const matchName = recipe.name.toLowerCase().includes(lowerQuery);

    const matchIngredients = recipe.ingredients.some (ing =>
        ing.ingredient.toLowerCase().includes(lowerQuery)
    );
    console.log(recipe.name, matchName, matchIngredients);
    return matchName || matchIngredients;
});
}