# 🍽️ Recipe Web Application  

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![jsPDF](https://img.shields.io/badge/jsPDF-8A4182?style=flat&logo=jsPDF&logoColor=white)

### 🌐 Available in other languages

- [🇪🇸 Spanish](README.es.md)

---

## 💾 Project Description
Recipe application with a weekly meal planner and shopping list.
It allows you to browse recipes, plan your meals, automatically generate the list of ingredients, and easily share it via WhatsApp or other apps.
You can also download the weekly planner as a PDF, making meal organization and grocery shopping more convenient.

## 🛠️ Technologies Used

- **HTML5** — semantic structure of the application  
- **CSS3** — modular styles and responsive design  
- **JavaScript (ES6+)** — main logic and dynamic DOM management  
- **JSON** — recipe export and import for backup purposes  
- **[jsPDF](https://github.com/parallax/jsPDF)** — generation of the weekly meal planner in PDF format  
- **[Font Awesome](https://fontawesome.com/)** — iconography used in the interface  

## 📁 Project Structure

```bash
/recipes/                     ← 📂 Root folder of the project
│
├── index.html                ← 🌐 Main page of the application
│
├── css/                      ← 🎨 Styles folder
│   ├── base.css              ← Base styles and typography
│   ├── components.css        ← General component styles
│   ├── layout.css            ← Page structure and layout
│   ├── media-queries.css     ← Responsive styles
│   ├── reset.css             ← Browser reset styles
│   ├── style.css             ← Global main styles
│   ├── utilities.css         ← Utility classes (margins, paddings, display)
│   ├── variables.css         ← CSS variables (colors, fonts, sizes)
│   └── components/           ← Individual component styles
│       ├── form.css          ← Recipe forms
│       ├── header.css        ← Page header
│       ├── modals.css        ← Modal windows
│       ├── navbar.css        ← Navigation bar
│       ├── recipes.css       ← Recipe display
│       ├── shoppingList.css  ← Shopping list
│       ├── table.css         ← Weekly planner
│       └── toggle.css        ← Toggle buttons and themes
│
├── js/                       ← 💻 Scripts folder
│   ├── main.js               ← Main application logic
│   ├── dom.js                ← DOM manipulation
│   ├── exporter.js           ← Export to JSON
│   ├── helpers.js            ← Helper functions
│   ├── modal.js              ← Modal management
│   ├── recipes.js            ← Recipe management (CRUD)
│   ├── render.js             ← Dynamic content rendering
│   ├── search.js             ← Recipe search and filtering
│   ├── shopping-list.js      ← Shopping list management
│   ├── table-export.js       ← Weekly planner export
│   └── table.js              ← Meal planner logic
│
└── img/                      ← 🖼️ Images, backgrounds, and graphic elements
```

## ⚙️ Features

- 🧾 **Recipe submission form** with fields for name, ingredients, steps, and preparation time  
- 🖼️ **Option to add an image** for each recipe to make them more visual and appealing  
- 🔍 **Advanced search and filtering** to find recipes by name, category, or ingredients  
- 📋 **Recipe display** with detailed information and organized layout  
- 🗓️ **Weekly meal planner** to easily organize meals throughout the week  
- 🛒 **Automatic shopping list generation** based on selected recipes  
- 📱 **Share shopping list via WhatsApp or other apps** for easier coordination  
- 📤 **Recipe export and import** in JSON format for backup purposes  
- 🧾 **Download weekly planner as PDF** with a clean and structured layout  
- 💾 **Local data storage** using `localStorage` to save recipes and planner data  
- 🌐 **Modern, clean, and responsive design** optimized for all devices

## ✨ Main JavaScript Functions

| Function                          | Purpose |
| --------------------------------- | -------- |
| `addIngredientFromInput()`        | Adds a new ingredient from the input field |
| `addInstructionFromInput()`       | Adds a cooking instruction dynamically |
| `renderRecipesList()`             | Displays the recipe list with pagination |
| `renderRecipesNamesList()`        | Renders recipe names in the modal for quick selection |
| `searchBy()`                      | Searches recipes by name or keyword |
| `applyFilters()`                  | Filters recipes by category, difficulty, or time |
| `resetForm()`                     | Clears and resets all form fields |
| `saveRecipes()`                   | Saves recipes in `localStorage` for persistence |
| `convertImageToBase64()`          | Converts uploaded images to Base64 format |
| `exportRecipesToJSON()`           | Exports all recipes to a JSON file (backup) |
| `importRecipesFromJSON()`         | Imports recipes from a JSON file |
| `generatePDF()`                   | Exports the weekly menu to a PDF file |
| `addToCell()`                     | Adds a recipe to a cell in the weekly planner |
| `clearAllCells()`                 | Clears all cells in the weekly planner |
| `shareShoppingListWhatsApp()`     | Shares the shopping list via WhatsApp |
| `copyShoppingListToClipboard()`   | Copies the shopping list to the clipboard |
| `shareShoppingListSystem()`       | Shares the shopping list through the system share menu |

---

## 📃 Advanced Features

* Modular architecture — organized into multiple JS modules (`helpers.js`, `recipes.js`, `render.js`, `table.js`, etc.)
* Persistent data storage using `localStorage`
* JSON import/export for recipe backup and recovery
* Weekly meal planner with interactive recipe assignment
* Real-time search and advanced filtering system
* PDF generation for the weekly menu with `jsPDF`
* Image upload, preview, and removal support for each recipe
* Responsive interface with adaptive pagination
* Accessible controls via keyboard, mouse, and touch interactions
* Smooth scroll navigation and mobile-friendly hamburger menu

## 📷 Preview

<img width="800" alt="Captura de pantalla 2025-10-31 a las 10 43 46" src="https://github.com/user-attachments/assets/2e4d68bd-5e43-48eb-b366-3203f8efb50f" />
<img width="800" alt="Captura de pantalla 2025-10-31 a las 10 44 34" src="https://github.com/user-attachments/assets/94d5c136-9b87-44c3-8305-d4b954a85866" />
<img width="800" alt="Captura de pantalla 2025-10-31 a las 10 44 49" src="https://github.com/user-attachments/assets/899d0536-d2af-4ee8-9385-bf1f8ad43a27" />
<img width="800" alt="Captura de pantalla 2025-10-31 a las 10 45 21" src="https://github.com/user-attachments/assets/9ae54545-0073-40e7-82fd-6d9093e6ea1b" />

## 🚀 Planned Improvements

- 🌐 **Full multilingual support** so users can choose their preferred language  
- 🔒 **Backend and user management** with secure login and sessions  
- 💾 **Centralized database** to store recipes, meal plans, and user preferences  
- 🤝 **Recipe sharing between users** to create a community and facilitate collaboration  

## 🎨 Credits

* Main background modified from an image by [Freepik](https://www.freepik.es/foto-gratis/marco-plano-pasta-e-ingredientes-crudos_6080829.htm).  
* Additional notebook element cropped from [Freepik](https://www.freepik.es/foto-gratis/vista-superior-surtido-verduras-portapapeles_12418251.htm).  
* Icons provided by [Font Awesome](https://fontawesome.com/).  
* Project fully developed using HTML, CSS, and JavaScript.  

## 📅 Last Update

**November 2025**

## 👤 Author

[Ruth Millán](https://github.com/Ruthmp)&nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;&nbsp;  [🌐 CV Web](https://portfolio-ruth.vercel.app)&nbsp;&nbsp;&nbsp;   || &nbsp;&nbsp;&nbsp; [🔗 LinkedIn](https://www.linkedin.com/in/ruth-millan-piqueras/)

---

❤️ This project was created as part of my learning journey and exploration in web development.  
It has been a great opportunity to improve my skills, apply best practices, and build something useful and functional.  
Any ideas or suggestions to keep improving it are more than welcome. 🍳
