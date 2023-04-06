/* ----------------------------------- TEXT --------------------------------- */

/**
 * Counts the number of occurrences of the specified character in the text.
 * @param {String} text The text to be searched.
 * @param {String} occurence The character to be searched for.
 * @param {Boolean} [allowOverlapping=false] If true, overlapping occurrences will be counted. Defaults to false.
 * @returns {Number} The number of occurrences of the character in the text.
 * @example
 * count("This is a long text", "i") // 3
 * // Note: This function is case sensitive.
 * // Note: uses regex, so it is not recommended to use this function for large texts.
 */
const count = (text, occurrence, allowOverlapping = false) => {
	if (occurrence.length <= 0) return false;

	let n = 0, pos = 0,
		step = allowOverlapping ? 1 : occurrence.length;

	while (true) {
		pos = text.indexOf(occurrence, pos);
		if (pos >= 0) {
			++n;
			pos += step;
		} else break;
	}
	return n;
	// return (text.match(new RegExp(occurence, "g")) || []).length;
	// return text.split(occurrence).length - 1;
}

/**
 * Split the text by the delimiter, but only split the text from the right.
 * @param {String} text The text to be split.
 * @param {String} [delimiter=" "] The delimiter to split the text by. Defaults to space.
 * @returns {string[]} An array of strings.
 * @example
 * rsplit("This is a long text", " ") // ["text", "long", "a", "is", "This"]
 */
const rsplit = (text, delimiter = " ") => {
	return text.split(delimiter).reverse();
}

const rsplit2 = (text, delimiter = " ") => {
	let result = [];
	for (let i = text.length; i > 0; i--) {
		if (text[i] === delimiter) {
			result.push(text.slice(i + 1));
			text = text.slice(0, i);
		}
	}
	return result;
}

/**
 * Reverse the text. Optionally reverse every n characters.
 * @param {String} text The text to be reversed.
 * @param {Number} [every=1] Reverse {@link every} characters. Defaults to 1.
 * @returns {String} The reversed text.
 * @example
 * reverse("123456789") // "987654321"
 * reverse("123456789", 3) // "789456123"
*/
const reverse = (text, every = 1) => {
	let result = "";
	for (let i = 0; i < text.length; i+=every) {
		result = text.substring(i, i+every) + result;
	}
	return result;
}

/**
 * Removes the last word from the text.
 * @param {String} text The text to be modified.
 * @param {Number} minLength The minimum length of cohesive non space characters to be considered as word.
 * @returns {String} The text without the last word.
*/
const removeLastWord = (text, minLength = 1) => {
	return text.slice(0, text.substring(0, text.length - minLength).lastIndexOf(" "));
}

/**
 * Truncates the text to the specified length.
 * @param {String} text The text to be truncated.
 * @param {Number} maxLength The maximum length of the text.
 * @param {Boolean} cleanCut If true, the text will be truncated at the last space.
 * @returns {String} The truncated text.
 * @example
 * capText("This is a long text", 10) // "This is a ..."
 * capText("This is a long text", 10, false) // "This is a..."
 * capText("This is a long text", 10, true) // "This is ..."
*/
const capText = (text, maxLength, cleanCut = true) => {
	if (text.length <= maxLength) return text;
	return cleanCut ? removeLastWord(text.slice(0, maxLength), 3) + " ..." : text.slice(0, maxLength - 3) + "...";
}

/**
 * Derives an abbreviation from the text.
 * @param {String} text The text to be abbreviated.
 * @param {Number} length The length of the abbreviation.
 * @param {String} [defaultAbbr=""] The default abbreviation to be returned if the text is too short.
 * @returns {String} The abbreviation.
 * @example
 * deriveAbbr("This is a long text", 3) // "Til"
 * deriveAbbr("This is a long text", 3, "N/A") // "N/A"
 * deriveAbbr("This is a long text", 5) // "Tilte"
*/
const deriveAbbr = (text, length, defaultAbbr = "") => {
	if (length === 0 || text.length < length) return defaultAbbr;
	const textArray = text.split(" ");
	const arrLen = textArray.length;
	if (arrLen >= length) {
		return textArray.slice(0, length).map(word => word[0]).join("");
	} else {
		let len = Math.floor(length / arrLen);
		let addLen = length % arrLen;
		return textArray.map((word, idx) => word.slice(0, idx < addLen ? len + 1 : len)).join("");
	}

}

