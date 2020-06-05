import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';
import orderStyle from './orderStyle';
var orderConstants = require('./orderConstants');

export default class MyProfile extends Component {
  render() {
    return (
      <View style={orderStyle.container}>
        <Header title={orderConstants.MANAGE_ORDER} isleftArrowDisplay={false}/>
        <View style={orderStyle.viewContainer}>
        </View>
      </View>
    );
  }
}

