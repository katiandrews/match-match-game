import './registrationForm.scss';
import { BaseComponent } from '../../shared/baseComponent';
import { Button } from '../../shared/button/button';
import { Input } from '../input/input';
import avatarPlaceholder from '../../assets/avatar.png';
import { Database } from '../../shared/indexeddb';

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
      true,
      30
    );
    this.surnameInput = new Input(
      'label',
      ['input-label'],
      'Last Name',
      'text',
      'Last Name',
      true,
      30
    );
    this.emailInput = new Input(
      'label',
      ['input-label'],
      'Email',
      'text',
      'Email',
      true,
      30
    );
    this.addButton = new Button(
      'button',
      ['button_primary', 'form-button'],
      'add user',
      'submit'
    );
    (<HTMLButtonElement>this.addButton.element).disabled = true;
    this.cancelButton = new Button(
      'button',
      ['button_secondary', 'form-button'],
      'cancel',
      'reset'
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

    this.element.addEventListener('input', () => {
      // check if form is valid on input event
      this.validateForm();
    });
  }

  validateForm(): void {
    (<HTMLFormElement>this.element).reportValidity(); // shows validity errors
    const nameRegex = new RegExp(/^[№\d]*\p{L}+[№\d\p{L}]*$/, 'u');
    const login = /^([\w-]+(?:\.[\w-]+)*|(".+"))@/;
    const domen = /((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    const emailRegex = new RegExp(`${login.source}${domen.source}`);
    this.nameInput.validateInput(
      nameRegex,
      'Имя должно содержать хотя бы одну букву и не иметь специальных символов'
    );
    this.surnameInput.validateInput(
      nameRegex,
      'Фамилия должна содержать хотя бы одну букву и не иметь специальных символов'
    );
    this.emailInput.validateInput(
      emailRegex,
      'Email не соответствует стандарту'
    );

    const inputs = this.element.querySelectorAll('input');
    for (let i = 0; i < inputs.length; i += 1) {
      if (inputs[i].classList.contains('invalid')) {
        (<HTMLButtonElement>this.addButton.element).disabled = true;
        return;
      }
    }
    (<HTMLButtonElement>this.addButton.element).disabled = false;
  }

  sendData(store: Database): void {
    // put user's data to indexedDB storage;
    const userName = this.nameInput.input.value;
    const userSurname = this.surnameInput.input.value;
    const userEmail = this.emailInput.input.value;
    store.write(userName, userSurname, userEmail);
  }

  returnInputValues(): string {
    return `${this.nameInput.input.value} ${this.surnameInput.input.value}`;
  }
}
