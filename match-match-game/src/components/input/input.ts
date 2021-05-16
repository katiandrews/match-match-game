import { BaseComponent } from '../baseComponent';

export class Input extends BaseComponent {
  input: HTMLElement;

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
    (<HTMLInputElement>this.input).type = type;
    (<HTMLInputElement>this.input).placeholder = placeholder;
    (<HTMLInputElement>this.input).pattern = pattern;
    (<HTMLInputElement>this.input).required = required;
    (<HTMLInputElement>this.input).required = required;
    (<HTMLInputElement>this.input).maxLength = maxLength;
    this.element.appendChild(this.input);
  }

  clear(): void {
    (<HTMLInputElement>this.input).value = '';
  }
}
