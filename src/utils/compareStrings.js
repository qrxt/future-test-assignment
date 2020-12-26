const compareStrings = (a, b) => {
  if (a < b) {
    return -1;
  }

  return a > b
    ? 1
    : 0;
};

export default compareStrings;
