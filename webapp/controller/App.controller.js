sap.ui.define(['ui2/choosingtech/controller/BaseController'], function(BaseController) {
  'use strict';

  return BaseController.extend('ui2.choosingtech.controller.App', {
    onInit: function() {},

    onStateChanged: function(oEvent) {
      var bIsNavigationArrow = oEvent.getParameter('isNavigationArrow'),
        sLayout = oEvent.getParameter('layout');

      this.getOwnerComponent()._updateUIElements();

      // Replace the URL with the new layout if a navigation arrow was used
      if (bIsNavigationArrow) {
        this.oRouter.navTo(this.currentRouteName, { layout: sLayout, product: this.currentProduct, supplier: this.currentSupplier }, true);
      }
    },

    onExit: function() {
      this.oRouter.detachRouteMatched(this.onRouteMatched, this);
      this.oRouter.detachBeforeRouteMatched(this.onBeforeRouteMatched, this);
    },
  });
});
