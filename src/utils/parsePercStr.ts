export default (num, precission = 2) => {
  let multiplier = 10 ** precission;
  return Math.round(num * 100 * multiplier) / multiplier + '%';
};
