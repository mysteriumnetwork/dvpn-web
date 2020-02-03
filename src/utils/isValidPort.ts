export default port => {
  const p = Number(port)
  return Number.isInteger(p) && p >= 0 && p <= 65535
};
