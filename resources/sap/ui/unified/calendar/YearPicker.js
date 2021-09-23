/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/Device","sap/ui/core/delegate/ItemNavigation","sap/ui/unified/calendar/CalendarUtils","sap/ui/unified/calendar/CalendarDate","sap/ui/core/date/UniversalDate","sap/ui/unified/DateRange","sap/ui/unified/library","sap/ui/core/format/DateFormat","sap/ui/core/library","./YearPickerRenderer","sap/ui/events/KeyCodes","sap/ui/thirdparty/jquery"],function(e,t,a,i,r,s,o,n,l,h,d,p,g){"use strict";var m=h.CalendarType;var y=e.extend("sap.ui.unified.calendar.YearPicker",{metadata:{library:"sap.ui.unified",properties:{year:{type:"int",group:"Data",defaultValue:2e3,deprecated:true},years:{type:"int",group:"Appearance",defaultValue:20},intervalSelection:{type:"boolean",group:"Behavior",defaultValue:false},columns:{type:"int",group:"Appearance",defaultValue:4},date:{type:"object",group:"Data"},primaryCalendarType:{type:"sap.ui.core.CalendarType",group:"Appearance"},_middleDate:{type:"object",group:"Data",visibility:"hidden"}},aggregations:{selectedDates:{type:"sap.ui.unified.DateRange",multiple:true,singularName:"selectedDate"}},events:{select:{},pageChange:{}}}});y.prototype.init=function(){var e=sap.ui.getCore().getConfiguration().getCalendarType();this.setProperty("primaryCalendarType",e);this._oYearFormat=l.getDateInstance({format:"y",calendarType:e});this._oFormatYyyymmdd=l.getInstance({pattern:"yyyyMMdd",calendarType:m.Gregorian});this._oMinDate=i._minDate(this.getPrimaryCalendarType());this._oMaxDate=i._maxDate(this.getPrimaryCalendarType())};y.prototype.onAfterRendering=function(){c.call(this);this.focus()};y.prototype.exit=function(){if(this._aMPSelectedDates&&this._aMPSelectedDates.length){this._aMPSelectedDates.forEach(function(e){e.destroy()});this._aMPSelectedDates=undefined}};y.prototype.getFocusDomRef=function(){return this.getDomRef()&&this._oItemNavigation.getItemDomRefs()[this._iSelectedIndex]};y.prototype.setYear=function(e){this.setProperty("year",e);e=this.getProperty("year");var t=new r(e,0,1,this.getPrimaryCalendarType()),a=this._getSelectedDates()[0],i=this.getAggregation("selectedDates");if(!a||this.getIntervalSelection()){return this}if(!this._oSelectedDatesControlOrigin){if(!i||!i.length){this.addAggregation("selectedDates",a)}!this.getIntervalSelection()&&a.setStartDate(t.toLocalJSDate())}this.setDate(t.toLocalJSDate());return this};y.prototype.setDate=function(e){var t,a,s,o;e&&i._checkJSDateObject(e);a=e.getFullYear();i._checkYearInValidRange(a);t=r.fromLocalJSDate(e,this.getPrimaryCalendarType());t.setMonth(0,1);this.setProperty("date",e);this.setProperty("year",t.getYear());this._oDate=t;s=this.getYears();o=Math.floor(s/2);this._iSelectedIndex=o;this.setProperty("_middleDate",t);return this};y.prototype._getDate=function(){if(!this._oDate){var e=this.getYear();this._oDate=new r(e,0,1,this.getPrimaryCalendarType())}return this._oDate};y.prototype._setSelectedDatesControlOrigin=function(e){this._oSelectedDatesControlOrigin=e};y.prototype.getSelectedDates=function(){if(this._oSelectedDatesControlOrigin){return this._oSelectedDatesControlOrigin.getSelectedDates()}return this.getAggregation("selectedDates")};y.prototype._getSelectedDates=function(){var e=this.getSelectedDates();if(e){return e}else if(!this._aMPSelectedDates||!this._aMPSelectedDates.length){this._aMPSelectedDates=[new o];this._aMPSelectedDates[0].setStartDate(this._getDate().toLocalJSDate());return this._aMPSelectedDates}else{return this._aMPSelectedDates}};y.prototype.setPrimaryCalendarType=function(e){this.setProperty("primaryCalendarType",e);this._oYearFormat=l.getDateInstance({format:"y",calendarType:e});if(this._oDate){this._oDate=new r(this._oDate,e);this._oDate.setMonth(0,1)}this._oMinDate=new r(this._oMinDate,e);this._oMaxDate=new r(this._oMaxDate,e);return this};y.prototype.nextPage=function(){this._updatePage(true,this._oItemNavigation.getFocusedIndex());return this};y.prototype.previousPage=function(){this._updatePage(false,this._oItemNavigation.getFocusedIndex());return this};y.prototype.onsapspace=function(e){e.preventDefault()};y.prototype.onsapselect=function(e){var t=this._oItemNavigation.getFocusedIndex();var a=this._selectYear(t);if(a){this.fireSelect()}};y.prototype.onmouseover=function(e){var t=e.target,a=this._getSelectedDates()[0],i,s,o;if(!a){return}if(a.getStartDate()){i=r.fromLocalJSDate(a.getStartDate(),this.getPrimaryCalendarType());i.setMonth(0,1)}if(t.classList.contains("sapUiCalItem")){o=t.getAttribute("data-sap-year-start");s=r.fromLocalJSDate(this._oFormatYyyymmdd.parse(o),this.getPrimaryCalendarType());if(this._isSelectionInProgress()){this._markInterval(i,s)}}};y.prototype.onmousedown=function(e){this._oMousedownPosition={clientX:e.clientX,clientY:e.clientY}};y.prototype.onmouseup=function(e){var a=e.target,i=this._getSelectedDates()[0],s,o,n,l,h=this._oItemNavigation.getItemDomRefs();if(this._bMousedownChange){this._bMousedownChange=false;if(this.getIntervalSelection()&&a.classList.contains("sapUiCalItem")&&i){o=a.getAttribute("data-sap-year-start");l=r.fromLocalJSDate(this._oFormatYyyymmdd.parse(o),this.getPrimaryCalendarType());n=r.fromLocalJSDate(i.getStartDate(),this.getPrimaryCalendarType());n.setMonth(0,1);if(!l.isSame(n)&&!i.getEndDate()){s=h.index(a);this._selectYear.call(this,s);this._oItemNavigation.focusItem(s)}}this.fireSelect()}else if(t.support.touch&&this._isValueInThreshold(this._oMousedownPosition.clientX,e.clientX,10)&&this._isValueInThreshold(this._oMousedownPosition.clientY,e.clientY,10)){s=this._oItemNavigation.getFocusedIndex();if(!h[s].classList.contains("sapUiCalItemDsbl")){this._selectYear(s);this.fireSelect()}}};y.prototype._markInterval=function(e,t){var a=this._oItemNavigation.getItemDomRefs(),s,o,n;if(e.isAfter(t)){t=[e,e=t][0]}for(n=0;n<a.length;++n){o=a[n].getAttribute("data-sap-year-start");s=r.fromLocalJSDate(this._oFormatYyyymmdd.parse(o),this.getPrimaryCalendarType());if(this._bMousedownChange){if(s.isSame(e)||s.isSame(t)){g(a[n]).addClass("sapUiCalItemSel")}else{g(a[n]).removeClass("sapUiCalItemSel")}}if(i._isBetween(s,e,t)){g(a[n]).addClass("sapUiCalItemSelBetween")}else{g(a[n]).removeClass("sapUiCalItemSelBetween")}}};y.prototype.getFirstRenderedDate=function(){var e;if(this.getDomRef()){var t=this._oItemNavigation.getItemDomRefs();e=this._oFormatYyyymmdd.parse(g(t[0]).attr("data-sap-year-start"))}return e};y.prototype._isValueInThreshold=function(e,t,a){var i=e-a,r=e+a;return t>=i&&t<=r};y.prototype._checkFirstDate=function(e){var t=this.getYears(),a=new r(this._oMaxDate,this.getPrimaryCalendarType());if(!a.isSame(i._maxDate(this.getPrimaryCalendarType()))){return e}a.setYear(a.getYear()-t+1);if(e.isAfter(a)&&e.getYear()!=a.getYear()){e=new r(a,this.getPrimaryCalendarType());e.setMonth(0,1)}else if(e.isBefore(this._oMinDate)&&e.getYear()!=this._oMinDate.getYear()){e=new r(this._oMinDate,this.getPrimaryCalendarType());e.setMonth(0,1)}return e};y.prototype._checkDateEnabled=function(e){var t=true;if(e.isAfter(this._oMaxDate)&&e.getYear()!=this._oMaxDate.getYear()||e.isBefore(this._oMinDate)&&e.getYear()!=this._oMinDate.getYear()){t=false}return t};y.prototype._updatePage=function(e,t,a){var i=this._oItemNavigation.getItemDomRefs();var s=r.fromLocalJSDate(this._oFormatYyyymmdd.parse(g(i[0]).attr("data-sap-year-start")),this.getPrimaryCalendarType());var o=this.getYears();if(e){var n=new r(this._oMaxDate,this.getPrimaryCalendarType());n.setYear(n.getYear()-o+1);if(s.isBefore(n)){s.setYear(s.getYear()+o);if(s.isAfter(n)){t=t+(s.getYear()-n.getYear());if(t>o-1){t=o-1}s=new r(this._oMaxDate,this.getPrimaryCalendarType());this._oDate.setMonth(0,1)}}else{return}}else{if(s.isAfter(this._oMinDate)){s.setYear(s.getYear()-o);if(s.isBefore(this._oMinDate)){t=t-(this._oMinDate.getYear()-s.getYear());if(t<0){t=0}s=new r(this._oMinDate,this.getPrimaryCalendarType())}}else{return}}s.setYear(s.getYear()+Math.floor(o/2));this._iSelectedIndex=t;this.setProperty("_middleDate",s);if(a){this.firePageChange()}};y.prototype._selectYear=function(e){var t=this._oItemNavigation.getItemDomRefs(),a=g(t[e]),i=a.attr("data-sap-year-start"),s=r.fromLocalJSDate(this._oFormatYyyymmdd.parse(i),this.getPrimaryCalendarType()),o=this._getSelectedDates()[0],n=this.getAggregation("selectedDates"),l;if(a.hasClass("sapUiCalItemDsbl")){return false}if(!this._isSelectionInProgress()){var h=true}this.setProperty("year",s.getYear(),h);this.setProperty("date",s.toLocalJSDate(),h);if(!o){return true}if(!this._oSelectedDatesControlOrigin){if(!n||!n.length){this.addAggregation("selectedDates",o)}!this.getIntervalSelection()&&o.setStartDate(s.toLocalJSDate(),h)}if(this.getIntervalSelection()){if(!o.getStartDate()){o.setStartDate(s.toLocalJSDate(),h)}else if(!o.getEndDate()){l=r.fromLocalJSDate(o.getStartDate(),this.getPrimaryCalendarType());if(s.isBefore(l)){o.setEndDate(l.toLocalJSDate(),h);o.setStartDate(s.toLocalJSDate(),h)}else{o.setEndDate(s.toLocalJSDate(),h)}}else{o.setStartDate(s.toLocalJSDate(),h);o.setEndDate(undefined,h)}}if(h){for(var d=0;d<t.length;d++){a=g(t[d]);i=a.attr("data-sap-year-start");var p=r.fromLocalJSDate(this._oFormatYyyymmdd.parse(i),this.getPrimaryCalendarType());var m=this._fnShouldApplySelection(p);var y=this._fnShouldApplySelectionBetween(p);if(m){a.addClass("sapUiCalItemSel");a.removeClass("sapUiCalItemSelBetween");a.attr("aria-selected","true")}if(y){a.addClass("sapUiCalItemSelBetween");a.attr("aria-selected","true")}if(!m&&!y){a.removeClass("sapUiCalItemSel");a.removeClass("sapUiCalItemSelBetween");a.attr("aria-selected","false")}}}return true};y.prototype._isSelectionInProgress=function(){var e=this._getSelectedDates()[0];if(!e){return false}return this.getIntervalSelection()&&e.getStartDate()&&!e.getEndDate()};function c(){var e=this.getDate()?r.fromLocalJSDate(this.getDate(),this.getPrimaryCalendarType()):this._getDate(),t=this.getDomRef(),s=this.$().find(".sapUiCalItem"),o,n,l,h;for(h=0;h<s.length;++h){n=s[h].getAttribute("data-sap-year-start");l=r.fromLocalJSDate(this._oFormatYyyymmdd.parse(n),this.getPrimaryCalendarType());if(l.isSame(e)){o=h;break}}if(!this._oItemNavigation){this._oItemNavigation=new a;this._oItemNavigation.attachEvent(a.Events.AfterFocus,u,this);this._oItemNavigation.attachEvent(a.Events.FocusAgain,f,this);this._oItemNavigation.attachEvent(a.Events.BorderReached,D,this);this.addDelegate(this._oItemNavigation);this._oItemNavigation.setHomeEndColumnMode(true,true);this._oItemNavigation.setDisabledModifiers({sapnext:["alt","meta"],sapprevious:["alt","meta"],saphome:["alt","meta"],sapend:["meta"]})}this._oItemNavigation.setRootDomRef(t);this._oItemNavigation.setItemDomRefs(s);this._oItemNavigation.setCycling(false);this._oItemNavigation.setColumns(this.getColumns(),true);if(i._isBetween(e,this._oMinDate,this._oMaxDate,true)){this._oItemNavigation.setFocusedIndex(o)}this._oItemNavigation.setPageSize(s.length)}function u(e){var t=e.getParameter("index"),a=e.getParameter("event"),i=this._oItemNavigation.aItemDomRefs[t],s=this._getSelectedDates()[0],o,n,l;if(!a){return}if(a.type==="mousedown"){this._handleMousedown(a,t)}else if(a.type==="sapnext"||a.type==="sapprevious"){if(!s){return}if(s.getStartDate()){o=r.fromLocalJSDate(s.getStartDate(),this.getPrimaryCalendarType());o.setMonth(0,1)}l=i.getAttribute("data-sap-year-start");n=r.fromLocalJSDate(this._oFormatYyyymmdd.parse(l),this.getPrimaryCalendarType());if(this._isSelectionInProgress()){this._markInterval(o,n)}}}function f(e){u.call(this,e)}y.prototype._handleMousedown=function(e,a){if(e.button||t.support.touch&&!t.system.combi){return}var i=this._selectYear(a);if(i){this._bMousedownChange=true}e.preventDefault();e.setMark("cancelAutoClose")};function D(e){var t=e.getParameter("event"),a=this._oItemNavigation.getFocusedIndex(),i=this.getYears(),s=this.getColumns(),o=this._getSelectedDates()[0],n=this._oItemNavigation.getItemDomRefs(),l,h,d;if(o&&o.getStartDate()){l=r.fromLocalJSDate(o.getStartDate(),this.getPrimaryCalendarType());l.setMonth(0,1)}if(t.type){if(s===0){s=i}switch(t.type){case"sapnext":case"sapnextmodifiers":if(t.keyCode===p.ARROW_DOWN&&s<i){d=n[a-i+s].getAttribute("data-sap-year-start");h=r.fromLocalJSDate(this._oFormatYyyymmdd.parse(d),this.getPrimaryCalendarType());this._updatePage(true,a-i+s,true);this._iSelectedIndex=a-i+s}else{d=n[0].getAttribute("data-sap-year-start");h=r.fromLocalJSDate(this._oFormatYyyymmdd.parse(d),this.getPrimaryCalendarType());this._updatePage(true,0,true)}break;case"sapprevious":case"sappreviousmodifiers":if(t.keyCode===p.ARROW_UP&&s<i){d=n[i-s+a].getAttribute("data-sap-year-start");h=r.fromLocalJSDate(this._oFormatYyyymmdd.parse(d),this.getPrimaryCalendarType());this._updatePage(false,i-s+a,true);this._iSelectedIndex=i-s+a}else{d=n[i-1].getAttribute("data-sap-year-start");h=r.fromLocalJSDate(this._oFormatYyyymmdd.parse(d),this.getPrimaryCalendarType());this._updatePage(false,i-1,true)}break;case"sappagedown":d=n[a].getAttribute("data-sap-year-start");h=r.fromLocalJSDate(this._oFormatYyyymmdd.parse(d),this.getPrimaryCalendarType());this._updatePage(true,a,true);break;case"sappageup":d=n[a].getAttribute("data-sap-year-start");h=r.fromLocalJSDate(this._oFormatYyyymmdd.parse(d),this.getPrimaryCalendarType());this._updatePage(false,a,true);break;default:break}}this._isSelectionInProgress()&&this._markInterval(l,h)}y.prototype._fnShouldApplySelection=function(e){var t=this._getSelectedDates()[0],a,i;if(!t){return false}a=t.getStartDate();i=t.getEndDate();if(a){a=r.fromLocalJSDate(a,this.getPrimaryCalendarType());a.setMonth(0,1)}if(this.getIntervalSelection()&&a&&i){i=r.fromLocalJSDate(i,this.getPrimaryCalendarType());i.setMonth(0,1);if(e.isSame(a)||e.isSame(i)){return true}}else if(a&&e.isSame(a)){return true}return false};y.prototype._fnShouldApplySelectionBetween=function(e){var t=this._getSelectedDates()[0],a,s;if(!t){return false}a=t.getStartDate();s=t.getEndDate();if(this.getIntervalSelection()&&a&&s){a=r.fromLocalJSDate(a,this.getPrimaryCalendarType());a.setMonth(0,1);s=r.fromLocalJSDate(s,this.getPrimaryCalendarType());s.setMonth(0,1);if(i._isBetween(e,a,s)){return true}}return false};return y});