import './timer.scss';
import { BaseComponent } from "../../shared/baseComponent";

export class Timer extends BaseComponent {
  constructor() {
    super('div', ['game-timer']);
  }
}
