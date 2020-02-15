import { Timeliner } from 'modules/timeliner';
import { SmoothFrameInterpolator } from 'modules/smooth-frame-interpolator';
import { getDocumentScrollHeight } from 'utils/scroll';
import { polynomialInterpolation } from 'utils/interpolations';
import './styles.scss';

const interpolateWithProgress = (keyframesXY, min, max) => {
  const f = polynomialInterpolation(keyframesXY);
  const result = [];
  for (let x = min; x <= max; x += 1) {
    result.push({ progress: (x / max) * 100, x, y: f(x) });
  }
  return result;
};

const node = document.getElementById('experimental');
const timeLiner = new Timeliner(
  node,
  interpolateWithProgress([
    [0, 0],
    [100, 200],
    [500, 300],
    [600, 100],
    [800, 200]
  ], 0, 800),
);
const smoothFrame = new SmoothFrameInterpolator(timeLiner.draw);

window.addEventListener('scroll', () => {
  requestAnimationFrame(() => {
    smoothFrame.executeFrame(window.scrollY / (getDocumentScrollHeight() - window.outerHeight));
  });
});
