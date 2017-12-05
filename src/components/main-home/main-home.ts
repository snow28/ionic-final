import { Component , Input , Pipe} from '@angular/core';
import { NavController , Events  } from 'ionic-angular';
import {AngularFireDatabase } from "angularfire2/database";
import { AddNewsPage } from '../../pages/add-news/add-news';
import {HomePage} from "../../pages/home/home";

@Component({
  selector: 'main-home',
  templateUrl: 'main-home.html'
})


export class MainHomeComponent {
  userInfo =  {
    ID : '',
    email : '',
    name : '',
    profilePicture : ''
  }
  Notes;
  notes_length = [];
  x=0;
  notes_likes={};

  constructor(public navCtrl: NavController , public db : AngularFireDatabase , public events: Events) {
    this.db.list('/notes').valueChanges().subscribe(data =>{
      //creating array to dispaly our notes in descent order
      for(this.x ; this.x < data.length; this.x++){
        this.notes_length[this.x] = data.length-this.x-1;
      }
      this.Notes = data;
      this.x=0;
      //creating array with likes equvalient in each cell
      for( this.x ; this.x<data.length;this.x++){

        this.notes_likes[this.x] = this.Notes[this.x].likes;
      }
      //creating array to permit user like post 2 times
    })
    //    Here we push fron one element to our array which we are using to display our notes in descent order
    this.events.subscribe('addNote',() => {
      this.notes_length.unshift(this.notes_length.length);
    });
  }

  //recieving user data from home.ts file
  @Input()
  set userAccountInfo(input) {
    this.userInfo.email = input.email;
    this.userInfo.name = input.name;
    this.userInfo.profilePicture = input.profilePicture;
    this.userInfo.ID = input.ID;
    console.log("ID->" + this.userInfo.ID);
  }

  likesFromUser = {};
  addLike(index){
    this.db.list('/likes/'+this.userInfo.ID).valueChanges().subscribe(data=>{
      this.likesFromUser = data;
      //console.log(data);
    })
    console.log(this.likesFromUser[index]);
    if( true) {
      this.notes_likes[index]++;
      this.db.object('/notes/' + index).update({likes: this.notes_likes[index]});
      this.db.object('/likes/' + this.userInfo.ID + '/' + index).update({
        value: true,
        email : this.userInfo.email
      });
    }




  }

  pushTo_addnews(){
    this.navCtrl.push(AddNewsPage,this.userInfo);
  }

}
