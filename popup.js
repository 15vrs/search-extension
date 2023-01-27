/**
 * list of chemicals to search for
 * source: https://davidsuzuki.org/living-green/dirty-dozen-cosmetic-chemicals-avoid/
 */
const chemicals = [
  'BHA', 'butylated hydroxyanisole', 'BHT', 'butylated hydroxytulolene',
  'p-phenylenediamine', 'CI', // coal tar dyes
  'DEA', 'diethanolamine', 'MEA', 'monoethanolamide', 'TEA', 'triethanolamine',
  'DBP', 'dibutyl phthalate', 'DEP', 'diethyl phthalate',
  'menthenamine', 'quaternium-15', 'DMDM hydantoin', 'imidazolidinyl urea', 'sodium hydroxymethylglycinate', // formaldehyde-releasing preservatives
  'paraben', 'methylparaben', 'butylparaben', 'propylparaben', 'isobutylparaben', 'ethylparaben',
  'parfum', 'diethyl phthalate', 'DEP', //fragrance
  'PEG', 'polyethylene glycol', 'propylene glycol', '1,4-dioxane',
  'petrolatum',
  'cyclotetrasiloxane', 'cylcopentasiloxane', 'cyclohexasiloxane', 'D4', 'D5', 'D6', 'cyclomethicone', 'polydimethylsiloxane', 'PDMS', 'dimethicone', // siloxanes
  'sodium laureth sulfate', 'SLES', 'sodium lauryl sulfate', 'SLS',
  'triclosan'
]
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
          chemicals.forEach(chem => {
            if (string.includes(chem))
              console.log(chem, 'found')
          });


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