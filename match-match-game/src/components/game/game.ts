import { delay } from '../../shared/delay';
import { BaseComponent } from '../../shared/baseComponent';
import { Card } from '../card/card';
import { CardsField } from '../cards-field/cards-field';
import { ModalBg } from '../../shared/modalBg/modalBg';

const FLIP_DELAY = 1000;

export class Game extends BaseComponent {
  private readonly cardsField: CardsField;

  private activeCard?: Card;

  private isAnimation = false;

  private pairsCounter = 0;

  public winningModal: ModalBg;

  constructor() {
    super();
    this.cardsField = new CardsField();
    this.winningModal = new ModalBg();
    this.element.appendChild(this.cardsField.element);
  }

  newGame(images: string[], pairQuantity: number): void {
    this.cardsField.clear();
    const cards = images
      .concat(images)
      .map((url: string) => new Card(url))
      .sort(() => Math.random() - 0.5);

    cards.forEach((card) => {
      card.element.addEventListener('click', () =>
        this.cardHandler(card, pairQuantity)
      );
    });

    this.cardsField.addCards(cards);
  }

  private async cardHandler(card: Card, pairQuantity: number) {
    if (this.isAnimation) return;
    if (!card.isFlipped) return;
    this.isAnimation = true;
    await card.flipFront();

    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }

    if (this.activeCard.image !== card.image) {
      this.activeCard.paintBg('red');
      card.paintBg('red');
      await delay(FLIP_DELAY);
      await Promise.all([this.activeCard.flipBack(), card.flipBack()]);
      this.activeCard.paintBg('red');
      card.paintBg('red');
    } else {
      this.activeCard.paintBg('green');
      card.paintBg('green');
      this.pairsCounter += 1;
      if (this.pairsCounter === pairQuantity) {
        this.element.appendChild(this.winningModal.element);
        this.winningModal.winningAlert();
      }
    }
    this.activeCard = undefined;
    this.isAnimation = false;
  }
}
