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
import Header from '../../components/Header';
var commonConstants = require('../../config/Constants');
var colorConstant = require('../../config/colorConstant');
var registerConstant = require('./RegisterConstants.js');

export default class RegisterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPass: '',
      phone: '',
      hidden: true,
      passwordHiddenIcon: registerConstant.INFO_PASSWORD_HIDDEN,
      showPassModal: false,



    }
  }


  render() {
    return (
      <View style={registerStyle.renderContainer}>
        <Header isleftArrowDisplay={true} title={strings('registerScreen.digiShopTitle')} />
        {/*this.renderRegisterTitle()*/}
        {this.renderValidationForm()}
        {this.showPasswordHintBox()}
        {this.renderSignUpButton()}
        {this.renderTermsView()}
        {this.renderUpdateText()}
      </View>
    );
  }
  isAlpha() {
    const { password } = this.state;
    var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (format.test(password)) {
      return true;
      this.setState({ alpha: true })
    }
    else {
      return false;
    }
  }
  isCapital() {
    const { password } = this.state;
    var format = /[A-Z]/;
    if (format.test(password))
      return true;
    else
      return false;
  }
  isSmall() {
    const { password } = this.state;
    var format = /[a-z]/;
    if (format.test(password))
      return true;
    else
      return false;
  }
  isNumeric() {
    const { password } = this.state;
    var format = /[0-9]/;
    if (format.test(password))
      return true;
    else
      return false;
  }
  isValid() {
    const { password } = this.state;
    var format = /^([0-9a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,16})$/;
    if (format.test(password))
      return true;
    else
      return false;
  }


  showPasswordHintBox() {
    if (this.state.showPassModal && this.state.password != '') {
      return (
        <View style={{ backgroundColor: '#eff6f9', paddingTop: 20, paddingLeft: 20 }}>
          <View style={{ flexDirection: 'row',paddingTop:5 }}>
            <Image source={this.isValid() ? registerConstant.GREEN_TICK : registerConstant.GRAY_TICK} />
            <Text style={{ fontSize: 16, color: '#000000' }}>{strings('registerScreen.PasswordValid1')}</Text>
          </View>
          <View style={{ flexDirection: 'row',paddingTop:5  }}>
            <Image source={this.isCapital() ? registerConstant.GREEN_TICK : registerConstant.GRAY_TICK} />
            <Text style={{ fontSize: 16, color: '#000000' }}>{strings('registerScreen.PasswordValid2')}</Text>
          </View>
          <View style={{ flexDirection: 'row',paddingTop:5  }}>
            <Image source={this.isSmall() ? registerConstant.GREEN_TICK : registerConstant.GRAY_TICK} />
            <Text style={{ fontSize: 16, color: '#000000' }}>{strings('registerScreen.PasswordValid3')}</Text>
          </View>
          <View style={{ flexDirection: 'row',paddingTop:5  }}>
            <Image source={this.isNumeric() ? registerConstant.GREEN_TICK : registerConstant.GRAY_TICK} />
            <Text style={{ fontSize: 16, color: '#000000' }}>{strings('registerScreen.PasswordValid4')}</Text>
          </View>
          <View style={{ flexDirection: 'row',paddingTop:5  }}>
            <Image source={this.isAlpha() ? registerConstant.GREEN_TICK : registerConstant.GRAY_TICK} />
            <Text style={{ fontSize: 16, color: '#000000' }}>{strings('registerScreen.PasswordValid5')}</Text>
          </View>
        </View>
      )

    }
    else {
      <View></View>
    }
  }

  renderRegisterTitle() {
    return (
      {}
      // <View style={registerStyle.registerTitleView}>
      //   <View style={{ alignItems: 'center', top: 24 }}>
      //     <Text style={registerStyle.registerTitleText}>{strings('registerScreen.digiShopTitle')}</Text>
      //   </View>
      //   <TouchableOpacity onPress={() => Actions.login()}
      //     style={registerStyle.closeIcon}>
      //     <Image style={{}}
      //       source={registerConstant.CLOSE_ICON} />
      //   </TouchableOpacity>

      // </View>


    )
  }
  setPasswordVisibility() {
    if (this.state.hidden) {
      this.setState({
        hidden: false, passwordHiddenIcon: registerConstant.INFO_PASSWORD_SHOW
      })
    } else {
      this.setState({
        hidden: true, passwordHiddenIcon: registerConstant.INFO_PASSWORD_HIDDEN
      })
    }
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
                refsValue={strings('registerScreen.PhoneTextInput')}
                ref={strings('registerScreen.PhoneTextInput')}
                label={strings('registerScreen.PhoneTextInput')}
                maxLength={100}
                autoCapitalize={'none'}
                onChangeText={phone => this.setState({ phone })}
                returnKeyType={'done'}
                autoCorrect={false}
                isLoginScreen={false}
                style={registerStyle.input}
                placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                underlineColorAndroid={commonConstants.UNDERLINE_COLOR_ANDROID}
                value={this.state.phone}
                textInputName={this.state.phone}
                errorText={strings('registerScreen.PhoneTextInputError')}
                underlineHeight={2}
                keyboardType="number"
                onSubmitEditing={event => {
                  this.refs.passwordInput.focus();
                }}
              />
            </View>

            <View style={registerStyle.validFormSecondFieldView}>
              <TextInputMaterial
                secureTextEntry={this.state.hidden}
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
                onChangeText={password => this.setState({ password, showPassModal: true })}
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
            {/* <TouchableOpacity style={{flex:1, position: 'absolute', right: 30, top: 165, alignSelf: 'center', height: 10, width: 10, justifyContent: 'center', zIndex: 999}} onPress={() => this.setPasswordVisibility()}>
              <Image source={this.state.passwordHiddenIcon} />
            </TouchableOpacity>   */}
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
          <Text onPress={() => Actions.termsAndPrivacy({ selectedTitle: 'terms' })} style={{ color: colorConstant.SANTANDAR_COLOR }}>{strings('registerScreen.TermsConditionTitle1')}</Text>
          <Text>{strings('registerScreen.TermsConditionTitle2')}</Text>
          <Text onPress={() => Actions.termsAndPrivacy({ selectedTitle: 'privacy' })} style={{ color: colorConstant.SANTANDAR_COLOR }}>{strings('registerScreen.TermsConditionSubTitle')}</Text>
          <Text>{strings('registerScreen.TermsConditionSubTitle1')}</Text>
        </Text>
      </View>
    );
  }

  renderUpdateText() {
    return (
      <View style={registerStyle.UpdatedView}>
        <Text style={{ position: 'absolute', bottom: 25 }}>{strings('registerScreen.UpdatedText')}</Text>
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