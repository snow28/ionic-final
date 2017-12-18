import { Component , ChangeDetectorRef , Injectable } from '@angular/core';
import {DateTime, NavController} from 'ionic-angular';
import { AngularFireDatabase  } from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import firebase from 'firebase';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  currentComponent = 'chat-rooms';
  subscription;
  usersOnline=[];

  openComponent(name){
    this.currentComponent = name;
  }

  userAccountInfo = {
    incremented : false,
    ID : {} ,
    name : '',
    profilePicture : '',
    email : '',
    loggedinWith : '',
    loggedin : false
  }


  constructor(
    public ref : ChangeDetectorRef ,
    private fire : AngularFireAuth ,
    public navCtrl: NavController ,
    private db : AngularFireDatabase
  ){
  }
            //  ------------     sending user data to add-news page


                         //  ---------        AUTHENTICATION     -------------------------

  login(authSource) {

    this.db.list("/ID").valueChanges().subscribe(data =>{
        this.userAccountInfo.ID = data[0];
        console.log("ID data[0] returned from firebase->>>" + data[0]);
        if(this.userAccountInfo.incremented == false) {
          this.db.object("/ID").update({0 : parseInt(data[0]) + 1 });
          this.userAccountInfo.incremented = true;
        }
      }
    )
    let signInProvider = null;
    switch (authSource){
      case "facebook":
        signInProvider = new firebase.auth.FacebookAuthProvider();
        this.userAccountInfo.loggedinWith = 'facebook';
        break;
      case "google":
        signInProvider = new firebase.auth.GoogleAuthProvider();
        this.userAccountInfo.loggedinWith = 'google';
        break;
      case "github":
        signInProvider = new firebase.auth.GithubAuthProvider();
        this.userAccountInfo.loggedinWith = 'github';
        break;
      case "twitter":
        signInProvider = new firebase.auth.TwitterAuthProvider();
        this.userAccountInfo.loggedinWith = 'twitter';
        break;
    }

    /*                Should work for phones, but it doesn't
    this.fire.auth.signInWithRedirect(signInProvider)
      .then( () => {
        this.fire.auth.getRedirectResult().then( res => {
          console.log("Logged in with " + this.userAccountInfo.loggedinWith);
          this.userAccountInfo.loggedin = true;
          this.userAccountInfo.name = res.user.displayName;
          this.userAccountInfo.email = res.user.email;
          this.userAccountInfo.profilePicture = res.user.photoURL;
          this.ref.detectChanges();
          console.log(res);
        });
      })
      */
                              /*          PC Version    */
    this.fire.auth.signInWithPopup(signInProvider)
      .then(res => {
        document.cookie = "username=" + res.user.displayName;
        this.userAccountInfo.loggedin = true;
        this.userAccountInfo.name = res.user.displayName;
        this.userAccountInfo.email = res.user.email;
        this.userAccountInfo.profilePicture = res.user.providerData[0].photoURL;

        this.db.createPushId();
        this.db.object("/usersOnline/" + this.userAccountInfo.ID).update(  {
          name : res.user.displayName ,
          email : res.user.email ,
          ID : this.userAccountInfo.ID
        });
      })
  }
              //Log out function
  logout(){
    this.fire.auth.signOut();
    this.userAccountInfo.loggedin = false;
    this.db.list("/usersOnline/"+this.userAccountInfo.ID).remove();
  }
}
