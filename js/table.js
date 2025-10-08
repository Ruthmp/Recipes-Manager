import{modalSearchInput} from "./dom.js"; 
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

    // save localstorage
    const cells = document.querySelectorAll('.meal-cell');
    const cellIndex = Array.from(cells).indexOf(cell);
    const savedMeals = JSON.parse(localStorage.getItem('meals')) || {};
    delete savedMeals[cellIndex];
    localStorage.setItem('meals', JSON.stringify(savedMeals));
}

//-- Add to cell --

export function addToCell (cell){
    if (!cell) return
    const inputValue = modalSearchInput.value.trim();
    cell.textContent = inputValue;

    //save localStorage

    const savedMeals = JSON.parse(localStorage.getItem("meals")) || {};
    const cells = Array.from (document.querySelectorAll(".meal-cell"));
    const index = cells.indexOf(cell);

    savedMeals[index] = {name: inputValue, id : null};
    localStorage.setItem("meals", JSON.stringify(savedMeals));
    
}