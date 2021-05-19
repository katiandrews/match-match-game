import './button.scss';
import { BaseComponent } from '../baseComponent';

export class Button extends BaseComponent {
  constructor(
    tag: keyof HTMLElementTagNameMap = 'button',
    styles: string[] = [],
    text: string,
    type = 'button'
  ) {
    super(tag, styles);
    (<HTMLButtonElement>this.element).textContent = text;
    (<HTMLButtonElement>this.element).type = type;
  }
}
