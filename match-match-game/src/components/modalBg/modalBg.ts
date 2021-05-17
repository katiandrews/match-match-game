import './modalBg.scss';
import { BaseComponent } from '../baseComponent';
import { RegistrationForm } from '../registrationForm/registrationForm';

export class ModalBg extends BaseComponent {
  registrationForm: RegistrationForm;

  constructor() {
    super('div', ['modal-background']);
    this.registrationForm = new RegistrationForm();
    this.element.appendChild(this.registrationForm.element);
    this.registrationForm.element.classList.add('visially-hidden');
  }

  registration(): void {
    this.registrationForm.element.classList.remove('.visually-hidden');
    this.element.addEventListener('mousedown', (event: Event) => {
      if ((<HTMLElement>event.target).classList.contains('modal-background')) {
        this.element.remove();
      }
      if ((<HTMLElement>event.target).classList.contains('button_secondary')) {
        event.preventDefault();
        const inputs = this.element.querySelectorAll('input');
        for (let i = 0; i < inputs.length; i += 1) {
          inputs[i].value = '';
        }
      }
    });
  }
}
