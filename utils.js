const rsplit = (text, delimiter) => {
	let result = [];
	for (let i = text.length; i > 0; i--) {
		if (text[i] === delimiter) {
			result.push(text.slice(i + 1));
			text = text.slice(0, i);
		}	
	}
	return result;
}

const removeLastWord = (text) => {
	return text.slice(0, text.lastIndexOf(" "));
}

const capText = (text, maxLength, cleanCut=true) => {
	if (text.length <= maxLength) return text;
	return cleanCut ? removeLastWord(text.slice(0, maxLength)) + " ..." : text.slice(0, maxLength-3) + "...";
}

const deriveAbbr = (text, length, defaultAbbr="") => {
	if (length === 0 || text.length < length) return defaultAbbr;
	const textArray = text.split(" ");
	const arrLen = textArray.length;
	if (arrLen >= length) {
		return textArray.slice(0, length).map(word => word[0]).join("");
	} else {
		let len = Math.floor(length / arrLen);
		let addLen = length % arrLen;
		return textArray.map((word, idx) => word.slice(0, idx < addLen ? len+1 : len )).join("");
	}
	
}

const toCamelCase = (text) => {
	return text.replace(/([-_][a-z])/ig, ($1) => {
		return $1.toUpperCase().replace('-', '').replace('_', '');
	});
}

const toKebabCase = (text) => {
	return text.replace(/([A-Z])/g, ($1) => {
		return "-" + $1.toLowerCase();
	});
}

const toSnakeCase = (text) => {
	return text.replace(/([A-Z])/g, ($1) => {
		return "_" + $1.toLowerCase();
	});
}

