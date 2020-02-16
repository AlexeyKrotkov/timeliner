import './styles.pcss';
import { App } from 'components/App';
import { scrollController } from 'services/scroll-controller';

const rootNode = document.getElementById('root');

rootNode.outerHTML = new App().render();

scrollController.init();

