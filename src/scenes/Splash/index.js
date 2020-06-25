import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Constants from '../../config/Constants'
import { getRemoteConfig } from '../../config/firebaseFirestore';
var constants = require('../../config/Constants');
var colorConstant = require('../../config/colorConstant')
import splashStyle from './splashStyle'
var splashConstant = require('./splashConstants');
import { initializeApp } from '../../config/firebaseFirestore';
import { fetchIdentityPOST, fetchJsonGET } from '../../services/FetchData';
import BaseComponent from '../../BaseComponent';
import GlobalData from '../../utils/GlobalData';
var globalData = new GlobalData();
export default class splashscreen extends BaseComponent {

  constructor(props) {
    super(props)
    initializeApp(); // initializing firebase app
  }

  async componentDidMount() {
    await getRemoteConfig();
    let isUserAlreadySignIn = await this.isSignedIn();
    if (isUserAlreadySignIn) {
      let userInfo = await this.getCurrentUser();
      if (this.isValidString(userInfo) && this.isValidString(userInfo.user)) {
        if (this.isValidString(userInfo)) {
          this.setState({ googleUserInfo: userInfo });
          globalData.setGoogleUserInfo(userInfo);
          // Actions.tabbar();
          if (this.isValidString(userInfo.user.email)) {
            let username = userInfo.user.email;
            let password = userInfo.user.id;
            await this.loginButtonTapped(username, "Tester@123")
          }
        }
      } else {
        this.launchLogin()
      }
    } else {
      this.launchLogin()
    }
  }

  render() {
    return (
      <View style={splashStyle.container}>
        <Text style={splashStyle.containerText}>{splashConstant.SPLASH_SCREEN}</Text>
      </View>
    );
  }

  async loginButtonTapped(username, password) {
    if (this.checkForLoginFormValidation(username, password)) {
      let bodyData = this.getLoginBodyData(username, password)

      let businessObject = await this.getAsyncData(constants.ASYNC_BUSINESS_ID)
      var responseData = await fetchIdentityPOST(constants.USER_LOGIN_URL, bodyData)
      if (this.isValidString(responseData) && this.isValidString(responseData.statusMessage)) {
        if (responseData.statusMessage == constants.USER_LOGIN_STATUS) {
          this.saveUserInfo(responseData);
          this.handlerBusinessId(businessObject)
          Actions.tabbar();
        } else {
          this.launchLogin()
        }
      } else {
        this.launchLogin()
      }
    } else {
      this.launchLogin()
    }
  }

  launchLogin() {
    setTimeout(function () {
      Actions.login();
      // Actions.registerCreateCampaign()
    }, 2000);
  }


  getLoginBodyData(username, password) {
    let bodyData = {
      "username": username,
      "password": password,
    };
    return bodyData
  }

  checkForLoginFormValidation(username, password) {
    if (username && password) {
      return true
    }
    return false;
  }
}
