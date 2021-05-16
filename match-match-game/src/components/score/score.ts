import './score.scss';
import { app } from '../..';
import { BaseComponent } from '../baseComponent';

export class Score extends BaseComponent {

  constructor() {
    super('section', ['game-score']);
    this.element.innerHTML = `
     <h1 class="section-title">Score</h1>
    `
    app.main.element.appendChild(this.element);
  }
}
