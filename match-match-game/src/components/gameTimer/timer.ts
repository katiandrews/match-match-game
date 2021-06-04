import './timer.scss';
import { BaseComponent } from '../../shared/baseComponent';

export class Timer extends BaseComponent {
  private interval: NodeJS.Timeout | null;

  private elapsedTime: number;

  constructor() {
    super('div', ['game-timer']);
    this.element.innerHTML = '00:00';
    this.interval = null;
    this.elapsedTime = 0;
  }

  startTimer(): void {
    const startTime = Date.now();
    this.interval = setInterval(() => {
      this.elapsedTime = Date.now() - startTime;
      this.element.innerHTML = `${this.formatTime()}`;
    }, 1000);
  }

  getMinutes(): number {
    return Math.floor(this.elapsedTime / 60000);
  }

  getSeconds(): number {
    const elapsedTimeInSec = this.elapsedTime / 1000;
    const elapsedMinutesInSec = this.getMinutes() * 60;
    return Math.floor(elapsedTimeInSec - elapsedMinutesInSec);
  }

  formatTime(): string {
    const formattedMin = this.getMinutes().toString().padStart(2, '0');
    const formattedSec = this.getSeconds().toString().padStart(2, '0');
    return `${formattedMin}:${formattedSec}`;
  }

  elapsedTimeinSec(): number {
    return Math.floor(this.elapsedTime / 1000);
  }

  stopTimer(): string {
    const timePassed = `${this.getMinutes()} min, ${this.getSeconds()} sec.`;
    if (this.interval) clearInterval(this.interval);
    return timePassed;
  }
}
