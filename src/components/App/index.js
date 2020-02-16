import classNames from 'classnames/bind';
import styles from './styles.pcss';
import { ElementNode } from 'helpers/ElementNode';
import { Page } from 'components/Page';

const cx = classNames.bind(styles);

export class App extends ElementNode{
  render() {
    return `<div id="app" class="${cx('component')}">${new Page().render()}<div/>`;
  }
}
