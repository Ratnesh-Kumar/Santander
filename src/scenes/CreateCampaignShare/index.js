/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-native/no-inline-forgotPasswordStyle */
/* eslint-disable react/no-string-refs */
import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import createStyle from './CreateCampaignShareStyle';
import Header from '../../components/Header';
import SwitchTextInput from '../../components/SwitchTextInput';
var constants = require('../../config/Constants');

export default class CreateCampaiganShare extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

 
  
  render() {
    return (
      <View style={createStyle.renderContainer}>
        <Header isleftArrowDisplay={true} title={"Create Campaign"} />
        {this.renderSwitchTextInput()}
        {this.renderBottomView()}
      </View>
    );
  }

  renderBottomView(){
    return(
      <View>
        <Text style={createStyle.bottomTextStyle}>{'All these campaigns shall also be published to\nthe Digishop site when ready'}</Text>
        {this.renderPublishButton()}
      </View>  
    );
  }

  renderPublishButton(){
    return (
      <View style={createStyle.publishButtonView}>
        <TouchableOpacity
          style={createStyle.button}
          onPress={() => {
            alert('PUBLISH NOW')
          }}
          activeOpacity={1}>
          {}
          <Text
            style={createStyle.publishButtonText}>
            {'Publish Now'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  renderSwitchTextInput(){
    return(
      <ScrollView style={{marginLeft: 20, marginRight: 20, marginTop:10 }}>
        {this.renderSwitchFields('WhatsApp')}
        {this.renderSwitchFields('FaceBook Messenger')}
        {this.renderSwitchFields('Text(SMS)')}
        {this.renderSwitchFields('eMail')}
        {this.renderSwitchFields('FaceBook Page')}
        {this.renderSwitchFields('FaceBook Shop')}
        {this.renderSwitchFields('FaceBook Market Place')}
        {this.renderSwitchFields('Pinterest')}
        {this.renderSwitchFields('Instagram')}
      </ScrollView>  
    );
  }

  renderSwitchFields(title){
    return(
      <View style={{paddingTop:10,paddingRight:10}}>
      <SwitchTextInput
          defaultSwitchValue={true}
          onRightPressed={(value) => { console.log('SWITCH VA:UE ::::',value) }}
          title={title}
        />
        </View>
    );
  }

 
  
}

