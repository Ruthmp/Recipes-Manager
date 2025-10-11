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
        deleteBtn.textContent =  "❌";
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
// --- Make modal draggable ---
let isDragging = false;
let offsetX, offsetY;

if (modalTitle) {
  modalTitle.style.cursor = "move";
  modalTitle.addEventListener("mousedown", (e) => {
    isDragging = true;
    const rect = modal.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    // Allow moving the modal
    modal.style.transform = "none";
    modal.style.position = "absolute";
  });
}

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    modal.style.left = `${e.clientX - offsetX}px`;
    modal.style.top = `${e.clientY - offsetY}px`;
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});
