/**
 * exporter.js
* Module for exporting and importing recipes in JSON format.
 */

// ----- 🔹 EXPORT RECIPES IN JSON -----
export function exportRecipesToJSON(recipes) {
  try {
    const dataStr = JSON.stringify(recipes, null, 2); // Pretty print with 2 spaces
    const blob = new Blob([dataStr], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "mis_recetas.json";
    link.click();
    URL.revokeObjectURL(link.href);
    alert("✅ Recetas exportadas correctamente");
  } catch (error) {
    console.error("Error al exportar recetas:", error);
    alert("❌ Error al exportar recetas");
  }
}

// ----- 🔹 IMPORT RECIPES IN JSON -----
export function importRecipesFromJSON(onImport) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";

  input.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedRecipes = JSON.parse(e.target.result);

        if (Array.isArray(importedRecipes)) {
          // Pass the data to the main callback.
          onImport(importedRecipes);
          alert("✅ Recetas importadas correctamente");
        } else {
          throw new Error("El archivo no contiene un array válido");
        }
      } catch (error) {
        console.error("Error al importar recetas:", error);
        alert("❌ Archivo no válido o con formato incorrecto");
      }
    };

    reader.readAsText(file);
  });

  input.click();
}
