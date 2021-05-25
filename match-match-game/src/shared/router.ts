import { Application } from '../application';

export const app: Application = new Application(document.body);

const router = (location: string) => {
  app.header.element
    .querySelector('.nav-list_item__active')
    ?.classList.remove('nav-list_item__active');
  app.clear();
  switch (location) {
    case '#/':
      app.header.changeStartStopButton();
      app.game.stopGame();
      app.init();
      break;
    case '#/settings':
      app.header.changeStartStopButton();
      app.game.stopGame();
      app.openSettings();
      break;
    case '#/score':
      app.header.changeStartStopButton();
      app.game.stopGame();
      app.openScore();
      break;
    case '#/game':
      app.startGame();
      break;
    default:
      throw new Error(`there is no such route as ${location}!`);
  }
};

window.addEventListener('hashchange', () => {
  const location = window.location.hash;

  if (location) {
    router(location);
  }
});
