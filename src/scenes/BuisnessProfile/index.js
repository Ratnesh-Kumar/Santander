import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    KeyboardAvoidingView,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import TextInputMaterial from '../../components/textInputMaterial';
import PropTypes from 'prop-types';
import Constants from '../../config/Constants';
import { strings } from '../../i18next/i18n';
import { Actions } from 'react-native-router-flux';
import buisnessStyle from './BuisnessProfileStyles';
import buisnessConst from './BuisnessProfileConstants';
import Header from '../../components/Header';
import AppButton from '../../components/AppButton';
import SwitchTextInput from '../../components/SwitchTextInput';
var commonConstants = require('../../config/Constants');
var colorConstant = require('../../config/colorConstant');


export default class BuisnessProfileView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            documentNum: '',
            expDate: '',
            postalCode:'',
            postalState:'',
            city:'',
            address:'',
            nationality:'',
            lname:'',
            fname:'',
            iban:'',
            phone:'',
            buisnessName:'',
            buisnesstaxId:'',

        }
    }
    renderBuisnessForm() {
        return (
            <KeyboardAvoidingView
                behavior="height"
                style={buisnessStyle.validFormViewContainer}>
                <View style={buisnessStyle.inputWrapper}>
                    <View style={buisnessStyle.validFormSubView}>
                        <TextInputMaterial
                            blurText={this.state.buisnesstaxId}
                            refsValue={strings('BuisnessProfile.BuisnessTaxIdTextInput')}
                            ref={strings('BuisnessProfile.BuisnessTaxIdTextInput')}
                            label={strings('BuisnessProfile.BuisnessTaxIdTextInput')}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={buisnesstaxId => this.setState({ buisnesstaxId })}
                            returnKeyType={'done'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={buisnessStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={commonConstants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.buisnesstaxId}
                            textInputName={this.state.buisnesstaxId}
                            errorText={strings('BuisnessProfile.BuisnessTaxIdTextInputError')}
                            underlineHeight={2}
                            keyboardType="email-address"
                            onSubmitEditing={event => {
                                this.refs.BuisnessName.focus();
                            }}
                        />
                    </View>
                </View>
                <View style={buisnessStyle.inputWrapper}>
                    <View style={buisnessStyle.validFormSecondFieldView}>
                        <TextInputMaterial
                            blurText={this.state.buisnessName}
                            refsValue={strings('BuisnessProfile.BuisnessNameTextInput')}
                            ref={strings('BuisnessProfile.BuisnessNameTextInput')}
                            label={strings('BuisnessProfile.BuisnessNameTextInput')}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={buisnessName => this.setState({ buisnessName })}
                            returnKeyType={'done'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={buisnessStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={commonConstants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.buisnessName}
                            textInputName={this.state.buisnessName}
                            errorText={strings('BuisnessProfile.BuisnessNameTextInputError')}
                            underlineHeight={2}
                            keyboardType="email-address"
                            onSubmitEditing={event => {
                                this.refs.Phone.focus();
                            }}
                        />
                    </View>


                </View>

                {this.renderSwitchFields(strings('BuisnessProfile.CountryText'))}
                {this.renderSwitchFields(strings('BuisnessProfile.IndustryTypeText'))}

                <View style={buisnessStyle.inputWrapper}>
                    <View style={buisnessStyle.validFormSecondFieldView}>
                        <TextInputMaterial
                            blurText={this.state.phone}
                            refsValue={strings('BuisnessProfile.PhoneTextInput')}
                            ref={strings('BuisnessProfile.PhoneTextInput')}
                            label={strings('BuisnessProfile.PhoneTextInput')}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={phone => this.setState({ phone })}
                            returnKeyType={'done'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={buisnessStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={commonConstants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.phone}
                            textInputName={this.state.phone}
                            errorText={strings('BuisnessProfile.PhoneTextInputError')}
                            underlineHeight={2}
                            keyboardType="email-address"
                            onSubmitEditing={event => {
                                this.refs.IBAN.focus();
                            }}
                        />
                    </View>
                </View>
                <View style={buisnessStyle.inputWrapper}>
                <View style={buisnessStyle.validFormSecondFieldView}>
                        <TextInputMaterial
                            blurText={this.state.iban}
                            refsValue={strings('BuisnessProfile.IBANTextInput')}
                            ref={strings('BuisnessProfile.IBANTextInput')}
                            label={strings('BuisnessProfile.IBANTextInput')}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={iban => this.setState({ iban })}
                            returnKeyType={'done'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={buisnessStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={commonConstants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.iban}
                            textInputName={this.state.iban}
                            errorText={strings('BuisnessProfile.IBANTextInputError')}
                            underlineHeight={2}
                            keyboardType="email-address"
                            onSubmitEditing={event => {
                                this.refs.FirstName.focus();
                            }}
                        />
                    </View>
                    </View>
            </KeyboardAvoidingView>
        )

    }

    renderAddressForm() {
        return (
            <KeyboardAvoidingView
                behavior="height"
                style={buisnessStyle.validAddressViewContainer}>
                <View style={buisnessStyle.inputWrapper}>
                    <View style={buisnessStyle.validFormSubView}>
                        <Text style={{ fontSize: 18 }}>Representative Information</Text>
                    </View>
                    
                    <View style={buisnessStyle.validFormSecondFieldView}>
                        <TextInputMaterial
                            blurText={this.state.fname}
                            refsValue={strings('BuisnessProfile.FirstNameTextInput')}
                            ref={strings('BuisnessProfile.FirstNameTextInput')}
                            label={strings('BuisnessProfile.FirstNameTextInput')}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={fname => this.setState({ fname })}
                            returnKeyType={'done'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={buisnessStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={commonConstants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.fname}
                            textInputName={this.state.fname}
                            errorText={strings('BuisnessProfile.FirstNameTextInputError')}
                            underlineHeight={2}
                            keyboardType="email-address"
                            onSubmitEditing={event => {
                                this.refs.LastName.focus();
                            }}
                        />
                    </View>
                    <View style={buisnessStyle.validFormSecondFieldView}>
                        <TextInputMaterial
                            blurText={this.state.lname}
                            refsValue={strings('BuisnessProfile.LastNameTextInput')}
                            ref={strings('BuisnessProfile.LastNameTextInput')}
                            label={strings('BuisnessProfile.LastNameTextInput')}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={lname => this.setState({ lname })}
                            returnKeyType={'done'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={buisnessStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={commonConstants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.lname}
                            textInputName={this.state.lname}
                            errorText={strings('BuisnessProfile.LastNameTextInputError')}
                            underlineHeight={2}
                            keyboardType="email-address"
                            onSubmitEditing={event => {
                                this.refs.Nationality.focus();
                            }}
                        />
                    </View>
                    <View style={buisnessStyle.validFormSecondFieldView}>
                        <TextInputMaterial
                            blurText={this.state.nationality}
                            refsValue={strings('BuisnessProfile.NationalityTextInput')}
                            ref={strings('BuisnessProfile.NationalityTextInput')}
                            label={strings('BuisnessProfile.NationalityTextInput')}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={nationality => this.setState({ nationality })}
                            returnKeyType={'done'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={buisnessStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={commonConstants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.nationality}
                            textInputName={this.state.nationality}
                            errorText={strings('BuisnessProfile.NationalityTextInputError')}
                            underlineHeight={2}
                            keyboardType="email-address"
                            onSubmitEditing={event => {
                                this.refs.Address.focus();
                            }}
                        />
                    </View>
                    <View style={buisnessStyle.validFormSecondFieldView}>
                        <TextInputMaterial
                            blurText={this.state.address}
                            refsValue={strings('BuisnessProfile.AddressTextInput')}
                            ref={strings('BuisnessProfile.AddressTextInput')}
                            label={strings('BuisnessProfile.AddressTextInput')}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={address => this.setState({ address })}
                            returnKeyType={'done'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={buisnessStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={commonConstants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.address}
                            textInputName={this.state.address}
                            errorText={strings('BuisnessProfile.AddressTextInputError')}
                            underlineHeight={2}
                            keyboardType="email-address"
                            onSubmitEditing={event => {
                                this.refs.City.focus();
                            }}
                        />
                    </View>
                    <View style={buisnessStyle.validFormSecondFieldView}>
                        <TextInputMaterial
                            blurText={this.state.city}
                            refsValue={strings('BuisnessProfile.CityTextInput')}
                            ref={strings('BuisnessProfile.CityTextInput')}
                            label={strings('BuisnessProfile.CityTextInput')}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={city => this.setState({ city })}
                            returnKeyType={'done'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={buisnessStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={commonConstants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.city}
                            textInputName={this.state.city}
                            errorText={strings('BuisnessProfile.CityTextInputError')}
                            underlineHeight={2}
                            keyboardType="email-address"
                            onSubmitEditing={event => {
                                this.refs.State.focus();
                            }}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        )
    }

    renderSwitchFields(title) {
        return (
            <View style={{ paddingLeft: 22, paddingTop: 10, paddingRight: 20 }}>
                <SwitchTextInput
                    defaultSwitchValue={true}
                    onRightPressed={(value) => { console.log('SWITCH VA:UE ::::', value) }}
                    title={title}
                />
            </View>
        );
    }

    renderPinCode() {
        return (
            <KeyboardAvoidingView style={buisnessStyle.validFormViewContainerZip}>

                <View style={buisnessStyle.inputWrapperSmall}>
                    <View style={buisnessStyle.validFormSecondFieldView}>
                        <TextInputMaterial
                            blurText={this.state.postalState}
                            refsValue={strings('BuisnessProfile.StateTextInput')}
                            ref={strings('BuisnessProfile.StateTextInput')}
                            label={strings('BuisnessProfile.StateTextInput')}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={postalState => this.setState({ postalState })}
                            returnKeyType={'done'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={buisnessStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={commonConstants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.postalState}
                            textInputName={this.state.postalState}
                            errorText={strings('BuisnessProfile.StateTextInputError')}
                            underlineHeight={2}
                            keyboardType="email-address"
                            onSubmitEditing={event => {
                                this.refs.PostalCode.focus();
                            }}
                        />
                    </View>
                </View>
                <View style={buisnessStyle.inputWrapperSmall}>
                    <View style={buisnessStyle.validFormSecondFieldViewZip}>
                        <TextInputMaterial
                            blurText={this.state.postalCode}
                            refsValue={strings('BuisnessProfile.PostalCodeTextInput')}
                            ref={strings('BuisnessProfile.PostalCodeTextInput')}
                            label={strings('BuisnessProfile.PostalCodeTextInput')}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={postalCode => this.setState({ postalCode })}
                            returnKeyType={'done'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={buisnessStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={commonConstants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.postalCode}
                            textInputName={this.state.postalCode}
                            errorText={strings('BuisnessProfile.PostalCodeTextInputError')}
                            underlineHeight={2}
                            onSubmitEditing={event => {
                                this.refs.Document.focus();
                            }}
                        />
                    </View>

                </View>
            </KeyboardAvoidingView>
        )
    }

    renderDocuments() {
        return (
            <KeyboardAvoidingView
                behavior="height"
                style={buisnessStyle.validAddressViewContainer}>
                <View style={buisnessStyle.inputWrapper}>
                    <View style={buisnessStyle.validFormSubView}>
                        <Text style={{ fontSize: 18 }}>{strings('BuisnessProfile.DocumentText')}</Text>
                    </View>
                </View>
                {this.renderSwitchFields(strings('BuisnessProfile.DocumentTypeText'))}
            </KeyboardAvoidingView>
        )


    }

    renderDocumentDetail() {
        return (
            <KeyboardAvoidingView style={buisnessStyle.validFormViewContainerZip}>
                <View style={buisnessStyle.inputWrapperSmall}>
                    <View style={buisnessStyle.validFormSecondFieldView}>
                        <TextInputMaterial
                            blurText={this.state.documentNum}
                            refsValue={strings('BuisnessProfile.DocumentTextInput')}
                            ref={strings('BuisnessProfile.DocumentTextInput')}
                            label={strings('BuisnessProfile.DocumentTextInput')}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={documentNum => this.setState({ documentNum })}
                            returnKeyType={'done'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={buisnessStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={commonConstants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.documentNum}
                            textInputName={this.state.documentNum}
                            errorText={strings('BuisnessProfile.DocumentTextInputError')}
                            underlineHeight={2}
                            onSubmitEditing={event => {
                                this.refs.ExpiryDate.focus();
                            }}
                        />
                    </View>
                </View>
                <View style={buisnessStyle.inputWrapperSmall}>
                    <View style={buisnessStyle.validFormSecondFieldViewZip}>
                        <TextInputMaterial
                            blurText={this.state.expDate}
                            refsValue={strings('BuisnessProfile.ExpiryTextInput')}
                            ref={strings('BuisnessProfile.ExpiryTextInput')}
                            label={strings('BuisnessProfile.ExpiryTextInput')}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={expDate => this.setState({ expDate })}
                            returnKeyType={'done'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={buisnessStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={commonConstants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.expDate}
                            textInputName={this.state.expDate}
                            errorText={strings('BuisnessProfile.ExpiryTextInputError')}
                            underlineHeight={2}
                            keyboardType="email-address"
                            onFocus={() => this.inputFocused.bind(this)}
                        />
                    </View>

                </View>
            </KeyboardAvoidingView>
        )
    }




    render() {
        return (
            <ScrollView keyboardShouldPersistTaps={'always'} style={buisnessStyle.renderContainer}>
                <Header isleftArrowDisplay={true} isCrossIconVisible={false} title={strings('BuisnessProfile.Title')} />
                {this.renderBuisnessForm()}
                {this.renderAddressForm()}
                {this.renderPinCode()}
                {this.renderDocuments()}
                {this.renderDocumentDetail()}
                <AppButton buttonText={strings('BuisnessProfile.NextButton')} onButtonPressed={() => {
                    Actions.tabbar();
                }} />
            </ScrollView>
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
BuisnessProfileView.propTypes = {
    source: PropTypes.number.isRequired,
    placeholder: PropTypes.string.isRequired,
    secureTextEntry: PropTypes.bool,
    autoCorrect: PropTypes.bool,
    autoCapitalize: PropTypes.string,
    returnKeyType: PropTypes.string,
};