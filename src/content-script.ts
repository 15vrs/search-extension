// list of chemicals to search for
// source: https://davidsuzuki.org/living-green/dirty-dozen-cosmetic-chemicals-avoid/
const dirtyDozen: DirtyDozenChemicals = {
    bha: ["BHA", "butylated hydroxyanisole", "BHT", "butylated hydroxytulolene"],
    coalTarDyes: ["p-phenylenediamine", "CI"],
    dea: ["DEA", "diethanolamine", "MEA", "monoethanolamide", "TEA", "triethanolamine"],
    pthalates: ["DBP", "dibutyl phthalate", "DEP", "diethyl phthalate",],
    formaldehydes: ["menthenamine", "quaternium-15", "DMDM hydantoin", "imidazolidinyl urea", "sodium hydroxymethylglycinate"],
    parabens: ["paraben", "methylparaben", "butylparaben", "propylparaben", "isobutylparaben", "ethylparaben"],
    fragrance: ["parfum", "diethyl phthalate", "DEP"],
    peg: ["PEG", "polyethylene glycol", "propylene glycol", "1,4-dioxane"],
    petrolatum: ["petrolatum"],
    siloxanes: ["cyclotetrasiloxane", "cylcopentasiloxane", "cyclohexasiloxane", "D4", "D5", "D6", "cyclomethicone", "polydimethylsiloxane", "PDMS", "dimethicone"],
    sulfates: ["sodium laureth sulfate", "SLES", "sodium lauryl sulfate", "SLS"],
    triclosan: ["triclosan"],
}

let message: ExtensionMessage = {
    sender: "content script",
    siteSupported: false
};

if (document.title.includes("Sephora")){
    searchSephora();
    message.sender = "sephora";
    message.siteSupported = true;
}
chrome.runtime.sendMessage(message);

function searchSephora() {
    var element = document?.getElementById("ingredients")?.getElementsByTagName("div")[1]?.innerHTML;
    if (element){
        var ingredients: string = findIngredients(element);
        var ingredientsOfConcern: string[] = performSearch(ingredients);

        // send message back to popup with ingredients that match
        if (ingredientsOfConcern.length == 0) {
            message.data = {
                ingredientsFound: false,
            }
        } else {
            message.data = {
                ingredientsFound: true,
                ingredientsList: ingredientsOfConcern
            }
        }
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
        relatedChemicals.forEach((chemical: string) => {
            if (ingredients.includes(chemical)) {
                ofConcern.push(category)
            }
        });
    }
    return ofConcern;
}