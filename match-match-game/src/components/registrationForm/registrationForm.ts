import './registrationForm.scss';
import { BaseComponent } from '../baseComponent';
import { Button } from '../button/button';
import { Input } from '../input/input';
import avatarPlaceholder from '../../assets/avatar.png';

export class RegistrationForm extends BaseComponent {
  private addButton: Button;

  private cancelButton: Button;

  nameInput: Input;

  surnameInput: Input;

  emailInput: Input;

  inputContainer: BaseComponent;

  buttonsContainer: BaseComponent;

  constructor() {
    super('form', ['registration-form']);
    this.element.innerHTML = `
      <h1 class="section-title registration-form-title">How to play?</h1>
      <img src="${avatarPlaceholder}" alt="user avatar" class="form_user-avatar">
    `;
    this.nameInput = new Input(
      'label',
      ['input-label'],
      'First Name',
      'text',
      'First Name',
      "/^[a-z ,.'-]+$/i",
      true,
      30
    );
    this.surnameInput = new Input(
      'label',
      ['input-label'],
      'Last Name',
      'text',
      'Last Name',
      "/^[a-z ,.'-]+$/i",
      true,
      30
    );
    this.emailInput = new Input(
      'label',
      ['input-label'],
      'Email',
      'text',
      'Email',
      "/^[a-z ,.'-]+$/i",
      true,
      30
    );
    this.addButton = new Button(
      'button',
      ['button_primary', 'form-button'],
      'add user'
    );
    this.cancelButton = new Button(
      'button',
      ['button_secondary', 'form-button'],
      'cancel'
    );

    this.inputContainer = new BaseComponent('div', ['inputs-wrapper']);
    this.buttonsContainer = new BaseComponent('div', ['buttons-wrapper']);

    this.inputContainer.element.appendChild(this.nameInput.element);
    this.inputContainer.element.appendChild(this.surnameInput.element);
    this.inputContainer.element.appendChild(this.emailInput.element);
    this.buttonsContainer.element.appendChild(this.addButton.element);
    this.buttonsContainer.element.appendChild(this.cancelButton.element);

    this.element.appendChild(this.inputContainer.element);
    this.element.appendChild(this.buttonsContainer.element);
  }

  clearInputs(): void {
    const inputs = this.element.querySelectorAll('input');
    for (let i = 0; i < inputs.length; i += 1) {
      inputs[i].value = '';
    }
  }
}
