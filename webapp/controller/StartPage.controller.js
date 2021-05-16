sap.ui.define(['ui2/choosingtech/controller/BaseController', 'sap/ui/model/json/JSONModel', 'sap/ui/export/Spreadsheet'], function(
  BaseController,
  JSONModel,
  Spreadsheet
) {
  'use strict';

  return BaseController.extend('ui2.choosingtech.controller.StartPage', {
    onInit: function() {
      BaseController.prototype.init.apply(this, arguments);
      this.oRouter.getRoute('StartPage').attachPatternMatched(this.handleRouteMatched, this);
      this.oDialogModel = new JSONModel();
      this.getView().setModel(this.oDialogModel, 'addModel');
    },

    handleRouteMatched: function() {},

    onListItemPress: function(oEvent) {
      let oNextUIState = this.getOwnerComponent()
        .getHelper()
        .getNextUIState(1);
      const oSource = oEvent.getSource();
      const oObject = oSource.getBindingContext('dataModel').getObject();
      this.goToPage('Detail', { layout: oNextUIState.layout, transaction: oObject.id });
    },

    onAdd: function() {
      this.getAddDialog().open();
    },

    getAddDialog: function() {
      if (!this.addDialog) {
        this.addDialog = sap.ui.xmlfragment(this.getView().getId(), 'ui2.choosingtech.fragments.addDialog', this);
        this.addDialog.setModel(this.oDialogModel);
      }
      this.oDialogModel.setData({
        id: '',
        text: '',
      });
      return this.addDialog;
    },

    onAddOk: function() {
      const oModel = this.getView().getModel('dataModel');
      const oDialogData = this.oDialogModel.getData();
      if (oDialogData.id) {
        let aData = oModel.getProperty('/transactions');
        aData.push({
          id: oDialogData.id,
          text: oDialogData.text,
          technology: null,
          tech_text: '',
          cost: null,
          cost_text: '',
        });
        oModel.setProperty('/transactions', aData);
        this.getAddDialog().close();
      } else {
        this.showMessage('Введите транзакцию!');
      }
    },

    onAddCancel: function() {
      this.getAddDialog().close();
    },

    getListItemInfo: function(cost, tech) {
      if (!tech) {
        return 'Не выбрана целевая технология!';
      }
      if (!cost) {
        return 'Не расчитаны трудозатраты!';
      }
      return 'Готово!';
    },

    getListInfoState: function(cost, tech) {
      return cost && tech ? 'Success' : 'Warning';
    },

    onExcelExport: function() {
      let oData = this.getView()
        .getModel('dataModel')
        .getData();
      if (oData.name) {
        this.export();
      } else {
        this.showMessage('Заполните имя!');
      }
    },

    export: function() {
      let oData = this.getView()
        .getModel('dataModel')
        .getData();
      let aCols = [
        {
          label: 'Транзакция',
          property: 'id',
          width: '30',
        },
        {
          label: 'Описание',
          property: 'text',
          width: '80',
        },
        {
          label: 'Технология',
          property: 'technology',
          width: '25',
        },
        {
          label: 'Трудозатраты',
          property: 'cost',
          width: '25',
        },
      ];
      let sFileName = `${oData.name.replaceAll(' ', '_')}_${oData.department.replaceAll(' ', '_')}`;
      let oSettings = {
        workbook: { columns: aCols },
        dataSource: oData.transactions,
        fileName: sFileName,
      };

      var oSheet = new Spreadsheet(oSettings);
      oSheet
        .build()
        .then(
          function() {
            this.showMessage('Готово!');
          }.bind(this)
        )
        .finally(oSheet.destroy);
    },
  });
});
