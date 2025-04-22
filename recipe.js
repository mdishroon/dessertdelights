document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("add-recipe-form");
    if (!form) return;
  
    form.addEventListener("submit", function(event) {
      event.preventDefault();
  
      const title = document.getElementById("recipe-title").value.trim();
      const image = document.getElementById("recipe-image").value.trim();
      const ingredientsRaw = document.getElementById("recipe-ingredients").value.trim();
      const instructionsRaw = document.getElementById("recipe-instructions").value.trim();
  
      // Basic validation
      if (!title) {
        alert("Please enter a recipe title.");
        return;
      }
  
      // Convert text fields to arrays
      const ingredientsArray = ingredientsRaw 
        ? ingredientsRaw.split(",").map(i => i.trim())
        : [];
      const instructionsArray = instructionsRaw
        ? instructionsRaw.split("\n").map(i => i.trim())
        : [];
  
      // Create a unique ID
      const recipeId = "recipe-" + Date.now();
  
      const newRecipe = {
        id: recipeId,
        title: title,
        image: image || "images/placeholder.png",
        ingredients: ingredientsArray,
        instructions: instructionsArray
      };
  
      // Read existing recipes
      let storedRecipes = localStorage.getItem("userRecipes");
      let recipes = storedRecipes ? JSON.parse(storedRecipes) : [];
  
      // Add new recipe
      recipes.push(newRecipe);
  
      // Save
      localStorage.setItem("userRecipes", JSON.stringify(recipes));
  
      // Redirect to recipeCards.html with a hash
      window.location.href = "recipeCards.html#" + recipeId;
    });
  });
  