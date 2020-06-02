import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Constants from '../../config/Constants'
import { TBC_COLOR } from '../../config/colorConstant';
var colorConstant = require('../../config/colorConstant')
import splashStyle from './splashStyle'
var splashConstant = require('./splashConstants');
import {initializeApp} from '../../config/firebaseFirestore';

export default class splashscreen extends Component {

  constructor(props){
    super(props)
    initializeApp(); // initializing firebase app
  }

  componentDidMount() {
    setTimeout(function () {
      if(isUserAlreadySignIn){
        Actions.tabbar();
      }else{
        Actions.login();
        // Actions.createCampaign();
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
