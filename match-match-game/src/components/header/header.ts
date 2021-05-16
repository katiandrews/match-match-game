import './header.scss';
import { BaseComponent } from '../baseComponent';
import { Button } from '../button/button';
import { router } from '../../shared/router'

export class Header extends BaseComponent {
  button: Button;

  constructor() {
    super('header', ['main-header']);
    this.element.innerHTML = `
      <a href="#" class="main-logo"></a>
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
    const liList =  this.element.querySelectorAll('li');
    for (let i = 0; i < liList.length; i += 1) {
      liList[i].addEventListener('click', (event) => {
        event.preventDefault();
        if  ((<HTMLElement>event.target).classList.contains('home')) {
          router('#/');
        }

        if  ((<HTMLElement>event.target).classList.contains('score')) {
          router('#/score');
        }

        if  ((<HTMLElement>event.target).classList.contains('settings')) {
          router('#/settings');
        }
      });
    }
  }
}
