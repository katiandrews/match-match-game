import './modalBg.scss';
import { BaseComponent } from '../baseComponent';
import { RegistrationForm } from '../../components/registrationForm/registrationForm';
import { Button } from '../button/button';

export class ModalBg extends BaseComponent {
  registrationForm: RegistrationForm;
  okButton: Button;

  constructor() {
    super('div', ['modal-background']);
    this.registrationForm = new RegistrationForm();
    this.okButton = new Button('button', ['congrats-modal-button'], 'OK');
    this.element.addEventListener('mousedown', (event: Event) => {
      if ((<HTMLElement>event.target).classList.contains('modal-background')) {
        this.close();
      }
    });
  }

  registration(): void {
    this.element.appendChild(this.registrationForm.element);
    this.registrationForm.element.classList.remove('.visually-hidden');
  }

  winningAlert(): void {
    const congratsModal = new BaseComponent('div', ['congrats-modal']);
    congratsModal.element.textContent = 'Congratulation! You found all pairs.';
    congratsModal.element.appendChild(this.okButton.element);
    this.element.appendChild(congratsModal.element);
  }

  close(): void {
    this.element.remove();
  }
}
