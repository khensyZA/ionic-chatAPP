import { RoomsPage } from './../rooms/rooms';
import { ChatProvider } from './../../providers/chat/chat';
import { ProfileProvider } from './../../providers/profile/profile';
import { AuthProvider } from './../../providers/auth/auth';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import firebase from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

chatRef:firebase.database.ThenableReference;
 
 @ViewChild(Content) content: Content
 data={
   type:'',
   userProfile:'',
   message:''
 }
 chats=[];
 joinData={}
  userProfile;
 roomKey:string;
 offStatus:boolean=false;

constructor(public navCtrl: NavController,private navParams: NavParams,private Pprovider: ProfileProvider,) {

this.roomKey=this.navParams.get('key') as string
this.userProfile=this.navParams.get('userProfile') as string;
this.data.type='message';
this.chatRef=firebase.database().ref(`userProfile/chatRooms/${this.roomKey}/chats`).push();
console.log(this.userProfile)


 let joinData ={
   type:'join',
   user:this.userProfile.firstname,
   message:this.userProfile.firstname+  ' has just joined this room.',
   sendDate:Date()
   
 }
 this.data.message = '';

 this.chatRef.set(joinData);
 this.data.message='';
 firebase.database().ref(`userProfile/chatRooms/${this.roomKey}/chats`).on('value', Response=>{
 this.chats=[];

 this.chats = snapShotToArray(Response);
 setTimeout(()=>{
 if(this.offStatus === false){
 this.content.scrollToBottom(300);
   }
 },1000)
});

 }

 goToProfile(){
  this.navCtrl.push('ProfilePage')
}

 exitChat(){
let exitData = firebase.database().ref(`userProfile/chatRooms/${this.roomKey}/chats`).push();
   exitData.set({
   type:'exit',
   user:this.userProfile,
   sentDate:Date(),
   message:this.userProfile.firstname+ ' has left the room.'
});
this.offStatus = true;
 }



  sendMessage(){
 let newData=firebase.database().ref(`userProfile/chatRooms/${this.roomKey}/chats`).push()
 newData.set({
   type:this.data.type,
   user:this.userProfile.firstname,
   message:this.data.message,
   sendDate:Date()

 });
 this.data.message = '';
  }

    ionViewCanEnter(){
      this.Pprovider.getUserProfile().off;
    }
    ionViewDidLoad() {
    
}
}

export const snapShotToArray=snapShot =>{  

  let returnArr =[];
  snapShot.forEach(childSnapShot=>{
    let item= childSnapShot.val();
    returnArr.push(item)
  });
  return returnArr;
}

