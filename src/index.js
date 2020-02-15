import { Timeliner } from 'tween/tween';
import { getDocumentScrollHeight } from 'utils/scroll';
import './styles.scss';

const node = document.getElementById('experimental');
const keyFrames = [
  { progress: 0, x: 0, y: 0 },
  { progress: 30, x: 100, y: 200 },
  { progress: 60, x: 500, y: 500 },
  { progress: 100, x: 600, y: 0 }
];

const timeLiner = new Timeliner(node, keyFrames);

window.addEventListener('scroll', () => {
  requestAnimationFrame(() => {
    timeLiner.draw(window.scrollY / getDocumentScrollHeight());
  });
});
