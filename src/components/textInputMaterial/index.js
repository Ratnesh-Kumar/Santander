/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-string-refs */
/* eslint-disable eqeqeq */
/* eslint-disable use-isnan */
import ReactNative, { View, Text } from 'react-native';
import TextInput from './MaterialTextInput';
import React, { PureComponent } from 'react';

var colorConstants = require('../../config/colorConstant');
var constants = require('../../config/Constants');

export default class TextInputMaterial extends PureComponent {
  constructor(props) {
    super(props);
    this.uneditColorCode = (props.isLoginScreen)?'white':colorConstants.MATERIAL_DESIGN_UNEDIT_COLOR;
    this.activeColorCode = (props.isLoginScreen)?'white':colorConstants.LOGIN_BUTTON_BLUE;
    this.successColorCode = (props.isLoginScreen)?'white':colorConstants.MATERIAL_DESIGN_SUCCESS_COLOR;
    this.errorColorCode = colorConstants.MATERIAL_DESIGN_ERROR_COLOR;
    this.inputTextColorCode = (props.isLoginScreen)?'white':'black'
    this.state = {
      labelColor: this.uneditColorCode,
      errorText: '',
      loginName: '',
      password: '',
      scrollViewHeight: '',
      underlineColor: this.uneditColorCode,
      focused: false,
      isAlphaNumeric: false,
      activeColor: this.uneditColorCode,
      underlineHeight: 1,
      addressAutocomplete: [],
    };
  }
  isValidString(data) {
    let isItValidString =
      data != null && data != undefined && data != '' && data != NaN
        ? true
        : false;
    return isItValidString;
  }
  onFocus() {
    // this.inputFocused(textInputName);
    this.setState({
      error: '',
      errorText: '',
      underlineColor: this.activeColorCode,
      underlineHeight: 2,
      labelColor: this.activeColorCode,
      activeColor: this.activeColorCode,
    });
    if (typeof this.props.borderColorAction == 'function') {
      this.props.borderColorAction(this.activeColorCode);
    }
  }

  checkAlphaNumericValue(textInput) {
    if (/[^a-zA-Z0-9]/.test(textInput)) {
      return false;
    } else {
      return true;
    }
  }

  checkAlphaNumericName(textInput) {
    if (/^([a-zA-Z0-9 _-]+)$/.test(textInput)) {
      return true;
    } else {
      return false;
    }
  }
  checkForNumeric(zipCode) {
    var reg = /^-?\d+\.?\d*$/;
    if (reg.test(zipCode)) {
      return true;
    } else {
      return false;
    }
  }

  validateUserNameInput(username) {
    if (username.trim().length === 0) {
      this.setState({
        errorText: 'Please enter the name',
        scrollViewHeight: constants.SCREEN_HEIGHT - 44,
        underlineColor: this.errorColorCode,
        labelColor: this.errorColorCode,
      });
    } else if (
      username.trim().length < 1 ||
      !this.checkAlphaNumericName(this.props.blurText)
    ) {
      this.setState({
        errorText: 'Please enter a valid name',
        scrollViewHeight: constants.SCREEN_HEIGHT - 44,
        underlineColor: this.errorColorCode,
        labelColor: this.errorColorCode,
      });
    } else {
      this.setState({
        errorText: '',
        scrollViewHeight: constants.SCREEN_HEIGHT - 44,
        underlineColor: this.successColorCode,
        labelColor: this.successColorCode,
      });
    }
  }

  containsSpecialChar(textInput) {
    var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (format.test(textInput)) {
      return true;
    } else {
      return false;
    }
  }

  specialCharIncludingWhiteSpace(textInput) {
    var format = /^[0-9a-zA-Z \b]+$/;
    if (format.test(textInput)) {
      return true;
    } else {
      return false;
    }
  }

