const clientCache = (seconds: number) => (req, res, next) => {
  res.set('Cache-Control', `max-age=${Math.floor(seconds)}`);
  next();
};

export default clientCache;
