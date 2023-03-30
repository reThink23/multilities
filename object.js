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