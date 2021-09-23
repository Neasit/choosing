"use strict";

sap.ui.define(['ui2/choosingtech/controller/BaseController'], function (BaseController) {
  'use strict';

  return BaseController.extend('ui2.choosingtech.controller.Details', {
    onInit: function onInit() {
      BaseController.prototype.init.apply(this, arguments);
      this.oRouter.getRoute('Detail').attachPatternMatched(this.handleRouteMatched, this);
    },
    handleRouteMatched: function handleRouteMatched() {
      var _this = this;

      var aTransactions = this.getView().getModel('dataModel').getProperty('/transactions');

      if (aTransactions && aTransactions.length) {
        this.getView().bindElement({
          path: "/transactions/".concat(aTransactions.findIndex(function (element) {
            return element.id === _this.arguments.transaction;
          })),
          model: 'dataModel'
        });
      } else {
        this.goToPage('StartPage');
      }
    },
    onChoosing: function onChoosing() {
      this.goToPage('ChoosingTech', {
        transaction: this.arguments.transaction,
        layout: this.arguments.layout
      });
    },
    onCostCalculation: function onCostCalculation() {
      this.goToPage('CostCalculation', {
        transaction: this.arguments.transaction,
        layout: this.arguments.layout
      });
    },
    getTechnologyText: function getTechnologyText(sTech) {
      return sTech || 'Не выбрано';
    },
    getCostText: function getCostText(sCost) {
      return sCost ? "".concat(sCost, " \u0447\u0435\u043B./\u0447\u0430\u0441") : 'Не рассчитано';
    },
    getStatusText: function getStatusText(sValue) {
      return sValue ? 'None' : 'Indication02';
    },
    getColorText: function getColorText(value) {
      return value ? 'Good' : 'Error';
    }
  });
});