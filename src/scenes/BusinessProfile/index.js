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
var constants = require('../../config/Constants');
var colorConstant = require('../../config/colorConstant');
import GlobalData from '../../utils/GlobalData';
import { fetchPartyPUT, fetchPartyGET } from '../../services/FetchData';
import ActivityIndicatorView from '../../components/activityindicator/ActivityIndicator';
import DialogModalView from '../../components/modalcomponent/DialogModal';
import Picker from 'react-native-picker';
import PhoneInput from 'react-native-phone-input'

var globalData = new GlobalData();
var industryTypeData = [];
var countryNameData = [];
var isComingFromHomePage = false;
var linkViewScroll = 0;
var addressViewScroll = 0;
var pincodeViewScroll = 0;
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
            pickerData: '',
            buisnessName: '',
            businessTaxId: '',
            websiteUrl: '',
            fbUrl: '',
            yelpUrl: '',
            country: '',
            isActivityIndicatorVisible: false,
            activityIndicatorText: '',
            isDialogModalVisible: false,
            dialogModalText: '',
            dialogModalTitle: '',
            industryType: '',
            validPhone: "",
            typePhone: "",
            valuePhone: "",
            handleKeyboardViewHeight: 0

        }
        shopInfo = props.shopInfo === undefined ? "" : props.shopInfo;
        this.updateInfo = this.updateInfo.bind(this);
        isComingFromHomePage = props.isComingFromHomePage;
    }

    updateInfo() {
        this.setState({
            validPhone: this.phone.isValidNumber(),
            typePhone: this.phone.getNumberType(),
            valuePhone: this.phone.getValue()
        });
    }
    componentDidMount() {
        countryNameData = globalData.getCountryList();
        console.log('####### countryList :: ',JSON.stringify(countryNameData))
        this.getBusinessData()
    }

    async getBusinessData() {
        this.renderActivityIndicatorShow()
        let shopSettingUrl = constants.GET_SHOP_SETTING_FULL.replace(constants.BUISNESS_ID, globalData.getBusinessId())
        //console.log(globalData.getUserInfo().key)
        let responseData = await fetchPartyGET(shopSettingUrl);
        //console.log("@@@@@@@@@@@@@@@@@@@@@@ shop setting full " + JSON.stringify(responseData));
        if (this.isValidString(responseData) && this.isValidString(responseData.statusMessage)) {
            if (responseData.statusMessage == constants.SUCCESS_STATUS) {
                if (this.isValidArray(responseData.properties)) {
                    let businessArr = responseData.properties[0].value
                    this.setBusinessData(businessArr);
                    //console.log(businessArr)
                }
            }
        }
        this.renderActivityIndicatorHide()
    }
    onPressFlag() {
        this.myCountryPicker.open()
    }

    selectCountry(country) {
        this.phone.selectCountry(country.iso2)
    }
    renderPhoneInput() {
        return (
            <View  style={{position:'absolute', left: 10, top: 0, zIndex:999, flex:1, height:55, width: 60, alignItems:'center', justifyContent:'center'}}>
                <PhoneInput
                   
                    ref="phoneCountry"
                    style={{alignItems:'center', justifyContent:'center', paddingLeft:15}}
                    flagStyle={{width: 36, height: 24}}
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
    setBusinessData(responseData) {
        //console.log("name :" + responseData.party.name)
        this.setState({
            buisnessName: (this.isValidString(responseData.party.name) ? responseData.party.name : ""),
            businessTaxId: (this.isValidString(responseData.party.taxId) ? responseData.party.taxId.toString().trim() : ""),
            postalCode: (this.isValidString(responseData.party.postalCode) ? (responseData.party.postalCode.toString().trim()) : ""),
            postalState: (this.isValidString(responseData.party.state) ? responseData.party.state : ""),
            address: (this.isValidString(responseData.party.address) ? responseData.party.address : ""),
            city: (this.isValidString(responseData.party.city) ? responseData.party.city : ""),
            country: (this.isValidString(responseData.party.country) ? responseData.party.country : ""),
            industryType: (this.isValidString(responseData.party.industry) ? responseData.party.industry : "")
        })
    }

    async handleBusinessProfile() {
        //console.log("######### shopName(BusinessProfile) : " + globalData.getShopName())
        this.renderActivityIndicatorShow();
        let shopUpdateURL = constants.UPDATE_SHOP.replace(constants.SHOP_NAME, globalData.getShopName());;
        console.log("shopUpdateURl : " + shopUpdateURL)
        var requestBody = this.getRequestBody(shopInfo);
        console.log(requestBody)
        let responseData = await fetchPartyPUT(shopUpdateURL, requestBody);
        console.log("ResponseData :" + JSON.stringify(responseData))
        if (this.isValidString(responseData) && this.isValidString(responseData.statusMessage)) {
            if (responseData.statusMessage == constants.SUCCESS_STATUS) {
                let fetchData = responseData.properties[0].value;
                let shopName = fetchData.shopName.toString().trim();
                let businessId = fetchData.businessSettings.businessId.toString().trim();
                console.log("fetchData ShopName : " + shopName)
                console.log(("fetchData BusinessId : " + businessId));
                globalData.setShopName(shopName);
                globalData.setBusinessId(businessId);
                globalData.setIsAutoCreated(false)
                let businessObj = {
                    "businessId": businessId,
                    "username": globalData.getUserInfo().username,
                    "shopName": shopName,
                    "autoCreate": false
                }
                let isDataSave = await this.setAsyncData(constants.ASYNC_BUSINESS_ID, JSON.stringify(businessObj));


                setTimeout(() => {
                    this.showAlert()
                }, 100)
                //Actions.shop();
            }
            else {
                console.log('error');
            }
        }
        this.renderActivityIndicatorHide()

    }

    showAlert() {
        Alert.alert(
            'Info',
            'Data Successfully Saved.',
            [
                {
                    text: 'OK', onPress: () => {
                        Actions.shop({ type: 'reset' });
                        setTimeout(() => {
                            Actions.refresh({ isRefresh: true });
                        }, 100)
                    }
                },
            ]
        );
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
       let industryTitle = this.state.industryType === '' ? strings('BuisnessProfile.IndustryTypeText') : this.state.industryType
       let countryTitle = this.state.country === '' ? strings('BuisnessProfile.CountryText') : this.state.country
        return (
            <View style={businessStyle.validFormViewContainer}>
                <View style={businessStyle.inputWrapper}>
                    <View style={businessStyle.validFormSubView}>
                        <TextInputMaterial
                            blurText={this.state.businessTaxId}
                            refsValue={'BusinessTaxId'}
                            ref={"BusinessTaxId"}
                            label={strings('BuisnessProfile.BuisnessTaxIdTextInput')}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={businessTaxId => this.setState({ businessTaxId })}
                            returnKeyType={'next'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={businessStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.businessTaxId}
                            textInputName={this.state.businessTaxId}
                            //errorText={strings('BuisnessProfile.BuisnessTaxIdTextInputError')}
                            underlineHeight={2}
                            keyboardType="email-address"
                            onFocus={() => { Picker.hide() }}
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
                            returnKeyType={'next'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={businessStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                            value={(globalData.getIsAutoCreated()) ? '' : this.state.buisnessName}
                            textInputName={this.state.buisnessName}
                            //errorText={strings('BuisnessProfile.BuisnessNameTextInputError')}
                            underlineHeight={2}
                            keyboardType="email-address"
                            onFocus={() => { Picker.hide() }}
                            onSubmitEditing={event => {
                                this.refs.phoneCountry.focus();
                            }}
                        />
                    </View>


                </View>
                {/*this.renderSwitchFields(strings('BuisnessProfile.IndustryTypeText'))*/}
                {/*this.renderSwitchFields(strings('BuisnessProfile.CountryText'))*/}

                <View style={{ paddingTop: 10 }}>

                    <SwitchTextInput
                        isDropDownVisbile={true}
                        //strings('BuisnessProfile.IndustryTypeText')
                        title={industryTitle}
                        onDropDownPressed={() => this.renderIndustryPicker()}
                    />
                </View>


                <View style={{}}>
                    <SwitchTextInput
                        isDropDownVisbile={true}
                        title={countryTitle}
                        onDropDownPressed={() => this.renderCountryPicker()}
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
                            underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.iban}
                            textInputName={this.state.iban}
                            errorText={strings('BuisnessProfile.IBANTextInputError')}
                            underlineHeight={2}
                            keyboardType="email-address"
                            onFocus={() => { Picker.hide() }}
                            onSubmitEditing={event => {
                                this.refs.PhoneCode.focus();
                            }}
                        />
                    </View>
                </View> */}



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
                <View style={[businessStyle.validFormSubView, { paddingTop: 20, paddingLeft: 20 }]}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{strings('BuisnessProfile.AddressText')}</Text>
                </View>
                <View style={businessStyle.validAddressViewContainer}>
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
                            underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.fname}
                            textInputName={this.state.fname}
                            errorText={strings('BuisnessProfile.FirstNameTextInputError')}
                            underlineHeight={2}
                            keyboardType="email-address"
                            onFocus={() => { Picker.hide() }}
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
                            underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.lname}
                            textInputName={this.state.lname}
                            errorText={strings('BuisnessProfile.LastNameTextInputError')}
                            underlineHeight={2}
                            keyboardType="email-address"
                            onFocus={() => { Picker.hide() }}
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
                            underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.nationality}
                            textInputName={this.state.nationality}
                            errorText={strings('BuisnessProfile.NationalityTextInputError')}
                            underlineHeight={2}
                            keyboardType="email-address"
                            onFocus={() => { Picker.hide() }}
                            onSubmitEditing={event => {
                                this.refs.Address.focus();
                            }}
                        />
                    </View> */}
                    <View style={businessStyle.inputWrapper}>
                        <View style={businessStyle.validFormSecondFieldView}>
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
                                style={businessStyle.input}
                                placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                                underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                                value={this.state.address}
                                textInputName={this.state.address}
                                //errorText={strings('BuisnessProfile.AddressTextInputError')}
                                underlineHeight={2}
                                keyboardType="email-address"
                                onFocus={() => {
                                    Picker.hide()
                                    this.inputFocused("Address")
                                }}
                                onBlur1={() => this.inputBlurred("Address")}
                                onSubmitEditing={event => {
                                    this.refs.City.focus();
                                }}
                            />
                        </View>
                    </View>
                    <View style={businessStyle.inputWrapper}>
                        <View style={businessStyle.validFormSecondFieldView}>
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
                                style={businessStyle.input}
                                placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                                underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                                value={this.state.city}
                                textInputName={this.state.city}
                                //errorText={strings('BuisnessProfile.CityTextInputError')}
                                underlineHeight={2}
                                onFocus={() => {
                                    Picker.hide()
                                    this.inputFocused("City")
                                }}
                                onBlur1={() => this.inputBlurred("City")}
                                keyboardType="email-address"
                                onSubmitEditing={event => {
                                    Keyboard.dismiss()
                                    this.refs.PostalCode.focus();
                                }}
                            />
                        </View>
                    </View>
                </View>
            </View>
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
        let postalStateSelected = this.state.postalState === '' ? strings('BuisnessProfile.StateTextInput') : this.state.postalState
        return (
            <View 
            onLayout={event => {
                const layout = event.nativeEvent.layout;
                pincodeViewScroll = layout.y
              }}
            style={businessStyle.validFormViewContainerZip}>
                <View style={businessStyle.inputWrapperSmall}>
                <View style={businessStyle.containerStyleWithBorder}>
                <Text style={{ paddingLeft: 10, paddingRight: 70, textAlign: 'left', marginTop: 20, fontSize: 16 }}>
                  {postalStateSelected}</Text>
                <View
                  style={{ position: 'absolute', right: 10, top: 10 }}>
                  <TouchableOpacity onPress={() => 
                    this.renderStatePicker()}
                    >
                    <Image
                      style={{ width: 35, height: 35, tintColor:colorConstant.GREY_DARK_COLOR }}
                      source={require('../.././public/images/dropDown.png')}
                    />
                  </TouchableOpacity>
                </View>
                </View>
              </View>
                {/* <View style={businessStyle.inputWrapperSmall}>
                    <View style={businessStyle.validFormSecondFieldView}>
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
                            style={businessStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.postalState}
                            textInputName={this.state.postalState}
                            //errorText={strings('BuisnessProfile.StateTextInputError')}
                            underlineHeight={2}
                            onFocus={() => { Picker.hide() }}
                            keyboardType="email-address"
                            onSubmitEditing={event => {
                                this.refs.PostalCode.focus();
                            }}
                        /> 
                    </View>
                </View> */}
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
                            //returnKeyType={'done'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={businessStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.postalCode}
                            textInputName={this.state.postalCode}
                            //errorText={strings('BuisnessProfile.PostalCodeTextInputError')}
                            underlineHeight={2}
                            returnKeyType={(Platform.OS === 'ios') ? 'done' : 'next'}
                            keyBoardType={'decimal-pad'}
                            onFocus={() => {
                                Picker.hide()
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
                            underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.documentNum}
                            textInputName={this.state.documentNum}
                            //errorText={strings('BuisnessProfile.DocumentTextInputError')}
                            underlineHeight={2}
                            onFocus={() => { Picker.hide() }}
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
                            underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.expDate}
                            textInputName={this.state.expDate}
                            //errorText={strings('BuisnessProfile.ExpiryTextInputError')}
                            underlineHeight={2}
                            keyboardType="email-address"
                            onFocus={() => { Picker.hide() }}
                            onFocus={() => this.inputFocused.bind(this)}
                        />
                    </View>

                </View>
            </KeyboardAvoidingView>
        )
    }
    renderPhone() {
        return (
            <View style={businessStyle.validFormViewContainerZip}>
                {/* <View style={businessStyle.inputWrapperPhoneCode}>
                    {/* <View style={businessStyle.validFormSecondFieldView}> */}
                    {/* <View style={{ borderWidth: 1, height: 55, alignItems: "center", flexDirection: 'row' }}>
                            <Image style={{ marginLeft: 15, width: 27, height: 16 }} source={require('../../public/images/icon_flag.png')}></Image>
                            <Text style={{ paddingLeft: 20, fontSize: 16 }}>+1</Text>
                        </View> */}
                    {/* {this.renderPhoneInput()} */}
                    {/* </View> */}
                {/* </View> */} 
                <View style={[businessStyle.inputWrapper, { flex: 1 }]}>
                
                    <View style={[businessStyle.validFormSecondFieldView,]}>
                    {this.renderPhoneInput()}
                        <TextInputMaterial
                            blurText={this.state.phone}
                            refsValue={'Phone'}
                            ref={'Phone'}
                            label={strings('BuisnessProfile.PhoneTextInput')}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={phone => this.setState({ phone })}
                            textStyle={{paddingLeft: 65}}
                            labelStyle={{paddingLeft: 65}}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={businessStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.phone}
                            textInputName={this.state.phone}
                            //errorText={strings('BuisnessProfile.PhoneTextInputError')}
                            underlineHeight={2}
                            returnKeyType={(Platform.OS === 'ios') ? 'done' : 'next'}
                            keyBoardType={'decimal-pad'}
                            onSubmitEditing={event => {
                                this.refs.website.focus();
                            }}
                        />
                        
                    </View>
                    
                </View>
            </View>
        )
    }

    renderLinks() {
        return (
            <View onLayout={event => {
                const layout = event.nativeEvent.layout;
                linkViewScroll = layout.y
              }}>
                <View style={[businessStyle.validFormSubView, { paddingTop: 20,paddingLeft:20 }]}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{strings('BuisnessProfile.UrlText')}</Text>
                </View>
                <View style={businessStyle.validAddressViewContainer}>
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
                                returnKeyType={'next'}
                                autoCorrect={false}
                                isLoginScreen={false}
                                style={businessStyle.input}
                                placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                                underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                                value={this.state.websiteUrl}
                                textInputName={this.state.websiteUrl}
                                underlineHeight={2}
                                keyboardType="email-address"
                                onFocus={() => {
                                    Picker.hide()
                                    this.inputFocused("website")
                                }}
                                onBlur1={() => this.inputBlurred("website")}
                                onSubmitEditing={event => {
                                    this.refs.fbUrl.focus();
                                }}
                            />
                        </View>
                        {globalData.isBusinessProfileFBPage() ? <View style={businessStyle.validFormSecondFieldView}>
                            <TextInputMaterial
                                blurText={this.state.yelpUrl}
                                refsValue={"fbUrl"}
                                ref={"fbUrl"}
                                label={strings('BuisnessProfile.FbTextInput')}
                                maxLength={100}
                                autoCapitalize={'none'}
                                onChangeText={yelpUrl => this.setState({ yelpUrl })}
                                returnKeyType={'next'}
                                autoCorrect={false}
                                isLoginScreen={false}
                                style={businessStyle.input}
                                placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                                underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                                value={this.state.yelpUrl}
                                textInputName={this.state.yelpUrl}
                                underlineHeight={2}
                                keyboardType="email-address"
                                onFocus={() => {
                                    Picker.hide()
                                    this.inputFocused("fbUrl")
                                }}
                                onBlur1={() => this.inputBlurred("fbUrl")}
                                onSubmitEditing={event => {
                                    this.refs.yelpUrl.focus();
                                }}
                            />
                        </View> : <View />}
                        {globalData.isBusinessProfileYelp() ? <View style={businessStyle.validFormSecondFieldView}>
                            <TextInputMaterial
                                blurText={this.state.fbUrl}
                                refsValue={"yelpUrl"}
                                ref={"yelpUrl"}
                                label={strings('BuisnessProfile.YelpTextInput')}
                                maxLength={100}
                                autoCapitalize={'none'}
                                onChangeText={fbUrl => this.setState({ fbUrl })}
                                returnKeyType={'next'}
                                autoCorrect={false}
                                isLoginScreen={false}
                                style={businessStyle.input}
                                placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                                underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                                value={this.state.fbUrl}
                                textInputName={this.state.fbUrl}
                                underlineHeight={2}
                                keyboardType="email-address"
                                onFocus={() => {
                                    Picker.hide()
                                    this.inputFocused("yelpUrl")
                                }}
                                onBlur1={() => this.inputBlurred("yelpUrl")}
                                onSubmitEditing={event => {
                                    this.refs.Address.focus();
                                }}
                            />
                        </View> : <View />}
                    </View>
                </View>
            </View>
        )
    }

    render() {
        //console.log("######### shopInfo : " + JSON.stringify(shopInfo))
        // console.log("######### usierId : " + globalData.getUserInfo().key)
        //console.log("########## shopName : " +globalData.getShopName())
        return (
            <View style={businessStyle.renderContainer}>
                {this.renderModal()}
                <Header isleftArrowDisplay={true} isCrossIconVisible={false} title={strings('BuisnessProfile.Title')}
                    onLeftArrowPressed={() => {
                        Picker.hide();
                        if (isComingFromHomePage) {
                            isComingFromHomePage= false;
                            Actions.home()
                        }
                    }} />
                <View style={businessStyle.viewContainer}>
                    <ScrollView ref='scrollView'
                        keyboardDismissMode="interactive"
                        keyboardShouldPersistTaps={'always'}
                        onScrollBeginDrag={() => this.onDragScroll()}>
                        {this.renderBuisnessForm()}
                        {this.renderPhone()}
                        {this.renderLinks()}
                        {this.renderAddressForm()}
                        {this.renderPinCode()}
                        {/* {this.renderDocuments()}
                        {this.renderDocumentDetail()} */}
                        <AppButton buttonText={strings('BuisnessProfile.NextButton')} onButtonPressed={() => {
                            Picker.hide();
                            this.handleBusinessProfile()
                        }} />
                        <View style={{ height: this.state.handleKeyboardViewHeight }}>
                    </View>
                    </ScrollView>
                </View>
            </View>
        );
    }


    renderIndustryPicker() {
        Keyboard.dismiss()
        Picker.hide();
        industryTypeData = ['Auto Repair', 'Bars', 'Coffee $ Tea', 'Delivery', 'General Constrator', 'Hair Salons', 'Hardware Stores', 'Heating and Cooling', 'Home Goods Store', 'Jewellery', 'Liquor Store', 'Painter', 'Plumber', 'Professional', 'Real Estate Agents', 'Restaurnts', 'Retail Stores'];
        Picker.init({
            pickerData: industryTypeData,
            pickerTitleText: 'Select Industry Type',
            pickerConfirmBtnText: 'Done',
            pickerCancelBtnText: 'Cancel',
            selectedValue: [industryTypeData[0].toString().trim()],
            pickerBg: [255, 255, 255, 1],

            onPickerConfirm: data => {
                this.setState({
                    industryType: data
                })
            },
            onPickerCancel: data => {
                Picker.hide();
            },
            onPickerSelect: data => {
                this.setState({
                    industryType: data
                })
            }
        });
        Picker.show();

    }
    

    renderStatePicker() {
        Keyboard.dismiss()
        Picker.hide();
        this.inputFocused('statePicker')
        if(this.isValidString(this.state.country) && this.isValidArray(countryNameData)){
            let stateNameData = globalData.getStateList(this.state.country);
            Picker.init({
                pickerData: stateNameData,
                pickerTitleText: 'Select State',
                pickerConfirmBtnText: 'Done',
                pickerCancelBtnText: 'Cancel',
                selectedValue: [stateNameData[0].toString().trim()],
                pickerBg: [255, 255, 255, 1],
    
                onPickerConfirm: data => {
                    this.setState({
                        postalState: data
                    })
                    this.hidePicker()
                },
                onPickerCancel: data => {
                    this.hidePicker()
                },
                onPickerSelect: data => {
                    //console.log(data);
                }
            });
            Picker.show();
        }
        else{
            alert ('Please select Country')
        }
    }
    hidePicker(){
        Picker.hide();
        this.inputBlurred('statePicker')
        if (Platform.OS === 'ios') {
              this.setState({
                handleKeyboardViewHeight: 0
              })
            }
      }

    renderCountryPicker() {
        Keyboard.dismiss()
        Picker.hide();
        if (this.isValidArray(countryNameData)) {
            Picker.init({
                pickerData: countryNameData,
                pickerTitleText: 'Select Country',
                pickerConfirmBtnText: 'Done',
                pickerCancelBtnText: 'Cancel',
                selectedValue: [countryNameData[0].toString().trim()],
                pickerBg: [255, 255, 255, 1],

                onPickerConfirm: data => {
                    this.setState({
                        country: data
                    })
                },
                onPickerCancel: data => {
                    Picker.hide();
                },
                onPickerSelect: data => {
                    //console.log(data);
                }
            });
            Picker.show();
        }
    }

    onDragScroll() {
        Keyboard.dismiss();
        this.setState({
          handleKeyboardViewHeight: 0
        })
      }

    inputBlurred(refName) {
        if (this.refs.scrollView !== null && this.refs.scrollView !== undefined) {
          if(refName === 'Address' || refName === 'City'){
            setTimeout(() => {
              this.refs.scrollView.scrollTo({ x: 0, y: addressViewScroll, animated: true })
            }, 100); 
          }
          if(refName === 'yelpUrl' || refName === 'fbUrl' || refName === 'website'){
            setTimeout(() => {
              this.refs.scrollView.scrollTo({ x: 0, y: linkViewScroll, animated: true })
            }, 100); 
          }
          if(refName === 'PostalCode' || refName === 'statePicker'){
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
          if(refName === 'Address' || refName === 'City'){
            setTimeout(() => {
              this.refs.scrollView.scrollTo({ x: 0, y: addressViewScroll, animated: true })
            }, 100); 
          }
          if(refName === 'yelpUrl' || refName === 'fbUrl' || refName === 'website'){
            setTimeout(() => {
              this.refs.scrollView.scrollTo({ x: 0, y: linkViewScroll, animated: true })
            }, 100); 
          }
          if(refName === 'statePicker'){
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
    
    


    // inputFocused(refName) {
    //     setTimeout(() => {
    //         let scrollResponder = this.refs.scrollView.getScrollResponder();
    //         scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
    //             // eslint-disable-next-line no-undef
    //             ReactNative.findNodeHandle(this.refs[refName]),
    //             140, //additionalOffset
    //             true,
    //         );
    //     }, 50);
    // }

    getRequestBody(data) {
        console.log("getRequestBody :" + JSON.stringify(data))
        return {
            "shopName": this.state.buisnessName,
            "taxId": this.state.businessTaxId,
            "country": this.state.country.toString().trim(),
            "bankRoutingNumber": "1-----1",
            "locale": "en_us",
            "currency": "USD",
            "firstName": "John 2",
            "lastName": "Smith 2",
            "nationality": "USA",
            "address": this.state.address,
            "city": this.state.city,
            "state": this.state.postalState.toString().trim(),
            "district": "Santa ----",
            "postalCode": this.state.postalCode,
            "dateFormat": "MM/DD/YY",
            "industry": this.state.industryType.toString().trim(),
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
                "showDiscounts": data.showDiscount,
                "shipProducts": data.shipProducts,
                "defaultTaxType": data.flatTaxRateType,
                "estimateProfit":data.estimateProfit,
                "defaultPaymentType": "CREDIDCARD",
                "txSettings": [{
                    "appTransactionType": "DEFAULT",
                    "lineItemDiscount": false,
                    "transactionDiscount": true,
                    "defaultTaxInclusive": false,
                    "defaultShipCharged": false,
                    "discountAllowed": true,
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