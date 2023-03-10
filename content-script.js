// for sephora product pages
var ingredients = document.getElementById("ingredients").getElementsByTagName("div")[1].innerHTML
if (ingredients.includes("Clean at Sephora")) {
    ingredients = ingredients.substring(0, ingredients.indexOf("Clean at Sephora"));
}
console.log("content script", ingredients)

// send message back to popup with ingredients that match