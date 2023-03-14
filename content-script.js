// list of chemicals to search for
// source: https://davidsuzuki.org/living-green/dirty-dozen-cosmetic-chemicals-avoid/
var dirtyDozen = {
    "bha-bht": ["BHA", "butylated hydroxyanisole", "BHT", "butylated hydroxytulolene"],
    "coal-tar-dyes": ["p-phenylenediamine", "CI"],
    "dea": ["DEA", "diethanolamine", "MEA", "monoethanolamide", "TEA", "triethanolamine"],
    "dibutyl-pthalates": ["DBP", "dibutyl phthalate", "DEP", "diethyl phthalate",],
    "formaldehyde-preservetives": ["menthenamine", "quaternium-15", "DMDM hydantoin", "imidazolidinyl urea", "sodium hydroxymethylglycinate"],
    "paraben": ["paraben", "methylparaben", "butylparaben", "propylparaben", "isobutylparaben", "ethylparaben"],
    "fragrance": ["parfum", "diethyl phthalate", "DEP"],
    "PEG": ["PEG", "polyethylene glycol", "propylene glycol", "1,4-dioxane"],
    "petrolatum": ["petrolatum"],
    "siloxane": ["cyclotetrasiloxane", "cylcopentasiloxane", "cyclohexasiloxane", "D4", "D5", "D6", "cyclomethicone", "polydimethylsiloxane", "PDMS", "dimethicone"],
    "sodium-laureth-sulfate": ["sodium laureth sulfate", "SLES", "sodium lauryl sulfate", "SLS"],
    "triclosan": ["triclosan"],
}

if (document.title.includes("Sephora")){
    searchSephora();
} else {
    chrome.runtime.sendMessage({
        sender: "content script",
        data: "other searches coming"
    });
}

function searchSephora() {
    var element = document?.getElementById("ingredients")?.getElementsByTagName("div")[1]?.innerHTML;
    if (element){
        var ingredients = findIngredients(element);
        var ingredientsOfConcern = performSearch(ingredients);

        // send message back to popup with ingredients that match
        if (ingredientsOfConcern.length == 0) {
            chrome.runtime.sendMessage({
                sender: "sephora",
                data: {
                    ingredientsFound: false,
                }
            });
        } else {
            chrome.runtime.sendMessage({
                sender: "sephora",
                data: {
                    ingredientsFound: true,
                    ingredientsList: ingredientsOfConcern
                }
            });
        }
    } else {
        chrome.runtime.sendMessage({
            sender: "sephora",
            data: "no product found"
        });
    }
}

function findIngredients(ingredients) {
    if (ingredients.includes("Clean at Sephora")) {
        ingredients = ingredients.substring(0, ingredients.indexOf("<br><br><b>Clean at Sephora"));
    }
    // strip out intro blurb
    if (ingredients.includes("<br><br>")){
        ingredients = ingredients.substring(ingredients.indexOf("<br><br>"), ingredients.length);
    }
    return ingredients;
}

function performSearch(ingredients) {
    var ofConcern = [];
    for (const[category, relatedChemicals] of Object.entries(dirtyDozen)) {
        relatedChemicals.forEach((chemical) => {
            if (ingredients.includes(chemical)) {
                ofConcern.push(category)
            }
        });
    }
    return ofConcern;
}