import{modalSearchInput, modal, modalTitle, modalMenuList} from "./dom.js"; 
import{renderCell} from "./render.js";

//! -- Floating Modal form --

//-- Open modal --
let selectedCell;
export function getSelectedCell(){
    return selectedCell;
}
export function openModal(cell){
    selectedCell = cell;
    modal.classList.remove("hidden");
    modalSearchInput.focus ();
    

    const day = cell.dataset.day || 'Día';
    const meal = cell.dataset.meal || 'Comida';
    

    if (modalTitle) modalTitle.textContent = `${day} - ${meal}`;


    //clean previous search
    modalSearchInput.value = '';

    showAssignedRecipes(cell);
}

export function showAssignedRecipes(cell){
    if (!cell) return;

    const savedMeals = JSON.parse(localStorage.getItem('meals')) || {};
    const cells = Array.from(document.querySelectorAll('.meal-cell'));
    const index = cells.indexOf(cell);
    const recipesArray = savedMeals[index]?.recipes || [];

    //clean list
    modalMenuList.innerHTML = '';

    if(recipesArray.length === 0){
        modalMenuList.innerHTML ="<li style='color:gray'>No hay recetas asignadas</li>";
        return;
    }

    recipesArray.forEach((recipe, i) =>{
        const li = document.createElement('li');
        li.textContent = recipe.name + "\n";

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML =  '<i class="fa-solid fa-trash"></i>';
        deleteBtn.style.marginLeft = "6px";
        deleteBtn.addEventListener('click', () => {
            recipesArray.splice(i, 1);
            savedMeals[index].recipes = recipesArray;
            localStorage.setItem('meals', JSON.stringify(savedMeals));

            renderCell(cell, recipesArray);
            showAssignedRecipes(cell);
    });
    li.appendChild(deleteBtn);
    modalMenuList.appendChild(li);
})
}