import isNil from 'lodash/isNil';
import identity from 'lodash/identity';

export const mapStyles = ({
  /* transform props */
  x,
  y,
  z,
  scale,
  rotateX,
  rotateY,
  rotateZ,
  xP,
  yP,
  zP,
  /* filter props */
  brightness,
  /* other base styles */
  ...otherStyles
}) => {
  const isHasTransform = [x, y, z, scale, rotateX, rotateY, rotateZ, xP, yP, zP].some(val => !isNil(val));
  const isHasFilter = [brightness].some(val => !isNil(val));
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
  const filterElements = [brightness && `brightness(${brightness}%)`].filter(identity);
  return {
    ...otherStyles,
    ...(isHasTransform ? { transform: transformElements.join(' ') } : {}),
    ...(isHasFilter ? { filter: filterElements.join(' ') } : {}),
  };
};
