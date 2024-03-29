import './card.scss';
import { BaseComponent } from '../../shared/baseComponent';

const FLIP_CLASS = 'flipped';

export class Card extends BaseComponent {
  isFlipped = false;

  constructor(readonly image: string) {
    super('div', ['card-container']);

    this.element.innerHTML = `
      <div class="card">
        <div class="card__front" style="background-image: url('./images/${image}')"></div>
        <div class="card__back"></div>
      </div>
    `;
  }

  flipBack(): Promise<void> {
    this.isFlipped = true;
    return this.flip();
  }

  flipFront(): Promise<void> {
    this.isFlipped = false;
    return this.flip();
  }

  private flip(): Promise<void> {
    return new Promise((resolve) => {
      this.element.classList.toggle(FLIP_CLASS, this.isFlipped);
      this.element.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    });
  }

  toggleClass(className: string): void {
    const cardFront = this.element.querySelector('.card__front');
    cardFront?.classList.toggle(className);
  }
}
