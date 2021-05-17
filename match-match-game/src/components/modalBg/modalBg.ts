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
        this.close();
      }
      if ((<HTMLElement>event.target).classList.contains('button_secondary')) {
        event.preventDefault();
        this.registrationForm.clearInputs();
      }
    });
  }

  close(): void {
    this.element.remove();
  }
}
