// t: current time, b: beginning value, _c: final value, d: total duration
export function linear(t, b, _c, d) {
  const c = _c - b;
  return (c * t) / d + b;
}
