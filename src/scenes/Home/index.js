import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';
import homeStyle from './homeStyle';
import {strings} from '../../i18next/i18n';
var constants = require('../../config/Constants');
var homeConstants = require('./homeConstants')

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={homeStyle.container}>
        <Header title={strings('screens.homeScreen')} />
        <View style={homeStyle.viewContainer}>
          <Text style={homeStyle.welcome}>{strings('screens.homeScreen')}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  viewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'black',
  },
});

