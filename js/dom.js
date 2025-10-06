//--Selectors--

//-- Form elements --
export const form = document.getElementById("form-add-recipe");
export const inputName = document.getElementById("recipe-name");
export const inputQuantity = document.getElementById("quantity-input");
export const selectMeasure = document.getElementById("measure-select");
export const inputIngredient = document.getElementById("ingredient-input");
export const ingredientList = document.getElementById("ingredient-list");
export const prepTime = document.getElementById("prep-time");
export const selectCategory = document.getElementById("recipe-category");
export const instructionsInput = document.getElementById("instructions-input");
export const instructionsList = document.getElementById("instructions-list");
export const btnAddIngredient = document.getElementById("btnAddIngredient");
export const btnAddInstruction = document.getElementById("btnAddInstruction");

export const btnSubmitRecipe = form.querySelector('button[type="submit"]');

//-- Search elements --
export const inputSearch = document.getElementById("search-input");
export const btnSearchName = document.getElementById("btn-search-name");
export const getSelectedCategories= ()=>
    Array.from (document.querySelectorAll('input[name=category]:checked'))
    .map(checkbox => checkbox.value);

export const getSelectedDifficulties = ()=>
    Array.from(document.querySelectorAll('input[name=difficulty]:checked'))
    .map(checkbox => checkbox.value);

export const getSelectedTimes = ()=>
    Array.from(document.querySelectorAll('input[name=time]:checked'))
    .map(checkbox => checkbox.value);

export const btnClearSearch = document.getElementById("btn-clear-search");

export const formFilter = document.getElementById("search-form");

export const btnSubmitFilter = formFilter.querySelector('button[type="submit"]')
export const btnClearFilters = document.getElementById('clear-filters')

//-- Toggle form button --
export const toggleBtn = document.getElementById("toggle-filters");
export const filterDiv = document.getElementById("filter");

export const loadMoreBtn = document.getElementById("load-more");

//-- Floating Modal form elements --

export const modal = document.getElementById('recipe-modal');
export const modalRecipesList= document.getElementById('modal-recipes-list');
export const modalSearchInput = document.getElementById('modal-search-input');
export const cancelModalBtn = document.getElementById('cancel-modal');
export const clearCell = document.getElementById('clear-cell')