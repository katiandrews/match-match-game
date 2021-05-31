import './table-line.scss';
import { UsersData } from '../../models/user-data-model';
import { BaseComponent } from '../baseComponent';

export class TableLine extends BaseComponent {
  name: BaseComponent = new BaseComponent('p', ['score_user-name']);

  email: BaseComponent = new BaseComponent('p', ['score_user-email']);

  score: BaseComponent = new BaseComponent('p', ['score_user-score']);

  userAvatar: BaseComponent<HTMLImageElement> = new BaseComponent('img', [
    'score_user-avatar',
  ]);

  constructor() {
    super('div', ['score_table-line']);
    this.element.appendChild(this.userAvatar.element);
    this.element.appendChild(this.name.element);
    this.element.appendChild(this.email.element);
    this.element.appendChild(this.score.element);
    const hr = document.createElement('hr');
    hr.classList.add('score-divider');
    this.element.appendChild(hr);
  }

  render(user: UsersData): HTMLElement {
    this.name.element.textContent = `${user.name} ${user.surname}`;
    this.email.element.textContent = `${user.email}`;
    this.userAvatar.element.src = `${user.avatar}`;
    this.score.element.innerHTML = `Score: <span class="user-score_accent">${user.score}</span>`;
    return this.element;
  }
}
