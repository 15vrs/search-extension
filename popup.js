// TODO: activate search when extension icon is clicked
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("search").addEventListener('click', async () => {
        console.log("search clicked");
        var [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["content-script.js"],
        });
    });
})

// receive data from content-script
chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        if (message?.data?.ingredientsFound) {
            document.getElementById("results").innerHTML = "Ingredients of concern found: \n" + message.data.ingredientsList;
        } else if (!message?.data?.ingredientsFound) {
            document.getElementById("results").innerHTML = "No ingredients of concern found."

        } else {
            document.getElementById("results").innerHTML = message.data
        }
    }
)
