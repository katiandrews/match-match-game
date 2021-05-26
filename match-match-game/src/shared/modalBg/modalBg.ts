import './modalBg.scss';
import { BaseComponent } from '../baseComponent';
import { RegistrationForm } from '../../components/registrationForm/registrationForm';
import { Button } from '../button/button';

export class ModalBg extends BaseComponent {
  registrationForm: RegistrationForm = new RegistrationForm();

  okButton: Button;

  modalText: BaseComponent = new BaseComponent('span', ['modal-text']);

  constructor() {
    super('div', ['modal-background']);
    this.okButton = new Button(
      'button',
      ['button_primary', 'congrats-modal-button'],
      'OK'
    );
    this.element.addEventListener('mousedown', (event: Event) => {
      if ((<HTMLElement>event.target).classList.contains('modal-background')) {
        this.close();
      }
    });
  }

  registration(): void {
    this.element.appendChild(this.registrationForm.element);
  }

  winningAlert(): void {
    const congratsModal = new BaseComponent('div', ['congrats-modal']);
    this.modalText.element.textContent =
      'Congratulations! You found all matches.';
    congratsModal.element.append(this.modalText.element, this.okButton.element);
    this.element.appendChild(congratsModal.element);
    this.okButton.element.addEventListener('click', () => {
      window.location.hash = '#/score';
    });
  }

  close(): void {
    this.element.remove();
  }
}
