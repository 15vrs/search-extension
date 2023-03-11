/**
 * no access to DOM, is event handler
 * has access to APIs
 * background.js loads on extension load, is constantly running?
 * 
 * when extension opened, send message to content script to send DOM
 */
// chrome.runtime.onMessage.addListener(
//     function(message, sender, sendResponse) {
//         console.log("message", message);
//     }
// )
