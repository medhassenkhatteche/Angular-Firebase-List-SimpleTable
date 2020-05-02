import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {AuthentificationService} from '../services/authentification.service';

@Component({
  selector: 'app-entete',
  templateUrl: './entete.component.html',
  styleUrls: ['./entete.component.scss']
})
export class EnteteComponent implements OnInit {

  isAuth: boolean;

  constructor(private authentificationService: AuthentificationService) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user){
          this.isAuth=true;
        }
        else {
          this.isAuth=false;
        }
      }
    );
  }

  onSignOut(){
    this.authentificationService.SignOutUser();
  }

}
