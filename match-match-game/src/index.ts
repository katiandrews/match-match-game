import './styles.scss';
import { Application } from './application';

window.onload = () => {
  new Application(document.body).init();
}
