sap.ui.define(['ui2/choosingtech/controller/BaseController'], function(BaseController) {
  'use strict';

  return BaseController.extend('ui2.choosingtech.controller.ChoosingTech', {
    onInit: function() {
      BaseController.prototype.init.apply(this, arguments);
      this.oRouter.getRoute('ChoosingTech').attachPatternMatched(this.handleRouteMatched, this);
    },

    handleRouteMatched: function() {
      let aTransactions = this.getView()
        .getModel('dataModel')
        .getProperty('/transactions');
      if (aTransactions && aTransactions.length) {
        let iIndex = aTransactions.findIndex(element => element.id === this.arguments.transaction);
        this.getView().bindElement({
          path: `/transactions/${iIndex}`,
          model: 'dataModel',
        });
        this.bindData(aTransactions[iIndex].tech_step || '1');
        if (aTransactions[iIndex].tech_step) {
          let oStep = this.getView()
            .getModel()
            .getProperty(`/choosing/${aTransactions[iIndex].tech_step}`);
          let iIndexCriterial = oStep.criterions.findIndex(element => element.title === aTransactions[iIndex].technology);
          this.getView()
            .getModel()
            .setProperty(`/choosing/${aTransactions[iIndex].tech_step}/criterions/${iIndexCriterial}/selected`, true);
        }
      } else {
        this.goToPage('StartPage');
      }
    },

    bindData: function(step) {
      this.byId('idQuestionPage1').bindElement({
        path: `/choosing/${step}`,
      });
      this.getView()
        .getModel()
        .getProperty(`/choosing/${step}/criterions`)
        .forEach(
          function(item, i) {
            this.getView()
              .getModel()
              .setProperty(`/choosing/${step}/criterions${i}/selected`, false);
          }.bind(this)
        );
    },

    onYes: function() {
      const oObject = this.byId('idQuestionPage1')
        .getBindingContext()
        .getObject();
      this.bindData(oObject.yes);
    },

    onNo: function() {
      const oObject = this.byId('idQuestionPage1')
        .getBindingContext()
        .getObject();
      this.bindData(oObject.no);
    },

    onReset: function() {
      const oBindingContext = this.getCurrentTransactionContext();
      oBindingContext.getModel().setProperty(oBindingContext.getPath() + '/technology', '');
      oBindingContext.getModel().setProperty(oBindingContext.getPath() + '/tech_step', '');
      this.bindData('1');
    },

    onTechSelect: function(oEvent) {
      const oItem = oEvent.getParameter('listItem');
      const oObject = oItem.getBindingContext().getObject();
      const oBindingContext = this.getCurrentTransactionContext();
      oBindingContext.getModel().setProperty(oBindingContext.getPath() + '/technology', oObject.title);
      oBindingContext.getModel().setProperty(
        oBindingContext.getPath() + '/tech_step',
        oItem
          .getBindingContext()
          .getPath()
          .split('/')[2]
      );
    },

    onCostCalculation: function() {
      this.goToPage('CostCalculation', { transaction: this.arguments.transaction, layout: this.arguments.layout });
    },

    getCurrentTransactionContext: function() {
      return this.byId('idChoosingNav')
        .getCurrentPage()
        .getBindingContext('dataModel');
    },

    getListMode: function(bTextInvisible) {
      return bTextInvisible ? 'SingleSelectMaster' : 'None';
    },
  });
});
