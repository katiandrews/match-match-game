import './registrationForm.scss';
import { BaseComponent } from '../../shared/baseComponent';
import { Button } from '../../shared/button/button';
import { Input } from '../input/input';
import avatarPlaceholder from '../../assets/avatar.png';
import { Database } from '../../shared/indexeddb';

export class RegistrationForm extends BaseComponent<HTMLFormElement> {
  private addButton: Button = new Button(
    'button',
    ['button_primary', 'form-button'],
    'add user',
    'submit'
  );

  private cancelButton: Button = new Button(
    'button',
    ['button_secondary', 'form-button'],
    'cancel',
    'reset'
  );

  uploadAvatar: Input = new Input(
    'label',
    ['input-label', 'button_icon'],
    '',
    'file',
    '',
    false,
    100
  );

  private avatar: BaseComponent<HTMLImageElement> = new BaseComponent('img', [
    'form_user-avatar',
  ]);

  nameInput: Input = new Input(
    'label',
    ['input-label'],
    'First Name',
    'text',
    'First Name',
    true,
    30
  );

  surnameInput: Input = new Input(
    'label',
    ['input-label'],
    'Last Name',
    'text',
    'Last Name',
    true,
    30
  );

  emailInput: Input = new Input(
    'label',
    ['input-label'],
    'Email',
    'text',
    'Email',
    true,
    30
  );

  inputContainer: BaseComponent = new BaseComponent('div', ['inputs-wrapper']);

  buttonsContainer: BaseComponent = new BaseComponent('div', [
    'buttons-wrapper',
  ]);

  constructor() {
    super('form', ['registration-form']);
    this.element.innerHTML = `
      <h1 class="section-title registration-form-title">How to play?</h1>
      <div class ="avatar-container">
      </div>`;
    this.avatar.element.src = `${avatarPlaceholder}`;
    this.avatar.element.alt = 'user avatar';
    this.addButton.element.disabled = true;
    this.uploadAvatar.input.accept = 'image/png, image/jpeg';
    this.inputContainer.element.append(
      this.nameInput.element,
      this.surnameInput.element,
      this.emailInput.element
    );
    this.buttonsContainer.element.append(
      this.cancelButton.element,
      this.addButton.element
    );
    this.element.append(
      this.inputContainer.element,
      this.buttonsContainer.element
    );
    this.element
      .querySelector('.avatar-container')
      ?.append(this.avatar.element, this.uploadAvatar.element);

    const inputs = this.element.querySelectorAll('input');
    inputs.forEach((input) => {
      input.addEventListener('input', (event) => {
        this.validateForm(event);
        this.checkSubmitButton();
      });
    });
    this.cancelButton.element.addEventListener('click', () => this.clearForm());
    this.uploadAvatar.input.addEventListener('change', () => {
      this.renderAvatar();
    });
  }

  validateForm(event: Event): void {
    const nameRegex = new RegExp(/^[№\d]*\p{L}+[№\d\p{L}]*$/, 'u');
    const login = new RegExp(/^([\w-]+(?:\.[\w-]+)*|(".+"))@/);
    const domen = new RegExp(
      /((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
    );
    const emailRegex = new RegExp(`${login.source}${domen.source}`);
    if (event.target === this.nameInput.input) {
      this.nameInput.validateInput(
        nameRegex,
        'Имя должно содержать хотя бы одну букву и не иметь специальных символов'
      );
      return;
    }
    if (event.target === this.surnameInput.input) {
      this.surnameInput.validateInput(
        nameRegex,
        'Фамилия должна содержать хотя бы одну букву и не иметь специальных символов'
      );
      return;
    }
    if (event.target === this.emailInput.input) {
      this.emailInput.validateInput(
        emailRegex,
        'Email не соответствует стандарту'
      );
    }
  }

  checkSubmitButton(): void {
    const inputs = this.element.querySelectorAll('input[type="text"]');
    for (let i = 0; i < inputs.length; i += 1) {
      if (inputs[i].classList.contains('invalid')) {
        this.addButton.element.disabled = true;
        return;
      }
    }
    this.addButton.element.disabled = false;
  }

  clearForm(): void {
    const inputs = this.element.querySelectorAll('input[type="text"]');
    inputs.forEach((input) => {
      input.classList.remove('valid');
      input.classList.add('invalid');
    });
    this.avatar.element.src = `${avatarPlaceholder}`;
    this.addButton.element.disabled = true;
  }

  renderAvatar(): void {
    const { files } = this.uploadAvatar.input;
    if (files) {
      this.avatar.element.src = URL.createObjectURL(files[0]);
      this.uploadAvatar.element.classList.add('uploaded');
    }
  }

  convertAvatarBase64(): Promise<string> {
    return new Promise((resolve) => {
      const { files } = this.uploadAvatar.input;
      const reader = new FileReader();
      reader.onload = (fileLoadedEvent) => {
        const srcData = fileLoadedEvent.target?.result;
        if (srcData && typeof srcData === 'string') resolve(srcData);
      };
      if (files && files.length > 0) {
        reader.readAsDataURL(files[0]);
      }
    });
  }

  sendData(store: Database): void {
    // put user's data to indexedDB storage;
    const userName = this.nameInput.input.value;
    const userSurname = this.surnameInput.input.value;
    const userEmail = this.emailInput.input.value;
    if (this.uploadAvatar.element.classList.contains('uploaded')) {
      this.convertAvatarBase64().then((avatar) => {
        store.write(userName, userSurname, userEmail, avatar);
      });
    } else {
      const avatar = `${avatarPlaceholder}`;
      store.write(userName, userSurname, userEmail, avatar);
    }
  }
}
