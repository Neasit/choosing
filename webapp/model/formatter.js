sap.ui.define([], function(NumberFormat) {
  'use strict';
  return {
    changeKunde: function(sKunde, sText) {
      return !sKunde || sKunde === '0' ? sText : sKunde;
    },

    editPossible: function(sKunde, bEdit) {
      return !!sKunde && sKunde !== '0' && !bEdit;
    },
  };
});
