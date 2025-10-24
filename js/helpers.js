import { form, ingredientList, instructionsList, btnAddIngredient, btnAddInstruction, btnSubmitRecipe, pageInfo, prevPageBtn, nextPageBtn } from "./dom.js"; 
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

//-- Toggle Buttons --
export function initToggleButtons (){
    const elements = document.querySelectorAll(".toggle-btn, .toggle-link");

    elements.forEach(el=>{
        const targetId = el.dataset.target;
        const target = document.getElementById(targetId);
        if(!target) return;
        
        const showText = el.dataset.showText || "Mostrar";
        const hideText = el.dataset.hideText || "Ocultar";

        el.addEventListener('click', (e) => {
            e.preventDefault();

            //link
            if (el.classList.contains("toggle-link")){
                if(!target.classList.contains("active")){
                    target.classList.add("active");
                    target.style.maxHeight= target.scrollHeight + "px";

                    const toggleBtn = document.querySelector(`.toggle-btn[data-target="${targetId}"]`);
                    if (toggleBtn){
                        toggleBtn.textContent = hideText;
                    }

                }
                target.scrollIntoView({behavior: "smooth", block: "start"});
                return;
            }

            //Button
            const isActive = target.classList.toggle("active");
            target.style.maxHeight = isActive ? target.scrollHeight + "px" : "";
            el.textContent = isActive ? hideText : showText;
        });
    });
}

//-- Image to base64--

export function convertImageToBase64(file){
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

//-- Pagination --
export function updatePagination(recipesArr){
    const totalPages = Math.ceil(recipesArr.length/ window.recipesPerPage);
    pageInfo.textContent = `Página ${window.currentPage} de ${totalPages}`;
    prevPageBtn.disabled = window.currentPage === 1;
    nextPageBtn.disabled = window.currentPage === totalPages;

}

//-- Update recipe per page --
export function updateRecipesPerPage(){
    if (window.innerWidth <= 600){
    window.recipesPerPage = 4; 
    } else if (window.innerWidth <= 900){
        window.recipesPerPage = 6;
    } else {
    window.recipesPerPage = 8;
    }
}

//-- Detect if the user’s device has a touch screen
export function isTouchDevice() {
    return (
      'ontouchstart' in window ||       // Touch events 
      navigator.maxTouchPoints > 0 ||    // Number of touch points
      navigator.msMaxTouchPoints > 0     // For older IE/Edge
    );
}
// -- Function to advice touch users --
export function updateTableAdvice(){
    const advice = document.querySelector("table-instructions");
    if(!advice) return;

    if (isTouchDevice()){
        advice.innerHTML= '💡 <strong>Consejo:</strong> toca una celda para añadir o editar una receta, y toca prolongadamente para eliminar su contenido.';
 } else{
    advice.innerHTML= '💡 <strong>Consejo:</strong> haz clic en una celda para añadir o editar una receta, y <em>doble clic</em> para eliminar su contenido.';
 }
}
