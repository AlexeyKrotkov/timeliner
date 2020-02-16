import { absDistance } from 'utils/utils';

export class SmoothFrameInterpolator {
  constructor(drawExecutor, options = {}) {
    this.drawExecutor = drawExecutor;
    this.targetProgress = null;
    this.currentProgress = null;
    this.minDistance = options.minDistance || 0.02;
    this.smoothFactor = options.smoothFactor || 3;
    this.rafId = null;
  }

  run = () => {
    const distance = absDistance(this.currentProgress, this.targetProgress);
    const factor = Math.pow(distance, this.smoothFactor);

    if (this.targetProgress > this.currentProgress) {
      this.syncProgress(this.currentProgress + factor);
    } else {
      this.syncProgress(this.currentProgress - factor);
    }

    const isContinue = this.drawExecutor(this.currentProgress);

    // TODO make timer ~500ms if distance > this.minDistance (if we are stayed for this time in this condition)
    // if (distance > this.minDistance) {
    if (isContinue) {
      this.rafId = requestAnimationFrame(this.run);
    }
    // }
  };

  reset = () => {
    this.targetProgress = null;
    this.currentProgress = null;
    this.cancelFrame();
  };

  cancelFrame = () => {
    cancelAnimationFrame(this.rafId);
  };

  syncProgress = progress => {
    this.currentProgress = progress;
  };

  executeFrame = progress => {
    this.cancelFrame();
    if (this.currentProgress === null) {
      this.syncProgress(progress);
    }
    this.targetProgress = progress;
    this.rafId = requestAnimationFrame(this.run);
  };
}
