export const findNearestFrame = (progressKeys, progress) =>
  progressKeys.findIndex(
    (_, index) =>
      index === progressKeys.length - 2 || (progressKeys[index] <= progress && progressKeys[index + 1] >= progress),
  );

export const getStylesOnly = (obj) => {
  const { progress, interpolation, ...styles } = obj;
  return styles;
};
