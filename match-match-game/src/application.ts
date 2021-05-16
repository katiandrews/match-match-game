import { AboutGame } from './components/aboutGame/aboutGame';
import { BaseComponent } from './components/baseComponent';
import { Game } from './components/game/game';
import { Header } from './components/header/header';
import { ModalBg } from './components/modalBg/modalBg';
import { ImageCategoryModel } from './models/image-category-model';
import { Score } from './components/score/score';
import { Settings } from './components/settings/settings';

export class Application {
  private header: Header;

  private aboutGame: AboutGame;

  private readonly game: Game;

  form: ModalBg;

  main: BaseComponent;

  constructor(readonly rootElement: HTMLElement) {
    this.header = new Header();
    this.rootElement.appendChild(this.header.element);
    this.main = new BaseComponent('main', ['main']);
    this.rootElement.appendChild(this.main.element);
    this.game = new Game();
    this.aboutGame = new AboutGame();
    this.form = new ModalBg();
  }

  clear(): void {
    this.header.element.querySelector('.nav-list_item__active')?.classList.remove('nav-list_item__active');
    this.main.element.innerHTML = '';
  }

  init(): void {
    this.header.element.querySelector('.home')?.classList.add('nav-list_item__active');
    this.main.element.appendChild(this.aboutGame.element);
    this.header.button.element.addEventListener('click', () => {
      this.main.element.appendChild(this.form.element);
      this.form.registration();
    });
    this.form.element.addEventListener('mousedown', (event: Event) => {
      if ((<HTMLElement>event.target).classList.contains('modal-background')) {
        this.form.element.remove();
      }
      if ((<HTMLElement>event.target).classList.contains('button_secondary')) {
        event.preventDefault();
        const inputs = this.form.element.querySelectorAll('input');
        for (let i = 0; i < inputs.length; i += 1) {
          inputs[i].value = '';
        }
      }
    });
  }

  async start(): Promise<void> {
    this.main.element.appendChild(this.game.element);
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    const cat = categories[0];
    const images = cat.images.map((name) => `${cat.category}/${name}`);
    this.game.newGame(images);
  }

  openSettings(): void {
    this.clear();
    this.header.element.querySelector('.settings')?.classList.add('nav-list_item__active');
    new Settings();
  }

  openScore(): void {
    this.clear();
    new Score();
    this.header.element.querySelector('.score')?.classList.add('nav-list_item__active');
  }
}
