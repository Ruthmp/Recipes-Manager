import { 
    form, 
    inputName, 
    inputIngredient, 
    ingredientList, 
    prepTime, 
    selectCategory,
    instructionsInput, 
    instructionsList, 
    btnAddIngredient, 
    btnAddInstruction, 
    btnSubmitRecipe ,
    inputQuantity,
    selectMeasure,
    loadMoreBtn,
    recipesList,
    recipeModal
} from "./dom.js"; 
import { 
    currentIngredients, 
    currentInstructions, 
    recipes, 
    setEditingIngredientIndex, 
    setEditingInstructionIndex, 
    setEditingId,
    categoryLabels,
    dificultyLevelLabel 
} from "./recipes.js"; 
import { saveRecipes } from "./recipes.js";
import{setEditingScrollTarget} from "./helpers.js"
import{handleRecipeSelect} from "./table.js"

/**
 * 
 * @param {HTMLUListElement} ulEl - The unordered list element to render items into
 * @param {string[]} items - Array of strings to render as list items 
 * @returns {void} Renders an inline list with edit and delete buttons for each item
 */
export  function renderInlineList(ulEl, items){
    ulEl.innerHTML = '';
    items.forEach((item, idx)=>{
        const li = document.createElement('li');
        li.className = 'list-item';

        const span= document.createElement('span');
        span.textContent = typeof item ==='string' ? item: item.ingredient;
        li.appendChild(span);

        const btnDelete = document.createElement('button');
        btnDelete.type = 'button';
        btnDelete.className = 'btn-remove-item';
        btnDelete.setAttribute('aria-label', `Eliminar ${item}`);
        btnDelete.textContent = 'Borrar';
        btnDelete.addEventListener('click', ()=>{
            items.splice(idx, 1); 
            renderInlineList(ulEl, items);
        });
        li.appendChild(btnDelete);

        const btnEdit = document.createElement('button');
        btnEdit.type = 'button';
        btnEdit.className = 'btn-edit-item';
        btnEdit.setAttribute('aria-label', `Editar ${item}`);
        btnEdit.textContent = 'Editar';
        btnEdit.addEventListener('click', ()=>{
            const value= items[idx]

            if (ulEl.id === "ingredient-list"){
                const ing = currentIngredients[idx];
                inputIngredient.value = ing.ingredient; ;
                selectMeasure.value = ing.measure;
                inputQuantity.value = ing.quantity;
                inputIngredient.focus()
                setEditingIngredientIndex(idx);
                //Edit text button
                btnAddIngredient.textContent = "Guardar";
            } else if (ulEl.id === "instructions-list"){
                instructionsInput.value = value;
                instructionsInput.focus();
                setEditingInstructionIndex(idx);
                //Edit text button
                btnAddInstruction.textContent = "Guardar";
            }

        
        });
        li.appendChild(btnEdit);
        ulEl.appendChild(li); 
    });
}

//-- List recipes--
/**
 * 
 * @returns {void} Renders the list of recipes with edit and delete buttons
 */
export function renderRecipesList(recipesToRender = recipes, page = 1, append = false) {
    
    if (!recipesList) return;
    if(!append){
    recipesList.innerHTML = '';
    }
    const sortRecipes= [...recipesToRender].sort((a, b)=> a.name.localeCompare(b.name));
    const end = page * window.recipesPerPage;
    const paginated = sortRecipes.slice((page-1) * window.recipesPerPage, end);

    paginated.forEach(recipe => {
        const article = document.createElement('article');
        article.setAttribute('data-id', recipe.id.toString());
        const imgHTML = recipe.image 
        ? `<img src="${recipe.image}" alt="Foto de ${recipe.name}" class="recipe-thumb">`
        : `<img src="img/aguacate.png" alt="Imagen de comida" class="recipe-thumb">`;

        article.innerHTML = `
            <div class="recipes-list-class">
            ${imgHTML}
            <div class="recipe-text">
            <h3>${recipe.name}</h3>
            <p>Tiempo: ${recipe.time} min</p>
            <p>Dificultad: ${dificultyLevelLabel[recipe.difficulty]}</p>
            <p>Categoría: ${categoryLabels[recipe.category]}</p>
            </div>
            </div>
        `;

        article.addEventListener('click', () => openRecipeModal(recipe));
        recipesList.appendChild(article);
    });
    if (loadMoreBtn) {
        loadMoreBtn.style.display = end < sortRecipes.length ? 'block' : 'none';
    }
}

