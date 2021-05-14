import './header.scss';
import { BaseComponent } from "../baseComponent";
import { Button } from '../button/button';
import { RegistrationForm } from '../registrationForm/registrationForm';
import { Application } from '../../application';

export class Header extends BaseComponent {
  private button: Button;

  constructor() {
    super('header', ['main-header']);
    this.element.innerHTML = `
      <a href="#" class="main-logo"></a>
      <nav class="header-nav">
        <ul class="nav-list">
          <li class="nav-list_item nav-list_item__active">
            <a href="#" class="nav-list_item-link">About Game</a>
          </li>
          <li class="nav-list_item">
            <a href="#" class="nav-list_item-link">Best Score</a>
          </li>
          <li class="nav-list_item">
            <a href="#" class="nav-list_item-link">Game Settings</a>
          </li>
        </ul>
      </nav>
    `
    this.button = new Button('button', ['button_secondary'], 'Register new player');
    this.element.appendChild(this.button.element);
  }
}
