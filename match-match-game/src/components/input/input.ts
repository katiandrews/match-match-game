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
    required: boolean,
    maxLength: number
  ) {
    super(tag, styles);
    this.element.textContent = text;
    this.input = document.createElement('input');
    this.input.classList.add('text-input');
    this.input.type = type;
    this.input.placeholder = placeholder;
    this.input.required = required;
    this.input.maxLength = maxLength;
    this.element.appendChild(this.input);
  }

  validateInput(regex: RegExp, customMessage: string): boolean {
    if (this.input.value.match(regex)) {
      this.input.setCustomValidity('');
      this.input.classList.remove('invalid');
      this.input.classList.add('valid');
      return true;
    }
    this.input.setCustomValidity(customMessage);
    this.input.classList.remove('valid');
    this.input.classList.add('invalid');
    return false;
  }
}
