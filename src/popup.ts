import { ExtensionMessage, ResultsList } from "./types";

// TODO: activate search when extension icon is clicked
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("search")!.addEventListener("click", async () => {
    console.log("search clicked");
    var [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab.id) {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content-script.js"],
      });
    }
  });
});

// receive data from content-script
chrome.runtime.onMessage.addListener(function (
  message: ExtensionMessage,
  sender,
  sendResponse
) {
  if (!message.siteSupported) {
    document.getElementById("results")!.innerHTML = "Site not yet supported";
  } else if (
    message.siteSupported &&
    message.data?.ingredientsListFound === false
  ) {
    document.getElementById("results")!.innerHTML =
      "Ingredients list not found";
  } else if (
    message.siteSupported &&
    message.data?.ingredientsListFound &&
    message.data?.ingredientsOfConcernFound
  ) {
    var body = "Ingredients of concern found";
    message.data.ingredientsList!.forEach((result: ResultsList) => {
      body += "\n" + result.category + ": " + result.hazards + "\n"
    })
    document.getElementById("results")!.innerHTML = body;
  } else if (
    message.siteSupported &&
    message.data?.ingredientsListFound &&
    !message.data?.ingredientsOfConcernFound
  ) {
    document.getElementById("results")!.innerHTML =
      "No ingredients of concern found.";
  }
});
