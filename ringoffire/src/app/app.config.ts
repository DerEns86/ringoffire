import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), 
    importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.firebaseConfig))), 
    importProvidersFrom(provideFirestore(() => getFirestore()))]
};
