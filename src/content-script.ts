import { ExtensionMessage, dirtyDozen } from "./types";

let message: ExtensionMessage = {
  sender: "content script",
  siteSupported: false,
};

if (document.title.includes("Sephora")) {
  searchSephora();
  message.sender = "sephora";
  message.siteSupported = true;
} else if (document.title.includes("Walmart")) {
  searchWalmart();
  message.sender = "walmart";
  message.siteSupported = true;
}
chrome.runtime.sendMessage(message);

function searchSephora() {
  var element = document
    ?.getElementById("ingredients")
    ?.getElementsByTagName("div")[1]?.innerHTML;
  if (element) {
    if (element.includes("Clean at Sephora")) {
      element = element.substring(
        0,
        element.indexOf("<br><br><b>Clean at Sephora")
      );
    }
    // strip out intro blurb
    if (element.includes("<br><br>")) {
      element = element.substring(element.indexOf("<br><br>"), element.length);
    }
    var ingredientsOfConcern: string[] = performSearch(element.toLowerCase());

    // send message back to popup with ingredients that match
    if (ingredientsOfConcern.length == 0) {
      message.data = {
        ingredientsListFound: true,
        ingredientsOfConcernFound: false,
      };
    } else {
      message.data = {
        ingredientsListFound: true,
        ingredientsOfConcernFound: true,
        ingredientsList: ingredientsOfConcern,
      };
    }
  } else {
    message.data = {
      ingredientsListFound: false,
    };
  }
}

function searchWalmart() {
  const path = '//div//h3[text()="Ingredients"]/..//div//span/text()';
  var ingredients: XPathResult = document.evaluate(
    path,
    document,
    null,
    XPathResult.STRING_TYPE,
    null
  );
  if (ingredients.stringValue.length > 0) {
    var result = performSearch(ingredients.stringValue.toLowerCase());
    if (result.length == 0) {
      message.data = {
        ingredientsListFound: true,
        ingredientsOfConcernFound: false,
      };
    } else {
      message.data = {
        ingredientsListFound: true,
        ingredientsOfConcernFound: true,
        ingredientsList: result,
      };
    }
  } else {
    message.data = {
      ingredientsListFound: false,
    };
  }
}

function performSearch(ingredients: string) {
  var ofConcern: string[] = [];
  for (const [category, relatedChemicals] of Object.entries(dirtyDozen)) {
    relatedChemicals.forEach((chemical: string) => {
      if (ingredients.includes(chemical)) {
        ofConcern.push(category);
      }
    });
  }
  return ofConcern;
}
