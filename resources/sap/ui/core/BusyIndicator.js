/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","../base/EventProvider","./Popup","./BusyIndicatorUtils","sap/ui/core/library","sap/ui/performance/trace/FESR","sap/ui/performance/trace/Interaction","sap/base/Log","sap/base/assert","sap/base/util/now"],function(e,t,i,s,o,a,n,u,r,d){"use strict";var p=o.BusyIndicatorSize;var l=Object.assign(new t,{oPopup:null,oDomRef:null,bOpenRequested:false,iDEFAULT_DELAY_MS:1e3,sDOM_ID:"sapUiBusyIndicator"});l.M_EVENTS={Open:"Open",Close:"Close"};l._bShowIsDelayed=undefined;l._init=function(){var e=document.createElement("div");e.id=this.sDOM_ID;var t=document.createElement("div");this._oResBundle=sap.ui.getCore().getLibraryResourceBundle("sap.ui.core");var o=this._oResBundle.getText("BUSY_TEXT");delete this._oResBundle;t.className="sapUiBusy";t.setAttribute("tabindex","0");t.setAttribute("role","progressbar");t.setAttribute("alt","");t.setAttribute("title",o);e.appendChild(t);var a=s.getElement(p.Large);a.setAttribute("title",o);e.appendChild(a);var n=sap.ui.getCore().getStaticAreaRef();n.appendChild(e);this.oDomRef=e;this.oPopup=new i(e);this.oPopup.setModal(true,"sapUiBlyBusy");this.oPopup.setShadow(false);this.oPopup.attachOpened(function(e){this._onOpen(e)},this)};l._onOpen=function(e){var t=document.getElementById(l.sDOM_ID);t.style.height="100%";t.style.width="100%";var i=t.querySelector(".sapUiLocalBusyIndicator");i.className+=" sapUiLocalBusyIndicatorFade";if(t){t.focus()}this.fireOpen({$Busy:this.oPopup._$()})};l.show=function(e){u.debug("sap.ui.core.BusyIndicator.show (delay: "+e+") at "+(new Date).getTime());r(e===undefined||typeof e=="number"&&e%1==0,"iDelay must be empty or an integer");if(!document.body||!sap.ui.getCore().isInitialized()){if(l._bShowIsDelayed===undefined){sap.ui.getCore().attachInit(function(){if(l._bShowIsDelayed){l.show(e)}})}l._bShowIsDelayed=true;return}if(e===undefined||e!=0&&parseInt(e)==0||parseInt(e)<0){e=this.iDEFAULT_DELAY_MS}if(a.getActive()){this._fDelayedStartTime=d()+e}if(!this.oDomRef){this._init()}this.bOpenRequested=true;if(e===0){this._showNowIfRequested()}else{setTimeout(this["_showNowIfRequested"].bind(this),e)}};l._showNowIfRequested=function(){u.debug("sap.ui.core.BusyIndicator._showNowIfRequested (bOpenRequested: "+this.bOpenRequested+") at "+(new Date).getTime());if(!this.bOpenRequested){return}var e=window.scrollX===undefined?window.pageXOffset:window.scrollX;var t=window.scrollY===undefined?window.pageYOffset:window.scrollY;var s=e+" "+t;this.bOpenRequested=false;this.oPopup.open(0,i.Dock.LeftTop,i.Dock.LeftTop,document,s)};l.hide=function(){u.debug("sap.ui.core.BusyIndicator.hide at "+(new Date).getTime());if(this._fDelayedStartTime){var t=d()-this._fDelayedStartTime;n.addBusyDuration(t>0?t:0);delete this._fDelayedStartTime}var i=l;if(l._bShowIsDelayed===true){l._bShowIsDelayed=false}i.bOpenRequested=false;if(i.oDomRef){var s=i.oDomRef.querySelector(".sapUiLocalBusyIndicator");e(s).removeClass("sapUiLocalBusyIndicatorFade");this.fireClose({$Busy:this.oPopup._$()});i.oPopup.close(0)}};l.attachOpen=function(e,t){this.attachEvent(l.M_EVENTS.Open,e,t);return this};l.detachOpen=function(e,t){this.detachEvent(l.M_EVENTS.Open,e,t);return this};l.attachClose=function(e,t){this.attachEvent(l.M_EVENTS.Close,e,t);return this};l.detachClose=function(e,t){this.detachEvent(l.M_EVENTS.Close,e,t);return this};l.fireOpen=function(e){this.fireEvent(l.M_EVENTS.Open,e)};l.fireClose=function(e){this.fireEvent(l.M_EVENTS.Close,e)};return l},true);