function findRecipe(){
    const Sbar = document.getElementById('SearchBar');
    const recipeFilter = Sbar.value.toUpperCase();
    const dessertCards = document.querySelectorAll('.card-flip');

    dessertCards.forEach(cardFlip => {
        const specificDessert = cardFlip.querySelector('h2').innerText;
        if (specificDessert.toUpperCase().includes(recipeFilter)) {
            cardFlip.style.display = '';
        } 
        else {
            cardFlip.style.display = 'none';
        }
    });
    

}