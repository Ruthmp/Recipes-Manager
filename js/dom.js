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

//-- Toggle form button --
export const toggleBtn = document.getElementById("toggle-filters");
export const filterDiv = document.getElementById("filter");