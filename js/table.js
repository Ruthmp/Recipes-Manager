//-- Print cell --
export function handleRecipeSelect (recipe, cell){
    if (!cell) return

        cell.textContent = recipe.name;
        cell.dataset.recipeId = recipe.id;

        const cellIndex = Array.from (document.querySelectorAll('.meal-cell')).indexOf(cell);
        const savedMeals = JSON.parse(localStorage.getItem('meals')) || {};
        savedMeals [cellIndex]={
            id:recipe.id,
            name:recipe.name
        };
        localStorage.setItem('meals', JSON.stringify(savedMeals));
    
    document.getElementById('recipe-modal').style.display = 'none';
    modalSearchInput.value = '';
    document.getElementById("modal-recipes-list").innerHTML = '';
}

//-- Remove cell --
export function removeRecipefromCell (cell){
    if (!cell) return

    //clear cell
    cell.textContent = "";
    delete cell.dataset.recipeId

    // update localstorage
    const cells = document.querySelectorAll('.meal-cell');
    const cellIndex = Array.from(cells).indexOf(cell);
    const savedMeals = JSON.parse(localStorage.getItem('meals')) || {};
    delete savedMeals[cellIndex];
    localStorage.setItem('meals', JSON.stringify(savedMeals));
}