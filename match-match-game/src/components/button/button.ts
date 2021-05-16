import { BaseComponent } from '../baseComponent';

export class Button extends BaseComponent {
  constructor(
    tag: keyof HTMLElementTagNameMap = 'div',
    styles: string[] = [],
    text: string
  ) {
    super(tag, styles);
    (<HTMLButtonElement>this.element).textContent = text;
  }
}
