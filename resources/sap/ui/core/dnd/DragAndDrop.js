/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","../UIArea","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/control"],function(e,t,r){"use strict";var n={},i=null,o=null,a=null,f=[],g=[],s=null,u,l,d,c,p={},h;function D(e,t){if(!e){return}if(e.addStyleClass){e.addStyleClass(t)}else{e.$().addClass(t)}}function v(e,t){if(!e){return}if(e.removeStyleClass){e.removeStyleClass(t)}else{e.$().removeClass(t)}}function m(e,t){var n=r(e.target).control(0,true);if(!n){return}var i=r.Event(null,e);i.type=t;n.getUIArea()._handleEvent(i)}function w(e){return!e.disabled&&/^(input|textarea)$/.test(e.localName)}function b(t,n){if(e.browser.msie||!t||!t.getDragGhost){return}var i=t.getDragGhost();if(!i){return}if(!l){l=r('<div class="sapUiDnDGhostContainer"></div>');r(document.body).append(l)}l.append(i);window.setTimeout(function(){l.empty()},0);var o=n.originalEvent;o.dataTransfer.setDragImage(i,o.offsetX,o.offsetY)}function C(t){var r={},n,o=t.originalEvent.dataTransfer,f=function(t,r){if(o&&t=="text"||!e.browser.msie&&!e.browser.edge){o.setData(t,r)}};return{setData:function(e,t){t=""+t;r[e]=t;f(e,t)},getData:function(e){return r[e]},setTextData:function(e){e=""+e;r["text/plain"]=e;r["text"]=e;f("text/plain",e);f("text",e)},getTextData:function(){return r["text/plain"]},setComplexData:function(e,t){r[e]=t},getComplexData:function(e){return r[e]},getIndicator:function(){return u&&u[0]},setIndicatorConfig:function(e){n=e},getIndicatorConfig:function(e){return n},getDragControl:function(){return i},getDropControl:function(){return a},setDropControl:function(e){a=e},getDropInfo:function(){return g[0]||null},getDropPosition:function(){return d}}}function E(e){i=o=a=s=null;d="";f=[];g=[]}function y(){if(u){return u}u=r("<div class='sapUiDnDIndicator'></div>");r(sap.ui.getCore().getStaticAreaRef()).append(u);return u}function S(){if(u){u.removeAttr("style");u.hide();p={}}}function O(e,t,r,n){if(!t){return}var i=e.dragSession&&e.dragSession.getIndicatorConfig(),o=t.getBoundingClientRect(),a=window.pageYOffset,f=window.pageXOffset,g=y(),s,u={},l={top:o.top+a,bottom:o.bottom+a,left:o.left+f,right:o.right+f,width:o.width,height:o.height};if(!r||r=="On"){s="On";n=""}else if(n=="Horizontal"){var d=e.pageX-l.left;u.height=l.height;u.top=l.top;if(r=="Between"){u.width="";if(d<l.width*.5){s="Before";u.left=l.left}else{s="After";u.left=l.right}}else if(r=="OnOrBetween"){if(d<l.width*.25){s="Before";u.left=l.left;u.width=""}else if(d>l.width*.75){s="After";u.left=l.right;u.width=""}else{s="On"}}if(s!="On"&&sap.ui.getCore().getConfiguration().getRTL()){s=s=="After"?"Before":"After"}}else{var c=e.pageY-l.top;u.width=l.width;u.left=l.left;if(r=="Between"){u.height="";if(c<l.height*.5){s="Before";u.top=l.top}else{s="After";u.top=l.bottom}}else if(r=="OnOrBetween"){if(c<l.height*.25){s="Before";u.top=l.top;u.height=""}else if(c>l.height*.75){s="After";u.top=l.bottom;u.height=""}else{s="On"}}}if(i&&i.display=="none"){return s}if(s=="On"){u.top=l.top;u.left=l.left;u.width=l.width;u.height=l.height;r=s}else{r="Between"}if(p.top!=u.top||p.left!=u.left||p.width!=u.width||p.height!=u.height){g.attr("data-drop-layout",n);g.attr("data-drop-position",r);g.css(Object.assign(u,i));g.show();p=u}return s}function x(e){var t=e.getParent(),r=e.getDragDropConfig?e.getDragDropConfig():[],n=t&&t.getDragDropConfig?t.getDragDropConfig():[];return r.concat(n)}function A(e){var t=x(e);return t.filter(function(t){return t.isDraggable(e)})}function T(e,t,r){var n=x(e);t=t||[];return n.filter(function(e){return!e.isA("sap.ui.core.dnd.IDragInfo")}).concat(t).filter(function(n){if(!n.isDroppable(e,r)){return false}var i=n.getGroupName();if(!i){return true}return t.some(function(e){return e.getGroupName()==i})})}function I(e,t){e.preventDefault();var r=t.getDropEffect().toLowerCase();e.originalEvent.dataTransfer.dropEffect=r}function B(e,t,r){var n=t.getTargetAggregation();if(!n){return O(e,r.getDomRef())}var i;if(e.getMark("DragWithin")==n){i=r.getDomRefForSetting(n)}i=i||r.getDomRef();return O(e,i,t.getDropPosition(true),t.getDropLayout(true))}n.preprocessEvent=function(e){if(s&&e.type.indexOf("dr")==0){e.dragSession=s}var t="onbefore"+e.type;if(n[t]){n[t](e)}};n.postprocessEvent=function(e){var t="onafter"+e.type;if(n[t]){n[t](e)}};n.onbeforemousedown=function(t){if((e.browser.msie||e.browser.firefox||e.browser.edge)&&w(t.target)){h=r(t.target).closest("[data-sap-ui-draggable=true]").prop("draggable",false)[0]}};n.onbeforemouseup=function(e){if(h){h.draggable=true;h=null}};n.onbeforedragstart=function(t){if(!t.target.draggable){return}if(w(document.activeElement)){t.target.getAttribute("data-sap-ui-draggable")&&t.preventDefault();return}i=r(t.target).control(0,true);if(!i){return}f=A(i);if(!f.length){return}if(e.browser.firefox&&t.originalEvent.dataTransfer.types.length===0){t.originalEvent.dataTransfer.setData("ui5/dummyDataForFirefox","data")}t.dragSession=s=C(t)};n.onafterdragstart=function(e){if(!f.length||e.isDefaultPrevented()){E();return}f=e.isMarked("NonDraggable")?[]:f.filter(function(t){return t.fireDragStart(e)});if(!f.length){e.preventDefault();E();return}b(i,e);D(i,"sapUiDnDDragging");if(r(e.target).closest(".sapUiScrollDelegate")[0]){r("html").addClass("sapUiDnDNoScrolling")}};n.onbeforedragenter=function(e){var t=r(e.target).control(0,true);if(t&&o===t){e.setMark("DragWithin","SameControl")}else{c=Date.now();o=t}var n=[];a=t;for(var i=0;i<20&&a;i++,a=a.getParent()){n=T(a,f,e);if(n.length){break}}if(e.getMark("DragWithin")!="SameControl"){g=n;if(s){s.setIndicatorConfig(null)}}if(!g.length){a=null}else if(!s){e.dragSession=s=C(e)}};n.onafterdragenter=function(e){if(!a||e.isMarked("NonDroppable")){g=[]}else if(e.getMark("DragWithin")!="SameControl"){g=g.filter(function(t){return t.fireDragEnter(e)})}var t=g[0];if(!t||t.getDropEffect()=="None"){S();d=""}else{I(e,t);d=B(e,t,a)}};n.onbeforedragover=function(e){var t=Date.now();if(t-c>=1e3){m(e,"longdragover");c=t}};n.onafterdragover=function(e){var t=g[0];if(!t||t.getDropEffect()=="None"){return}g.forEach(function(t){t.fireDragOver(e)});I(e,t);if(t&&t.getDropPosition(true)=="On"){return}d=B(e,t,a)};n.onbeforedrop=function(e){if(g.length){e.preventDefault()}};n.onafterdrop=function(e){g.forEach(function(t){t.fireDrop(e)});this.iDragEndTimer=window.requestAnimationFrame(this.onafterdragend.bind(this,e))};n.onafterdragend=function(e){this.iDragEndTimer=window.cancelAnimationFrame(this.iDragEndTimer);f.forEach(function(t){t.fireDragEnd(e)});v(i,"sapUiDnDDragging");r("html").removeClass("sapUiDnDNoScrolling");S();E()};t.addEventPreprocessor(n.preprocessEvent);t.addEventPostprocessor(n.postprocessEvent);return n},true);