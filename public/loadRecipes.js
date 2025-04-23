// loads recipes from the database to be displayed on the recipe cards page

document.addEventListener("DOMContentLoaded", async () => {
    try {
      const res = await fetch("/api/recipes");
      const recipes = await res.json();
  
      const container = document.querySelector(".recipe-holder");
      container.innerHTML = "";

      // Row container for formatting to match our original slay layout
      const row = document.createElement("div");
      row.classList.add("row");
  
      recipes.forEach(recipe => {
        const ingredientsList = Array.isArray(recipe.ingredients)
          ? recipe.ingredients.map(i => `<li>${i}</li>`).join("")
          : (recipe.ingredients || "").split(",").map(i => `<li>${i.trim()}</li>`).join("");
  
        const instructionsList = Array.isArray(recipe.instructions)
          ? recipe.instructions.map(i => `<li>${i}</li>`).join("")
          : (recipe.instructions || "").split(",").map(i => `<li>${i.trim()}</li>`).join("");
  
        const card = document.createElement("div");
        card.classList.add("card-flip");
        card.innerHTML = `
          <div class="inside-card-flip">
            <div class="front-card-flip">
              <h2><center>${recipe.title}</center></h2>
              <img src="${recipe.image_url || 'images/default.jpg'}" width="250" height="250">
            </div>
            <div class="back-card-flip">
              <h2>Ingredients</h2>
              <ul>${ingredientsList}</ul>
              <h2>Instructions</h2>
              <ol>${instructionsList}</ol>
            </div>
          </div>
        `;
        row.appendChild(card);
      });

      container.appendChild(row);

    } catch (err) {
      console.error("Failed to load recipes", err);
    }
  });
  