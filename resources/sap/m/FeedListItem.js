/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ListItemBase","./Link","./library","./FormattedText","sap/ui/core/IconPool","sap/m/Button","sap/ui/Device","./FeedListItemRenderer"],function(t,e,o,i,n,s,r,a){"use strict";var l=o.ListType;var p=o.ImageHelper;var h=o.LinkConversion;var g=o.ButtonType;var u=t.extend("sap.m.FeedListItem",{metadata:{library:"sap.m",designtime:"sap/m/designtime/FeedListItem.designtime",properties:{icon:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},activeIcon:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},sender:{type:"string",group:"Data",defaultValue:null},text:{type:"string",group:"Data",defaultValue:null},moreLabel:{type:"string",group:"Data",defaultValue:null},lessLabel:{type:"string",group:"Data",defaultValue:null},info:{type:"string",group:"Data",defaultValue:null},timestamp:{type:"string",group:"Data",defaultValue:null},senderActive:{type:"boolean",group:"Behavior",defaultValue:true},iconActive:{type:"boolean",group:"Behavior",defaultValue:true},iconDensityAware:{type:"boolean",defaultValue:true},showIcon:{type:"boolean",group:"Behavior",defaultValue:true},convertLinksToAnchorTags:{type:"sap.m.LinkConversion",group:"Behavior",defaultValue:h.None},convertedLinksDefaultTarget:{type:"string",group:"Behavior",defaultValue:"_blank"},maxCharacters:{type:"int",group:"Behavior",defaultValue:null}},defaultAggregation:"actions",aggregations:{actions:{type:"sap.m.FeedListItemAction",multiple:true},_text:{type:"sap.m.FormattedText",multiple:false,visibility:"hidden"},_actionSheet:{type:"sap.m.ActionSheet",multiple:false,visibility:"hidden"},_actionButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"}},events:{senderPress:{parameters:{domRef:{type:"string"},getDomRef:{type:"function"}}},iconPress:{parameters:{domRef:{type:"string"},getDomRef:{type:"function"}}}}}});u._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");u._nMaxCharactersMobile=300;u._nMaxCharactersDesktop=500;u._sTextShowMore=u._oRb.getText("TEXT_SHOW_MORE");u._sTextShowLess=u._oRb.getText("TEXT_SHOW_LESS");u.prototype.init=function(){t.prototype.init.apply(this);this.setAggregation("_text",new i(this.getId()+"-formattedText"),true);this.setAggregation("_actionButton",new s({id:this.getId()+"-actionButton",type:g.Transparent,icon:"sap-icon://overflow",press:[this._onActionButtonPress,this]}),true)};u.prototype._onActionButtonPress=function(){sap.ui.require(["sap/m/ActionSheet"],this._openActionSheet.bind(this))};u.prototype._openActionSheet=function(t){var e=this.getAggregation("_actionSheet");var o=this.getActions();var i;if(!(e&&e instanceof t)){e=new t({id:this.getId()+"-actionSheet",beforeOpen:[this._onBeforeOpenActionSheet,this]});this.setAggregation("_actionSheet",e,true)}e.destroyAggregation("buttons",true);for(var n=0;n<o.length;n++){i=o[n];e.addButton(new s({icon:i.getIcon(),text:i.getText(),visible:i.getVisible(),enabled:i.getEnabled(),press:i.firePress.bind(i,{item:this})}))}e.openBy(this.getAggregation("_actionButton"))};u.prototype._onBeforeOpenActionSheet=function(t){var e,o;if(r.system.phone){return}o=sap.ui.getCore().getConfiguration().getTheme();e=t.getSource().getParent();e.removeStyleClass("sapContrast sapContrastPlus");if(o==="sap_belize"){e.addStyleClass("sapContrast")}else if(o==="sap_belize_plus"){e.addStyleClass("sapContrastPlus")}};u.prototype.invalidate=function(){t.prototype.invalidate.apply(this,arguments);var e=u._sTextShowMore;if(this.getMoreLabel()){e=this.getMoreLabel()}delete this._bTextExpanded;if(this._oLinkExpandCollapse){this._oLinkExpandCollapse.setProperty("text",e,true)}};u.prototype.onBeforeRendering=function(){this.$("realtext").find('a[target="_blank"]').off("click");var t=this.getAggregation("_text");t.setProperty("convertLinksToAnchorTags",this.getConvertLinksToAnchorTags(),true);t.setProperty("convertedLinksDefaultTarget",this.getConvertedLinksDefaultTarget(),true);if(this.getConvertLinksToAnchorTags()===o.LinkConversion.None){t.setHtmlText(this.getText())}else{t.setProperty("htmlText",this.getText(),true)}this._sFullText=t._getDisplayHtml().replace(/\n/g,"<br>");this._sShortText=this._getCollapsedText();if(this._sShortText){this._sShortText=this._sShortText.replace(/<br>/g," ")}this._bEmptyTagsInShortTextCleared=false};u.prototype.onAfterRendering=function(){if(document.getElementById(this.getAggregation("_actionButton"))){document.getElementById(this.getAggregation("_actionButton").getId()).setAttribute("aria-haspopup","menu")}if(this._checkTextIsExpandable()&&!this._bTextExpanded){this._clearEmptyTagsInCollapsedText()}var t=this.$("realtext");i.prototype.onAfterRendering.apply({$:function(){return t}})};u.prototype.exit=function(){this.$("realtext").find('a[target="_blank"]').off("click");if(this._oLinkControl){this._oLinkControl.destroy()}if(this._oImageControl){this._oImageControl.destroy()}if(this._oLinkExpandCollapse){this._oLinkExpandCollapse.destroy()}t.prototype.exit.apply(this)};u.prototype.ontap=function(e){if(e.srcControl){if(!this.getIconActive()&&this._oImageControl&&e.srcControl.getId()===this._oImageControl.getId()||!this.getSenderActive()&&this._oLinkControl&&e.srcControl.getId()===this._oLinkControl.getId()||(!this._oImageControl||e.srcControl.getId()!==this._oImageControl.getId()&&(!this._oLinkControl||e.srcControl.getId()!==this._oLinkControl.getId())&&(!this._oLinkExpandCollapse||e.srcControl.getId()!==this._oLinkExpandCollapse.getId()))){t.prototype.ontap.apply(this,[e])}}};u.prototype.onfocusin=function(t){if(this._oImageControl){var e=this.$("icon");if(t.target.id===this.getId()){e.removeAttr("alt")}else{e.attr("alt"," ")}}var o=t.srcControl,i=o.getDomRef(),n=this.getParent().getAccessbilityPosition(o);if(o instanceof sap.m.FeedListItem){i.setAttribute("aria-posinset",n.posInset);i.setAttribute("aria-setsize",n.setSize)}};u.prototype._getImageControl=function(){var t=this.getIcon();var e=t?t:n.getIconURI("person-placeholder");var o=this.getId()+"-icon";var i={src:e,alt:this.getSender(),densityAware:this.getIconDensityAware(),decorative:false,useIconTooltip:false};var s;if(this.getIconActive()){s=["sapMFeedListItemImage"]}else{s=["sapMFeedListItemImageInactive"]}var r=this;this._oImageControl=p.getImageControl(o,this._oImageControl,this,i,s);if(this.getIconActive()){if(!this._oImageControl.hasListeners("press")){this._oImageControl.attachPress(function(){r.fireIconPress({domRef:this.getDomRef(),getDomRef:this.getDomRef.bind(this)})})}}return this._oImageControl};u.prototype._getLinkSender=function(t){if(!this._oLinkControl){var o=this;this._oLinkControl=new e({press:function(){o.fireSenderPress({domRef:this.getDomRef(),getDomRef:this.getDomRef.bind(this)})}});this._oLinkControl.setParent(this,null,true)}if(t){this._oLinkControl.setProperty("text",this.getSender()+u._oRb.getText("COLON"),true)}else{this._oLinkControl.setProperty("text",this.getSender(),true)}this._oLinkControl.setProperty("enabled",this.getSenderActive(),true);return this._oLinkControl};u.prototype._activeHandlingInheritor=function(){var t=this.getActiveIcon();if(this._oImageControl&&t){this._oImageControl.setSrc(t)}};u.prototype._inactiveHandlingInheritor=function(){var t=this.getIcon()?this.getIcon():n.getIconURI("person-placeholder");if(this._oImageControl){this._oImageControl.setSrc(t)}};u.prototype._getCollapsedText=function(){this._nMaxCollapsedLength=this.getMaxCharacters();if(this._nMaxCollapsedLength===0){if(r.system.phone){this._nMaxCollapsedLength=u._nMaxCharactersMobile}else{this._nMaxCollapsedLength=u._nMaxCharactersDesktop}}var t=this._convertHtmlToPlainText(this._sFullText);var e=null;if(t&&t.length>this._nMaxCollapsedLength){var o=t.substring(0,this._nMaxCollapsedLength);var i=o.lastIndexOf(" ");if(i>0){o=o.substr(0,i)}if(t.length===this._sFullText.length){e=o}else{e=this._convertPlainToHtmlText(o)}}return e};u.prototype._clearEmptyTagsInCollapsedText=function(){var t;if(this._bEmptyTagsInShortTextCleared){return}this._bEmptyTagsInShortTextCleared=true;do{t=this.$("realtext").find(":empty").remove()}while(t.length>0);this._sShortText=this.$("realtext").html()};u.prototype._toggleTextExpanded=function(){var t=this.$("realtext");var e=this.$("threeDots");var o=u._sTextShowMore;var i=u._sTextShowLess;if(this.getMoreLabel()){o=this.getMoreLabel()}if(this.getLessLabel()){i=this.getLessLabel()}if(this._bTextExpanded){t.html(this._sShortText.replace(/&#xa;/g,"<br>"));e.text(" ... ");this._oLinkExpandCollapse.setText(o);this._bTextExpanded=false;this._clearEmptyTagsInCollapsedText()}else{t.html(this._sFullText.replace(/&#xa;/g,"<br>"));e.text("  ");this._oLinkExpandCollapse.setText(i);this._bTextExpanded=true}};u.prototype._getLinkExpandCollapse=function(){var t=u._sTextShowMore;if(this.getMoreLabel()){t=this.getMoreLabel()}if(!this._oLinkExpandCollapse){this._oLinkExpandCollapse=new e({text:t,press:[this._toggleTextExpanded,this]});this._bTextExpanded=false;this._oLinkExpandCollapse.setParent(this,null,true)}return this._oLinkExpandCollapse};u.prototype._convertHtmlToPlainText=function(t){var e=/(<([^>]+)>)/gi;return t.replace(e,"")};u.prototype._convertPlainToHtmlText=function(t){var e=this._sFullText;var o=/(<([^>]+)>)/gi;var i=e.split(o);var n="";for(var s=0;s<i.length;s++){if(i[s].length===0){continue}if(t.length>0&&i[s].indexOf(t.trim())!==-1){i[s]=t}if(/^<.+>$/.test(i[s])){n=n+i[s];i[s+1]="";continue}if(t.indexOf(i[s].trim())===-1){continue}else{t=t.replace(i[s],"")}n=n+i[s]}return n};u.prototype._checkTextIsExpandable=function(){return this._sShortText!==null};u.prototype.setType=function(t){if(this.getType()!==t){if(t===l.Navigation){this.setProperty("type",l.Active)}else{this.setProperty("type",t)}}return this};return u});