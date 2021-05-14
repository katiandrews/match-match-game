import { BaseComponent } from "../baseComponent";
import { RegistrationForm } from "../registrationForm/registrationForm";

export class ModalBg extends BaseComponent {
  private registrationForm: RegistrationForm;

  constructor() {
    super('div', ['modal-background']);
    this.registrationForm = new RegistrationForm();
  }

  registration() {
    this.element.appendChild(this.registrationForm.element);
  }

  success() {

  }
}
