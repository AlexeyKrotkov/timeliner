import { scrollController } from 'services/scroll-controller';


export class SectionProgressController {
  constructor(sectionNode, drawFrame) {
    this.sectionNode = sectionNode;
    this.hasListener = false;
    this.observer = null;
    this.uniqSectionKey = Symbol(`section-${sectionNode.id}`);
    // cached values
    this.cahcedPosition = null;
    // executors
    this.drawFrame = drawFrame;

    this.initInViewPortObserver();
  }

  drawChangedFrame = (scrollX) => {
    if (this.cahcedPosition !== scrollX) {
      this.cahcedPosition = scrollX;
      const {width, right } = this.sectionNode.getBoundingClientRect();
      // calculate section completed progress in viewport
      const sectionProgress = 1 - right / width;
      this.drawFrame(sectionProgress);
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
    scrollController.subscribe(this.uniqSectionKey, this.drawChangedFrame);
  };

  removeListener = () => {
    this.hasListener = false;
    scrollController.unsubscribe(this.uniqSectionKey, this.drawChangedFrame);
  };


  destroy = () => {
    this.removeListener();
    this.observer.unobserve(this.sectionNode);
  }

}
