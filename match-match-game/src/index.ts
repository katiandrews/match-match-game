import './styles.scss';
import { Application } from './application';
export let app: Application = new Application(document.body);

window.onload = () => {
  if (window.location.hash === '') {
    app.init();
  }
};
