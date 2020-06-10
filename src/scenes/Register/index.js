import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    KeyboardAvoidingView,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import TextInputMaterial from '../../components/textInputMaterial';
import PropTypes from 'prop-types';

import { strings } from '../../i18next/i18n';
import { Actions } from 'react-native-router-flux';
import registerStyle from './RegisterStyle';
import Header from '../../components/Header';
import AppButton from '../../components/AppButton'
import { ActionSheet } from 'native-base';
import { fetchJsonGET } from '../../services/FetchData';
import { fetchIdentityPOST } from '../../services/FetchData';
var constants = require('../../config/Constants');
var colorConstant = require('../../config/colorConstant');
var registerConstant = require('./RegisterConstants.js');
import CardView from 'react-native-cardview'
import ActivityIndicatorView from '../../components/activityindicator/ActivityIndicator';
import DialogModalView from '../../components/modalcomponent/DialogModal';
import BaseComponent from '../../BaseComponent';
export default class RegisterView extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPass: '',
            phone: '',
            showPass: true,
            passPress: false,
            showPassModal: false,
            showConfirmPass: true,
            confirmPassPress: false,
            isActivityIndicatorVisible: false,
            activityIndicatorText: '',
            isDialogModalVisible: false,
            dialogModalText: '',
            dialogModalTitle: '',
            isValidUserName: false,
            isValidPassword: false,
            isValidConfirmPassword: false,
            errorEmail: '',
            alreadyRegisered:false
        }
        this.isCheckedEmailExist = this.isCheckedEmailExist.bind(this);
    }

    renderActivityIndicatorShow() {
        this.setState({
            isActivityIndicatorVisible: true,
            activityIndicatorText: 'Loading...'
        });
    }

    renderActivityIndicatorHide() {
        this.setState({
            isActivityIndicatorVisible: false,
            activityIndicatorText: ''
        });
    }

    renderDialogModal(title, message) {
        this.setState({
            isDialogModalVisible: true,
            dialogModalText: message,
            dialogModalTitle: title
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
            <View style={registerStyle.renderContainer}>
                {this.renderModal()}
                <Header isleftArrowDisplay={true} isCrossIconVisible={true} title={strings('registerScreen.digiShopTitle')} />
                {/*this.renderRegisterTitle()*/}
                {this.renderValidationForm()}
                {this.showPasswordHintBox()}
                {/*this.renderSignUpButton()*/}
                {this.renderConfirmPassword()}
                <AppButton isLightTheme={false} buttonText={strings('registerScreen.SignUpButttonText')} onButtonPressed={() => {
                    this.fetchService()
                    // Actions.registerCreateCampaign();
                }} />

                {this.renderTermsView()}
                {this.renderUpdateText()}
            </View>
        );
    }

    async fetchService() {
        Keyboard.dismiss()
        if (this.isValidRegistrationForm()) {
            this.renderActivityIndicatorShow()
            let bodyData = this.getBodyData()
            var responseData = await fetchIdentityPOST(constants.USER_REGISTRATION_URL, bodyData)
            if (this.isValidString(responseData) && this.isValidString(responseData.statusMessage)) {
                console.log("########### status message" + responseData.statusMessage);
                if (responseData.statusMessage == constants.USER_REGISTERED_STATUS) {
                    this.saveUserInfo(responseData);
                    Actions.registerCreateCampaign();
                }
                else{
                    this.renderDialogModal(strings('registerScreen.Info'), responseData.statusMessage)
                }
            }
            this.renderActivityIndicatorHide()
        } else {
            this.renderDialogModal(strings('registerScreen.Info'), strings('registerScreen.ValidInformation'))
        }
    }

    getBodyData() {
        let locale = constants.DEVICE_LOCALE.replace("-", "_").toLocaleLowerCase()
        return {
            "username": this.state.username,
            "password": this.state.password,
            "confirmPassword": this.state.confirmPass,
            "country": constants.COUNTRY_NAME,
            "locale": locale
        }
    }


    isValidRegistrationForm() {
        if (this.state.isValidUserName && this.isValidPasswordRules() && this.isValidConfirmPassword() && !this.state.alreadyRegisered) {
            return true
        }
        return false;
    }

    isValidConfirmPassword() {
        if (this.state.isValidConfirmPassword || ((this.state.confirmPass.length > 0) && (this.state.password == this.state.confirmPass))) {
            return true;
        }
        return false
    }

    isValidPasswordRules() {
        if (this.isAlpha() && this.isCapital() && this.isNumeric() && this.isSmall() && this.isValid() && this.state.isValidPassword) {
            return true;
        } else {
            return false;
        }
    }

    isAlpha() {
        const { password } = this.state;
        var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        if (format.test(password)) {
            return true;
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
                <View style={{ margin: 20 }}>
                    <CardView
                        cardElevation={8}
                        cardMaxElevation={8}
                        cornerOverlap={false}>
                        <View style={{ backgroundColor: colorConstant.WHITE_COLOR, padding: 10 }}>
                            <View style={{ flexDirection: 'row', paddingTop: 3, alignItems: 'center' }}>
                                <Image source={this.isValid() ? registerConstant.GREEN_TICK : registerConstant.GRAY_TICK} style={{ height: 14, width: 14, tintColor: this.isValid() ? colorConstant.SANT_DARK_GREEN : "" }} />
                                <Text style={{ marginLeft: 3, fontSize: 15, color: colorConstant.BLACK_COLOR }}>{strings('registerScreen.PasswordValid1')}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', paddingTop: 4, alignItems: 'center' }}>
                                <Image source={this.isCapital() ? registerConstant.GREEN_TICK : registerConstant.GRAY_TICK} style={{ height: 14, width: 14, tintColor: this.isCapital() ? colorConstant.SANT_DARK_GREEN : "" }} />
                                <Text style={{ marginLeft: 3, fontSize: 15, color: colorConstant.BLACK_COLOR }}>{strings('registerScreen.PasswordValid2')}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', paddingTop: 5, alignItems: 'center' }}>
                                <Image source={this.isSmall() ? registerConstant.GREEN_TICK : registerConstant.GRAY_TICK} style={{ height: 14, width: 14, tintColor: this.isSmall() ? colorConstant.SANT_DARK_GREEN : "" }} />
                                <Text style={{ marginLeft: 3, fontSize: 15, color: colorConstant.BLACK_COLOR }}>{strings('registerScreen.PasswordValid3')}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', paddingTop: 6, alignItems: 'center' }}>
                                <Image source={this.isNumeric() ? registerConstant.GREEN_TICK : registerConstant.GRAY_TICK} style={{ height: 14, width: 14, tintColor: this.isNumeric() ? colorConstant.SANT_DARK_GREEN : "" }} />
                                <Text style={{ marginLeft: 3, fontSize: 15, color: colorConstant.BLACK_COLOR }}>{strings('registerScreen.PasswordValid4')}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', paddingTop: 7, alignItems: 'center' }}>
                                <Image source={this.isAlpha() ? registerConstant.GREEN_TICK : registerConstant.GRAY_TICK} style={{ height: 14, width: 14, tintColor: this.isAlpha() ? colorConstant.SANT_DARK_GREEN : "" }} />
                                <Text style={{ marginLeft: 3, fontSize: 15, color: colorConstant.BLACK_COLOR }}>{strings('registerScreen.PasswordValid5')}</Text>
                            </View>
                        </View>
                    </CardView>
                </View>
            )
        }

    }
    setConfirmPasswordVisibility() {
        this.state.confirmPassPress === false
            ? this.setState({ showConfirmPass: false, confirmPassPress: true })
            : this.setState({ showConfirmPass: true, confirmPassPress: false });
    }


    setPasswordVisibility() {
        this.state.passPress === false
            ? this.setState({ showPass: false, passPress: true })
            : this.setState({ showPass: true, passPress: false });
    }

    emailOnBlur() {
        if (this.isValidString(this.state.username)) {
            this.setState(
                {
                    errorEmail: strings('registerScreen.AlreadyRegisteredError'),
                    alreadyRegisered:true
                }
            )
        }
        else {
            this.setState({
                errorEmail: "",
                alreadyRegisered:false
            })
        }
    }

    async isCheckedEmailExist() {
        console.log('check')
        if (this.isValidString(this.state.username)) {
            var responseData = await fetchJsonGET(constants.CHECKING_EMAIL_URL + "/" + this.state.username);
            console.log("############ satus message " + responseData.statusMessage);
            if (responseData.statusMessage == constants.CHECKING_EMAIL_URL_STATUS) {
                console.log("############ satus message " + responseData.statusMessage);
                this.emailOnBlur();
            }
            else{
                this.setState({
                    errorEmail: "",
                    alreadyRegisered:false
                })
            }
        }
    }



    renderValidationForm() {
        var imgSource = this.state.passPress ? constants.EYE_ICON_VISIBLE : constants.EYE_ICON;
        return (
            <KeyboardAvoidingView
                behavior="height"
                style={registerStyle.validFormViewContainer}>
                <View style={registerStyle.inputWrapper}>
                    <View style={registerStyle.validFormSubView}>
                        <TextInputMaterial
                            blurText={this.state.username}
                            refsValue={"username_email"}
                            ref={"username_email"}
                            label={strings('registerScreen.UserTextInput')}
                            maxLength={100}
                            serverError={this.state.errorEmail}
                            autoCapitalize={'none'}
                            onChangeText={username => this.setState({ username, errorEmail: '' })}
                            returnKeyType={'next'}
                            onBlur1={()=>this.isCheckedEmailExist() }
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={registerStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                            errorColor={'#B30000'}
                            value={this.state.username}
                  
                            textInputName={this.state.username}
                            errorText={strings('registerScreen.UserTextInputError')}
                            underlineHeight={2}
                            keyboardType="email-address"
                            isValidUserName={(flag) => { this.setState({ isValidUserName: flag }); console.log("################### isValidUserName : " + flag) }}
                            onSubmitEditing={(event) => {
                                setTimeout(() => {
                                this.refs.passwordInput.focus();
                            }, 600);
                                this.isCheckedEmailExist();
                            }}

                        />
                        {/* <View style={registerStyle.validFormSecondFieldView}>
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
                underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                value={this.state.phone}
                textInputName={this.state.phone}
                errorText={strings('registerScreen.PhoneTextInputError')}
                underlineHeight={2}
                keyboardType="number"
                onSubmitEditing={event => {
                  this.refs.passwordInput.focus();
                }}
              />
            </View> */}
                        <View style={registerStyle.validFormSecondFieldView}>
                            <TextInputMaterial
                                secureTextEntry={this.state.showPass}
                                blurText={this.state.password}
                                //refsValue={constants.TEXT_INPUT_PASSWORD}
                                showIcon={false}
                                value={this.state.password}
                                textInputName={this.state.password}
                                refsValue={"passwordInput"}
                                ref={"passwordInput"}
                                label={strings('registerScreen.PasswordTextInput')}
                                maxLength={50}
                                underlineHeight={2}
                                isLoginScreen={false}
                                onChangeText={password => this.setState({ password, showPassModal: true })}
                                autoCapitalize={'none'}
                                returnKeyType={'next'}
                                autoCorrect={false}
                                style={registerStyle.input}
                                isValidPassword={(flag) => { this.setState({ isValidPassword: flag }) }}
                                placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                                underlineColorAndroid={colorConstant.UNDERLINE_COLOR_ANDROID}
                                errorText={strings('registerScreen.PasswordTextInputError')}
                                onSubmitEditing={event => {
                                    this.refs.confirmPassword.focus();
                                }}
                            />
                            <TouchableOpacity style={registerStyle.btnEye} onPress={() => this.setPasswordVisibility()}>
                                <Image source={imgSource} style={registerStyle.iconEye} />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
    renderConfirmPassword() {
        var imgSource = this.state.confirmPassPress ? constants.EYE_ICON_VISIBLE : constants.EYE_ICON;
        return (
            <KeyboardAvoidingView
                behavior="height"
                style={registerStyle.validFormViewConfirmPassContainer}>
                <View style={registerStyle.inputWrapper}>
                    <View style={registerStyle.validFormSubView}>
                        <View style={registerStyle.validFormSecondFieldView}>
                            <TextInputMaterial
                                secureTextEntry={this.state.showConfirmPass}
                                blurText={this.state.confirmPass}
                                showIcon={false}
                                value={this.state.confirmPass}
                                textInputName={this.state.confirmPass}
                                refsValue={"confirmPassword"}
                                ref={"confirmPassword"}
                                label={strings('registerScreen.ConfirmPasswordTextInput')}
                                maxLength={50}
                                underlineHeight={2}
                                isLoginScreen={false}
                                onChangeText={confirmPass => this.setState({ confirmPass })}
                                autoCapitalize={'none'}
                                returnKeyType={'done'}
                                autoCorrect={false}
                                style={registerStyle.input}
                                passwordValue={this.state.password}
                                isValidConfirmPassword={(flag) => { this.setState({ isValidConfirmPassword: flag }) }}
                                placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                                underlineColorAndroid={colorConstant.UNDERLINE_COLOR_ANDROID}
                                errorText={strings('registerScreen.ConfirmPasswordTextInputError')}
                                onFocus={() => this.inputFocused.bind(this)}
                            />
                            <TouchableOpacity style={registerStyle.btnEye} onPress={() => this.setConfirmPasswordVisibility()}>
                                <Image source={imgSource} style={registerStyle.iconEye} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        )


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