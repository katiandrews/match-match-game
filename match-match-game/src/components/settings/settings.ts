import './settings.scss';
import { BaseComponent } from '../baseComponent';

export class Settings extends BaseComponent {
  constructor() {
    super('section', ['game-settings']);
    this.element.innerHTML = `
     <h1 class="section-title">Settings</h1>
    `;
  }
}
