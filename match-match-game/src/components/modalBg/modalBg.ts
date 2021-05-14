import './modalBg.scss';
import { BaseComponent } from "../baseComponent";
import { RegistrationForm } from "../registrationForm/registrationForm";

export class ModalBg extends BaseComponent {
  registrationForm: RegistrationForm;

  constructor() {
    super('div', ['modal-background']);
    this.registrationForm = new RegistrationForm();
    this.element.appendChild(this.registrationForm.element);
    this.registrationForm.element.classList.add('visially-hidden');
  }

  registration() {
    this.registrationForm.element.classList.remove('.visually-hidden');
  }
}
