import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Constants from '../../config/Constants'
import { TBC_COLOR } from '../../config/colorConstant';
var colorConstant = require('../../config/colorConstant')
import splashStyle from './splashStyle'
var splashConstant = require('./splashConstants');
import {initializeApp} from '../../config/firebaseFirestore';
import BaseComponent from '../../BaseComponent';
import GlobalData from '../../utils/GlobalData';
var globalData = new GlobalData();
export default class splashscreen extends BaseComponent {

  constructor(props){
    super(props)
    initializeApp(); // initializing firebase app
  }

  async componentDidMount() {
    let isUserAlreadySignIn = await this.isSignedIn();
    if(isUserAlreadySignIn){
      let currentUserInfo = await this.getCurrentUser();
      globalData.setGoogleUserInfo(currentUserInfo);
    }
    setTimeout(function () {
      if(isUserAlreadySignIn){
        Actions.tabbar();
      }else{
        Actions.login();
      }
    }, 2000);
  }

  render() {
    return (
      <View style={splashStyle.container}>
        <Text style={splashStyle.containerText}>{splashConstant.SPLASH_SCREEN}</Text>
      </View>
    );
  }
}
