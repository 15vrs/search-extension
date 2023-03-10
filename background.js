/**
 * no access to DOM, is event handler
 * has access to APIs
 * background.js loads on extension load, is constantly running?
 * 
 * when extension opened, send message to content script to send DOM
 */

console.log("background js called");

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        console.log("background js received msg from popup", message);
        // if (request.onMessage === "clicked browser action") {
        // }

    }
)