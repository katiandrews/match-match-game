import './modalBg.scss';
import { BaseComponent } from '../baseComponent';
import { RegistrationForm } from '../../components/registrationForm/registrationForm';
import { Application } from '../../application';

export class ModalBg extends BaseComponent {
  registrationForm: RegistrationForm;

  constructor() {
    super('div', ['modal-background']);
    this.registrationForm = new RegistrationForm();
    this.element.appendChild(this.registrationForm.element);
    this.element.addEventListener('mousedown', (event: Event) => {
      if ((<HTMLElement>event.target).classList.contains('modal-background')) {
        this.close();
      }
    });
  }

  registration(): void {
    this.registrationForm.element.classList.remove('.visually-hidden');
  }

  close(): void {
    this.element.remove();
  }
}
