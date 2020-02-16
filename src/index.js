import { ScrollHorizontalController } from 'modules/ScrollHorizontalController';
import './styles.pcss';
import { App } from 'components/App';

const rootNode = document.getElementById('root');

rootNode.outerHTML = new App().render();

new ScrollHorizontalController();
