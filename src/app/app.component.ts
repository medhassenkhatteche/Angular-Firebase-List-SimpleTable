import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyDrEoDdGE9wmugx5Rb6NntObZwXeMZzQVU",
      authDomain: "projetbib-e3082.firebaseapp.com",
      databaseURL: "https://projetbib-e3082.firebaseio.com",
      projectId: "projetbib-e3082",
      storageBucket: "projetbib-e3082.appspot.com",
      messagingSenderId: "599940306734",
      appId: "1:599940306734:web:6afa17d9f36245edf84cbf"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

}
