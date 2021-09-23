/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([
	"./WaiterBase",
	"sap/ui/thirdparty/jquery"
], function (WaiterBase, jQueryDOM) {
	"use strict";

	var STATE = {
		PENDING: "PENDING",
		LOADED: "LOADED",
		ERROR: "ERROR"
	};

	var ResourceWaiter = WaiterBase.extend("sap.ui.test.autowaiter._ResourceWaiter", {
		constructor: function () {
			WaiterBase.apply(this, arguments);
			this._oLogger.setLevel("TRACE");
			this._aResources = [];
			// observe for new img elements and for img elements with changed src attribute
			var observer = new window.MutationObserver(function (mutations) {
				mutations.forEach(function (mutation) {
					if (mutation.type === "attributes" && mutation.target.tagName === "IMG") {
						this._trackImage(mutation.target);
					} else if (mutation.type === "childList") {
						// NodeList forEach is not supported in IE11
						for (var i = 0; i < mutation.addedNodes.length; i += 1) {
							if (mutation.addedNodes[i].tagName === "IMG") {
								this._trackImage(mutation.addedNodes[i]);
							}
						}
						if (mutation.nextSibling && mutation.nextSibling.tagName === "IMG") {
							this._trackImage(mutation.nextSibling);
						}
						if (mutation.previousSibling && mutation.previousSibling.tagName === "IMG") {
							this._trackImage(mutation.previousSibling);
						}
					}
				}.bind(this));
			}.bind(this));

			this._onElementAvailable("body", function (oElement) {
				observer.observe(oElement, {
					attributes: true,
					attributeFilter: ["src"],
					childList: true,
					subtree: true
				});
			});
		},
		hasPending: function () {
			this._aResources.forEach(function (mResource) {
				if (mResource.state === STATE.PENDING && mResource.element.complete) {
					mResource.state = STATE.LOADED;
					this._oLogger.trace("Image with src '" + mResource.element.src + "' completed");
				}
			}.bind(this));
			var aPendingResources = this._aResources.filter(function (mResource) {
				if (!jQueryDOM(mResource.element).length) {
					this._oLogger.trace("Image with src '" + mResource.src + "' was removed");
					return false;
				}
				return mResource.state === STATE.PENDING;
			}.bind(this));

			var bHasPendingResources = aPendingResources.length > 0;
			if (bHasPendingResources) {
				this._oHasPendingLogger.debug("There are " + aPendingResources.length + " resources still loading");
				aPendingResources.forEach(function (mResource) {
					this._oHasPendingLogger.debug("Pending resource: " + mResource.src);
				}.bind(this));
			}
			return bHasPendingResources;
		},
		_trackImage: function (oElement) {
			var mTrackedResource = this._aResources.filter(function (mResource) {
				return mResource.element === oElement;
			})[0];
			if (mTrackedResource) {
				mTrackedResource.src = oElement.src;
				mTrackedResource.state = STATE.PENDING;
				this._oLogger.trace("Image with src '" + oElement.src + "' is updated and pending again");
			} else {
				var mNewResource = {
					src: oElement.src,
					state: STATE.PENDING,
					element: oElement
				};
				this._aResources.push(mNewResource);
				this._oLogger.trace("Image with src '" + oElement.src + "' is tracked");

				oElement.addEventListener("load", function() {
					mNewResource.state = STATE.LOADED;
					this._oLogger.trace("Image with src '" + oElement.src + "' loaded successfully");
				}.bind(this));
				oElement.addEventListener("error" , function() {
					mNewResource.state = STATE.ERROR;
					this._oLogger.trace("Image with src '" + oElement.src + "' failed to load");
				}.bind(this));
			}
		},
		_onElementAvailable: function (sSelector, fnOnAvailable) {
			var aElements = jQueryDOM(sSelector);
			if (aElements.length) {
				fnOnAvailable(aElements[0]);
			} else {
				setTimeout(function () {
					this._onElementAvailable(sSelector, fnOnAvailable);
				}.bind(this), 100);
			}
		}
	});

	return new ResourceWaiter();
});