/**
 * Pads the string with the specified character to the specified length.
 * @param {String} text The string to be padded.
 * @param {Number} length The length of the padded string.
 * @param {String} char The character to pad the string with.
 * @returns {String} The padded string.
 * @example
 * pad("123", 5, "0") // "00123"
 * pad("123", 5, " ") // "  123"
 * pad("123", 5, "abc") // "abc123"
 * pad("123", 3, "0") // "123"
*/
const pad = (text, length, char) => {
	return text.length < length ? pad(char + text, length, char) : text;
}

/**
 * Splits the text into chunks of the specified length.
 * @param {String} text The text to be split.
 * @param {Number} length The length of the chunks.
 * @param {Boolean} [startFromRight=false] If true, the text will be split from the right.
 * @returns {String[]} An array of strings.
 * @example
 * splitEvery("123456789", 3) // ["123", "456", "789"]
 * splitEvery("123456789", 4) // ["1234", "5678", "9"]
 * splitEvery("123456789", 5) // ["12345", "6789"] 
*/
const splitEvery = (text, length, startFromRight=false) => {
	let result = [];
	for (let i = 0; i < text.length; i += length) {
		if (startFromRight) {
			result.push(text.slice((text.length - i - length > 0) ? text.length - i - length : 0, (text.length - i > text.length % length) ? text.length - i : text.length % length));
		} else {
			result.push(text.slice(i, i + length));
		}
	}
	return result;
}

/**
 * Tries to split the text into equally large {@link numberOfChunks} chunks.
 * @param {String} text The text to be split.
 * @param {Number} numberOfChunks The number of chunks.
 * @returns {String[]} An array of strings.
 * @example
 * splitEqually("123456789", 3) // ["123", "456", "789"]
 * splitEqually("0123456789", 4) // ["01", "23", "456", "789"]
 * splitEqually("0123456789", 5) // ["01", "23", "45", "67", "89"]
*/
const splitEqually = (text, numberOfChunks) => {
	let result = [];
	let chunkSize = Math.floor(text.length / numberOfChunks);
	const remainder = text.length % numberOfChunks;
	for (let i = 0; i < text.length; i += chunkSize) {
		result.push(text.slice(i, i + chunkSize + (i < remainder ? 1 : 0)));
	}
	return result;
}

/**
 * Prettyfies the number by adding the specified delimiter for thousands and decimals.
 * @param {Number} number The number to be prettified.
 * @param {Number} [round=0] The number of decimals to round to. Defaults to 0. If negative, the number will be rounded in decimal places.
 * @param {Number} [padZeroLength=0] The length that the prettified number should have padded with zeros. Defaults to 0.
 * @param {String} [delimiter1000=","] The delimiter for thousands. Defaults to comma.
 * @param {String} [delimiterDecimal="."] The delimiter for decimals. Defaults to dot.
 * @returns {String} The prettified number.
 * @example
 * prettifyNumber(123456789) // "123,456,789"
 * prettifyNumber(123456789, ".", ",") // "123.456.789"
 * prettifyNumber(123456789.123, ".", ",") // "123.456.789,123"
*/
const prettifyNumber = (number = 0, round = 0, padZeroLength = 0, delimiter1000 = ',', delimiterDecimal = '.') => {
	const numStr = number.toString();
	let result = "", j = 0;
	const [num, dec] = numStr.includes(".") ? numStr.split(".") : [numStr, ""];
	result = splitEvery(num, 3, true).reverse().join(delimiter1000);
	// for (let i = num.length - 1; i >= 0; i--) {
	// 	result = num[i] + result;
	// 	j++;
	// 	if (j % 3 === 0 && i !== 0) {
	// 		result = delimiter1000 + result;
	// 	}
	// }
	if (dec !== "") {
		if (round < 0) {
			const capped = dec.substring(0, -round);
			let rounded = ((dec[capped.length] < 5) ? capped : pad((parseInt(capped) + 1).toString(), capped.length, "0")); // Edge case for .9 not caught
			console.log(pad((parseInt(capped) + 1).toString(), capped.length, "0"));
			if (rounded.length > capped.length) rounded = rounded.substring(rounded.length-capped.length);
			result += delimiterDecimal + (((rounded.match(/0/g) || []).length == rounded.length) ? "0"  : rounded);
		} else result += delimiterDecimal + dec;
	}
	return pad(result, padZeroLength, "0");
}

