import { ResetPage } from './../pages/reset/reset';
import { SingUpPage } from './../pages/sign-up/sing-up';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth';
import { ChatRoomsProvider } from '../providers/chat-rooms/chat-rooms';
import { ProfileProvider } from '../providers/profile/profile';
import { ChatProvider } from '../providers/chat/chat';
import { LoginPage } from '../pages/login/login';
import { RoomsPage } from '../pages/rooms/rooms';
import { ProfilePage } from '../pages/profile/profile';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ChatRoomsProvider,
    ProfileProvider,
    ChatProvider,
  ]
})
export class AppModule {}
