sap.ui.define(
  ['sap/ui/core/UIComponent', 'ui2/choosingtech/model/models', 'sap/f/library', 'sap/f/FlexibleColumnLayoutSemanticHelper', 'sap/base/util/UriParameters'],
  function(UIComponent, models, library, FlexibleColumnLayoutSemanticHelper, UriParameters) {
    'use strict';

    var LayoutType = library.LayoutType;

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

        this.setModel(models.createAppModel(), 'appModel');
        this.setModel(models.createDataModel(), 'dataModel');

        this.getRouter().initialize();
        this.getRouter().attachRouteMatched(this.onRouteMatched, this);
        this.getRouter().attachBeforeRouteMatched(this.onBeforeRouteMatched, this);
      },

      getHelper: function() {
        var oFCL = this.getRootControl().byId('appexample'),
          oParams = UriParameters.fromQuery(location.search),
          oSettings = {
            defaultTwoColumnLayoutType: LayoutType.TwoColumnsMidExpanded,
            defaultThreeColumnLayoutType: LayoutType.ThreeColumnsMidExpanded,
            mode: oParams.get('mode'),
            maxColumnsCount: 2,
          };

        return FlexibleColumnLayoutSemanticHelper.getInstanceFor(oFCL, oSettings);
      },

      onRouteMatched: function(oEvent) {
        var sRouteName = oEvent.getParameter('name'),
          oArguments = oEvent.getParameter('arguments');

        this._updateUIElements();

        // Save the current route name
        this.currentRouteName = sRouteName;
        this.currentProduct = oArguments.product;
        this.currentSupplier = oArguments.supplier;
      },

      onBeforeRouteMatched: function(oEvent) {
        var oModel = this.getModel('appModel');
        var sLayout = oEvent.getParameters().arguments.layout;
        // If there is no layout parameter, query for the default level 0 layout (normally OneColumn)
        if (!sLayout) {
          var oNextUIState = this.getHelper().getNextUIState(0);
          sLayout = oNextUIState.layout;
        }

        // Update the layout of the FlexibleColumnLayout
        if (sLayout) {
          oModel.setProperty('/layout', sLayout);
        }
      },

      _updateUIElements: function() {
        var oModel = this.getModel('appModel');
        var oUIState = this.getHelper().getCurrentUIState();
        oModel.setData(oUIState);
      },
    });
  }
);
