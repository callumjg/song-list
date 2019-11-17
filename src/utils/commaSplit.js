module.exports = string =>
  string
    .split(/(?:^|,)"|"(?:,|$)|,(?![^"]*"(?:,|$))/) // split by comma or enclosed ""
    .filter(t => t); //remove empty items
