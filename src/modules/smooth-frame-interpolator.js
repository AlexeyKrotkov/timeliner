import { absDistance } from 'utils/utils';

export class SmoothFrameInterpolator {
  constructor(drawExecutor) {
    this.drawExecutor = drawExecutor;
    this.targetProgress = null;
    this.currentProgress = null;
    this.minDistance = 0.020;
    this.smoothFactor = 3;
  }

  run = () => {
    const distance = absDistance(this.currentProgress, this.targetProgress);

    if (this.targetProgress > this.currentProgress) {
      this.currentProgress += Math.pow(distance, this.smoothFactor);
    } else {
      this.currentProgress -= Math.pow(distance, this.smoothFactor);
    }

    this.drawExecutor(this.currentProgress);

    if (distance > this.minDistance) {
      requestAnimationFrame(this.run);
    }
  };

  executeFrame(progress) {
    if (!this.currentProgress) {
      this.currentProgress = progress;
    }
    this.targetProgress = progress;
    requestAnimationFrame(this.run);
  }
}
