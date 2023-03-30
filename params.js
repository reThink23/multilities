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
const setParam = (key, value, url=null, update = false) => {
	const newUrl = new URL(url || window.location.href);
	if (!newUrl.searchParams.has(key)) {
		newUrl.searchParams.set(key, value);
	} else if (update) {
		newUrl.searchParams.set(key, value);
	}
	return newUrl.toString();
}

const paramOps = { exist: existParam, count: countParam, get: getParam, set: setParam, update: updateParam, remove: removeParam};

export { existParam, countParam, getParam, removeParam, updateParam, setParam};
export default paramOps;