import classNames from 'classnames/bind';
import styles from './styles.pcss';
import { ElementNode } from 'helpers/ElementNode';
import { getViewPortHeight } from 'utils/dom';
import mountaints from 'images/mountaints.png';
import sky from 'images/sky.jpg';
import fog from 'images/fog.png';
import { SectionProgressController } from 'modules/SectionProgressController';
import { InterpolatedTimeline } from 'modules/InterpolatedTimeline';

const cx = classNames.bind(styles);

export class Page extends ElementNode {
  constructor(props) {
    super(props);
  }

  onRender = () => {
    const bgMountainsNode = document.getElementById('bg-mountains');
    const bgSkyNode = document.getElementById('bg-sky');
    const bgFogNode = document.getElementById('bg-fog');
    const sectionNode = document.getElementById('section-intro');

    this.timelineOne = new InterpolatedTimeline(bgMountainsNode, [
      { y: 0, progress: -40, scale: 1, brightness: 100 },
      { y: getViewPortHeight() / 2, scale: 1.2, progress: 100, brightness: 20 },
    ]);

    this.timelineTwo = new InterpolatedTimeline(bgSkyNode, [
      { x: 0, scale: 1.5, progress: 0 },
      { x: -500, scale: 1.5, progress: 100 },
    ]);

    this.timelineThree = new InterpolatedTimeline(bgFogNode, [
      { x: 0, scale: 2, progress: 0 },
      { x: 3000, scale: 2, progress: 100 },
    ]);

    const sectionController = new SectionProgressController(sectionNode);
    sectionController.subscribe('timelineOne', this.timelineOne.drawFrame);
    sectionController.subscribe('timelineTwo', this.timelineTwo.drawFrame);
    sectionController.subscribe('timelineThree', this.timelineTwo.drawFrame);
  };

  render() {
    requestAnimationFrame(this.onRender);
    return `
            <div class="${cx('component')}">
             <section class="${cx('slide', 'zero')}"></section>
                <section id="section-intro" class="${cx('slide', 'first')}">
                    <img src="${mountaints}" id="bg-mountains" class="${cx('bg-mountains')}" />
                    <img src="${sky}" id="bg-sky" class="${cx('bg-sky')}" />
                    <img src="${fog}" id="bg-fog" class="${cx('bg-fog')}" />
                </section>
                <section class="${cx('slide', 'second')}"></section>
                <section class="${cx('slide', 'third')}"></section>
            <div/>
          `;
  }
}