  isValidPhoneNumber(phoneNumberString) {
    // var phoneno = /^\d{10}$/;
    let firstAreaCodeChar,
      firstExchangeChar,
      state = true;
    phoneNumberString = phoneNumberString.toString().replace(/\D/g, ''); //remove all non-digits
    firstAreaCodeChar = phoneNumberString.charAt(0);
    firstExchangeChar = phoneNumberString.charAt(3);
    if (phoneNumberString.length !== 10) {
      state = false;
    } else if (phoneNumberString === '5555555555') {
      // 555-555-5555 is reserved by CDAP
      state = false;
    } else if (firstAreaCodeChar === '0' || firstAreaCodeChar === '1') {
      // The North American Numbering Plan (NANP) does not permit the digits 0 and 1 as the leading digit of an area code.
      state = false;
    } else if (firstExchangeChar === '0' || firstExchangeChar === '1') {
      // Allowed ranges for exchange: [2-9] for the first digit, and [0-9] for both the second and third digits
      state = false;
    }
    return state;
  }
  validateUserName(userName) {
    if (userName.length === 0) {
      this.setState({
        errorText: 'Please enter your username/email',
        scrollViewHeight: constants.SCREEN_HEIGHT - 44,
        underlineColor: this.errorColorCode,
        labelColor: this.errorColorCode,
      });
    } else if (userName.length < 2) {
      this.setState({
        errorText: 'Please enter a valid login name',
        scrollViewHeight: constants.SCREEN_HEIGHT - 44,
        underlineColor: this.errorColorCode,
        labelColor: this.errorColorCode,
      });
    } else {
      this.setState({
        errorText: '',
        scrollViewHeight: constants.SCREEN_HEIGHT - 44,
        underlineColor: this.successColorCode,
        labelColor: this.successColorCode,
      });
    }
  }

  async onBlur() {
    if (this.props.refsValue === 'optional') {
      this.setState({
        errorText: '',
        activeColor: this.uneditColorCode,
      });
    } else if (this.props.refsValue === 'passwordInput') {
      this.validateLoginPassword(this.props.blurText);
    } else if (
      this.props.refsValue === 'email-address' ||
      this.props.refsValue === 'loginNameInput'
    ) {
      this.validateUserName(this.props.blurText);
    } else {
      this.setState({
        errorText: this.checkValidText(this.props.blurText)
          ? ''
          : this.props.errorText,
        scrollViewHeight: constants.SCREEN_HEIGHT - 44,
        underlineColor: this.checkValidText(this.props.blurText)
          ? this.successColorCode
          : this.errorColorCode,
        labelColor: this.checkValidText(this.props.blurText)
          ? this.successColorCode
          : null,
      });
    }
    if (typeof this.props.borderColorAction == 'function') {
      if (
        this.props.refsValue === 'newPasswordRef' ||
        this.props.refsValue === 'schoolName'
      ) {
        this.props.borderColorAction(
          this.checkValidText(this.props.blurText) === true
            ? this.successColorCode
            : this.errorColorCode,
        );
      } else {
        this.props.borderColorAction(this.state.underlineColor);
      }
    }
  }

  validateLoginPassword(receivedPassword) {
    if (receivedPassword.length === 0) {
      this.setState({
        errorText: 'Please enter your password',
        scrollViewHeight: constants.SCREEN_HEIGHT - 44,
        underlineColor: this.errorColorCode,
        labelColor: this.errorColorCode,
      });
    } else {
      this.setState({
        underlineColor: this.successColorCode,
        labelColor: this.successColorCode,
      });
    }
  }

  checkValidText(textInput) {
    let blnIsValidString = false;
    if (textInput.trim().length > 2) {
      blnIsValidString = true;
    } else {
      blnIsValidString = false;
    }
    if (this.props.refsValue === 'password') {
    }
    if (this.props.refsValue === 'listName') {
      if (textInput.trim().length > 0) {
        blnIsValidString = true;
      } else {
        blnIsValidString = false;
      }
    }
    if (this.props.refsValue === 'newPasswordRef') {
      if (!this.props.validValue) {
        return false;
      }
    }
    return blnIsValidString;
  }

