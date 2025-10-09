import{modalSearchInput } from "./dom.js"; 
import{renderCell} from "./render.js";
//-- Print cell --
export function handleRecipeSelect (recipe, cell){
    if (!cell) return

    const savedMeals = JSON.parse(localStorage.getItem('meals')) || {};
    const cells = Array.from(document.querySelectorAll('.meal-cell'));
    const index = cells.indexOf(cell);

    // Si no hay array, lo inicializamos
    if (!savedMeals[index]) savedMeals[index] = { recipes: [] };

    if (!Array.isArray(savedMeals[index].recipes)) {
        savedMeals[index].recipes = [{ name: savedMeals[index].name, id: savedMeals[index].id }];
        delete savedMeals[index].name;
        delete savedMeals[index].id;
    }

    // Agregar la receta seleccionada
    savedMeals[index].recipes.push({ name: recipe.name, id: recipe.id });
    localStorage.setItem('meals', JSON.stringify(savedMeals));

    // Mostrar en la celda
    renderCell(cell, savedMeals[index].recipes);
    // Limpiar modal
    document.getElementById('recipe-modal').style.display = 'none';
    modalSearchInput.value = '';
    document.getElementById("modal-recipes-list").innerHTML = '';
}

//-- Remove cell --
export function clearCell (cell){
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

//-- Remove table --

export function clearAllCells(){
    const cells = document.querySelectorAll(".meal-cell");
    cells.forEach(cell => clearCell(cell));
}
//-- Add to cell --

export function addToCell (cell){
    if (!cell) return
    const inputValue = modalSearchInput.value.trim();
    if (!inputValue) return;
    

    //save localStorage

    const savedMeals = JSON.parse(localStorage.getItem("meals")) || {};
    const cells = Array.from (document.querySelectorAll(".meal-cell"));
    const index = cells.indexOf(cell);

    if (!savedMeals[index]) savedMeals[index] = { recipes: [] };
    if (!Array.isArray(savedMeals[index].recipes)) savedMeals[index].recipes = [];

    savedMeals[index].recipes.push ({name: inputValue, id : null});
    localStorage.setItem("meals", JSON.stringify(savedMeals));
    
    renderCell(cell, savedMeals[index].recipes);
}
