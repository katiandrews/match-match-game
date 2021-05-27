import { delay } from '../../shared/delay';
import { BaseComponent } from '../../shared/baseComponent';
import { Card } from '../card/card';
import { CardsField } from '../cards-field/cards-field';
import { ModalBg } from '../../shared/modalBg/modalBg';
import { Timer } from '../gameTimer/timer';
import { CARDS_SHOW_TIME, FLIP_DELAY } from '../../shared/constants';
import { Database } from '../../shared/indexeddb';

export class Game extends BaseComponent {
  private readonly cardsField: CardsField;

  readonly timer: Timer;

  public activeCard?: Card;

  private isAnimation = false;

  private successPairsCounter = 0;

  public winningModal: ModalBg = new ModalBg();

  constructor() {
    super();
    this.cardsField = new CardsField();
    this.timer = new Timer();
    this.element.appendChild(this.timer.element);
    this.element.appendChild(this.cardsField.element);
  }

  newGame(images: string[], pairQuantity: number, database: Database): void {
    const cards = images
      .concat(images)
      .map((url: string) => new Card(url))
      .sort(() => Math.random() - 0.5);

    cards.forEach((card) => {
      card.element.addEventListener('click', () =>
        this.cardHandler(card, pairQuantity, database)
      );
    });

    this.cardsField.addCards(cards);
    setTimeout(() => {
      this.timer.startTimer();
    }, CARDS_SHOW_TIME);
  }

  private async cardHandler(card: Card, pairQuantity: number, store: Database) {
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
      this.successPairsCounter += 1;

      if (this.successPairsCounter === pairQuantity) {
        const gameScore = this.finish();
        store.addScore(gameScore);
      }
    }
    this.activeCard = undefined;
    this.isAnimation = false;
  }

  finish(): number {
    const gameTime = this.timer.timeinSec();
    this.timer.stopTimer();
    this.element.appendChild(this.winningModal.element);
    this.winningModal.winningAlert();
    this.winningModal.modalText.element.textContent += ` You finished in ${this.timer.stopTimer()}`;
    const gameScore = this.successPairsCounter * 100 - gameTime * 10;
    return gameScore;
  }

  stopGame(): void {
    this.activeCard = undefined;
    this.cardsField.clear();
  }
}
