import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { AsyncStorage } from 'react-native'
import GlobalData from '../utils/GlobalData';
var constants = require('../config/Constants');
var globalData = new GlobalData();
const DOCUMENT_TERMS_AND_COND = "termsAndConditions"
const DOCUMENT_PRIVACY_POLICY = "privacyPolicy";
const DOCUMENT_REMOTE_CONFIG = "remoteConfig";

const firebaseConfig = {
    clientId: '605493510042-1kthn40k3mfdtd7884841bth69ovbumb.apps.googleusercontent.com',
    appId: '1:605493510042:android:cbbedce9af38efc7100423',
    apiKey: 'AIzaSyBN46O-gT2sXXEbKoYFXCzZ1OwDBhu16hw',
    databaseURL: 'https://ecom-santander.firebaseio.com',
    storageBucket: 'ecom-santander.appspot.com',
    messagingSenderId: '605493510042',
    projectId: 'ecom-santander',
    persistence: true,
}

export function initializeApp() {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

function getFirestoreCollection() {
    return firestore()
        .collection(constants.COLLECTION_NAME);
}

export function getRemoteConfig() {
    return new Promise(function (resolve, reject) {
        getFirestoreCollection().doc(DOCUMENT_REMOTE_CONFIG)
            .get()
            .then(documentSnapshot => {
                if (documentSnapshot.exists) {
                    var data = documentSnapshot.data();
                    remoteConfigHandle(data)
                    resolve(data)
                }else{
                    resolve("");
                }
            });
    });
}
function remoteConfigHandle(data){
    if(isValidString(data)){
        globalData.setVerifyEmail(data.verifyEmail);
        globalData.setEmailEnabled(data.isEmailEnabled);
        globalData.setFacebookMarketplaceEnabled(data.isFacebookMarketplaceEnabled)
        globalData.setFacebookMessangerEnable(data.isFacebookMessangerEnable)
        globalData.setFacebookPageEnabled(data.isFacebookPageEnabled)
        globalData.setFacebookShopEnabled(data.isFacebookShopEnabled)
        globalData.setInstagramEnabled(data.isInstagramEnabled)
        globalData.setPinterestEnabled(data.isPinterestEnabled)
        globalData.setTextSmsEnabled(data.isTextSmsEnabled)
        globalData.setWhatsAppEnable(data.isWhatsAppEnable)
    }
}

export function getTermsAndConditions(locale) {
    return new Promise(function (resolve, reject) {
        getFirestoreCollection().doc(DOCUMENT_TERMS_AND_COND)
            .get()
            .then(documentSnapshot => {
                if (documentSnapshot.exists) {
                    var data = documentSnapshot.get(locale);
                    resolve(data)
                }else{
                    resolve("");
                }
            });
    });
}

export function getPrivacyPolicy(locale) {
    return new Promise(function (resolve, reject) {
        getFirestoreCollection().doc(DOCUMENT_PRIVACY_POLICY)
            .get()
            .then(documentSnapshot => {
                if (documentSnapshot.exists) {
                    var data = documentSnapshot.get(locale);
                    resolve(data)
                }else{
                    resolve("");
                }
            });
    });
}

function isValidString(data) {
    if (data != '' && data != undefined && data != null && data != NaN) {
        return true;
    }
    return false;
}
