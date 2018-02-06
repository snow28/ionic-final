import { Component , Input , Pipe} from '@angular/core';
import { NavController , Events  } from 'ionic-angular';
import {AngularFireDatabase } from "angularfire2/database";
import { AddNewsPage } from '../../pages/add-news/add-news';
import {CommentsPage} from "../../pages/comments/comments";

@Component({
  selector: 'main-home',
  templateUrl: 'main-home.html'
})


export class MainHomeComponent {
  results: any= [];

  userInfo =  {
    ID : '',
    email : '',
    name : '',
    profilePicture : ''
  }
  Notes ;
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
  prepare_data(){
    return new Promise((resolve, reject) => {
      this.db.list('/likes/'+this.userInfo.ID).valueChanges().subscribe(data=>{
        this.results= data;
        resolve(data);
      })
    })
  }
  likesAdded : any = {};

  addLike(index){
    if(this.likesAdded[index] != true) {
      this.likesAdded[index] = true;
      this.db.object('/notes/' + index).update({likes: this.notes_likes[index] + 1});
    }else{
      this.likesAdded[index] = false;
      this.db.object('/notes/' + index).update({likes: this.notes_likes[index] - 1});
    }
  }

  pushTo_addnews(){
    this.navCtrl.push(AddNewsPage,this.userInfo);
  }

  openComments(index){
    console.log("openComments function works!");
    this.navCtrl.push(CommentsPage , {index : index , userInfo  : this.userInfo , Notes : this.Notes});

  }

}
