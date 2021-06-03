import './score.scss';
import { BaseComponent } from '../../shared/baseComponent';
import { Database } from '../../shared/indexeddb';
import { TableLine } from '../../shared/table-line/table-line';

export class Score extends BaseComponent {
  scoreTable: BaseComponent = new BaseComponent('div', ['score-table']);

  constructor() {
    super('section', ['game-score']);
    this.element.innerHTML = `
     <h1 class="section-title">Best players</h1>
    `;
    this.element.appendChild(this.scoreTable.element);
  }

  addBestPlayers(store: Database): void {
    this.scoreTable.element.innerHTML = '';
    store.readFilteredScore().then((usersInfo) => {
      for (let i = 0; i < usersInfo.length; i++) {
        this.scoreTable.element.appendChild(
          new TableLine().render(usersInfo[i])
        );
      }
    });
  }
}
