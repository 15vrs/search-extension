import { ExtensionMessage, dirtyDozen } from "./types";

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
                ingredientsListFound: true,
                ingredientsOfConcernFound: false,
            }
        } else {
            message.data = {
                ingredientsListFound: true,
                ingredientsOfConcernFound: true,
                ingredientsList: ingredientsOfConcern
            }
        }
    } else {
        message.data = {
            ingredientsListFound: false,
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
    return ingredients.toLowerCase();
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