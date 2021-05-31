import './aboutGame.scss';
import { BaseComponent } from '../../shared/baseComponent';
import registrationImg from '../../assets/registration.jpg';
import settingsImg from '../../assets/settings.jpg';
import gameImg from '../../assets/game.jpg';
interface stepItem {
  stepNumber: string;
  stepText: string;
  imgSrc: string;
  imgAlt: string;
}

const stepsContent: stepItem[] = [
  {stepNumber: '1',
   stepText: 'Register new player in game',
   imgSrc: `${registrationImg}`,
   imgAlt: 'register new player'
  },
  {stepNumber: '2',
   stepText: 'Configure your game settings',
   imgSrc: `${settingsImg}`,
   imgAlt: 'choose settings'
  },
  {stepNumber: '3',
   stepText: 'Start you new game! Remember card positions and match it before times up.',
   imgSrc: `${gameImg}`,
   imgAlt: 'play'
  },
]

export class AboutGame extends BaseComponent {
  constructor() {
    super('section', ['about-game']);
    this.element.innerHTML = `
      <h1 class="section-title">How to play?</h1>
      <ul class="step-list">
      </ul>
    `;
    stepsContent.forEach((element) => {
      const li = new BaseComponent('li', ['step-list_item']);
      const div = new BaseComponent('div', ['step-list_description']);
      const span = new BaseComponent('span', ['step-number']);
      span.element.textContent = element.stepNumber;
      const p = new BaseComponent('p', ['step-list_text']);
      p.element.textContent = element.stepText;
      div.element.append(span.element, p.element);
      const img = new BaseComponent<HTMLImageElement>('img', ['step-list_img']);
      img.element.src = element.imgSrc;
      img.element.alt = element.imgAlt;
      li.element.append(div.element, img.element);
      this.element.querySelector('.step-list')?.appendChild(li.element);
    })
  }
}

