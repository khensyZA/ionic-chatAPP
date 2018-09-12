import { SingUpPage } from './../sign-up/sing-up';
import { HomePage } from './../home/home';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { Alert, IonicPage,Loading, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { FormGroupDirective } from '../../../node_modules/@angular/forms';
import { ResetPage } from './../reset/reset';
import { RoomsPage } from './../rooms/rooms';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

email:string;
password:string;
load:Loading;
  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController,
    private alertCtrl:AlertController, private authProvider:AuthProvider) {
  }

  gotoSignUp():void{
    this.navCtrl.push('SingUpPage')
  }

  signIn(){
 if (!this.email && !this.password){
  console.log('enter email and password')
 
 }
 else{
  this.authProvider.signIn(this.email,this.password).then(authData=>{
    this.load.dismiss().then(()=>{
      this.navCtrl.setRoot('RoomsPage');
    })
  },error=>{
    this.load.dismiss().then(()=>{
      const alert: Alert= this.alertCtrl.create({
        message: error.message,
        buttons:[{ text: 'ok' , role:'cancel'}]
      })
      alert.present();
    })
  })
this.load=this.loadingCtrl.create();
this.load.present()

} //else
} //method

forgot(){
  this.navCtrl.push('ResetPage')
}

 } //export
 


