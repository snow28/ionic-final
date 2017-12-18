import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Events } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
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
    noteID : 0,
    topic : '',
    note : '',
    photoUrl : '',
    name : '',
    email : '',
    likes : 0,
    comments : 0
  }



  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private db : AngularFireDatabase,
              public events: Events
  ) {
    this.db.list('/notes').valueChanges().subscribe(data =>{
      this.notePackage.noteID = data.length;
    });
  }

  ionViewDidLoad() {
    this.notePackage.date = new Date();
    this.notePackage.name = this.navParams.get('name');
    this.notePackage.email=this.navParams.get('email');
    this.notePackage.photoUrl = this.navParams.get('profilePicture');
    console.log(this.notePackage);
  }
  // and note and return to the home page
  addAndQuite(){

    this.events.publish('addNote');
    if(this.notePackage.topic != '' && this.notePackage.note != '' && this.notePackage.note.length > 5 && this.notePackage.topic.length >20 ) {
      this.db.object('/notes/'+ this.notePackage.noteID).update({
        topic : this.notePackage.topic,
        note : this.notePackage.note,
        photoUrl : this.notePackage.photoUrl,
        name : this.notePackage.name,
        email : this.notePackage.email,
        date :  new Date(),
        dateH : new Date().getHours(),
        dateM : new Date().getMinutes(),
        dateDay : new Date().getUTCDate(),
        dateMonth : new Date().getMonth(),
        likes : this.notePackage.likes ,
        comments : this.notePackage.comments
      })
    }
    this.navCtrl.pop();
  }

}
