function findRecipe(){
    const Sbar = document.getElementById('SearchBar');
    const recipeFilter = Sbar.value.toUpperCase();
    const dessertCards = document.querySelectorAll('.card-flip');

    dessertCards.forEach(cardFlip => {
        // debugging findRecipe function
        const specificDessert = cardFlip.querySelector('.front-card-flip h2 center')?.innerText || '';
        //const specificDessert = cardFlip.querySelector('h2').textContent.trim();
        console.log("Search JS loaded");

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