import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
//import * as firebase from 'firebase';
import firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
    this.auth.useDeviceLanguage(); // Ajusta el lenguaje para que cada persona lo vea segun su idioma
  }

  // Crear un nuevo gato
  public createCat(data: { nombre: string, url: string }) {
    return this.db.collection('cats').add(data);
  }

  //Obtiene un gato
  public getCat(documentId: string) {
    return this.db.collection('cats').doc(documentId).snapshotChanges();
  }

  //Obtiene todos los gatos
  public getCats() {
    return this.db.collection('cats').snapshotChanges();
  }

  //Actualiza un gato
  public updateCat(documentId: string, data: any) {
    return this.db.collection('cats').doc(documentId).set(data);
  }

  public getWindowRef() {
    return window;
  }

  public recaptchaVerifier() {
    return new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response: any) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log("Se resolvio el captcha");
      }
    });
  }
}
