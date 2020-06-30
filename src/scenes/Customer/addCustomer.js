import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    KeyboardAvoidingView,
    TouchableOpacity,
    ScrollView,
    Alert,
    Keyboard,
    Switch
} from 'react-native';
import BaseComponent from '../../BaseComponent';
import TextInputMaterial from '../../components/textInputMaterial';
import Header from '../../components/Header';
import AppButton from '../../components/AppButton';
import { strings } from '../../i18next/i18n';
import { Actions } from 'react-native-router-flux';
import GlobalData from '../../utils/GlobalData';
import customerStyle from './customerStyles';
import PhoneInput from 'react-native-phone-input'
var constants = require('../../config/Constants');
var colorConstant = require('../../config/colorConstant');
var customerConstants = require('./customerConstant')
var globalData = new GlobalData();

export default class AddCustomer extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            address: '',
            city: '',
            company: '',
            postalState: '',
            postalCode: '',
            isTaxExempt: false,
            fname:'',
            lname:'',
            email:''
        }
    }
    render() {
        return (
            <View style={customerStyle.renderContainer}>
                <Header isleftArrowDisplay={true} isCrossIconVisible={false} title={strings('addCustomer.title')} />
                <View style={customerStyle.viewContainer}>
                    <ScrollView ref='scrollView'
                        keyboardDismissMode="interactive"
                        keyboardShouldPersistTaps={'always'}
                        onScrollBeginDrag={() => this.onDragScroll()}>
                        {this.renderCustomerInfo()}
                        {this.renderPhone()}
                        {this.renderAddressForm()}
                        {this.renderPinCode()}
                        {this.renderTaxExempt()}
                        <AppButton buttonText={strings('addCustomer.buttonText')} onButtonPressed={() => { }} />
                    </ScrollView>
                </View>
            </View>
        )
    }
    renderPhone() {
        return (
            <View style={customerStyle.validFormViewContainerZip}>
                <View style={[customerStyle.inputWrapper, { flex: 1 }]}>

                    <View style={[customerStyle.validFormSecondFieldView,]}>
                        {this.renderPhoneInput()}
                        <TextInputMaterial
                            blurText={this.state.phone}
                            refsValue={'Phone'}
                            ref={'Phone'}
                            label={strings('BuisnessProfile.PhoneTextInput')}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={phone => this.setState({ phone })}
                            textStyle={{ paddingLeft: 65 }}
                            labelStyle={{ paddingLeft: 65 }}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={customerStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.phone}
                            textInputName={this.state.phone}
                            //errorText={strings('BuisnessProfile.PhoneTextInputError')}
                            underlineHeight={2}
                            returnKeyType={(Platform.OS === 'ios') ? 'done' : 'next'}
                            keyBoardType={'phone-pad'}
                            onSubmitEditing={event => {
                                this.refs.Company.focus();
                            }}
                        />

                    </View>

                </View>
            </View>
        )
    }
    renderPhoneInput() {
        return (
            <View style={{ position: 'absolute', left: 10, top: 0, zIndex: 999, flex: 1, height: 55, width: 60, alignItems: 'center', justifyContent: 'center' }}>
                <PhoneInput
                    ref="phoneCountry"
                    style={{ alignItems: 'center', justifyContent: 'center', paddingLeft: 15 }}
                    flagStyle={{ width: 36, height: 24 }}
                    disabled={true}
                    initialCountry={constants.COUNTRY_NAME.toLowerCase()}
                    //returnKeyType={'Next'}
                    value={this.state.phone}
                    onSubmitEditing={event => {
                        this.refs.Phone.focus();
                    }}
                />
            </View>
        )
    }

    renderAddressForm() {
        return (
            <View
                onLayout={event => {
                    const layout = event.nativeEvent.layout;
                    addressViewScroll = layout.y
                }}
            >
                <View style={[customerStyle.validFormSubView, { paddingTop: 20, paddingLeft: 20 }]}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{strings('BuisnessProfile.AddressText')}</Text>
                </View>
                <View style={customerStyle.validAddressViewContainer}>
                    <View style={customerStyle.inputWrapper}>
                        <View style={customerStyle.validFormSecondFieldView}>
                            <TextInputMaterial
                                blurText={this.state.company}
                                refsValue={'Company'}
                                ref={'Company'}
                                label={strings('addCustomer.companyTextInput')}
                                maxLength={100}
                                autoCapitalize={'none'}
                                onChangeText={company => this.setState({ company })}
                                returnKeyType={'next'}
                                autoCorrect={false}
                                isLoginScreen={false}
                                style={customerStyle.input}
                                placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                                underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                                value={this.state.company}
                                textInputName={this.state.company}
                                //errorText={strings('BuisnessProfile.NationalityTextInputError')}
                                underlineHeight={2}
                                keyboardType="email-address"
                                onFocus={() => { }}
                                onSubmitEditing={event => {
                                    this.refs.Address.focus();
                                }}
                            />
                        </View>
                    </View>
                    <View style={customerStyle.inputWrapper}>
                        <View style={customerStyle.validFormSecondFieldView}>
                            <TextInputMaterial
                                blurText={this.state.address}
                                refsValue={'Address'}
                                ref={'Address'}
                                label={strings('BuisnessProfile.AddressTextInput')}
                                maxLength={100}
                                autoCapitalize={'none'}
                                onChangeText={address => this.setState({ address })}
                                returnKeyType={'next'}
                                autoCorrect={false}
                                isLoginScreen={false}
                                style={customerStyle.input}
                                placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                                underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                                value={this.state.address}
                                textInputName={this.state.address}
                                //errorText={strings('BuisnessProfile.AddressTextInputError')}
                                underlineHeight={2}
                                keyboardType="email-address"
                                onFocus={() => {
                                    this.inputFocused("Address")
                                }}
                                onBlur1={() => this.inputBlurred("Address")}
                                onSubmitEditing={event => {
                                    this.refs.City.focus();
                                }}
                            />
                        </View>
                    </View>
                    <View style={customerStyle.inputWrapper}>
                        <View style={customerStyle.validFormSecondFieldView}>
                            <TextInputMaterial
                                blurText={this.state.city}
                                refsValue={'City'}
                                ref={'City'}
                                label={strings('BuisnessProfile.CityTextInput')}
                                maxLength={100}
                                autoCapitalize={'none'}
                                onChangeText={city => this.setState({ city })}
                                returnKeyType={'next'}
                                autoCorrect={false}
                                isLoginScreen={false}
                                style={customerStyle.input}
                                placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                                underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                                value={this.state.city}
                                textInputName={this.state.city}
                                //errorText={strings('BuisnessProfile.CityTextInputError')}
                                underlineHeight={2}
                                onFocus={() => {
                                    this.inputFocused("City")
                                }}
                                onBlur1={() => this.inputBlurred("City")}
                                keyboardType="email-address"
                                onSubmitEditing={event => {
                                    Keyboard.dismiss()
                                    this.refs.State.focus();
                                }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    renderPinCode() {
        let postalStateSelected = this.state.postalState === '' ? strings('BuisnessProfile.StateTextInput') : this.state.postalState
        return (
            <View
                onLayout={event => {
                    const layout = event.nativeEvent.layout;
                    pincodeViewScroll = layout.y
                }}
                style={customerStyle.validFormViewContainerZip}>
                {/* <View style={customerStyle.inputWrapperSmall}>
                    <View style={customerStyle.containerStyleWithBorder}>
                        <Text style={{ paddingLeft: 10, paddingRight: 70, textAlign: 'left', marginTop: 20, fontSize: 16 }}>
                            {postalStateSelected}</Text>
                        <View
                            style={{ position: 'absolute', right: 10, top: 10 }}>
                            <TouchableOpacity onPress={() =>
                                this.renderStatePicker()}
                            >
                                <Image
                                    style={{ width: 35, height: 35, tintColor: colorConstant.GREY_DARK_COLOR }}
                                    source={require('../.././public/images/dropDown.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View> */}
                <View style={customerStyle.inputWrapperSmall}>
                    <View style={customerStyle.validFormSecondFieldView}>
                        <TextInputMaterial
                            blurText={this.state.postalState}
                            refsValue={'State'}
                            ref={'State'}
                            label={strings('BuisnessProfile.StateTextInput')}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={postalState => this.setState({ postalState })}
                            returnKeyType={'next'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={customerStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.postalState}
                            textInputName={this.state.postalState}
                            //errorText={strings('BuisnessProfile.StateTextInputError')}
                            underlineHeight={2}
                            onFocus={() => { }}
                            keyboardType="email-address"
                            onSubmitEditing={event => {
                                this.refs.PostalCode.focus();
                            }}
                        />
                    </View>
                </View>
                <View style={customerStyle.inputWrapperSmall}>
                    <View style={customerStyle.validFormSecondFieldViewZip}>
                        <TextInputMaterial
                            blurText={this.state.postalCode}
                            refsValue={'PostalCode'}
                            ref={'PostalCode'}
                            label={strings('BuisnessProfile.PostalCodeTextInput')}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={postalCode => this.setState({ postalCode })}
                            //returnKeyType={'done'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={customerStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.postalCode}
                            textInputName={this.state.postalCode}
                            //errorText={strings('BuisnessProfile.PostalCodeTextInputError')}
                            underlineHeight={2}
                            returnKeyType={(Platform.OS === 'ios') ? 'done' : 'next'}
                            keyBoardType={'decimal-pad'}
                            onFocus={() => {
                                this.inputFocused("PostalCode")
                            }}
                            onBlur1={() => this.inputBlurred("PostalCode")}
                            onSubmitEditing={event => {
                                Keyboard.dismiss()
                                if (Platform.OS === 'ios') {
                                    this.setState({
                                        handleKeyboardViewHeight: 0
                                    })
                                }

                            }}
                        />
                    </View>

                </View>
            </View>
        )
    }

    renderTaxExempt() {
        return (
            <View>
                <View
                    style={customerStyle.containerStyle}>
                    <Text style={customerStyle.textStyle}>{strings('addCustomer.customerIsExcemptText')}</Text>
                    <View
                        style={{ position: 'absolute', right: 10, top: 10 }}>
                        <Switch
                            value={this.state.isTaxExempt}
                            onValueChange={(value) => { this.setState({ isTaxExempt: value }) }}
                        />
                    </View>
                </View>
            </View>
        )
    }

    renderCustomerInfo() {
        return (
            <View style={customerStyle.validAddressViewContainer}>
                <View style={customerStyle.inputWrapper}>
                    <View style={customerStyle.validFormSecondFieldView}>
                        <TextInputMaterial
                            blurText={this.state.fname}
                            refsValue={'FirstName'}
                            ref={'FirstName'}
                            label={strings('BuisnessProfile.FirstNameTextInput')}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={fname => this.setState({ fname })}
                            returnKeyType={'next'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={customerStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.fname}
                            textInputName={this.state.fname}
                            //errorText={strings('BuisnessProfile.FirstNameTextInputError')}
                            underlineHeight={2}
                            keyboardType="email-address"
                            onFocus={() => { this.inputFocused('FirstName') }}
                            onBlur1={()=>{this.inputBlurred('FirstName')}}
                            onSubmitEditing={event => {
                                this.refs.LastName.focus();
                            }}
                        />
                    </View>
                </View>
                <View style={customerStyle.inputWrapper}>
                    <View style={customerStyle.validFormSecondFieldView}>
                        <TextInputMaterial
                            blurText={this.state.lname}
                            refsValue={'LastName'}
                            ref={'LastName'}
                            label={strings('BuisnessProfile.LastNameTextInput')}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={lname => this.setState({ lname })}
                            returnKeyType={'next'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={customerStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.lname}
                            textInputName={this.state.lname}
                            //errorText={strings('BuisnessProfile.LastNameTextInputError')}
                            underlineHeight={2}
                            keyboardType="email-address"
                            onFocus={() => { this.inputFocused('LastName') }}
                            onBlur1={()=>{this.inputBlurred('LastName')}}
                            onSubmitEditing={event => {
                                this.refs.Email.focus();
                            }}
                        />
                    </View>
                </View>

                <View style={customerStyle.inputWrapper}>
                    <View style={customerStyle.validFormSecondFieldView}>
                        <TextInputMaterial
                            blurText={this.state.email}
                            refsValue={strings('addCustomer.emailTextInput')}
                            ref={'Email'}
                            label={'Email'}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={email => this.setState({ email })}
                            returnKeyType={'next'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={customerStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.email}
                            textInputName={this.state.email}
                            //errorText={strings('BuisnessProfile.LastNameTextInputError')}
                            underlineHeight={2}
                            keyboardType="email-address"
                            onFocus={() => { this.inputFocused('Email') }}
                            onBlur1={()=>{this.inputBlurred('Email')}}
                            onSubmitEditing={event => {
                                this.refs.Phone.focus();
                            }}
                        />
                    </View>
                </View>
            </View>
        )
    }
    onDragScroll() {
        Keyboard.dismiss();
        this.setState({
            handleKeyboardViewHeight: 0
        })
    }

    inputBlurred(refName) {
        if (this.refs.scrollView !== null && this.refs.scrollView !== undefined) {
            if (refName === 'Address' || refName === 'City') {
                setTimeout(() => {
                    this.refs.scrollView.scrollTo({ x: 0, y: addressViewScroll, animated: true })
                }, 100);
            }
            if (refName === 'yelpUrl' || refName === 'fbUrl' || refName === 'website') {
                setTimeout(() => {
                    this.refs.scrollView.scrollTo({ x: 0, y: linkViewScroll, animated: true })
                }, 100);
            }
            if (refName === 'PostalCode' || refName === 'statePicker') {
                setTimeout(() => {
                    this.refs.scrollView.scrollTo({ x: 0, y: pincodeViewScroll, animated: true })
                }, 100);
            }
        }
    }
    inputFocused(refName) {
        if (this.refs.scrollView !== null && this.refs.scrollView !== undefined) {
            if (Platform.OS === 'ios') {
                this.setState({
                    handleKeyboardViewHeight: 180
                })
            }
            if (refName === 'Address' || refName === 'City') {
                setTimeout(() => {
                    this.refs.scrollView.scrollTo({ x: 0, y: addressViewScroll, animated: true })
                }, 100);
            }
            if (refName === 'statePicker') {
                setTimeout(() => {
                    this.refs.scrollView.scrollTo({ x: 0, y: pincodeViewScroll, animated: true })
                }, 100);
            }
            if (refName === 'PostalCode') {
                if (Platform.OS === 'ios') {
                    this.setState({
                        handleKeyboardViewHeight: 250
                    })
                }
            }
            setTimeout(() => {
                this.refs.scrollView.scrollTo({ x: 0, y: pincodeViewScroll, animated: true })
            }, 100);
        }
    }

}