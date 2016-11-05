"use strict";

var Auth = (function(user){
user.registerUser = function(credentials){
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then((authData) =>{
        resolve(authData);
      })
      .catch((error)=>{
        reject(error);
      });
    });
  };

user.loginUser = function(credentials){
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((authData) =>{
        resolve(authData);
      })
      .catch((error)=>{
        reject(error);
      });
    });
  };

  user.credentialsCurrentUser = function(email, password){
    return firebase.auth().currentUser;
  };

  user.logoutUser = function(email, password){
     firebase.auth().signOut();
  };

  return user;

})(Auth || {});