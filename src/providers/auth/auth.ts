import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

 
  constructor() {
    // console.log('Hello AuthProvider Provider');

  }

signIn(email:string, password:string):Promise<any>{
  return firebase.auth().signInWithEmailAndPassword(email,password)
}

signOut():Promise<any>{
  const userId:string=firebase.auth().currentUser.uid;
  firebase.database().ref(`/userProfile/${userId}`).off();
  return firebase.auth().signOut();
}

resetPassword(email:string):Promise<any>{
  return firebase.auth().sendPasswordResetEmail(email);
}


signUpUser(email:string, password:string,):Promise<any>{
return firebase.auth().createUserWithEmailAndPassword(email,password)
.then(newUserCredentials=>{
  console.log(newUserCredentials.user.uid)
firebase.database().ref(`/userProfile/${newUserCredentials.user.uid}/email`)
.set(email)
}).catch(error=>{
  throw new error(error);
})
  }

}