console.log(prettifyNumber(123456789.999, -2, 5, ".", ","));

/**
 * Prettifys the array by joining the elements with the specified joint and specialLast.
 * @param {Array} array The array to be prettified.
 * @param {String} [joint=", "] The joint to join the elements with. Defaults to comma and space.
 * @param {String} [specialLast=joint] The joint to join the last element with. Defaults to {@link joint}.
 * @returns {String} The prettified array.
 * @example
 * prettifyArray(["a", "b", "c"]) // "a, b, c"
 * prettifyArray(["a", "b", "c"], " and ") // "a and b and c"
 * prettifyArray(["a", "b", "c"], " and ", " and also ") // "a and b and also c"
*/
const prettifyArray = (array, joint = ', ', specialLast = joint) => {
	if (array.length === 0) return "";
	if (array.length === 1) return array[0];
	return array.slice(0, -1).join(joint) + specialLast + array[array.length - 1];
}






/* ----------------------------------- CASE --------------------------------- */

/**
 * Converts a string to camel case.
 * @param {string} text The text to be converted.
 * @returns {string} The converted text.
 * @example
 * toCamelCase("this-is-a-long-text") // "thisIsALongText"
 * toCamelCase("this_is_a_long_text") // "thisIsALongText"
 * toCamelCase("This is a long text") // "thisIsALongText"
 * toCamelCase("ThisIsALongText") // "thisIsALongText"
*/
const toCamelCase = (text) => {
	return text.replace(/([-_][a-z])/ig, ($1) => {
		return $1.toUpperCase().replace('-', '').replace('_', '');
	});
}

/**
 * Converts a string to pascal case.
 * @param {string} text The text to be converted.
 * @returns {string} The converted text.
 * @example
 * toPascalCase("this-is-a-long-text") // "ThisIsALongText"
 * toPascalCase("this_is_a_long_text") // "ThisIsALongText"
 * toPascalCase("This is a long text") // "ThisIsALongText"
 * toPascalCase("ThisIsALongText") // "ThisIsALongText"
*/
const toPascalCase = (text) => {
	return toCamelCase(text).replace(/^[a-z]/, (txt) => {
		return txt.toUpperCase();
	});
}

/**
 * Converts a string to kebab case.
 * @param {string} text The text to be converted.
 * @returns {string} The converted text.
 * @example
 * toKebabCase("this-is-a-long-text") // "this-is-a-long-text"
 * toKebabCase("this_is_a_long_text") // "this-is-a-long-text"
 * toKebabCase("This is a long text") // "this-is-a-long-text"
 * toKebabCase("ThisIsALongText") // "this-is-a-long-text"
*/
const toKebabCase = (text) => {
	return text.replace(/([A-Z])/g, (txt) => {
		return "-" + txt.toLowerCase();
	});
}

/**
 * Converts a string to snake case.
 * @param {string} text The text to be converted.
 * @returns {string} The converted text.
 * @example
 * toSnakeCase("this-is-a-long-text") // "this_is_a_long_text"
 * toSnakeCase("this_is_a_long_text") // "this_is_a_long_text"
 * toSnakeCase("This is a long text") // "this_is_a_long_text"
 * toSnakeCase("ThisIsALongText") // "this_is_a_long_text"
*/
const toSnakeCase = (text) => {
	return text.replace(/([A-Z])/g, (txt) => {
		return "_" + txt.toLowerCase();
	});
}

