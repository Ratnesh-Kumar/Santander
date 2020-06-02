import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import CardView from 'react-native-cardview'
import { View, Text, TouchableOpacity } from 'react-native';
var colorConstant = require('../../config/colorConstant')

export default class AppButton extends Component {
  render() {
    return (
      <View>
        <CardView
          style={{
            borderColor: colorConstant.GREY_BORDER_COLOR,
            borderWidth: 2,
            borderRadius: 5,
            justifyContent: 'center',
            margin: 20,
            height: 50,
            backgroundColor: colorConstant.SANT_RED_COLOR
          }}
          cardElevation={2}
          cardMaxElevation={2}
          cornerRadius={25}
          cornerOverlap={false}>
          <TouchableOpacity onPress={()=>{
            this.props.onButtonPressed()
          }} style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontSize:20, color: colorConstant.WHITE_COLOR, fontWeight: 'bold'}}>
              {this.props.buttonText}
          </Text>
          </TouchableOpacity>
        </CardView>
      </View>
    );
  }
}
