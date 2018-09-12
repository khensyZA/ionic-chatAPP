
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { initializeApp } from 'firebase';

import { HomePage } from '../pages/home/home';
import { IonicNativePlugin } from '@ionic-native/core';
const  config = {
  apiKey: "AIzaSyBujwNagfMP88PNvM0h0t6bLOvLZdLsW1M",
  authDomain: "my-first-firebase-projec-938ee.firebaseapp.com",
  databaseURL: "https://my-first-firebase-projec-938ee.firebaseio.com",
  projectId: "my-first-firebase-projec-938ee",
  storageBucket: "my-first-firebase-projec-938ee.appspot.com",
  messagingSenderId: "1052291266005"
};
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
    // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);
    const unsubscribe= firebase.auth().onAuthStateChanged(user=>{
      if(!user){
        this.rootPage=('LoginPage')
        unsubscribe();
      } else{
        this.rootPage='RoomsPage'
        unsubscribe();
      }
    })

  }
}

