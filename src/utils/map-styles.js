import isNil from 'lodash/isNil';
import identity from 'lodash/identity';

export const mapStyles = ({ x, y, z, scale, rotateX, rotateY, rotateZ, xP, yP, zP, ...otherStyles }) => {
  const isHasTransform = [x, y, z, scale, rotateX, rotateY, rotateZ, xP, yP, zP].some(val => !isNil(val));
  const transformElements = [
    xP && `translateX(${xP}%)`,
    yP && `translateY(${yP}%)`,
    zP && `translateZ(${zP}%)`,
    x && `translateX(${x}px)`,
    y && `translateY(${y}px)`,
    z && `translateZ(${z}px)`,
    rotateX && `rotateX(${rotateX}deg)`,
    rotateY && `rotateY(${rotateY}deg)`,
    rotateZ && `rotateZ(${rotateZ}deg)`,
    scale && `scale(${scale})`,
  ].filter(identity);
  return {
    ...otherStyles,
    ...(isHasTransform ? { transform: transformElements.join(' ') } : {}),
  };
};
