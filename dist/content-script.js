(()=>{"use strict";var e={699:(e,n)=>{Object.defineProperty(n,"__esModule",{value:!0}),n.dirtyDozen=void 0,n.dirtyDozen={bha:["BHA","butylated hydroxyanisole","BHT","butylated hydroxytulolene"],coalTarDyes:["p-phenylenediamine","CI"],dea:["DEA","diethanolamine","MEA","monoethanolamide","TEA","triethanolamine"],pthalates:["DBP","dibutyl phthalate","DEP","diethyl phthalate"],formaldehydes:["menthenamine","quaternium-15","DMDM hydantoin","imidazolidinyl urea","sodium hydroxymethylglycinate"],parabens:["paraben","methylparaben","butylparaben","propylparaben","isobutylparaben","ethylparaben"],fragrance:["parfum","diethyl phthalate","DEP"],peg:["PEG","polyethylene glycol","propylene glycol","1,4-dioxane"],petrolatum:["petrolatum"],siloxanes:["cyclotetrasiloxane","cylcopentasiloxane","cyclohexasiloxane","D4","D5","D6","cyclomethicone","polydimethylsiloxane","PDMS","dimethicone"],sulfates:["sodium laureth sulfate","SLES","sodium lauryl sulfate","SLS"],triclosan:["triclosan"]}}},n={};function t(a){var i=n[a];if(void 0!==i)return i.exports;var o=n[a]={exports:{}};return e[a](o,o.exports,t),o.exports}(()=>{const e=t(699);let n={sender:"content script",siteSupported:!1};document.title.includes("Sephora")&&(function(){var t,a,i,o=null===(a=null===(t=null===document||void 0===document?void 0:document.getElementById("ingredients"))||void 0===t?void 0:t.getElementsByTagName("div")[1])||void 0===a?void 0:a.innerHTML;if(o){var r=function(n){var t=[];for(const[a,i]of Object.entries(e.dirtyDozen))i.forEach((e=>{n.includes(e)&&t.push(a)}));return t}(((i=o).includes("Clean at Sephora")&&(i=i.substring(0,i.indexOf("<br><br><b>Clean at Sephora"))),i.includes("<br><br>")&&(i=i.substring(i.indexOf("<br><br>"),i.length)),i.toLowerCase()));0==r.length?n.data={ingredientsListFound:!0,ingredientsOfConcernFound:!1}:n.data={ingredientsListFound:!0,ingredientsOfConcernFound:!0,ingredientsList:r}}else n.data={ingredientsListFound:!1}}(),n.sender="sephora",n.siteSupported=!0),chrome.runtime.sendMessage(n)})()})();