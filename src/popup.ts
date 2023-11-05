// TODO: activate search when extension icon is clicked
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("search")!.addEventListener('click', async () => {
        console.log("search clicked");
        var [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab.id) {
            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["content-script.js"],
            });
        }
    });
})

// receive data from content-script
chrome.runtime.onMessage.addListener(
    function(message: ExtensionMessage, sender, sendResponse) {
        if (!(message.siteSupported)) {
            document.getElementById("results")!.innerHTML = "Site not yet supported"
        }  else if (message.siteSupported && message.data?.ingredientsListFound === false) {
            document.getElementById("results")!.innerHTML = "Ingredients list not found";
        }else if (message.siteSupported && message.data?.ingredientsListFound && message.data?.ingredientsOfConcernFound) {
            document.getElementById("results")!.innerHTML = "Ingredients of concern found: \n" + message.data.ingredientsList;
        } else if (message.siteSupported && message.data?.ingredientsListFound && !message.data?.ingredientsOfConcernFound) {
            document.getElementById("results")!.innerHTML = "No ingredients of concern found."
        }
    }
)
