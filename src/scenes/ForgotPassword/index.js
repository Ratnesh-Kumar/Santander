/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-native/no-inline-forgotPasswordStyle */
/* eslint-disable react/no-string-refs */
import React, { Component } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Alert,
  Keyboard,
} from 'react-native';
import TextInputMaterial from '../../components/textInputMaterial';
import PropTypes from 'prop-types';
import { strings } from '../../i18next/i18n';
import { Actions } from 'react-native-router-flux';
import forgotPasswordStyle from './ForgotPasswordStyle';
import Header from '../../components/Header';
import AppButton from '../../components/AppButton';
import ActivityIndicatorView from '../../components/activityindicator/ActivityIndicator';
import DialogModalView from '../../components/modalcomponent/DialogModal';
import { fetchJsonGET } from '../../services/FetchData';
var commonConstants = require('../../config/Constants');
var colorConstant = require('../../config/colorConstant');

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isActivityIndicatorVisible: false,
      activityIndicatorText: '',
      isDialogModalVisible: false,
      dialogModalText: '',
      dialogModalTitle: '',
    };
  }

  componentDidMount() {
    // Actions.tabbar();
  }

  renderActivityIndicatorShow() {
    this.setState({
      isActivityIndicatorVisible: true,
      activityIndicatorText: strings('common.loading')
    });
  }

  renderActivityIndicatorHide() {
    this.setState({
      isActivityIndicatorVisible: false,
      activityIndicatorText: ''
    });
  }

  renderDialogModal(message) {
    this.setState({
      isDialogModalVisible: true,
      dialogModalText: message,
      dialogModalTitle: strings('forgotScreen.passwordResetFailed')
    });
    message = '';
  }
  renderDialogModalSuccess(message) {
    this.setState({
      isDialogModalVisible: true,
      dialogModalText: message,
      dialogModalTitle: strings('forgotScreen.passwordResetSuccessful'),
      username:''
    });
    message = '';
  }

  renderModal() {
    if (this.state.isDialogModalVisible) {
      return (
        <DialogModalView isVisible={this.state.isDialogModalVisible}
          title={this.state.dialogModalTitle}
          message={this.state.dialogModalText}
          handleClick={() => { this.setState({ isDialogModalVisible: false, dialogModalText: '' }) }} />);
    } else if (this.state.isActivityIndicatorVisible) {
      return (
        <ActivityIndicatorView isVisible={this.state.isActivityIndicatorVisible} text={this.state.activityIndicatorText} />
      );
    }
  }


  render() {
    return (
      <View style={forgotPasswordStyle.renderContainer}>
        <Header isleftArrowDisplay={true} isCrossIconVisible={true}  title={strings('forgotScreen.forgotTitle')} />
        {this.renderModal()}
        {this.renderForgotTitle()}
        <AppButton isLightTheme={false} buttonText={strings('forgotScreen.SendEmailButtonText')} onButtonPressed={() => {
          this.fetchService()
        }} />
      </View>
    );
  }
  emailValidation() {
    email=this.state.username;
    var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (reg.test(email)) {
      return true;
  }
  else {
      return false;
  }
  }

  isValidString(text) {
    if (text != '' && text != undefined) {
      return true;
    }
    return false;
  }

  async fetchService() {
    Keyboard.dismiss()
    if(this.state.username !== '' && this.emailValidation() ){
      this.renderActivityIndicatorShow()
      
      var responseData = await fetchJsonGET(commonConstants.USER_RESET_PASSWORD_URL+"/"+this.state.username)
      if (this.isValidString(responseData) && this.isValidString(responseData.statusMessage )) {
        console.log("########### status message" + responseData.statusMessage);
        if (responseData.statusMessage == commonConstants.USER_RESET_PASSWORD_STATUS) {
          //console.log("########### status message" + responseData.statusMessage);
          //Actions.forgotPassword();
           this.renderDialogModalSuccess(strings('forgotScreen.PasswordResetSuccess'));
        }
        else{
          this.renderDialogModal(strings('forgotScreen.PasswordResetError'), responseData.statusMessage);
        }
      }
     
      this.renderActivityIndicatorHide()
    }
    else{
      Alert.alert(strings('common.alert'),strings('forgotScreen.enterCorrectEmail'))
    }
  }

  renderEmailTextInput() {

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
                Keyboard.dismiss()
                //this.refs.passwordInput.focus();
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




  // renderForgotPassButton() {
  //   return (
  //     <View style={forgotPasswordStyle.forgotPasswordButtonView}>
  //       <TouchableOpacity
  //         style={forgotPasswordStyle.button}
  //         onPress={() => this.onPasswordResetClicked()}
  //         activeOpacity={1}>
  //         <Text
  //           style={forgotPasswordStyle.forgotPasswordButtonText}>
  //           {strings('forgotScreen.SendEmailButtonText')}
  //         </Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }

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
