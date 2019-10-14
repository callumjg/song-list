function escapeSpecialChar(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function commaSplit(string) {
	return string
		.split(/(?:^|,)"|"(?:,|$)|,(?![^"]*"(?:,|$))/) // split by comma or enclosed ""
		.filter(t => t); //remove empty items
}

function parsePercStr(num, precission = 2) {
	let multiplier = 10 ** precission;
	return Math.round(num * 100 * multiplier) / multiplier + "%";
}
module.exports = { escapeSpecialChar, commaSplit, parsePercStr };
