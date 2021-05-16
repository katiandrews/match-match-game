import { app } from '../index';

export const router: Function = (location: string) => {
  window.location.hash = location;
  switch (location) {
    case '#/':
      app.clear();
      app.init();
      break
    case '#/settings':
      app.clear();
      app.openSettings();
      break
    case '#/score':
      app.clear();
      app.openScore();
  }
}

window.addEventListener('load', () => {
  const location = window.location.hash;

  if(location) {
    router(location);
  }
})
