import './registrationForm.scss'
import { BaseComponent } from "../baseComponent";
import { Button } from '../button/button';
import { Input } from '../input/input';
import { Application } from '../../application';

export class RegistrationForm extends BaseComponent {
  private addButton: Button;
  private cancelButton: Button;
  private nameInput: Input;
  private surnameInput: Input;
  private emailInput: Input;

  constructor() {
    super('form', ['registration-form']);
    this.element.innerHTML = `
      <h1 class="section-title registration-form-title">How to play?</h1>
      <img src="./avatar.png" alt="user avatar" class="form_user-avatar">
    `
    this.nameInput = new Input('label', ['input-label'], 'First Name', 'text', '/^[a-z \,\.\'-]+$/i', true, 30);
    this.surnameInput = new Input('label', ['input-label'], 'Last Name', 'text', '/^[a-z \,\.\'-]+$/i', true, 30);
    this.emailInput = new Input('label', ['input-label'], 'Email', 'text', '/^[a-z \,\.\'-]+$/i', true, 30);
    this.addButton = new Button('button', ['button_primary', 'form-button'], 'add user');
    this.cancelButton = new Button('button', ['button_secondary', 'form-button'], 'cancel');

    this.element.appendChild(this.nameInput.element);
    this.element.appendChild(this.surnameInput.element);
    this.element.appendChild(this.emailInput.element);
    this.element.appendChild(this.addButton.element);
    this.element.appendChild(this.cancelButton.element);
  }
}
