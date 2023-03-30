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

export { isBetween, fairRandom };