import { Injectable } from '@angular/core';
import {Livre} from '../models/Livre.model';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class LivresService {

  livres: Livre[] = [];
  livresSubject = new Subject<Livre[]>();

  constructor() { }

  emitLivres(){
    this.livresSubject.next(this.livres);
  }

  saveLivres(){
    firebase.database().ref('/livres').set(this.livres);
  }

  getLivres(){
    firebase.database().ref('/livres')
      .on('value', (data) =>{
        this.livres = data.val() ? data.val() : [];
        this.emitLivres();
      });
  }

  getDetailLivre(id: number){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/livres/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  ajouterNouveauLivre(nouveauLivre: Livre){
    this.livres.push(nouveauLivre);
    this.saveLivres();
    this.emitLivres();
  }

  updateLivre(livre){
    console.log('Modification en cours!');
    const livreIndexSupprimer = this.livres.findIndex(
      (livreEl) => {
        if (livreEl === livre){
          return true;
        }
      }
    );
    this.livres.splice(livreIndexSupprimer, 1, livre);
    this.saveLivres();
    this.emitLivres();
  }

  supprimerLivre(livre: Livre){
    if(livre.photo){
      const strorageRef = firebase.storage().refFromURL(livre.photo);
      strorageRef.delete().then(
        () => {
          console.log('Photo supprimée!');
        }
      ).catch(
        (error) => {
          console.log('Fichier non trouvée : ' + error);
        }
      );
    }
    const livreIndexSupprimer = this.livres.findIndex(
      (livreEl) => {
        if (livreEl === livre){
          return true;
        }
      }
    );
    this.livres.splice(livreIndexSupprimer, 1);
    this.saveLivres();
    this.emitLivres();
  }


  uploadFile(file: File){
    return new Promise(
      (resolve, reject) => {
        const uniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + uniqueFileName + file.name)
          .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement du fichier en cours!');
          }, (error) => {
            console.log('Erreur de chargement du fichier : ' +error);
            reject();
          }, () => {
            resolve(upload.snapshot.ref.getDownloadURL());
            console.log('Chargement du fichier réussit!');
          }
        );
      }
    );
  }


}
