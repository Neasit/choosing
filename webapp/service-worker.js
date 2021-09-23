/* eslint-disable */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
  console.log('Workbox is loaded');
  // index.html and JavaScript files
  workbox.routing.registerRoute(
    new RegExp('(index.html|.*.js|.*.json)'),
    // Fetch from the network, but fall back to cache
    workbox.strategies.networkFirst()
  );
  // CSS, fonts, i18n
  workbox.routing.registerRoute(
    /(.*\.css|.*\.properties|.*\.woff2)/,
    // Use cache but update in the background ASAP
    workbox.strategies.staleWhileRevalidate({
      // Use a custom cache name
      cacheName: 'asset-cache',
    })
  );
  workbox.precaching.precacheAndRoute([
      'resources/sap/ui/export/js/XLSXBuilder.js',
      'resources/sap/ui/export/js/SpreadsheetWorker.js',
      'resources/sap/ui/export/js/libs/JSZip3.js',
      'resources/sap/ui/export/js/libs/uri.all.min.js',
      'data/main.json',
      'manifest.json',
      'Component-preload.js',
      'index.html',
      'init.js',
      'manifest-bundle.zip',
  ]);
} else {
  console.log('Workbox didnt load');
}

