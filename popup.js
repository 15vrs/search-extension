chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.pageCapture.saveAsMHTML({ tabId: tab.id }, (tabContentsBlob) => {
        console.log("iinside mhtml", tab.id);
        
        /**
         * download tab as html file
        */
        // file = new File([tabContents], "test.html", {type: 'text/plain'});
        // link = document.createElement('a');
        // link.href = URL.createObjectURL(file);
        // link.download = 'test.html';
        // link.click();
        // URL.revokeObjectURL(link.href)

        /**
         * search file for keywords
         */
        
    });
  });