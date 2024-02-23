import { ExtensionMessage, MessageData, dirtyDozen } from "./types";

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
    var result: MessageData = performSearch(element.toLowerCase());
    message.data = result
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
    var result: MessageData = performSearch(ingredients.stringValue.toLowerCase());
    message.data = result;
  } else {
    message.data = {
      ingredientsListFound: false,
    };
  }
}
    }
  } else {
    message.data = {
      ingredientsListFound: false,
    };
  }
}

function performSearch(ingredients: string): MessageData {
  var ofConcern: string[] = [];
  var msgData: MessageData = { 
    ingredientsListFound: false,
    ingredientsOfConcernFound: false,
  }
  for (const [category, relatedChemicals] of Object.entries(dirtyDozen)) {
    relatedChemicals.forEach((chemical: string) => {
      if (ingredients.includes(chemical)) {
        ofConcern.push(category);
      }
    });
  }
  if (ofConcern.length == 0) {
    msgData.ingredientsListFound = true;
  } else {
    msgData.ingredientsListFound = true;
    msgData.ingredientsOfConcernFound =true,
    msgData.ingredientsList = ofConcern;
  }
  return msgData;
}
