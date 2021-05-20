import './settings.scss';
import { BaseComponent } from '../../shared/baseComponent';

export class Settings extends BaseComponent {
  public difficulty = 8;

  public category = 'unsorted';

  constructor() {
    super('section', ['game-settings']);
    this.element.innerHTML = `
     <h2 class="section-title">Game cards</h2>
     <select name="category" class="settings_category">
      <option value="unsorted">Select game cards type</option>
      <option value="memes">Memes</option>
      <option value="animals">Animals</option>
      <option value="pokemon">Pokemons</option>
      </select>
     <h2 class="section-title">Difficulty</h2>
     <select name="difficulty" class="settings_difficulty">
      <option value="4x4">Select game type</option>
      <option value="4x4">4x4</option>
      <option value="6x6">6x6</option>
      </select>
    `;

    const categorySelect = this.element.querySelector('.settings_category');

    categorySelect?.addEventListener('change', () => {
      this.category = (<HTMLSelectElement>categorySelect).value;
    });

    const difficultySelect = this.element.querySelector('.settings_difficulty');
    difficultySelect?.addEventListener('change', () => {
      this.difficulty =
        Number((<HTMLSelectElement>difficultySelect).value[0]) ** 2 / 2;
    });
  }
}
