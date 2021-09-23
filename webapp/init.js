'use strict';
/* eslint-disable */

window.addEventListener('load', function() {
  var oReady;

  if ('serviceWorker' in navigator) {
    oReady = Promise.resolve(navigator.serviceWorker.controller);
  } else {
    oReady = Promise.reject(new Error('Service Worker is not supported!'));
  }

  oReady
    .then(function(oRegestration) {
      if (!oRegestration) {
        navigator.serviceWorker
          .register('service-worker.js', {
            scope: '/',
          })
          .then(function(oSW) {
            console.log('Service worker is registered!');
            if (!oRegestration) {
              window.location.reload();
            }
          })
          .catch(function(error) {
            console.error('Error by load Service Worker!');
          });
      }
    })
    .catch(function(error) {
      console.error(error.message);
    });
});
