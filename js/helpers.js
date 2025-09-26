import { form, ingredientList, instructionsList, btnAddIngredient, btnAddInstruction, btnSubmitRecipe } from "./dom.js"; 
import { currentIngredients, currentInstructions, resetState } from "./recipes.js"; 
import { renderInlineList } from "./render.js"; 

//--Reset Form--

/**
 * Resets the form and related states
 * @return {void}
 */
export function resetForm(){
    resetState();
    renderInlineList(ingredientList, currentIngredients);
    renderInlineList(instructionsList, currentInstructions);
    form.reset();
    const checkedDifficulty = form.querySelector('input[name="difficulty"]:checked');
    if (checkedDifficulty) checkedDifficulty.checked = false;
    btnAddIngredient.textContent = "Añadir"
    btnAddInstruction.textContent = "Añadir";
    btnSubmitRecipe.textContent = "Añadir receta";
}

//--Capitalize first letter--
/**
 * 
 * @param {string} input - Input string to capitalize the first letter
 * @returns {void} Capitalizes the first letter of the input string
 */
export function capitalizeFirstLetter(input){
    if(!input.value) return;
    const firstLetter = input.value.search(/[a-zA-Z]/);
    if (firstLetter === -1) return; // No alphabetic character found
    input.value=
    input.value.slice(0, firstLetter) +
    input.value.charAt(firstLetter).toUpperCase() + 
    input.value.slice(firstLetter + 1);
}
//-- Scroll recipe --
let editingScrollTargetId = null;

export function setEditingScrollTarget(id){
    editingScrollTargetId = id;
}
export function getEditingScrollTarget(){
    return editingScrollTargetId;
}
export function clearEditingScrollTarget(){
    editingScrollTargetId = null;
}