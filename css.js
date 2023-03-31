import { pad, splitEvery } from './text.js';


/**
 * Gets the inverted color for a given hex color.
 * @param {String} hex The hex color to get the inverted color for.
 * @returns {String} The inverted color.
 * @example
 * invertColor("#FF0000") // "#00FFFF"
 * invertColor("#000000") // "#FFFFFF"
*/
const invertColor = (hex) => {
	let {r,g,b} = hexToRgb(hex);
	return `#${ [r,g,b].forEach( el => pad((255-el).toString(16), 2, '0') ).join('') }`;
	
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
const getContrast = (hex, treshold=150) => {
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
	if (![3,4,6,8].includes(len)) return null;
	switch (len) {
		case 3:
			[r,g,b] = hex.split('').map( el => parseInt(el, 16) );
			a = null;
		case 4:
			[r,g,b,a] = hex.split('').map( el => parseInt(el, 16) );
			break;
		case 6:
			[r,g,b] = splitEvery(hex, 2).map( el => parseInt(el, 16) );
			a = null;
			break;
		case 8:
			[r,g,b, a] = splitEvery(hex, 2).map( el => parseInt(el, 16) );
			break;
		default:
			return null;
	}
	return {r,g,b,a};
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

export { getTextWidth, getCanvasFont, getCssStyle, getCSSVar, setCSSVar, hexToRgb, rgbToHex, rgbToHsl, getContrast, invertColor };