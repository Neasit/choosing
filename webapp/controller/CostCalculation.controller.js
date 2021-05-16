sap.ui.define(['ui2/choosingtech/controller/BaseController'], function(BaseController) {
  'use strict';

  return BaseController.extend('ui2.choosingtech.controller.CostCalculation', {
    onInit: function() {
      BaseController.prototype.init.apply(this, arguments);
      this.oRouter.getRoute('CostCalculation').attachPatternMatched(this.handleRouteMatched, this);
      this.oDataModel = this.getOwnerComponent().getModel('dataModel');
    },

    handleRouteMatched: function() {
      const aBtnIds = ['idBtn1', 'idBtn2', 'idBtn3', 'idBtn4', 'idBtn5', 'idBtn6'];
      let aTransactions = this.oDataModel.getProperty('/transactions');
      if (aTransactions && aTransactions.length) {
        let iIndex = aTransactions.findIndex(element => element.id === this.arguments.transaction);
        this.getView().bindElement({
          path: `/transactions/${iIndex}`,
          model: 'dataModel',
        });
        let oObject = aTransactions[iIndex];
        let sTech = oObject.technology || 'SAPUI5';
        this.oDataModel.setProperty('/display/costSelectVisible', !!oObject.technology);
        this.currentTech = oObject.technology || null;
        let oTechKey = this.getView()
          .getModel()
          .getProperty('/tech/list')
          .find(item => item.text === sTech);
        this.byId('idIconTab').setSelectedKey(oTechKey.key);
        this.currentTech = oTechKey.key;
        if (!oTechKey) {
          oTechKey = { key: 'SAPUI5' };
        }
        this.byId('idContentBlock').bindElement(`/tech/data/${oTechKey.key}/data`);
        this.byId('idInfo').bindElement(`/tech/data/${oTechKey.key}/data/materials`);
        let sBtnId = oObject.cost_step || null;
        aBtnIds.forEach(
          function(sId) {
            this.byId(sId).setPressed(false);
          }.bind(this)
        );
        if (sBtnId) {
          this.byId(`idBtn${sBtnId}`).setPressed(true);
        }
      } else {
        this.goToPage('StartPage');
      }
    },

    onTechSelect: function(oEvent) {
      let sTech = oEvent.getParameter('key');
      this.byId('idContentBlock').bindElement(`/tech/data/${sTech}/data`);
      this.byId('idInfo').bindElement(`/tech/data/${sTech}/data/materials`);
      if (this.currentTech && this.currentTech === sTech) {
        this.oDataModel.setProperty('/display/costSelectVisible', true);
      } else {
        this.oDataModel.setProperty('/display/costSelectVisible', false);
      }
    },

    onCostSelect: function(oEvent) {
      const aBtnIds = ['idBtn1', 'idBtn2', 'idBtn3', 'idBtn4', 'idBtn5', 'idBtn6'];
      const aCurrentBtnId = oEvent
        .getSource()
        .getId()
        .split('--');
      const sCurrentBtnId = aCurrentBtnId[aCurrentBtnId.length - 1];
      let sStep = oEvent
        .getSource()
        .getBinding('text')
        .getPath()
        .split('/')[0];
      let sCost = oEvent
        .getSource()
        .getBinding('text')
        .getValue();
      if (!oEvent.getParameter('pressed')) {
        sStep = null;
        sCost = null;
      }
      aBtnIds.forEach(
        function(sId) {
          if (sId !== sCurrentBtnId) {
            this.byId(sId).setPressed(false);
          }
        }.bind(this)
      );
      const oDataContext = this.getView().getBindingContext('dataModel');
      oDataContext.getModel().setProperty(oDataContext.getPath() + '/cost', sCost);
      oDataContext.getModel().setProperty(oDataContext.getPath() + '/cost_step', sStep);
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

    getCostButtonText: function(sValue) {
      return `Трудозатраты ${sValue} чел./час`;
    },
  });
});
