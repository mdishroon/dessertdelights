function findRecipe(){
    const Sbar = document.getElementById('SearchBar');
    const recipeFilter = Sbar.value.toUpperCase();
    const dessertCards = document.querySelectorAll('.card-flip');

    dessertCards.forEach(cardFlip => {
        // debugging findRecipe function
        const specificDessert = cardFlip.querySelector('.front-card-flip h2')?.textContent.trim() || '';
        console.log("Search JS loaded");
        console.log("Dessert Title:", specificDessert);

        //old variable, changed by mollie for testing
        //const specificDessert = cardFlip.querySelector('h2').innerText;
        if (specificDessert.toUpperCase().includes(recipeFilter)) {
            cardFlip.style.display = '';
        } 
        else {
            cardFlip.style.display = 'none';
        }
    });
    
}

// wait until the full HTML is loaded before attaching the search bar event
document.addEventListener("DOMContentLoaded", () => {
    const Sbar = document.getElementById('SearchBar');
    if (Sbar) {
        Sbar.addEventListener("keyup", findRecipe);
    }
});
