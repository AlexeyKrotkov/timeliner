import { SmoothFrameInterpolator } from 'modules/SmoothFrameInterpolator';

export class ScrollHorizontalController {
  constructor(containerNode) {
    // node that will assumed as maximum scroll width
    this.containerNode = containerNode;
    this.curScroll = 0;
    // to correct dragging scroll via scrollBar
    this.isScrollBarDragging = false;
    this.mainContainerWidth = this.containerNode.getBoundingClientRect().width;
    this.smoothFrameScroll = new SmoothFrameInterpolator(this.scrollToProgress, { minDistance: 0.1 });
    this.initListeners();
  }

  scrollToProgress = progress => {
    window.scrollTo(progress * this.mainContainerWidth, 0);
  };

  executeFrame = () => {
    this.smoothFrameScroll.executeFrame(this.curScroll / this.mainContainerWidth);
  };

  initListeners = () => {
    window.addEventListener('mousedown', event => {
      if (event.target.tagName === 'HTML' || event.target.nodeName === '#document' /* edge */) {
        console.log(event.target);
        this.isScrollBarDragging = true;
        this.smoothFrameScroll.cancelFrame();
      }
    });
    window.addEventListener('mouseup', () => {
      this.isScrollBarDragging = false;
    });

    window.addEventListener('scroll', () => {
      if (this.isScrollBarDragging) {
        this.curScroll = window.scrollX;
        this.smoothFrameScroll.setCurrentProgress(this.curScroll / this.mainContainerWidth);
        this.scrollToProgress(this.curScroll / this.mainContainerWidth);
      }
    });

    window.addEventListener('wheel', event => {
      if (!this.isScrollBarDragging) {
        this.curScroll += event.deltaY;

        if (this.curScroll < 0) {
          this.curScroll = 0;
        } else if (this.curScroll > this.mainContainerWidth) {
          this.curScroll = this.mainContainerWidth;
        }

        requestAnimationFrame(this.executeFrame);
      }
    });
  }
}
