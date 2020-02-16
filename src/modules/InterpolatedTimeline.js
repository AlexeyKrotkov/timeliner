import { Timeliner } from 'modules/Timeliner';
import { SmoothFrameInterpolator } from 'modules/SmoothFrameInterpolator';

const ZERO_PROGRESS = 0;

export class InterpolatedTimeline {
  constructor(node, keyframes) {
    this.timeliner = new Timeliner(node, keyframes);
    this.interpolator = new SmoothFrameInterpolator(this.handleDraw);
  }

  drawFrame = (progress) => {
    this.interpolator.drawExecutor(progress);
  };

  drawFrameIfProgressPositive = progress => {
    if (progress <= ZERO_PROGRESS) {
      this.drawFrame(ZERO_PROGRESS);
    }
    if (progress > ZERO_PROGRESS) {
      this.drawFrame(progress);
    }
  };

  handleDraw = (progress) => {
    this.timeliner.draw(progress);
  };
}
