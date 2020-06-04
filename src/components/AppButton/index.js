import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import CardView from 'react-native-cardview'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
var colorConstant = require('../../config/colorConstant')

export default class AppButton extends Component {
  render() {
    return (
      <View>
        <CardView
          style={this.props.isLightTheme ? styles.lightThemButtonStyle : styles.darkThemButtonStyle}
          cardElevation={2}
          cardMaxElevation={2}
          cornerRadius={25}
          cornerOverlap={false}>
          <TouchableOpacity onPress={() => {
            this.props.onButtonPressed()
          }} style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }, (Platform.OS === 'android') ? {borderWidth:2, borderRadius: 25, borderColor: colorConstant.SANT_RED_COLOR} : {}]}>
            <Text style={this.props.isLightTheme ? styles.lightButtonText : styles.darkButtonText}>
              {this.props.buttonText}
            </Text>
          </TouchableOpacity>
        </CardView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  darkThemButtonStyle: {
    borderColor: colorConstant.GREY_BORDER_COLOR,
    borderWidth: 2,
    borderRadius: (Platform.OS == 'android') ? 5 : 20,
    justifyContent: 'center',
    margin: 20,
    height: 50,
    backgroundColor: colorConstant.SANT_RED_COLOR
  },
  lightThemButtonStyle: {
    borderColor: colorConstant.SANT_RED_COLOR,
    borderWidth: (Platform.OS === 'android') ? 0 : 1,
    borderRadius: (Platform.OS == 'android') ? 5 : 20,
    justifyContent: 'center',
    margin: 20,
    height: 50,
    backgroundColor: colorConstant.WHITE_COLOR
  },
  darkButtonText: {
    fontSize: 18, color: colorConstant.WHITE_COLOR, fontWeight: 'bold'
  },
  lightButtonText: {
    fontSize: 18, color: colorConstant.SANT_RED_COLOR, fontWeight: 'bold'
  }
});
