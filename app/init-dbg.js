'use strict';
/* eslint-disable */

window.addEventListener('load', function () {
  var oReady = Promise.resolve();
  var oReg = Promise.resolve();
  var oRegestration = true;

  if ('serviceWorker' in navigator) {
    oReady = navigator.serviceWorker.getRegistration();
  }

  oReady.then(function (oRegestration) {
    // register('/service-worker.js');
    if (!oRegestration) {
      oRegestration = false;
    }

    navigator.serviceWorker.register('/service-worker.js').then(function (oSW) {
      if (!oRegestration) {
        window.location.reload();
      }
    }).catch(function (error) {});
  }).catch(function (error) {});
});