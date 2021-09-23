/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","sap/f/library"],function(e,t){"use strict";var r=t.cards.HeaderPosition;var a=e.extend("sap.f.CardRenderer",{apiVersion:2});a.render=function(e,t){var a=t.getCardHeader(),n=a&&t.getCardHeaderPosition()===r.Top;e.openStart("div",t);this.renderContainerAttributes(e,t);e.openEnd();if(n){e.renderControl(a)}this.renderContentSection(e,t);if(!n){e.renderControl(a)}e.renderControl(t._ariaText);e.renderControl(t._ariaContentText);e.close("div")};a.renderContainerAttributes=function(e,t){var a=t.getHeight(),n=t.getTooltip_AsString();var i=!!(t.getCardHeader()&&t.getCardHeader().getVisible()),o=i&&t.getCardHeaderPosition()===r.Bottom;e.class("sapFCard").style("width",t.getWidth());if(!i){e.class("sapFCardNoHeader")}if(!t.getCardContent()){e.class("sapFCardNoContent")}if(o){e.class("sapFCardBottomHeader")}if(a&&a!=="auto"){e.style("height",a)}if(n){e.attr("title",n)}e.accessibilityState(t,{role:"region",labelledby:{value:t._getAriaLabelledIds(),append:true}})};a.renderContentSection=function(e,t){var r=t.getCardContent();if(r){e.openStart("div",t.getId()+"-contentSection").class("sapFCardContent").accessibilityState(t,{role:"group",labelledby:{value:t.getId()+"-ariaContentText",append:true}}).openEnd();e.renderControl(r);e.close("div")}};return a});