import React, { Component } from 'react';
import GlobalData from './utils/GlobalData'
var globalData = new GlobalData();
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from 'react-native-google-signin';
export default class BaseComponent extends Component {

    constructor() {
        super();
        
    }

    setUserIdFlurry(userId)
    {
        
    }
    logEventFlurry(eventName) {
        
    }

    componentDidMount() {
        
    }
    isValidArray(dataArray) {
        if (dataArray != '' && dataArray != undefined && dataArray.length > 0) {
            return true;
        }
        return false;
    }

    isValidString(data) {
        if (data != '' && data != undefined && data != null && data != NaN) {
            return true;
        }
        return false;
    }

    async signOut(){
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          globalData.setGoogleUserInfo("");
          this.setState({ googleUserInfo: null }); // Remember to remove the user from your app's state as well
        } catch (error) {
          console.error(error);
        }
      };
    
      async isSignedIn(){
        const isSignedIn = await GoogleSignin.isSignedIn();
        return isSignedIn;
      };
    
      async getCurrentUser(){
        const currentUser = await GoogleSignin.getCurrentUser();
        return currentUser;
      };
    

}