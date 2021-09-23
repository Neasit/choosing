"use strict";

sap.ui.define(['sap/ui/model/json/JSONModel', 'sap/ui/Device'], function (JSONModel, Device) {
  'use strict';

  return {
    createDeviceModel: function createDeviceModel() {
      var oModel = new JSONModel(Device);
      oModel.setDefaultBindingMode('OneWay');
      return oModel;
    },
    createAppModel: function createAppModel() {
      return new JSONModel();
      /*
      {
        layout: 'OneColumn', // TwoColumnsMidExpanded, OneColumn
      }
       */
    },
    createDataModel: function createDataModel() {
      return new JSONModel({
        name: '',
        department: '',
        transactions: [
          /*
              id: 'SM30',
              text: '',
              technology: null,
              tech_step: '',
              cost: null,
              cost_step: ''
             */
        ],
        display: {
          costSelectVisible: true
        }
      });
    }
  };
});