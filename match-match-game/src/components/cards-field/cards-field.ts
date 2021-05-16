import './cards-field.scss';
import { BaseComponent } from '../baseComponent';
import { Card } from '../card/card';

const SHOW_TIME = 5;

export class CardsField extends BaseComponent {
  private cards: Card[] = [];

  constructor() {
    super('div', ['cards-field']);
  }

  clear(): void {
    this.cards = [];
    this.element.innerHTML = '';
  }

  addCards(cards: Card[]): void {
    this.cards = cards;
    this.cards.forEach((card) => this.element.appendChild(card.element));
    setTimeout(() => {
      this.cards.forEach((card) => card.flipBack());
    }, SHOW_TIME * 1000);
  }
}
