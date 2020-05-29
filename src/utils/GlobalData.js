import React, { Component } from 'react';
import {
    AppRegistry
} from 'react-native';
var singleInstance = null;
var userData = false;
var isFirebaseInitialize = false;
var verifyEmail = false;

export class GlobalData extends Component {
    constructor() {
        super();
        if (!singleInstance) {
            singleInstance = this;
        }
        return singleInstance;
    }

    //this enable the test dialog in Home page
    setUserData(text){
        userData = text;
    }

    getUserData(){
        return userData;
    }

    setFirebaseInitialize(flag){
        isFirebaseInitialize = flag;
    }

    isFirebaseInitialize(){
        return isFirebaseInitialize;
    }

    setVerifyEmail(flag){
        verifyEmail = flag;
    }

    isVerifyEmail(){
        return verifyEmail;
    }
}

export default GlobalData;
