# 🍽️ Aplicación Web de Recetas  

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![jsPDF](https://img.shields.io/badge/jsPDF-8A4182?style=flat&logo=jsPDF&logoColor=white)

### 🌐 Disponible en otros idiomas

- [🇬🇧 English](README.md)

---

## 💾 Descripción del Proyecto
Aplicación de recetas con organizador semanal y lista de la compra.
Permite visualizar recetas, planificar comidas, generar automáticamente la lista de ingredientes y compartirla fácilmente por WhatsApp u otras aplicaciones.
Además, ofrece la opción de descargar el organizador semanal en formato PDF, facilitando la planificación y gestión del menú.

## 🛠️ Tecnologías Utilizadas

- **HTML5** — estructura semántica de la aplicación  
- **CSS3** — estilos modulares y diseño responsive  
- **JavaScript (ES6+)** — lógica principal y gestión dinámica del DOM  
- **JSON** — exportación e importación de recetas como copia de seguridad  
- **[jsPDF](https://github.com/parallax/jsPDF)** — generación del organizador semanal en PDF  
- **[Font Awesome](https://fontawesome.com/)** — iconografía utilizada en la interfaz
  
## 📁 Estructura del Proyecto

```bash
/recipes/                     ← 📂 Carpeta raíz del proyecto
│
├── index.html                ← 🌐 Página principal de la aplicación
│
├── css/                      ← 🎨 Carpeta de estilos
│   ├── base.css              ← Estilos base y tipografías
│   ├── components.css        ← Estilos generales para componentes
│   ├── layout.css            ← Estructura y distribución de la página
│   ├── media-queries.css     ← Estilos responsivos
│   ├── reset.css             ← Reset de estilos del navegador
│   ├── style.css             ← Estilos principales globales
│   ├── utilities.css         ← Clases utilitarias 
│   ├── variables.css         ← Variables CSS (colores, tipografías, tamaños)
│   └── components/           ← Estilos de componentes individuales
│       ├── form.css          ← Formularios de recetas
│       ├── header.css        ← Header de la página
│       ├── modals.css        ← Ventanas modales
│       ├── navbar.css        ← Barra de navegación
│       ├── recipes.css       ← Visualización de recetas
│       ├── shoppingList.css  ← Lista de la compra
│       ├── table.css         ← Planificador semanal
│       └── toggle.css        ← Botones de alternancia y temas
│
├── js/                       ← 💻 Carpeta de scripts
│   ├── main.js               ← Lógica principal de la aplicación
│   ├── dom.js                ← Manipulación del DOM
│   ├── exporter.js           ← Exportación a JSON
│   ├── helpers.js            ← Funciones auxiliares
│   ├── modal.js              ← Gestión de modales
│   ├── recipes.js            ← Gestión de recetas (CRUD)
│   ├── render.js             ← Renderizado dinámico de contenido
│   ├── search.js             ← Búsqueda y filtrado de recetas
│   ├── shopping-list.js      ← Gestión de la lista de la compra
│   ├── table-export.js       ← Exportación del planificador semanal
│   └── table.js              ← Lógica del planificador de comidas
│
└── img/                      ← 🖼️ Imágenes, fondos y elementos gráficos
```

## ⚙️ Funcionalidades

- 🧾 **Formulario para añadir recetas** con nombre, ingredientes, pasos y tiempo de preparación  
- 🖼️ **Opción de agregar una imagen** a cada receta para una presentación más visual  
- 🔍 **Buscador y filtros avanzados** para encontrar recetas por nombre, categoría o ingredientes  
- 📋 **Visualización de recetas** con información detallada y diseño organizado  
- 🗓️ **Organizador semanal** para planificar las comidas de forma intuitiva  
- 🛒 **Generación automática de la lista de la compra** según las recetas seleccionadas  
- 📱 **Compartir lista por WhatsApp u otras aplicaciones** para facilitar las compras  
- 📤 **Exportación e importación de recetas** en formato JSON como copia de seguridad  
- 🧾 **Descarga del organizador semanal en PDF** con formato claro y estructurado  
- 💾 **Guardado local** mediante `localStorage` para mantener las recetas y el planificador  
- 🌐 **Diseño moderno, limpio y adaptable** optimizado para distintos dispositivos

## ✨ Principales Funciones JavaScript

| Función                           | Propósito |
| --------------------------------- | ---------- |
| `addIngredientFromInput()`        | Añade un nuevo ingrediente desde el campo de entrada |
| `addInstructionFromInput()`       | Agrega una instrucción de preparación de forma dinámica |
| `renderRecipesList()`             | Muestra la lista de recetas con paginación |
| `renderRecipesNamesList()`        | Renderiza los nombres de recetas en el modal para selección rápida |
| `searchBy()`                      | Busca recetas por nombre o palabra clave |
| `applyFilters()`                  | Filtra recetas por categoría, dificultad o tiempo |
| `resetForm()`                     | Limpia y reinicia todos los campos del formulario |
| `saveRecipes()`                   | Guarda las recetas en `localStorage` para mantener la persistencia |
| `convertImageToBase64()`          | Convierte imágenes subidas a formato Base64 |
| `exportRecipesToJSON()`           | Exporta todas las recetas en un archivo JSON (copia de seguridad) |
| `importRecipesFromJSON()`         | Importa recetas desde un archivo JSON |
| `generatePDF()`                   | Exporta el menú semanal en formato PDF |
| `addToCell()`                     | Asigna una receta a una celda del planificador semanal |
| `clearAllCells()`                 | Limpia todas las celdas del planificador semanal |
| `shareShoppingListWhatsApp()`     | Comparte la lista de la compra por WhatsApp |
| `copyShoppingListToClipboard()`   | Copia la lista de la compra al portapapeles |
| `shareShoppingListSystem()`       | Comparte la lista de la compra mediante el menú del sistema |

---

## 📃 Características Avanzadas

* Arquitectura modular — organizada en varios módulos JS (`helpers.js`, `recipes.js`, `render.js`, `table.js`, etc.)
* Almacenamiento persistente con `localStorage`
* Importación y exportación de recetas en formato JSON
* Planificador semanal con asignación interactiva de recetas
* Sistema de búsqueda en tiempo real y filtrado avanzado
* Generación de PDF del menú semanal mediante `jsPDF`
* Soporte para subir, previsualizar y eliminar imágenes de recetas
* Interfaz responsive con paginación adaptable
* Controles accesibles por teclado, ratón y pantalla táctil
* Navegación suave con scroll y menú hamburguesa adaptable

## 📹 Demo de la App

<a href="https://youtu.be/eD5VSm9K98I" target="_blank">
  <img src="https://img.youtube.com/vi/eD5VSm9K98I/maxresdefault.jpg" width="360" height="202" alt="Demo de la App" />
</a>


## 📷 Vista Previa

<img width="800" alt="Captura de pantalla 2025-10-31 a las 10 43 46" src="https://github.com/user-attachments/assets/2e4d68bd-5e43-48eb-b366-3203f8efb50f" />
<img width="800" alt="Captura de pantalla 2025-10-31 a las 10 44 34" src="https://github.com/user-attachments/assets/94d5c136-9b87-44c3-8305-d4b954a85866" />
<img width="800" alt="Captura de pantalla 2025-10-31 a las 10 44 49" src="https://github.com/user-attachments/assets/899d0536-d2af-4ee8-9385-bf1f8ad43a27" />
<img width="800" alt="Captura de pantalla 2025-10-31 a las 10 45 21" src="https://github.com/user-attachments/assets/9ae54545-0073-40e7-82fd-6d9093e6ea1b" />

## 🚀 Mejoras Previstas

- 🌐 **Soporte multilenguaje completo** para que los usuarios puedan elegir su idioma  
- 🔒 **Backend y gestión de usuarios** con inicio de sesión y sesiones seguras  
- 💾 **Base de datos centralizada** para almacenar recetas, planificaciones y preferencias de cada usuario  
- 🤝 **Compartir recetas entre usuarios** para crear una comunidad y facilitar la colaboración    

## 🎨 Créditos

* Fondo principal modificado a partir de una imagen de [Freepik](https://www.freepik.es/foto-gratis/marco-plano-pasta-e-ingredientes-crudos_6080829.htm).  
* Imagen complementaria (libreta) recortada de [Freepik](https://www.freepik.es/foto-gratis/vista-superior-surtido-verduras-portapapeles_12418251.htm).  
* Iconos proporcionados por [Font Awesome](https://fontawesome.com/).  
* Proyecto desarrollado íntegramente con HTML, CSS y JavaScript.  

## 📅 Última Actualización

**Noviembre 2025**

## 👤 Autor

[Ruth Millán](https://github.com/Ruthmp)&nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;&nbsp;  [🌐 CV Web](https://portfolio-ruth.vercel.app)&nbsp;&nbsp;&nbsp;   || &nbsp;&nbsp;&nbsp; [🔗 LinkedIn](https://www.linkedin.com/in/ruth-millan-piqueras/)

---

❤️ Este proyecto surge como parte de mi aprendizaje y exploración en desarrollo web.  
Ha sido una oportunidad para mejorar mis habilidades, practicar buenas prácticas y crear algo útil y funcional.  
Cualquier idea o sugerencia para seguir mejorándolo será muy bien recibida. 🍳
