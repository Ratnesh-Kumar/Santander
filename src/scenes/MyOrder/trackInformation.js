/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-native/no-inline-forgotPasswordStyle */
/* eslint-disable react/no-string-refs */
import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';
import PropTypes from 'prop-types';
import TextInputMaterial from '../../components/textInputMaterial';
import orderStyle from './orderStyle';
import Header from '../../components/Header';
import SwitchTextInput from '../../components/SwitchTextInput';
import AppButton from '../../components/AppButton';
import { strings } from '../../i18next/i18n';
import { Actions } from 'react-native-router-flux';
import GlobalData from '../../utils/GlobalData'
var orderConstants = require('./orderConstants');
var constants = require('../../config/Constants');
var globalData = new GlobalData();
var colorConstant = require('../../config/colorConstant')

export default class TrackInformationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackingTitleText:''
    };
  }



  render() {
    return (
      <View style={orderStyle.container}>
        <Header isleftArrowDisplay={true} title={strings('TrackQuantityScreen.EnterTacking')} />
          {this.renderTextInput()}
          {this.renderSwitchTextInput()}
          {this.renderSaveButton()}
      </View>
    );
  }

  renderTextInput(){  
    return(
      <View
        style={[orderStyle.validFormViewContainer,{marginTop: 20}]}>
        <View style={orderStyle.inputWrapper}>
          <View style={orderStyle.validFormSubView}>
            <TextInputMaterial
              blurText={this.state.trackingTitleText}
              refsValue={'trackingTitle'}
              ref={'trackingTitle'}
              label={strings('TrackQuantityScreen.trackingTitle')}
              maxLength={100}
              autoCapitalize={'none'}
              onChangeText={text => this.setState({ trackingTitleText: text })}
              returnKeyType={'done'}
              autoCorrect={false}
              isLoginScreen={false}
              style={orderStyle.input}
              placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
              underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
              value={this.state.trackingTitleText}
              textInputName={this.state.trackingTitleText}
              // errorText={strings('createCampaign.skuErrorText')}
              underlineHeight={2}
              keyboardType="number"
              onSubmitEditing={event => {
              }}
            />
          </View>
        </View>
      </View>
    );
  }
  renderSwitchTextInput(){
    return (
      <View style={{ marginTop: 10 }}>
        <SwitchTextInput isDropDownVisbile={true} title={strings('TrackQuantityScreen.trackingPicker')}/>
      </View>
    )  
  }


  renderSaveButton() {
    return (
      <AppButton isLightTheme={false} buttonText={strings('TrackQuantityScreen.saveButtontext')} onButtonPressed={() => {
        this.showAlert()
      }} />
    );
  }

  showAlert() {
    Alert.alert(
      'Information',
      'Data is saved.',
      [
        { text: 'OK', onPress: () => Actions.pop() },
      ]
    );
  }
 
}

