import './header.scss';
import { BaseComponent } from '../../shared/baseComponent';
import { Button } from '../../shared/button/button';

interface LiContent {
  LiClass: string[];
  linkClass: string[];
  linkText: string;
}

const navContent: LiContent[] = [
  {
    LiClass: ['nav-list_item', 'nav-list_item__active', 'home'],
    linkClass: ['nav-list_item-link', 'home'],
    linkText: 'About Game',
  },
  {
    LiClass: ['nav-list_item', 'nav-list_item__disabled', 'score'],
    linkClass: ['nav-list_item-link', 'score'],
    linkText: 'Best Score',
  },
  {
    LiClass: ['nav-list_item', 'settings'],
    linkClass: ['nav-list_item-link', 'settings'],
    linkText: 'Game Settings',
  },
];

export class Header extends BaseComponent {
  navItems: BaseComponent[] = [];

  button: Button;

  userAvatar: BaseComponent<HTMLImageElement>;

  constructor() {
    super('header', ['main-header']);
    this.element.innerHTML = `
      <a href="#" class="main-logo home"></a>
      <nav class="header-nav">
        <ul class="nav-list">
        </ul>
      </nav>
    `;

    navContent.forEach((element) => {
      const li = new BaseComponent('li', element.LiClass);
      this.navItems.push(li);
      const a = new BaseComponent('a', element.linkClass);
      a.element.textContent = element.linkText;
      li.element.appendChild(a.element);
      this.element.querySelector('.nav-list')?.appendChild(li.element);
    });

    this.button = new Button(
      'button',
      ['button_secondary'],
      'Register new player'
    );
    this.element.appendChild(this.button.element);
    this.userAvatar = new BaseComponent('img', ['user-avatar']);

    for (let i = 0; i < this.navItems.length; i++) {
      this.navItems[i].element.addEventListener('click', (event) => {
        if ((<HTMLElement>event.currentTarget).classList.contains('home')) {
          window.location.hash = '#/';
        }
        if ((<HTMLElement>event.currentTarget).classList.contains('score')) {
          if (
            !(<HTMLElement>event.currentTarget).classList.contains(
              'nav-list_item__disabled'
            )
          ) {
            window.location.hash = '#/score';
          }
        }
        if ((<HTMLElement>event.currentTarget).classList.contains('settings')) {
          window.location.hash = '#/settings';
        }
      });
    }
  }

  addUser(source: string): void {
    this.button.element.textContent = 'Start game';
    this.element.appendChild(this.userAvatar.element);
    this.userAvatar.element.src = source;
  }

  changeStartStopButton(): void {
    if (this.button.element.textContent === 'Stop game') {
      this.button.element.textContent = 'Start game';
    }
  }

  unlockDisabledElement(): void {
    this.element
      .querySelector('.nav-list_item__disabled')
      ?.classList.remove('nav-list_item__disabled');
  }
}
