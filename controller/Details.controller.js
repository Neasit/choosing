"use strict";sap.ui.define(["ui2/choosingtech/controller/BaseController"],function(t){"use strict";return t.extend("ui2.choosingtech.controller.Details",{onInit:function n(){t.prototype.init.apply(this,arguments);this.oRouter.getRoute("Detail").attachPatternMatched(this.handleRouteMatched,this)},handleRouteMatched:function t(){var n=this;var o=this.getView().getModel("dataModel").getProperty("/transactions");if(o&&o.length){this.getView().bindElement({path:"/transactions/".concat(o.findIndex(function(t){return t.id===n.arguments.transaction})),model:"dataModel"})}else{this.goToPage("StartPage")}},onChoosing:function t(){this.goToPage("ChoosingTech",{transaction:this.arguments.transaction,layout:this.arguments.layout})},onCostCalculation:function t(){this.goToPage("CostCalculation",{transaction:this.arguments.transaction,layout:this.arguments.layout})},getTechnologyText:function t(n){return n||"Не выбрано"},getCostText:function t(n){return n?"".concat(n," чел./час"):"Не рассчитано"},getStatusText:function t(n){return n?"None":"Indication02"},getColorText:function t(n){return n?"Good":"Error"}})});