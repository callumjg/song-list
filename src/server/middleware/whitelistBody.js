const whitelistBody = arr => {
  return (req, res, next) => {
    const { body } = req;
    const filteredKeys = Object.keys(body).filter(v => arr.includes(v));
    const newBody = filteredKeys.reduce((map, item) => {
      map[item] = req.body[item];
      return map;
    }, {});
    req.body = newBody;
    next();
  };
};

module.exports = whitelistBody;
