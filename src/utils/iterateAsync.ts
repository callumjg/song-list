const iterateAsync = async (arr, fn, i = 0) => {
  if (i === arr.length) return;
  await fn(arr[i]);
  return await iterateAsync(arr, fn, i + 1);
};

export default iterateAsync;
