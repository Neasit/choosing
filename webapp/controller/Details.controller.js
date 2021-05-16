sap.ui.define(['ui2/choosingtech/controller/BaseController'], function(BaseController) {
  'use strict';

  return BaseController.extend('ui2.choosingtech.controller.Details', {
    onInit: function() {
      BaseController.prototype.init.apply(this, arguments);
      this.oRouter.getRoute('Detail').attachPatternMatched(this.handleRouteMatched, this);
    },

    handleRouteMatched: function() {
      let aTransactions = this.getView()
        .getModel('dataModel')
        .getProperty('/transactions');
      if (aTransactions && aTransactions.length) {
        this.getView().bindElement({
          path: `/transactions/${aTransactions.findIndex(element => element.id === this.arguments.transaction)}`,
          model: 'dataModel',
        });
      } else {
        this.goToPage('StartPage');
      }
    },

    onChoosing: function() {
      this.goToPage('ChoosingTech', { transaction: this.arguments.transaction, layout: this.arguments.layout });
    },

    onCostCalculation: function() {
      this.goToPage('CostCalculation', { transaction: this.arguments.transaction, layout: this.arguments.layout });
    },

    getTechnologyText: function(sTech) {
      return sTech || 'Не выбрано';
    },

    getCostText: function(sCost) {
      return sCost ? `${sCost} чел./час` : 'Не рассчитано';
    },

    getStatusText: function(sValue) {
      return sValue ? 'None' : 'Indication02';
    },

    getColorText: function(value) {
      return value ? 'Good' : 'Error';
    },
  });
});
