"use strict";

sap.ui.define(['ui2/choosingtech/controller/BaseController'], function (BaseController) {
  'use strict';

  return BaseController.extend('ui2.choosingtech.controller.ChoosingTech', {
    onInit: function onInit() {
      BaseController.prototype.init.apply(this, arguments);
      this.oRouter.getRoute('ChoosingTech').attachPatternMatched(this.handleRouteMatched, this);
    },
    handleRouteMatched: function handleRouteMatched() {
      var _this = this;

      var aTransactions = this.getView().getModel('dataModel').getProperty('/transactions');

      if (aTransactions && aTransactions.length) {
        var iIndex = aTransactions.findIndex(function (element) {
          return element.id === _this.arguments.transaction;
        });
        this.getView().bindElement({
          path: "/transactions/".concat(iIndex),
          model: 'dataModel'
        });
        this.bindData(aTransactions[iIndex].tech_step || '1');

        if (aTransactions[iIndex].tech_step) {
          var oStep = this.getView().getModel().getProperty("/choosing/".concat(aTransactions[iIndex].tech_step));
          var iIndexCriterial = oStep.criterions.findIndex(function (element) {
            return element.title === aTransactions[iIndex].technology;
          });
          this.getView().getModel().setProperty("/choosing/".concat(aTransactions[iIndex].tech_step, "/criterions/").concat(iIndexCriterial, "/selected"), true);
        }
      } else {
        this.goToPage('StartPage');
      }
    },
    bindData: function bindData(step) {
      this.byId('idQuestionPage1').bindElement({
        path: "/choosing/".concat(step)
      });
      this.getView().getModel().getProperty("/choosing/".concat(step, "/criterions")).forEach(function (item, i) {
        this.getView().getModel().setProperty("/choosing/".concat(step, "/criterions").concat(i, "/selected"), false);
      }.bind(this));
    },
    onYes: function onYes() {
      var oObject = this.byId('idQuestionPage1').getBindingContext().getObject();
      this.bindData(oObject.yes);
    },
    onNo: function onNo() {
      var oObject = this.byId('idQuestionPage1').getBindingContext().getObject();
      this.bindData(oObject.no);
    },
    onReset: function onReset() {
      var oBindingContext = this.getCurrentTransactionContext();
      oBindingContext.getModel().setProperty(oBindingContext.getPath() + '/technology', '');
      oBindingContext.getModel().setProperty(oBindingContext.getPath() + '/tech_step', '');
      this.bindData('1');
    },
    onTechSelect: function onTechSelect(oEvent) {
      var oItem = oEvent.getParameter('listItem');
      var oObject = oItem.getBindingContext().getObject();
      var oBindingContext = this.getCurrentTransactionContext();
      oBindingContext.getModel().setProperty(oBindingContext.getPath() + '/technology', oObject.title);
      oBindingContext.getModel().setProperty(oBindingContext.getPath() + '/tech_step', oItem.getBindingContext().getPath().split('/')[2]);
    },
    onCostCalculation: function onCostCalculation() {
      this.goToPage('CostCalculation', {
        transaction: this.arguments.transaction,
        layout: this.arguments.layout
      });
    },
    getCurrentTransactionContext: function getCurrentTransactionContext() {
      return this.byId('idChoosingNav').getCurrentPage().getBindingContext('dataModel');
    },
    getListMode: function getListMode(bTextInvisible) {
      return bTextInvisible ? 'SingleSelectMaster' : 'None';
    }
  });
});