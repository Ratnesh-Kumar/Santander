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
} from 'react-native';
import BaseComponent from '../../BaseComponent';
import TextInputMaterial from '../../components/textInputMaterial';
import PropTypes from 'prop-types';
import Constants from '../../config/Constants';
import { strings } from '../../i18next/i18n';
import { Actions } from 'react-native-router-flux';
import businessStyle from './BusinessProfileStyles';
import buisnessConst from './BusinessProfileConstants';
import Header from '../../components/Header';
import AppButton from '../../components/AppButton';
import SwitchTextInput from '../../components/SwitchTextInput';
var commonConstants = require('../../config/Constants');
var colorConstant = require('../../config/colorConstant');
import GlobalData from '../../utils/GlobalData';
import { fetchPartyPUT } from '../../services/FetchData';
import ActivityIndicatorView from '../../components/activityindicator/ActivityIndicator';
import DialogModalView from '../../components/modalcomponent/DialogModal';
var globalData = new GlobalData();
//var businessData = globalData.getshopDetail();
export default class BusinessProfileView extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            documentNum: '',
            expDate: '',
            postalCode: '',
            postalState: '',
            city: '',
            address: '',
            nationality: '',
            lname: '',
            fname: '',
            iban: '',
            phone: '',
            buisnessName: '',
            buisnesstaxId: '',
            websiteUrl: '',
            fbUrl: '',
            yelpUrl: '',
            country: '',
            isActivityIndicatorVisible: false,
            activityIndicatorText: '',
            isDialogModalVisible: false,
            dialogModalText: '',
            dialogModalTitle: '',

        }
        shopInfo = props.shopInfo;
    }


    componentDidMount() {
        
    }


    async handleBusinessProfile() {
        console.log("######### shopName(BusinessProfile) : "+globalData.getShopName())
        this.renderActivityIndicatorShow();
        let shopUpdateURL = commonConstants.UPDATE_SHOP.replace(commonConstants.SHOP_NAME, globalData.getShopName());
        console.log("shopUpdateURl : " + shopUpdateURL)
        var requestBody = this.getRequestBody(shopInfo);
        let responseData = await fetchPartyPUT(shopUpdateURL, requestBody);
        if (this.isValidString(responseData) && this.isValidString(responseData.statusMessage)) {
            if (responseData.statusMessage == commonConstants.SUCCESS_STATUS) {
                let fetchData = responseData.properties[0].value;
                console.log(fetchData)
                Actions.shop();
            }
            else {
                console.log('error');
            }
        }
        this.renderActivityIndicatorHide()

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

    renderBuisnessForm() {
        return (
            <KeyboardAvoidingView
                behavior="height"
                style={businessStyle.validFormViewContainer}>
                <View style={businessStyle.inputWrapper}>
                    <View style={businessStyle.validFormSubView}>
                        <TextInputMaterial
                            blurText={this.state.buisnesstaxId}
                            refsValue={'BuisnessTaxId'}
                            ref={"BuisnessTaxId"}
                            label={strings('BuisnessProfile.BuisnessTaxIdTextInput')}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={buisnesstaxId => this.setState({ buisnesstaxId })}
                            returnKeyType={'done'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={businessStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={commonConstants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.buisnesstaxId}
                            textInputName={this.state.buisnesstaxId}
                            //errorText={strings('BuisnessProfile.BuisnessTaxIdTextInputError')}
                            underlineHeight={2}
                            keyboardType="email-address"
                            onSubmitEditing={event => {
                                this.refs.BuisnessName.focus();
                            }}
                        />
                    </View>
                </View>
                <View style={businessStyle.inputWrapper}>
                    <View style={businessStyle.validFormSecondFieldView}>
                        <TextInputMaterial
                            blurText={this.state.buisnessName}
                            refsValue={'BuisnessName'}
                            ref={"BuisnessName"}
                            label={strings('BuisnessProfile.BuisnessNameTextInput')}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={buisnessName => this.setState({ buisnessName })}
                            returnKeyType={'done'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={businessStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={commonConstants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.buisnessName}
                            textInputName={this.state.buisnessName}
                            //errorText={strings('BuisnessProfile.BuisnessNameTextInputError')}
                            underlineHeight={2}
                            keyboardType="email-address"
                            onSubmitEditing={event => {
                                this.refs.Phone.focus();
                            }}
                        />
                    </View>


                </View>
                {/*this.renderSwitchFields(strings('BuisnessProfile.IndustryTypeText'))*/}
                {/*this.renderSwitchFields(strings('BuisnessProfile.CountryText'))*/}

                <View style={{ paddingTop: 10 }}>
                    <SwitchTextInput
                        isDropDownVisbile={true}
                        title={strings('BuisnessProfile.IndustryTypeText')}
                    //onPress={() => Alert.alert('test')}
                    />
                </View>


                <View style={{}}>
                    <SwitchTextInput
                        isDropDownVisbile={true}
                        title={strings('BuisnessProfile.CountryText')}
                    //onPress={() => Alert.alert('test')}
                    />
                </View>

                {/* <View style={businessStyle.inputWrapper}>
                    <View style={businessStyle.validFormSecondFieldView}>
                        <TextInputMaterial
                            blurText={this.state.iban}
                            refsValue={'IBAN'}
                            ref={'IBAN'}
                            label={strings('BuisnessProfile.IBANTextInput')}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={iban => this.setState({ iban })}
                            returnKeyType={'done'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={businessStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={commonConstants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.iban}
                            textInputName={this.state.iban}
                            errorText={strings('BuisnessProfile.IBANTextInputError')}
                            underlineHeight={2}
                            keyboardType="email-address"
                            onSubmitEditing={event => {
                                this.refs.PhoneCode.focus();
                            }}
                        />
                    </View>
                </View> */}



            </KeyboardAvoidingView>
        )

    }

    renderAddressForm() {
        return (
            <KeyboardAvoidingView
                behavior="height"
                style={businessStyle.validAddressViewContainer}>
                <View style={businessStyle.inputWrapper}>
                    <View style={businessStyle.validFormSubView}>
                        <Text style={{ fontSize: 18 }}>Address</Text>
                    </View>

                    {/* <View style={businessStyle.validFormSecondFieldView}>
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
                            style={businessStyle.input}
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
                    <View style={businessStyle.validFormSecondFieldView}>
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
                            style={businessStyle.input}
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
                    <View style={businessStyle.validFormSecondFieldView}>
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
                            style={businessStyle.input}
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
                    </View> */}

                    <View style={businessStyle.validFormSecondFieldView}>
                        <TextInputMaterial
                            blurText={this.state.address}
                            refsValue={'Address'}
                            ref={'Address'}
                            label={strings('BuisnessProfile.AddressTextInput')}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={address => this.setState({ address })}
                            returnKeyType={'done'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={businessStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={commonConstants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.address}
                            textInputName={this.state.address}
                            //errorText={strings('BuisnessProfile.AddressTextInputError')}
                            underlineHeight={2}
                            keyboardType="email-address"
                            onSubmitEditing={event => {
                                this.refs.City.focus();
                            }}
                        />
                    </View>
                    <View style={businessStyle.validFormSecondFieldView}>
                        <TextInputMaterial
                            blurText={this.state.city}
                            refsValue={'City'}
                            ref={'City'}
                            label={strings('BuisnessProfile.CityTextInput')}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={city => this.setState({ city })}
                            returnKeyType={'done'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={businessStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={commonConstants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.city}
                            textInputName={this.state.city}
                            //errorText={strings('BuisnessProfile.CityTextInputError')}
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

    renderSwitchFields(title, onPress) {
        return (
            <View style={{}}>
                <SwitchTextInput
                    isDropDownVisbile={true}
                    title={title}
                    onPress={() => Alert.alert('test')}
                />
            </View>
        );
    }

    renderPinCode() {
        return (
            <KeyboardAvoidingView style={businessStyle.validFormViewContainerZip}>

                <View style={businessStyle.inputWrapperSmall}>
                    <View style={businessStyle.validFormSecondFieldView}>
                        <TextInputMaterial
                            blurText={this.state.postalState}
                            refsValue={'State'}
                            ref={'State'}
                            label={strings('BuisnessProfile.StateTextInput')}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={postalState => this.setState({ postalState })}
                            returnKeyType={'done'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={businessStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={commonConstants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.postalState}
                            textInputName={this.state.postalState}
                            //errorText={strings('BuisnessProfile.StateTextInputError')}
                            underlineHeight={2}
                            keyboardType="email-address"
                            onSubmitEditing={event => {
                                this.refs.PostalCode.focus();
                            }}
                        />
                    </View>
                </View>
                <View style={businessStyle.inputWrapperSmall}>
                    <View style={businessStyle.validFormSecondFieldViewZip}>
                        <TextInputMaterial
                            blurText={this.state.postalCode}
                            refsValue={'PostalCode'}
                            ref={'PostalCode'}
                            label={strings('BuisnessProfile.PostalCodeTextInput')}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={postalCode => this.setState({ postalCode })}
                            returnKeyType={'done'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={businessStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={commonConstants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.postalCode}
                            textInputName={this.state.postalCode}
                            //errorText={strings('BuisnessProfile.PostalCodeTextInputError')}
                            underlineHeight={2}
                            onSubmitEditing={event => {
                                Keyboard.dismiss()

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
                style={businessStyle.validAddressViewContainer}>
                <View style={businessStyle.inputWrapper}>
                    <View style={businessStyle.validFormSubView}>
                        <Text style={{ fontSize: 18 }}>{strings('BuisnessProfile.DocumentText')}</Text>
                    </View>
                </View>
                {this.renderSwitchFields(strings('BuisnessProfile.DocumentTypeText'))}
            </KeyboardAvoidingView>
        )


    }

    renderDocumentDetail() {
        return (
            <KeyboardAvoidingView style={businessStyle.validFormViewContainerZip}>
                <View style={businessStyle.inputWrapperSmall}>
                    <View style={businessStyle.validFormSecondFieldView}>
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
                            style={businessStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={commonConstants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.documentNum}
                            textInputName={this.state.documentNum}
                            //errorText={strings('BuisnessProfile.DocumentTextInputError')}
                            underlineHeight={2}
                            onSubmitEditing={event => {
                                this.refs.ExpiryDate.focus();
                            }}
                        />
                    </View>
                </View>
                <View style={businessStyle.inputWrapperSmall}>
                    <View style={businessStyle.validFormSecondFieldViewZip}>
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
                            style={businessStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={commonConstants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.expDate}
                            textInputName={this.state.expDate}
                            //errorText={strings('BuisnessProfile.ExpiryTextInputError')}
                            underlineHeight={2}
                            keyboardType="email-address"
                            onFocus={() => this.inputFocused.bind(this)}
                        />
                    </View>

                </View>
            </KeyboardAvoidingView>
        )
    }
    renderPhone() {
        return (
            <KeyboardAvoidingView style={businessStyle.validFormViewContainerZip}>
                <View style={businessStyle.inputWrapperPhoneCode}>
                    <View style={businessStyle.validFormSecondFieldView}>
                        <View style={{ borderWidth: 1, height: 55, alignItems: "center", flexDirection: 'row' }}>
                            <Image style={{ marginLeft: 15, width: 27, height: 16 }} source={require('../../public/images/icon_flag.png')}></Image>
                            <Text style={{ paddingLeft: 20, fontSize: 16 }}>+1</Text>
                        </View>
                    </View>
                </View>
                <View style={businessStyle.inputWrapperPhone}>
                    <View style={businessStyle.validFormSecondFieldView}>
                        <TextInputMaterial
                            blurText={this.state.phone}
                            refsValue={'Phone'}
                            ref={'Phone'}
                            label={strings('BuisnessProfile.PhoneTextInput')}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={phone => this.setState({ phone })}
                            returnKeyType={'done'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={businessStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={commonConstants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.phone}
                            textInputName={this.state.phone}
                            //errorText={strings('BuisnessProfile.PhoneTextInputError')}
                            underlineHeight={2}
                            keyboardType="email-address"
                            onSubmitEditing={event => {
                                this.refs.website.focus();
                            }}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        )
    }

    renderLinks() {
        return (
            <KeyboardAvoidingView
                behavior="height"
                style={businessStyle.validAddressViewContainer}>
                <View style={businessStyle.inputWrapper}>
                    <View style={businessStyle.validFormSecondFieldView}>
                        <TextInputMaterial
                            blurText={this.state.websiteUrl}
                            refsValue={"website"}
                            ref={"website"}
                            label={strings('BuisnessProfile.WebsiteTextInput')}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={websiteUrl => this.setState({ websiteUrl })}
                            returnKeyType={'done'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={businessStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={commonConstants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.websiteUrl}
                            textInputName={this.state.websiteUrl}
                            underlineHeight={2}
                            keyboardType="email-address"
                            onSubmitEditing={event => {
                                this.refs.fbUrl.focus();
                            }}
                        />
                    </View>
                    <View style={businessStyle.validFormSecondFieldView}>
                        <TextInputMaterial
                            blurText={this.state.yelpUrl}
                            refsValue={"fbUrl"}
                            ref={"fbUrl"}
                            label={strings('BuisnessProfile.FbTextInput')}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={yelpUrl => this.setState({ yelpUrl })}
                            returnKeyType={'done'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={businessStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={commonConstants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.yelpUrl}
                            textInputName={this.state.yelpUrl}
                            underlineHeight={2}
                            keyboardType="email-address"
                            onSubmitEditing={event => {
                                this.refs.yelpUrl.focus();
                            }}
                        />
                    </View>
                    <View style={businessStyle.validFormSecondFieldView}>
                        <TextInputMaterial
                            blurText={this.state.fbUrl}
                            refsValue={"yelpUrl"}
                            ref={"yelpUrl"}
                            label={strings('BuisnessProfile.YelpTextInput')}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={fbUrl => this.setState({ fbUrl })}
                            returnKeyType={'done'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={businessStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={commonConstants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.fbUrl}
                            textInputName={this.state.fbUrl}
                            underlineHeight={2}
                            keyboardType="email-address"
                            onSubmitEditing={event => {
                                this.refs.Address.focus();
                            }}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        )
    }

    render() {
        console.log("######### shopName(BusinessProfile) : "+globalData.getShopName())
        return (
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={0} style={businessStyle.renderContainer}>
                {this.renderModal()}
                <Header isleftArrowDisplay={true} isCrossIconVisible={false} title={strings('BuisnessProfile.Title')} />
                <View style={businessStyle.viewContainer}>
                    <ScrollView keyboardShouldPersistTaps={'always'} style={{ marginBottom: 20 }}>
                        {this.renderBuisnessForm()}
                        {this.renderPhone()}
                        {this.renderLinks()}
                        {this.renderAddressForm()}
                        {this.renderPinCode()}
                        {/* {this.renderDocuments()}
                        {this.renderDocumentDetail()} */}
                        <AppButton buttonText={strings('BuisnessProfile.NextButton')} onButtonPressed={() => {
                            this.handleBusinessProfile()
                        }} />
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
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

    getRequestBody(data) {
        return {
            "shopName": globalData.getShopName(),
            "taxId": this.state.businessTaxId,
            "country": this.state.country,
            "bankRoutingNumber": "1-----1",
            "locale": "en_us",
            "currency": "USD",
            "firstName": "John 2",
            "lastName": "Smith 2",
            "nationality": "USA",
            "address": this.state.address,
            "city": this.state.city,
            "state": this.state.postalState,
            "district": "Santa ----",
            "postalCode": this.state.postalCode,
            "dateFormat": "MM/DD/YY",
            "preferredLanguage": "en_us",
            "businessSettings": {
                "sourcePrimaryKey": "1234567890",
                "defaultProfitMargin": data.defaultProfitMargin,
                "businessName": this.state.buisnessName,
                "trackInventory": data.trackInventory,
                "taxOnSales": data.taxOnSales,
                "taxOnPurchase": true,
                "purchaseTaxReclaimable": false,
                "multiCurrency": false,
                "defaultNetDays": 90,
                "defaultInventoryLeadTime": 5,
                "defaultInventoryReorderSize": 10,
                "defaultaInventoryLevelMin": 5,
                "defaultShippingCost": data.defaultShippingCost,
                "defaultHandlingCost": data.defaultHandlingCost,
                "flatTaxRate": data.flatTaxRate,
                "defaultTaxType": data.flatTaxRateType,
                "showDiscounts":data.showDiscount,
                "shipProducts":data.shipProducts,
                "estimateProfit":data.estimateProfit,
                "defaultPaymentType": "CREDIDCARD",
                "txSettings": [{
                    "appTransactionType": "DEFAULT",
                    "lineItemDiscount": false,
                    "transactionDiscount": true,
                    "defaultTaxInclusive": false,
                    "defaultShipCharged": false,
                    "discountAllowed": false,
                    "calcCommissions": false,
                    "showWeights": true
                }
                ]
            }
        }
    }



}
BusinessProfileView.propTypes = {
    source: PropTypes.number.isRequired,
    placeholder: PropTypes.string.isRequired,
    secureTextEntry: PropTypes.bool,
    autoCorrect: PropTypes.bool,
    autoCapitalize: PropTypes.string,
    returnKeyType: PropTypes.string,
};