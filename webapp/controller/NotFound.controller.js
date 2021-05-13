sap.ui.define(['ui2/choosingtech/controller/BaseController'], function(BaseController) {
  'use strict';

  return BaseController.extend('ui2.choosingtech.controller.NotFound', {
    /**
     * Navigates to the masterPR when the link is pressed
     * @public
     */
    onLinkPressed: function() {
      this.getRouter().navTo('StartPage');
    },
  });
});