const toTitleCase = (text) => {
	return text.replace(/\w\S*/g, (txt) => {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}

const isBetween = (min, x, max, startIncl=true, endIncl=false) => {
	return (startIncl? x >= min : x > min) && ( endIncl? x <= max : x < max);
}

const fairRandom = (min, max) => {
	r = Math.random()
	for (let i = min; i < max; i++) {
		if (r < (i+1)/(max-min)) return i;
	}
}

const getKeyByValue = (object, value) => {
	return Object.keys(object).find(key => object[key] === value);
}

const existParam = (key, url=null) => {
	const urlParams = new URLSearchParams(new URL(url).search || window.location.search);
	return urlParams.has(key);
}

const countParam = (url=null) => {
	urlParams = new URLSearchParams(new URL(url).search || window.location.search);
	paramsArr = Array.from(urlParams.keys());
	return paramsArr.length;
}

const getParam = (key, url=null) => {
	urlParams = new URLSearchParams(new URL(url).search || window.location.search);
	return existParam(key, url) ? urlParams.get(key) : false;
}

const removeParam = (key, url=null) => {
	const newUrl = new URL(url || window.location.href);
	newUrl.searchParams.delete(key);
	return newUrl.toString();
	// var fullUrl = url || location.href;
	// var url = fullUrl.split("?")[0],
	// 	param,
	// 	paramsArr = [],
	// 	queryString = fullUrl.indexOf("?") !== -1 ? fullUrl.split("?")[1] : "";
	// if (queryString !== "") {
	// 	paramsArr = queryString.split("&");
	// 	for (var i = paramsArr.length - 1; i >= 0; i -= 1) {
	// 		param = paramsArr[i].split("=")[0];
	// 		if (param === key) {
	// 			paramsArr.splice(i, 1);
	// 		}
	// 	}
	// 	url += "?" + paramsArr.join("&");
	// }
	// window.history.replaceState(null, null, url);
	// return url;
}

const updateParam = (key, value, url=null) => {
	const newUrl = new URL(url || window.location.href);
	if (newUrl.searchParams.has(key)) {
		newUrl.searchParams.set(key, value);
	}
	return newUrl.toString();

	// if (existParam(key)) {
	// 	url = window.location.href.split("?")[0];
	// 	// params = window.location.search.substr(1);
	// 	urlParams = new URLSearchParams(window.location.search);
	// 	paramsArr = Array.from(urlParams.entries());
	// 	url += "?";
	// 	preUrl = [];
	// 	for (let i = 0; i < paramsArr.length; i++) {
	// 		if (paramsArr[i][0] == key) {
	// 			if (value) {
	// 				paramsArr[i][1] = value;
	// 			} else {
	// 				paramsArr.splice(i, 1);
	// 			}
	// 		}
	// 		keyValue = paramsArr[i].join("=");
	// 		preUrl.push(keyValue)
	// 		// url += paramsArr[i][0] + "=" + paramsArr[i][1] + ( i < (paramsArr.length-1) ) ? "&" : "";
	// 	}
	// 	url += preUrl.join("&");
	// 	window.history.replaceState(null, null, url);
	// 	return url
	// 	// if (countParam() == 1) {
	// 	// 	return url;
	// 	// 	// regex = new RegExp(`${key}=[a-zA-z\d]+(.*?)`, "g");
	// 	// 	// matches = params.match(regex);
	// 	// }
	// 	// else {
	// 	// 	regex = new RegExp(`(.*?)&${key}=[a-zA-z\d]+(.*)`, "g");
	// 	// 	matches = params.match(regex);
	// 	// 	matches.shift();
	// 	// 	url += "?";
	// 	// 	for (let i = 0; i < matches.length; i++) {
	// 	// 		url += matches[i];
	// 	// 	}
	// 	// }
	// } else {
	// 	return false;
	// }
}

const setParam = (key, value, update=false) => {
	const newUrl = new URL(url || window.location.href);
	if (!newUrl.searchParams.has(key)) {
		newUrl.searchParams.set(key, value);
	} else if (update) {
		newUrl.searchParams.set(key, value);
	}
	return newUrl.toString();

	// if (update && existParam(key)) {
	// 	update_url = updateParam(key, value);
	// 	return update_url
	// } else {
	// 	var url = location.href;
	// 	url += (url.includes("?") ? "&" : "?") + key + "=" + encodeURIComponent(value);
	// 	window.history.replaceState(null, null, url);
	// 	return url;
	// }
}

/**
  * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
  * 
  * @param {String} text The text to be rendered.
  * @param {String} [font=null] The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana"). Defaults to 'normal 16px Times New Roman'.
  * 
  * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
  */
const getTextWidth = (textOrElement, font=null) => {
	// re-use canvas object for better performance
	const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
	const context = canvas.getContext("2d");
	let text;
	if (typeof textOrElement === 'string') {
		text = textOrElement;
	} else if (typeof textOrElement === 'HTMLElement') {
		text = textOrElement.innerText;
		font = getCanvasFont(textOrElement);
	}
	context.font = font;
	const metrics = context.measureText(text);
	return metrics.width;
}

const getCssStyle = (element, prop) => {
	return window.getComputedStyle(element, null).getPropertyValue(prop);
}

const getCanvasFont = (el = document.body) => {
	const fontWeight = getCssStyle(el, 'font-weight') || 'normal';
	const fontSize = getCssStyle(el, 'font-size') || '16px';
	const fontFamily = getCssStyle(el, 'font-family') || 'Times New Roman';

	return `${fontWeight} ${fontSize} ${fontFamily}`;
}

const getCSSVar = (name) => {
	return getComputedStyle(document.documentElement).getPropertyValue((name.startsWith("--")) ? name : `--${name}`);
}

const setCSSVar = (name, value) => {
	document.documentElement.style.setProperty(name, value);
}

const cssOps = {
	getTextWidth,
	getCssStyle,
	getCanvasFont,
	getCSSVar,
	setCSSVar
}

const paramOps = {
	exist: existParam,
	count: countParam,
	get: getParam,
	remove: removeParam,
	update: updateParam,
	set: setParam
}

const toCase = {
	camel: toCamelCase,
	snake: toSnakeCase,
	title: toTitleCase,
	kebab: toKebabCase,
	ToTitleCase: toTitleCase,
	to_snake_case: toSnakeCase
}

const textOps = {
	rsplit,
	capText,
	removeLastWord,
	deriveAbbr,
	toCase
}

const math = {
	fairRandom,
	isBetween
}