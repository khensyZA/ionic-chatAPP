import { ProfileProvider } from './../../providers/profile/profile';
import { HomePage } from './../home/home';
import { AuthProvider } from './../../providers/auth/auth';
import { ChatRoomsProvider } from './../../providers/chat-rooms/chat-rooms';
import { Component } from '@angular/core';
import {Alert,AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RoomsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rooms',
  templateUrl: 'rooms.html',
})

export class RoomsPage {
userProfile:any
name:string;
ChatRoomList:Array<any>

  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl:AlertController, private provider:ChatRoomsProvider, private authProvider:AuthProvider,
     private  Pprovider: ProfileProvider) {
  }

joinRoom(key){
  console.log(this.userProfile)
if(!this.userProfile.hasOwnProperty('firstname') || !this.userProfile.hasOwnProperty('lastname'))
{
 let alert: Alert =this.alertCtrl.create({
   message:"you need to update your profile before entering the chatroom",
   buttons:[{
      text:'Cancel',
      role:'cancel'
   },
   {
text:'update profile',
handler: data=>{
this.navCtrl.push('ProfilePage')
}
   }]
 })
alert.present();


}
else{
  this.navCtrl.push(HomePage, {'key': key, 'userProfile': this.userProfile})
}
  }

  

  logout(){
    this.authProvider.signOut().then(()=>{
    this.navCtrl.setRoot('LoginPage');
    })
    }

    gotoProfile(){
      this.navCtrl.push('ProfilePage')
    }

  
  ionViewCanEnter() {
    this.provider.getChatRoomList().off();
 }

 ionViewWillEnter() {
  this.provider.getChatRoomList().on('value',ChatRoomListSnapShot=>{
  this.ChatRoomList=[];
  ChatRoomListSnapShot.forEach(snap=>{
  this.ChatRoomList.push({
  id:snap.key,
  name:snap.val().chatRoomName,

   });
  return false;
  })
  })

  this.Pprovider.getUserProfile().on('value',userProfileSnapShot=>{
  this.userProfile=userProfileSnapShot.val();
  console.log("Pprovider", this.userProfile)
  })
}
 



createRoom(){
    let alert= this.alertCtrl.create({
      message:'please enter a room name',
      inputs:[{
        name:'name',
        placeholder:'room name',

      }],
      buttons:[{
        text:'Cancel',
        role:'çancel',
      },

      {
        text:'create room',
        handler: data =>{
         console.log(data.name) 
        this.provider.createRoom(data.name).then(newChatRooms=>{
          console.log(newChatRooms);

    })
        }
      }]
    })
    alert.present();
  }

}