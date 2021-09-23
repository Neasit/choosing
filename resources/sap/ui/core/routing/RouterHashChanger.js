/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./HashChangerBase"],function(e){"use strict";var t=e.extend("sap.ui.core.routing.RouterHashChanger",{constructor:function(t){if(!t||!t.parent){throw new Error("sap.ui.core.routing.RouterHashChanger can't be instantiated without a parent")}this.parent=t.parent;this.hash=t.hash||"";this.subHashMap=t.subHashMap;this.key=t.key||"";this._aRouters=[];e.apply(this)}});t.InvalidHash=Object.create(null);t.prototype.init=function(){this.parent.init()};t.prototype._generatePrefixedKey=function(e){return this.key?this.key+"-"+e:e};t.prototype.createSubHashChanger=function(e){this.children=this.children||{};var i=this._generatePrefixedKey(e);if(this.children[i]){return this.children[i]}var h=new t({key:i,parent:this,subHashMap:this.subHashMap,hash:this.subHashMap&&this.subHashMap[i]||""});h.attachEvent("hashSet",this._onChildHashChanged.bind(this,i));h.attachEvent("hashReplaced",this._onChildHashChanged.bind(this,i));this.children[i]=h;return h};t.prototype.fireHashChanged=function(e,t,i){var h,s=this.hash;this.hash=e;this.subHashMap=t;if(!i&&e!==s){this.fireEvent("hashChanged",{newHash:e,oldHash:s})}if(this.children){h=Object.keys(this.children);h.forEach(function(e){var h=t[e];if(h!==undefined){this.children[e].fireHashChanged(h,t,i)}}.bind(this))}};t.prototype._onChildHashChanged=function(e,t){var i=t.getParameter("key")||e,h=t.getParameter("hash"),s=t.getParameter("nestedHashInfo"),r=t.getParameter("deletePrefix");if(this._bCollectMode){this._collectHash(i,h,r)}else{this.fireEvent(t.getId(),{hash:h,key:i,nestedHashInfo:s,deletePrefix:r})}};t.prototype._collectHash=function(e,t,i){this._aCollectedHashInfo=this._aCollectedHashInfo||[];this._aCollectedHashInfo.push({key:e,hash:t,deletePrefix:i})};t.prototype._hasRouterAttached=function(){return this.hasListeners("hashChanged")};t.prototype._collectActiveDescendantPrefix=function(){if(this.children){var e=Object.keys(this.children);return e.reduce(function(e,t){var i=this.children[t];if(i._hasRouterAttached()){e.push(t);Array.prototype.push.apply(e,i._collectActiveDescendantPrefix())}return e}.bind(this),[])}else{return[]}};t.prototype.getHash=function(){if(this._isUnderCollectMode()){return t.InvalidHash}else{return this.hash}};t.prototype._setActiveRouter=function(e){if(e.getHashChanger()===this){this._oActiveRouter=e}return this};t.prototype.resetHash=function(e){if(e&&this._oActiveRouter===e){this.hash=undefined}return this};t.prototype.setHash=function(e,t,i){if(!(t instanceof Promise)){i=t;t=null}return this._modifyHash(e,t,i)};t.prototype.replaceHash=function(e,t,i){if(!(t instanceof Promise)){i=t;t=null}return this._modifyHash(e,t,i,true)};t.prototype._modifyHash=function(e,t,i,h){var s,r=h?"hashReplaced":"hashSet",n=this;if(!i){s=this._collectActiveDescendantPrefix()}if(t){this._bCollectMode=true;return t.then(function(){n.fireEvent(r,{hash:e,nestedHashInfo:n._aCollectedHashInfo,deletePrefix:s});n._aCollectedHashInfo=null;n._bCollectMode=false})}else{this.fireEvent(r,{hash:e,deletePrefix:s})}};t.prototype._isUnderCollectMode=function(){return this.parent instanceof t&&this.parent._isInCollectMode()};t.prototype._isInCollectMode=function(){return this._bCollectMode||this.parent instanceof t&&this.parent._isInCollectMode()};t.prototype.registerRouter=function(e){if(this._aRouters.indexOf(e)===-1){this._aRouters.push(e)}return this};t.prototype.deregisterRouter=function(e){var t=this._aRouters.indexOf(e);if(t!==-1){this._aRouters.splice(t,1);if(this._aRouters.length===0){this.destroy()}}};t.prototype.destroy=function(){if(!this.parent){return}this.parent.deregisterRouterHashChanger(this);if(this.children){Object.keys(this.children).forEach(function(e){var t=this.children[e];t.destroy()}.bind(this));delete this.children}delete this.hash;delete this.subHashMap;delete this.parent;delete this.key;e.prototype.destroy.apply(this,arguments)};t.prototype.deregisterRouterHashChanger=function(e){if(this.children){Object.keys(this.children).some(function(t){var i=this.children[t];if(i===e){delete this.children[t];return true}}.bind(this))}};return t});