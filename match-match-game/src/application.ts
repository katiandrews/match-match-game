import { AboutGame } from "./components/aboutGame/aboutGame";
import { Game } from "./components/game/game";
import { Header } from "./components/header/header";
import { ModalBg } from "./components/modalBg/modalBg";
import { ImageCategoryModel } from './models/image-category-model';

export class Application {
  private header: Header;
  private aboutGame: AboutGame;
  private readonly game: Game;
  form: ModalBg;

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header();
    this.rootElement.appendChild(this.header.element);
    this.game = new Game();
    this.aboutGame = new AboutGame();
    this.form = new ModalBg();
  }

  clear() {
    this.game.element.remove();
    this.aboutGame.element.remove();
  }

  init() {
    this.rootElement.appendChild(this.aboutGame.element);
    this.header.button.element.addEventListener('click', () => {
      this.rootElement.appendChild(this.form.element);
      this.form.registration();
    });
    this.form.element.addEventListener('mousedown', (event: Event) => {
      if ((<HTMLElement>event.target).classList.contains('modal-background')) {
        this.form.element.remove();
       }
      if ((<HTMLElement>event.target).classList.contains('button_secondary')) {
        event.preventDefault;
        let inputs = this.form.element.querySelectorAll('input');
        for (let i = 0; i < inputs.length; i += 1) {
          inputs[i].value = '';
        }
      }
    });
  }

  async start() {
    this.rootElement.appendChild(this.game.element);
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    const cat = categories[0];
    const images = cat.images.map((name) => `${cat.category}/${name}`);
    this.game.newGame(images);
  }
}
