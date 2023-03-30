

/**
 * Split the text by the delimiter, but only split the text from the right.
 * @param {String} text The text to be split.
 * @param {String} [delimiter=" "] The delimiter to split the text by. Defaults to space.
 * @returns {string[]} An array of strings.
 * @example
 * rsplit("This is a long text", " ") // ["text", "long", "a", "is", "This"]
 */
const rsplit = (text, delimiter=" ") => {
	let result = [];
	for (let i = text.length; i > 0; i--) {
		if (text[i] === delimiter) {
			result.push(text.slice(i + 1));
			text = text.slice(0, i);
		}
	}
	return result;
}

const rsplit2 = (text, delimiter = " ") => {
	return text.split(delimiter).reverse();
}

/**
 * Removes the last word from the text.
 * @param {String} text The text to be modified.
 * @param {Number} minLength The minimum length of cohesive non space characters to be considered as word.
 * @returns {String} The text without the last word.
*/
const removeLastWord = (text, minLength=1) => {
	return text.slice(0, text.substring(0,text.length-minLength).lastIndexOf(" "));
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
 * @returns {String[]} An array of strings.
 * @example
 * splitEvery("123456789", 3) // ["123", "456", "789"]
 * splitEvery("123456789", 4) // ["1234", "5678", "9"]
 * splitEvery("123456789", 5) // ["12345", "6789"] 
*/
const splitEvery = (text, length) => {
	let result = [];
	for (let i = 0; i < text.length; i += length) {
		result.push(text.slice(i, i + length));
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


export { rsplit, removeLastWord, capText, deriveAbbr, pad, splitEvery };