'use strict';
/* eslint-disable */

window.addEventListener('load', function() {
  var oReady = Promise.resolve();
  var oReg = Promise.resolve();
  var oRegestration = true;

  if ('serviceWorker' in navigator) {
    oReady = navigator.serviceWorker.getRegistration();
  }
  oReady
    .then(function(oRegestration) {
      // register('/service-worker.js');
      if (!oRegestration) {
        oRegestration = false;
      }
      navigator.serviceWorker
        .register('./service-worker.js')
        .then(function(oSW) {
          console.log('Service worker is registered!');
          if (!oRegestration) {
            window.location.reload();
          }
        })
        .catch(function(error) {
          console.error('Error by load Service Worker!');
        });
    })
    .catch(function(error) {
      console.error('Error by load Service Worker!');
    });
});
