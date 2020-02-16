import { scrollController } from 'services/scroll-controller';
import { Subscribe } from 'helpers/Subcribe';


export class SectionProgressController extends Subscribe {
  constructor(sectionNode) {
    super();
    this.sectionNode = sectionNode;
    this.hasListener = false;
    this.observer = null;

    // cached values
    this.cahcedPosition = null;

    this.initInViewPortObserver();
  }

  drawChangedFrame = (scrollX) => {
    if (this.cahcedPosition !== scrollX) {
      this.cahcedPosition = scrollX;
      const {width, right } = this.sectionNode.getBoundingClientRect();
      // calculate section completed progress in viewport
      const sectionProgress = 1 - right / width;

      this.callSubscribers(sectionProgress);
    }
  };

  initInViewPortObserver = () => {
    this.observer = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting) {
        if (!this.hasListener) {
          this.addListener();
        }
      } else {
        if (this.hasListener) {
          this.removeListener();
        }
      }
    }, null);
    this.observer.observe(this.sectionNode);
  };

  addListener = () => {
    this.hasListener = true;
    scrollController.subscribe('drawChangedFrame', this.drawChangedFrame);
  };

  removeListener = () => {
    this.hasListener = false;
    scrollController.unsubscribe('drawChangedFrame', this.drawChangedFrame);
  };

  destroy = () => {
    this.removeListener();
    this.observer.unobserve(this.sectionNode);
  }

}
