import './settings.scss';
import { BaseComponent } from '../../shared/baseComponent';
import { SelectOptions } from '../../models/select-options-model';

const categories: SelectOptions[] = [
  { value: '', text: 'Select game cards type', disabled: true, selected: true },
  { value: 'memes', text: 'Memes' },
  { value: 'cities', text: 'Cities' },
  { value: 'pokemons', text: 'Pokemons' },
];
const difficulty: SelectOptions[]  = [
  { value: '', text: 'Select game size', disabled: true, selected: true },
  { value: '8', text: '4x4' },
  { value: '18', text: '6x6' },
];

function addOptions(options: SelectOptions[], node: HTMLElement): void {
  options.forEach((element) => {
    const option = document.createElement('option');
    option.value = element.value;
    option.textContent = element.text;
    if (element.disabled) option.disabled = element.disabled;
    if (element.selected) option.selected = element.selected;
    node.appendChild(option);
  })
}
export class Settings extends BaseComponent {
  private categorySelect: BaseComponent<HTMLSelectElement> = new BaseComponent(
    'select',
    ['settings_category']
  );

  private difficultySelect: BaseComponent<HTMLSelectElement> =
  new BaseComponent('select', ['settings_difficulty']);

  public difficulty = 8;

  public category = 'memes';

  constructor() {
    super('section', ['game-settings']);

    const categoryTitle = new BaseComponent('h2', ['section-title']);
    categoryTitle.element.textContent = 'Game cards';
    const difficultyTitle = new BaseComponent('h2', ['section-title']);
    difficultyTitle.element.textContent = 'Difficulty';

    addOptions(difficulty, this.difficultySelect.element);
    addOptions(categories, this.categorySelect.element);

    this.element.append(
      categoryTitle.element,
      this.categorySelect.element,
      difficultyTitle.element,
      this.difficultySelect.element
    );

    this.categorySelect.element.addEventListener('change', () => {
      this.category = this.categorySelect.element.value;
    });

    this.difficultySelect.element.addEventListener('change', () => {
      this.difficulty = Number(this.difficultySelect.element.value);
    });
  }
}
