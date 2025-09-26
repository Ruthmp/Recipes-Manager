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
    selectMeasure
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
export function renderRecipesList() {
    const recipesList = document.getElementById("recipes-list");
    if (!recipesList) return;

    recipesList.innerHTML = '';
    const sortRecipes= [...recipes].sort((a, b)=> a.name.localeCompare(b.name));

    sortRecipes.forEach(recipe => {
        const article = document.createElement('article');
        article.setAttribute('data-id', recipe.id.toString());
        
        article.innerHTML = `
            <div class="recipes-list-class">
            <h3>${recipe.name}</h3>
            <p>Tiempo: ${recipe.time} min</p>
            <p>Dificultad: ${dificultyLevelLabel[recipe.difficulty]}</p>
            <p>Categoría: ${categoryLabels[recipe.category]}</p>
            <ul>${recipe.ingredients
            .map(i => `<li>${i.quantity ? i.quantity + ' ' : ''}${i.measure ? i.measure + ' ' : ''}${i.ingredient}</li>`)
            .join('')}</ul>
            <ol>${recipe.instructions.map(i => `<li>${i}</li>`).join('')}</ol>
            </div>
        `;

        // Botón eliminar
        const btnDelete = document.createElement('button');
        btnDelete.type = 'button';
        btnDelete.textContent = 'Eliminar';
        btnDelete.className = 'btn-delete';
        btnDelete.addEventListener('click', () => {
            const index = recipes.findIndex(r => r.id === recipe.id);
            if (index > -1) {
                recipes.splice(index, 1);
                saveRecipes();
                renderRecipesList();
            }
        });

        // Botón editar
        const btnEdit = document.createElement('button');
        btnEdit.type = 'button';
        btnEdit.textContent = 'Editar';
        btnEdit.className = 'btn-edit';
        
        btnEdit.addEventListener('click', () => {

            setEditingScrollTarget (recipe.id);

            setEditingId(recipe.id);
            inputName.value = recipe.name;
            prepTime.value = recipe.time;
            selectCategory.value = recipe.category;

            const difficultyInput = form.querySelector(`input[name="difficulty"][value="${recipe.difficulty}"]`);
            if (difficultyInput) difficultyInput.checked = true;

            // Mantener la referencia
            currentIngredients.splice(0, currentIngredients.length, ...recipe.ingredients);
            renderInlineList(ingredientList, currentIngredients);

            currentInstructions.splice(0, currentInstructions.length, ...recipe.instructions);
            renderInlineList(instructionsList, currentInstructions);

            btnSubmitRecipe.textContent = "Guardar receta";
            form.scrollIntoView({behavior:'smooth', block: 'start'});
        });

        article.appendChild(btnDelete);
        article.appendChild(btnEdit);
        recipesList.appendChild(article);
    });
}
