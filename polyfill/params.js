function existParam(key, url = null) {
	const paramString = url.split('?')[1] || window.location.search;
	paramString.split('&').forEach((param) => {
		if (param.split('=')[0] === key) {
			return true;
		}
	});
	return false;
}

function countParam(url = null) {
	const paramString = url.split('?')[1] || window.location.search;
	return paramString.split('&').length;
}

function getParam(key, url = null) {
	const paramString = url.split('?')[1] || window.location.search;
	paramString.split('&').forEach((param) => {
		const param = paramString.split('=');
		if (param[0] === key) {
			return param[1];
		}
	});
	return false;
}

function removeParam(key, url = null, updateURL=true) {
	var fullUrl = url || window.location.href;
	var	param,
		paramsArr = [],
		queryString = fullUrl.indexOf("?") !== -1 ? fullUrl.split("?")[1] : "";
	if (queryString !== "") {
		paramsArr = queryString.split("&");
		for (var i = paramsArr.length - 1; i >= 0; i -= 1) {
			param = paramsArr[i].split("=")[0];
			if (param === key) {
				paramsArr.splice(i, 1);
			}
		}
		url += "?" + paramsArr.join("&");
	}
	if (url === null && updateURL) window.history.replaceState(null, null, url);
	return url;
}

function updateParam(key, value, url = null, updateURL=true) {
	if (existParam(key, url)) {
		baseUrl = (url || window.location.href).split("?")[0];
		params = (url || window.location.href).split("?")[1];
		// urlParams = new URLSearchParams(window.location.search);
		paramsArr = Array.from(urlParams.entries());
		url += "?";
		preUrl = [];
		for (let i = 0; i < paramsArr.length; i++) {
			if (paramsArr[i][0] == key) {
				if (value) {
					paramsArr[i][1] = value;
				} else {
					paramsArr.splice(i, 1);
				}
			}
			keyValue = paramsArr[i].join("=");
			preUrl.push(keyValue);
			// url += paramsArr[i][0] + "=" + paramsArr[i][1] + ( i < (paramsArr.length-1) ) ? "&" : "";
		}
		url += preUrl.join("&");
		if (url === null && updateURL) window.history.replaceState(null, null, url);
		return url
		// if (countParam() == 1) {
		// 	return url;
		// 	// regex = new RegExp(`${key}=[a-zA-z\d]+(.*?)`, "g");
		// 	// matches = params.match(regex);
		// }
		// else {
		// 	regex = new RegExp(`(.*?)&${key}=[a-zA-z\d]+(.*)`, "g");
		// 	matches = params.match(regex);
		// 	matches.shift();
		// 	url += "?";
		// 	for (let i = 0; i < matches.length; i++) {
		// 		url += matches[i];
		// 	}
		// }
	} else {
		return false;
	}
}

function setParam(key, value, update = false) {
	if (update && existParam(key)) {
		update_url = updateParam(key, value);
		return update_url
	} else {
		var url = location.href;
		url += (url.includes("?") ? "&" : "?") + key + "=" + encodeURIComponent(value);
		window.history.replaceState(null, null, url);
		return url;
	}
}