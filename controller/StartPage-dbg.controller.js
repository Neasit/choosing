"use strict";

sap.ui.define(['ui2/choosingtech/controller/BaseController', 'sap/ui/model/json/JSONModel', 'sap/ui/export/Spreadsheet'], function (BaseController, JSONModel, Spreadsheet) {
  'use strict';

  return BaseController.extend('ui2.choosingtech.controller.StartPage', {
    onInit: function onInit() {
      BaseController.prototype.init.apply(this, arguments);
      this.oRouter.getRoute('StartPage').attachPatternMatched(this.handleRouteMatched, this);
      this.oDialogModel = new JSONModel();
      this.getView().setModel(this.oDialogModel, 'addModel');
    },
    handleRouteMatched: function handleRouteMatched() {},
    onListItemPress: function onListItemPress(oEvent) {
      var oNextUIState = this.getOwnerComponent().getHelper().getNextUIState(1);
      var oSource = oEvent.getSource();
      var oObject = oSource.getBindingContext('dataModel').getObject();
      this.goToPage('Detail', {
        layout: oNextUIState.layout,
        transaction: oObject.id
      });
    },
    onAdd: function onAdd() {
      this.getAddDialog().open();
    },
    getAddDialog: function getAddDialog() {
      if (!this.addDialog) {
        this.addDialog = sap.ui.xmlfragment(this.getView().getId(), 'ui2.choosingtech.fragments.addDialog', this);
        this.addDialog.setModel(this.oDialogModel);
      }

      this.oDialogModel.setData({
        id: '',
        text: ''
      });
      return this.addDialog;
    },
    onAddOk: function onAddOk() {
      var oModel = this.getView().getModel('dataModel');
      var oDialogData = this.oDialogModel.getData();

      if (oDialogData.id) {
        var aData = oModel.getProperty('/transactions');
        aData.push({
          id: oDialogData.id,
          text: oDialogData.text,
          technology: null,
          tech_text: '',
          cost: null,
          cost_text: ''
        });
        oModel.setProperty('/transactions', aData);
        this.getAddDialog().close();
      } else {
        this.showMessage('Введите транзакцию!');
      }
    },
    onAddCancel: function onAddCancel() {
      this.getAddDialog().close();
    },
    getListItemInfo: function getListItemInfo(cost, tech) {
      if (!tech) {
        return 'Не выбрана целевая технология!';
      }

      if (!cost) {
        return 'Не расчитаны трудозатраты!';
      }

      return 'Готово!';
    },
    getListInfoState: function getListInfoState(cost, tech) {
      return cost && tech ? 'Success' : 'Warning';
    },
    onExcelExport: function onExcelExport() {
      var oData = this.getView().getModel('dataModel').getData();

      if (oData.name) {
        this.export();
      } else {
        this.showMessage('Заполните имя!');
      }
    },
    export: function _export() {
      var oData = this.getView().getModel('dataModel').getData();
      var aCols = [{
        label: 'Транзакция',
        property: 'id',
        width: '30'
      }, {
        label: 'Описание',
        property: 'text',
        width: '80'
      }, {
        label: 'Технология',
        property: 'technology',
        width: '25'
      }, {
        label: 'Трудозатраты',
        property: 'cost',
        width: '25'
      }];
      var sFileName = "".concat(oData.name.replaceAll(' ', '_'), "_").concat(oData.department.replaceAll(' ', '_'));
      var oSettings = {
        workbook: {
          columns: aCols
        },
        dataSource: oData.transactions,
        fileName: sFileName
      };
      var oSheet = new Spreadsheet(oSettings);
      oSheet.build().then(function () {
        this.showMessage('Готово!');
      }.bind(this)).finally(oSheet.destroy);
    }
  });
});