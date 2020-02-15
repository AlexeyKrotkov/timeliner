import { mapStyles } from 'utils/map-styles';
import { getStylesOnly } from 'utils/keyframes';

const setNodeStyles = (node, attrs) => {
  const mappedAttr = mapStyles(attrs);
  Object.keys(mappedAttr).forEach(attr => {
    node.style[attr] = mappedAttr[attr];
  });
};

export const setKeyframeStyles = (node, attrs) => setNodeStyles(node, getStylesOnly(attrs));
