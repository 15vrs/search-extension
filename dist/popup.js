(()=>{"use strict";({975:function(){var e=this&&this.__awaiter||function(e,n,t,i){return new(t||(t=Promise))((function(d,o){function r(e){try{u(i.next(e))}catch(e){o(e)}}function s(e){try{u(i.throw(e))}catch(e){o(e)}}function u(e){var n;e.done?d(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(r,s)}u((i=i.apply(e,n||[])).next())}))};document.addEventListener("DOMContentLoaded",(()=>{document.getElementById("search").addEventListener("click",(()=>e(void 0,void 0,void 0,(function*(){console.log("search clicked");var[e]=yield chrome.tabs.query({active:!0,currentWindow:!0});e.id&&(yield chrome.scripting.executeScript({target:{tabId:e.id},files:["content-script.js"]}))}))))})),chrome.runtime.onMessage.addListener((function(e,n,t){var i,d,o,r,s;e.siteSupported?e.siteSupported&&!1===(null===(i=e.data)||void 0===i?void 0:i.ingredientsListFound)?document.getElementById("results").innerHTML="Ingredients list not found":e.siteSupported&&(null===(d=e.data)||void 0===d?void 0:d.ingredientsListFound)&&(null===(o=e.data)||void 0===o?void 0:o.ingredientsOfConcernFound)?document.getElementById("results").innerHTML="Ingredients of concern found: \n"+e.data.ingredientsList:e.siteSupported&&(null===(r=e.data)||void 0===r?void 0:r.ingredientsListFound)&&!(null===(s=e.data)||void 0===s?void 0:s.ingredientsOfConcernFound)&&(document.getElementById("results").innerHTML="No ingredients of concern found."):document.getElementById("results").innerHTML="Site not yet supported"}))}})[975]()})();