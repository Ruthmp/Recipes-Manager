import { inputIngredient, ingredientList, instructionsInput, instructionsList, btnAddIngredient, btnAddInstruction, inputQuantity, selectMeasure } from "./dom.js"; 
import { renderInlineList } from "./render.js"; 

//-- States--
    
export let currentIngredients = [];
export let currentInstructions = [];
export let recipes = JSON.parse(localStorage.getItem('recipes')||'[]')
export let editingId = null;

export let editingIngredientIndex = null;
export let editingInstructionIndex = null;

export const categoryLabels ={
    starter: "Entrante",
    mainCourse: "Plato principal",
    dessert: "Postre"
}
export const dificultyLevelLabel ={
    easy: "Fácil",
    medium: "Medio",
    hard: "Difícil"
}


 //-- Create class recipe--
/**
 * Class representing a recipe.
 */
export class Recipe{
    constructor(name, time, difficulty, category, ingredients, instructions ){
        this.id = Date.now();
        this.name = name;
        this.time = time;
        this.category = category;
        this.difficulty = difficulty;
        this.ingredients = ingredients;
        this.instructions = instructions;
    }
}
export function resetState(){
    currentIngredients =[];
    currentInstructions =[];
    editingId= null;
    editingIngredientIndex = null;
    editingInstructionIndex = null;
}
//-- Setters for editing states--
export function setEditingIngredientIndex(index){
    editingIngredientIndex = index;
}
export function setEditingInstructionIndex(index){
    editingInstructionIndex = index;
}
export function setEditingId(id){
    editingId = id;
}
export function getEditingId(){ return editingId;}


//-- Adds--
/**
 * 
 * @returns {void} Adds ingredient from input to currentIngredients and renders the list
 */
export function addIngredientFromInput(){
    const ingredient = inputIngredient.value.trim();
    const measure = selectMeasure.value.trim();
    const quantity = inputQuantity.value.trim();
    if(!ingredient) return;

    const value = { ingredient, measure, quantity };
    if (editingIngredientIndex !== null){
        currentIngredients[editingIngredientIndex]= value;
        editingIngredientIndex = null; //reset
    } else{
    currentIngredients.push(value);
    }
    inputQuantity.value='';
    selectMeasure.value='';
    inputIngredient.value='';
    renderInlineList(ingredientList, currentIngredients.map (i =>
        `${i.quantity ? i.quantity + '': ''} ${i.measure ? i.measure + '':''} ${i.ingredient ? i.ingredient + '':''}`
    ));
    inputIngredient.focus();
    btnAddIngredient.textContent = "Añadir";
}

/**
 * 
 * @returns {void} Adds instruction from input to currentInstructions and renders the list
 */
export function addInstructionFromInput(){
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
export function saveRecipes(){
    localStorage.setItem('recipes', JSON.stringify(recipes));
}