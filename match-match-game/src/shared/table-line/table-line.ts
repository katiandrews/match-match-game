import './table-line.scss';
import { usersData } from "../../models/user-data-model";
import { BaseComponent } from "../baseComponent";

export class TableLine extends BaseComponent {
  name: BaseComponent = new BaseComponent('p', ['score_user-name']);

  email: BaseComponent = new BaseComponent('p', ['score_user-email']);

  score: BaseComponent = new BaseComponent('p', ['score_user-score']);

  constructor() {
    super('div', ['score_table-line']);
    this.element.appendChild(this.name.element);
    this.element.appendChild(this.email.element);
    this.element.appendChild(this.score.element);
    const hr = document.createElement('hr');
    hr.classList.add('score-divider');
    this.element.appendChild(hr);
  }

  render(user: usersData): HTMLElement {
    this.name.element.textContent = `${user.name} ${user.surname}`;
    this.email.element.textContent = `${user.email}`;
    this.score.element.innerHTML = `Score: <span class="user-score_accent">${user.score}</span>`;
    return this.element;
  }
}