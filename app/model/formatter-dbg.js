"use strict";

sap.ui.define([], function (NumberFormat) {
  'use strict';

  return {
    changeKunde: function changeKunde(sKunde, sText) {
      return !sKunde || sKunde === '0' ? sText : sKunde;
    },
    editPossible: function editPossible(sKunde, bEdit) {
      return !!sKunde && sKunde !== '0' && !bEdit;
    }
  };
});