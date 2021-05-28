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
      this.element.innerHTML = `${this.timeToString()}`;
    }, 1000);
  }

  timeToString(): string {
    const diffInMin: number = this.elapsedTime / 60000;
    const mm = Math.floor(diffInMin);

    const diffInSec = (diffInMin - mm) * 60;
    const ss = Math.floor(diffInSec);

    const formattedMin = mm.toString().padStart(2, '0');
    const formattedSec = ss.toString().padStart(2, '0');

    return `${formattedMin}:${formattedSec}`;
  }

  timeinSec(): number {
    const minutesinSec = Number(this.timeToString().slice(0, 2)) * 60;
    const secs = Number(this.timeToString().slice(3, 5));

    return minutesinSec + secs;
  }

  stopTimer(): string {
    const timePassed = this.timeToString();
    if (this.interval) clearInterval(this.interval);
    this.element.innerHTML = '00:00';
    return `${Number(timePassed.slice(0, 2))} min, ${Number(
      timePassed.slice(3, 5)
    )} sec.`;
  }

  // update() {
  //   this.element.innerHTML = '00:00';
  // }
}
