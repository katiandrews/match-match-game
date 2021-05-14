import { AboutGame } from "./components/aboutGame/aboutGame";
import { Game } from "./components/game/game";
import { Header } from "./components/header/header";
import { ImageCategoryModel } from './models/image-category-model';

export class Application {
  private header: Header;
  private aboutGame: AboutGame;
  private readonly game: Game;

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header();
    this.rootElement.appendChild(this.header.element);
    this.game = new Game();
    this.aboutGame = new AboutGame();
  }

  clear() {
    this.game.element.remove();
    this.aboutGame.element.remove();
  }

  init() {
    this.rootElement.appendChild(this.aboutGame.element);
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
