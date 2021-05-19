import './input.scss';
import { BaseComponent } from '../../shared/baseComponent';

export class Input extends BaseComponent {
  input: HTMLInputElement;

  constructor(
    tag: keyof HTMLElementTagNameMap = 'label',
    styles: string[] = [],
    text: string,
    type: string,
    placeholder: string,
    pattern: string,
    required: boolean,
    maxLength: number
  ) {
    super(tag, styles);
    this.element.textContent = text;
    this.input = document.createElement('input');
    this.input.classList.add('text-input');
    this.input.type = type;
    this.input.placeholder = placeholder;
    this.input.pattern = pattern;
    this.input.required = required;
    this.input.maxLength = maxLength;
    this.element.appendChild(this.input);
  }
}
