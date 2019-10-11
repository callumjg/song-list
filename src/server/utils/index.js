function escapeSpecialChar(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function commaSplit(string) {
	return string
		.split(/(?:^|,)"|"(?:,|$)|,(?![^"]*"(?:,|$))/) // split by comma or enclosed ""
		.filter(t => t); //remove empty items
}

module.exports = { escapeSpecialChar, commaSplit };
