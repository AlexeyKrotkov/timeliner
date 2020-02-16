import classNames from 'classnames/bind';
import styles from './styles.pcss';
import { ElementNode } from 'dom/ElementNode';
import { getViewPortHeight } from 'utils/dom';
import mountaints from 'images/mountaints.png';
import { SectionProgressController } from 'modules/SectionProgressController';
import { InterpolatedTimeline } from 'modules/InterpolatedTimeline';

const cx = classNames.bind(styles);

export class Page extends ElementNode {
  constructor(props) {
    super(props);
  }

  onRender = () => {
    const bgNode = document.getElementById('bg-design');
    const sectionNode = document.getElementById('section-first');

    this.timeline = new InterpolatedTimeline(bgNode, [
      { y: 0, progress: 0 },
      { y: getViewPortHeight(), progress: 100 },
    ]);

    new SectionProgressController(sectionNode, this.timeline.drawFrame);
  };

  render() {
    requestAnimationFrame(this.onRender);
    return `
            <div id="section-first" class="${cx('component')}">
                <div class="${cx('slide', 'first')}">
                    <img src="${mountaints}" id="bg-design" class="${cx('bg-design')}" />
                </div>
                <div class="${cx('slide', 'second')}"></div>
                <div class="${cx('slide', 'third')}"></div>
            <div/>
          `;
  }
}