/**
 * Converts a string to title case.
 * @param {string} text The text to be converted.
 * @returns {string} The converted text.
 * @example
 * toTitleCase("this-is-a-long-text") // "This Is A Long Text"
 * toTitleCase("this_is_a_long_text") // "This Is A Long Text"
 * toTitleCase("This is a long text") // "This Is A Long Text"
 * toTitleCase("ThisIsALongText") // "This Is A Long Text"
*/
const toTitleCase = (text) => {
	return text.replace(/\w\S*/g, (txt) => {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}





/* ----------------------------------- CSS --------------------------------- */

/**
 * Gets the inverted color for a given hex color.
 * @param {String} hex The hex color to get the inverted color for.
 * @returns {String} The inverted color.
 * @example
 * invertColor("#FF0000") // "#00FFFF"
 * invertColor("#000000") // "#FFFFFF"
*/
const invertColor = (hex) => {
	let { r, g, b } = hexToRgb(hex);
	return `#${[r, g, b].forEach(el => pad((255 - el).toString(16), 2, '0')).join('')}`;

	// r = (255 - r).toString(16);
	// g = (255 - g).toString(16);
	// b = (255 - b).toString(16);

	// return "#" + pad(r, 2, '0') + pad(g, 2, '0') + pad(b, 2, '0');
}

/**
 * Gets the contrast color for a given hex color.
 * @param {String} hex The hex color to get the contrast color for.
 * @param {Number} [treshold=150] The treshold to use for the contrast color. Default is 150.
 * @returns {String} The contrast color. Either Black ('#000000') or White ('#FFFFFF').
 * @example
 * getContrast("#FF0000") // "#FFFFFF"
 * getContrast("#000000") // "#FFFFFF"
 * getContrast("#FFFFFF") // "#000000"
*/
const getContrast = (hex, treshold = 150) => {
	let { r, g, b } = hexToRgb(hex);
	return (r * 0.299 + g * 0.587 + b * 0.114) > treshold ? '#000000' : '#FFFFFF';
}

/**
 * Converts a hex color to an RGB color.
 * @param {String} hex The hex color to convert.
 * @returns {Object} The RGB color.
 * @example
 * hexToRgb("#FF0000") // {r: 255, g: 0, b: 0}
 * hexToRgb("#F00") // {r: 255, g: 0, b: 0}
 * hexToRgb("FF0000") // {r: 255, g: 0, b: 0}
 * hexToRgb("F00") // {r: 255, g: 0, b: 0}
 * hexToRgb("red") // null
*/
const hexToRgb = (hex) => {
	// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegex, (m, r, g, b) => {
		return r + r + g + g + b + b;
	});
	const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return rgb ? {
		r: parseInt(rgb[1], 16),
		g: parseInt(rgb[2], 16),
		b: parseInt(rgb[3], 16)
	} : null;
}
const hexToRgba = (hex) => {
	hex = hex.replace('#', '');
	const len = hex.length
	if (![3, 4, 6, 8].includes(len)) return null;
	switch (len) {
		case 3:
			[r, g, b] = hex.split('').map(el => parseInt(el, 16));
			a = null;
		case 4:
			[r, g, b, a] = hex.split('').map(el => parseInt(el, 16));
			break;
		case 6:
			[r, g, b] = splitEvery(hex, 2).map(el => parseInt(el, 16));
			a = null;
			break;
		case 8:
			[r, g, b, a] = splitEvery(hex, 2).map(el => parseInt(el, 16));
			break;
		default:
			return null;
	}
	return { r, g, b, a };
}

const rgbToHex = (r, g, b) => {
	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

const rgbToHsl = (r, g, b) => {
	r /= 255, g /= 255, b /= 255;
	const max = Math.max(r, g, b), min = Math.min(r, g, b);
	let h, s, l = (max + min) / 2;
	return max == min ? h = s = 0 : (s = l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min), h = max == r ? (g - b) / (max - min) + (g < b ? 6 : 0) : max == g ? (b - r) / (max - min) + 2 : (r - g) / (max - min) + 4, h /= 6);
}

