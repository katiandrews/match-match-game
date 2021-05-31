import { AboutGame } from './components/aboutGame/aboutGame';
import { BaseComponent } from './shared/baseComponent';
import { Game } from './components/game/game';
import { Header } from './components/header/header';
import { ModalBg } from './shared/modalBg/modalBg';
import { Score } from './components/score/score';
import { Settings } from './components/settings/settings';
import { Database } from './shared/indexeddb';
import avatarPlaceholder from './assets/avatar.png';

export class Application {
  public header: Header;

  private main: BaseComponent;

  private aboutGame: AboutGame = new AboutGame();

  private settings: Settings = new Settings();

  private score: Score = new Score();

  readonly game: Game = new Game();

  private form: ModalBg = new ModalBg();

  public usersData = new Database();

  constructor(readonly rootElement: HTMLElement) {
    this.header = new Header();
    this.rootElement.appendChild(this.header.element);
    this.main = new BaseComponent('main', ['main']);
    this.rootElement.appendChild(this.main.element);
    this.usersData.init('katiandrews');
    // listen for registrationForm submit
    this.form.registrationForm.element.addEventListener('submit', (event) => {
      event.preventDefault();
      this.registerUser();
    });

    // listens for start/stop game button clicks
    this.header.button.element.addEventListener('click', () => {
      if (this.header.button.getText() === 'Register new player') {
        this.main.element.appendChild(this.form.element);
        this.form.openRegistration();
      } else if (this.header.button.getText() === 'Start game') {
        window.location.hash = '#/game';
        this.header.button.setText('Stop game');
      } else if (this.header.button.getText() === 'Stop game') {
        this.game.stopGame();
        window.location.hash = '#/';
        this.header.button.setText('Start game');
      }
    });
  }

  clear(): void {
    this.main.element.innerHTML = '';
  }

  init(): void {
    window.location.hash = '#/';
    this.header.element
      .querySelector('li.home')
      ?.classList.add('nav-list_item__active');
    this.main.element.appendChild(this.aboutGame.element);
  }

  async startGame(): Promise<void> {
    this.clear();
    this.main.element.appendChild(this.game.element);
    const res = await fetch('./images.json');
    const categories = await res.json();
    const { category } = this.settings;
    const images = categories[category]
      ?.slice(0, this.settings.difficulty)
      .map((name: string) => `${category}/${name}`);
    if (images) {
      this.game.newGame(images, this.settings.difficulty, this.usersData);
    }
  }

  openSettings(): void {
    this.header.element
      .querySelector('.settings')
      ?.classList.add('nav-list_item__active');
    this.main.element.appendChild(this.settings.element);
  }

  openScore(): void {
    this.header.element
      .querySelector('.score')
      ?.classList.add('nav-list_item__active');
    this.main.element.appendChild(this.score.element);
    this.score.addBestPlayers(this.usersData);
  }

  registerUser(): void {
    this.form.registrationForm.sendData(this.usersData);
    this.form.close();
    this.header.unlockDisabledElement();
    if (
      this.form.registrationForm.uploadAvatar.element.classList.contains(
        'uploaded'
      )
    ) {
      this.form.registrationForm.convertAvatarBase64().then((url) => {
        this.header.addUser(url);
      });
    } else {
      this.header.addUser(`${avatarPlaceholder}`);
    }
  }
}
