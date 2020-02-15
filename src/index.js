import { Timeliner } from 'modules/timeliner';
import { SmoothFrameInterpolator } from 'modules/smooth-frame-interpolator';
import { getDocumentScrollHeight } from 'utils/scroll';
import './styles.scss';

const node = document.getElementById('experimental');
const keyFrames = [
  { progress: 0, x: 0, y: 0 },
  { progress: 30, x: 100, y: 200 },
  { progress: 60, x: 500, y: 500 },
  { progress: 100, x: 600, y: 100 }
];

const timeLiner = new Timeliner(node, keyFrames);
const smoothFrame = new SmoothFrameInterpolator(timeLiner.draw);

window.addEventListener('scroll', () => {
  requestAnimationFrame(() => {
    smoothFrame.executeFrame(window.scrollY / (getDocumentScrollHeight() - window.outerHeight));
  });
});
