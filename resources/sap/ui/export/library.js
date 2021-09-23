/*
 * ! SAPUI5
 * (c) Copyright 2009-2021 SAP SE. All rights reserved.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/library"],function(e,r){"use strict";sap.ui.getCore().initLibrary({name:"sap.ui.export",dependencies:["sap.ui.core"],types:["sap.ui.export.EdmType","sap.ui.export.FileType"],interfaces:[],controls:[],elements:[],version:"1.92.0"});sap.ui.export.EdmType={BigNumber:"BigNumber",Boolean:"Boolean",Currency:"Currency",Date:"Date",DateTime:"DateTime",Enumeration:"Enumeration",Number:"Number",Percentage:"Percentage",String:"String",Time:"Time"};sap.ui.export.FileType={CSV:"CSV",XLSX:"XLSX"};e.sap.registerModuleShims({"sap/ui/export/js/XLSXBuilder":{amd:true,exports:"XLSXBuilder"},"sap/ui/export/js/XLSXExportUtils":{amd:true,exports:"XLSXExportUtils"}});return sap.ui.export});