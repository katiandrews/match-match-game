import './card.scss'
import { BaseComponent } from "../baseComponent";

const FLIP_CLASS = 'flipped';

export class Card extends BaseComponent {
  isFlipped = false;

  constructor(readonly image:string) {
    super('div', ['card-container']);

    this.element.innerHTML = `
      <div class="card">
        <div class="card__front" style="background-image: url('./images/${image}')">Front</div>
        <div class="card__back">Back</div>
      </div>
    `
  }

  flipBack() {
    this.isFlipped = true;
    return this.flip(true);
  }

  flipFront() {
    this.isFlipped = false;
    return this.flip(false);
  }

  private flip(isFront = false): Promise<void> {
    return new Promise((resolve) => {
      this.element.classList.toggle(FLIP_CLASS, isFront);
      this.element.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    })
  }
}
