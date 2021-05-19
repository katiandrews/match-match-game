import './settings.scss';
import { BaseComponent } from '../../shared/baseComponent';

export class Settings extends BaseComponent {
  constructor() {
    super('section', ['game-settings']);
    this.element.innerHTML = `
     <h2 class="section-title">Game cards</h2>
     <h2 class="section-title">Difficulty</h2>
    `;
  }
}
