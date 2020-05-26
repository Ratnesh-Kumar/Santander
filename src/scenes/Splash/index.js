import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Constants from '../../config/Constants'
import { TBC_COLOR } from '../../config/colorConstant';
var colorConstant = require('../../config/colorConstant')
import splashStyle from './splashStyle'
var splashConstant = require('./splashConstants');

export default class splashscreen extends Component {

  componentDidMount() {
    setTimeout(function () {
      Actions.login();
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
