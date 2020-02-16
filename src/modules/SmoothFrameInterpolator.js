import { absDistance } from 'utils/utils';

export class SmoothFrameInterpolator {
  constructor(drawExecutor, { minDistance, smoothFactor }) {
    this.drawExecutor = drawExecutor;
    this.targetProgress = null;
    this.currentProgress = null;
    this.minDistance = minDistance || 0.020;
    this.smoothFactor = smoothFactor || 3;
    this.rafId = null;
  }

  run = () => {
    const distance = absDistance(this.currentProgress, this.targetProgress);

    if (this.targetProgress > this.currentProgress) {
      this.setCurrentProgress(this.currentProgress + Math.pow(distance, this.smoothFactor));
    } else {
      this.setCurrentProgress(this.currentProgress - Math.pow(distance, this.smoothFactor));
    }

    this.drawExecutor(this.currentProgress);

    // TODO make timer ~500 if distance > this.minDistance (if we are stayed for this time in this condition)
    // if (distance > this.minDistance) {
      this.rafId = requestAnimationFrame(this.run);
    // }
  };

  cancelFrame = () => {
    cancelAnimationFrame(this.rafId);
  };

  setCurrentProgress = (progress) => {
    this.currentProgress = progress;
  };

  executeFrame = (progress) => {
    this.cancelFrame();

    if (!this.currentProgress) {
      this.setCurrentProgress(progress);
    }
    this.targetProgress = progress;
    this.rafId = requestAnimationFrame(this.run);
  }
}