/**
  * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
  * @param {String|HTMLElement} textOrElement The text to be rendered or an HTMLElement whose innerText should be measured.
  * @param {String} [font=null] The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana"). 
  * If omitted tries to extract css styles first from given element then body otherwise defaults to 'normal 16px Times New Roman'.
  * @returns {Number} width of the text.
  * // note: this is not the same as the width of the element that contains the text.
  * // note: uses internally the getCanvasFont function to extract the font from the element.
  * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
*/
const getTextWidth = (textOrElement, font = null) => {
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

/**
 * Returns the value of the given css property of the given element.
 * @param {HTMLElement} element The element to get the css property from.
 * @param {String} prop The css property to get.
 * @returns {String} The value of the css property.
*/
const getCssStyle = (element, prop) => {
	return window.getComputedStyle(element, null).getPropertyValue(prop);
}

/**
 * Returns the css font descriptor of the given element.
 * @param {HTMLElement} [el=document.body] The element to get the font from.
 * @returns {String} The css font descriptor.
 * // Note: if the element does not have a font-weight, font-size or font-family property, it will default to 'normal', '16px' and 'Times New Roman' respectively.
*/
const getCanvasFont = (el = document.body) => {
	const fontWeight = getCssStyle(el, 'font-weight') || 'normal';
	const fontSize = getCssStyle(el, 'font-size') || '16px';
	const fontFamily = getCssStyle(el, 'font-family') || 'Times New Roman';

	return `${fontWeight} ${fontSize} ${fontFamily}`;
}

/**
 * Returns the value of the given css variable.
 * @param {String} name The name of the css variable.
 * @param {HTMLElement} [el=document.documentElement] The element to get the css variable from.
 * @returns {String} The value of the css variable.
 * // Note: if the name does not start with '--' it will be prefixed with '--'.
 * // Note: if the css variable is not defined, it will return an empty string.
*/
const getCSSVar = (name, el = document.documentElement) => {
	return getComputedStyle(el).getPropertyValue((name.startsWith("--")) ? name : `--${name}`);
}

/**
 * Sets the value of the given css variable.
 * @param {String} name The name of the css variable.
 * @param {String} value The value of the css variable.
 * @param {HTMLElement} [el=document.documentElement] The element to set the css variable on.
 * // Note: if the name does not start with '--' it will be prefixed with '--'.
 * // Note: if the value is not a string, it will be converted to one. Don't forget the values often require units!
*/
const setCSSVar = (name, value, el = document.documentElement) => {
	el.style.setProperty((name.startsWith("--")) ? name : `--${name}`, value);
}





/* ----------------------------------- PARAMS --------------------------------- */

/**
 * Check if a parameter exists in the URL
 * @param {string} key - The parameter key
 * @param {string} url - The URL to check. Defaults to current URL
 * @return {boolean}
 * @example
 * existParam("key", "https://example.com/?key=value") // true
 * existParam("key", "https://example.com/?key") // true
*/
const existParam = (key, url = null) => {
	const urlParams = new URLSearchParams(new URL(url).search || window.location.search);
	return urlParams.has(key);
}

/**
 * Count the number of parameters in the URL
 * @param {string} url - The URL to check. Defaults to current URL
 * @return {number} The number of parameters
 * @example
 * countParam("https://example.com/?key=value") // 1
 * countParam("https://example.com/?key=value&key2=value2") // 2
*/
const countParam = (url = null) => {
	urlParams = new URLSearchParams(new URL(url).search || window.location.search);
	paramsArr = Array.from(urlParams.keys());
	return paramsArr.length;
}

/**
 * Get the value of a parameter in the URL
 * @param {string} key - The parameter key
 * @param {string} url - The URL to check. Defaults to current URL
 * @return {string|boolean} The value of the parameter or false if it doesn't exist
 * @example
 * getParam("key", "https://example.com/?key=value") // "value"
 * getParam("key", "https://example.com/?key") // ""
 * getParam("key", "https://example.com/") // false
 * getParam("key", "https://example.com/?key2=value2") // false
 * getParam("key", "https://example.com/?key=value&key2=value2") // "value"
*/
const getParam = (key, url = null) => {
	urlParams = new URLSearchParams(new URL(url).search || window.location.search);
	return existParam(key, url) ? urlParams.get(key) : false;
}

/**
 * Remove a parameter from the URL
 * @param {string} url - The URL to check. Defaults to current URL
 * @return {string} The URL with the parameter removed
 * @example
 * removeParam("key", "https://example.com/?key=value") // "https://example.com/"
*/
const removeParam = (key, url = null) => {
	const newUrl = new URL(url || window.location.href);
	newUrl.searchParams.delete(key);
	return newUrl.toString();
}

/**
 * Update the value of a parameter in the URL
 * @param {string} key - The parameter key
 * @param {string} value - The new value of the parameter
 * @param {string} url - The URL to check. Defaults to current URL
 * @return {string} The URL with the parameter updated
 * @example
 * updateParam("key", "value2", "https://example.com/?key=value") // "https://example.com/?key=value2"
 * updateParam("key", "value2", "https://example.com/?key") // "https://example.com/?key=value2"
*/
const updateParam = (key, value, url = null) => {
	const newUrl = new URL(url || window.location.href);
	if (newUrl.searchParams.has(key)) {
		newUrl.searchParams.set(key, value);
	}
	return newUrl.toString();
}

/**
 * Set a parameter in the URL
 * @param {string} key - The parameter key
 * @param {string} value - The value of the parameter
 * @param {boolean} update - Whether to update the parameter if it already exists. Defaults to false
 * @param {string} url - The URL to check. Defaults to current URL
 * @return {string} The URL with the parameter set
 * @example
 * setParam("key", "value", "https://example.com/") // "https://example.com/?key=value"
 * setParam("key", "value", "https://example.com/?key=value2") // "https://example.com/?key=value2"
 * setParam("key", "value", "https://example.com/?key=value2", true) // "https://example.com/?key=value"
 * setParam("key", "value", "https://example.com/?key2=value2", true) // "https://example.com/?key2=value2&key=value"
*/
const setParam = (key, value, url = null, update = false) => {
	const newUrl = new URL(url || window.location.href);
	if (!newUrl.searchParams.has(key)) {
		newUrl.searchParams.set(key, value);
	} else if (update) {
		newUrl.searchParams.set(key, value);
	}
	return newUrl.toString();
}





/* ----------------------------------- OBJECT --------------------------------- */

/**
 * Get the key of an object by its value
 * @param {Object} object - The object to search in
 * @param {*} value - The value to search for
 * @return {String} key
 * @example
 * const object = {a: 1, b: 2, c: 3};
 * getKeyByValue(object, 2); // b
 * getKeyByValue(object, 4); // undefined
*/
const getKeyByValue = (object, value) => {
	return Object.keys(object).find(key => object[key] === value);
}





/* ----------------------------------- MATH --------------------------------- */

/**
 * Checks if a number is between two numbers.
 * @param {number} min The minimum number.
 * @param {number} x The number to check.
 * @param {number} max The maximum number.
 * @param {boolean} startIncl Whether to include the minimum number. Default: true.
 * @param {boolean} endIncl Whether to include the maximum number. Default: false.
 * @returns {number}
*/
const isBetween = (min, x, max, startIncl = true, endIncl = false) => {
	return (startIncl ? x >= min : x > min) && (endIncl ? x <= max : x < max);
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * Using Math.random and/or Math.round() will give you a non-uniform distribution!
 * @param {number} min
 * @param {number} max
 * @returns {number}
 * @example
 * fairRandom(1, 3) // 1 or 2
 * fairRandom(2, 5) // 2, 3 or 4
*/
const fairRandom = (min, max) => {
	r = Math.random()
	for (let i = min; i < max; i++) {
		if (r < (i + 1) / (max - min)) return i;
	}
}


/**
 * Round a number to the next best number
 * @param {number} number - The number to round
 * @param {boolean} onlyBaseTen - Whether to only round to the next base 10 number. Defaults to false
 * @param {boolean} roundDown - Whether to round down. Defaults to true
 * @return {number} The rounded number
 * @example
 * roundToNextBest(1234) // 1000
 * roundToNextBest(1234, true) // 1000
 * roundToNextBest(1234, true, false) // 10000
 * roundToNextBest(1234, true, false) // 2000
 * roundToNextBest(0.1234) // 0.1
*/
const roundToNextBest = (number, onlyBaseTen = false, roundDown = true) => {
	let res = 0;
	let multi = 0;
	const splitNumber = number.toString().split('.');
	const decimalPlaces = splitNumber[1] ? splitNumber[1].length - parseInt(splitNumber[1]).toString().length : 0;
	if (parseInt(splitNumber[0]) != 0) {
		multi = onlyBaseTen ? 1 : (splitNumber[0][0]);
		res = multi * (10 ** (splitNumber[0].length - (roundDown ? 1 : 0)));
	} else {
		multi = onlyBaseTen ? 1 : (parseInt(splitNumber[1]).toString()[0] - (roundDown ? 0 : -1));
		res = Math.round(multi * (10 ** (-decimalPlaces - (roundDown ? 1 : 0))) * 10 ** decimalPlaces) / 10 ** decimalPlaces;
	}
	return res;
}