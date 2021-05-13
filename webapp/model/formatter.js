sap.ui.define(['sap/ui/core/format/NumberFormat'], function(NumberFormat) {
  'use strict';

  var oFloatNumberFormat = NumberFormat.getFloatInstance(
    {
      maxFractionDigits: 5,
      minFractionDigits: 0,
      groupingEnabled: false,
    },
    sap.m.getLocale()
  );

  return {
    formatFloatLocal: function(sFloat) {
      return oFloatNumberFormat.format(parseFloat(sFloat));
    },

    changeKunde: function(sKunde, sText) {
      return !sKunde || sKunde === '0' ? sText : sKunde;
    },

    editPossible: function(sKunde, bEdit) {
      return !!sKunde && sKunde !== '0' && !bEdit;
    },
  };
});
