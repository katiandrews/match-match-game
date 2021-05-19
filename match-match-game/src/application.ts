import { AboutGame } from './components/aboutGame/aboutGame';
import { BaseComponent } from './shared/baseComponent';
import { Game } from './components/game/game';
import { Header } from './components/header/header';
import { ModalBg } from './shared/modalBg/modalBg';
import { ImageCategoryModel } from './models/image-category-model';
import { Score } from './components/score/score';
import { Settings } from './components/settings/settings';
import { Database } from './shared/indexeddb';

export class Application {
  private header: Header;

  private main: BaseComponent;

  private aboutGame: AboutGame;

  private settings: Settings;

  private score: Score;

  private readonly game: Game;

  private form: ModalBg;

  public usersData = new Database();

  constructor(readonly rootElement: HTMLElement) {
    this.header = new Header();
    this.rootElement.appendChild(this.header.element);
    this.main = new BaseComponent('main', ['main']);
    this.rootElement.appendChild(this.main.element);
    this.aboutGame = new AboutGame();
    this.game = new Game();
    this.settings = new Settings();
    this.score = new Score();
    this.form = new ModalBg();
    this.usersData.init('katiandrews');

    // listen for registrationForm submit
    this.form.registrationForm.element.addEventListener('submit', (event) => {
      event?.preventDefault();
      this.registerUser();
    });
    // listen for menu-items click;
    this.header.element.addEventListener('click', (event) => {
      event.preventDefault();
      if ((<HTMLElement>event.target).classList.contains('home')) {
        this.router('#/');
      }

      if ((<HTMLElement>event.target).classList.contains('score')) {
        this.router('#/score');
      }

      if ((<HTMLElement>event.target).classList.contains('settings')) {
        this.router('#/settings');
      }
    });

    // listens for start/stop game button clicks
    this.header.button.element.addEventListener('click', () => {
      if (this.header.button.element.textContent === 'Register new player') {
        this.main.element.appendChild(this.form.element);
        this.form.registration();
      } else if (this.header.button.element.textContent === 'Start new game') {
        this.startGame();
        this.header.button.element.textContent = 'Stop game';
      } else if (this.header.button.element.textContent === 'Stop game') {
        this.router('#/');
        this.stopGame();
      }
    });
  }

  clear(): void {
    this.main.element.innerHTML = '';
  }

  router(location: string): void {
    window.location.hash = location;
    this.header.element
      .querySelector('.nav-list_item__active')
      ?.classList.remove('nav-list_item__active');
    this.clear();
    switch (location) {
      case '#/':
        this.stopGame();
        this.init();
        break;
      case '#/settings':
        this.stopGame();
        this.openSettings();
        break;
      case '#/score':
        this.stopGame();
        this.openScore();
        break;
      default:
        throw new Error(`there is no such route as ${location}!`);
    }
  }

  init(): void {
    this.header.element
      .querySelector('li.home')
      ?.classList.add('nav-list_item__active');
    this.main.element.appendChild(this.aboutGame.element);
  }

  async startGame(): Promise<void> {
    this.clear();
    this.main.element.appendChild(this.game.element);
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    const cat = categories[0];
    const images = cat.images.map((name) => `${cat.category}/${name}`);
    this.game.newGame(images);
  }

  stopGame(): void {
    if (this.header.button.element.textContent === 'Stop game') {
      this.header.button.element.textContent = 'Start new game';
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
  }

  registerUser(): void {
    this.form.registrationForm.sendData(this.usersData);
    this.form.close();
    this.header.user.element.textContent =
      this.form.registrationForm.returnInputValues();
    this.header.addUser();
  }
}
