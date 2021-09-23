/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./GridContainerRenderer","./GridContainerSettings","./GridContainerUtils","./GridNavigationMatrix","./delegate/GridContainerItemNavigation","./library","./dnd/GridKeyboardDragAndDrop","sap/base/strings/capitalize","sap/ui/base/ManagedObjectObserver","sap/ui/core/Control","sap/ui/core/Core","sap/ui/core/ResizeHandler","sap/ui/Device","sap/ui/events/KeyCodes","sap/ui/layout/cssgrid/VirtualGrid","sap/ui/thirdparty/jquery"],function(t,e,i,r,o,n,s,a,l,p,h,u,g,d,f,c){"use strict";var m=h.getConfiguration().getRTL();var y={"sap.f.Card":function(t){return t.getCardHeader()||t.getCardContent()},"sap.ui.integration.widgets.Card":function(t){return t.getCardHeader()||t.getCardContent()},"sap.m.GenericTile":function(){return true}};function _(t){var e=t.getLayoutData();return e?e.getColumns():1}function I(t){var e=t.getLayoutData();return e?e.getActualRows():1}function v(t){var e=t.getLayoutData();return e?e.hasAutoHeight():true}var C=p.extend("sap.f.GridContainer",{metadata:{library:"sap.f",interfaces:["sap.f.dnd.IGridDroppable"],properties:{width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:""},minHeight:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"2rem"},containerQuery:{type:"boolean",group:"Behavior",defaultValue:false},snapToRow:{type:"boolean",group:"Appearance",defaultValue:false},allowDenseFill:{type:"boolean",group:"Appearance",defaultValue:false},inlineBlockLayout:{type:"boolean",group:"Appearance",defaultValue:false}},defaultAggregation:"items",aggregations:{items:{type:"sap.ui.core.Control",multiple:true,singularName:"item",dnd:true},layout:{type:"sap.f.GridContainerSettings",multiple:false},layoutXS:{type:"sap.f.GridContainerSettings",multiple:false},layoutS:{type:"sap.f.GridContainerSettings",multiple:false},layoutM:{type:"sap.f.GridContainerSettings",multiple:false},layoutL:{type:"sap.f.GridContainerSettings",multiple:false},layoutXL:{type:"sap.f.GridContainerSettings",multiple:false},_defaultLayout:{type:"sap.f.GridContainerSettings",multiple:false,visibility:"hidden"}},events:{layoutChange:{parameters:{layout:{type:"string"}}},borderReached:{parameters:{event:{type:"jQuery.Event"},direction:{type:"sap.f.NavigationDirection"},row:{type:"int"},column:{type:"int"}}}},dnd:{draggable:false,droppable:true}}});C.prototype.bUseExtendedChangeDetection=true;C.prototype.getActiveLayoutSettings=function(){var t=this.getAggregation(this._sActiveLayout);if(!t&&this._sActiveLayout==="layoutXS"){t=this.getAggregation("layoutS")}if(!t){t=this.getAggregation("layout")||this.getAggregation("_defaultLayout")}return t};C.prototype._onBeforeItemRendering=function(){var t=this.getParent();if(t._reflectItemVisibilityToWrapper(this)&&!i.isGridSupportedByBrowser()){t._scheduleIEPolyfill()}};C.prototype._onAfterItemRendering=function(){var t=this.getParent();t._checkOwnVisualFocus(this);if(!t._resizeListeners[this.getId()]){t._resizeListeners[this.getId()]=u.register(this,t._resizeItemHandler)}t._setItemNavigationItems();if(!i.isGridSupportedByBrowser()){t._scheduleIEPolyfill();return}t._applyItemAutoRows(this)};C.prototype._reflectItemVisibilityToWrapper=function(t){var e=i.getItemWrapper(t),r;if(!e){return false}r=c(e);if(t.getVisible()&&r.hasClass("sapFGridContainerInvisiblePlaceholder")){r.removeClass("sapFGridContainerInvisiblePlaceholder")}else if(!t.getVisible()&&!r.hasClass("sapFGridContainerInvisiblePlaceholder")){r.addClass("sapFGridContainerInvisiblePlaceholder");return true}return false};C.prototype._onItemChange=function(t){if(t.name!=="items"||!t.child){return}if(t.mutation==="insert"){t.child.addEventDelegate(this._itemDelegate,t.child)}else if(t.mutation==="remove"){t.child.removeEventDelegate(this._itemDelegate,t.child)}};C.prototype._deregisterResizeListeners=function(){var t,e;for(t in this._resizeListeners){e=this._resizeListeners[t];u.deregister(e)}delete this._resizeListeners;g.resize.detachHandler(this._resizeDeviceHandler)};C.prototype._setItemNavigationItems=function(){if(!this._isRenderingFinished){return}var t=this,e=[];if(!t._oItemNavigation){t._oItemNavigation=(new o).setCycling(false).setDisabledModifiers({sapnext:["alt","meta","ctrl"],sapprevious:["alt","meta","ctrl"]}).setFocusedIndex(0);t.addDelegate(this._oItemNavigation)}t.$().children().map(function(t,i){if(i.getAttribute("class").indexOf("sapFGridContainerItemWrapper")>-1){e.push(i)}});t._oItemNavigation.setRootDomRef(t.getDomRef());t._oItemNavigation.setItemDomRefs(e)};C.prototype._detectActiveLayout=function(){var t=this.getContainerQuery()&&this.getDomRef()?this._getComputedWidth():g.resize.width,e=g.media.getCurrentRange("GridContainerRangeSet",t),i="layout"+e.name,r=this.getActiveLayoutSettings(),o=false;if(!t){return false}if(this._sActiveLayout!==i){this.addStyleClass("sapFGridContainer"+a(i));if(this._sActiveLayout){this.removeStyleClass("sapFGridContainer"+a(this._sActiveLayout))}this._sActiveLayout=i;o=r!==this.getActiveLayoutSettings();this.fireLayoutChange({layout:this._sActiveLayout})}return o};C.prototype._getActiveGridStyles=function(){var t=this.getActiveLayoutSettings(),e=t.getColumns()||"auto-fill",i=t.getColumnSize(),r=t.getMinColumnSize(),o=t.getMaxColumnSize(),n={"grid-gap":t.getGap()};if(r&&o){n["grid-template-columns"]="repeat("+e+", minmax("+r+", "+o+"))"}else{n["grid-template-columns"]="repeat("+e+", "+i+")"}if(this.getInlineBlockLayout()){n["grid-auto-rows"]="min-content"}else{n["grid-auto-rows"]=t.getRowSize()}return n};C.prototype.init=function(){this._oRb=h.getLibraryResourceBundle("sap.f");this.setAggregation("_defaultLayout",new e);this._initRangeSet();this._resizeListeners={};this._oItemNavigation=null;this._itemDelegate={onBeforeRendering:this._onBeforeItemRendering,onAfterRendering:this._onAfterItemRendering};this._itemsObserver=new l(this._onItemChange.bind(this));this._itemsObserver.observe(this,{aggregations:["items"]});this._resizeHandler=this._resize.bind(this);this._resizeDeviceHandler=this._resizeDevice.bind(this);g.resize.attachHandler(this._resizeDeviceHandler);this._resizeItemHandler=this._resizeItem.bind(this);if(!i.isGridSupportedByBrowser()){this._attachDndPolyfill()}};C.prototype.insertItem=function(t,e){this.insertAggregation("items",t,e,true);if(!this.getDomRef()||!i.isGridSupportedByBrowser()||!t.getVisible()){this.invalidate();return this}var r=h.createRenderManager(),o=this._createItemWrapper(t),n=this._getItemAt(e+1),s=this.getDomRef();if(n){s.insertBefore(o,i.getItemWrapper(n))}else{s.insertBefore(o,s.lastChild)}r.render(t,o);r.destroy();return this};C.prototype.removeItem=function(t){var e=this.removeAggregation("items",t,true),r=this.getDomRef(),o=e.getDomRef();if(!r||!o||!i.isGridSupportedByBrowser()){this.invalidate();return e}r.removeChild(o.parentElement);return e};C.prototype.onBeforeRendering=function(){this._detectActiveLayout();var t=this._resizeListeners[this.getId()];if(t){u.deregister(t)}this._isRenderingFinished=false};C.prototype.onAfterRendering=function(){this._resizeListeners[this.getId()]=u.register(this.getDomRef(),this._resizeHandler);this._isRenderingFinished=true;this._setItemNavigationItems();this._applyLayout(true);if(this.getItems().length===1&&this._forceFocus){this.focusItem(0);this._forceFocus=false}};C.prototype.exit=function(){this._deregisterResizeListeners();if(this._itemsObserver){this._itemsObserver.disconnect();delete this._itemsObserver}if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation;this._oItemNavigation=null}if(!i.isGridSupportedByBrowser()){this._detachDndPolyfill()}this._forceFocus=null};C.prototype._initRangeSet=function(){if(!g.media.hasRangeSet("GridContainerRangeSet")){g.media.initRangeSet("GridContainerRangeSet",[375,600,1024,1440],"px",["XS","S","M","L","XL"])}};C.prototype._resize=function(){if(!this._isWidthChanged()){return}var t=this._detectActiveLayout();this._applyLayout(t)};C.prototype._resizeDevice=function(){if(!this.getContainerQuery()){this._resize()}};C.prototype._isWidthChanged=function(){var t=this._getComputedWidth(),e=g.resize.width;if(this._lastGridWidth===t&&this._lastViewportWidth===e){return false}this._lastGridWidth=t;this._lastViewportWidth=e;return true};C.prototype._getComputedWidth=function(){if(!this.getDomRef()){return null}return this.getDomRef().getBoundingClientRect().width};C.prototype._resizeItem=function(t){if(!i.isGridSupportedByBrowser()){if(!this._bDraggingInAnotherContainer){this._scheduleIEPolyfill()}this._bDraggingInAnotherContainer=false;return}this._applyItemAutoRows(t.control)};C.prototype._applyLayout=function(t){if(!this._isRenderingFinished){return}if(!i.isGridSupportedByBrowser()){this._scheduleIEPolyfill(t);return}if(t){this.$().css(this._getActiveGridStyles());this.getItems().forEach(this._applyItemAutoRows.bind(this))}this._enforceMaxColumns()};C.prototype._applyItemAutoRows=function(t){if(!this._isRenderingFinished){return}if(this.getInlineBlockLayout()){return}if(v(t)){var e=t.$(),i=this.getActiveLayoutSettings(),r=t.getDomRef()?t.getDomRef().getBoundingClientRect().height:0,o=i.calculateRowsForItem(Math.round(r));if(!o){return}e.parent().css({"grid-row":"span "+Math.max(o,I(t))})}};C.prototype._enforceMaxColumns=function(){var t=this.getActiveLayoutSettings(),e=t.getComputedColumnsCount(this.$().innerWidth());if(!e){return}this.getItems().forEach(function(t){t.$().parent().css("grid-column","span "+Math.min(_(t),e))})};C.prototype._getItemAt=function(t){var e=this.getItems(),i;if(t<0){t=0}if(e.length&&e[t]){i=e[t]}return i};C.prototype._createItemWrapper=function(e){var i=t.getStylesForItemWrapper(e,this),r=i.styles,o=i.classes,n=document.createElement("div");n.setAttribute("tabindex","0");r.forEach(function(t,e){n.style.setProperty(e,t)});o.forEach(function(t){n.classList.add(t)});return n};C.prototype._scheduleIEPolyfill=function(t){if(this._iPolyfillCallId){clearTimeout(this._iPolyfillCallId)}if(t){this._applyIEPolyfillLayout();return}this._iPolyfillCallId=setTimeout(this._applyIEPolyfillLayout.bind(this),0)};C.prototype._applyIEPolyfillLayout=function(){if(!this._isRenderingFinished){return}if(this.bIsDestroyed){return}var t=this.$(),e=t.innerWidth(),i=this.getActiveLayoutSettings(),r=i.getMinColumnSizeInPx()||i.getColumnSizeInPx(),o=i.getRowSizeInPx(),n=i.getGapInPx(),s=i.getComputedColumnsCount(e),a=parseInt(t.css("padding-top").replace("px","")),l=parseInt(t.css("padding-left").replace("px","")),p=this.getItems();if(!r||!o){return}if(!p.length){return}var h=new f;this._oVirtualGrid=h;h.init({numberOfCols:Math.max(1,s),cellWidth:r,cellHeight:o,unitOfMeasure:"px",gapSize:n,topOffset:a?a:0,leftOffset:l?l:0,allowDenseFill:this.getAllowDenseFill(),rtl:m,width:e});var u,g,d,c,y,C,D=[];var R=function(t){h.fitElement(t+"",this._polyfillDropIndicator.columns||i.calculateColumnsForItem(Math.round(this._polyfillDropIndicator.width)),this._polyfillDropIndicator.rows||i.calculateRowsForItem(Math.round(this._polyfillDropIndicator.height)));D.push({id:t+"",domRef:this._polyfillDropIndicator.domRef})}.bind(this);for(u=0,g=0;u<p.length;u++){if(this._polyfillDropIndicator&&this._polyfillDropIndicator.insertAt===u){R(g);g++}d=p[u];c=d.$();if(!c.is(":visible")){continue}y=_(d);if(v(d)){C=this._calcAutoRowsForPolyfill(d,i)}else{C=I(d)}h.fitElement(g+"",y,C);D.push({id:g+"",domRef:c.parent()});g++}if(this._polyfillDropIndicator&&this._polyfillDropIndicator.insertAt>=p.length){R(p.length)}h.calculatePositions();D.forEach(function(t){var e=h.getItems()[t.id];t.domRef.css({position:"absolute",top:e.top,left:e.left,width:e.width,height:e.height})});t.css("height",h.getHeight()+"px");if(!this.getWidth()&&i.getColumns()){if(!this.getContainerQuery()){t.css("width",h.getWidth()+"px")}}};C.prototype._calcAutoRowsForPolyfill=function(t,e){var i=t.$(),r,o;if(i.hasClass("sapUiIntCardAnalytical")){r=i[0].scrollHeight}else{r=i.outerHeight()}o=Math.max(e.calculateRowsForItem(r),I(t));return o};C.prototype._polyfillAfterDragOver=function(t){var e=t.getParameter("indicator");this._polyfillDropIndicator={rows:t.getParameter("rows"),columns:t.getParameter("columns"),width:t.getParameter("width"),height:t.getParameter("height"),domRef:e,insertAt:t.getParameter("indicatorIndex")};this._scheduleIEPolyfill()};C.prototype._polyfillAfterDragEnd=function(t){this._polyfillDropIndicator=null};C.prototype._polyfillDraggingInAnotherContainer=function(){this._bDraggingInAnotherContainer=true};C.prototype._attachDndPolyfill=function(){this.attachEvent("_gridPolyfillAfterDragOver",this._polyfillAfterDragOver,this);this.attachEvent("_gridPolyfillAfterDragEnd",this._polyfillAfterDragEnd,this);this.attachEvent("_gridPolyfillDraggingInAnotherContainer",this._polyfillDraggingInAnotherContainer,this)};C.prototype._detachDndPolyfill=function(){this.detachEvent("_gridPolyfillAfterDragOver",this._polyfillAfterDragOver,this);this.detachEvent("_gridPolyfillAfterDragEnd",this._polyfillAfterDragEnd,this);this.detachEvent("_gridPolyfillDraggingInAnotherContainer",this._polyfillDraggingInAnotherContainer,this)};C.prototype.onItemNavigationBorderReached=function(t){this.fireEvent("borderReached",t)};["onkeypress","onkeyup","onkeydown","onsapenter","onsapselect","onsapspace"].forEach(function(t){C.prototype[t]=function(e){if(!this._isItemWrapper(e.target)){return}if(t==="onsapspace"){e.preventDefault()}var i=c(e.target.firstChild).control()[0];if(i){var r=i.getFocusDomRef(),o=c(r).control()[0];if(o&&o[t]){o[t].call(o,e)}}}});C.prototype._checkOwnVisualFocus=function(t){var e=t.getMetadata().getName(),r;if(y[e]&&y[e](t)){r=t.getFocusDomRef();r.setAttribute("tabindex",-1);r.tabIndex=-1;i.getItemWrapper(t).classList.add("sapFGridContainerItemWrapperNoVisualFocus")}};C.prototype._moveItem=function(t){if(!this._isItemWrapper(t.target)){return}var e=c(t.target.firstElementChild).control(0),r=this.getItems().length,o=this.indexOfItem(e),n=-1,a,l=[];switch(t.keyCode){case d.ARROW_RIGHT:n=h.getConfiguration().getRTL()?o-1:o+1;if(n>=0&&n<r){a=i.createConfig(this,this.getItems()[n]);a.dropPosition="After";l=[a]}break;case d.ARROW_LEFT:n=h.getConfiguration().getRTL()?o+1:o-1;if(n>=0&&n<r){a=i.createConfig(this,this.getItems()[n]);a.dropPosition="Before";l=[a]}break;case d.ARROW_UP:l=i.findDropTargetsAbove(this,e);l.forEach(function(t){t.dropPosition="Before"});break;case d.ARROW_DOWN:l=i.findDropTargetsBelow(this,e);l.forEach(function(t){t.dropPosition=this.indexOfItem(t.item)!==-1?"After":"Before"}.bind(this));break;default:break}t.stopPropagation();s.fireDnD(e,l,t);this._setItemNavigationItems()};C.prototype.onsapincreasemodifiers=C.prototype._moveItem;C.prototype.onsapdecreasemodifiers=C.prototype._moveItem;C.prototype.focusItem=function(t){var e,i=this._oItemNavigation;this._forceFocus=true;this._setItemNavigationItems();e=i.getItemDomRefs();if(e[t]){i.setFocusedIndex(t);e[t].focus()}};C.prototype.focusItemByDirection=function(t,e,i){this._oItemNavigation.focusItemByDirection(this,t,e,i)};C.prototype.getNavigationMatrix=function(){if(!h.isThemeApplied()){return null}var t,e,o=this.getActiveLayoutSettings();if(i.isGridSupportedByBrowser()){var n=window.getComputedStyle(this.getDomRef());t=n.gridTemplateRows.split(/\s+/);e=n.gridTemplateColumns.split(/\s+/)}else{var s=this._oVirtualGrid.getMatrix().length;var a=this._oVirtualGrid.getMatrix()[0].length;t=new Array(s).fill(o.getRowSizeInPx()+"px");e=new Array(a).fill(o.getColumnSizeInPx()+"px")}var l=this.getItems().reduce(function(t,e){if(e.getVisible()){t.push(i.getItemWrapper(e))}return t},[]);return r.create(this.getDomRef(),l,{gap:o.getGapInPx(),rows:t,columns:e})};C.prototype._isItemWrapper=function(t){return t.classList.contains("sapFGridContainerItemWrapper")};return C});