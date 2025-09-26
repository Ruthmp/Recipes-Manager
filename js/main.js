import { form, inputName, inputIngredient, prepTime, instructionsInput, btnAddIngredient, btnAddInstruction, selectCategory, toggleBtn, filterDiv } from "./dom.js"; 
import { currentIngredients, currentInstructions, recipes } from "./recipes.js"; 
import { Recipe, addIngredientFromInput, addInstructionFromInput } from "./recipes.js"; 
import { renderRecipesList } from "./render.js"; 
import { resetForm, capitalizeFirstLetter, getEditingScrollTarget, clearEditingScrollTarget, initToggleButtons } from "./helpers.js";
import { getEditingId, setEditingId } from "./recipes.js";
import { saveRecipes } from "./recipes.js";

document.addEventListener('DOMContentLoaded', () =>{

    // --- Listener to Enter ---
    inputIngredient.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
        e.preventDefault();
        addIngredientFromInput();
        }
    });

    instructionsInput.addEventListener('keydown', (e) =>{
        if (e.key ==='Enter'){
            e.preventDefault();
            addInstructionFromInput();
        }
    });

   // --- Listener to click ---
    btnAddIngredient.addEventListener('click', ()=>{
        addIngredientFromInput()
    })

    btnAddInstruction.addEventListener('click', ()=>{
        addInstructionFromInput()
    })

     //-- Collect form data--
    form.addEventListener('submit', (e) =>{
        e.preventDefault();
        
        
        const difficulty= form.querySelector('input[name="difficulty"]:checked')?.value || '';
        if(getEditingId() ===null){
        const newRecipe = new Recipe(
            inputName.value,
            prepTime.value,
            difficulty,
            selectCategory.value,
            currentIngredients,
            currentInstructions

        )
        recipes.push(newRecipe)
    } else {
        const recipeToEdit = recipes.find(r => r.id === getEditingId());
        recipeToEdit.name = inputName.value;
        recipeToEdit.time = prepTime.value;
        recipeToEdit.difficulty = difficulty;
        recipeToEdit.category = selectCategory.value;
        recipeToEdit.ingredients = [...currentIngredients];
        recipeToEdit.instructions = [...currentInstructions];
        setEditingId(null);
    } 
        saveRecipes();
        renderRecipesList()
    

        //--Reset form--
        resetForm();
    })
    //--Aplicate capitalize letter--
    inputName.addEventListener('input', ()=>{
        capitalizeFirstLetter(inputName);
    })
    inputIngredient.addEventListener('input', ()=>{
        capitalizeFirstLetter(inputIngredient);
    })
    instructionsInput.addEventListener('input', ()=>{
        capitalizeFirstLetter(instructionsInput);
    })

    //--Reset Form--

    form.addEventListener('reset', () =>{
        resetForm();
        
        const targetId = getEditingScrollTarget();
        
        if (targetId){
            const recipeElement = document.querySelector(`#recipes-list article[data-id="${targetId}"]`);
            if(recipeElement){
                recipeElement.scrollIntoView({behavior: 'smooth', block: 'center'});
            }else{
                console.warn('No se encontró el artículo con data-id:', targetId)
            }
            clearEditingScrollTarget ();
        }
    })
    
    renderRecipesList();

    //--Toggle filters --
    initToggleButtons();
});