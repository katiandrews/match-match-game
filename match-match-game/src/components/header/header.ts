import './header.scss';
import { BaseComponent } from '../../shared/baseComponent';
import { Button } from '../../shared/button/button';

export class Header extends BaseComponent {
  button: Button;

  user: BaseComponent;

  userAvatar: BaseComponent;

  constructor() {
    super('header', ['main-header']);
    this.element.innerHTML = `
      <a href="#" class="main-logo home"></a>
      <nav class="header-nav">
        <ul class="nav-list">
          <li class="nav-list_item nav-list_item__active home">
            <a href="/" class="nav-list_item-link home">About Game</a>
          </li>
          <li class="nav-list_item score">
            <a href="/score" class="nav-list_item-link score">Best Score</a>
          </li>
          <li class="nav-list_item settings">
            <a href="/settings" class="nav-list_item-link settings">Game Settings</a>
          </li>
        </ul>
      </nav>
    `;
    this.button = new Button(
      'button',
      ['button_secondary'],
      'Register new player'
    );
    this.element.appendChild(this.button.element);
    this.user = new BaseComponent('div', ['header_user-info']);
    this.userAvatar = new BaseComponent('img', ['user-info_avatar']);
  }

  addUser(): void {
    this.element.appendChild(this.user.element);
    this.user.element.appendChild(this.userAvatar.element);
    (<HTMLImageElement>this.userAvatar.element).src = './public/image.jpg';
  }
}
