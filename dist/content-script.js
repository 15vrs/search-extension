(()=>{"use strict";var e={699:(e,n)=>{Object.defineProperty(n,"__esModule",{value:!0}),n.dirtyDozenList=void 0,n.dirtyDozenList={bha:{chemicals:["BHA","butylated hydroxyanisole","BHT","butylated hydroxytulolene"],hazards:["possible skin irritant","possible human carcinogen (BHA)","possible endocrine disruptor"]},coalTarDyes:{chemicals:["p-phenylenediamine","CI"],hazards:["skin and eye irritant","possible human carcinogen."]},dea:{chemicals:["DEA","diethanolamine","MEA","monoethanolamide","TEA","triethanolamine"],hazards:["skin and eye irritant","possible human carcinogen."]},pthalates:{chemicals:["DBP","dibutyl phthalate","DEP","diethyl phthalate"],hazards:["suspected endocrine disruptor","reproductive toxicant"]},formaldehydes:{chemicals:["menthenamine","quaternium-15","DMDM hydantoin","imidazolidinyl urea","sodium hydroxymethylglycinate"],hazards:["known human carcinogen."]},parabens:{chemicals:["paraben","methylparaben","butylparaben","propylparaben","isobutylparaben","ethylparaben"],hazards:["possible endocrine disruptor","possible carcinogen","possible reproductive toxicant"]},fragrance:{chemicals:["parfum","diethyl phthalate","DEP"],hazards:["possible irritants can trigger allergies, migraines, and asthma symptoms"]},peg:{chemicals:["PEG","polyethylene glycol","propylene glycol","1,4-dioxane"],hazards:["possible human carcinogen"]},petrolatum:{chemicals:["petrolatum"],hazards:["possible human carcinogen","possible skin irritatant"]},siloxanes:{chemicals:["cyclotetrasiloxane","cylcopentasiloxane","cyclohexasiloxane","D4","D5","D6","cyclomethicone","polydimethylsiloxane","PDMS","dimethicone"],hazards:["possible endocrine disruptor","possible reproductive toxicant"]},sulfates:{chemicals:["sodium laureth sulfate","SLES","sodium lauryl sulfate","SLS"],hazards:["possible human carcinogen","possible developmental toxicant","possible skin and eye irritant."]},triclosan:{chemicals:["triclosan"],hazards:["possible endocrine disruptor","skin and eye irritant"]}}}},n={};function i(t){var a=n[t];if(void 0!==a)return a.exports;var s=n[t]={exports:{}};return e[t](s,s.exports,i),s.exports}(()=>{const e=i(699);let n={sender:"content script",siteSupported:!1};function t(n){var i=[],t={ingredientsListFound:!1,ingredientsOfConcernFound:!1};for(const[t,a]of Object.entries(e.dirtyDozenList))a.chemicals.forEach((e=>{n.includes(e)&&i.push({category:t,hazards:a.hazards})}));return 0==i.length?t.ingredientsListFound=!0:(t.ingredientsListFound=!0,t.ingredientsOfConcernFound=!0,t.ingredientsList=i),t}document.title.includes("Sephora")?(function(){var e,i,a=null===(i=null===(e=null===document||void 0===document?void 0:document.getElementById("ingredients"))||void 0===e?void 0:e.getElementsByTagName("div")[1])||void 0===i?void 0:i.innerHTML;if(a){a.includes("Clean at Sephora")&&(a=a.substring(0,a.indexOf("<br><br><b>Clean at Sephora"))),a.includes("<br><br>")&&(a=a.substring(a.indexOf("<br><br>"),a.length));var s=t(a.toLowerCase());n.data=s}else n.data={ingredientsListFound:!1}}(),n.sender="sephora",n.siteSupported=!0):document.title.includes("Walmart")?(function(){var e=document.evaluate('//div//h3[text()="Ingredients"]/..//div//span/text()',document,null,XPathResult.STRING_TYPE,null);if(e.stringValue.length>0){var i=t(e.stringValue.toLowerCase());n.data=i}else n.data={ingredientsListFound:!1}}(),n.sender="walmart",n.siteSupported=!0):document.title.includes("Morphe")&&(function(){var e=null===document||void 0===document?void 0:document.getElementById("ing-modal-content-container");if(e){var i=e.innerHTML.toString();i.includes("<h3>")&&(i=i.substring(i.indexOf("</h3>"),i.length));var a=t(i.toLowerCase());n.data=a}else n.data={ingredientsListFound:!1}}(),n.sender="morphe",n.siteSupported=!0),chrome.runtime.sendMessage(n)})()})();