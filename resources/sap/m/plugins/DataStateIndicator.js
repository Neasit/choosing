/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./PluginBase","sap/ui/core/Core","sap/ui/base/ManagedObjectObserver"],function(t,e,i){"use strict";var s=t.extend("sap.m.plugins.DataStateIndicator",{metadata:{library:"sap.m",properties:{filter:{type:"function",invalidate:false},enableFiltering:{type:"boolean",defaultValue:false,invalidate:false}},events:{dataStateChange:{allowPreventDefault:true,parameters:{dataState:{type:"sap.ui.model.DataState"},filteredMessages:{type:"object[]"}}},applyFilter:{allowPreventDefault:true,parameters:{filter:{type:"sap.ui.model.Filter"}}},clearFilter:{allowPreventDefault:true}}}});s.prototype.onActivate=function(t){this._bFiltering=false;var e=this._getBindingName();var s=t.getBinding(e);if(s){s.attachAggregatedDataStateChange(this._onAggregatedDataStateChange,this);this._processDataState(s.getDataState())}this._oObserver=new i(this._observeChanges.bind(this));this._oObserver.observe(t,{bindings:[e]})};s.prototype.onDeactivate=function(t){var e=this._getBindingName();var i=t.getBinding(e);if(i){i.detachAggregatedDataStateChange(this._onAggregatedDataStateChange,this);i.getDataState().getMessages().forEach(function(e){e.removeControlId(t.getId())})}if(this._bFiltering){this._clearFilter()}if(this._oMessageStrip){this._oMessageStrip.destroy();this._oMessageStrip=null}if(this._oLink){this._oLink.destroy();this._oLink=null}if(this._oInfoToolbar){this._oInfoToolbar.destroy();this._oInfoToolbar=this._oInfoText=null}this._oObserver.unobserve(t,{bindings:[e]});this._oObserver.destroy();this._oObserver=null};s.prototype._setLinkText=function(t){this._sLinkText=t;this._updateLinkControl()};s.prototype.setEnableFiltering=function(t){if((t=!!t)==this.getEnableFiltering()){return this}this.setProperty("enableFiltering",t,true);if(this.isActive()){if(t){this.refresh()}else{this._clearFilter(true)}}};s.prototype.showMessage=function(t,e){if(!this.getEnabled()||!this.getControl()||!t&&!this._oMessageStrip){return}if(this._oMessageStrip){this._oMessageStrip.setText(t).setType(e).setVisible(!!t)}else{sap.ui.require(["sap/m/MessageStrip"],function(i){var s=this.getControl();this._oMessageStrip=new i({showCloseButton:true,showIcon:true,close:function(){s.focus()}}).addStyleClass("sapUiTinyMargin");s.setAggregation("_messageStrip",this._oMessageStrip);s.addAriaLabelledBy(this._oMessageStrip);this._updateLinkControl();this.showMessage(t,e)}.bind(this))}};s.prototype.isFiltering=function(){return!!this._bFiltering};s.prototype.refresh=function(){if(this.isActive()){var t=this.getControl().getBinding(this._getBindingName());if(t){this._processDataState(t.getDataState(),true);if(t.requestFilterForMessages&&this._bFiltering){this._applyFilter()}}}};s.prototype._updateLinkControl=function(){if(!this._oMessageStrip){return}if(!this._sLinkText){this._oMessageStrip.setLink(null)}else if(this._oLink){this._oLink.setText(this._sLinkText);this._oMessageStrip.setLink(this._oLink)}else{sap.ui.require(["sap/m/Link"],function(t){this._oLink=new t({press:[this._onLinkPress,this]});this._updateLinkControl()}.bind(this))}};s.prototype._getBindingName=function(){return this.getConfig("defaultBindingName")};s.prototype._processDataState=function(t,i){if(!t){return}if(!i&&!t.getChanges().messages){return}var s=this.getControl();var n=s&&s.getBinding(this._getBindingName());if(n&&n.bIsBeingDestroyed){return}var r=t.getMessages();var o=this.getFilter();if(o){r=r.filter(function(t){return o(t,s)})}if(!this.fireDataStateChange({dataState:t,filteredMessages:r})){return}if(r.length){var a="";var l=false;var h=r[0];r.forEach(function(t){if(t.getControlIds().indexOf(s.getId())==-1){t.addControlId(s.getId());l=true}});this._sCombinedType=this._getCombinedType(r);if(r.length==1&&h.getTarget()&&h.getTarget().endsWith(n.getPath())){a=h.getMessage()}else{a=this._translate(this._sCombinedType.toUpperCase())}this.showMessage(a,h.getType());if(!this._bFiltering&&n.requestFilterForMessages&&this.getEnableFiltering()){var o=this.getFilter();var f=o&&function(t){return o(t,s)};n.requestFilterForMessages(f).then(function(t){t&&this._setLinkText(this._translate("FILTER_ITEMS"))}.bind(this))}if(l){e.getMessageManager().getMessageModel().checkUpdate(false,true)}}else{this.showMessage("");if(this._bFiltering){this._clearFilter(true)}}};s.prototype._onLinkPress=function(){if(this._bFiltering){this._clearFilter()}else{this._applyFilter()}};s.prototype._clearFilter=function(t){if(this._bFiltering){this._bFiltering=false;this._hideFilterInfo(t);if(this.fireClearFilter()&&this._fnLastFilter){this._fnLastFilter("Application");delete this.getControl().getBinding(this._getBindingName()).filter}}};s.prototype._applyFilter=function(){var t=this.getFilter();var e=this.getControl();var i=e.getBinding(this._getBindingName());var s=t&&function(i){return t(i,e)};i.requestFilterForMessages(s).then(function(t){if(!t){return this._setLinkText("")}var e=this._bFiltering;if(!e){this._bFiltering=true;this._showFilterInfo()}if(!this.fireApplyFilter({filter:t,revert:this._clearFilter.bind(this)})){return}if(!e){this._fnLastFilter=i.filter.bind(i,i.aApplicationFilters);this._fnBindingFilter=i.filter}else{delete i.filter}i.filter(t,"Application");i.filter=function(t,e){if(e=="Application"){this._fnLastFilter=this._fnBindingFilter.bind(i,t);return i}return this._fnBindingFilter.apply(i,arguments)}.bind(this)}.bind(this))};s.prototype._hideFilterInfo=function(t){this._oMessageStrip.setShowCloseButton(true);this._setLinkText(t?"":this._translate("FILTER_ITEMS"));this.getConfig("hideInfoToolbar",this.getControl())};s.prototype._showFilterInfo=function(){if(this._oInfoText){this._oMessageStrip.setShowCloseButton(false);this._setLinkText(this._translate("CLEAR_FILTER"));this._oInfoText.setText(this._translate("FILTERED_BY_"+this._sCombinedType.toUpperCase()));if(!this._oInfoToolbar.getParent()){this.getConfig("showInfoToolbar",this.getControl(),this._oInfoToolbar)}}else{sap.ui.require(["sap/m/Text","sap/m/Toolbar"],function(t,e){this._oInfoText=new t;this._oInfoToolbar=new e({design:"Info",content:this._oInfoText,active:this.hasListeners("filterInfoPress"),press:this.fireEvent.bind(this,"filterInfoPress")});this._showFilterInfo()}.bind(this))}};s.prototype._getCombinedType=function(t){if(t&&t.length){var e={None:0,Information:1,Success:2,Warning:4,Error:8};var i=0;t.forEach(function(t){i|=e[t.getType()]});if(i&e.Error&&i&e.Warning){return"Issue"}if(i&e.Error){return"Error"}if(i&e.Warning){return"Warning"}if(i&e.Success||i&e.Information){return"Notification"}}return""};s.prototype._onAggregatedDataStateChange=function(t){this._processDataState(t.getParameter("dataState"))};s.prototype._observeChanges=function(t){var e=t.bindingInfo.binding;if(e){var i=t.mutation=="ready"?"attach":"detach";e[i+"AggregatedDataStateChange"](this._onAggregatedDataStateChange,this)}};s.prototype._translate=function(t){var i="DATASTATE_"+t;var s=this.getControl().getMetadata();var n=s.getLibraryName();var r=s.getName().split(".").pop().toUpperCase();var o=e.getLibraryResourceBundle(n);var a=r+"_"+i;if(o.hasText(a)){return o.getText(a)}if(n=="sap.m"){return o.getText(i)}return e.getLibraryResourceBundle("sap.m").getText(i)};t.setConfigs({"sap.m.ListBase":{defaultBindingName:"items",useInfoToolbar:function(t){return t&&t.getUseInfoToolbar&&t.getUseInfoToolbar()=="Off"?false:true},showInfoToolbar:function(t,e){if(this.useInfoToolbar(t.getParent())){this._oOldInfoToolbar=t.getInfoToolbar();this._oNewInfoToolbar=e;t.setInfoToolbar(e)}},hideInfoToolbar:function(t){if(this._oNewInfoToolbar){t.setInfoToolbar(this._oOldInfoToolbar);this._oNewInfoToolbar=this._oOldInfoToolbar=null}},onDeactivate:function(t){this.hideInfoToolbar(t)}},"sap.ui.table.Table":{defaultBindingName:"rows",useInfoToolbar:function(t){return t&&t.getUseInfoToolbar&&t.getUseInfoToolbar()=="Off"?false:true},showInfoToolbar:function(t,e){if(this.useInfoToolbar(t.getParent())){this._oInfoToolbar=e;t.addExtension(e)}},hideInfoToolbar:function(t){if(this._oInfoToolbar){t.removeExtension(this._oInfoToolbar);this._oInfoToolbar=null}},onDeactivate:function(t){this.hideInfoToolbar(t)}}},s);return s});