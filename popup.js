console.log("popup js");

// TODO: activate search when icon is clicked
document.getElementById("search").addEventListener('click', async () => {
    var [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ["content-script.js"]
    });
});

// // TODO: activate search when extension icon is clicked
// // listens to click on button on extension html
// document.getElementById("search").addEventListener('click', async () => {
//     var [tab] = await chrome.tabs.query({active: true, currentWindow: true});
//     chrome.scripting.executeScript({
//         target: {tabId: tab.id},
//         func: getHTML,
//         args: [tab.url]
//     });
// });


