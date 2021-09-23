"use strict";

sap.ui.define(['ui2/choosingtech/controller/BaseController'], function (BaseController) {
  'use strict';

  return BaseController.extend('ui2.choosingtech.controller.CostCalculation', {
    onInit: function onInit() {
      BaseController.prototype.init.apply(this, arguments);
      this.oRouter.getRoute('CostCalculation').attachPatternMatched(this.handleRouteMatched, this);
      this.oDataModel = this.getOwnerComponent().getModel('dataModel');
    },
    handleRouteMatched: function handleRouteMatched() {
      var _this = this;

      var aBtnIds = ['idBtn1', 'idBtn2', 'idBtn3', 'idBtn4', 'idBtn5', 'idBtn6'];
      var aTransactions = this.oDataModel.getProperty('/transactions');

      if (aTransactions && aTransactions.length) {
        var iIndex = aTransactions.findIndex(function (element) {
          return element.id === _this.arguments.transaction;
        });
        this.getView().bindElement({
          path: "/transactions/".concat(iIndex),
          model: 'dataModel'
        });
        var oObject = aTransactions[iIndex];
        var sTech = oObject.technology || 'SAPUI5';
        this.oDataModel.setProperty('/display/costSelectVisible', !!oObject.technology);
        this.currentTech = oObject.technology || null;
        var oTechKey = this.getView().getModel().getProperty('/tech/list').find(function (item) {
          return item.text === sTech;
        });
        this.byId('idIconTab').setSelectedKey(oTechKey.key);
        this.currentTech = oTechKey.key;

        if (!oTechKey) {
          oTechKey = {
            key: 'SAPUI5'
          };
        }

        this.byId('idContentBlock').bindElement("/tech/data/".concat(oTechKey.key, "/data"));
        this.byId('idInfo').bindElement("/tech/data/".concat(oTechKey.key, "/data/materials"));
        var sBtnId = oObject.cost_step || null;
        aBtnIds.forEach(function (sId) {
          this.byId(sId).setPressed(false);
        }.bind(this));

        if (sBtnId) {
          this.byId("idBtn".concat(sBtnId)).setPressed(true);
        }
      } else {
        this.goToPage('StartPage');
      }
    },
    onTechSelect: function onTechSelect(oEvent) {
      var sTech = oEvent.getParameter('key');
      this.byId('idContentBlock').bindElement("/tech/data/".concat(sTech, "/data"));
      this.byId('idInfo').bindElement("/tech/data/".concat(sTech, "/data/materials"));

      if (this.currentTech && this.currentTech === sTech) {
        this.oDataModel.setProperty('/display/costSelectVisible', true);
      } else {
        this.oDataModel.setProperty('/display/costSelectVisible', false);
      }
    },
    onCostSelect: function onCostSelect(oEvent) {
      var aBtnIds = ['idBtn1', 'idBtn2', 'idBtn3', 'idBtn4', 'idBtn5', 'idBtn6'];
      var aCurrentBtnId = oEvent.getSource().getId().split('--');
      var sCurrentBtnId = aCurrentBtnId[aCurrentBtnId.length - 1];
      var sStep = oEvent.getSource().getBinding('text').getPath().split('/')[0];
      var sCost = oEvent.getSource().getBinding('text').getValue();

      if (!oEvent.getParameter('pressed')) {
        sStep = null;
        sCost = null;
      }

      aBtnIds.forEach(function (sId) {
        if (sId !== sCurrentBtnId) {
          this.byId(sId).setPressed(false);
        }
      }.bind(this));
      var oDataContext = this.getView().getBindingContext('dataModel');
      oDataContext.getModel().setProperty(oDataContext.getPath() + '/cost', sCost);
      oDataContext.getModel().setProperty(oDataContext.getPath() + '/cost_step', sStep);
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
    getCostButtonText: function getCostButtonText(sValue) {
      return "\u0422\u0440\u0443\u0434\u043E\u0437\u0430\u0442\u0440\u0430\u0442\u044B ".concat(sValue, " \u0447\u0435\u043B./\u0447\u0430\u0441");
    }
  });
});