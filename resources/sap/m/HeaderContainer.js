/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","./Button","./ScrollContainer","sap/ui/core/Core","sap/ui/core/Control","sap/ui/Device","sap/m/HeaderContainerItemNavigator","sap/ui/core/delegate/ItemNavigation","sap/ui/core/library","sap/ui/core/IntervalTrigger","sap/ui/core/Icon","./HeaderContainerRenderer","sap/base/Log","sap/ui/events/PseudoEvents","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/control","sap/ui/dom/jquery/scrollLeftRTL","sap/ui/dom/jquery/scrollRightRTL","sap/ui/dom/jquery/Selectors"],function(t,e,r,i,o,s,n,a,l,h,c,g,d,p,u){"use strict";var f=l.Orientation;var v=o.extend("sap.m.HeaderContainerItemContainer",{metadata:{defaultAggregation:"item",properties:{position:{type:"int",defaultValue:null},setSize:{type:"int",defaultValue:null},ariaLabelledBy:{type:"string",defaultValue:null}},aggregations:{item:{type:"sap.ui.core.Control",multiple:false}}},renderer:{apiVersion:2,render:function(t,e){var r=e.getAggregation("item");if(!r||!r.getVisible()){return}t.openStart("div",e);t.class("sapMHdrCntrItemCntr");t.class("sapMHrdrCntrInner");t.attr("aria-setsize",e.getSetSize());t.attr("aria-posinset",e.getPosition());t.attr("role","listitem");if(e.getAriaLabelledBy()){t.attr("aria-labelledby",e.getAriaLabelledBy())}t.openEnd();t.renderControl(r);t.close("div")}}});var _=o.extend("sap.m.HeaderContainer",{metadata:{interfaces:["sap.m.ObjectHeaderContainer"],library:"sap.m",properties:{scrollStep:{type:"int",defaultValue:300,group:"Behavior"},scrollStepByItem:{type:"int",defaultValue:1,group:"Behavior"},scrollTime:{type:"int",defaultValue:500,group:"Behavior"},showOverflowItem:{type:"boolean",defaultValue:true,group:"Behavior"},showDividers:{type:"boolean",defaultValue:true,group:"Appearance"},orientation:{type:"sap.ui.core.Orientation",defaultValue:f.Horizontal,group:"Appearance"},backgroundDesign:{type:"sap.m.BackgroundDesign",defaultValue:t.BackgroundDesign.Transparent,group:"Appearance"},width:{type:"sap.ui.core.CSSSize",group:"Appearance"},height:{type:"sap.ui.core.CSSSize",group:"Appearance"}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true},_scrollContainer:{type:"sap.m.ScrollContainer",multiple:false,visibility:"hidden"},_prevButton:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_nextButton:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{scroll:{}}}});_.prototype.init=function(){this._aItemEnd=[];this._bRtl=sap.ui.getCore().getConfiguration().getRTL();this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oScrollCntr=new r(this.getId()+"-scrl-cntnr",{width:"100%",height:"100%",horizontal:!s.system.desktop});this.setAggregation("_scrollContainer",this._oScrollCntr,true);if(s.system.desktop){this._oArrowPrev=new e({id:this.getId()+"-scrl-prev-button",type:t.ButtonType.Transparent,tooltip:this._oRb.getText("HEADERCONTAINER_BUTTON_PREV_SECTION"),press:function(t){t.cancelBubble();this._scroll(this._getScrollValue(false),this.getScrollTime())}.bind(this)}).addStyleClass("sapMHdrCntrBtn").addStyleClass("sapMHdrCntrLeft");this._oArrowPrev._bExcludeFromTabChain=true;this.setAggregation("_prevButton",this._oArrowPrev,true);this._oArrowNext=new e({id:this.getId()+"-scrl-next-button",type:t.ButtonType.Transparent,tooltip:this._oRb.getText("HEADERCONTAINER_BUTTON_NEXT_SECTION"),press:function(t){t.cancelBubble();this._scroll(this._getScrollValue(true),this.getScrollTime())}.bind(this)}).addStyleClass("sapMHdrCntrBtn").addStyleClass("sapMHdrCntrRight");this._oArrowNext._bExcludeFromTabChain=true;this.setAggregation("_nextButton",this._oArrowNext,true)}else if(s.system.phone||s.system.tablet){this._oArrowPrev=new c({id:this.getId()+"-scrl-prev-button"}).addStyleClass("sapMHdrCntrBtn").addStyleClass("sapMHdrCntrLeft");this.setAggregation("_prevButton",this._oArrowPrev,true);this._oArrowNext=new c({id:this.getId()+"-scrl-next-button"}).addStyleClass("sapMHdrCntrBtn").addStyleClass("sapMHdrCntrRight");this.setAggregation("_nextButton",this._oArrowNext,true)}this._oScrollCntr.addDelegate({onAfterRendering:function(){if(s.system.desktop){var t=this._oScrollCntr.getDomRef("scroll");var e=this._oScrollCntr.$("scroll");var r=e.find(".sapMHrdrCntrInner").attr("tabindex","0");t.setAttribute("role","list");if(!this._oItemNavigation){this._oItemNavigation=new n;this.addDelegate(this._oItemNavigation);this._oItemNavigation.attachEvent(a.Events.BorderReached,this._handleBorderReached,this);this._oItemNavigation.attachEvent(a.Events.AfterFocus,this._handleAfterFocus,this);this._oItemNavigation.attachEvent(a.Events.BeforeFocus,this._handleBeforeFocus,this);if(s.browser.msie||s.browser.edge){this._oItemNavigation.attachEvent(a.Events.FocusAgain,this._handleFocusAgain,this)}}this._oItemNavigation.setRootDomRef(t);this._oItemNavigation.setItemDomRefs(r);this._oItemNavigation.setTabIndex0();this._oItemNavigation.setCycling(false);this._handleMobileScrolling()}}.bind(this)});h.addListener(this._checkOverflow,this)};_.prototype.onBeforeRendering=function(){var t=this.getOrientation()===f.Horizontal,e=t?"sap-icon://slim-arrow-left":"sap-icon://slim-arrow-up",r=t?"sap-icon://slim-arrow-right":"sap-icon://slim-arrow-down";if(!this.getHeight()){d.warning("No height provided",this)}if(!this.getWidth()){d.warning("No width provided",this)}if(s.system.desktop){this._oArrowPrev.setProperty("icon",e,true);this._oArrowNext.setProperty("icon",r,true)}else if(s.system.phone||s.system.tablet){this._oArrowPrev.setProperty("src",e,true);this._oArrowNext.setProperty("src",r,true)}this.getContent()};_.prototype.onAfterRendering=function(){this._bRtl=sap.ui.getCore().getConfiguration().getRTL();this._checkOverflow()};_.prototype.exit=function(){if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();this._oItemNavigation=null}h.removeListener(this._checkOverflow,this)};_.prototype.onsaptabnext=function(t){var e=this.$().find(":focusable");var r=e.index(t.target);var i=e.eq(r+1).get(0);var o=this._getParentCell(t.target);var s;if(i){s=this._getParentCell(i)}if(o&&s&&o.id!==s.id||i&&i.id===this.getId()+"-after"||i&&i.id===this.getId()+"-scrl-prev-button"||i&&i.id===this.getId()+"-scrl-next-button"){var n=e.last().get(0);if(n){this._bIgnoreFocusIn=true;n.focus()}}};_.prototype.onsaptabprevious=function(t){this.$().find(".sapMHdrCntrItemCntr").css("border-color","");var e=this.$().find(":focusable");var r=e.index(t.target);var i=e.eq(r-1).get(0);var o=this._getParentCell(t.target);var s;if(i){s=this._getParentCell(i)}if(!s||o&&o.id!==s.id){var n=this.$().attr("tabindex");this.$().attr("tabindex","0");this.$().trigger("focus");if(!n){this.$().removeAttr("tabindex")}else{this.$().attr("tabindex",n)}}};_.prototype.setOrientation=function(t){this.setProperty("orientation",t);if(t===f.Horizontal&&!s.system.desktop){this._oScrollCntr.setHorizontal(true);this._oScrollCntr.setVertical(false)}else if(!s.system.desktop){this._oScrollCntr.setHorizontal(false);this._oScrollCntr.setVertical(true)}return this};_.prototype.validateAggregation=function(t,e,r){return this._callSuperMethod("validateAggregation",t,e,r)};_.prototype.getAggregation=function(t,e,r){return this._callSuperMethod("getAggregation",t,e,r)};_.prototype.setAggregation=function(t,e,r){return this._callSuperMethod("setAggregation",t,e,r)};_.prototype.indexOfAggregation=function(t,e){return this._callSuperMethod("indexOfAggregation",t,e)};_.prototype.insertAggregation=function(t,e,r,i){return this._callSuperMethod("insertAggregation",t,e,r,i)};_.prototype.addAggregation=function(t,e,r){return this._callSuperMethod("addAggregation",t,e,r)};_.prototype.removeAggregation=function(t,e,r){return this._callSuperMethod("removeAggregation",t,e,r)};_.prototype.removeAllAggregation=function(t,e){return this._callSuperMethod("removeAllAggregation",t,e)};_.prototype.destroyAggregation=function(t,e){return this._callSuperMethod("destroyAggregation",t,e)};_.prototype._setScrollInProcess=function(t){this.bScrollInProcess=t};_.prototype._scroll=function(t,e){this._setScrollInProcess(true);this.fireScroll();setTimeout(this._setScrollInProcess.bind(this,false),e+300);if(this.getOrientation()===f.Horizontal){this._hScroll(t,e)}else{this._vScroll(t,e)}};_.prototype._vScroll=function(t,e){var r=this._oScrollCntr.getDomRef(),i=r.scrollTop,o=r.scrollHeight,s=i+t,n=r.clientHeight,a=parseFloat(this.$("scroll-area").css("padding-top")),l;if(s<=0){l=this._calculateRemainingScrolling(t,e,i);this.$("scroll-area").css("transition","padding "+l+"s");this.$().removeClass("sapMHrdrTopPadding")}else if(s+n+a>=o){l=this._calculateRemainingScrolling(t,e,o-n-i);this.$("scroll-area").css("transition","padding "+l+"s");if(n+t>o&&n!==o){this.$().removeClass("sapMHrdrBottomPadding");this.$().addClass("sapMHrdrTopPadding")}else{this.$().removeClass("sapMHrdrBottomPadding")}}else{this.$("scroll-area").css("transition","padding "+e/1e3+"s")}this._oScrollCntr.scrollTo(0,s,e)};_.prototype._hScroll=function(t,e){var r=this._oScrollCntr.getDomRef();var i,o,n,a,l,h;if(!this._bRtl){o=r.scrollLeft;a=r.scrollWidth;n=r.clientWidth+(s.browser.msie?1:0);i=o+t;l=parseFloat(this.$("scroll-area").css("padding-left"));if(i<=0){h=this._calculateRemainingScrolling(t,e,o);this.$("scroll-area").css("transition","padding "+h+"s");this.$().removeClass("sapMHrdrLeftPadding")}else if(i+r.clientWidth+l>=a){h=this._calculateRemainingScrolling(t,e,a-n-o);this.$("scroll-area").css("transition","padding "+h+"s");if(n+t>a&&n!==a){this.$().removeClass("sapMHrdrRightPadding");this.$().addClass("sapMHrdrLeftPadding")}else{this.$().removeClass("sapMHrdrRightPadding")}}else{this.$("scroll-area").css("transition","padding "+e/1e3+"s")}this._oScrollCntr.scrollTo(i,0,e)}else{i=u(r).scrollRightRTL()+t;this._oScrollCntr.scrollTo(i>0?i:0,0,e)}};_.prototype._collectItemSize=function(){var t=0,e=this._filterVisibleItems(),r=this.getOrientation()===f.Horizontal?"outerWidth":"outerHeight";this._aItemEnd=[];e.forEach(function(e,i){t+=e.$().parent()[r](true);this._aItemEnd[i]=t},this)};_.prototype._getScrollValue=function(t){if(!this._oScrollCntr){return 0}var e=this.getOrientation()===f.Horizontal,r=this._oScrollCntr.$(),i=this.$("prev-button-container"),o=this.$("next-button-container"),s=e?r[0].scrollLeft:r[0].scrollTop,n=0,a=0,l,h=this._filterVisibleItems();var c=function(t){var r=0,s=0;var n=10;if(this._bRtl&&e){if(!i.is(":visible")){s=i.width()}if(!o.is(":visible")){s=o.width()}}for(var a=0;a<h.length&&a<t;a++){r+=g(h[a])}return r!==0?r+n-s:0}.bind(this);var g=function(t){return e?t.$().parent().outerWidth(true):t.$().parent().outerHeight(true)};var d=function(){var t=this._getSize(true),e,r=0;for(var i=n;i<h.length;i++){if(!h[i].$().is(":visible")){e=g(h[i])+c(i)-t-s;for(var o=n;o<h.length&&o<i;o++){if(l+r>e){break}n++;r+=g(h[o])}l+=r;break}}}.bind(this);if(this.getScrollStepByItem()>0){s=e&&this._bRtl?r.scrollRightRTL():s;for(var p=0;p<h.length;p++){a+=g(h[p]);if(a>=s){n=p;break}}n=(t?1:-1)*this.getScrollStepByItem()+n;if(n<0){n=0}if(n>=h.length){n=h.length-1}l=c(n)-s;if(t&&!this.getShowOverflowItem()){d()}return l}return t?this.getScrollStep():-this.getScrollStep()};_.prototype._calculateRemainingScrolling=function(t,e,r){return Math.abs(r*e/(1e3*t))};_.prototype._checkOverflow=function(){if(this.getOrientation()===f.Horizontal){this._checkHOverflow()}else{this._checkVOverflow()}};_.prototype._filterVisibleItems=function(){return this.getContent().filter(function(t){return t.getVisible()})};_.prototype._getFirstItemOffset=function(t){var e=this._filterVisibleItems()[0],r=e&&e.$(),i=r&&r.parent(),o=i&&i[0]&&i[0][t];return o||0};_.prototype._checkVOverflow=function(){var t=this._oScrollCntr.getDomRef(),e,r;if(t){var i=this._getFirstItemOffset("offsetTop");var o=Math.ceil(t.scrollTop);var s=false;var n=false;var a=t.scrollHeight;var l=t.offsetHeight;if(Math.abs(a-l)===1){a=l}if(o>i){s=true}if(a>l&&o+l<a){n=true}n=this._checkForOverflowItem(n);r=this.$("prev-button-container");e=r.is(":visible");if(e&&!s){r.hide();this.$().removeClass("sapMHrdrTopPadding")}if(!e&&s){r.show();this.$().addClass("sapMHrdrTopPadding")}r=this.$("next-button-container");var h=r.is(":visible");if(h&&!n){r.hide();this.$().removeClass("sapMHrdrBottomPadding")}if(!h&&n){r.show();this.$().addClass("sapMHrdrBottomPadding")}}};_.prototype._handleMobileScrolling=function(){if(i.isMobile()){var t=this.$("scrl-cntnr-scroll"),e=this.getOrientation()===f.Horizontal,r=e?"clientX":"clientY",o=0,s=this,n=false;t.on("touchstart",function(t){n=true;o=t.targetTouches[0][r]});t.on("touchmove",function(t){if(n){var i=t.targetTouches[0][r],a=o-i,l=s._oScrollCntr.getDomRef();e?l.scrollLeft+=a:l.scrollTop+=a;o=i;t.preventDefault()}});t.on("touchend",function(){n=false})}};_.prototype._checkHOverflow=function(){var t=this._oScrollCntr.getDomRef(),e;if(t){var r=this._getFirstItemOffset("offsetLeft");var i=Math.ceil(t.scrollLeft);var o=false;var n=false;var a=t.scrollWidth;var l=t.offsetWidth;if(Math.abs(a-l)===1){a=l}if(this._bRtl){var h=u(t).scrollLeftRTL();if(h>(s.browser.msie||s.browser.edge?1:0)){n=true}}else if(i>r){o=true}if(a-5>l){if(this._bRtl){if(u(t).scrollRightRTL()>1){o=true}}else if(i+l<a){n=true}}e=this.$("prev-button-container");n=this._checkForOverflowItem(n);var c=e.is(":visible");if(c&&!o){e.hide();this.$().removeClass("sapMHrdrLeftPadding")}if(!c&&o){e.show();this.$().addClass("sapMHrdrLeftPadding")}e=this.$("next-button-container");var g=e.is(":visible");if(g&&!n){e.hide();this.$().removeClass("sapMHrdrRightPadding")}if(!g&&n){e.show();this.$().addClass("sapMHrdrRightPadding")}}};_.prototype._getSize=function(t){var e=this._oScrollCntr.$(),r=this.getOrientation()===f.Horizontal,i=this.$("next-button-container"),o=!i.is(":visible")&&t,s=r?"width":"height";return e[s]()-(o?i[s]():0)};_.prototype._checkForOverflowItem=function(t){if(this._oScrollCntr&&!this.getShowOverflowItem()){var e=this._oScrollCntr.$(),r=this.getOrientation()===f.Horizontal,i=!r?e[0].scrollTop:this._bRtl?e.scrollRightRTL():e[0].scrollLeft,o=r?"width":"height",s=this._getSize(t),n=this._filterVisibleItems();this._collectItemSize();this._aItemEnd.forEach(function(e,r){var a=n[r].$(),l=a.parent(),h=a.is(":visible");if(t&&e>i+s){if(r===0||this._aItemEnd[r-1]<=i){l.css(o,"auto");a.show()}else if(h){l[o](l[o]());a.hide();t=true}}else{if(!h){l.css(o,"auto");a.show()}}},this)}return t};_.prototype._handleBorderReached=function(t){if(s.browser.msie&&this.bScrollInProcess){return}var e=t.getParameter("index");if(e===0){this._scroll(this._getScrollValue(false),this.getScrollTime())}else if(e===this._filterVisibleItems().length-1){this._scroll(this._getScrollValue(true),this.getScrollTime())}};_.prototype._handleAfterFocus=function(t){var e=t.getParameter("event");if((s.browser.msie||s.browser.edge)&&e.type==="mousedown"&&e.srcControl instanceof sap.m.Input){e.srcControl.focus()}if(s.browser.msie&&this.bScrollInProcess){return}var r=t.getParameter("index");if(r===0){this._scroll(this._getScrollValue(false),this.getScrollTime())}else if(r===this._filterVisibleItems().length-1){this._scroll(this._getScrollValue(true),this.getScrollTime())}};_.prototype._handleFocusAgain=function(t){var e=t.getParameter("event");if((s.browser.msie||s.browser.edge)&&e.type==="mousedown"&&e.srcControl instanceof sap.m.Input){e.srcControl.focus()}t.getParameter("event").preventDefault()};_.prototype._handleBeforeFocus=function(t){var e=t.getParameter("event");if(u(e.target).hasClass("sapMHdrCntrItemCntr")||u(e.target).hasClass("sapMScrollContScroll")||p.events.sapprevious.fnCheck(e)||p.events.sapnext.fnCheck(e)){this.$().find(".sapMHdrCntrItemCntr").css("border-color","")}else{this.$().find(".sapMHdrCntrItemCntr").css("border-color","transparent")}};_.prototype._unWrapHeaderContainerItemContainer=function(t){if(t instanceof v){t=t.getItem()}else if(Array.isArray(t)){for(var e=0;e<t.length;e++){if(t[e]instanceof v){t[e]=t[e].getItem()}}}return t};_._AGGREGATION_FUNCTIONS=["validateAggregation","getAggregation","setAggregation","indexOfAggregation","removeAggregation"];_._AGGREGATION_FUNCTIONS_FOR_INSERT=["insertAggregation","addAggregation"];_.prototype._callSuperMethod=function(t,e){var r=Array.prototype.slice.call(arguments);if(e==="content"){var i=r[2];r[1]="content";if(i instanceof o){if(_._AGGREGATION_FUNCTIONS.indexOf(t)>-1&&i.getParent()instanceof v){r[2]=i.getParent()}else if(_._AGGREGATION_FUNCTIONS_FOR_INSERT.indexOf(t)>-1){r[2]=new v({item:i})}}var s=[];this._oScrollCntr.getContent().forEach(function(t,e){if(!t.getItem()){s.push(e)}});for(var n=0;n<s.length;n++){this._oScrollCntr.removeContent(s[n])}var a=this._oScrollCntr[t].apply(this._oScrollCntr,r.slice(1));if(t!=="removeAllAggregation"){var l=this._oScrollCntr.getContent();var h=this.getAriaLabelledBy();var c=1;var g=l.filter(function(t){return t.getItem().getVisible()}).length;for(var n=0;n<l.length;n++){var d=l[n];if(d.getItem().getVisible()){d.setVisible(true);d.setPosition(c);d.setSetSize(g);d.setAriaLabelledBy(h[n]);c++}else{d.setVisible(false)}}}return this._unWrapHeaderContainerItemContainer(a)}else{return o.prototype[t].apply(this,r.slice(1))}};_.prototype._callMethodInManagedObject=function(){throw new TypeError("Method no longer exists: HeaderContainer.prototype._callMethodInManagedObject")};_.prototype._getParentCell=function(t){return u(t).parents(".sapMHrdrCntrInner").andSelf(".sapMHrdrCntrInner").get(0)};_.prototype.onfocusin=function(t){if(this._bIgnoreFocusIn){this._bIgnoreFocusIn=false;return}if(t.target.id===this.getId()+"-after"){this._restoreLastFocused()}};_.prototype._restoreLastFocused=function(){if(!this._oItemNavigation){return}var t=this._oItemNavigation.getItemDomRefs();var e=this._oItemNavigation.getFocusedIndex();var r=u(t[e]);var i=r.control(0)||{};var o=i.getTabbables?i.getTabbables():r.find(":sapTabbable");o.eq(-1).add(r).eq(-1).trigger("focus")};return _});