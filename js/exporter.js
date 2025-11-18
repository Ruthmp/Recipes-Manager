/**
 * exporter.js
* Module for exporting and importing recipes in JSON format.
 */

// -----  EXPORT RECIPES IN JSON -----
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

// -----  IMPORT RECIPES IN JSON -----
export function importRecipesFromJSON(onImport) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";

  input.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedRecipes = JSON.parse(e.target.result);

        if (!Array.isArray(importedRecipes)) {
          throw new Error("El archivo no contiene un array válido");
        }

        // Get current recipes from localStorage to avoid collisions
        const current = JSON.parse(localStorage.getItem('recipes') || '[]');
        const existingIds = new Set(current.map(r => String(r.id)));

        // Helper to generate a safe ID
        const genId = () => {
          if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
          return `${Date.now()}-${Math.floor(Math.random()*1000000)}`;
        };

        // Normalize import: keep the ID if it doesn’t collide, generate a new one if it’s missing or collides
        const processed = importedRecipes.map(r => {
          const copy = { ...r };
          const rId = copy.id !== undefined && copy.id !== null ? String(copy.id) : null;

          if (!rId || existingIds.has(rId)) {
            // generate a new id
            const newId = genId();
            copy.id = newId;
            existingIds.add(String(newId));
          } else {
            // valid ID and no collision
            existingIds.add(rId);
          }

          return copy;
        });

        console.log("Import - IDs originales:", importedRecipes.map(r => r.id));
        console.log("Import - IDs procesados:", processed.map(r => r.id));

        // Pass the already processed array to the callback
        onImport(processed);
        alert("✅ Recetas importadas correctamente)");
      } catch (error) {
        console.error("Error al importar recetas:", error);
        alert("❌ Archivo no válido o con formato incorrecto");
      }
    };

    reader.readAsText(file);
  });

  input.click();
}

