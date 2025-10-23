import {
  form,
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
  cancelModalBtn,
  modal,
  loadMoreBtn,
  addCellBtn,
  mealCells,
  inputPhoto,
  btnRemoveImage,
  prevPageBtn,
  nextPageBtn,
  modalRecipesList,
  exportMenuBtn,
  hamburgerBtn,
  navbarMenu,
  icon
} from "./dom.js";
import { currentIngredients, currentInstructions, recipes } from "./recipes.js";
import {
  Recipe,
  addIngredientFromInput,
  addInstructionFromInput,
} from "./recipes.js";
import { renderRecipesList, renderRecipesNamesList } from "./render.js";
import {
  resetForm,
  capitalizeFirstLetter,
  getEditingScrollTarget,
  clearEditingScrollTarget,
  initToggleButtons,
  convertImageToBase64,
  updatePagination,
  updateRecipesPerPage,
  isTouchDevice
} from "./helpers.js";
import { getEditingId, setEditingId } from "./recipes.js";
import { saveRecipes } from "./recipes.js";
import { searchBy, applyFilters, clearFilters } from "./search.js";
import { addToCell, clearAllCells, clearCell } from "./table.js";
import{getSelectedCell, openModal} from "./modal.js"
import { exportRecipesToJSON, importRecipesFromJSON } from "./exporter.js";
import { generatePDF } from "./table-export.js";

