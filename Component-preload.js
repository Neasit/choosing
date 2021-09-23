//@ui5-bundle ui2/choosingtech/Component-preload.js
sap.ui.require.preload({
	"ui2/choosingtech/Component.js":function(){"use strict";sap.ui.define(["sap/ui/core/UIComponent","ui2/choosingtech/model/models","sap/f/library","sap/f/FlexibleColumnLayoutSemanticHelper","sap/base/util/UriParameters"],function(e,t,a,o,r){"use strict";var i=a.LayoutType;return e.extend("ui2.choosingtech.Component",{metadata:{manifest:"json"},init:function a(){e.prototype.init.apply(this,arguments);this.setModel(t.createAppModel(),"appModel");this.setModel(t.createDataModel(),"dataModel");this.getRouter().initialize();this.getRouter().attachRouteMatched(this.onRouteMatched,this);this.getRouter().attachBeforeRouteMatched(this.onBeforeRouteMatched,this)},getHelper:function e(){var t=this.getRootControl().byId("appexample"),a=r.fromQuery(location.search),n={defaultTwoColumnLayoutType:i.TwoColumnsMidExpanded,defaultThreeColumnLayoutType:i.ThreeColumnsMidExpanded,mode:a.get("mode"),maxColumnsCount:2};return o.getInstanceFor(t,n)},onRouteMatched:function e(t){var a=t.getParameter("name"),o=t.getParameter("arguments");this._updateUIElements();this.currentRouteName=a;this.currentProduct=o.product;this.currentSupplier=o.supplier},onBeforeRouteMatched:function e(t){var a=this.getModel("appModel");var o=t.getParameters().arguments.layout;if(!o){var r=this.getHelper().getNextUIState(0);o=r.layout}if(o){a.setProperty("/layout",o)}},_updateUIElements:function e(){var t=this.getModel("appModel");var a=this.getHelper().getCurrentUIState();t.setData(a)}})});
},
	"ui2/choosingtech/LoadScript.js":'"use strict";var fLoadScript=function t(e,a,c){var r=document.head;var n=document.createElement("script");n.type="text/javascript";n.src=e;if(a){Object.keys(a).forEach(function(t){n.setAttribute(t,a[t])})}n.onreadystatechange=c;n.onload=c;r.appendChild(n)};',
	"ui2/choosingtech/controller/App.controller.js":function(){"use strict";sap.ui.define(["ui2/choosingtech/controller/BaseController"],function(t){"use strict";return t.extend("ui2.choosingtech.controller.App",{onInit:function t(){},onStateChanged:function t(e){var o=e.getParameter("isNavigationArrow"),r=e.getParameter("layout");this.getOwnerComponent()._updateUIElements();if(o){this.oRouter.navTo(this.currentRouteName,{layout:r,product:this.currentProduct,supplier:this.currentSupplier},true)}},onExit:function t(){this.oRouter.detachRouteMatched(this.onRouteMatched,this);this.oRouter.detachBeforeRouteMatched(this.onBeforeRouteMatched,this)}})});
},
	"ui2/choosingtech/controller/BaseController.js":function(){"use strict";sap.ui.define(["sap/ui/core/mvc/Controller","sap/m/MessageToast","ui2/choosingtech/model/formatter"],function(t,o,e){"use strict";return t.extend("ui2.choosingtech.controller.BaseController",{formatter:e,constructor:function t(){this.oi18n=null;this.formatter=e;this.arguments=null;this.oMainModel=null;this.oRouter=null},init:function t(){this.oi18n=this.getResourceBundle();this.oMainModel=this.getOwnerComponent().getModel();this.oRouter=this.getRouter();this.oRouter.attachEvent("routeMatched",{},this.onRouteMatched,this)},getRouter:function t(){return sap.ui.core.UIComponent.getRouterFor(this)},getModel:function t(o){return this.getView().getModel(o)},setModel:function t(o,e){return this.getView().setModel(o,e)},getResourceBundle:function t(){return this.getOwnerComponent().getModel("i18n").getResourceBundle()},onRouteMatched:function t(o){this.arguments=o.getParameter("arguments")||{}},goToPage:function t(o,e,n){var i=this.navProps||{};var r={};e=e||{};for(var u in i){r[u]=i[u]}for(u in e){r[u]=e[u]}this.oRouter.navTo(o,e,!!n)},showMessage:function t(e,n){n=n||{duration:2e3,closeOnBrowserNavigation:false,animationDuration:500};o.show(e,n)},hideBusyIndicator:function t(){sap.ui.core.BusyIndicator.hide()},showBusyIndicator:function t(o){sap.ui.core.BusyIndicator.show(o)},getAppObject:function t(){return this.getOwnerComponent().getRootControl().byId("appexample")},handleFullScreen:function t(){this.bFocusFullScreenButton=true;var o=this.oModel.getProperty("/actionButtonsInfo/midColumn/fullScreen");this.oRouter.navTo("detail",{layout:o,product:this._product})},handleExitFullScreen:function t(){this.bFocusFullScreenButton=true;var o=this.oModel.getProperty("/actionButtonsInfo/midColumn/exitFullScreen");this.oRouter.navTo("detail",{layout:o,product:this._product})},handleClose:function t(){var o=this.oModel.getProperty("/actionButtonsInfo/midColumn/closeColumn");this.oRouter.navTo("master",{layout:o})}})});
},
	"ui2/choosingtech/controller/ChoosingTech.controller.js":function(){"use strict";sap.ui.define(["ui2/choosingtech/controller/BaseController"],function(t){"use strict";return t.extend("ui2.choosingtech.controller.ChoosingTech",{onInit:function e(){t.prototype.init.apply(this,arguments);this.oRouter.getRoute("ChoosingTech").attachPatternMatched(this.handleRouteMatched,this)},handleRouteMatched:function t(){var e=this;var n=this.getView().getModel("dataModel").getProperty("/transactions");if(n&&n.length){var o=n.findIndex(function(t){return t.id===e.arguments.transaction});this.getView().bindElement({path:"/transactions/".concat(o),model:"dataModel"});this.bindData(n[o].tech_step||"1");if(n[o].tech_step){var i=this.getView().getModel().getProperty("/choosing/".concat(n[o].tech_step));var a=i.criterions.findIndex(function(t){return t.title===n[o].technology});this.getView().getModel().setProperty("/choosing/".concat(n[o].tech_step,"/criterions/").concat(a,"/selected"),true)}}else{this.goToPage("StartPage")}},bindData:function t(e){this.byId("idQuestionPage1").bindElement({path:"/choosing/".concat(e)});this.getView().getModel().getProperty("/choosing/".concat(e,"/criterions")).forEach(function(t,n){this.getView().getModel().setProperty("/choosing/".concat(e,"/criterions").concat(n,"/selected"),false)}.bind(this))},onYes:function t(){var e=this.byId("idQuestionPage1").getBindingContext().getObject();this.bindData(e.yes)},onNo:function t(){var e=this.byId("idQuestionPage1").getBindingContext().getObject();this.bindData(e.no)},onReset:function t(){var e=this.getCurrentTransactionContext();e.getModel().setProperty(e.getPath()+"/technology","");e.getModel().setProperty(e.getPath()+"/tech_step","");this.bindData("1")},onTechSelect:function t(e){var n=e.getParameter("listItem");var o=n.getBindingContext().getObject();var i=this.getCurrentTransactionContext();i.getModel().setProperty(i.getPath()+"/technology",o.title);i.getModel().setProperty(i.getPath()+"/tech_step",n.getBindingContext().getPath().split("/")[2])},onCostCalculation:function t(){this.goToPage("CostCalculation",{transaction:this.arguments.transaction,layout:this.arguments.layout})},getCurrentTransactionContext:function t(){return this.byId("idChoosingNav").getCurrentPage().getBindingContext("dataModel")},getListMode:function t(e){return e?"SingleSelectMaster":"None"}})});
},
	"ui2/choosingtech/controller/CostCalculation.controller.js":function(){"use strict";sap.ui.define(["ui2/choosingtech/controller/BaseController"],function(t){"use strict";return t.extend("ui2.choosingtech.controller.CostCalculation",{onInit:function e(){t.prototype.init.apply(this,arguments);this.oRouter.getRoute("CostCalculation").attachPatternMatched(this.handleRouteMatched,this);this.oDataModel=this.getOwnerComponent().getModel("dataModel")},handleRouteMatched:function t(){var e=this;var n=["idBtn1","idBtn2","idBtn3","idBtn4","idBtn5","idBtn6"];var i=this.oDataModel.getProperty("/transactions");if(i&&i.length){var o=i.findIndex(function(t){return t.id===e.arguments.transaction});this.getView().bindElement({path:"/transactions/".concat(o),model:"dataModel"});var a=i[o];var s=a.technology||"SAPUI5";this.oDataModel.setProperty("/display/costSelectVisible",!!a.technology);this.currentTech=a.technology||null;var c=this.getView().getModel().getProperty("/tech/list").find(function(t){return t.text===s});this.byId("idIconTab").setSelectedKey(c.key);this.currentTech=c.key;if(!c){c={key:"SAPUI5"}}this.byId("idContentBlock").bindElement("/tech/data/".concat(c.key,"/data"));this.byId("idInfo").bindElement("/tech/data/".concat(c.key,"/data/materials"));var r=a.cost_step||null;n.forEach(function(t){this.byId(t).setPressed(false)}.bind(this));if(r){this.byId("idBtn".concat(r)).setPressed(true)}}else{this.goToPage("StartPage")}},onTechSelect:function t(e){var n=e.getParameter("key");this.byId("idContentBlock").bindElement("/tech/data/".concat(n,"/data"));this.byId("idInfo").bindElement("/tech/data/".concat(n,"/data/materials"));if(this.currentTech&&this.currentTech===n){this.oDataModel.setProperty("/display/costSelectVisible",true)}else{this.oDataModel.setProperty("/display/costSelectVisible",false)}},onCostSelect:function t(e){var n=["idBtn1","idBtn2","idBtn3","idBtn4","idBtn5","idBtn6"];var i=e.getSource().getId().split("--");var o=i[i.length-1];var a=e.getSource().getBinding("text").getPath().split("/")[0];var s=e.getSource().getBinding("text").getValue();if(!e.getParameter("pressed")){a=null;s=null}n.forEach(function(t){if(t!==o){this.byId(t).setPressed(false)}}.bind(this));var c=this.getView().getBindingContext("dataModel");c.getModel().setProperty(c.getPath()+"/cost",s);c.getModel().setProperty(c.getPath()+"/cost_step",a)},getTechnologyText:function t(e){return e||"Не выбрано"},getCostText:function t(e){return e?"".concat(e," чел./час"):"Не рассчитано"},getStatusText:function t(e){return e?"None":"Indication02"},getCostButtonText:function t(e){return"Трудозатраты ".concat(e," чел./час")}})});
},
	"ui2/choosingtech/controller/Details.controller.js":function(){"use strict";sap.ui.define(["ui2/choosingtech/controller/BaseController"],function(t){"use strict";return t.extend("ui2.choosingtech.controller.Details",{onInit:function n(){t.prototype.init.apply(this,arguments);this.oRouter.getRoute("Detail").attachPatternMatched(this.handleRouteMatched,this)},handleRouteMatched:function t(){var n=this;var o=this.getView().getModel("dataModel").getProperty("/transactions");if(o&&o.length){this.getView().bindElement({path:"/transactions/".concat(o.findIndex(function(t){return t.id===n.arguments.transaction})),model:"dataModel"})}else{this.goToPage("StartPage")}},onChoosing:function t(){this.goToPage("ChoosingTech",{transaction:this.arguments.transaction,layout:this.arguments.layout})},onCostCalculation:function t(){this.goToPage("CostCalculation",{transaction:this.arguments.transaction,layout:this.arguments.layout})},getTechnologyText:function t(n){return n||"Не выбрано"},getCostText:function t(n){return n?"".concat(n," чел./час"):"Не рассчитано"},getStatusText:function t(n){return n?"None":"Indication02"},getColorText:function t(n){return n?"Good":"Error"}})});
},
	"ui2/choosingtech/controller/NotFound.controller.js":function(){"use strict";sap.ui.define(["ui2/choosingtech/controller/BaseController"],function(t){"use strict";return t.extend("ui2.choosingtech.controller.NotFound",{onLinkPressed:function t(){this.getRouter().navTo("StartPage")}})});
},
	"ui2/choosingtech/controller/StartPage.controller.js":function(){"use strict";sap.ui.define(["ui2/choosingtech/controller/BaseController","sap/ui/model/json/JSONModel","sap/ui/export/Spreadsheet"],function(t,e,o){"use strict";return t.extend("ui2.choosingtech.controller.StartPage",{onInit:function o(){t.prototype.init.apply(this,arguments);this.oRouter.getRoute("StartPage").attachPatternMatched(this.handleRouteMatched,this);this.oDialogModel=new e;this.getView().setModel(this.oDialogModel,"addModel")},handleRouteMatched:function t(){},onListItemPress:function t(e){var o=this.getOwnerComponent().getHelper().getNextUIState(1);var i=e.getSource();var a=i.getBindingContext("dataModel").getObject();this.goToPage("Detail",{layout:o.layout,transaction:a.id})},onAdd:function t(){this.getAddDialog().open()},getAddDialog:function t(){if(!this.addDialog){this.addDialog=sap.ui.xmlfragment(this.getView().getId(),"ui2.choosingtech.fragments.addDialog",this);this.addDialog.setModel(this.oDialogModel)}this.oDialogModel.setData({id:"",text:""});return this.addDialog},onAddOk:function t(){var e=this.getView().getModel("dataModel");var o=this.oDialogModel.getData();if(o.id){var i=e.getProperty("/transactions");i.push({id:o.id,text:o.text,technology:null,tech_text:"",cost:null,cost_text:""});e.setProperty("/transactions",i);this.getAddDialog().close()}else{this.showMessage("Введите транзакцию!")}},onAddCancel:function t(){this.getAddDialog().close()},getListItemInfo:function t(e,o){if(!o){return"Не выбрана целевая технология!"}if(!e){return"Не расчитаны трудозатраты!"}return"Готово!"},getListInfoState:function t(e,o){return e&&o?"Success":"Warning"},onExcelExport:function t(){var e=this.getView().getModel("dataModel").getData();if(e.name){this.export()}else{this.showMessage("Заполните имя!")}},export:function t(){var e=this.getView().getModel("dataModel").getData();var i=[{label:"Транзакция",property:"id",width:"30"},{label:"Описание",property:"text",width:"80"},{label:"Технология",property:"technology",width:"25"},{label:"Трудозатраты",property:"cost",width:"25"}];var a="".concat(e.name.replaceAll(" ","_"),"_").concat(e.department.replaceAll(" ","_"));var n={workbook:{columns:i},dataSource:e.transactions,fileName:a};var s=new o(n);s.build().then(function(){this.showMessage("Готово!")}.bind(this)).finally(s.destroy)}})});
},
	"ui2/choosingtech/fragments/addDialog.fragment.xml":'<core:FragmentDefinition\r\n  xmlns="sap.m"\r\n  xmlns:f="sap.ui.layout.form"\r\n  xmlns:core="sap.ui.core"\r\n><Dialog showHeader="true" stretch="{device>/system/phone}" contentHeight="auto" contentWidth="auto" ><f:SimpleForm\r\n        editable="true"\r\n        layout="ResponsiveGridLayout"\r\n        labelSpanXL="4"\r\n        labelSpanL="4"\r\n        labelSpanM="12"\r\n        labelSpanS="12"\r\n        adjustLabelSpan="false"\r\n        emptySpanXL="0"\r\n        emptySpanL="0"\r\n        emptySpanM="0"\r\n        emptySpanS="0"\r\n        columnsXL="2"\r\n        columnsL="2"\r\n        columnsM="1"\r\n        singleContainerFullSize="false"\r\n      ><Label required="true" text="Транзакция" /><Input value="{/id}" /><Label text="Описание" /><Input value="{/text}" /></f:SimpleForm><buttons><Button text="Добавить" press="onAddOk" /><Button text="Отменить" press="onAddCancel"/></buttons></Dialog></core:FragmentDefinition>',
	"ui2/choosingtech/fragments/intro.fragment.xml":'<core:FragmentDefinition\r\n  xmlns:core="sap.ui.core"\r\n  xmlns:mvc="sap.ui.core.mvc"\r\n  xmlns="sap.m"\r\n  xmlns:f="sap.ui.layout.form"\r\n  xmlns:l="sap.ui.layout"\r\n><VBox><FormattedText htmlText="{description}" /><HBox><Button text="Начать" press="onYesNextStep" class="sapUiSmallMarginEnd" /></HBox></VBox></core:FragmentDefinition>',
	"ui2/choosingtech/fragments/question.fragment.xml":'<core:FragmentDefinition\r\n  xmlns:core="sap.ui.core"\r\n  xmlns:mvc="sap.ui.core.mvc"\r\n  xmlns="sap.m"\r\n  xmlns:f="sap.ui.layout.form"\r\n  xmlns:l="sap.ui.layout"\r\n><VBox><FormattedText htmlText="{description}" class="sapUiSmallMarginBotton" /><List mode="None" headerText="{title}" items="{criterions}" class="sapUiSmallMarginBotton"><StandardListItem title="{title}" description="{text}" wrapping="true" info="{category}" /></List><HBox><Button text="Да" press="onYesNextStep" class="sapUiSmallMarginEnd" /><Button text="Нет" press="onNoNextStep" /></HBox></VBox></core:FragmentDefinition>',
	"ui2/choosingtech/fragments/result.fragment.xml":'<core:FragmentDefinition\r\n  xmlns:core="sap.ui.core"\r\n  xmlns:mvc="sap.ui.core.mvc"\r\n  xmlns="sap.m"\r\n  xmlns:f="sap.ui.layout.form"\r\n  xmlns:l="sap.ui.layout"\r\n><VBox><FormattedText htmlText="{description}" /><List mode="None" headerText="{title}" items="{criterions}" class="sapUiSmallMarginBotton"><StandardListItem title="{title}" description="{text}" wrapping="true" info="{category}" /></List><HBox><Button text="Заново" press="onRestart" class="sapUiSmallMarginEnd" /></HBox></VBox></core:FragmentDefinition>',
	"ui2/choosingtech/i18n/i18n.properties":'title=Example\r\nappTitle=Example\r\nsubTitle=Example\r\nshorttitle=Example\r\ndescription=Application Example\r\n\r\n# NotFound view\r\nnotFoundTitle=Not Found\r\nnotFoundText=Page is not found\r\nbackToStartPage=Start page',
	"ui2/choosingtech/init.js":function(){"use strict";window.addEventListener("load",function(){var e=Promise.resolve();var r=Promise.resolve();var i=true;if("serviceWorker"in navigator){e=navigator.serviceWorker.getRegistration()}e.then(function(e){if(!e){e=false}navigator.serviceWorker.register("/service-worker.js").then(function(r){if(!e){window.location.reload()}}).catch(function(e){})}).catch(function(e){})});
},
	"ui2/choosingtech/main.js":function(){"use strict";sap.ui.define(["sap/m/Shell","sap/ui/core/ComponentContainer"],function(e,a){sap.ui.loader.config({baseUrl:"resources/",async:true});sap.ui.getCore().loadLibrary("sap.ui.core",{async:true});sap.ui.getCore().loadLibrary("sap.ui.layout",{async:true});sap.ui.getCore().loadLibrary("sap.m",{async:true});sap.ui.getCore().loadLibrary("sap.f",{async:true});sap.ui.getCore().loadLibrary("sap.ui.export",{async:true});sap.ui.component({name:"ui2.choosingtech",manifest:true,async:true}).then(function(r){var t=new a({height:"100%",component:r});new e({app:t}).placeAt("content")})});
},
	"ui2/choosingtech/manifest.json":'{"_version":"1.17.0","sap.app":{"id":"ui2.choosingtech","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"1.0.1"},"title":"{{appTitle}}","subTitle":"{{subTitle}}","shortTitle":"{{shorttitle}}","description":"{{description}}","info":"{{info}}","tags":{"keywords":["Example"]},"dataSources":{"main":{"uri":"./data/main.json","type":"JSON"}},"resources":"resources.json","offline":true,"destination":{"name":"SAP_ERP"}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"rootView":{"viewName":"ui2.choosingtech.view.App","async":true,"id":"choosing","type":"XML"},"dependencies":{"minUI5Version":"1.78.0","libs":{"sap.ui.core":{},"sap.m":{},"sap.ui.layout":{},"sap.f":{},"sap.ui.export":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"ui2.choosingtech.i18n.i18n"}},"":{"dataSource":"main","settings":{"defaultBindingMode":"TwoWay"},"preload":true}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.f.routing.Router","viewType":"XML","viewPath":"ui2.choosingtech.view","controlId":"appexample","transition":"slide","bypassed":{"target":"notFound"},"async":true},"routes":[{"pattern":":layout:","name":"StartPage","target":["StartPage"]},{"pattern":"details/{transaction}/{layout}","name":"Detail","target":["StartPage","Details"]},{"pattern":"cost/{transaction}/{layout}","name":"CostCalculation","target":["StartPage","CostCalculation"]},{"pattern":"choosing/{transaction}/{layout}","name":"ChoosingTech","target":["StartPage","ChoosingTech"]}],"targets":{"StartPage":{"viewName":"StartPage","viewId":"StartPage","controlAggregation":"beginColumnPages"},"Details":{"viewName":"Details","viewId":"Details","controlAggregation":"midColumnPages"},"CostCalculation":{"viewName":"CostCalculation","viewId":"CostCalculation","controlAggregation":"midColumnPages"},"ChoosingTech":{"viewName":"ChoosingTech","viewId":"ChoosingTech","controlAggregation":"midColumnPages"},"notFound":{"viewName":"NotFound","viewId":"notFound"}}}},"sap.platform.abap":{"uri":"","uriNwbc":""},"theme_color":"#f69435","background_color":"#f69435","display":"standalone","scope":"/","start_url":"/index.html","name":"Choosing Tech","short_name":"Choosing","description":"UI5 Choosing Tech","icons":[{"src":"/icon-192x192.png","sizes":"192x192","type":"image/png"},{"src":"/icon-256x256.png","sizes":"256x256","type":"image/png"},{"src":"/icon-384x384.png","sizes":"384x384","type":"image/png"},{"src":"/icon-512x512.png","sizes":"512x512","type":"image/png"}]}',
	"ui2/choosingtech/model/formatter.js":function(){"use strict";sap.ui.define([],function(n){"use strict";return{changeKunde:function n(e,t){return!e||e==="0"?t:e},editPossible:function n(e,t){return!!e&&e!=="0"&&!t}}});
},
	"ui2/choosingtech/model/models.js":function(){"use strict";sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,t){"use strict";return{createDeviceModel:function n(){var i=new e(t);i.setDefaultBindingMode("OneWay");return i},createAppModel:function t(){return new e},createDataModel:function t(){return new e({name:"",department:"",transactions:[],display:{costSelectVisible:true}})}}});
},
	"ui2/choosingtech/service-worker.js":function(){"use strict";importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");if(workbox){workbox.routing.registerRoute(new RegExp("(index.html|.*.js|.*.json)"),workbox.strategies.networkFirst());workbox.routing.registerRoute(/(.*\.css|.*\.properties|.*\.woff2)/,workbox.strategies.staleWhileRevalidate({cacheName:"asset-cache"}));workbox.precaching.precacheAndRoute(["/resources/sap/ui/export/js/XLSXBuilder.js","/resources/sap/ui/export/js/SpreadsheetWorker.js","/resources/sap/ui/export/js/libs/JSZip3.js","/resources/sap/ui/export/js/libs/uri.all.min.js","/data/main.json","/manifest.json","/Component-preload.js","/index.html","/init.js","/LoadScript.js","/manifest-bundle.zip"])}else{}
},
	"ui2/choosingtech/utils/Utils.js":function(){"use strict";sap.ui.define([],function(){return{}});
},
	"ui2/choosingtech/view/App.view.xml":'<mvc:View\r\n  controllerName="ui2.choosingtech.controller.App"\r\n  xmlns:html="http://www.w3.org/1999/xhtml"\r\n  xmlns:mvc="sap.ui.core.mvc"\r\n  xmlns="sap.f"\r\n  displayBlock="true"\r\n  height="100%"\r\n><FlexibleColumnLayout\r\n    autoFocus="false"\r\n    id="appexample"\r\n    stateChange="onStateChanged"\r\n    restoreFocusOnBackNavigation="true"\r\n    layout="{appModel>/layout}"\r\n    backgroundDesign="Translucent" /></mvc:View>',
	"ui2/choosingtech/view/ChoosingTech.view.xml":'<mvc:View\r\n  controllerName="ui2.choosingtech.controller.ChoosingTech"\r\n  xmlns="sap.m"\r\n  xmlns:l="sap.ui.layout"\r\n  xmlns:mvc="sap.ui.core.mvc"\r\n  xmlns:sf="sap.f"\r\n  height="100%"\r\n  width="100%"\r\n><sf:DynamicPage\r\n    showFooter="true"\r\n    stickySubheaderProvider="idWizard"\r\n    class="sapUiNoContentPadding"\r\n    fitContent="true"\r\n  ><sf:title><sf:DynamicPageTitle primaryArea="Middle"><sf:heading><Title text="Выбор целевой технологии" /></sf:heading></sf:DynamicPageTitle></sf:title><sf:header><sf:DynamicPageHeader pinnable="true"></sf:DynamicPageHeader></sf:header><sf:content><NavContainer id="idChoosingNav"><pages><sf:DynamicPage id="idQuestionPage1" showFooter="true" class="sapUiNoContentPadding" fitContent="true"><sf:content><l:BlockLayout background="Dashboard"><l:BlockLayoutRow visible="{= !${textInvisible}}"><l:BlockLayoutCell title="{text}"><Text text="{description}" /></l:BlockLayoutCell></l:BlockLayoutRow><l:BlockLayoutRow visible="{= !${criterionsInvisible}}"><l:BlockLayoutCell title="{title}"><List mode="{ path: \'textInvisible\', formatter: \'.getListMode\' }" items="{criterions}" class="sapUiSmallMarginBotton"\r\n                            selectionChange="onTechSelect" ><StandardListItem title="{title}" description="{text}" wrapping="true"  /></List></l:BlockLayoutCell></l:BlockLayoutRow></l:BlockLayout></sf:content><sf:footer><OverflowToolbar><Button type="Default" text="Заново" press="onReset" visible="{= !!${textInvisible} }" /><ToolbarSpacer/><Button type="Accept" text="Начать" press="onYes" visible="{= !!${criterionsInvisible} }" /><Button type="Accept" text="Да" press="onYes" visible="{= !${criterionsInvisible} &amp;&amp; !${textInvisible} }" /><Button type="Reject" text="Нет" press="onNo" visible="{= !${criterionsInvisible} &amp;&amp; !${textInvisible} }" /><Button type="Accept" text="Трудозатраты" press="onCostCalculation" visible="{= !!${textInvisible} }" /></OverflowToolbar></sf:footer></sf:DynamicPage></pages></NavContainer></sf:content></sf:DynamicPage></mvc:View>',
	"ui2/choosingtech/view/CostCalculation.view.xml":'<mvc:View\r\n  controllerName="ui2.choosingtech.controller.CostCalculation"\r\n  xmlns="sap.m"\r\n  xmlns:mvc="sap.ui.core.mvc"\r\n  xmlns:l="sap.ui.layout"\r\n  xmlns:f="sap.ui.layout.form"\r\n  xmlns:sf="sap.f"\r\n  height="100%"\r\n  width="100%"\r\n><sf:DynamicPage\r\n    showFooter="false"\r\n    class="sapUiNoContentPadding"\r\n    fitContent="true"\r\n  ><sf:title><sf:DynamicPageTitle primaryArea="Middle"><sf:heading><Title text="Расчет трудозатрат" /></sf:heading><sf:navigationActions><OverflowToolbarButton type="Transparent" icon="sap-icon://full-screen" press="handleFullScreen" id="enterFullScreenBtn" tooltip="Enter Full Screen Mode" visible="{= ${appModel>/actionButtonsInfo/endColumn/fullScreen} !== null }"/><OverflowToolbarButton type="Transparent" icon="sap-icon://exit-full-screen" press="handleExitFullScreen" id="exitFullScreenBtn" tooltip="Exit Full Screen Mode" visible="{= ${appModel>/actionButtonsInfo/endColumn/exitFullScreen} !== null }"/><OverflowToolbarButton type="Transparent" icon="sap-icon://decline" press="handleClose"  tooltip="Close column" visible="{= ${appModel>/actionButtonsInfo/endColumn/closeColumn} !== null }"/></sf:navigationActions></sf:DynamicPageTitle></sf:title><sf:header><sf:DynamicPageHeader pinnable="true"><f:SimpleForm\r\n          editable="true"\r\n          layout="ResponsiveGridLayout"\r\n          labelSpanXL="4"\r\n          labelSpanL="4"\r\n          labelSpanM="12"\r\n          labelSpanS="12"\r\n          adjustLabelSpan="false"\r\n          emptySpanXL="0"\r\n          emptySpanL="0"\r\n          emptySpanM="0"\r\n          emptySpanS="0"\r\n          columnsXL="2"\r\n          columnsL="2"\r\n          columnsM="1"\r\n          singleContainerFullSize="false"\r\n        ><Label text="Технология" /><ObjectStatus text="{ path: \'dataModel>technology\', formatter: \'.getTechnologyText\'}" state="{ path: \'dataModel>technology\', formatter: \'.getStatusText\'}" /><Label text="Трудозатраты" /><ObjectStatus text="{ path: \'dataModel>cost\', formatter: \'.getCostText\'}" state="{ path: \'dataModel>cost\', formatter: \'.getStatusText\'}" /></f:SimpleForm></sf:DynamicPageHeader></sf:header><sf:content><IconTabBar id="idIconTab" select="onTechSelect" class="sapUiResponsiveContentPadding" items="{/tech/list}"><items><IconTabFilter key="{key}" text="{text}" /></items><content><MessageStrip\r\n            id="idInfo"\r\n            text="{text}"\r\n            type="Information"\r\n            showCloseButton="false"\r\n            class="sapUiTinyMarginBottom"><link><Link text="{linkText}"\r\n                target="_blank"\r\n                href="{link}" /></link></MessageStrip><l:BlockLayout id="idContentBlock" background="Light"><l:BlockLayoutRow><l:BlockLayoutCell title="{1/title}"><FormattedText htmlText="{1/front}" class="sapUiTinyMarginBottom" /><FormattedText htmlText="{1/back}" class="sapUiSmallMarginBottom" visible="{= !${1/backInvisible}}"/><HBox alignContent="Center" alignItems="Center" justifyContent="Center" width="100%"><ToggleButton id="idBtn1" text="{ path: \'1/cost\', formatter: \'.getCostButtonText\' }" enabled="{dataModel>/display/costSelectVisible}" press="onCostSelect" /></HBox></l:BlockLayoutCell><l:BlockLayoutCell title="{2/title}"><FormattedText htmlText="{2/front}" class="sapUiTinyMarginBottom" /><FormattedText htmlText="{2/back}" class="sapUiSmallMarginBottom" visible="{= !${2/backInvisible}}" /><HBox alignContent="Center" alignItems="Center" justifyContent="Center" width="100%" ><ToggleButton id="idBtn2" text="{ path: \'2/cost\', formatter: \'.getCostButtonText\' }" enabled="{dataModel>/display/costSelectVisible}" press="onCostSelect" /></HBox></l:BlockLayoutCell></l:BlockLayoutRow><l:BlockLayoutRow><l:BlockLayoutCell title="{3/title}"><FormattedText htmlText="{3/front}" class="sapUiTinyMarginBottom" /><FormattedText htmlText="{3/back}" class="sapUiSmallMarginBottom" visible="{= !${3/backInvisible}}" /><HBox alignContent="Center" alignItems="Center" justifyContent="Center" width="100%"><ToggleButton id="idBtn3" text="{ path: \'3/cost\', formatter: \'.getCostButtonText\' }" enabled="{dataModel>/display/costSelectVisible}" press="onCostSelect" /></HBox></l:BlockLayoutCell><l:BlockLayoutCell title="{4/title}"><FormattedText htmlText="{4/front}" class="sapUiTinyMarginBottom" /><FormattedText htmlText="{4/back}" class="sapUiSmallMarginBottom" visible="{= !${4/backInvisible}}" /><HBox alignContent="Center" alignItems="Center" justifyContent="Center" width="100%"><ToggleButton id="idBtn4" text="{ path: \'4/cost\', formatter: \'.getCostButtonText\' }" enabled="{dataModel>/display/costSelectVisible}" press="onCostSelect" /></HBox></l:BlockLayoutCell></l:BlockLayoutRow><l:BlockLayoutRow visible="{= !${5/invisible}}" ><l:BlockLayoutCell title="{5/title}"><FormattedText htmlText="{5/front}" class="sapUiTinyMarginBottom" /><FormattedText htmlText="{5/back}" class="sapUiSmallMarginBottom" visible="{= !${5/backInvisible}}" /><HBox alignContent="Center" alignItems="Center" justifyContent="Center" width="100%"><ToggleButton id="idBtn5" text="{ path: \'5/cost\', formatter: \'.getCostButtonText\' }" enabled="{dataModel>/display/costSelectVisible}" press="onCostSelect" /></HBox></l:BlockLayoutCell><l:BlockLayoutCell title="{6/title}" visible="{= !${6/invisible}}"><FormattedText htmlText="{6/front}" class="sapUiTinyMarginBottom" /><FormattedText htmlText="{6/back}" class="sapUiSmallMarginBottom" visible="{= !${6/backInvisible}}" /><HBox alignContent="Center" alignItems="Center" justifyContent="Center" width="100%" ><ToggleButton id="idBtn6" text="{ path: \'6/cost\', formatter: \'.getCostButtonText\' }" enabled="{dataModel>/display/costSelectVisible}" press="onCostSelect" /></HBox></l:BlockLayoutCell></l:BlockLayoutRow></l:BlockLayout></content></IconTabBar></sf:content></sf:DynamicPage></mvc:View>',
	"ui2/choosingtech/view/Details.view.xml":'<mvc:View\r\n  controllerName="ui2.choosingtech.controller.Details"\r\n  xmlns="sap.m"\r\n  xmlns:mvc="sap.ui.core.mvc"\r\n  xmlns:sf="sap.f"\r\n  xmlns:f="sap.ui.layout.form"\r\n  xmlns:l="sap.ui.layout"\r\n  height="100%"\r\n  width="100%"\r\n><sf:DynamicPage\r\n    showFooter="false"\r\n    class="sapUiNoContentPadding"\r\n    fitContent="true"\r\n  ><sf:title><sf:DynamicPageTitle primaryArea="Middle"><sf:heading><Title text="Транзакция: {dataModel>id}" /></sf:heading></sf:DynamicPageTitle></sf:title><sf:header><sf:DynamicPageHeader\r\n        pinnable="true"\r\n      ><f:SimpleForm\r\n          editable="true"\r\n          layout="ResponsiveGridLayout"\r\n          labelSpanXL="4"\r\n          labelSpanL="4"\r\n          labelSpanM="12"\r\n          labelSpanS="12"\r\n          adjustLabelSpan="false"\r\n          emptySpanXL="0"\r\n          emptySpanL="0"\r\n          emptySpanM="0"\r\n          emptySpanS="0"\r\n          columnsXL="2"\r\n          columnsL="2"\r\n          columnsM="1"\r\n          singleContainerFullSize="false"\r\n        ><Label text="Описание" /><Input value="{dataModel>text}" /></f:SimpleForm></sf:DynamicPageHeader></sf:header><sf:content><HBox><GenericTile class="sapUiTinyMarginBegin sapUiTinyMarginTop tileLayout" header="Выбор целевой технологии"  press="onChoosing"\r\n          frameType="OneByHalf"><TileContent footer="{ path: \'dataModel>technology\', formatter: \'.getTechnologyText\'}" footerColor="{ path: \'dataModel>technology\', formatter: \'.getColorText\'}" /></GenericTile><GenericTile class="sapUiTinyMarginBegin sapUiTinyMarginTop tileLayout" header="Расчет трудозатрат"  press="onCostCalculation"\r\n          frameType="OneByHalf"><TileContent footer="{ path: \'dataModel>cost\', formatter: \'.getCostText\'}" footerColor="{ path: \'dataModel>cost\', formatter: \'.getColorText\'}" /></GenericTile></HBox></sf:content></sf:DynamicPage></mvc:View>',
	"ui2/choosingtech/view/NotFound.view.xml":'<mvc:View\r\n  controllerName="ui2.choosingtech.controller.NotFound"\r\n  xmlns:mvc="sap.ui.core.mvc"\r\n  xmlns="sap.m"\r\n><MessagePage\r\n    title="{i18n>notFoundTitle}"\r\n    text="{i18n>notFoundText}"\r\n    icon="{sap-icon://document}"\r\n    id="page"\r\n    description="Example"\r\n  ><customDescription><Link\r\n        id="link"\r\n        text="{i18n>backToStartPage}"\r\n        press="onLinkPressed"\r\n      /></customDescription></MessagePage></mvc:View>',
	"ui2/choosingtech/view/StartPage.view.xml":'<mvc:View\r\n  controllerName="ui2.choosingtech.controller.StartPage"\r\n  xmlns="sap.m"\r\n  xmlns:mvc="sap.ui.core.mvc"\r\n  xmlns:sf="sap.f"\r\n  xmlns:f="sap.ui.layout.form"\r\n  xmlns:l="sap.ui.layout"\r\n  height="100%"\r\n  width="100%"\r\n><sf:DynamicPage\r\n    showFooter="true"\r\n    stickySubheaderProvider="idWizard"\r\n    class="sapUiNoContentPadding"\r\n    fitContent="true"\r\n  ><sf:title><sf:DynamicPageTitle primaryArea="Middle"><sf:actions><Button\r\n            icon="sap-icon://excel-attachment"\r\n            press="onExcelExport"\r\n            tooltip="Выгрузить"\r\n            type="Transparent"\r\n          /></sf:actions><sf:heading><Title text="Выбор целевой технологии" /></sf:heading></sf:DynamicPageTitle></sf:title><sf:header><sf:DynamicPageHeader\r\n        pinnable="true"\r\n      ><f:SimpleForm\r\n          editable="true"\r\n          layout="ResponsiveGridLayout"\r\n          labelSpanXL="4"\r\n          labelSpanL="3"\r\n          labelSpanM="4"\r\n          labelSpanS="12"\r\n          emptySpanXL="0"\r\n          emptySpanL="4"\r\n          emptySpanM="0"\r\n          emptySpanS="0"\r\n          columnsXL="2"\r\n          columnsL="1"\r\n          columnsM="1"\r\n        ><Label text="ФИО" required="true" /><Input value="{dataModel>/name}" /><Label text="Подразделение" /><Input value="{dataModel>/department}" /></f:SimpleForm></sf:DynamicPageHeader></sf:header><sf:content><List mode="None" headerText="Транзакции" items="{dataModel>/transactions}"><headerToolbar><Toolbar><ToolbarSpacer /><Button icon="sap-icon://add" text="Добавить" press="onAdd" /></Toolbar></headerToolbar><StandardListItem type="Navigation" title="{dataModel>id}" description="{dataModel>text}" wrapping="true" info="{ parts: [\'dataModel>cost\', \'dataModel>technology\'], formatter: \'.getListItemInfo\'}" infoState="{ parts: [\'dataModel>cost\', \'dataModel>technology\'], formatter: \'.getListInfoState\'}" press="onListItemPress" /></List></sf:content><sf:footer></sf:footer></sf:DynamicPage></mvc:View>'
});
