// type arg = number | (a : any) => number;
type arg = ((a: any) => number) | number;

const clientCache = (input: arg) => (req, res, next) => {
  const seconds = typeof input === 'function' ? input(req) : input;
  res.set('Cache-Control', `max-age=${Math.floor(seconds)}`);
  next();
};

export default clientCache;