  inputFocused(refName) {
    setTimeout(() => {
      let scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        ReactNative.findNodeHandle(this.refs[refName]),
        140, //additionalOffset
        true,
      );
    }, 50);
  }
  inputRef() {
    return this.refs.input;
  }

  focus() {
    this.inputRef().focus();
  }

  blur() {
    this.inputRef().blur();
  }

  isFocused() {
    return this.inputRef().isFocused();
  }

  clear() {
    this.inputRef().clear();
  }

  setFocus() {
    if (typeof this.props.onFocus == 'function') {
      this.props.onFocus();
    }
    this.setState({
      focused: true,
    });
    if (typeof this.props.onFocus1 == 'function') {
      this.props.onFocus1();
    }
    try {
      if (this.props.picker) {
        this.setState({
          underlineColor: 'yellow',
        });
      }
      return this.onFocus();
    } catch (_error) { }
  }

  unsetFocus() {
    this.setState({
      focused: false,
    });
    if (typeof this.props.onBlur1 == 'function') {
      this.props.onBlur1();
    }
    try {
      return this.onBlur();
    } catch (_error) { }
  }

  renderServerSideError() {
    if (
      this.isValidString(this.props.serverError) &&
      !this.isValidString(this.state.errorText)
    ) {
      return (
        <View
          accessibilityLabel="textInputMaterial_view_serverError"
          testID="textInputMaterial_view_serverError"
          style={{ height: 25, backgroundColor: (this.props.isLoginScreen)?'#225aa9':'white' }}>
          <View
            accessibilityLabel="textInputMaterial_innerView_serverError"
            testID="textInputMaterial_innerView_serverError">
            <Text
              accessibilityLabel="textInputMaterial_text_serverError"
              testID="textInputMaterial_text_serverError"
              style={{
                fontSize: 12,
                color: '#B30000',
                paddingLeft: 8,
                marginTop: 4,
              }}>
              {this.props.serverError}
            </Text>
          </View>
        </View>
      );
    }
  }
  renderTextForAndroid() {
    if (this.isValidString(this.state.errorText)) {
      return (
        <View
          testID={'loginScene_view_' + this.state.errorText}
          accessibilityLabel={'loginScene_view_' + this.state.errorText}
          style={{ height: 25, backgroundColor: (this.props.isLoginScreen)?'#225aa9':'white' }}>
          <View
            testID={'loginScene_textView_' + this.state.errorText}
            accessibilityLabel={'loginScene_textView_' + this.state.errorText}>
            <Text
              testID={'loginScene_text_' + this.state.errorText}
              accessibilityLabel={'loginScene_text_' + this.state.errorText}
              style={{
                fontSize: 12,
                color: '#B30000',
                paddingLeft: 8,
                marginTop: 4,
              }}>
              {this.state.errorText}
            </Text>
          </View>
        </View>
      );
    }
  }

  onChange() {
    setTimeout(() => {
      this.setState({
        labelColor: this.uneditColorCode,
        errorText: '',
        loginName: '',
        password: '',
        scrollViewHeight: '',
        underlineColor: this.uneditColorCode,
        focused: false,
        isAlphaNumeric: false,
        activeColor: this.uneditColorCode,
      });
    }, 300);
  }

  render() {
    let maxLength = this.props.maxLength;
    let autoCapitalize =
      this.props.autoCapitalize != undefined
        ? this.props.autoCapitalize
        : 'none';
    let autoCorrect =
      this.props.autoCorrect != undefined ? this.props.autoCorrect : false;
    let autoCompleteType =
      this.props.autoCompleteType != undefined
        ? this.props.autoCompleteType
        : 'off';
    let textContentType =
      this.props.textContentType != undefined
        ? this.props.textContentType
        : 'none';
    let label = this.props.label;
    let placeHolder = this.isValidString(this.props.placeHolder)
      ? this.props.placeHolder
      : '';
    let placeholderColor = this.isValidString(this.props.placeHolder)
      ? colorConstants.GRAY_MEDIUM_COLOR
      : colorConstants.GRAY_MEDIUM_COLOR;
    let errorUnderlineColor = this.isValidString(this.props.serverError)
      ? this.errorColorCode
      : this.state.underlineColor;
    let errorActiveColor = this.isValidString(this.props.serverError)
      ? this.errorColorCode
      : this.state.activeColor;
    let labelColor = this.isValidString(this.props.serverError)
      ? this.errorColorCode
      : this.state.labelColor;
    // let textInputName = this.props.textInputName;
    let keyBoardType = this.props.keyBoardType;
    let secureTextEntry = this.props.secureTextEntry;

    return (
      <View>
        <View
          testID={'textinputcomponent_view_' + label}
          accessibilityLabel={'textinputcomponent_view_' + label}
          style={{ height: 55, backgroundColor: (this.props.isLoginScreen)?'#225aa9':'white', marginBottom: 1 }}>
          <TextInput
            {...this.props}
            testID={'textinputcomponent_field_' + label}
            accessibilityLabel={'textinputcomponent_field_' + label}
            ref="input"
            color={this.inputTextColorCode}
            maxLength={maxLength}
            autoCapitalize={autoCapitalize}
            label={label}
            labelColor={labelColor}
            placeHolder={placeHolder}
            placeholderColor={placeholderColor}
            error=""
            refsValue={this.props.refsValue}
            errorColor={this.errorColorCode}
            activeColor={errorActiveColor}
            onFocus={() => {
              this.setFocus();
            }}
            onBlur={() => {
              this.unsetFocus();
            }}
            autoCorrect={autoCorrect}
            autoCompleteType={autoCompleteType}
            textContentType={textContentType}
            paddingBottom={10}
            underlineHeight={this.state.underlineHeight}
            value={this.props.value}
            onChangeText={text => this.changeText(text)}
            keyboardType={keyBoardType}
            underlineColor={errorUnderlineColor}
            secureTextEntry={secureTextEntry}
            returnKeyType={this.props.returnKeyType}
          />
        </View>
        {this.renderTextForAndroid()}
        {this.renderServerSideError()}
      </View>
    );
  }
  async changeText(text) {
    if (this.isValidString(text)) {
      let size = text.length;

      //Validate if the street autocomplet is activate
      if (size > 0) {
        if (
          this.props.refsValue === 'address1' ||
          this.props.refsValue === 'streetAddress' ||
          this.props.refsValue === 'billingStreetAddr' ||
          this.props.refsValue == 'addressLine1'
        ) {
          console.log(this.props.refsValue, text);
          RNGooglePlaces.getAutocompletePredictions(text, {
            country: 'US',
            types: 'regions',
            sessiontoken: globalData.getSessionIDCookie(),
          })
            .then(place => {
              this.setState({
                addressAutocomplete: place,
              });
            })
            .catch(error => console.log(error.message));
        }
      } else {
        this.setState({
          addressAutocomplete: [],
        });
      }
      if (text === 'QLESS_DATE_SELECTED') {
        this.setState({
          errorText: '',
          scrollViewHeight: constants.SCREEN_HEIGHT - 44,
          underlineColor: this.uneditColorCode,
          labelColor: this.uneditColorCode,
        });
      } else {
        this.setState({
          activeColor: this.activeColorCode,
        });
        if (
          this.props.refsValue === 'newPasswordRef' ||
          this.props.refsValue === 'schoolName'
        ) {
          this.props.borderColorAction(this.activeColorCode);
        }
      }
    } else {
      this.setState({
        activeColor: this.uneditColorCode,
      });
      if (
        this.props.refsValue === 'newPasswordRef' ||
        this.props.refsValue === 'schoolName'
      ) {
        this.props.borderColorAction(
          this.uneditColorCode,
        );
      }
      this.setState({
        addressAutocomplete: [],
      });
    }
    this.props.onChangeText(text);
    if (text !== 'QLESS_DATE_SELECTED') {
      this.setUnderlineColorOnChangeText();
    }
  }

  setUnderlineColorOnChangeText() {
    switch (this.props.refsValue) {
      case "State":
      case "state":
      case "stateAddr":
        this.checkValidState(this.props.blurText);
        break;
      case "stateBTS":
        this.checkValidStateBTS(this.props.blurText);
        break;
      case "stateGC":
        this.checkValidStateForShippingAddress(this.props.blurText);
        break;
      case "cardMonth":
      case "expmonth":
        this.validateExpMonth(this.props.blurText);
        break;
      case "cardYear":
      case "expYear":
        this.validateCardYear(this.props.blurText);
        break;
      case "serviceType":
        this.checkValidQLessServiceType(this.props.blurText);
        break;
      case "appointmentTime":
        this.checkValidQLessAppointmentTime(this.props.blurText)
        break;
    }

  }


}
