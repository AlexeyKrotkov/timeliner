// t: current time, b: beginning value, _c: final value, d: total duration
export function linear(t, b, _c, d) {
  const c = _c - b;
  return (c * t) / d + b;
}

export function easeInOutQuad (t, b, c, d) {
  t /= d/2;
  if (t < 1) {
    return c/2*t*t + b;
  }
  t--;
  return -c/2 * (t*(t-2) - 1) + b;
};

export function easeInOutQuadReversed(t, b, c, d) {
  return -1*easeInOutQuad(t, b, c, d);
}


export function inOutQuintic(t, b, c, d) {
  const ts = (t/=d)*t,
    tc = ts*t;
  return b+c*(6*tc*ts + -15*ts*ts + 10*tc);
};
