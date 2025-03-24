let selectedDrink = null;

// Event listener for drink selection
document.querySelectorAll('.drink-choice').forEach(button => {
    button.addEventListener('click', function() {
        let drinkGroup = this.closest('.question').getAttribute('data-question');

        document.querySelectorAll(`.question[data-question="${drinkGroup}"] .drink-choice`).forEach(btn => {
            btn.style.backgroundColor = "#ad6a6c";
        });

        this.style.backgroundColor = "#773344";
        selectedDrink = this.getAttribute('data-type');
    });
});

// Event listener for submit button
document.getElementById("drinkSubmit").addEventListener("click", function() {
    if (!selectedDrink) {
        alert("Please select a drink before submitting!");
        return;
    }

    let drinkResultData = getDessertPairing(selectedDrink);

    document.getElementById("drinkDessert").innerText = drinkResultData.name;
    document.getElementById("drinkDessertDescription").innerText = drinkResultData.description;
    document.getElementById("drinkResult").style.display = "block";
});

// Function to determine the best dessert pairing for a given drink
function getDessertPairing(drinkType) {
    let dessertPairings = {
        coffee: { 
            name: "Classic Tiramisu", 
            description: "Tiramisu and coffee are a match made in heaven, with rich espresso-soaked layers complementing the bold flavors of coffee."
        },
        tea: { 
            name: "Earl Grey Crème Brûlée", 
            description: "The delicate flavors of Earl Grey-infused custard pair beautifully with a warm cup of tea."
        },
        milk: { 
            name: "Chocolate Lava Cake", 
            description: "A warm, gooey lava cake is even better with a cold glass of milk to balance the richness."
        },
        hotChocolate: { 
            name: "S’mores Donut", 
            description: "A delicious s’mores donut complements the chocolatey goodness of hot cocoa!"
        },
        redWine: { 
            name: "Chocolate Raspberry Mousse Cake", 
            description: "The fruity, deep flavors of red wine enhance the decadence of chocolate and raspberries."
        },
        whiteWine: { 
            name: "Strawberry Shortcake", 
            description: "A refreshing white wine pairs wonderfully with the light and fruity flavors of a classic strawberry shortcake."
        },
        fruitJuice: { 
            name: "Raspberry Macarons", 
            description: "A tangy fruit juice pairs well with the sweetness of raspberry macarons."
        },
        milkshake: { 
            name: "Peanut Butter Cups", 
            description: "A creamy milkshake and homemade peanut butter cups create a nostalgic and delicious treat!"
        }
    };

    return dessertPairings[drinkType];
}