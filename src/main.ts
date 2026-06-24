import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import feather from 'feather-icons';

bootstrapApplication(App, appConfig)
  .then(() => {
    try {
      feather.replace();
    } catch (e) {
      // ignore if feather not available during tests
      console.warn('feather.replace() failed:', e);
    }
  })
  .catch((err) => console.error(err));