document.addEventListener("DOMContentLoaded", () => {

  window.currentPage = 1;
  updateRecipesPerPage();

  let displayedRecipes;
  displayedRecipes = [...recipes];

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      window.currentPage++;
      renderRecipesList(displayedRecipes, window.currentPage, true);
    });
  }
  //-- Hamburguer menu --
  hamburgerBtn.addEventListener('click', () =>{
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
  })

  //--Load manage menu --
  const savedMeals = JSON.parse(localStorage.getItem("meals")) || {};
  const cells = document.querySelectorAll(".meal-cell");

  Object.keys(savedMeals).forEach((index) => {
    const cell = cells[index];
    if (!cell) return;

    const data = savedMeals[index];
  if (Array.isArray(data.recipes)) {
    cell.textContent = data.recipes.map(r => r.name).join("\n");
  } else if (data.name) {
    cell.textContent = data.name;
    cell.dataset.recipeId = data.id;
  }
  });
  hamburgerBtn.addEventListener("click", () => {
    navbarMenu.classList.toggle("active");
  });

  // --- Listener to Enter ---
  inputIngredient.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addIngredientFromInput();
    }
  });

  instructionsInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addInstructionFromInput();
    }
  });

  // --- Listener to click ---
  btnAddIngredient.addEventListener("click", () => {
    addIngredientFromInput();
  });

  btnAddInstruction.addEventListener("click", () => {
    addInstructionFromInput();
  });

    let currentImage = null;
    let removePhotoFlag = false;
  inputPhoto.addEventListener("change", async (e)=>{
    const file = e.target.files[0];
    if (!file) return;
    try{
      currentImage = await convertImageToBase64(file);
      removePhotoFlag = false;
    } catch (error){
      console.error ("Error al convertir la imagen: ", error);
    }
  });
  btnRemoveImage.addEventListener('click', () =>{
    currentImage = null;
    removePhotoFlag = true;
    inputPhoto.value="";
  })

  //-- Collect form data--
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const difficulty =
      form.querySelector('input[name="difficulty"]:checked')?.value || "";
      let photoBase64 = currentImage;

    if (getEditingId() === null) {
      photoBase64 = currentImage || null;
      const newRecipe = new Recipe(
        inputName.value,
        prepTime.value,
        difficulty,
        selectCategory.value,
        currentIngredients,
        currentInstructions,
        null,
        photoBase64
      );
      recipes.push(newRecipe);
    } else {
      const recipeToEdit = recipes.find((r) => r.id === getEditingId());
      // Decide what to do with the photo:
    if (currentImage) {
      // A new photo was uploaded → replace
      photoBase64 = currentImage;
    } else if (removePhotoFlag) {
      // "Delete photo" was clicked → null
      photoBase64 = null;
    } else {
      // No action taken → keep the existing photo
      photoBase64 = recipeToEdit.image || null;
    }
      recipeToEdit.name = inputName.value;
      recipeToEdit.time = prepTime.value;
      recipeToEdit.difficulty = difficulty;
      recipeToEdit.category = selectCategory.value;
      recipeToEdit.ingredients = [...currentIngredients];
      recipeToEdit.instructions = [...currentInstructions];
      recipeToEdit.image = photoBase64;
      setEditingId(null);
    }
    saveRecipes();
    renderRecipesList();

    //--Reset form--
    resetForm();
    currentImage = null;
    removePhotoFlag = false;
  });
  //--Aplicate capitalize letter--
  inputName.addEventListener("input", () => {
    capitalizeFirstLetter(inputName);
  });
  inputIngredient.addEventListener("input", () => {
    capitalizeFirstLetter(inputIngredient);
  });
  instructionsInput.addEventListener("input", () => {
    capitalizeFirstLetter(instructionsInput);
  });

  //--Reset Form--

  form.addEventListener("reset", () => {
    resetForm();

    const targetId = getEditingScrollTarget();

    if (targetId) {
    
      const recipeElement = document.querySelector(
        `#recipes-list article[data-id="${targetId}"]`
      );
      if (recipeElement) {
        recipeElement.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        console.warn("No se encontró el artículo con data-id:", targetId);
      }
      setEditingId(null);
      clearEditingScrollTarget();
    }
  });

  renderRecipesList();

  //--Toggle filters --
  initToggleButtons();

  //-- Search recipes --
  inputSearch.addEventListener("input", (e) => {
    if (e.inputType !== "insertLineBreak") {
      capitalizeFirstLetter(inputSearch);
    }
  });

  btnSearchName.addEventListener("click", () => {
    const query = inputSearch.value.trim();
    const results = searchBy(recipes, query);
    window.currentPage = 1;
    renderRecipesList(results);
  });
  inputSearch.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); //Prevent form submission

      displayedRecipes = searchBy(recipes, inputSearch.value.trim());
      window.currentPage = 1;
      renderRecipesList(displayedRecipes, window.currentPage, false);
    }
  });
  btnClearSearch.addEventListener("click", () => {
    inputSearch.value = "";
    clearFilters();
    renderRecipesList();
  });

  formFilter.addEventListener("submit", (e) => {
    e.preventDefault();
    displayedRecipes = applyFilters(recipes);
    window.currentPage = 1;
    renderRecipesList(displayedRecipes, window.currentPage, false);
  });

  btnClearFilters.addEventListener("click", () => {
    clearFilters();

    clearFilters();
    displayedRecipes = [...recipes];
    window.currentPage = 1;
    renderRecipesList(displayedRecipes, window.currentPage, false);
  });

  //!-- Floating Modal Form --

  mealCells.forEach((cell) => {
    let clickTimer;

    cell.addEventListener("click", () => {
      clickTimer = setTimeout(()=>{
        openModal(cell);
      }, 250);
    });

    cell.addEventListener("dblclick", () => {
      clearTimeout(clickTimer);
      clearCell(cell);
      openModal(cell)
  });
  //-- Tactil Screen : long press --
  let pressTimer;
  if (isTouchDevice()){
    let touchStartTime = 0;

    cell.addEventListener("touchstart", () => {
      touchStartTime = new Date().getTime();

      pressTimer = setTimeout(() => {
        clearCell (cell);
        openModal (cell);
        touchStartTime = 0; //reset time
      }, 800); // 500 ms for long press
      });
      cell.addEventListener("touchend", () =>{
        clearTimeout(pressTimer);

        const touchDuration = new Date().getTime() - touchStartTime;
        if (touchDuration < 500 && touchDuration > 0){
          openModal(cell);
          touchStartTime = 0; //reset time
        }
      });

      cell.addEventListener("touchmove", () =>{
        clearTimeout(pressTimer); //cancel long press if finger moves
        touchStartTime = 0; //reset time
      });
    }
  });


 

  cancelModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    modalSearchInput.value = "";
    modalRecipesList.innerHTML = "";
  });

  const clearTable = document.getElementById("clear-table");
  clearTable.addEventListener("click", clearAllCells);


  modalSearchInput.addEventListener("input", () => {
    capitalizeFirstLetter(modalSearchInput);
    const query = modalSearchInput.value.trim();
    query === ""
      ? renderRecipesNamesList([])
      : renderRecipesNamesList(searchBy(recipes, query), getSelectedCell());
  });

  modalSearchInput.addEventListener("keydown", (e) =>{
    if(e.key === "Enter"){
      e.preventDefault();

      const query = modalSearchInput.value.trim();
      const results = searchBy(recipes, query);

      if (results.length === 0 && query !==""){
        addToCell(getSelectedCell());
        modalSearchInput.value = "";
        modal.classList.add("hidden");
      }
    }
  })

  addCellBtn.addEventListener("click", () =>{
    addToCell(getSelectedCell());
    modalSearchInput.value = "";
    modal.classList.add("hidden");
  })

  document.getElementById("exportBtn").addEventListener("click", () => {
    exportRecipesToJSON(recipes);
  });
  
  document.getElementById("importBtn").addEventListener("click", () => {
    importRecipesFromJSON((importedRecipes) => {
      recipes.splice(
        0,
        recipes.length,
        ...importedRecipes.map(
          r => new Recipe(r.name, r.time, r.difficulty, r.category, r.ingredients, r.instructions, r.id)
        )
      );
      saveRecipes(recipes);
      renderRecipesList(recipes);
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const headerOffset = document.querySelector("header").offsetHeight;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
  
  //!--Pagination --
  prevPageBtn.addEventListener("click", () =>{
    if (window.currentPage > 1){
      window.currentPage --;
      renderRecipesList(displayedRecipes, window.currentPage, false);
      updatePagination(displayedRecipes);
    }
  })

  nextPageBtn.addEventListener("click", ()=>{
    const totalPages = Math.ceil(displayedRecipes.length / window.recipesPerPage);
    if (window.currentPage < totalPages){
      window.currentPage++;
      renderRecipesList(displayedRecipes, window.currentPage, false);
      updatePagination(displayedRecipes);
  
    }
  });
  //!-- Export menu to PDF --
  exportMenuBtn.addEventListener('click', generatePDF);
});
