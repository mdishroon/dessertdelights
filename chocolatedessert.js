let chocoScoreTracker = {
    lavaCake: 0,
    strawberryRoll: 0,
    raspberryMousse: 0,
    saltedCaramelCupcake: 0,
    tiramisu: 0,
    fudgeBrownie: 0,
    almondTruffles: 0,
    mochaCheesecake: 0
};

let selectedChocoAnswers = {};

// Event listener for answer buttons
document.querySelectorAll('.choco-choice').forEach(button => {
    button.addEventListener('click', function() {
        let selectedChocoType = this.getAttribute('data-type');
        let questionGroup = this.closest('.question').getAttribute('data-question');

        document.querySelectorAll(`.question[data-question="${questionGroup}"] .choco-choice`).forEach(btn => {
            btn.style.backgroundColor = "#ad6a6c"; // Reset to original button color
        });

        this.style.backgroundColor = "#773344"; // Darker shade for selected choice
        selectedChocoAnswers[questionGroup] = selectedChocoType;
    });
});

// Function to find the highest scoring chocolate dessert
function getHighestChocoType() {
    let maxScore = Math.max(...Object.values(chocoScoreTracker));
    let topMatches = Object.keys(chocoScoreTracker).filter(key => chocoScoreTracker[key] === maxScore);

    return topMatches.length === 1 ? topMatches[0] : topMatches[Math.floor(Math.random() * topMatches.length)];
}

// Event listener for submit button
document.getElementById("chocoSubmit").addEventListener("click", function() {
    if (Object.keys(selectedChocoAnswers).length < 5) {
        alert("Please answer all questions before submitting!");
        return;
    }

    Object.keys(chocoScoreTracker).forEach(chocoType => chocoScoreTracker[chocoType] = 0);

    // Count selected answers
    Object.values(selectedChocoAnswers).forEach(chocoType => {
        chocoScoreTracker[chocoType]++;
    });

    let highestChocoType = getHighestChocoType();

    let chocoResultData = determineChocoMatch(highestChocoType);

    // Display result
    document.getElementById("chocoType").innerText = chocoResultData.name;
    document.getElementById("chocoDescription").innerText = chocoResultData.description;
    document.getElementById("chocoResult").style.display = "block";
});

// Function to determine the matching chocolate dessert personality
function determineChocoMatch(chocoType) {
    let chocoPersonalityData = {
        lavaCake: { name: "Chocolate Lava Cake", description: "You're to the point and easy-going!!" },
        strawberryRoll: { name: "Chocolate Strawberry Cake Rolls", description: "You're sweet, playful, and romantic!" },
        raspberryMousse: { name: "Chocolate Raspberry Mousse Cake", description: "You're elegant, deep, and sophisticated." },
        saltedCaramelCupcake: { name: "Salted Caramel Chocolate Cupcakes", description: "You're balanced, fun, and full of life!" },
        tiramisu: { name: "Chocolate Cream & Cherries Tiramisu", description: "You're bold, classic, and unforgettable." },
        fudgeBrownie: { name: "Triple Chocolate Fudge Brownie", description: "You're comforting, rich, and always reliable!" },
        almondTruffles: { name: "Dark Chocolate Almond Truffles", description: "You're sophisticated, refined, and luxurious." },
        mochaCheesecake: { name: "White Chocolate Mocha Cheesecake", description: "You're cozy, comforting, and smooth!" }
    };

    return chocoPersonalityData[chocoType];
}