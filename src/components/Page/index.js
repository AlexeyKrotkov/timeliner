import classNames from 'classnames/bind';
import styles from './styles.pcss';
import { ElementNode } from 'dom/ElementNode';
import { Timeliner } from 'modules/Timeliner';
import { getMaxScrollX, getViewPortHeight } from 'utils/dom';
import { SmoothFrameInterpolator } from 'modules/SmoothFrameInterpolator';
import mountaints from 'images/mountaints.png';

const cx = classNames.bind(styles);

export class Page extends ElementNode {
  constructor(props) {
    super(props);
    this.timeliner = null;
    this.interpolator = null;
  }

  onRender = () => {
    const node = document.getElementById('bg-design');
    console.log(getViewPortHeight());
    this.timeliner = new Timeliner(node, [
      { y: 0, progress: 0 },
      { y: getViewPortHeight(), progress: 100 },
    ]);

    this.interpolator = new SmoothFrameInterpolator(this.handleScroll);

    window.addEventListener('scroll', () => {
      this.interpolator.executeFrame(window.scrollX / getMaxScrollX() * 3);
    });
  };

  handleScroll = (progress) => {
    this.timeliner.draw(progress);
  };

  render() {
    requestAnimationFrame(this.onRender);
    return `
            <div class="${cx('component')}">
                <div class="${cx('slide', 'first')}">
                    <img src="${mountaints}" id="bg-design" class="${cx('bg-design')}" />
                </div>
                <div class="${cx('slide', 'second')}"></div>
                <div class="${cx('slide', 'third')}"></div>
            <div/>
          `;
  }
}
