sap.ui.define(['sap/m/Shell', 'sap/ui/core/ComponentContainer'], function(Shell, ComponentContainer) {
  sap.ui.loader.config({
    // location from where to load all modules by default
    baseUrl: 'resources/',
    // activate real async loading and module definitions
    async: true,
  });

  sap.ui.getCore().loadLibrary('sap.ui.core', { async: true });
  sap.ui.getCore().loadLibrary('sap.ui.layout', { async: true });
  sap.ui.getCore().loadLibrary('sap.m', { async: true });
  sap.ui.getCore().loadLibrary('sap.f', { async: true });
  sap.ui.getCore().loadLibrary('sap.ui.export', { async: true });

  sap.ui
    .component({
      name: 'ui2.choosingtech',
      manifest: true,
      async: true,
    })
    .then(function(oComp) {
      var oContainer = new ComponentContainer({ height: '100%', component: oComp });
      new Shell({
        app: oContainer,
      }).placeAt('content');
    });
});
