// list of chemicals to search for
// source: https://davidsuzuki.org/living-green/dirty-dozen-cosmetic-chemicals-avoid/
const dirtyDozen = {
    "BHA and BHT": ["BHA", "butylated hydroxyanisole", "BHT", "butylated hydroxytulolene"],
    "coal tar dyes": ["p-phenylenediamine", "CI"],
    "DEA-related ingredients": ["DEA", "diethanolamine", "MEA", "monoethanolamide", "TEA", "triethanolamine"],
    "dibutyl pthalates": ["DBP", "dibutyl phthalate", "DEP", "diethyl phthalate",],
    "formaldehyde-preservetives": ["menthenamine", "quaternium-15", "DMDM hydantoin", "imidazolidinyl urea", "sodium hydroxymethylglycinate"],
    "parabens": ["paraben", "methylparaben", "butylparaben", "propylparaben", "isobutylparaben", "ethylparaben"],
    "fragrance": ["parfum", "diethyl phthalate", "DEP"],
    "PEG compounds": ["PEG", "polyethylene glycol", "propylene glycol", "1,4-dioxane"],
    "petrolatum": ["petrolatum"],
    "siloxanes": ["cyclotetrasiloxane", "cylcopentasiloxane", "cyclohexasiloxane", "D4", "D5", "D6", "cyclomethicone", "polydimethylsiloxane", "PDMS", "dimethicone"],
    "sodium laureth sulfate": ["sodium laureth sulfate", "SLES", "sodium lauryl sulfate", "SLS"],
    "triclosan": ["triclosan"],
}

if (document.title.includes("Sephora")){
    searchSephora();
} else {
    chrome.runtime.sendMessage({
        sender: "content script",
        data: {
            siteSupported: false
        }
    });
}

function searchSephora() {
    var element = document?.getElementById("ingredients")?.getElementsByTagName("div")[1]?.innerHTML;
    if (element){
        var ingredients: string = findIngredients(element);
        var ingredientsOfConcern: string[] = performSearch(ingredients);

        // send message back to popup with ingredients that match
        if (ingredientsOfConcern.length == 0) {
            chrome.runtime.sendMessage({
                sender: "sephora",
                siteSupported: true,
                data: {
                    ingredientsFound: false,
                }
            });
        } else {
            chrome.runtime.sendMessage({
                sender: "sephora",
                siteSupported: true,
                data: {
                    ingredientsFound: true,
                    ingredientsList: ingredientsOfConcern
                }
            });
        }
    } else {
        chrome.runtime.sendMessage({
            sender: "sephora",
            siteSupported: true,
            data: undefined
        });
    }
}

function findIngredients(ingredients: string) {
    if (ingredients.includes("Clean at Sephora")) {
        ingredients = ingredients.substring(0, ingredients.indexOf("<br><br><b>Clean at Sephora"));
    }
    // strip out intro blurb
    if (ingredients.includes("<br><br>")){
        ingredients = ingredients.substring(ingredients.indexOf("<br><br>"), ingredients.length);
    }
    return ingredients;
}

function performSearch(ingredients: string) {
    var ofConcern: string[] = [];
    for (const[category, relatedChemicals] of Object.entries(dirtyDozen)) {
        relatedChemicals.forEach((chemical) => {
            if (ingredients.includes(chemical)) {
                ofConcern.push(category)
            }
        });
    }
    return ofConcern;
}