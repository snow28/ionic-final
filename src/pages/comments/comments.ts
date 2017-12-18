import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
/**
 * Generated class for the CommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {

  comment : string = ''; // i will use this variable for input field
  comments : any;  // i will use this variable to store array of all comments
  subscription : any;
  userName  : string = '';
  noteIndex = this.navParams.get('index');
  Notes  = this.navParams.get('Notes');

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db : AngularFireDatabase
  ){
    let userInfo  = this.navParams.get('userInfo');
    this.userName = userInfo['name'];
    this.subscription = this.db.list('/comments/' + this.noteIndex).valueChanges().subscribe(data=>{
      this.comments = data;
    });
  }

  sendComment(){
    this.db.list('/comments/'+ this.noteIndex ).push({
      comment :  this.comment ,
      userName : this.userName
    });
    let numberOfNotes = this.Notes[this.noteIndex].comments;
    this.db.object('/notes/' + this.noteIndex).update({comments: numberOfNotes + 1});  // here we recieving previus number of Notes from main-home component and than increment it by one
    this.comment = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentsPage');
  }

}
