import { HomePage } from './../home/home';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { Alert, IonicPage,Loading, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

/**
 * Generated class for the SingUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sing-up',
  templateUrl: 'sing-up.html',
})
export class SingUpPage {
email:string;
password:string;
load:Loading;
  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController,
    private alertCtrl:AlertController, private provider:AuthProvider) {
  }

  signIn(){
   if (!this.email && !this.password){
    console.log('enter email and password')
    }
            
 else{
 this.provider.signUpUser(this.email,this.password).then(authData=>{
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
          
} //export
            


