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
    this.interpolator = new SmoothFrameInterpolator(this.scrollToProgress, { minDistance: 0.1 });
    this.initListeners();
  }

  setSyncedScrollPosition = (pos) => this.syncedScrollPosition = pos;

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

  initListeners = () => {
    window.addEventListener('mousedown', event => {
      if (event.target.tagName === 'HTML' || event.target.nodeName === '#document' /* edge */) {
        this.isScrollBarDragging = true;
        this.interpolator.reset();
      }
    });
    window.addEventListener('mouseup', () => {
      this.isScrollBarDragging = false;
      this.scrollToProgress(this.getSyncedProgress());
    });

    window.addEventListener('scroll', (e) => {
      if (this.isScrollBarDragging) {
        this.setSyncedScrollPosition(window.scrollX);
        this.interpolator.syncProgress(this.getSyncedProgress());
      }
    });

    window.addEventListener('wheel', event => {
      if (!this.isScrollBarDragging) {
        this.setSyncedScrollPosition(this.syncedScrollPosition + event.deltaY * 2);
        requestAnimationFrame(() => {
          this.interpolator.executeFrame(this.getSyncedProgress());
        });
      }
    });
  };
}
