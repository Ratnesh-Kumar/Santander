import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';
import favouriteStyle from './favouriteStyle';
var favouriteConstant = require('./favouriteConstants')

export default class FavouriteScreen extends Component {
  render() {
    return (
      <View style={favouriteStyle.container}>
        <Header title={favouriteConstant.FAVOURITE_SCREEN} />
        <View style={favouriteStyle.viewContainer}>
          <Text style={favouriteStyle.welcome}>{favouriteConstant.FAVOURITE_SCREEN}</Text>
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

