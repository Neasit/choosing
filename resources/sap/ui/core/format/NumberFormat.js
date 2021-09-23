/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/core/Locale","sap/ui/core/LocaleData","sap/base/Log","sap/base/assert","sap/base/util/extend"],function(e,t,r,i,n,a){"use strict";var o=e.extend("sap.ui.core.format.NumberFormat",{constructor:function(e){throw new Error}});var s=/0+(\.0+)?/;var u=/^0+$/;var c={INTEGER:"integer",FLOAT:"float",CURRENCY:"currency",UNIT:"unit",PERCENT:"percent"};var l={FLOOR:"FLOOR",CEILING:"CEILING",TOWARDS_ZERO:"TOWARDS_ZERO",AWAY_FROM_ZERO:"AWAY_FROM_ZERO",HALF_FLOOR:"HALF_FLOOR",HALF_CEILING:"HALF_CEILING",HALF_TOWARDS_ZERO:"HALF_TOWARDS_ZERO",HALF_AWAY_FROM_ZERO:"HALF_AWAY_FROM_ZERO"};var g={};g[l.FLOOR]=Math.floor;g[l.CEILING]=Math.ceil;g[l.TOWARDS_ZERO]=function(e){return e>0?Math.floor(e):Math.ceil(e)};g[l.AWAY_FROM_ZERO]=function(e){return e>0?Math.ceil(e):Math.floor(e)};g[l.HALF_TOWARDS_ZERO]=function(e){return e>0?Math.ceil(e-.5):Math.floor(e+.5)};g[l.HALF_AWAY_FROM_ZERO]=function(e){return e>0?Math.floor(e+.5):Math.ceil(e-.5)};g[l.HALF_FLOOR]=function(e){return Math.ceil(e-.5)};g[l.HALF_CEILING]=Math.round;o.RoundingMode=l;o.oDefaultIntegerFormat={minIntegerDigits:1,maxIntegerDigits:99,minFractionDigits:0,maxFractionDigits:0,groupingEnabled:false,groupingSize:3,groupingSeparator:",",decimalSeparator:".",plusSign:"+",minusSign:"-",isInteger:true,type:c.INTEGER,showMeasure:false,style:"standard",parseAsString:false,preserveDecimals:false,roundingMode:o.RoundingMode.TOWARDS_ZERO,emptyString:NaN,showScale:true};o.oDefaultFloatFormat={minIntegerDigits:1,maxIntegerDigits:99,minFractionDigits:0,maxFractionDigits:99,groupingEnabled:true,groupingSize:3,groupingSeparator:",",decimalSeparator:".",plusSign:"+",minusSign:"-",isInteger:false,type:c.FLOAT,showMeasure:false,style:"standard",parseAsString:false,preserveDecimals:false,roundingMode:o.RoundingMode.HALF_AWAY_FROM_ZERO,emptyString:NaN,showScale:true};o.oDefaultPercentFormat={minIntegerDigits:1,maxIntegerDigits:99,minFractionDigits:0,maxFractionDigits:99,groupingEnabled:true,groupingSize:3,groupingSeparator:",",decimalSeparator:".",plusSign:"+",minusSign:"-",percentSign:"%",isInteger:false,type:c.PERCENT,showMeasure:false,style:"standard",parseAsString:false,preserveDecimals:false,roundingMode:o.RoundingMode.HALF_AWAY_FROM_ZERO,emptyString:NaN,showScale:true};o.oDefaultCurrencyFormat={minIntegerDigits:1,maxIntegerDigits:99,groupingEnabled:true,groupingSize:3,groupingSeparator:",",decimalSeparator:".",plusSign:"+",minusSign:"-",isInteger:false,type:c.CURRENCY,showMeasure:true,currencyCode:true,currencyContext:"standard",style:"standard",customCurrencies:undefined,parseAsString:false,preserveDecimals:false,roundingMode:o.RoundingMode.HALF_AWAY_FROM_ZERO,emptyString:NaN,showScale:true,ignorePrecision:true};o.oDefaultUnitFormat={minIntegerDigits:1,maxIntegerDigits:99,groupingEnabled:true,groupingSize:3,groupingSeparator:",",decimalSeparator:".",plusSign:"+",minusSign:"-",isInteger:false,type:c.UNIT,showMeasure:true,style:"standard",customUnits:undefined,allowedUnits:undefined,parseAsString:false,preserveDecimals:false,roundingMode:o.RoundingMode.HALF_AWAY_FROM_ZERO,emptyString:NaN,showScale:true};o.getInstance=function(e,t){return this.getFloatInstance(e,t)};o.getFloatInstance=function(e,t){var r=this.createInstance(e,t),i=this.getLocaleFormatOptions(r.oLocaleData,c.FLOAT);r.oFormatOptions=a({},this.oDefaultFloatFormat,i,e);return r};o.getIntegerInstance=function(e,t){var r=this.createInstance(e,t),i=this.getLocaleFormatOptions(r.oLocaleData,c.INTEGER);r.oFormatOptions=a({},this.oDefaultIntegerFormat,i,e);return r};o.getCurrencyInstance=function(e,t){var r=this.createInstance(e,t);var i=e&&e.currencyContext;var n=d(e);if(n){i=i||this.oDefaultCurrencyFormat.style;i="sap-"+i}var o=this.getLocaleFormatOptions(r.oLocaleData,c.CURRENCY,i);r.oFormatOptions=a({},this.oDefaultCurrencyFormat,o,e);r.oFormatOptions.trailingCurrencyCode=n;r._defineCustomCurrencySymbols();return r};o.getUnitInstance=function(e,t){var r=this.createInstance(e,t),i=this.getLocaleFormatOptions(r.oLocaleData,c.UNIT);r.oFormatOptions=a({},this.oDefaultUnitFormat,i,e);return r};o.getPercentInstance=function(e,t){var r=this.createInstance(e,t),i=this.getLocaleFormatOptions(r.oLocaleData,c.PERCENT);r.oFormatOptions=a({},this.oDefaultPercentFormat,i,e);return r};o.createInstance=function(e,i){var a=Object.create(this.prototype),o;if(e instanceof t){i=e;e=undefined}if(!i){i=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale()}a.oLocale=i;a.oLocaleData=r.getInstance(i);a.oOriginalFormatOptions=e;if(e){if(e.pattern){o=this.parseNumberPattern(e.pattern);Object.keys(o).forEach(function(t){e[t]=o[t]})}if(e.emptyString!==undefined){n(e.emptyString===""||e.emptyString===0||e.emptyString===null||e.emptyString!==e.emptyString,"The format option 'emptyString' must be either 0, null or NaN")}}return a};o.getDefaultUnitPattern=function(e){return"{0} "+e};o.getLocaleFormatOptions=function(e,t,r){var i,n;switch(t){case c.PERCENT:n=e.getPercentPattern();break;case c.CURRENCY:n=e.getCurrencyPattern(r);break;case c.UNIT:n=e.getDecimalPattern();break;default:n=e.getDecimalPattern()}i=this.parseNumberPattern(n);i.plusSign=e.getNumberSymbol("plusSign");i.minusSign=e.getNumberSymbol("minusSign");i.decimalSeparator=e.getNumberSymbol("decimal");i.groupingSeparator=e.getNumberSymbol("group");i.percentSign=e.getNumberSymbol("percentSign");i.pattern=n;switch(t){case c.UNIT:case c.FLOAT:case c.PERCENT:i.minFractionDigits=0;i.maxFractionDigits=99;break;case c.INTEGER:i.minFractionDigits=0;i.maxFractionDigits=0;i.groupingEnabled=false;break;case c.CURRENCY:i.minFractionDigits=undefined;i.maxFractionDigits=undefined;break}return i};o.parseNumberPattern=function(e){var t=0,r=0,i=0,n=false,a=0,o=0,s=e.indexOf(";"),u={Integer:0,Fraction:1},c=u.Integer;if(s!==-1){e=e.substring(0,s)}for(var l=0;l<e.length;l++){var g=e[l];switch(g){case",":if(n){a=o;o=0}n=true;break;case".":c=u.Fraction;break;case"0":if(c===u.Integer){t++;if(n){o++}}else{r++;i++}break;case"#":if(c===u.Integer){if(n){o++}}else{i++}break}}if(!a){a=o;o=0}return{minIntegerDigits:t,minFractionDigits:r,maxFractionDigits:i,groupingEnabled:n,groupingSize:a,groupingBaseSize:o}};o.prototype._defineCustomCurrencySymbols=function(){var e=this.oFormatOptions;var t=this.oLocaleData.getCurrencySymbols();var r=function(e,t){var r=[];var n;for(var a in e){n=e[a];if(r.indexOf(n)===-1){r.push(n)}else if(n!==undefined){t[n]=true;i.error("Symbol '"+n+"' is defined multiple times in custom currencies.",undefined,"NumberFormat")}}};if(e.customCurrencies&&typeof e.customCurrencies==="object"){this.mKnownCurrencySymbols={};this.mKnownCurrencyCodes={};Object.keys(e.customCurrencies).forEach(function(r){if(e.customCurrencies[r].symbol){this.mKnownCurrencySymbols[r]=e.customCurrencies[r].symbol}else{var i=e.customCurrencies[r].isoCode;if(i){this.mKnownCurrencySymbols[r]=t[i]}}this.mKnownCurrencyCodes[r]=r}.bind(this))}else{this.mKnownCurrencySymbols=t;this.mKnownCurrencyCodes=this.oLocaleData.getCustomCurrencyCodes()}this.mDuplicatedSymbols={};r(this.mKnownCurrencySymbols,this.mDuplicatedSymbols)};o.prototype.format=function(e,t){if(Array.isArray(e)){t=e[1];e=e[0]}var r="",a="",s="",u="",l="",g="",m=0,d=0,h=0,C=0,S=e<0,b=-1,D=Object.assign({},this.oFormatOptions),v=this.oOriginalFormatOptions,L=D.type===c.CURRENCY&&t==="INR"&&this.oLocale.getLanguage()==="en"&&this.oLocale.getRegion()==="IN",R,O,N,E,A,I;if(e===D.emptyString||isNaN(e)&&isNaN(D.emptyString)){return""}if(t&&D.customCurrencies&&!D.customCurrencies[t]){i.error("Currency '"+t+"' is unknown.");return""}if(D.type===c.UNIT){if(D.customUnits&&typeof D.customUnits==="object"){A=D.customUnits[t]}else{I=this.oLocaleData.getUnitFromMapping(t)||t;A=this.oLocaleData.getUnitFormat(I)}D.decimals=A&&(typeof A.decimals==="number"&&A.decimals>=0)?A.decimals:D.decimals;D.precision=A&&(typeof A.precision==="number"&&A.precision>=0)?A.precision:D.precision}if(D.type==c.CURRENCY){if(D.customCurrencies&&D.customCurrencies[t]){D.decimals=D.customCurrencies[t].decimals!==undefined?D.customCurrencies[t].decimals:D.decimals}}if(D.decimals!==undefined){D.minFractionDigits=D.decimals;D.maxFractionDigits=D.decimals}if(D.shortLimit===undefined||Math.abs(e)>=D.shortLimit){N=D.shortRefNumber===undefined?e:D.shortRefNumber;O=f(N,D,this.oLocaleData,L);if(O&&O.formatString!="0"){e=e/O.magnitude;if(D.shortDecimals!==undefined){D.minFractionDigits=D.shortDecimals;D.maxFractionDigits=D.shortDecimals}else{if(v.minFractionDigits===undefined&&v.maxFractionDigits===undefined&&v.decimals===undefined&&v.precision===undefined&&v.pattern===undefined){D.precision=2;D.minFractionDigits=0;D.maxFractionDigits=99}if(v.maxFractionDigits===undefined&&v.decimals===undefined){D.maxFractionDigits=99}}D.roundingMode=o.RoundingMode.HALF_AWAY_FROM_ZERO}}if((O||!D.ignorePrecision)&&D.precision!==undefined){D.maxFractionDigits=Math.min(D.maxFractionDigits,F(e,D.precision));D.minFractionDigits=Math.min(D.minFractionDigits,D.maxFractionDigits)}if(D.type==c.PERCENT){e=o._shiftDecimalPoint(e,2)}if(D.type==c.CURRENCY){var M=this.oLocaleData.getCurrencyDigits(t);if(D.customCurrencies&&D.customCurrencies[t]&&D.customCurrencies[t].decimals!==undefined){M=D.customCurrencies[t].decimals}if(D.maxFractionDigits===undefined){D.maxFractionDigits=M}if(D.minFractionDigits===undefined){D.minFractionDigits=M}}if(typeof e==="number"&&!D.preserveDecimals){e=y(e,D.maxFractionDigits,D.roundingMode)}if(e==0){S=false}l=this.convertToDecimal(e);if(l=="NaN"){return l}if(S){l=l.substr(1)}b=l.indexOf(".");if(b>-1){r=l.substr(0,b);a=l.substr(b+1)}else{r=l}if(r.length<D.minIntegerDigits){r=r.padStart(D.minIntegerDigits,"0")}else if(r.length>D.maxIntegerDigits){r="".padStart(D.maxIntegerDigits,"?")}if(a.length<D.minFractionDigits){a=a.padEnd(D.minFractionDigits,"0")}else if(a.length>D.maxFractionDigits&&!D.preserveDecimals){a=a.substr(0,D.maxFractionDigits)}d=r.length;if(D.groupingEnabled){if(L){var _=[3,2,2],w,x=0;m=r.length;while(m>0){w=_[x%3];m-=w;if(x>0){s=D.groupingSeparator+s}if(m<0){w+=m;m=0}s=r.substr(m,w)+s;x++}}else{h=D.groupingSize;C=D.groupingBaseSize||h;m=Math.max(d-C,0)%h||h;s=r.substr(0,m);while(d-m>=C){s+=D.groupingSeparator;s+=r.substr(m,h);m+=h}s+=r.substr(m)}}else{s=r}if(S){u=D.minusSign}u+=s;if(a){u+=D.decimalSeparator+a}if(O&&O.formatString&&D.showScale&&D.type!==c.CURRENCY){E=this.oLocaleData.getPluralCategory(r+"."+a);O.formatString=this.oLocaleData.getDecimalFormat(D.style,O.key,E);u=O.formatString.replace(O.valueSubString,u);u=u.replace(/'.'/g,".")}if(D.type===c.CURRENCY){g=D.pattern;if(O&&O.formatString&&D.showScale){var U;if(D.trailingCurrencyCode){U="sap-short"}else{U="short"}E=this.oLocaleData.getPluralCategory(r+"."+a);if(L){g=p(U,O.key,E)}else{g=this.oLocaleData.getCurrencyFormat(U,O.key,E)}g=g.replace(/'.'/g,".")}R=g.split(";");if(R.length===2){g=S?R[1]:R[0];if(S){u=u.substring(D.minusSign.length)}}if(!D.currencyCode){var k;if(D.customCurrencies&&typeof D.customCurrencies==="object"){k=this.mKnownCurrencySymbols[t]}else{k=this.oLocaleData.getCurrencySymbol(t)}if(k&&k!==t){t=k}}u=this._composeCurrencyResult(g,u,t,{showMeasure:D.showMeasure,negative:S,minusSign:D.minusSign})}if(D.type===c.PERCENT){g=D.pattern;u=g.replace(/[0#.,]+/,u);u=u.replace(/%/,D.percentSign)}if(D.showMeasure&&D.type===c.UNIT){E=this.oLocaleData.getPluralCategory(r+"."+a);n(E,"Cannot find plural category for "+(r+"."+a));var T=!D.allowedUnits||D.allowedUnits.indexOf(t)>=0;if(!T){n(T,"The given unit '"+t+"' is not part of the allowed unit types: ["+D.allowedUnits.join(",")+"].");return""}if(A){g=A["unitPattern-count-"+E];if(!g){g=A["unitPattern-count-other"]}n(g,"Cannot find pattern 'unitPattern-count-"+E+"' in '"+t+"'");if(!g){return""}u=g.replace("{0}",u)}else if(!D.unitOptional){n(A,"Unit '"+t+"' is unknown");return""}}if(sap.ui.getCore().getConfiguration().getOriginInfo()){u=new String(u);u.originInfo={source:"Common Locale Data Repository",locale:this.oLocale.toString()}}return u};o.prototype._composeCurrencyResult=function(e,t,r,i){var n=i.minusSign;e=e.replace(/[0#.,]+/,t);if(i.showMeasure&&r){var a="¤",o={"[:digit:]":/\d/,"[:^S:]":/[^\$\xA2-\xA5\u058F\u060B\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20BD\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6]/},s=e.indexOf(a),u=s<e.length/2?"after":"before",c=this.oLocaleData.getCurrencySpacing(u),l=u==="after"?r.charAt(r.length-1):r.charAt(0),g,f=o[c.currencyMatch],m=o[c.surroundingMatch],d;e=e.replace(a,r);g=u==="after"?e.charAt(s+r.length):e.charAt(s-1);if(f&&f.test(l)&&m&&m.test(g)){if(u==="after"){d=s+r.length}else{d=s}e=e.slice(0,d)+c.insertBetween+e.slice(d)}else if(i.negative&&u==="after"){n="\ufeff"+i.minusSign}}else{e=e.replace(/\s*\u00a4\s*/,"")}if(i.negative){e=e.replace(/-/,n)}return e};o.prototype.parse=function(e){var t=this.oFormatOptions,r=t.plusSign+this.oLocaleData.getLenientNumberSymbols("plusSign"),a=t.minusSign+this.oLocaleData.getLenientNumberSymbols("minusSign"),s=S(r+a),u=S(t.groupingSeparator),l=S(t.decimalSeparator),g="^\\s*(["+s+"]?(?:[0-9"+u+"]+|[0-9"+u+"]*"+l+"[0-9]*)(?:[eE][+-][0-9]+)?)\\s*$",f="^\\s*(["+s+"]?[0-9"+u+"]+)\\s*$",d=new RegExp(u,"g"),p=new RegExp(l,"g"),y=this.oLocaleData.getNumberSymbol("percentSign"),F=t.type===c.CURRENCY&&this.oLocale.getLanguage()==="en"&&this.oLocale.getRegion()==="IN",D,L,R,O,N=0,E,A;if(e===""){A=t.emptyString;if(t.parseAsString&&(t.emptyString===0||isNaN(t.emptyString))){A=t.emptyString+""}if(t.type===c.CURRENCY||t.type===c.UNIT){return[A,undefined]}else{return A}}if(t.groupingSeparator===t.decimalSeparator){i.error("The grouping and decimal separator both have the same value '"+t.groupingSeparator+"'. "+"They must be different from each other such that values can be parsed correctly.")}O=t.type===c.PERCENT?t.pattern:this.oLocaleData.getPercentPattern();if(O.charAt(0)==="%"){g=g.slice(0,1)+"%?"+g.slice(1)}else if(O.charAt(O.length-1)==="%"){g=g.slice(0,g.length-1)+"%?"+g.slice(g.length-1)}var I;if(t.type===c.UNIT){var M;if(t.customUnits&&typeof t.customUnits==="object"){M=t.customUnits}else{M=this.oLocaleData.getUnitFormats()}n(M,"Unit patterns cannot be loaded");if(t.allowedUnits){var _={};for(var w=0;w<t.allowedUnits.length;w++){var x=t.allowedUnits[w];_[x]=M[x]}M=_}var U=b(M,e);var k=false;I=U.cldrCode;if(I.length===1){R=I[0]}else if(I.length===0){if((t.unitOptional||!t.showMeasure)&&typeof e==="string"){U.numberValue=e}else{n(I.length===1,"Cannot find unit for input: '"+e+"'");return null}}else{n(I.length===1,"Ambiguous unit ["+I.join(", ")+"] for input: '"+e+"'");R=undefined;k=true}if(t.strictParsing){if(R&&!t.showMeasure||k){return null}}e=U.numberValue||e}var T;if(t.type===c.CURRENCY){T=v({value:e,currencySymbols:this.mKnownCurrencySymbols,customCurrencyCodes:this.mKnownCurrencyCodes,duplicatedSymbols:this.mDuplicatedSymbols,customCurrenciesAvailable:!!t.customCurrencies});if(!T){return null}if(t.strictParsing){if(t.showMeasure&&!T.currencyCode||T.duplicatedSymbolFound){return null}}e=T.numberValue;R=T.currencyCode;if(t.customCurrencies&&R===null||!t.showMeasure&&R){return null}}if(typeof e==="string"||e instanceof String){e=e.replace(/[\u202a\u200e\u202c\u202b\u200f]/g,"");e=e.replace(/\s/g,"")}E=m(e,this.oLocaleData,F);if(E){e=E.number}var P=h(e);if(t.isInteger&&!E&&!P){D=new RegExp(f)}else{D=new RegExp(g)}if(!D.test(e)){return t.type===c.CURRENCY||t.type===c.UNIT?null:NaN}e=e.replace(d,"");var Y=e.length;for(var W=0;W<Y;W++){var Z=e[W];if(r.includes(Z)){e=e.replace(Z,"+");break}else if(a.includes(Z)){e=e.replace(Z,"-");break}}e=e.replace(/^\+/,"");if(E){e=e.replace(p,".");e=o._shiftDecimalPoint(e,Math.round(Math.log(E.factor)/Math.LN10))}if(t.isInteger){var H;if(P){e=e.replace(p,".");H=C(e);if(H===undefined){return NaN}}else{H=parseInt(e)}N=t.parseAsString?e:H}else{e=e.replace(p,".");if(e.indexOf(y)!==-1){L=true;e=e.replace(y,"")}N=t.parseAsString?e:parseFloat(e);if(L){N=o._shiftDecimalPoint(N,-2)}}if(t.parseAsString){N=o._shiftDecimalPoint(e,0)}if(t.type===c.CURRENCY||t.type===c.UNIT){return[N,R]}return N};o.prototype.convertToDecimal=function(e){var t=""+e,r,i,n,a,o,s;if(t.indexOf("e")==-1&&t.indexOf("E")==-1){return t}var u=t.match(/^([+-]?)((\d+)(?:\.(\d+))?)[eE]([+-]?\d+)$/);r=u[1]=="-";i=u[2].replace(/\./g,"");n=u[3]?u[3].length:0;a=u[4]?u[4].length:0;o=parseInt(u[5]);if(o>0){if(o<a){s=n+o;t=i.substr(0,s)+"."+i.substr(s)}else{t=i;o-=a;for(var c=0;c<o;c++){t+="0"}}}else{if(-o<n){s=n+o;t=i.substr(0,s)+"."+i.substr(s)}else{t=i;o+=n;for(var c=0;c>o;c--){t="0"+t}t="0."+t}}if(r){t="-"+t}return t};o.prototype.getScale=function(){if(this.oFormatOptions.style!=="short"&&this.oFormatOptions.style!=="long"||this.oFormatOptions.shortRefNumber===undefined){return}var e=f(this.oFormatOptions.shortRefNumber,this.oFormatOptions,this.oLocaleData),t;if(e&&e.formatString){t=e.formatString.replace(s,"").replace(/'.'/g,".").trim();if(t){return t}}};o._shiftDecimalPoint=function(e,t){if(typeof t!=="number"){return NaN}var r="";var i=e.toString().toLowerCase().split("e");if(typeof e==="number"){t=i[1]?+i[1]+t:t;return+(i[0]+"e"+t)}else if(typeof e==="string"){if(parseFloat(e)===0&&t>=0){return u.test(e)?"0":e}var n=i[0].charAt(0);r=n==="-"?n:"";if(r){i[0]=i[0].slice(1)}e=i[0];var a=e.indexOf("."),o,s,c;if(a===-1){e=e+".";a=e.length-1}if(i[1]){a+=+i[1]}o=a+t;if(o<=0){e=e.padStart(e.length-o+1,"0");o=1}else if(o>=e.length-1){e=e.padEnd(o+1,"0");o=e.length-1}e=e.replace(".","");s=e.substring(0,o);c=e.substring(o);s=s.replace(/^(-?)0+(\d)/,"$1$2");return r+s+(c?"."+c:"")}else{return null}};function f(e,t,r,i){var n,a,o,u,l=t.style,g=t.precision!==undefined?t.precision:2;if(l!="short"&&l!="long"){return undefined}for(var f=0;f<15;f++){a=Math.pow(10,f);if(y(Math.abs(e)/a,g-1)<10){break}}o=a.toString();if(t.type===c.CURRENCY){if(t.trailingCurrencyCode){l="sap-short"}if(i){u=p(l,o,"other",true)}else{u=r.getCurrencyFormat(l,o,"other")}}else{u=r.getDecimalFormat(l,o,"other")}if(!u||u=="0"){return undefined}else{n={};n.key=o;n.formatString=u;var m=u.match(s);if(m){n.valueSubString=m[0];var d=n.valueSubString.indexOf(".");if(d==-1){n.decimals=0;n.magnitude=a*Math.pow(10,1-n.valueSubString.length)}else{n.decimals=n.valueSubString.length-d-1;n.magnitude=a*Math.pow(10,1-d)}}else{return undefined}}return n}function m(e,t,r){var i,n=1,a=10,o=t.getPluralCategories(),u,c={number:undefined,factor:n},l=function(r,a,o,l){if(l){u=p(o,a.toString(),r,true)}else{u=t.getDecimalFormat(o,a.toString(),r)}if(u){u=u.replace(/[\s\u00a0\u200F]/g,"");u=u.replace(/'.'/g,".");var g=u.match(s);if(g){var f=g[0];var m=u.replace(f,"");if(!m){return}var d=e.indexOf(m);if(d>=0){i=e.replace(m,"");i=i.replace(/\u200F/g,"");n=a;n*=Math.pow(10,1-f.length);if(c.number===undefined||i.length<c.number.length){c.number=i;c.factor=n}}}}};["long","short"].forEach(function(e){a=10;while(a<1e15){for(var t=0;t<o.length;t++){var r=o[t];l(r,a,e)}a=a*10}});if(r&&!i){a=10;while(a<1e15){for(var g=0;g<o.length;g++){var f=o[g];l(f,a,"short",true)}a=a*10}}if(!i){return}return c}function d(e){var t=sap.ui.getCore().getConfiguration().getFormatSettings().getTrailingCurrencyCode();if(e){if(e.trailingCurrencyCode!==undefined){t=e.trailingCurrencyCode}if(e.pattern){t=false}if(e.currencyCode===false){t=false}}return t}function p(e,t,r,i){var n,a={short:{"1000-one":"¤0000","1000-other":"¤0000","10000-one":"¤00000","10000-other":"¤00000","100000-one":"¤0 Lk","100000-other":"¤0 Lk","1000000-one":"¤00 Lk","1000000-other":"¤00 Lk","10000000-one":"¤0 Cr","10000000-other":"¤0 Cr","100000000-one":"¤00 Cr","100000000-other":"¤00 Cr","1000000000-one":"¤000 Cr","1000000000-other":"¤000 Cr","10000000000-one":"¤0000 Cr","10000000000-other":"¤0000 Cr","100000000000-one":"¤00000 Cr","100000000000-other":"¤00000 Cr","1000000000000-one":"¤0 Lk Cr","1000000000000-other":"¤0 Lk Cr","10000000000000-one":"¤00 Lk Cr","10000000000000-other":"¤00 Lk Cr","100000000000000-one":"¤0 Cr Cr","100000000000000-other":"¤0 Cr Cr"},"sap-short":{"1000-one":"0000 ¤","1000-other":"0000 ¤","10000-one":"00000 ¤","10000-other":"00000 ¤","100000-one":"0 Lk ¤","100000-other":"0 Lk ¤","1000000-one":"00 Lk ¤","1000000-other":"00 Lk ¤","10000000-one":"0 Cr ¤","10000000-other":"0 Cr ¤","100000000-one":"00 Cr ¤","100000000-other":"00 Cr ¤","1000000000-one":"000 Cr ¤","1000000000-other":"000 Cr ¤","10000000000-one":"0000 Cr ¤","10000000000-other":"0000 Cr ¤","100000000000-one":"00000 Cr ¤","100000000000-other":"00000 Cr ¤","1000000000000-one":"0 Lk Cr ¤","1000000000000-other":"0 Lk Cr ¤","10000000000000-one":"00 Lk Cr ¤","10000000000000-other":"00 Lk Cr ¤","100000000000000-one":"0 Cr Cr ¤","100000000000000-other":"0 Cr Cr ¤"}},o={short:{"1000-one":"0000","1000-other":"0000","10000-one":"00000","10000-other":"00000","100000-one":"0 Lk","100000-other":"0 Lk","1000000-one":"00 Lk","1000000-other":"00 Lk","10000000-one":"0 Cr","10000000-other":"0 Cr","100000000-one":"00 Cr","100000000-other":"00 Cr","1000000000-one":"000 Cr","1000000000-other":"000 Cr","10000000000-one":"0000 Cr","10000000000-other":"0000 Cr","100000000000-one":"00000 Cr","100000000000-other":"00000 Cr","1000000000000-one":"0 Lk Cr","1000000000000-other":"0 Lk Cr","10000000000000-one":"00 Lk Cr","10000000000000-other":"00 Lk Cr","100000000000000-one":"0 Cr Cr","100000000000000-other":"0 Cr Cr"}};o["sap-short"]=o["short"];var s=i?o:a;var u=s[e];if(!u){u=s["short"]}if(r!=="one"){r="other"}n=u[t+"-"+r];return n}function h(e){return e.indexOf("e")>0||e.indexOf("E")>0}function C(e){var t=o._shiftDecimalPoint(e,0);if(t.indexOf(".")>0&&!u.test(t.split(".")[1])){return undefined}var r=parseFloat(t);var i=""+r;if(h(i)){i=o._shiftDecimalPoint(i,0)}var n=parseInt(i);if(n!==r){return undefined}return n}function y(e,t,r){if(typeof e!=="number"){return NaN}r=r||o.RoundingMode.HALF_AWAY_FROM_ZERO;t=parseInt(t);if(typeof r==="function"){e=r(e,t)}else{if(r.match(/^[a-z_]+$/)){r=r.toUpperCase()}if(!t){return g[r](e)}e=o._shiftDecimalPoint(g[r](o._shiftDecimalPoint(e,t)),-t)}return e}function S(e){return e.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")}function F(e,t){var r=Math.floor(Math.log(Math.abs(e))/Math.LN10);return Math.max(0,t-r-1)}function b(e,t){var r={numberValue:undefined,cldrCode:[]};if(typeof t!=="string"){return r}var i=Number.POSITIVE_INFINITY;var n,a;for(n in e){for(a in e[n]){if(a.indexOf("unitPattern")===0){var o=e[n][a];var s=o.indexOf("{0}");var u=s>-1;if(u){var c=o.substring(0,s);var l=o.substring(s+"{0}".length);var g=t.startsWith(c)&&t.endsWith(l);var f=g&&t.substring(c.length,t.length-l.length);if(f){if(f.length<i){i=f.length;r.numberValue=f;r.cldrCode=[n]}else if(f.length===i&&r.cldrCode.indexOf(n)===-1){r.cldrCode.push(n)}}}else if(o===t){r.cldrCode=[n];var m;if(a.endsWith("-zero")){m="0"}else if(a.endsWith("-one")){m="1"}else if(a.endsWith("-two")){m="2"}r.numberValue=m;return r}}}}return r}function D(e,t){var r="",i,n;for(var a in t){n=t[a];if(e.indexOf(n)>=0&&r.length<n.length){r=n;i=a}}return{symbol:r,code:i}}function v(e){var t=e.value;var r=D(t,e.currencySymbols);if(!r.code){r=D(t,e.customCurrencyCodes);if(!r.code&&!e.customCurrenciesAvailable){var n=t.match(/(^[A-Z]{3}|[A-Z]{3}$)/);r.code=n&&n[0]}}if(r.code){var a=r.code.length-1;var o=r.code.charAt(a);var s;var u=/[\-\s]+/;if(/\d$/.test(o)){if(t.startsWith(r.code)){s=a+1;if(!u.test(t.charAt(s))){return undefined}}}else if(/^\d/.test(r.code)){if(t.endsWith(r.code)){s=t.indexOf(r.code)-1;if(!u.test(t.charAt(s))){return undefined}}}t=t.replace(r.symbol||r.code,"")}var c=false;if(e.duplicatedSymbols&&e.duplicatedSymbols[r.symbol]){r.code=undefined;c=true;i.error("The parsed currency symbol '"+r.symbol+"' is defined multiple "+"times in custom currencies.Therefore the result is not distinct.")}return{numberValue:t,currencyCode:r.code||undefined,duplicatedSymbolFound:c}}return o});