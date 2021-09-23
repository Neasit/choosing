/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/unified/calendar/CalendarDate","sap/ui/core/date/UniversalDate","sap/ui/core/InvisibleText"],function(e,t,a){"use strict";var i={apiVersion:2};i.render=function(e,t){var a=t.getTooltip_AsString();e.openStart("div",t);e.class("sapUiCalYearPicker");if(a){e.attr("title",a)}e.accessibilityState(t,this.getAccessibilityState(t));e.openEnd();this.renderCells(e,t);e.close("div")};i.getAccessibilityState=function(e){return{role:"grid",readonly:"true",multiselectable:e.getIntervalSelection(),roledescription:sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified").getText("YEAR_PICKER"),describedby:e._bCalendar?a.getStaticId("sap.ui.unified","CALENDAR_YEAR_RANGE_PICKER_OPEN_HINT"):""}};i.renderCells=function(a,i){var r=i.getProperty("_middleDate")?i.getProperty("_middleDate"):i._getDate(),l=new e(r,i.getPrimaryCalendarType()),s=i.getYears(),n=i.getId(),d=i.getColumns(),o="",c=false,u=false,p,f,g,y,S,C;l.setYear(l.getYear()-Math.floor(s/2));p=i._checkFirstDate(l);if(!p.isSame(l)){l=p;u=true}if(d>0){o=100/d+"%"}else{o=100/s+"%"}for(C=0;C<s;C++){S=i._oFormatYyyymmdd.format(l.toUTCJSDate(),true);y={role:"gridcell"};c=true;if(u){c=i._checkDateEnabled(l)}if(d>0&&C%d==0){a.openStart("div");a.accessibilityState(null,{role:"row"});a.openEnd()}a.openStart("div",n+"-y"+S);a.class("sapUiCalItem");f=i._fnShouldApplySelection(l);g=i._fnShouldApplySelectionBetween(l);if(f){a.class("sapUiCalItemSel");y["selected"]=true}if(g){a.class("sapUiCalItemSelBetween");y["selected"]=true}if(!f&&!g){y["selected"]=false}if(!c){a.class("sapUiCalItemDsbl");y["disabled"]=true}a.attr("tabindex","-1");a.attr("data-sap-year-start",S);a.style("width",o);a.accessibilityState(null,y);a.openEnd();a.text(i._oYearFormat.format(t.getInstance(l.toUTCJSDate(),l.getCalendarType())));a.close("div");l.setYear(l.getYear()+1);if(d>0&&(C+1)%d==0){a.close("div")}}};return i},true);