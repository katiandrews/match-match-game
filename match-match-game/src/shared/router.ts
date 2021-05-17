import { Application } from '../application';

export const app: Application = new Application(document.body);

window.addEventListener('hashchange', () => {
  const location = window.location.hash;

  if (location) {
    app.router(location);
  }
});
