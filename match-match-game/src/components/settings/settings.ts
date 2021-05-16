import './settings.scss';
import { app } from '../..';
import { BaseComponent } from '../baseComponent';

export class Settings extends BaseComponent {

  constructor() {
    super('section', ['game-settings']);
    this.element.innerHTML = `
     <h1 class="section-title">Settings</h1>
    `
    app.main.element.appendChild(this.element);
  }
}
