const mockDoc = {
  querySelector: (str) => {},
};
export default typeof document !== 'undefined' ? document : mockDoc;
