/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Control","./Popup","./library","sap/ui/events/KeyCodes","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/control"],function(t,e,o,i,s){"use strict";var r=o.OpenState;var n=t.extend("sap.ui.core.TooltipBase",{metadata:{abstract:true,library:"sap.ui.core",properties:{text:{type:"string",group:"Misc",defaultValue:""},openDuration:{type:"int",group:"Behavior",defaultValue:200},closeDuration:{type:"int",group:"Behavior",defaultValue:200},myPosition:{type:"sap.ui.core.Dock",group:"Behavior",defaultValue:"begin top"},atPosition:{type:"sap.ui.core.Dock",group:"Behavior",defaultValue:"begin bottom"},offset:{type:"string",group:"Behavior",defaultValue:"10 3"},collision:{type:"sap.ui.core.Collision",group:"Behavior",defaultValue:"flip"},openDelay:{type:"int",group:"Misc",defaultValue:500},closeDelay:{type:"int",group:"Misc",defaultValue:100}},events:{closed:{}}},renderer:null});n.prototype._getPopup=function(){var t=new e;t.setShadow(true);n.prototype._getPopup=function(){return t};return t};n.prototype.onfocusin=function(t){var e=s(t.target).control(0);if(e!=null){var o=e.getFocusDomRef();this.sStoredTooltip=null;if(o.title&&o.title!=""){this.sStoredTooltip=o.title;o.title=""}var i=this._getPopup();if(!(i.isOpen()&&i.getContent()==this)){sap.ui.getCore().getRenderManager().render(this,sap.ui.getCore().getStaticAreaRef(),true)}var r=o.getAttribute("aria-describedby");var n=this.getId()+"-title "+this.getId()+"-txt";if(r==null||r==""){o.setAttribute("aria-describedby",n)}else if(r.indexOf(n)==-1){o.setAttribute("aria-describedby",r+" "+n)}}};n.prototype.onfocusout=function(t){var e=s(t.target).control(0);if(e!=null){var o=e.getFocusDomRef();if(this.sStoredTooltip){o.title=this.sStoredTooltip}var i=o.getAttribute("aria-describedby");var r=this.getId()+"-title "+this.getId()+"-txt";if(i&&i.indexOf(r)>=0){if(i.trim()==r){o.removeAttribute("aria-describedby")}else{i=i.replace(r,"");o.setAttribute("aria-describedby",i)}}}if(n.sOpenTimeout){clearTimeout(n.sOpenTimeout);n.sOpenTimeout=undefined}this.sCloseNowTimeout=setTimeout(this["closePopup"].bind(this),this.getCloseDelay())};n.prototype.isStandardTooltip=function(t){return typeof t==="string"&&!!t.trim()};n.prototype.onmouseover=function(t){var e=s(t.target).control(0),o=s(t.currentTarget).control(0),i=s(t.relatedTarget).control(0);if(!e){return}if(e===this){if(this.sCloseNowTimeout){clearTimeout(this.sCloseNowTimeout);this.sCloseNowTimeout=null}t.stopPropagation();t.preventDefault();return}if(o===e||!this.isStandardTooltip(e.getTooltip())){if(this.sCloseNowTimeout){clearTimeout(this.sCloseNowTimeout);this.sCloseNowTimeout=null;t.stopPropagation();t.preventDefault()}}if(i){if(i.getParent()){if(i.getParent()===o&&o===e){var r=i.getTooltip();if(!this.isStandardTooltip(r)&&(!r||!(r instanceof n))){if(this.sCloseNowTimeout){clearTimeout(this.sCloseNowTimeout);this.sCloseNowTimeout=null;t.stopPropagation();t.preventDefault()}}}}}if(this._currentControl===e||!this.isStandardTooltip(e.getTooltip())){this.removeStandardTooltips();if(n.sOpenTimeout){clearTimeout(n.sOpenTimeout)}n.sOpenTimeout=setTimeout(this["openPopup"].bind(this,this._currentControl),this.getOpenDelay());t.stopPropagation();t.preventDefault()}};n.prototype.onmouseout=function(t){if(n.sOpenTimeout){clearTimeout(n.sOpenTimeout);n.sOpenTimeout=undefined}if(!this.sCloseNowTimeout){this.sCloseNowTimeout=setTimeout(this["closePopup"].bind(this),this.getCloseDelay())}this.restoreStandardTooltips();t.stopPropagation();t.preventDefault()};n.prototype.closePopup=function(){var t=this._getPopup();if(this.sCloseNowTimeout){clearTimeout(this.sCloseNowTimeout)}this.sCloseNowTimeout=undefined;t.attachClosed(this.handleClosed,this);t.close();this.restoreStandardTooltips()};n.prototype.handleClosed=function(){this._getPopup().detachClosed(this.handleClosed,this);this.fireClosed()};n.prototype.openPopup=function(t){if(!this.getVisible()){return}if(t.getTooltip()!=null){if(this.sCloseNowTimeout){clearTimeout(this.sCloseNowTimeout);this.sCloseNowTimeout=null;return}var e=this._getPopup();if(e.isOpen()&&e.getContent()==this){return}sap.ui.getCore().getRenderManager().render(this,sap.ui.getCore().getStaticAreaRef(),true);var o=t.getDomRef();e.setContent(this);e.setPosition(this.getMyPosition(),this.getAtPosition(),o,this.getOffset(),this.getCollision());e.setDurations(this.getOpenDuration(),this.getCloseDuration());e.open();this.removeStandardTooltips()}};n.prototype.removeStandardTooltips=function(){var t=this._currentControl.getDomRef();if(!this.aStoredTooltips){this.aStoredTooltips=[]}else{return}var e="";while(t&&!(t===document)){e=t.title;if(e){this.aStoredTooltips.push({domref:t,tooltip:e});t.title=""}t=t.parentNode}if(this._currentControl.getTooltipDomRefs){var o=this._currentControl.getTooltipDomRefs();for(var i=0;i<o.length;i++){t=o[i];if(t){e=t.title;if(e){this.aStoredTooltips.push({domref:t,tooltip:e});t.title=""}}}}};n.prototype.restoreStandardTooltips=function(){var t=this._getPopup();var e=t.getOpenState();if(e===r.OPEN||e===r.OPENING){return}if(n.sOpenTimeout){return}if(this.aStoredTooltips){for(var o=0;o<this.aStoredTooltips.length;o++){var i=this.aStoredTooltips[o].domref;i.title=this.aStoredTooltips[o].tooltip}}this.aStoredTooltips=null};n.prototype.setParent=function(e,o){var i=this._getPopup();if(i&&i.isOpen()){this.closePopup()}t.prototype.setParent.apply(this,arguments)};n.prototype.onkeydown=function(t){if(t.ctrlKey&&t.which==i.I){var e=s(t.target).control(0);if(e!=null){if(this._currentControl===e||!this.isStandardTooltip(e.getTooltip())){this.removeStandardTooltips();this.openPopup(this._currentControl);t.preventDefault();t.stopPropagation()}}}else if(t.which==i.ESCAPE){if(n.sOpenTimeout){clearTimeout(n.sOpenTimeout);n.sOpenTimeout=undefined}var o=this.oPopup&&this.oPopup.isOpen();this.closePopup();if(o){t.preventDefault();t.stopPropagation()}}};n.prototype._closeOrPreventOpen=function(){var t=this._getPopup();if(t.isOpen()){this.closePopup()}else if(n.sOpenTimeout){clearTimeout(n.sOpenTimeout);n.sOpenTimeout=undefined}};return n});