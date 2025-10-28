//--Selectors--
//-- navbar elements --
export const hamburgerBtn = document.getElementById("hamburger-btn");
export const navbarMenu = document.getElementById("navbar-menu");
export const icon = hamburgerBtn.querySelector('i');


//-- Form elements --
export const form = document.getElementById("form-add-recipe");
export const inputName = document.getElementById("recipe-name");
export const inputQuantity = document.getElementById("quantity-input");
export const selectMeasure = document.getElementById("measure-select");
export const inputIngredient = document.getElementById("ingredient-input");
export const ingredientList = document.getElementById("ingredient-list");
export const prepTime = document.getElementById("prep-time");
export const selectCategory = document.getElementById("recipe-category");
export const instructionsInput = document.getElementById("instructions-input");
export const instructionsList = document.getElementById("instructions-list");
export const btnAddIngredient = document.getElementById("btnAddIngredient");
export const btnAddInstruction = document.getElementById("btnAddInstruction");

export const inputPhoto = document.getElementById("recipe-image");
export const imagePreview = document.getElementById("image-preview");
export const btnRemoveImage = document.getElementById("btn-remove-photo")

export const btnSubmitRecipe = form.querySelector('button[type="submit"]');

//-- Search elements --
export const inputSearch = document.getElementById("search-input");
export const btnSearchName = document.getElementById("btn-search-name");
export const getSelectedCategories= ()=>
    Array.from (document.querySelectorAll('input[name=category]:checked'))
    .map(checkbox => checkbox.value);

export const getSelectedDifficulties = ()=>
    Array.from(document.querySelectorAll('input[name=difficulty]:checked'))
    .map(checkbox => checkbox.value);

export const getSelectedTimes = ()=>
    Array.from(document.querySelectorAll('input[name=time]:checked'))
    .map(checkbox => checkbox.value);

export const btnClearSearch = document.getElementById("btn-clear-search");

export const formFilter = document.getElementById("search-form");

export const btnSubmitFilter = formFilter.querySelector('button[type="submit"]')
export const btnClearFilters = document.getElementById('clear-filters');

//--Recipes list --
export const recipesList = document.getElementById("recipes-list");
export const recipeModal = document.getElementById('recipes-modal')

//-- Toggle form button --
export const toggleBtn = document.getElementById("toggle-filters");
export const filterDiv = document.getElementById("filter");

export const loadMoreBtn = document.getElementById("load-more");

//-- Floating Modal form elements --

export const modal = document.getElementById('manager-modal');
export const modalRecipesList= document.getElementById('modal-recipes-list');
export const modalSearchInput = document.getElementById('modal-search-input');
export const cancelModalBtn = document.getElementById('cancel-modal');
export const clearTable = document.getElementById('clear-table');
export const addCellBtn = document.getElementById('add-cell');
export const mealCells = document.querySelectorAll('.meal-cell');
export const modalTitle = document.getElementById('modal-title');
export const modalMenuList = document.getElementById('modal-menu-list')

//--Buttons pages --
export const prevPageBtn = document.getElementById("prev-page");
export const nextPageBtn = document.getElementById("next-page");
export const pageInfo = document.getElementById("page-info");

//-- Export menu --
export const table = document.getElementById('weekly-menu');
export const exportMenuBtn = document.getElementById('export-menu');

//-- Confirmation modal --
export const confirmModal = document.getElementById("confirm-modal");
export const confirmMessage = document.getElementById("confirm-message");
export const btnYes = document.getElementById("confirm-yes");
export const btnNo = document.getElementById("confirm-no");

// -- Shopping list --

export const shoppingListContainer = document.getElementById('shoppingList');
export const manualListContainer = document.getElementById('manualList');

export const generateListBtn = document.getElementById("generateListBtn");
export const addManualBtn = document.getElementById("addManualBtn");
export const manualNameInput = document.getElementById("manualName");
export const manualQty = document.getElementById("manualQty");
export const manualMeasure = document.getElementById("manualMeasure");

export const copyListBtn = document.getElementById("copy-list");
export const shareWhatsAppBtn = document.getElementById("share-whatsapp");
export const shareSystemBtn = document.getElementById("share-system");