import { Component , ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth'
import firebase from 'firebase';
import {MainPage} from "../main/main";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  currentComponent = 'users-online';
  subscription;
  nextID = [];
  usersOnline=[];
  tmp;

  openComponent(name){
    this.currentComponent = name;
  }

  userAccountInfo = {
    ID : '' ,
    name : '',
    profilePicture : '',
    email : '',
    loggedinWith : '',
    loggedin : false
  }

  constructor( public ref : ChangeDetectorRef , private fire : AngularFireAuth , public navCtrl: NavController , private db : AngularFireDatabase) {
    this.subscription = this.db.list("/usersOnline").valueChanges().subscribe(data =>{
      this.usersOnline = data;
      console.log(this.usersOnline);
    })
    this.subscription = this.db.list("/ID").valueChanges().subscribe(data =>{
      this.nextID = data;
      this.userAccountInfo.ID = this.nextID[0];
      //console.log(parseInt(this.nextID[0]));
      this.db.object("/ID").update({0 : parseInt(this.nextID[0])+1});
    })

  }
  openPage(){
    this.navCtrl.push(MainPage);
  }

                         //  ---------        AUTHENTICATION     -------------------------

  login(authSource) {
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
        console.log("<--FROM " + this.userAccountInfo.loggedinWith + "   --->");
        console.log(res);
        this.userAccountInfo.loggedin = true;
        this.userAccountInfo.name = res.user.displayName;
        this.userAccountInfo.email = res.user.email;
        this.userAccountInfo.profilePicture = res.user.providerData[0].photoURL;

        this.db.list("/usersOnline").push({
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
  }
}
