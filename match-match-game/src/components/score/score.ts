import './score.scss';
import { BaseComponent } from '../../shared/baseComponent';

export class Score extends BaseComponent {
  constructor() {
    super('section', ['game-score']);
    this.element.innerHTML = `
     <h1 class="section-title">Best players</h1>
    `;
  }
}
