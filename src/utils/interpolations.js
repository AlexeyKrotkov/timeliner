// t: current time, b: beginning value, _c: final value, d: total duration
export function linear(t, b, _c, d) {
  const c = _c - b;
  return (c * t) / d + b;
}

export function polynomialInterpolation(points) {
  const n = points.length - 1;

  function p(i, j, x) {
    if (i === j) {
      return points[i][1];
    }

    return ((points[j][0] - x) * p(i, j - 1, x) + (x - points[i][0]) * p(i + 1, j, x)) / (points[j][0] - points[i][0]);
  }

  return function(x) {
    if (points.length === 0) {
      return 0;
    }
    return p(0, n, x);
  };
}
