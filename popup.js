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
            document.getElementById("results").innerHTML = message.data.ingredientsList
        } else if (message?.data) {
            document.getElementById("results").innerHTML = message.data

        }
    }
)
