import './button.scss';
import { BaseComponent } from '../baseComponent';

export class Button extends BaseComponent<HTMLButtonElement> {
  constructor(
    tag: keyof HTMLElementTagNameMap = 'button',
    styles: string[] = [],
    text: string,
    type = 'button'
  ) {
    super(tag, styles);
    this.element.textContent = text;
    this.element.type = type;
  }

  getText(): string | null {
    return this.element.textContent;
  }

  setText(text: string): void {
    this.element.textContent = text;
  }
}
