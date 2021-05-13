sap.ui.define(['sap/ui/core/UIComponent', 'ui2/choosingtech/model/models'], function(
  UIComponent,
  models,
  KundeModel,
  FilterModel
) {
  'use strict';

  return UIComponent.extend('ui2.choosingtech.Component', {
    metadata: {
      manifest: 'json',
    },

    /**
     * The component is initialized by UI5 automatically during the startup of the app and
     * calls the init method once.
     * @public
     * @override
     */
    init: function() {
      UIComponent.prototype.init.apply(this, arguments);

      var oData = this.getComponentData() || {};

      this.getRouter().initialize();
    }
  });
});