export function openRecipeModal(recipe) {
    
    if (!recipeModal) return;

        const imgHTML = recipe.image 
        ? `<img src="${recipe.image}" alt="Foto de ${recipe.name}" class="recipe-img-large">`
        : `<img src="img/aguacate.png" alt="Imagen de comida" class="recipe-img-large">`;

        recipeModal.innerHTML = `
            <div class="modal-recipes-content">
            <div class="modal-top">
            <div class="modal-img-container">
            ${imgHTML}
            </div>
            <div class="modal-info">
            <h3>${recipe.name}</h3>
            <p>Tiempo: ${recipe.time} min</p>
            <p>Dificultad: ${dificultyLevelLabel[recipe.difficulty]}</p>
            <p>Categoría: ${categoryLabels[recipe.category]}</p>
            </div>
            </div>
            <hr>
            <div class="modal-bottom">
            <div class="modal-ingredients">
            <ul><h4>Ingredientes:</h4>\n ${recipe.ingredients
            .map(i => `<li>${i.quantity ? i.quantity + ' ' : ''}${i.measure ? i.measure + ' ' : ''}${i.ingredient}</li>`)
            .join('')}</ul>
            </div>
            <div class="modal-instructions">
            <ol><h4>Instrucciones:</h4>\n ${recipe.instructions.map(i => `<li>${i}</li>`).join('')}</ol>
            </div>
            </div>
            <div class="modal-buttons">
            <button id="recipe-edit-btn">Editar</button>
            <button id="recipe-delete-btn">Eliminar</button>
            <button id="recipe-close-btn">Cerrar</button>
            </div>
            </div>
        `;
        recipeModal.classList.remove("hidden");

        //Button close
        document.getElementById("recipe-close-btn").addEventListener("click", () =>{
            recipeModal.classList.add("hidden");
        });

        // Button delete
        document.getElementById("recipe-delete-btn").addEventListener('click', () => {
            const index = recipes.findIndex(r => r.id === recipe.id);
            if (index > -1) {
                recipes.splice(index, 1);
                saveRecipes();
                renderRecipesList();
            }
        });

        // Button edit
        document.getElementById("recipe-edit-btn").addEventListener('click', () => {

            setEditingScrollTarget (recipe.id);

            setEditingId(recipe.id);
            inputName.value = recipe.name;
            prepTime.value = recipe.time;
            selectCategory.value = recipe.category;

            const difficultyInput = form.querySelector(`input[name="difficulty"][value="${recipe.difficulty}"]`);
            if (difficultyInput) difficultyInput.checked = true;

            // Keep the reference
            currentIngredients.splice(0, currentIngredients.length, ...recipe.ingredients);
            renderInlineList(ingredientList, currentIngredients);

            currentInstructions.splice(0, currentInstructions.length, ...recipe.instructions);
            renderInlineList(instructionsList, currentInstructions);

            btnSubmitRecipe.textContent = "Guardar receta";
            
            recipeModal.classList.add("hidden");

            setTimeout(()=>{
                form.scrollIntoView({behavior:'smooth', block: 'start'});
            }, 50)
        });
    
}
/**
 * 
 * @param {[]} recipesToRender - Array of recipe objects to render
 * @param {HTMLElement} selectedCell - The table cell where the selected recipe will be added
 * @returns {void} Renders a list of recipe names in a modal for selection
 */
export function renderRecipesNamesList(recipesToRender = recipes, selectedCell) {
    const recipesList = document.getElementById("modal-recipes-list");
    if (!recipesList) return;

    recipesList.innerHTML = '';
    const sortRecipes= [...recipesToRender].sort((a, b)=> a.name.localeCompare(b.name));

    sortRecipes.forEach(recipe => {
        const article = document.createElement('article');
        article.setAttribute('data-id', recipe.id.toString());
        
        article.innerHTML = `
            <div class="recipes-list-class">
            <h4>${recipe.name} – ${recipe.time}' – ${dificultyLevelLabel[recipe.difficulty]}</h4>
            </div>
        `;
        article.addEventListener('click', () => handleRecipeSelect(recipe, selectedCell));
        
        recipesList.appendChild(article);
    });
}

/**
 * 
 * @param {HTMLTableCellElement} cell - The table cell to render recipes into
 * @param {[]} recipesArray - Array of recipe objects to render in the cell 
 * @returns {void} Renders the names of recipes in the specified table cell, separated by new lines
 */
export function renderCell(cell, recipesArray){
    if (!recipesArray || recipesArray.length === 0){
        cell.textContent="";
        return;
    }
    cell.textContent = recipesArray.map(r => r.name).join("\n");
}
