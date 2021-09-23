/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/support/Plugin","sap/ui/core/support/controls/TreeViewer","sap/ui/core/support/controls/ObjectViewer","sap/ui/Device","sap/base/Log","sap/base/security/encodeXML"],function(e,t,i,n,r,o){"use strict";var a=jQuery;var s=e.extend("sap.ui.core.support.plugins.ViewInfo",{constructor:function(t){e.apply(this,["sapUiSupportViewInfo","XML View and Templating Support Tools",t]);this._oStub=t;if(!this.runsAsToolPlugin()){var i=this;sap.ui.getCore().registerPlugin({startPlugin:function(e){i.oCore=e},stopPlugin:function(){i.oCore=undefined}})}}});s.prototype.init=function(t){e.prototype.init.apply(this,arguments);if(!this.runsAsToolPlugin()){return}if(!n.browser.chrome){this.$().get(0).innerHTML="View Info Support Tool is currently only available on Chrome. We are currently working to support all browsers.";return}try{this.supportInfo=window.opener.sap.ui.core.support.Support.info}catch(e){this.$().get(0).innerHTML="View Info Support Tool needs access to the opener window. The opener window might not be accessible due to cross domain restrictions.";return}if(typeof this.supportInfo!=="function"){this.$().get(0).innerHTML="<div class='sapUISupportLabel' style='padding: 5px;'>"+"View Info Support Tool is only available in <b>Support Mode.</b>"+"<br>Turn it on by adding '<b>sap-ui-support=true</b>' to the url or your application."+"</div>";return}try{this.aViews=this.supportInfo.getAll("view");this.aOdataModels=this.supportInfo.getAll("datajs")}catch(e){this.$().get(0).innerHTML="View Info Support Tool raised an internal error while reading the support informations.";return}if(!this.aViews){this.$().get(0).innerHTML="View Info Support Tool did not record any information on the current page.<br>"+"Possible reasons:<br>"+"There are no XML Views defined in the current app.<br>"+"Views where not loaded before the Diagnistics tool was started."}if(this.runsAsToolPlugin()){l.call(this,t)}};function l(e){a(document).on("click",".viewxmlheader",a.proxy(this._onToggleViewInfo,this)).on("click",".viewxmlmain",a.proxy(this._onMainViewInfo,this));this.renderContentAreas()}s.prototype.exit=function(t){e.prototype.exit.apply(this,arguments);if(this.runsAsToolPlugin()){a(document).off("click",".viewxmlheader",a.proxy(this._onToggleViewInfo,this)).off("click",".viewxmlmain",a.proxy(this._onMainViewInfo,this))}};s.prototype.provideNodeInfo=function(e,t,i){if(e.env.type!=="template"){var n=this.getObjectInfo(t);var r=[];if(n){var o=this.getBreakpointInfos(n);if(o.Template){r.push(o.Template)}if(o.Attributes){r.push(o.Attributes)}if(o.Properties){r.push(o.Properties)}if(o.Methods){r.push(o.Methods)}}return r}};s.prototype.highlightTemplateTreeNode=function(e,t,i){e.clearHighlights();var n=this.getSupportInfos(t);for(var i=0;i<n.length;i++){if(n[i].context){e.expandNode(n[i].context);e.highlightNode(n[i].context)}}};s.prototype.createTree=function(e,i){var n=new t,r=this,o=e.context;n.viewDebugInfo=e;if(e.env.type==="template"){n.ignoreIds();o=e.env.clone}var a=o.querySelectorAll("*");for(var s=0;s<a.length;s++){var l=a[s],p=l.getAttribute("support:data"),d=this.supportInfo.getIds(p);if(d.length>0){if(!l.getAttribute("id")){l.setAttribute("id","")}l.setAttribute("__id",d[0])}else{l.setAttribute("__id",l.getAttribute("id"))}}n.setRootObject(o);n.attachSelectionChange(function(t){return function(i,n){if(e){if(e.env.type!=="template"){r.updateObjectInfo(i,t,n);if(e.env.templateTree){r.highlightTemplateTreeNode(e.env.templateTree,i,t)}}}}}(i));n.attachAttributeInfos(function(t,i){if(e){if(e.env.type!=="template"){if(i.name.indexOf("support:")>-1){return{visible:false}}if(i.name.indexOf("xmlns:support")>-1){return{visible:false}}}}});n.attachNodeInfos(function(t,i){return r.provideNodeInfo(e,t,i)});return n};s.prototype.renderContentAreas=function(){this._propertyChangeDebugger={};this._methodDebugger={};var e=sap.ui.getCore().createRenderManager();e.write("<style>"+".viewxmlinfo {width: 620px; height: 300px; position: absolute;margin-top: -310px;margin-left: 810px; box-sizing:border-box;}"+".viewxmlinfo .content {overflow: auto; box-sizing:border-box;}"+".viewxmlinfo .toolbar {padding:4px 10px;box-sizing:border-box;height:25px}"+".viewxmlinfo .title {padding:4px 10px;box-sizing:border-box;height:25px;font-size:17px;}"+".viewxmlinfo .title a {color: #007dc0; text-decoration: none}"+".viewxmlinfo .title a:hover {color: #007dc0; text-decoration: underline}"+".viewxmlheader {cursor:default;font-family:arial; font-size: 14px;}"+".viewxmlheader .info{margin-left:3px;display:inline-block}"+".viewxmlheader[collapsed='true'] .settingscontainer {display:none;margin-left: 8px;}"+".viewxmlheader[collapsed='false'] .settingscontainer {margin-top: 3px; display:block;margin-left: 12px;}"+".viewxmlmain .settingscontainer {margin-left: 12px;}"+".viewxmlmain .settings{font-size:14px;margin: 0px 6px;padding:2px 6px;color:#007dc0;cursor:pointer; display:inline-block;width:180px;white-space:nowrap;}"+".viewxmlmain .settings [selected='true'] {background-color:#007dc0;}"+".viewxmlmain .settings [selected] {border: 1px solid #007dc0;height: 11px;display: inline-block;width: 11px;box-sizing: border-box;margin-right: 4px;margin-bottom: -1px;}"+".viewxmlheader .settings {margin: 0px 6px;padding:2px 6px;color:#007dc0;cursor:pointer; display:inline-block;width:180px;white-space:nowrap;}"+".viewxmlheader .settings [selected='true'] {background-color:#007dc0;}"+".viewxmlheader .settings [selected] {border: 1px solid #007dc0;height: 11px;display: inline-block;width: 11px;box-sizing: border-box;margin-right: 4px;margin-bottom: -1px;}"+".viewxmlheader[collapsed='true'] .toggle {border-color: transparent transparent transparent #333;border-radius: 0;border-style: solid;border-width: 4px 3px 4px 8px;height: 0;width: 0;position: relative;margin-top: 0px;margin-left: 10px;display: inline-block;}"+".viewxmlheader[collapsed='false'] .toggle {border-color: #333 transparent transparent transparent;border-radius: 0;border-style: solid;border-width: 8px 4px 0px 4px;height: 0;width: 0;position: relative;margin-top: 0px;margin-left: 8px;margin-right: 5px;display: inline-block;}"+".viewxmlsplitter {font-family: consolas, monospace; width: 5px; overflow: auto; height: 300px; position: absolute;margin-top: -310px;margin-left: 810px; padding-left:10px}"+t.getCss()+i.getCss()+"</style>");if(!this.aTrees){this.aTrees=[];this.aDataTrees=[];this.aObjectViewers=[];var n=0;e.write('<div class="viewxmlmain"><div class="settingscontainer"><span class="settings" raise="_onClearAllBreakpoints">Clear all breakpoints</span><span class="settings" raise="_onClearAllXMLModifications">Clear all XML modifications</span></div>');this.aMetamodels=[];if(this.aOdataModels){for(var r=0;r<this.aOdataModels.length;r++){var a=this.aOdataModels[r];if(a&&a.env.type==="metadata"){this.aMetamodels.push(a);var s=this.createTree(a,n);this.aTrees[n]=s;e.write('<div class="viewxmlheader" collapsed="true"><span class="toggle"></span><span class="info">Metadata: '+o(a.env.settings.response.requestUri)+'</span><div class="settingscontainer"><span class="settings"  style="display:none" raise="_onToggleDebugNodes" idx="'+n+'">Expand debugged nodes</span><span class="settings"  style="display:none" raise="_onToggleRealIds" idx="'+n+'" style="display:none"><span selected="false"></span>Show XML View Ids</span><span class="settings" raise="_onToggleNamespace" idx="'+n+'" ><span selected="false"></span>Hide tag namespace</span><span class="settings" raise="_onToggleInactive" idx="'+n+'" ><span selected="false"></span>Hide inactive</span></div></div>');e.write('<div style="display:none"><div id="treecontent_'+n+'"></div>');e.write('<div class="viewxmlsplitter">');e.write("</div>");e.write('<div class="viewxmlinfo"><div class="title" id="objectHeader'+n+'" style="display:none">Header</div><div class="toolbar" id="objectToolbar'+n+'" style="display:none">Toolbar</div><div class="content" id="selectedcontent_'+n+'">');e.write("</div></div></div>")}a.env.tree=s;n++}}if(this.aViews){for(var r=0;r<this.aViews.length;r++){var l=this.aViews[r];var s=this.createTree(l,n);this.aTrees[n]=s;this.aObjectViewers[n]=null;var p="";if(l.env.type=="template"){p=l.env.viewinfo.id}else{p=l.env.viewinfo.getId();for(var d=0;d<this.aTrees.length;d++){if(this.aTrees[d]&&this.aTrees[d].viewDebugInfo.env.type==="template"&&this.aTrees[d].viewDebugInfo.env.viewinfo.id===p){l.env.templateTree=this.aTrees[d]}}if(l.env.settings.preprocessors&&l.env.settings.preprocessors.xml&&l.env.settings.preprocessors.xml.models){var g=l.env.settings.preprocessors.xml.models;if(g){for(var f in g){if(g[f].oMetadata){var c=g[f].oMetadata.sUrl;for(var d=0;d<this.aMetamodels.length;d++){var u=this.aMetamodels[d];if(u&&u.env.settings.response.requestUri===c){if(!l.env.metamodels){l.env.metamodels=[]}l.env.metamodels.push({tree:u.env.tree,model:u,data:g[f],metamodel:g[f].oMetaModel,metadata:g[f].oMetadata})}}}}}}}if(l.env.type==="template"){e.write('<div class="viewxmlheader" collapsed="true"><span class="toggle"></span><span class="info">'+p+" ("+l.env.type+')</span><div class="settingscontainer"><span class="settings" raise="_onToggleDebugNodes" idx="'+n+'">Expand debugged nodes</span><span class="settings" raise="_onToggleRealIds" idx="'+n+'" style="display:none"><span selected="false"></span>Show XML View Ids</span><span class="settings" raise="_onToggleNamespace" idx="'+n+'" ><span selected="false"></span>Hide tag namespace</span><span class="settings" raise="_onToggleInactive" idx="'+n+'" ><span selected="false"></span>Hide inactive</span></div></div>')}else{var h="";if(l.env.metamodels){h=":templated by [";for(var v=0;v<l.env.metamodels.length;v++){h+=l.env.metamodels[v].metadata.sUrl}h+="]"}var b="";if(l.env.settings.cache){b+=" from client cache "+JSON.stringify(l.env.settings.cache)}e.write('<div class="viewxmlheader" collapsed="true"><span class="toggle"></span><span class="info">'+p+" ("+l.env.type+o(String(h))+") "+o(String(b))+'</span><div class="settingscontainer"><span class="settings" raise="_onToggleDebugNodes" idx="'+n+'">Expand debugged nodes</span><span class="settings" raise="_onToggleRealIds" idx="'+n+'" ><span selected="false"></span>Show XML View Ids</span><span class="settings" raise="_onToggleNamespace" idx="'+n+'" ><span selected="false"></span>Hide tag namespace</span></div></div>')}e.write('<div style="display:none"><div id="treecontent_'+n+'"></div>');e.write('<div class="viewxmlsplitter">');e.write("</div>");e.write('<div class="viewxmlinfo"><div class="title" id="objectHeader'+n+'" style="display:none">Header</div><div class="toolbar" id="objectToolbar'+n+'" style="display:none">Toolbar</div><div class="content" id="selectedcontent_'+n+'">');e.write("</div></div></div></div>");n++}}}e.flush(this.$().get(0));if(this.aTrees){for(var n=0;n<this.aTrees.length;n++){var s=this.aTrees[n];var m=document.getElementById("treecontent_"+n);if(m){s.update(m)}}}e.destroy()};s.prototype._onClearAllBreakpoints=function(){this.supportInfo.removeAllBreakpoints()};s.prototype._onClearAllXMLModifications=function(){this.supportInfo.removeAllXMLModification()};s.prototype.getBreakpointInfos=function(e){var t={},i;function n(e){var t=0;for(var i in e){if(e[i].__enabled){t++}}return t}if(e.Template){i=n(e.Template);t["Template"]={selected:i>0,color:"orange",tooltip:"Template Breakpoints ("+i+")"}}if(e.Attributes){i=n(e.Attributes);t["Attributes"]={selected:i>0,color:"blue",tooltip:"Attribute Changes ("+i+")"}}if(e.Properties){i=n(e.Properties);t["Properties"]={selected:i>0,color:"green",tooltip:"Property Change Breakpoints ("+i+")"}}if(e.Methods){i=n(e.Methods);t["Methods"]={selected:i>0,color:"red",tooltip:"Method Breakpoints ("+i+")"}}return t};s.prototype.getSupportInfos=function(e){var t=e.getAttribute("support:data");return this.supportInfo.getInfos(t)};s.prototype.parseScalarType=function(e,t,i,n){var r=window.opener.sap.ui.base.DataType;var o=window.opener.sap.ui.base.ManagedObject;try{var a=o.bindingParser(t,n,true);if(a&&typeof a==="object"){return{binding:a}}}catch(e){return{error:"Property "+i+" - Invalid Binding:"+e.message}}var s=t=a||t;var l=r.getType(e);if(l){if(l instanceof r){s=l.parseValue(t)}}else{return{error:"Property "+i+" has unknown type "+e}}if(!l.isValid(s)){return{error:"Property "+i+" has invalid value;"}}return{value:s}};s.prototype.getObjectInfo=function(e,t){var i=this;function n(e,t,n){return function(r){var o=i.parseScalarType(e.type,r,e.name,null);for(var a=0;a<t.length;a++){t[a].isBound(e.name);if(e.bindable){t[a][e._sUnbind](o.binding)}else{t[a].unbindProperty(e.name)}if(o.binding){if(e.bindable){t[a][e._sBind](o.binding)}else{t[a].bindProperty(e.name,o.binding)}}else if(o.value!==undefined){t[a][e._sMutator](o.value)}}n.setAttribute("__changed"+e.name,r);return o}}function r(e,n,r){return function(r){var o=i.parseScalarType(e.type,r,e.name,null);for(var a=0;a<c.length;a++){c[a].isBound(e.name);if(e.bindable){c[a][e._sUnbind](o.binding)}else{c[a].unbindProperty(e.name)}if(o.binding){if(e.bindable){c[a][e._sBind](o.binding)}else{c[a].bindProperty(e.name,o.binding)}}else if(o.value!==undefined){c[a][e._sMutator](o.value)}}if(!o.error){n.getAttribute("_index");var s=n.parentNode,l=null;while(s){l=s;s=s.parentNode}if(l){var p=l.querySelectorAll("*");for(var a=0;a<p.length;a++){if(p[a]===n){i.supportInfo.addXMLModification(t,a+1,{setAttribute:[e.name,r]});return}}}}return o}}var o=e.namespaceURI,a=e.localName,l={};var p=window.opener.jQuery.sap.getObject(o+"."+a);if(p){var d=e.getAttribute("support:data");var g=p.getMetadata().getAllProperties(),f=p.prototype,c=this.supportInfo.getElements(d),u=this.getValidDebugStackIndices(e);if(c.length>0){l.Control={};l.Control[c[0].getMetadata().getName()]={value:c[0].getId(),__highlightid:true,__readonly:true};if(c.length>1){l.Clones={};for(var h=1;h<c.length;h++){l.Clones[c[h].getMetadata().getName()+"("+h+")"]={value:c[h].getId(),__highlightid:true}}}}if(u.length>0){l.Template={};for(var h=0;h<u.length;h++){var v=u[h];l.Template[v.__infokey]={value:v.__infovalue,__idx:u[h]._idx,__enabled:this.supportInfo.hasBreakpointAt(u[h]._idx),__level:v.__level}}}var b=Object.keys(g).sort();if(e.attributes.length>0){l.Attributes={};for(var h=0;h<e.attributes.length;h++){var m=e.attributes[h];if(b.indexOf(m.name)>-1){var _=g[b[b.indexOf(m.name)]];l.Attributes[m.name]={value:m.value,__enabled:false,__docu:s.DemokitUrl+_._oParent.getName()+".html#"+_._sGetter,__original:m.value,__change:r(_,e,t),__add:true}}}}if(b.length>0){l.Properties={};for(var h=0;h<b.length;h++){var _=g[b[h]];var x={value:e.getAttribute("__changed"+_.name)||e.getAttribute(b[h]),value2:c[0]&&c[0][_._sGetter]?c[0]&&c[0][_._sGetter]():null,__controls:c,__enabled:c[0]&&this._propertyChangeDebugger[c[0].getId()+"__"+b[h]]!=null,__docu:s.DemokitUrl+_._oParent.getName()+".html#"+_._sGetter,__original:e.getAttribute(b[h]),__changed:null};x.__change=n(_,c,e);l.Properties[b[h]]=x}}var y=Object.keys(f).sort();if(y.length>0){l.Methods={};for(var h=0;h<y.length;h++){l.Methods[y[h]]={value:"",__controls:c,__enabled:c[0]&&this._methodDebugger[c[0].getId()+"__"+y[h]]!=null}}}}return l};s.prototype._makePropFn=function(e){return function(t){if(t.getParameter("name")===e){debugger}}};s.prototype._makeFn=function(e){return function(){debugger;return e.apply(this,arguments)}};s.prototype.highlightControl=function(e,t,i){try{if(this._highlightControl){this._highlightControl.control.getDomRef().style.outline=this._highlightControl.outline}if(this._highlightControls){for(var n=0;n<this._highlightControls.length;n++){this._highlightControls[n].control.getDomRef().style.outline=this._highlightControls[n].outline}}this._highlightControl=null;this._highlightControls=[];if(e.Control&&e.Control[Object.keys(e.Control)[0]].__highlightid){if(t==="Control"&&e.Clones){for(var o in e.Clones){var a=opener.sap.ui.getCore().byId(e.Clones[o].value);if(a&&a.getDomRef()){this._highlightControls.push({control:a,outline:a.getDomRef().style.outline});a.getDomRef().style.outline="solid 1px orange"}}}else{if(!i){i=e.Control[Object.keys(e.Control)[0]]}if(t==="Control"&&i){var s=opener.sap.ui.getCore().byId(i.value);if(s&&s.getDomRef()){this._highlightControl={control:s,outline:s.getDomRef().style.outline};if(s.getDomRef()){s.getDomRef().style.outline="solid 1px orange"}}}}if(t==="Clones"){var s=opener.sap.ui.getCore().byId(i.value);if(s&&s.getDomRef()){this._highlightControl={control:s,outline:s.getDomRef().style.outline};if(s.getDomRef()){s.getDomRef().style.outline="solid 1px orange"}}}}}catch(e){r.debug("Diagnostics: ViewInfo failed to remove highlighting of controls")}};s.DemokitUrl="https://sapui5.hana.ondemand.com/#docs/api/symbols/";s.prototype.updateObjectInfo=function(e,t,n){var r=this.aObjectViewers[t],o=this;if(!r){r=new i;this.aObjectViewers[t]=r}var a=document.getElementById("objectHeader"+t);a.style.display="none";var l=this.aTrees[t];r.initialExpandedSections=this.oObjectViewer?this.oObjectViewer.expandedSections:[];var p=this.getObjectInfo(e,l.viewDebugInfo.env.viewinfo.getId());var d="";try{if(!p.Control&&e.parentNode){var g=e.parentNode.namespaceURI+"."+e.parentNode.localName;var f="get"+e.localName.substring(0,1).toUpperCase()+e.localName.substring(1);d+='<a target="_docu" href="'+s.DemokitUrl+g+'.html">'+g+"</a> ("+e.tagName+") ";d+=': <a target="_docu" href="'+s.DemokitUrl+g+".html#"+f+'">'+e.localName+" aggregation</a>"}else{var g=e.namespaceURI+"."+e.localName;d+='<a target="_docu" href="'+s.DemokitUrl+g+'.html">'+g+"</a> ("+e.tagName+") ";var c=window.opener.jQuery.sap.getObject(Object.keys(p.Control)[0]).getMetadata().getParent().getName();d+=': <a target="_docu" href="'+s.DemokitUrl+c+'.html">'+c+"</a>"}}catch(e){d+=""}a.style.display="block";a.innerHTML=d;o.highlightControl(p,"Control");r.setRootObject(p);r.attachObjectInfos(function(e,t,i,n){if(t==="Template"){if(p[t][n].__enabled){return[{selected:true,color:"orange",tooltip:"Disable breakpoint"}]}else{return[{selected:false,color:"orange",tooltip:"Break if resolved after reload/reprocess"}]}}else if(t==="Attributes"){if(p[t][n].__enabled){return[{selected:true,color:"blue",tooltip:"Disable breakpoint"}]}else{return[{selected:false,color:"blue",tooltip:"Break if changed"}]}}else if(t==="Properties"){if(p[t][n].__enabled){return[{selected:true,color:"green",tooltip:"Disable breakpoint"}]}else{return[{selected:false,color:"green",tooltip:"Break if changed"}]}}else if(t==="Methods"){if(p[t][n].__enabled){return[{selected:true,color:"red",tooltip:"Disable breakpoint"}]}else{return[{selected:false,color:"red",tooltip:"Break if called"}]}}return[]});r.attachSelect(function(e){if(e&&e.__docu){window.open(e.__docu,"_docu")}});r.attachHover(function(e,t,i){o.highlightControl(p,t,e)});r.attachInfoPress(function(e,t,i){var n=p[e][t].__idx,a=p[e][t].__enabled;if(!a){if(e==="Template"){o.supportInfo.addBreakpointAt(n)}else if(e==="Properties"){var s=p[e][t].__controls;if(s){for(var d=0;d<s.length;d++){var g=s[d];o._propertyChangeDebugger[g.getId()+"__"+t]=o.supportInfo._breakAtProperty(t);g.attachEvent("_change",o._propertyChangeDebugger[g.getId()+"__"+t])}}}else if(e==="Methods"){var s=p[e][t].__controls;if(s){for(var d=0;d<s.length;d++){var g=s[d];var f=g[t];o._methodDebugger[g.getId()+"__"+t+"__fn"]=f;o._methodDebugger[g.getId()+"__"+t]=o.supportInfo._breakAtMethod(f);g[t]=o._methodDebugger[g.getId()+"__"+t]}}}p[e][t].__enabled=true;r.setInfoSelected(e,t,i,true)}else{if(e==="Template"){o.supportInfo.removeBreakpointAt(n)}else if(e==="Properties"){var s=p[e][t].__controls;if(s){for(var d=0;d<s.length;d++){var g=s[d];g.detachEvent("_change",o._propertyChangeDebugger[g.getId()+"__"+t]);delete o._propertyChangeDebugger[g.getId()+"__"+t]}}}else if(e==="Methods"){var s=p[e][t].__controls;if(s){for(var d=0;d<s.length;d++){var g=s[d];g[t]=o._methodDebugger[g.getId()+"__"+t+"__fn"];delete o._methodDebugger[g.getId()+"__"+t];delete o._methodDebugger[g.getId()+"__"+t+"__fn"]}}}p[e][t].__enabled=false;r.setInfoSelected(e,t,i,false)}if(p){var c=o.getBreakpointInfos(p);var d=0;if(c.Template){l.setInfoSelected(l.getSelectedIndex(),d++,c.Template.selected,c.Template.tooltip)}if(c.Attributes){l.setInfoSelected(l.getSelectedIndex(),d++,c.Attributes.selected,c.Attributes.tooltip)}if(c.Properties){l.setInfoSelected(l.getSelectedIndex(),d++,c.Properties.selected,c.Properties.tooltip)}if(c.Methods){l.setInfoSelected(l.getSelectedIndex(),d,c.Methods.selected,c.Methods.tooltip)}}});var u=document.getElementById("selectedcontent_"+t);if(u){r.update(u)}this.oObjectViewer=r};s.prototype._onToggleRealIds=function(e){var t=e.target;if(t.getAttribute("selected")){t=t.parentNode}var i=parseInt(t.getAttribute("idx")),n=this.aTrees[i];if(n.toggleIds()){t.innerHTML='<span selected="false"></span>Show XML View Ids'}else{t.innerHTML='<span selected="true"></span>Show Real Ids'}};s.prototype._onToggleInactive=function(e){var t=e.target;if(t.getAttribute("selected")){t=t.parentNode}var i=parseInt(t.getAttribute("idx")),n=this.aTrees[i];if(n.toggleInactive()){t.innerHTML='<span selected="false"></span>Hide inactive'}else{t.innerHTML='<span selected="true"></span>Show inactive'}e.stopPropagation()};s.prototype._onToggleNamespace=function(e){var t=e.target;if(t.getAttribute("selected")){t=t.parentNode}var i=parseInt(t.getAttribute("idx")),n=this.aTrees[i];if(n.toggleNS()){t.innerHTML='<span selected="false"></span>Hide tag namespace'}else{t.innerHTML='<span selected="true"></span>Show tag namespace'}e.stopPropagation()};s.prototype._onToggleDebugNodes=function(e){var t=parseInt(e.target.getAttribute("idx")),i=this.aTrees[t];i.expandNodesWithSelectedInfo(0);i.expandNodesWithSelectedInfo(1);i.expandNodesWithSelectedInfo(2)};s.prototype.resizeHandler=function(){var e=document.querySelectorAll(".viewxmlheader");for(var t=0;t<e.length;t++){var i=e[t];var n=i.getAttribute("collapsed")==="true";if(!n){var r=i.offsetWidth-30;var o=i.nextSibling.firstChild.offsetHeight;i._iOldWidth=r;i._iOldHeight=o;i.nextSibling.firstChild.style.width=r/3*2+"px";i.nextSibling.lastChild.style.width=r/3+"px";i.nextSibling.lastChild.style.height=o+"px";i.nextSibling.lastChild.style.marginTop=-o+"px";i.nextSibling.lastChild.style.marginLeft=r/3*2+20+"px";i.nextSibling.lastChild.lastChild.height=o-50+"px";i.nextSibling.lastChild.lastChild.width="100%"}}if(!this.iInterval){var a=this;this.iInterval=window.setInterval(function(){var e=document.querySelectorAll(".viewxmlheader");var t=e[0];for(var i=0;i<e.length;i++){var t=e[i];var n=t.getAttribute("collapsed")==="true";if(!n){if(t._iOldWidth!==t.offsetWidth-30||t._iOldHeight!==t.nextSibling.firstChild.offsetHeight){a.resizeHandler()}}}},100)}};s.prototype._onMainViewInfo=function(e){var t=e.target,i=t.getAttribute("raise");if(i&&this[i]){this[i](e);e.stopPropagation();return}};s.prototype._onToggleViewInfo=function(e){var t=e.target,i=t.getAttribute("raise");if(i&&this[i]){this[i](e);e.stopPropagation();return}i=t.parentNode.getAttribute("raise");if(i&&this[i]){this[i](e);e.stopPropagation();return}if(!t.getAttribute("collapsed")){t=t.parentNode}var n=t.getAttribute("collapsed")==="true";if(n){t.setAttribute("collapsed","false");t.nextSibling.style.display="block";this.resizeHandler()}else{t.setAttribute("collapsed","true");t.nextSibling.style.display="none"}};s.prototype.createTemplateTreeNodes=function(e){var t=(new DOMParser).parseFromString("","application/xml");var i=this.supportInfo.getAll();var n=t;var r="";var o="";var a=[];for(var s=0;s<i.length;s++){var l=i[s];if(l.env.before){if(l.env.caller==="visitNode"){var p=l.context;if(n===p){continue}t.importNode(p);p.removeAttribute("support:data");p.removeAttribute("xmlns:support");if(t===n){n.replaceChild(p,n.firstChild);a.push(n)}else{n.appendChild(p);a.push(n)}n=p}else if(l.env.caller==="visitAttributes"){r=l.env.before.name;o=l.env.before.value;n.setAttribute(r,o)}}else if(l.env.after){if(l.env.caller==="visitNode"){n=n.parentNode||l.env.parent}}}return t.childNodes[0]};s.prototype.getValidDebugStackIndices=function(e){var t=[],i=e.getAttribute("support:data"),n=["xmlns","support:data"];if(i){var r=i.split(","),o=this.supportInfo,a=0;for(var s=0;s<r.length;s++){var l=parseInt(r[s]);var p=o.byIndex(l);if(!p){continue}p.__debugging=o.hasBreakpointAt(l);if(p.env){if(p.env.caller==="visitAttributes"){for(var d in p.env){if(d==="caller"||d==="info"){continue}var g=true;for(var f=0;f<n.length;f++){if(p.env[d].name.indexOf(n[f])===0){g=false;break}}if(g){if(d.indexOf("after")===0){a--}p.__infokey=d+":"+p.env[d].name;p.__level=a;p.__infovalue=p.env[d].value;if(d.indexOf("before")===0){a++}t.push(p)}}}else if(p.env.caller==="getMetadata"){for(var d in p.env){if(d==="caller"||d==="info"){continue}var g=true;for(var f=0;f<n.length;f++){if(p.env[d].name.indexOf(n[f])===0){g=false;break}}if(g){if(d.indexOf("after")===0){a--}p.__infokey=d+":"+p.env[d].name;p.__level=a;p.__infovalue=p.env[d].value;t.push(p);if(d.indexOf("before")===0){a++}}}}else if(p.env.caller==="getProperty"){for(var d in p.env){if(d==="caller"||d==="info"){continue}var g=true;for(var f=0;f<n.length;f++){if(p.env[d].name.indexOf(n[f])===0){g=false;break}}if(g){if(d.indexOf("after")===0){a--}p.__infokey=d+":"+p.env[d].name;p.__level=a;p.__infovalue=p.env[d].value;t.push(p);if(d.indexOf("before")===0){a++}}}}else if(p.env.caller==="visitNode"){for(var d in p.env){if(d.indexOf("after")===0){a--}p.__infokey=d+":Node";p.__infovalue=p.env[d].name;t.push(p);if(d.indexOf("before")===0){a++}}}}}}return t};return s});