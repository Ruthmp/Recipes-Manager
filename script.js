document.addEventListener('DOMContentLoaded', () =>{

    

    //--Selectors--

    const form = document.getElementById("form-add-recipe");
    const inputName = document.getElementById("recipe-name");
    const inputIngredient = document.getElementById("ingredient-input");
    const ingredientList = document.getElementById("ingredient-list");
    const prepTime = document.getElementById("prep-time");
    const instructionsInput = document.getElementById("instructions-input");
    const instructionsList= document.getElementById("instructions-list");
    const btnAddIngredient = document.getElementById("btnAddIngredient")
    const btnAddInstruction = document.getElementById("btnAddInstruction")

    const btnSubmitRecipe = form.querySelector('button[type="submit"]');

    //-- States--
    
    let currentIngredients = [];
    let currentInstructions = [];
    let recipes = JSON.parse(localStorage.getItem('recipes')||'[]')
    let editingId = null;

    let editingIngredientIndex = null;
    let editingInstructionIndex = null;

     //-- Create class recipe--

    class Recipe{
        constructor(name, time, difficulty, ingredients, instructions ){
            this.id = Date.now();
            this.name = name;
            this.time = time;
            this.difficulty = difficulty;
            this.ingredients = ingredients;
            this.instructions = instructions;
        }
    }

    //-- Helpers--

    function renderInlineList(ulEl, items){
        ulEl.innerHTML = '';
        items.forEach((item, idx)=>{
            const li = document.createElement('li');
            li.className = 'list-item';

            const span= document.createElement('span');
            span.textContent = item;
            li.appendChild(span);

            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'btn-remove-item';
            btn.setAttribute('aria-label', `Eliminar ${item}`);
            btn.textContent = 'Borrar';
            btn.addEventListener('click', ()=>{
                items.splice(idx, 1);
                renderInlineList(ulEl, items);
            });
            li.appendChild(btn);
            ulEl.appendChild(li);

            const btnEdit = document.createElement('button');
            btnEdit.type = 'button';
            btnEdit.className = 'btn-edit-item';
            btnEdit.setAttribute('aria-label', `Editar ${item}`);
            btnEdit.textContent = 'Editar';
            btnEdit.addEventListener('click', ()=>{
                const value= items[idx]

                if (ulEl.id === "ingredient-list"){
                    inputIngredient.value = value;
                    inputIngredient.focus()
                    editingIngredientIndex = idx;
                    //Edit text button
                    btnAddIngredient.textContent = "Guardar";
                } else if (ulEl.id === "instructions-list"){
                    instructionsInput.value = value;
                    instructionsInput.focus();
                    editingInstructionIndex = idx;
                    //Edit text button
                    btnAddInstruction.textContent = "Guardar";
                }

            
            });
            li.appendChild(btnEdit);
            
        });
    }

    function addIngredientFromInput(){
        const value = inputIngredient.value.trim();
        if(!value) return;
        if (editingIngredientIndex !== null){
            currentIngredients[editingIngredientIndex]= value;
            editingIngredientIndex = null; //reset
        } else{
        currentIngredients.push(value);
        }
        inputIngredient.value='';
        renderInlineList(ingredientList, currentIngredients);
        inputIngredient.focus();
        btnAddIngredient.textContent = "Añadir";
    }

    function addInstructionFromInput(){
        const value = instructionsInput.value.trim();
        if(!value) return;
        if (editingInstructionIndex !== null){
            currentInstructions[editingInstructionIndex] = value;
            editingInstructionIndex= null; //reset
        } else{
        currentInstructions.push(value);
        }
        instructionsInput.value='';
        renderInlineList(instructionsList, currentInstructions);
        instructionsInput.focus();
        btnAddInstruction.textContent = "Añadir";
    }
    //--Reset Form--

    function resetForm(){
        currentIngredients =[];
        currentInstructions =[];
        editingId= null;
        editingIngredientIndex = null;
        editingInstructionIndex = null;
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
    function capitalizeFirstLetter(input){
        if(!input.value) return;
        input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);
    }

    //-- List recipes--
    
    function renderRecipesList(){
        const recipesList = document.getElementById("recipes-list");
        if(!recipesList) return;
        recipesList.innerHTML='';
        let recipeListHTML= "<section id = 'recipe-list'>";
        recipes.forEach(recipe =>{
            recipeListHTML +=`<article>
            
            <h3> ${recipe.name} </h3>
            <p>Tiempo:${recipe.time}</p>
            <p>Dificultad:${recipe.difficulty}</p>
            <ul>`
            recipe.ingredients.forEach(ingredient=>{
                recipeListHTML += `<li>${ingredient}</li>`
            })
            recipeListHTML += `</ul>`
            recipeListHTML += `<ol>`
            recipe.instructions.forEach(instruction=>{
                recipeListHTML +=`<li>${instruction}</li>`
            })
            recipeListHTML += `</ol>`
            recipeListHTML += `</article>`
            recipeListHTML +=`<button class="btn-delete" data-id = "${recipe.id}">Eliminar</button>
            <button class="btn-edit" data-id = "${recipe.id}">Editar</button>`
        })
        recipeListHTML+= `</section>`
        recipesList.innerHTML=recipeListHTML;

        const deleteButtons = recipesList.querySelectorAll('.btn-delete');
        deleteButtons.forEach(deletebtn =>{
            deletebtn.addEventListener('click', ()=>{
                const id = Number(deletebtn.dataset.id)
                recipes = recipes.filter(r=>r.id !==id)
                localStorage.setItem('recipes', JSON.stringify(recipes));
                renderRecipesList();
            })
            
        })
        
        const editButtons = recipesList.querySelectorAll('.btn-edit');
        editButtons.forEach(editbtn =>{
            editbtn.addEventListener('click', () =>{
                
                const id = Number(editbtn.dataset.id)
                editingId = id;
                const recipeToEdit = recipes.find(r=>r.id === id)
                inputName.value = recipeToEdit.name;
                prepTime.value = recipeToEdit.time;
                const difficultyInput = form.querySelector(`input[name="difficulty"][value="${recipeToEdit.difficulty}"]`);
                difficultyInput.checked= true;
                currentIngredients =[...recipeToEdit.ingredients]
                renderInlineList(ingredientList, currentIngredients)
                currentInstructions =[...recipeToEdit.instructions]
                renderInlineList(instructionsList, currentInstructions)

                btnSubmitRecipe.textContent = "Guardar receta";
            })
        })
    }
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
        if(editingId===null){
        const newRecipe = new Recipe(
            inputName.value,
            prepTime.value,
            difficulty,
            currentIngredients,
            currentInstructions

        )
        recipes.push(newRecipe)
    } else {
        const recipeToEdit = recipes.find(r => r.id === editingId);
        recipeToEdit.name = inputName.value;
        recipeToEdit.time = prepTime.value;
        recipeToEdit.difficulty = difficulty;
        recipeToEdit.ingredients = [...currentIngredients];
        recipeToEdit.instructions = [...currentInstructions];
        editingId = null;
    } 
        localStorage.setItem('recipes', JSON.stringify(recipes));
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

    form.addEventListener('reset', (e) =>{
        resetForm();
    })
    renderRecipesList();
})



