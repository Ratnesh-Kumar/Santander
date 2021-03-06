import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import GlobalData from './utils/GlobalData'
import { fetchPartyPOST } from './services/FetchData';
var globalData = new GlobalData();
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
var constants = require('./config/Constants');
const SHOP_NAME = "DigiShop - ";
var productDetail = "";
var campaignDetail = "";
var campaignResponse = "";
var campaignID = "";
export default class BaseComponent extends Component {

  constructor() {
    super();

  }

  setCampaignID(data) {
    campaignID = data
  }
  getCampaignID() {
    return campaignID;
  }

  setCampaignResponse(data) {
    campaignResponse = data
  }
  getCampaignResponse(data) {
    return campaignResponse;
  }

  setCampaignDetail(data) {
    campaignDetail = data
  }
  getCampaignDetail() {
    return campaignDetail;
  }
  setProductDetail(prodDetail) {
    productDetail = prodDetail;
  }

  getProductDetail() {
    return productDetail;
  }

  setUserIdFlurry(userId) {

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
    if (data != '' && data != undefined && data != null && data != NaN && data != "NaN") {
      return true;
    }
    return false;
  }

  async googleConfiguration() {
    GoogleSignin.configure({
      webClientId: (Platform.OS == 'android') ? constants.WEB_CLIENT_ID : '',
      iosClientId: (Platform.OS == 'ios') ? constants.WEB_CLIENT_ID : '',
    });
  }

  async signOut() {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      globalData.setGoogleUserInfo("");
      this.setState({ googleUserInfo: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  async isSignedIn() {
    const isSignedIn = await GoogleSignin.isSignedIn();
    return isSignedIn;
  };

  async getCurrentUser() {
    const currentUser = await GoogleSignin.getCurrentUser();
    return currentUser;
  };

  saveUserInfo(data) {
    if (this.isValidString(data) && this.isValidArray(data.properties)) {
      let userInfo = data.properties[0].value;
      if (this.isValidString(userInfo)) {
        globalData.setUserInfo(userInfo);
        let userTokenKey = userInfo.key;
        if (this.isValidString(userTokenKey)) {
          globalData.setUserTokenKey(userTokenKey);
        }
      }
    }
  }

  async createShop() {
    let createShopBody = {
      "shopName": SHOP_NAME + this.getRandomNumber(),
      "country": "US",
      "locale": "en_us"
    }
    var responseData = await fetchPartyPOST(constants.CREATE_SHOP_URL, createShopBody);
    if (this.isValidString(responseData) && responseData.statusMessage === constants.CREATE_SHOP_STATUS) {
      let businessId = this.getBusinessId(responseData);
      let shopName = this.getShopName(responseData);
      let defaultProfitMargin= this.getProfitMargin(responseData)
      if (this.isValidString(businessId)) {
        let businessObj = {
          "businessId": businessId,
          "username": globalData.getUserInfo().username,
          "shopName": shopName,
          "autoCreate": globalData.getIsAutoCreated()
        }
        let shopObj={
          "defaultProfitMargin":defaultProfitMargin
        }
        globalData.setBusinessId(businessId);
        globalData.setShopName(shopName);
        globalData.setDefaultProfitMargin(defaultProfitMargin);
        console.log("############# createShop businessId : " + businessId);
        console.log("########### shopName : " + shopName);
        console.log("########### defaultProfit : " + defaultProfitMargin);
        let isDataSave = await this.setAsyncData(constants.ASYNC_BUSINESS_ID, JSON.stringify(businessObj));
        let isShopDataSave =await this.setAsyncData(constants.ASYNC_PROFIT_VALUE,JSON.stringify(shopObj))
      }

    }
  }

  getBusinessId(response) {
    if (this.isValidArray(response.properties)) {
      let shopDetail = response.properties[0];
      if (this.isValidString(shopDetail)) {
        let shopValue = shopDetail.value;
        let businessId = shopValue.businessSettings.businessId;
        return businessId;
      }
    }
  }

  getShopName(response) {
    if (this.isValidArray(response.properties)) {
      let shopDetail = response.properties[0];
      if (this.isValidString(shopDetail)) {
        let shopValue = shopDetail.value;
        let shopname = shopValue.shopName;
        globalData.setIsAutoCreated(shopValue.businessSettings.autoCreate);
        return shopname;
      }
    }
  }

  getProfitMargin(response){
    if (this.isValidArray(response.properties)) {
      let shopDetail = response.properties[0];
      if (this.isValidString(shopDetail)) {
        let shopValue = shopDetail.value;
        let profitValue = shopValue.businessSettings.defaultProfitMargin
        return profitValue;
      }
    }
  }

  getFormattedDate() {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let current_datetime = new Date()
    let formatted_date = current_datetime.getDate() + "-" + months[current_datetime.getMonth()] + "-" + current_datetime.getFullYear()
    console.log(formatted_date)
    return formatted_date;
  }



  async saveBusinessId(businessId) {

  };

  async setAsyncData(key, value) {
    try {
      await AsyncStorage.setItem(key, value)
      return true
    } catch (error) {
      return false
    }
  }

  getAsyncData(key) {
    return new Promise(function (resolve, reject) {
      try {
        AsyncStorage.getItem(key).then((result) => {
          resolve(result)
        })
      } catch (error) {
        resolve(undefined)
      }
    });
  }

  //   handlerBusinessId(businessObject) {
  //     if (this.isValidString(businessObject)) {
  //       businessObject = JSON.parse(businessObject)
  //       if (businessObject.username == globalData.getUserInfo().username) {
  //         globalData.setBusinessId(businessObject.businessId)
  //       }

  //     }
  //     console.log("################ handlerBusinessId 4 : " + globalData.getBusinessId())
  //     if (!this.isValidString(globalData.getBusinessId())) {
  //       console.log("################ handlerBusinessId 5 : " + globalData.getBusinessId())
  //       this.createShop()
  //     }
  //   }
  // }
  handlerBusinessId(businessObject) {
    globalData.setBusinessId('')
    globalData.setShopName('')
    if (this.isValidString(businessObject)) {
      businessObject = JSON.parse(businessObject)
      if (businessObject.username == globalData.getUserInfo().username) {
        globalData.setBusinessId(businessObject.businessId)
        globalData.setShopName(businessObject.shopName)
        globalData.setIsAutoCreated(businessObject.autoCreate)
      }

    }
    console.log("################ handlerBusinessId 4 : " + globalData.getBusinessId())
    if (!this.isValidString(globalData.getBusinessId())) {
      this.createShop()
    }

  }
  handlerProfitValue(shopObj){
    //globalData.setDefaultProfitMargin('')
    if (this.isValidString(shopObj)) {
      shopObj = JSON.parse(shopObj)
       globalData.setDefaultProfitMargin(shopObj.defaultProfitMargin) 
    }
    console.log(' ##### handlerDefaultProfit : '+globalData.getDefaultProfitMargin())
  }

  getRandomNumber() {
    var x = Math.floor((Math.random() * 1000) + 1)
    return x.toString()
  }


}
