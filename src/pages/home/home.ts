import { Component , ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';

import {AngularFireAuth} from 'angularfire2/auth'
import firebase from 'firebase';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {



  userAccountInfo = {
    name : '',
    profilePicture : '',
    email : '',
    loggedin : false
  }

  constructor( public ref : ChangeDetectorRef , private fire : AngularFireAuth , public navCtrl: NavController) {

  }

  login(authSource) {
    let signInProvider = null;
    switch (authSource){
      case "facebook":
        signInProvider = new firebase.auth.FacebookAuthProvider();
        break;
      case "google":
        signInProvider = new firebase.auth.GoogleAuthProvider();
        break;
      case "github":
        signInProvider = new firebase.auth.GithubAuthProvider();
        break;
      case "twitter":
        signInProvider = new firebase.auth.TwitterAuthProvider();
        break;
    }
    
    this.fire.auth.signInWithPopup(signInProvider)
      .then(res => {
        console.log("<--From Google-->");
        console.log(res);
        this.userAccountInfo.loggedin = true;
        this.userAccountInfo.name = res.user.displayName;
        this.userAccountInfo.email = res.user.email;
        this.userAccountInfo.profilePicture = res.user.photoURL;

      })


  }



              //Log out function
  logout(){
    this.fire.auth.signOut();
    this.userAccountInfo.loggedin = false;
  }

}
