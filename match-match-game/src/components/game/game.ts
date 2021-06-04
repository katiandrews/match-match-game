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

  private timer: Timer;

  public activeCard?: Card;

  private startDelay: NodeJS.Timeout | null;

  private isAnimation = false;

  private successPairsCounter = 0;

  public winningModal: ModalBg = new ModalBg();

  constructor() {
    super();
    this.cardsField = new CardsField();
    this.timer = new Timer();
    this.element.appendChild(this.cardsField.element);
    this.startDelay = null;
  }

  newGame(images: string[], pairQuantity: number, database: Database): void {
    this.timer = new Timer();
    this.element.insertBefore(this.timer.element, this.cardsField.element);

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
    this.startDelay = setTimeout(() => {
      this.timer.startTimer();
      this.cardsField.flipCards();
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
      this.activeCard.toggleClass('red');
      card.toggleClass('red');
      await delay(FLIP_DELAY);
      await Promise.all([this.activeCard.flipBack(), card.flipBack()]);
      this.activeCard.toggleClass('red');
      card.toggleClass('red');
    } else {
      this.activeCard.toggleClass('green');
      card.toggleClass('green');
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
    const gameTime = this.timer.elapsedTimeinSec();
    this.timer.stopTimer();
    this.element.appendChild(this.winningModal.element);
    this.winningModal.alertWin();
    this.winningModal.modalText.element.textContent += ` You finished in ${this.timer.stopTimer()}`;
    const gameScore = this.successPairsCounter * 100 - gameTime * 10;
    return gameScore > 0 ? gameScore : 0;
  }

  stopGame(): void {
    this.timer.element.remove();
    if (this.startDelay) clearTimeout(this.startDelay);
    this.winningModal.close();
    this.cardsField.clear();
    this.successPairsCounter = 0;
    this.activeCard = undefined;
    this.isAnimation = false;
  }
}
