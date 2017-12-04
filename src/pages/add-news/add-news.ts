import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth'
import firebase from 'firebase';

/**
 * Generated class for the AddNewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-news',
  templateUrl: 'add-news.html',
})
export class AddNewsPage {

  notePackage = {
    topic : '',
    note : '',
    time : '',
    photoUrl : '',
    name : '',
    email : ''
  }


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private fire : AngularFireAuth ,
              private db : AngularFireDatabase
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNewsPage');
  }
  // and note and return to the home page
  addAndQuite(){
    this.navCtrl.pop();
  }

}
