import{generateListBtn, addManualBtn, manualNameInput, manualQty, manualMeasure, shoppingListContainer, manualListContainer} from './dom.js';

let shoppingListTemp = [];
let manualList = [];

// Save in localStorage
function saveShoppingList() {
  localStorage.setItem('shoppingListTemp', JSON.stringify(shoppingListTemp));
  localStorage.setItem('manualList', JSON.stringify(manualList));
}

// Load from localStorage
export function loadShoppingList() {
  shoppingListTemp = JSON.parse(localStorage.getItem('shoppingListTemp')) || [];
  manualList = JSON.parse(localStorage.getItem('manualList')) || [];
  renderShoppingList();
}

// Function to parse amounts
function parseQuantity(qty) {
  const n = parseFloat(qty);
  return isNaN(n) ? 1 : n; // 1 as default
}
// Generate shopping list from menu recipes
export function generateShoppingList(){
    const menuRecipes = getMenuRecipes();
    const ingredientsMap = {};

    menuRecipes.forEach(recipe =>{
        recipe.ingredients.forEach(({ingredient, measure, quantity})=>{
            const key = `${ingredient.toLowerCase()}_${measure.toLowerCase()}`;
            const qty = parseFloat(quantity);

            if (!ingredientsMap[key]){
                ingredientsMap[key] = {
                    ingredient,
                    measure,
                    quantity: qty
                };
            } else {
                ingredientsMap[key].quantity += qty;
            }
        });
    });
    return Object.values(ingredientsMap);
}
// Get all recipes from the menu
function getMenuRecipes() {
    const savedMeals = JSON.parse(localStorage.getItem('meals')) || {};
    const recipes = [];

    const allRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    Object.values(savedMeals).forEach(cell => {
        if (cell.recipes) {
            cell.recipes.forEach(r => {
                
                const recipe = allRecipes.find(x => x.id === r.id);
                if (recipe) recipes.push(recipe);
            });
        }
    });

    return recipes;
}

// Render shopping list editing
function renderShoppingList() {
  
    shoppingListContainer.innerHTML = "";
    manualListContainer.innerHTML = "";
  

  // Render lista automática
  shoppingListTemp.forEach((item, index) => {
    renderItem(item, index, shoppingListTemp, shoppingListContainer);
  });

  // Render lista manual
  manualList.forEach((item, index) => {
    renderItem(item, index, manualList, manualListContainer);
  });
}


function renderItem(item, index, list, container){
    const li = document.createElement("li");

    const qty = item.quantity ? parseQuantity(item.quantity) : 1;
    const measure = item.measure || "ud";
    li.textContent = `${item.ingredient || item}: ${qty} ${measure}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML =  '<i class="fa-solid fa-trash"></i>';
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.addEventListener("click", () => {
        list.splice(index, 1);
      saveShoppingList();
      renderShoppingList();
    });

    li.appendChild(deleteBtn);
    container.appendChild(li);
  };
// Generate list from recipes only when the button is clicked
generateListBtn.addEventListener("click", () => {
  const newList = generateShoppingList().map(item => ({
    ingredient: item.ingredient,
    quantity: item.quantity || 1,
    measure: item.measure || "ud"
  }));
  shoppingListTemp = newList;
  saveShoppingList();
  renderShoppingList();
});

// Add ingredient manually to the shopping list

function addManualIngredient(){
    const name = manualNameInput.value.trim();
  const qty = manualQty.value;
  const measure = manualMeasure.value.trim();

  if (!name) return;

  manualList.push({
    ingredient: name,
    quantity: parseQuantity(qty),
    measure: measure || "ud"
  });

  saveShoppingList();
  renderShoppingList();

  // Clear inputs
  manualNameInput.value = "";
  manualQty.value = "";
  manualMeasure.value = "";
}
addManualBtn.addEventListener("click", (e) => {
    e.preventDefault(); 
    addManualIngredient();
});
manualNameInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
        e.preventDefault(); 
    addManualIngredient();
    }
});

// Clear lists

export function clearShoppingList(){
  shoppingListTemp = [];
  manualList = [];
  saveShoppingList();
  renderShoppingList();
}

// -- Export shopping list --
// Export Text
function getShoppingListText(){
  const fullList = [...shoppingListTemp, ...manualList];
  if (fullList.length === 0){
    alert("La lista de la compra está vacía.");
    return null;
  } 

  const text = fullList
  .map(item => `🔸${item.ingredient} : ${item.quantity} ${item.measure}`)
  .join('\n');

  return "🛒 *Lista de la compra:*\n" + text;
}

// Whatsapp export

export function shareShoppingListWhatsApp(){
  const text = getShoppingListText();
  if (!text) return;

  const encodedText = encodeURIComponent(text);
 
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const url = isMobile
    ? `https://wa.me/?text=${encodedText}`
    : `https://web.whatsapp.com/send?text=${encodedText}`;

    window.open(url, '_blank');
}

// Copy to clipboard

export function copyShoppingListToClipboard(){
  const text = getShoppingListText();
  if (!text) return;

  navigator.clipboard.writeText(text)
  .then(() => alert ("✅ Lista copiada al portapapeles"))
  .catch(() => alert ("❌ Error al copiar la lista"));
}

// Share with system
 export async function shareShoppingListSystem(){
  const text = getShoppingListText();
  if (!text) return;

  if(navigator.share){
    try{
      await navigator.share({title: "Lista de la compra", text});
    } catch (error){
      console.log("Error al compartir:", error);
      alert ("❌ Error al compartir la lista");
    }
  }else {
    alert ("❌ Compartir no es compatible con este navegador");
  }
 }