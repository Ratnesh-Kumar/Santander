/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-native/no-inline-loginStyle */
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
// import { getFBRealtimeDBFeatureFlags } from '../../config/firebasequery'
// import Realm from 'realm';
import { TBC_COLOR } from '../../config/colorConstant';
import TouchID from 'react-native-touch-id';
import ConfirmGoogleCaptcha from 'react-native-google-recaptcha-v2';
import loginStyle from './LoginStyle';
var commonConstants = require('../../config/Constants');
var colorConstant = require('../../config/colorConstant')
var loginConstant = require('./loginConstants.js')
let realm;
const siteKey = '6Le2394UAAAAAHlpjMsukQVuXNAMFLClkynBAQTh';
const baseUrl = 'https://lami.net.in';
const MARGIN = 40;
const DEVICE_WIDTH = Dimensions.get('window').width;
var isCaptchaDisplay = false;
export default class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
      isLoading: false,
      username: '',
      password: '',
      isTouchIdSupported: false,
      isFaceIdSupported: false,
    };
    this.showPass = this.showPass.bind(this);
    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
     this.onMessage = this.onMessage.bind(this);
    // realm = new Realm({ path: 'UserDatabase.realm' });
    //creating temporary user logins
    // realm.write(() => {
    //   realm.create('user_details', {
    //     user_name: 'admin1',
    //     user_password: 'admin1',
    //   });
    // });
    this.isTouchIdSupported()
    this.getFireBaseValue();
  }

  componentDidMount(){
    // Actions.tabbar();
  }

  async getFireBaseValue() {
    // let featureFlags = await getFBRealtimeDBFeatureFlags();
    // isCaptchaDisplay = featureFlags.isCaptchaDisplay
  }
  isTouchIdSupported() {
    const optionalConfigObject = {
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
    }

    TouchID.isSupported(optionalConfigObject)
      .then(biometryType => {
        // Success code
        if (biometryType === 'FaceID') {
          this.setState({ isFaceIdSupported: true, isTouchIdSupported: true })
          console.log('FaceID is supported.');
        } else {
          this.setState({ isFaceIdSupported: false, isTouchIdSupported: true })
          console.log('TouchID is supported.');
        }
      })
      .catch(error => {
        // Failure code
        console.log(error);
      });
  }

  showPass() {
    this.state.press === false
      ? this.setState({ showPass: false, press: true })
      : this.setState({ showPass: true, press: false });
  }

  onMessage = event =>{
    console.log('########## onMeassage: '+event);
    if (event && event.nativeEvent.data) {
      if (['cancel', 'error', 'expired'].includes(event.nativeEvent.data)) {
        console.log('error', event.nativeEvent.data);
        this.captchaForm.hide();
        return;
      } else {
        console.log('Verified code from Google', event.nativeEvent.data);
        setTimeout(() => {
          this.captchaForm.hide();
          // do what ever you want here
        }, 1500);
      }
    }
  };

  render() {
    return (
      <View style={loginStyle.renderContainer}>
        {this.renderLoginTitle()}
        {this.renderValidationForm()}
        {this.renderForgotPassword()}
        {this.renderSignInButton()}
        {this.renderTermsView()}
        {this.renderSignUpButton()}
        {this.renderUpdateText()}
        {/* {this.renderTouchIdAndFaceId()}
        <ConfirmGoogleCaptcha
          ref={_ref => this.captchaForm = _ref}
          siteKey={siteKey}
          baseUrl={baseUrl}
          languageCode='en'
          onMessage={()=>this.onMessage()}
        /> */}
      </View>
    );
  }

  renderTouchIdAndFaceId() {
    return (
      <View style={loginStyle.touchIdContainer}>
        {(this.state.isTouchIdSupported) ? <TouchableOpacity onPress={() => { this.handleBioAuthentication() }}>
          <Text style={loginStyle.touchIdLinkView}>{'Login with Touch ID / Face ID'}</Text>
        </TouchableOpacity> : null}
        <TouchableOpacity onPress={() => { (isCaptchaDisplay) ? this.captchaForm.show() : alert("Login Success") }} style={loginStyle.reCaptchaView}>
          <Text style={loginStyle.touchIdLinkView}>{'reCaptcha'}</Text>
        </TouchableOpacity>
      </View>
    )
  }



  handleBioAuthentication() {
    let typeBioMatrix = "Touch ID";
    if (this.state.isFaceIdSupported) {
      typeBioMatrix = "Face ID";
    }
    const optionalConfigObject = {
      title: typeBioMatrix + " Authentication", // use unified error messages (default false)
      imageColor: colorConstant.TBC_COLOR, // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
      imageErrorColor: colorConstant.BROWSE_RED,
      cancelText: 'Close'
    }
    TouchID.authenticate('Biomatrix Login', optionalConfigObject)
      .then(success => {
        // Success code
        Actions.tabbar()
        // alert('Authentication Successful')
      })
      .catch(error => {
        // Failure code
        alert('Authentication Failed!')
      });
  }

  renderForgotPassword() {
    return (
      <View style={{ margin : 25 , alignItems:'flex-end'}}>
        <TouchableOpacity
          onPress={() => Actions.forgotPassword()}>
        <Text style={loginStyle.forgotTitleText}>{strings('loginScreen.forgotPasswordTitle')}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderLoginTitle() {
    return (
      <View style={loginStyle.loginTitleView}>
        <Text style={loginStyle.loginTitleText}>{strings('loginScreen.digiShopTitle')}</Text>
        <Text style={loginStyle.loginTitleSubText}>{strings('loginScreen.digiShopSubTitle')}</Text>
      </View>
    )
  }

  renderValidationForm() {
    return (
      <KeyboardAvoidingView
        behavior="height"
        style={loginStyle.validFormViewContainer}>
        <View style={loginStyle.inputWrapper}>
          <View style={loginStyle.validFormSubView}>
            <TextInputMaterial
              blurText={this.state.username}
              refsValue={strings('loginScreen.UserTextInput')}
              ref={strings('loginScreen.UserTextInput')}
              label={strings('loginScreen.UserTextInput')}
              maxLength={100}
              autoCapitalize={'none'}
              onChangeText={username => this.setState({ username })}
              returnKeyType={'done'}
              autoCorrect={false}
              isLoginScreen={false}
              style={loginStyle.input}
              placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
              underlineColorAndroid={commonConstants.UNDERLINE_COLOR_ANDROID}
              value={this.state.username}
              textInputName={this.state.username}
              errorText={strings('loginScreen.UserTextInputError')}
              underlineHeight={2}
              keyboardType="email-address"
              onSubmitEditing={event => {
                this.refs.passwordInput.focus();
              }}
            />
            <View style={loginStyle.validFormSecondFieldView}>
              <TextInputMaterial
                secureTextEntry={this.state.showPass}
                blurText={this.state.password}
                //refsValue={commonConstants.TEXT_INPUT_PASSWORD}
                showIcon={false}
                value={this.state.password}
                textInputName={this.state.password}
                refsValue={strings('loginScreen.PasswordTextInput')}
                ref={strings('loginScreen.PasswordTextInput')}
                label={strings('loginScreen.PasswordTextInput')}
                maxLength={50}
                underlineHeight={2}
                isLoginScreen={false}
                returnKeyType="next"
                onChangeText={password => this.setState({ password })}
                autoCapitalize={'none'}
                returnKeyType={'done'}
                autoCorrect={false}
                style={loginStyle.input}
                placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                underlineColorAndroid={colorConstant.UNDERLINE_COLOR_ANDROID}
                errorText={strings('loginScreen.PasswordTextInputError')}
                onFocus={() => this.inputFocused.bind(this)}
              />
            </View>
            {/* <TouchableOpacity
              activeOpacity={0.7}
              style={loginStyle.btnEye}
              onPress={this.showPass}>
              <Image source={commonConstants.EYE_ICON} style={loginStyle.iconEye} />
            </TouchableOpacity>  */}
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
  renderSignInButton() {
    return (
      <View style={loginStyle.loginSumbitButtonView}>
        <TouchableOpacity
          style={loginStyle.button}
          onPress={() => {
            Actions.tabbar();
          }}
          activeOpacity={1}>
          {}
          <Text
            style={loginStyle.loginSubmitButtonText}>
            {strings('loginScreen.SignInButtonText')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  renderTermsView() {
    return (
      <View style={loginStyle.termsAndConditionView}>
        <Text style={{ fontSize: 16, textAlign: 'center' }}>
          <Text>{strings('loginScreen.TermsConditionTitle')}</Text>
          <Text  onPress={() => Actions.termsAndPrivacy({selectedTitle:'terms'})} style={{ color: colorConstant.SANTANDAR_COLOR }}>{strings('loginScreen.TermsConditionTitle1')}</Text>
          <Text>{strings('loginScreen.TermsConditionTitle2')}</Text>
          <Text  onPress={() => Actions.termsAndPrivacy({selectedTitle:'privacy'})} style={{ color: colorConstant.SANTANDAR_COLOR }}>{strings('loginScreen.TermsConditionSubTitle')}</Text>
          <Text>{strings('loginScreen.TermsConditionSubTitle1')}</Text>
        </Text>
      </View>
    );
  }
  renderSignUpButton() {
    return (
      <View style={loginStyle.loginSumbitButtonView}>
        <TouchableOpacity
          style={loginStyle.signInButton}
          onPress={() => Actions.register()}
          activeOpacity={1}>
          {}
          <Text
            style={loginStyle.signUpButtonText}>
            {strings('loginScreen.SignUpButttonText')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  renderUpdateText(){
    return (
      <View style={loginStyle.UpdatedView}>
          <Text style={{ position: 'absolute',bottom:25}}>{strings('loginScreen.UpdatedText')}</Text>
      </View>
    );
  }
  onPress() {
    const { username } = this.state;
    const { password } = this.state;

    // var user_details = realm
    //   .objects('user_details')
    //   .filtered('user_name =$0 && user_password=$1', username, password);

    if (this.state.username === '' || this.state.password === '') {
      Alert.alert('Alert', 'Either Username or Password Field is empty');
      return;
    } else if (user_details.length > 0) {
      Actions.tabbar();
    } else {
      Alert.alert('Alert', 'Either Username or Password is wrong');
    }
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
LoginView.propTypes = {
  source: PropTypes.number.isRequired,
  placeholder: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool,
  autoCorrect: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  returnKeyType: PropTypes.string,
};
