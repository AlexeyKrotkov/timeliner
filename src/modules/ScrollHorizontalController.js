import { SmoothFrameInterpolator } from 'modules/SmoothFrameInterpolator';
import { getMaxScrollX } from 'utils/dom';

const MAX_PROGRESS = 1;
const MIN_PROGRESS = 0;

export class ScrollHorizontalController {
  constructor() {
    // node that will assumed as maximum scroll width
    this.syncedScrollPosition = 0;
    // to correct dragging scroll via scrollBar
    this.isScrollBarDragging = false;
    this.interpolator = new SmoothFrameInterpolator(this.scrollToProgress, {
      minDistance: 0.1,
    });
    // scroll event subscribers callbacks
    this.subscribers = {};
  }

  setSyncedScrollPosition = pos => (this.syncedScrollPosition = pos);

  getSyncedProgress = () => {
    return this.syncedScrollPosition / getMaxScrollX();
  };

  scrollToProgress = progress => {
    let isContinue = true;

    // soft animate to target point
    window.scrollTo(progress * getMaxScrollX(), 0);

    // reset our planned scroll to normalize animated position
    if (progress <= MIN_PROGRESS) {
      this.setSyncedScrollPosition(0);
      this.interpolator.syncProgress(MIN_PROGRESS);
      isContinue = false;
    }
    if (progress >= MAX_PROGRESS) {
      this.setSyncedScrollPosition(getMaxScrollX());
      this.interpolator.syncProgress(MAX_PROGRESS);
      isContinue = false;
    }

    // call all listeners
    Object.getOwnPropertySymbols(this.subscribers).forEach(subscriber => {
      this.subscribers[subscriber](window.scrollX, this.getSyncedProgress());
    });

    return isContinue;
  };

  handleWheel = event => {
    if (!this.isScrollBarDragging) {
      this.setSyncedScrollPosition(this.syncedScrollPosition + Math.sign(event.deltaY) * 200);
      requestAnimationFrame(() => {
        this.interpolator.executeFrame(this.getSyncedProgress());
      });
    }
  };

  handleScroll = () => {
    if (this.isScrollBarDragging) {
      this.setSyncedScrollPosition(window.scrollX);
      this.interpolator.syncProgress(this.getSyncedProgress());
    }
  };

  handleMouseDown = event => {
    if (event.target.tagName === 'HTML' || event.target.nodeName === '#document' /* edge */) {
      this.isScrollBarDragging = true;
      this.interpolator.reset();
    }
  };

  handleMouseUp = () => {
    this.isScrollBarDragging = false;
    this.scrollToProgress(this.getSyncedProgress());
  };

  initListeners = () => {
    window.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('wheel', this.handleWheel);
  };

  removeListeners = () => {
    window.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('wheel', this.handleWheel);
  };

  init = () => {
    this.setSyncedScrollPosition(window.scrollX);
    this.handleWheel({ deltaY: 0 });
    this.initListeners();
  };

  destroy = () => {
    this.removeListeners();
  };

  subscribe = (key, callback) => {
    this.subscribers[key] = callback;
  };
  unsubscribe = (key) => {
    delete this.subscribers[key];
  }
}
