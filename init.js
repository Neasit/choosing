"use strict";window.addEventListener("load",function(){var e=Promise.resolve();var r=Promise.resolve();var i=true;if("serviceWorker"in navigator){e=navigator.serviceWorker.getRegistration()}e.then(function(e){if(!e){e=false}navigator.serviceWorker.register("./service-worker.js").then(function(r){if(!e){window.location.reload()}}).catch(function(e){})}).catch(function(e){})});