import { Timeliner } from 'modules/Timeliner';
import { SmoothFrameInterpolator } from 'modules/SmoothFrameInterpolator';

export class InterpolatedTimeline {
  constructor(node, keyframes) {
    this.timeliner = new Timeliner(node, keyframes);
    this.interpolator = new SmoothFrameInterpolator(this.handleDraw);
  }

  drawFrame = (progress) => {
    this.interpolator.drawExecutor(progress);
  };

  handleDraw = (progress) => {
    this.timeliner.draw(progress);
  };
}
