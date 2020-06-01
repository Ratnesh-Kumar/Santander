import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    KeyboardAvoidingView,
    TouchableOpacity,
} from 'react-native';
import TextInputMaterial from '../../components/textInputMaterial';
import PropTypes from 'prop-types';
import Constants from '../../config/Constants';
import { strings } from '../../i18next/i18n';
import { Actions } from 'react-native-router-flux';
import registerStyle from './RegisterStyle';

var commonConstants = require('../../config/Constants');
var colorConstant = require('../../config/colorConstant');
var registerConstant = require('./RegisterConstants.js');

export default class RegisterView extends Component {
    constructor(props) {
      super(props);
      this.state = {
          username:'',
          password:'',
          confirmPass:'',
          phone:'',
          showPass:false,
      }
    }


    render() {
        return (
          <View style={registerStyle.renderContainer}>
            {this.renderRegisterTitle()}
            {this.renderValidationForm()}
            {this.renderSignUpButton()}
            {this.renderTermsView()}
            {this.renderUpdateText()}
          </View>
        );
      }

      renderRegisterTitle() {
        return (
          <View style={registerStyle.registerTitleView}>
            <Text style={registerStyle.registerTitleText}>{strings('registerScreen.digiShopTitle')}</Text>
          </View>
        )
      }

      renderValidationForm() {
        return (
          <KeyboardAvoidingView
            behavior="height"
            style={registerStyle.validFormViewContainer}>
            <View style={registerStyle.inputWrapper}>
              <View style={registerStyle.validFormSubView}>
                <TextInputMaterial
                  blurText={this.state.username}
                  refsValue={strings('registerScreen.UserTextInput')}
                  ref={strings('registerScreen.UserTextInput')}
                  label={strings('registerScreen.UserTextInput')}
                  maxLength={100}
                  autoCapitalize={'none'}
                  onChangeText={username => this.setState({ username })}
                  returnKeyType={'done'}
                  autoCorrect={false}
                  isLoginScreen={false}
                  style={registerStyle.input}
                  placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                  underlineColorAndroid={commonConstants.UNDERLINE_COLOR_ANDROID}
                  value={this.state.username}
                  textInputName={this.state.username}
                  errorText={strings('registerScreen.UserTextInputError')}
                  underlineHeight={2}
                  keyboardType="email-address"
                  onSubmitEditing={event => {
                    this.refs.phoneInput.focus();
                  }}
                />
                 <View style={registerStyle.validFormSecondFieldView}>
                  <TextInputMaterial
                    blurText={this.state.phone}
                    //refsValue={commonConstants.TEXT_INPUT_PASSWORD}
                    showIcon={false}
                    value={this.state.phone}
                    textInputName={this.state.phone}
                    refsValue={strings('registerScreen.PhoneTextInput')}
                    ref={strings('registerScreen.PhoneTextInput')}
                    label={strings('registerScreen.PhoneTextInput')}
                    maxLength={50}
                    underlineHeight={2}
                    isLoginScreen={false}
                    returnKeyType="next"
                    onChangeText={phone => this.setState({ phone })}
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    autoCorrect={false}
                    style={registerStyle.input}
                    placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                    underlineColorAndroid={colorConstant.UNDERLINE_COLOR_ANDROID}
                    errorText={strings('registerScreen.PhoneTextInputError')}
                    onSubmitEditing={event => {
                        this.refs.passwordInput.focus();
                      }}
                  />
                </View>

                <View style={registerStyle.validFormSecondFieldView}>
                  <TextInputMaterial
                    secureTextEntry={this.state.showPass}
                    blurText={this.state.password}
                    //refsValue={commonConstants.TEXT_INPUT_PASSWORD}
                    showIcon={false}
                    value={this.state.password}
                    textInputName={this.state.password}
                    refsValue={strings('registerScreen.PasswordTextInput')}
                    ref={strings('registerScreen.PasswordTextInput')}
                    label={strings('registerScreen.PasswordTextInput')}
                    maxLength={50}
                    underlineHeight={2}
                    isLoginScreen={false}
                    returnKeyType="next"
                    onChangeText={password => this.setState({ password })}
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    autoCorrect={false}
                    style={registerStyle.input}
                    placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                    underlineColorAndroid={colorConstant.UNDERLINE_COLOR_ANDROID}
                    errorText={strings('registerScreen.PasswordTextInputError')}
                    onFocus={() => this.inputFocused.bind(this)}
                  />
                </View>
                {/* <TouchableOpacity
                  activeOpacity={0.7}
                  style={registerStyle.btnEye}
                  onPress={this.showPass}>
                  <Image source={commonConstants.EYE_ICON} style={registerStyle.iconEye} />
                </TouchableOpacity>  */}

              </View>
            </View>
          </KeyboardAvoidingView>
        );
      }
      renderTermsView() {
        return (
          <View style={registerStyle.termsAndConditionView}>
            <Text style={{ fontSize: 16, textAlign: 'center' }}>
              <Text>{strings('registerScreen.TermsConditionTitle')}</Text>
              <Text style={{ color: colorConstant.SANTANDAR_COLOR }}>{strings('registerScreen.TermsConditionTitle1')}</Text>
              <Text>{strings('registerScreen.TermsConditionTitle2')}</Text>
              <Text style={{ color: colorConstant.SANTANDAR_COLOR }}>{strings('registerScreen.TermsConditionSubTitle')}</Text>
              <Text>{strings('registerScreen.TermsConditionSubTitle1')}</Text>
            </Text>
          </View>
        );
      }

      renderUpdateText(){
        return (
          <View style={registerStyle.UpdatedView}>
              <Text style={{ position: 'absolute',bottom:25}}>{strings('registerScreen.UpdatedText')}</Text>
          </View>
        );
      }
      renderSignUpButton() {
        return (
          <View style={registerStyle.registerSumbitButtonView}>
            <TouchableOpacity
              style={registerStyle.button}
              onPress={() => Actions.tabbar()}
              activeOpacity={1}>
              {}
              <Text
                style={registerStyle.registerSubmitButtonText}>
                {strings('registerScreen.SignUpButttonText')}
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
RegisterView.propTypes = {
    source: PropTypes.number.isRequired,
    placeholder: PropTypes.string.isRequired,
    secureTextEntry: PropTypes.bool,
    autoCorrect: PropTypes.bool,
    autoCapitalize: PropTypes.string,
    returnKeyType: PropTypes.string,
  };