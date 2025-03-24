let cakeScoreTracker = {
    chocolateCake: 0,
    vanillaCake: 0,
    redVelvetCake: 0,
    lemonCake: 0
};

let selectedAnswers = {}; 

// Event listener for answer buttons
document.querySelectorAll('.cake-choice').forEach(button => {
    button.addEventListener('click', function() {
        let selectedCakeType = this.getAttribute('data-type');
        let questionGroup = this.closest('.question').getAttribute('data-question');

        // Reset previous selections within the same question group
        document.querySelectorAll(`.question[data-question="${questionGroup}"] .cake-choice`).forEach(btn => {
            btn.style.backgroundColor = "#ad6a6c";
        });

        // Apply darker shade to the selected button
        this.style.backgroundColor = "#773344";

        selectedAnswers[questionGroup] = selectedCakeType;
    });
});

// Event listener for submit button
document.getElementById("cakeSubmit").addEventListener("click", function() {
    if (Object.keys(selectedAnswers).length < 5) {
        alert("Please answer all questions before submitting!");
        return;
    }

    // Reset scores before counting
    Object.keys(cakeScoreTracker).forEach(cakeType => cakeScoreTracker[cakeType] = 0);

    // Count selected answers
    Object.values(selectedAnswers).forEach(cakeType => {
        cakeScoreTracker[cakeType]++;
    });

    let highestCakeType = Object.keys(cakeScoreTracker).reduce((topCake, currentCake) => 
        cakeScoreTracker[topCake] > cakeScoreTracker[currentCake] ? topCake : currentCake
    );

    let cakeResultData = determineCakeMatch(highestCakeType);

    // Displaying results
    document.getElementById("cakeType").innerText = cakeResultData.name;
    document.getElementById("cakeDescription").innerText = cakeResultData.description;
    document.getElementById("cakeResult").style.display = "block";
});

// Function to determine the matching cake personality
function determineCakeMatch(cakeType) {
    let cakePersonalityData = {
        chocolateCake: { 
            name: "Chocolate Cake", 
            description: "You are rich, deep, and comforting. You enjoy the simple pleasures in life and bring warmth to those around you."
        },
        vanillaCake: { 
            name: "Vanilla Cake", 
            description: "You are classic, reliable, and timeless. People admire your consistency and your kind nature."
        },
        redVelvetCake: { 
            name: "Red Velvet Cake", 
            description: "You are bold, passionate, and unforgettable. You make a statement wherever you go and radiate confidence."
        },
        lemonCake: { 
            name: "Lemon Cake", 
            description: "You are bright, energetic, and refreshing. Your fun-loving personality makes you stand out in any crowd."
        }
    };

    return cakePersonalityData[cakeType];
}