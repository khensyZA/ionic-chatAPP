import { ProfileProvider } from './../../providers/profile/profile';
import { Component } from '@angular/core';
import {Alert,AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { RoomsPage } from '../rooms/rooms';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

userProfile:any;
birthdate:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private AlertCtrl:AlertController,
   private Pprovider: ProfileProvider) {
  }

  ionViewCanEnter() {
  this.Pprovider.getUserProfile().off()
}

  ionViewDidLoad() {
    this.Pprovider.getUserProfile().on('value',userProfileSnapShot=>{
      this.userProfile=userProfileSnapShot.val();
      this.birthdate=userProfileSnapShot.val().birthdate
      
    })
    
  }

  updateName(){
    const alert: Alert= this.AlertCtrl.create({
      message: 'Please Enter Your Firstname And Lastname',
      inputs:[{
        name:'firstname',
        placeholder:'Enter firstname',
        value:this.userProfile.firstname
      },
      {
      name:'lastname',
      placeholder:'Enter Lastname',
      value:this.userProfile.lastname
      }],
      buttons:[{
        text:'Cancel',
         role:'cancel',
      },
      {
   text:'save',
   handler: data =>{
     this.Pprovider.updateName(data.firstname, data.lastname)
   }
      }],
      cssClass: 'alertcss',
    })
    alert.present();
  }




    updatePassword(){
    const alert: Alert= this.AlertCtrl.create({
      message: 'Update Password',
      inputs:[{
        name:'oldPassword',
        placeholder:'enter old password',
        type:"password",
        
      },
      {
      name:'newPassword',
      placeholder:'enter new password',
      type:"password",
    
      }],
      buttons:[{
        text:'Cancel',
        role:'cancel',

      },
      {
   text:'save',
   handler: data =>{
     this.Pprovider.updatePassword(data.oldPassword, data.newPassword)

     .catch(err=>{
       console.log('password error', err.message)
       const alertError: Alert = this.AlertCtrl.create({
         message:err.message
       })
       alertError.present();
     });
   }
      }],
      cssClass: 'alertcss',
    })
    alert.present();
  }



  updateDOB(birthdate){
    this.Pprovider.updateDOB(birthdate);
  }

  updateProfile(){
    this.navCtrl.setRoot('RoomsPage');
  }

}
