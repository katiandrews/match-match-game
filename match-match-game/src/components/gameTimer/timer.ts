import './timer.scss';
import { BaseComponent } from "../../shared/baseComponent";

export class Timer extends BaseComponent {
  private interval: NodeJS.Timeout | null;
  private elapsedTime: number;

  constructor() {
    super('div', ['game-timer']);
    this.element.innerHTML = '00:00';
    this.interval = null;
    this.elapsedTime = 0;
  }

  startTimer() {
    let startTime = Date.now();
    this.interval = setInterval(() => {
      this.elapsedTime = Date.now() - startTime;
      this.element.innerHTML = `${this.timeToString(this.elapsedTime)}`
    }, 1000)
  }

  timeToString(time: number) {
    const diffInMin: number = time / 60000;
    const mm = Math.floor(diffInMin);

    const diffInSec = (diffInMin - mm) * 60;
    const ss = Math.floor(diffInSec);

    const formattedMin = mm.toString().padStart(2, "0");
    const formattedSec = ss.toString().padStart(2, "0");

    return `${formattedMin}:${formattedSec}`;
  }

  stopTimer() {
    const timePassed = this.timeToString(this.elapsedTime);
    if (this.interval) clearInterval(this.interval);
    return `${Number(timePassed.slice(0,2))} min, ${Number(timePassed.slice(3,5))} sec.`;
  }
}
