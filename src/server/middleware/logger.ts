import morgan from 'morgan';

const logger =
  process.env.NODE_ENV !== 'test' ? morgan('dev') : (req, res, next) => next();

export default logger;
