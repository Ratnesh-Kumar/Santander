import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';
import moreStyle from './moreStyle';
var moreConstant = require('./moreConstants')

export default class MoreScreen extends Component {
  render() {
    return (
      <View style={moreStyle.container}>
        <Header title={moreConstant.MORE_SCREEN} />
        <View style={moreStyle.viewContainer}>
          <Text style={moreStyle.welcome}>{moreConstant.MORE_SCREEN}</Text>
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

