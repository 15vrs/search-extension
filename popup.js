chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.pageCapture.saveAsMHTML({ tabId: tab.id }, (tabContentsBlob) => {
        console.log("iinside mhtml", tab.id);
        const reader = tabContentsBlob.stream().getReader();
        let charsReceived = 0;
        let result;
        reader.read().then(function processText({ done, value }) {
          // Result objects contain two properties:
          // done  - true if the stream has already given you all its data.
          // value - some data. Always undefined when done is true.
          if (done) {
            console.log("Stream complete");
            return;
          }
      
          // // value for fetch streams is a Uint8Array
          // charsReceived += value.length;
          // const chunk = value;
          // console.log(chunk)
          // let listItem = document.createElement('li');
          // listItem.textContent = `Received ${charsReceived} characters so far. Current chunk = ${chunk}`;
          
          // result += chunk;
          
          // convert stream into string?
          let string = new TextDecoder().decode(value);
          if (string.con)



          // Read some more, and call this function again
          return reader.read().then(processText);
        });


        console.log(reader);
        
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