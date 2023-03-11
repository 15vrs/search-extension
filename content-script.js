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

if (document.title.includes("Sephora")){
    searchSephora();
} else {
    chrome.runtime.sendMessage({
        sender: "content script",
        data: "other searches coming"
    });
}

function searchSephora() {
    var ingredients = document.getElementById("ingredients").getElementsByTagName("div")[1].innerHTML
    if (ingredients.includes("Clean at Sephora")) {
        ingredients = ingredients.substring(0, ingredients.indexOf("<br><br><b>Clean at Sephora"));
    }
    
    // strip out intro blurb
    if (ingredients.includes("<br>")){
        ingredients = ingredients.substring(ingredients.lastIndexOf("<br>")+4, ingredients.length);
    }
    // console.log("chemicals list \n", ingredients)
    
    // send message back to popup with ingredients that match
    var ingredientsOfConcern = []
    chemicalsList.forEach((chemical) => {
        if (ingredients.includes(chemical)) {
            ingredientsOfConcern.push(chemical)
        }
    })
    console.log("ingredients of concern \n", ingredientsOfConcern)
    chrome.runtime.sendMessage({
        sender: "sephora",
        data: {
            ingredientsFound: true,
            ingredientsList: ingredientsOfConcern
        }
    });
}

