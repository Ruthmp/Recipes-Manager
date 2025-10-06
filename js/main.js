import { form, 
        inputName, 
        inputIngredient, 
        prepTime, 
        instructionsInput, 
        btnAddIngredient, 
        btnAddInstruction, 
        selectCategory, 
        btnSearchName, 
        inputSearch, 
        btnClearSearch, 
        formFilter,
        btnClearFilters,
        modalSearchInput,
        clearCell,
        cancelModalBtn,
        modal
        } from "./dom.js"; 
import { currentIngredients, currentInstructions, recipes } from "./recipes.js"; 
import { Recipe, addIngredientFromInput, addInstructionFromInput } from "./recipes.js"; 
import { renderRecipesList, renderRecipesNamesList } from "./render.js"; 
import { resetForm, capitalizeFirstLetter, getEditingScrollTarget, clearEditingScrollTarget, initToggleButtons } from "./helpers.js";
import { getEditingId, setEditingId } from "./recipes.js";
import { saveRecipes } from "./recipes.js";
import { searchBy, applyFilters, clearFilters } from "./search.js";
import { removeRecipefromCell } from "./table.js";

document.addEventListener('DOMContentLoaded', () =>{

    //--Load manage menu --
    const savedMeals = JSON.parse(localStorage.getItem('meals')) || {};
    const cells = document.querySelectorAll('.meal-cell');

    Object.keys(savedMeals).forEach(index=>{
        const cell = cells [index];
        if (!cell) return;
        cell.textContent = savedMeals[index].name;
        cell.dataset.recipeId = savedMeals[index].id;
    })

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

    //-- Search recipes --
    inputSearch.addEventListener('input', (e) =>{
        if(e.inputType !== "insertLineBreak") {
        capitalizeFirstLetter(inputSearch);
        }
    });

    btnSearchName.addEventListener('click', () =>{
        const query = inputSearch.value.trim();
        const results = searchBy (recipes, query);

        renderRecipesList(results);
    });
    inputSearch.addEventListener('keydown', (e)=>{
        if (e.key === 'Enter') {
            e.preventDefault(); //Prevent form submission

            const query = inputSearch.value.trim();
            const results = searchBy (recipes, query);
            renderRecipesList(results);
            }
    })
    btnClearSearch.addEventListener('click', () =>{
        inputSearch.value ='';
        clearFilters();
        renderRecipesList();
    });
    console.log(recipes);
    formFilter.addEventListener('submit', (e) =>{
        e.preventDefault();
        const results = applyFilters(recipes);
        renderRecipesList(results);

    });

    btnClearFilters.addEventListener('click', () =>{
        clearFilters();

        if (inputSearch.value.trim()!== ""){
            const results = applyFilters(recipes);
            renderRecipesList(results);
        }else{
        renderRecipesList();
        }
    })

    //!-- Floating Modal Form --

    let selectedCell;
    document.querySelectorAll('.meal-cell').forEach(cell =>{
        cell.addEventListener('click', () =>{
            selectedCell = cell;
            document.getElementById('recipe-modal').style.display = 'block';
            modalSearchInput.focus();
        })
    })

    cancelModalBtn.addEventListener('click', () =>{
        modal.style.display = 'none';
    })

    clearCell.addEventListener('click', () =>{
        if (selectedCell){
        removeRecipefromCell(selectedCell);
        }
    })

    modalSearchInput.addEventListener('input', () =>{
        capitalizeFirstLetter(modalSearchInput);
        const query = modalSearchInput.value.trim();
        query === ""
        ? renderRecipesNamesList([])
        :renderRecipesNamesList(searchBy(recipes, query), selectedCell);
    })

});