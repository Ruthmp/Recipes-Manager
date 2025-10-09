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
  mealCells
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
} from "./helpers.js";
import { getEditingId, setEditingId } from "./recipes.js";
import { saveRecipes } from "./recipes.js";
import { searchBy, applyFilters, clearFilters } from "./search.js";
import { addToCell, clearAllCells, clearCell } from "./table.js";
import{getSelectedCell, openModal} from "./modal.js"
import { exportRecipesToJSON, importRecipesFromJSON } from "./exporter.js";

document.addEventListener("DOMContentLoaded", () => {
  window.currentPage = 1;
  window.recipesPerPage = 2;

  let displayedRecipes;
  displayedRecipes = [...recipes];

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      window.currentPage++;
      renderRecipesList(displayedRecipes, window.currentPage, true);
    });
  }

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

  //-- Collect form data--
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const difficulty =
      form.querySelector('input[name="difficulty"]:checked')?.value || "";
    if (getEditingId() === null) {
      const newRecipe = new Recipe(
        inputName.value,
        prepTime.value,
        difficulty,
        selectCategory.value,
        currentIngredients,
        currentInstructions
      );
      recipes.push(newRecipe);
    } else {
      const recipeToEdit = recipes.find((r) => r.id === getEditingId());
      recipeToEdit.name = inputName.value;
      recipeToEdit.time = prepTime.value;
      recipeToEdit.difficulty = difficulty;
      recipeToEdit.category = selectCategory.value;
      recipeToEdit.ingredients = [...currentIngredients];
      recipeToEdit.instructions = [...currentInstructions];
      setEditingId(null);
    }
    saveRecipes();
    renderRecipesList();

    //--Reset form--
    resetForm();
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
    cell.addEventListener("click", () => openModal(cell));

    cell.addEventListener("dblclick", () => {
      clearCell(cell);
      openModal(cell)
  });
});

  cancelModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
    modalSearchInput.value = "";
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
        modal.style.display = "none";
      }
    }
  })

  addCellBtn.addEventListener("click", () =>{
    addToCell(getSelectedCell());
    modalSearchInput.value = "";
    modal.style.display = "none";
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
  
});
