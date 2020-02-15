// import { easeInOutQuad, inOutQuintic } from 'utils/interpolations';
// import { absDistance } from 'utils/utils';

export class SmoothFrameInterpolator {
  constructor(drawExecutor) {
    this.drawExecutor = drawExecutor;
  }

  executeFrame(progress) {
    this.drawExecutor(progress);
  }
}
