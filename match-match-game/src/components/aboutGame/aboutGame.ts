import './aboutGame.scss';
import { BaseComponent } from '../baseComponent';
import registrationImg from '../../assets/registration.jpg';
import settingsImg from '../../assets/settings.jpg';
import gameImg from '../../assets/game.jpg';

export class AboutGame extends BaseComponent {
  constructor() {
    super('section', ['about-game']);
    this.element.innerHTML = `
      <h1 class="section-title">How to play?</h1>
      <ul class="step-list">
        <li class="step-list_item">
          <div class="step-list_description">
            <span class="step-number">1</span>
            <p class="step-list_text">
            Register new player in game
            </p>
          </div>
          <img
            src="${registrationImg}"
            alt="register new player"
            class="step-list_img"
          />
        </li>
        <li class="step-list_item">
          <div class="step-list_description">
            <span class="step-number">2</span>
            <p class="step-list_text">
            Configure your game settings
            </p>
          </div>
          <img
            src="${settingsImg}"
            alt="choose settings"
            class="step-list_img"
          />
        </li>
        <li class="step-list_item">
          <div class="step-list_description">
            <span class="step-number">3</span>
            <p class="step-list_text">
            Start you new game! Remember card positions and match it before
            times up.
            </p>
          </div>
          <img src="${gameImg}" alt="play" class="step-list_img" />
        </li>
      </ul>
    `;
  }
}
