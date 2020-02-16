import classNames from 'classnames/bind';
import styles from './styles.pcss';
import { ElementNode } from 'dom/ElementNode';

const cx = classNames.bind(styles);

export class Page extends ElementNode {
  render() {
    return `
            <div class="${cx('component')}">
                <div class="${cx('slide', 'first')}"></div>
                <div class="${cx('slide', 'second')}"></div>
                <div class="${cx('slide', 'third')}"></div>
            <div/>
          `;
  }
}
