// TODO: activate search when extension icon is clicked
document.getElementById("search").addEventListener('click', async () => {
    var [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    await chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ["content-script.js"],
    });
});

// receive data from content-script
chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        if (message?.data?.ingredientsFound) {
            var message = "Ingredients of Concern found: " + message.data.ingredientsList;
            document.getElementById("results").innerHTML = message;
        } else {
            document.getElementById("results").innerHTML = "No ingredients of concern found"

        }
    }
)
