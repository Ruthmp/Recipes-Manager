import {getSelectedCategories, getSelectedDifficulties, getSelectedTimes, inputSearch, modal, modalSearchInput} from "./dom.js"; 

//-- Search recipes --
export function searchBy (recipesList, query){
    if(!query) return recipesList;

const lowerQuery = query.toLowerCase();

return recipesList.filter(recipe =>{
    const matchName = recipe.name.toLowerCase().includes(lowerQuery);

    const matchIngredients = recipe.ingredients.some (ing =>
        ing.ingredient.toLowerCase().includes(lowerQuery)
    );
    return matchName || matchIngredients;
});
}

//-- Filters --

export function applyFilters(items){

    const query = inputSearch.value.trim();
    let filteredItems = searchBy(items, query);

    const selectedCategories = getSelectedCategories();
    const selectedDifficulties = getSelectedDifficulties();
    const selectedTimes = getSelectedTimes();
    

    return filteredItems.filter (item =>{
        const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category);
        const matchDifficulty = selectedDifficulties.length === 0 || selectedDifficulties.includes(item.difficulty);
        const matchTime = selectedTimes.length === 0 || selectedTimes.some(limit => Number(item.time) <= Number(limit));

        return matchCategory && matchDifficulty && matchTime;
    })
}

//-- Clear Filters --

export function clearFilters() {
    const checkboxes = document.querySelectorAll('input[type=checkbox]');
    checkboxes.forEach( checkbox =>{
        checkbox.checked = false;
    })
}


