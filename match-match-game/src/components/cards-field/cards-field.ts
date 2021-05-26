import './cards-field.scss';
import { BaseComponent } from '../../shared/baseComponent';
import { Card } from '../card/card';
import { CARDS_SHOW_TIME } from '../../shared/constants';

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
    }, CARDS_SHOW_TIME);
  }
}
