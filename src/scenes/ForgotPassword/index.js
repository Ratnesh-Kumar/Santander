/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-native/no-inline-forgotPasswordStyle */
/* eslint-disable react/no-string-refs */
import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
  Alert,
} from 'react-native';
import TextInputMaterial from '../../components/textInputMaterial';
import PropTypes from 'prop-types';
import Constants from '../../config/Constants';
import { strings } from '../../i18next/i18n';
import { Actions } from 'react-native-router-flux';
import TouchID from 'react-native-touch-id';
import forgotPasswordStyle from './ForgotPasswordStyle';
import Header from '../../components/Header';
import AppButton from '../../components/AppButton'
var commonConstants = require('../../config/Constants');
var colorConstant = require('../../config/colorConstant');

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
  }

  componentDidMount(){
    // Actions.tabbar();
  }

  
  render() {
    return (
      <View style={forgotPasswordStyle.renderContainer}>
        <Header isleftArrowDisplay={true} title={strings('forgotScreen.forgotTitle')} />
        {this.renderForgotTitle()}
        <AppButton buttonText={strings('forgotScreen.SendEmailButtonText')}onButtonPressed={()=>{
               alert('Please check your email ')
            }}/>
      </View>
    );
  }

  renderEmailTextInput(){

    return (
      <KeyboardAvoidingView
        behavior="height"
        style={forgotPasswordStyle.validFormViewContainer}>
        <View style={forgotPasswordStyle.inputWrapper}>
          <View style={forgotPasswordStyle.validFormSubView}>
            <TextInputMaterial
              blurText={this.state.username}
              refsValue={'emailTextInput'}
              ref={'emailTextInput'}
              label={strings('forgotScreen.UserTextInput')}
              maxLength={100}
              autoCapitalize={'none'}
              onChangeText={username => this.setState({ username })}
              returnKeyType={'done'}
              autoCorrect={false}
              isLoginScreen={false}
              style={forgotPasswordStyle.input}
              placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
              underlineColorAndroid={commonConstants.UNDERLINE_COLOR_ANDROID}
              value={this.state.username}
              textInputName={this.state.username}
              errorText={strings('forgotScreen.UserTextInputError')}
              underlineHeight={2}
              keyboardType="email-address"
              onSubmitEditing={event => {
                this.refs.passwordInput.focus();
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }

  renderForgotTitle() {
    return (
      <View style={forgotPasswordStyle.forgotTitleView}>
        <Text style={forgotPasswordStyle.forgotTitleSubText}>{strings('forgotScreen.forgotSubTitle')}</Text>
        {this.renderEmailTextInput()}
      </View>
    )
  }

  
  renderForgotPassButton() {
    return (
      <View style={forgotPasswordStyle.forgotPasswordButtonView}>
        <TouchableOpacity
          style={forgotPasswordStyle.button}
          onPress={() => alert('Please check your emailID.')}
          activeOpacity={1}>
          <Text
            style={forgotPasswordStyle.forgotPasswordButtonText}>
            {strings('forgotScreen.SendEmailButtonText')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  inputFocused(refName) {
    setTimeout(() => {
      let scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        // eslint-disable-next-line no-undef
        ReactNative.findNodeHandle(this.refs[refName]),
        140, //additionalOffset
        true,
      );
    }, 50);
  }
}
ForgotPassword.propTypes = {
  source: PropTypes.number.isRequired,
  placeholder: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool,
  autoCorrect: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  returnKeyType: PropTypes.string,
};
