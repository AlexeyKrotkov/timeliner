import classNames from 'classnames/bind';
import styles from './styles.pcss';
import { ElementNode } from 'dom/ElementNode';

console.log(styles);

const cx = classNames.bind(styles);

export class Page extends ElementNode{
  render() {
    return `<div class="${cx('component')}">123<div/>`;
  }
}
