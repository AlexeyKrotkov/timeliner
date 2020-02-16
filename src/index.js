import { ScrollHorizontalController } from 'modules/ScrollHorizontalController';
import './styles.pcss';
import { App } from 'components/App';

const rootNode = document.getElementById('root');

rootNode.outerHTML = new App().render();

const appNode = document.getElementById('app');

new ScrollHorizontalController(appNode);
