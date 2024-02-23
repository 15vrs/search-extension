// list of chemicals to search for
// source: https://davidsuzuki.org/living-green/dirty-dozen-cosmetic-chemicals-avoid/
var chemicalsList = [
    'BHA', 'butylated hydroxyanisole', 'BHT', 'butylated hydroxytulolene',
    'p-phenylenediamine', 'CI', // coal tar dyes
    'DEA', 'diethanolamine', 'MEA', 'monoethanolamide', 'TEA', 'triethanolamine',
    'DBP', 'dibutyl phthalate', 'DEP', 'diethyl phthalate',
    'menthenamine', 'quaternium-15', 'DMDM hydantoin', 'imidazolidinyl urea', 'sodium hydroxymethylglycinate', // formaldehyde-releasing preservatives
    'paraben', 'methylparaben', 'butylparaben', 'propylparaben', 'isobutylparaben', 'ethylparaben',
    'parfum', 'diethyl phthalate', 'DEP', //fragrance
    'PEG', 'polyethylene glycol', 'propylene glycol', '1,4-dioxane',
    'petrolatum',
    'cyclotetrasiloxane', 'cylcopentasiloxane', 'cyclohexasiloxane', 'D4', 'D5', 'D6', 'cyclomethicone', 'polydimethylsiloxane', 'PDMS', 'dimethicone', // siloxanes
    'sodium laureth sulfate', 'SLES', 'sodium lauryl sulfate', 'SLS',
    'triclosan'
]

if (window.location.host.includes("sephora")) {
    searchSephora();
} else if (window.location.host.includes("morphe")) {
    searchMorphe();
} else {
    chrome.runtime.sendMessage({
        sender: "content script",
        data: "other searches coming"
    });
}

function searchIngredients(ingredients) {
    var flaggedIngredients = [];
    chemicalsList.forEach((chemical) => {
        if (ingredients.includes(chemical)) {
            flaggedIngredients.push(chemical)
        }
    });
    return flaggedIngredients;
}

function searchSephora() {
    var ingredients = document.getElementById("ingredients").getElementsByTagName("div")[1].innerHTML;
    if (ingredients.includes("Clean at Sephora")) {
        ingredients = ingredients.substring(0, ingredients.indexOf("<br><br><b>Clean at Sephora"));
    }

    // strip out intro blurb
    if (ingredients.includes("<br>")) {
        ingredients = ingredients.substring(ingredients.lastIndexOf("<br>") + 4, ingredients.length);
    }
    // console.log("chemicals list \n", ingredients)

    var ingredientsOfConcern = searchIngredients(ingredients);

    // send message back to popup with ingredients that match
    console.log("ingredients of concern \n", ingredientsOfConcern)
    if (ingredients.length > 0) {
        chrome.runtime.sendMessage({
            sender: "sephora",
            data: {
                ingredientsFound: true,
                ingredientsList: ingredientsOfConcern
            }
        });
    } else {
        chrome.runtime.sendMessage({
            sender: "sephora",
            data: {
                ingredientsFound: false,
            }
        });
    }
}

function searchMorphe() {
    var find = window.find("Ingredients");
    var section = document.getElementsByClassName("resp-tab-content");
    var sectionContent = document.getElementsByClassName("resp-tab-content");
    for (let i=0; i< section.length; i++){
        var id = "tab_item-" + i;
        var header = document.querySelector(`h2[aria-controls=${id}]`).textContent;
        if (header.toLowerCase() === "ingredients") {
            var ingredients = document.querySelector(`div[id=${id}]`).textContent;
            var ingredientsOfConcern = searchIngredients(ingredients);
        }
    }
    if (ingredients.length > 0) {
        chrome.runtime.sendMessage({
            sender: "morphe",
            data: {
                ingredientsFound: true,
                ingredientsList: ingredientsOfConcern
            }
        });
    } else {
        chrome.runtime.sendMessage({
            sender: "morphe",
            data: {
                ingredientsFound: false,
            }
        });
    }
}