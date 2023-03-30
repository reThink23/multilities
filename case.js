
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