import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "worldbuilding-final", appId: "1:831048749346:web:173f37eb9277242566d57b", storageBucket: "worldbuilding-final.firebasestorage.app", apiKey: "AIzaSyBXN1L7U5HkHOht_Q2W5-GTu2lxhzezdow", authDomain: "worldbuilding-final.firebaseapp.com", messagingSenderId: "831048749346" })), provideFirestore(() => getFirestore())]
};
