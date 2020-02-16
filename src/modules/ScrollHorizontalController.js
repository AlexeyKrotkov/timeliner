import { SmoothFrameInterpolator } from 'modules/SmoothFrameInterpolator';
import { getMaxScrollX } from 'utils/scroll';

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
  }

  setSyncedScrollPosition = pos => (this.syncedScrollPosition = pos);

  getSyncedProgress = () => {
    return this.syncedScrollPosition / getMaxScrollX();
  };

  scrollToProgress = progress => {
    // soft animate to target point
    window.scrollTo(progress * getMaxScrollX(), 0);

    // reset our planned scroll to normalize animated position
    if (progress <= MIN_PROGRESS) {
      this.setSyncedScrollPosition(0);
      this.interpolator.syncProgress(MIN_PROGRESS);
      return false;
    }
    if (progress >= MAX_PROGRESS) {
      this.setSyncedScrollPosition(getMaxScrollX());
      this.interpolator.syncProgress(MAX_PROGRESS);
      return false;
    }
    return true;
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
  }
}
