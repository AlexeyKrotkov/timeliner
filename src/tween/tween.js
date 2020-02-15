import { linear } from 'utils/interpolations';
import { findNearestFrame, getStylesOnly } from 'utils/keyframes';
import { setKeyframeStyles } from 'utils/styles';

export class Timeliner {
  constructor(node, keyframes) {
    this.node = node;
    this.keyframes = keyframes;
    this.keyframesTimeline = keyframes.map(val => val.progress);
    setKeyframeStyles(this.node, keyframes[0]);
  }

  drawStylesTick(progress, leftFrame, rightFrame) {
    const leftFrameStyles = getStylesOnly(leftFrame);
    const rightFrameStyles = getStylesOnly(rightFrame);

    const nextStylesToRender = {};

    Object.keys(rightFrameStyles).forEach(key => {
      const prevStyleValue = leftFrameStyles[key];
      const nextStyleValue = rightFrameStyles[key];

      nextStylesToRender[key] = linear(
        (progress - leftFrame.progress) / (rightFrame.progress - leftFrame.progress) * 100,
        prevStyleValue,
        nextStyleValue,
        100,
      );
    });

    setKeyframeStyles(this.node, nextStylesToRender);
  }

  draw(progress) {
    const curProgress = progress * 100;
    const nearestFrameIndex = findNearestFrame(this.keyframesTimeline, curProgress);
    const leftFrame = this.keyframes[nearestFrameIndex];
    const rightFrame = this.keyframes[nearestFrameIndex + 1];
    this.drawStylesTick(curProgress, leftFrame, rightFrame);
  }
}
