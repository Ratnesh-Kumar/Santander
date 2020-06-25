import React, { Component } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TextInput, ScrollView, Keyboard, Switch,TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';
import shopSettingStyle from './ShopSettingsStyle';
import { strings } from '../../i18next/i18n';
import SwitchTextInput from '../../components/SwitchTextInput';
import GlobalData from '../../utils/GlobalData';
import BaseComponent from '../../BaseComponent';
import TextInputMaterial from '../../components/textInputMaterial';
import AppButton from '../../components/AppButton';
import { fetchPartyGET } from '../../services/FetchData';
import ActivityIndicatorView from '../../components/activityindicator/ActivityIndicator';
import DialogModalView from '../../components/modalcomponent/DialogModal';
//import Picker from 'react-native-picker';
//import TaxData from '../../i18next/taxData.json';

var constants = require('../../config/Constants');
var shopSettingConstants = require('./ShopSettingsConstants')
var colorConstant = require('../../config/colorConstant')
var globalData = new GlobalData();
var taxType = [];
var isComingFromHomePage = false

export default class ShopSettingScreen extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
      profitMarginValue: '',
      shippingCostValue: '',
      handlingCostValue: '',
      taxTypeValue: globalData.getSalesTaxType()+"",
      taxRateValue: globalData.getSalesTax()+"",
      trackInventory: false,
      taxOnSales: false,
      showDiscount: false,
      shipProducts: false,
      estimateProfit: false,
      isActivityIndicatorVisible: false,
      activityIndicatorText: '',
      isDialogModalVisible: false,
      dialogModalText: '',
      dialogModalTitle: '',
    }
    isComingFromHomePage = props.isComingFromHomePage;
  }
  componentDidUpdate() {
  }

  componentWillMount() {
  }

  componentWillReceiveProps(props) {
    if (props.isRefresh) {
      this.getShopData()
    }
  }

  

  componentDidMount() {
    this.getShopData()
    //console.log(globalData.getshopDetail().shopName);

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
  async getShopData() {
    this.renderActivityIndicatorShow()
    let shopSettingUrl = constants.GET_SHOP_SETTING_FULL.replace(constants.BUISNESS_ID, globalData.getBusinessId())
    console.log(globalData.getUserInfo().key)
    let responseData = await fetchPartyGET(shopSettingUrl);
    console.log("@@@@@@@@@@@@@@@@@@@@@@ shop setting full " + JSON.stringify(responseData));
    if (this.isValidString(responseData) && this.isValidString(responseData.statusMessage)) {
      if (responseData.statusMessage == constants.SUCCESS_STATUS) {
        if (this.isValidArray(responseData.properties)) {
          let productArr = responseData.properties[0].value.businessSettings
          this.setShopData(productArr);
          console.log(productArr)
        }
      }
    }
    this.renderActivityIndicatorHide()
  }

  setShopData(fetchData) {
    console.log("fetchData : " + JSON.stringify(fetchData))
    this.setState({
      trackInventory: (Boolean)(fetchData.trackInventory),
      taxOnSales: (Boolean)(fetchData.taxOnSales),
      taxTypeValue: this.isValidString(fetchData.defaultTaxType)?fetchData.defaultTaxType: globalData.getSalesTaxType(),
      taxRateValue: this.isValidString(fetchData.flatTaxRate)?fetchData.flatTaxRate+"": globalData.getSalesTax(),
      showDiscount: (Boolean)(fetchData.showDiscounts),
      shipProducts: (Boolean)(fetchData.shipProducts),
      estimateProfit: (Boolean)(fetchData.estimateProfit),
      profitMarginValue: fetchData.defaultProfitMargin + "",
      shippingCostValue: fetchData.defaultShippingCost + "",
      handlingCostValue: fetchData.defaultHandlingCost + ""
    })
    globalData.setIsAutoCreated((Boolean)(fetchData.autoCreate));
    console.log("trackInvenory : " + this.state.trackInventory)
    console.log("taxRate : " + this.state.taxRateValue)
  }

  handleShopSettings() {
    var shopInfo = {};
    shopInfo.trackInventory = this.state.trackInventory;
    shopInfo.taxOnSales = this.state.taxOnSales;
    shopInfo.flatTaxRateType = this.state.taxTypeValue.toString().trim();
    shopInfo.flatTaxRate = this.state.taxRateValue;
    shopInfo.showDiscount = this.state.showDiscount;
    shopInfo.shipProducts = this.state.shipProducts;
    shopInfo.estimateProfit = this.state.estimateProfit;
    shopInfo.defaultProfitMargin = this.state.profitMarginValue;
    shopInfo.defaultShippingCost = this.state.shippingCostValue;
    shopInfo.defaultHandlingCost = this.state.handlingCostValue;
    console.log("shop info :" + JSON.stringify(shopInfo))
    Actions.businessProfile({ shopInfo: shopInfo });

  }



  render() {
    return (
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={0} style={shopSettingStyle.container}>
        {this.renderModal()}
        <Header title={strings('shopSettingsScreen.ShopSettingsTitle')} isCrossIconVisible={false} onLeftArrowPressed={()=>{
          if(isComingFromHomePage){
            Actions.home()
          }
        }}/>
        <ScrollView keyboardShouldPersistTaps={'always'}>
          {this.renderPaymentBox()}
          {this.renderTaxBox()}
          {this.renderDiscountBox()}
          {this.renderDefaultsText()}
          {this.renderProfitMarginTextInput()}
          {this.renderDefaultsTextInput()}
          <AppButton buttonText={strings('shopSettingsScreen.nextButtonText')} onButtonPressed={() => {
            this.handleShopSettings()
          }} />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  renderDiscountBox() {
    return (
      <View>
        {/* <SwitchTextInput isDropDownVisbile={false} defaultSwitchValue={this.state.showDiscount}
          onRightPressed={(value) => { console.log('showDiscount ::::', value), this.setState({ showDiscount: value }) }}
          title={strings('shopSettingsScreen.showDiscountSwitch')}
        /> 
         <SwitchTextInput isDropDownVisbile={false} defaultSwitchValue={this.state.shipProducts}
          onRightPressed={(value) => { console.log('shipProducts ::::', value), this.setState({ shipProducts: value }) }}
          title={strings('shopSettingsScreen.shipProductsSwitch')}
        /> 
         <SwitchTextInput isDropDownVisbile={true} title={strings('shopSettingsScreen.shippingCompany')}/> 
         <SwitchTextInput isDropDownVisbile={false} defaultSwitchValue={this.state.estimateProfit}
          onRightPressed={(value) => { console.log('estimateProfit ::::', value), this.setState({ estimateProfit: value }) }}
          title={strings('shopSettingsScreen.estimateProfit')}
        />  */}

        <View
          style={shopSettingStyle.containerStyle}>
          <Text style={shopSettingStyle.textStyle}>{strings('shopSettingsScreen.showDiscountSwitch')}</Text>
          <View
            style={{ position: 'absolute', right: 10, top: 10 }}>
            <Switch
              value={this.state.showDiscount}
              onValueChange={(value) => { this.setState({ showDiscount: value }) }}
            />
          </View>
        </View>

        <View
          style={shopSettingStyle.containerStyle}>
          <Text style={shopSettingStyle.textStyle}>{strings('shopSettingsScreen.shipProductsSwitch')}</Text>
          <View
            style={{ position: 'absolute', right: 10, top: 10 }}>
            <Switch
              value={this.state.shipProducts}
              onValueChange={(value) => { this.setState({ shipProducts: value }) }}
            />
          </View>
        </View>

        <View
          style={shopSettingStyle.containerStyle}>
          <Text style={shopSettingStyle.textStyle}>{strings('shopSettingsScreen.estimateProfit')}</Text>
          <View
            style={{ position: 'absolute', right: 10, top: 10 }}>
            <Switch
              value={this.state.estimateProfit}
              onValueChange={(value) => { this.setState({ estimateProfit: value }) }}
            />
          </View>
        </View>
      </View>
    )
  }

  renderPaymentBox() {
    // const { trackInventory, taxOnSales } = this.state;
    return (
      <View style={{ marginTop: 10 }}>
        {/* <SwitchTextInput isDropDownVisbile={true} title={strings('shopSettingsScreen.paymentDropDownText')}/>
        <SwitchTextInput isDropDownVisbile={false} defaultSwitchValue={this.state.trackInventory}
          onRightPressed={(value) => { console.log('trackInventory ::::', value), this.setState({ trackInventory: value }) }}
          title={strings('shopSettingsScreen.taxInventory')}
        /> 
         <SwitchTextInput isDropDownVisbile={false} defaultSwitchValue={this.state.taxOnSales}
          onRightPressed={(value) => { console.log('taxOnSales ::::', value), this.setState({ taxOnSales: value }) }}
          title={strings('shopSettingsScreen.taxOnSales')}
        />  */}
        <View
          style={shopSettingStyle.containerStyle}>
          <Text style={shopSettingStyle.textStyle}>{strings('shopSettingsScreen.taxInventory')}</Text>
          <View
            style={{ position: 'absolute', right: 10, top: 10 }}>
            <Switch
              value={this.state.trackInventory}
              onValueChange={(value) => { this.setState({ trackInventory: value }) }}
            />
          </View>
        </View>

        <View
          style={shopSettingStyle.containerStyle}>
          <Text style={shopSettingStyle.textStyle}>{strings('shopSettingsScreen.taxOnSales')}</Text>
          <View
            style={{ position: 'absolute', right: 10, top: 10 }}>
            <Switch
              value={this.state.taxOnSales}
              onValueChange={(value) => { this.setState({ taxOnSales: value }) }}
            />
          </View>
        </View>

      </View>
    )
  }
  renderTaxBox() {
    //let taxTypeTitle=this.state.taxTypeValue==''?strings('shopSettingsScreen.taxTypeInput'):this.state.taxTypeValue
    if (this.state.taxOnSales) {
      return (
        <View
          style={shopSettingStyle.priceTextInputContainer}>
          <View style={shopSettingStyle.priceInputWrapper}>
            <View style={shopSettingStyle.validFormSubView}>
              <TextInputMaterial
                blurText={this.state.taxTypeValue}
                refsValue={'taxType'}
                ref={'taxType'}
                label={strings('shopSettingsScreen.taxTypeInput')}
                maxLength={100}
                autoCapitalize={'none'}
                onChangeText={text => this.setState({ taxTypeValue: text })}
                returnKeyType={'done'}
                autoCorrect={false}
                isLoginScreen={false}
                style={shopSettingStyle.input}
                placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                value={this.state.taxTypeValue}
                textInputName={this.state.taxTypeValue}
                // errorText={strings('createCampaign.skuErrorText')}
                underlineHeight={2}
                keyboardType="number"
                onSubmitEditing={event => {
                  this.refs.taxRate.focus();
                }}
              />
            </View>
          </View>

          <View style={{ marginTop: 10 }}>
          </View>
          <View style={[shopSettingStyle.priceInputWrapper,]}>
            <View style={shopSettingStyle.validFormSubView}>
              <TextInputMaterial
                blurText={this.state.taxRateValue}
                refsValue={'taxRate'}
                ref={'taxRate'}
                label={strings('shopSettingsScreen.taxRateInput')}
                maxLength={100}
                autoCapitalize={'none'}
                onChangeText={text => this.setState({ taxRateValue: text })}
                onBlur1={()=> {let tax = parseFloat(this.state.taxRateValue)
                  tax = tax.toFixed(2);
                  this.setState({ taxRateValue: tax+"" }) }}
                //returnKeyType={'done'}
                autoCorrect={false}
                isLoginScreen={false}
                style={shopSettingStyle.input}
                placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                value={this.state.taxRateValue}
                textInputName={this.state.taxRateValue}
                underlineHeight={2}
                //keyboardType="number"
                returnKeyType={(Platform.OS === 'ios') ? 'done' : 'next'}
                keyBoardType={'decimal-pad'}
                onSubmitEditing={event => {
                  if (this.state.estimateProfit)
                  this.refs.profitMargin.focus();
                  else if (this.state.shipProducts)
                  this.refs.shippingCost.focus();
                  else
                  Keyboard.dismiss()
                }}
              />
            </View>
          </View>
        </View>
      );
    }
  }

  renderDefaultsText() {
    if (this.state.shipProducts || this.state.estimateProfit)
      return (
        <View style={{ margin: 20 }}>
          <Text style={{ fontSize: 20, textAlign: 'left' }}>{strings('shopSettingsScreen.defaultsTitle')}</Text>
        </View>
      );
  }

  renderProfitMarginTextInput() {
    if (this.state.estimateProfit)
      return (
        <View style={[shopSettingStyle.validFormViewContainer, { marginTop: 0 }]}>
          <View style={shopSettingStyle.inputWrapper}>
            <View style={shopSettingStyle.validFormSubView}>
              <TextInputMaterial
                blurText={this.state.profitMarginValue}
                refsValue={'profitMargin'}
                ref={'profitMargin'}
                label={strings('shopSettingsScreen.profitMarginInput')}
                maxLength={100}
                autoCapitalize={'none'}
                onChangeText={text => this.setState({ profitMarginValue: text })}
                //returnKeyType={'done'}
                autoCorrect={false}
                isLoginScreen={false}
                style={shopSettingStyle.input}
                placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                value={this.state.profitMarginValue}
                textInputName={this.state.profitMarginValue}
                // errorText={strings('createCampaign.skuErrorText')}
                underlineHeight={2}
                //keyboardType="number"
                returnKeyType={(Platform.OS === 'ios') ? 'done' : 'next'}
                keyBoardType={'decimal-pad'}
                onSubmitEditing={event => {
                  if(this.state.shipProducts)
                  this.refs.shippingCost.focus();
                  else
                  Keyboard.dismiss()
                }}
              />
            </View>
          </View>
        </View>
      )
  }

  renderDefaultsTextInput() {
    if (this.state.shipProducts)
      return (
        <View
          style={[shopSettingStyle.validFormViewContainer, { marginTop: 0 }]}>


          <View style={[shopSettingStyle.inputWrapper, { marginTop: 20 }]}>
            <View style={shopSettingStyle.validFormSubView}>
              <TextInputMaterial
                blurText={this.state.shippingCostValue}
                refsValue={'shippingCost'}
                ref={'shippingCost'}
                label={strings('shopSettingsScreen.shippingCostInput')}
                maxLength={100}
                autoCapitalize={'none'}
                onChangeText={text => this.setState({ shippingCostValue: text })}
                //returnKeyType={'done'}
                autoCorrect={false}
                isLoginScreen={false}
                style={shopSettingStyle.input}
                placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                value={this.state.shippingCostValue}
                textInputName={this.state.shippingCostValue}
                // errorText={strings('createCampaign.campaignNameErrorText')}
                underlineHeight={2}
                //keyboardType="number"
                returnKeyType={(Platform.OS === 'ios') ? 'done' : 'next'}
                keyBoardType={'decimal-pad'}
                onSubmitEditing={event => {
                  this.refs.handlingCost.focus();
                }}
              />
            </View>
          </View>

          <View style={[shopSettingStyle.inputWrapper, { marginTop: 20 }]}>
            <View style={shopSettingStyle.validFormSubView}>
              <TextInputMaterial
                blurText={this.state.handlingCostValue}
                refsValue={'handlingCost'}
                ref={'handlingCost'}
                label={strings('shopSettingsScreen.handlingCostInput')}
                maxLength={100}
                autoCapitalize={'none'}
                onChangeText={text => this.setState({ handlingCostValue: text })}
                //returnKeyType={'done'}
                autoCorrect={false}
                isLoginScreen={false}
                style={shopSettingStyle.input}
                placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                value={this.state.handlingCostValue}
                textInputName={this.state.handlingCostValue}
                // errorText={strings('createCampaign.campaignNameErrorText')}
                underlineHeight={2}
                //keyboardType="number"
                returnKeyType={(Platform.OS === 'ios') ? 'done' : 'next'}
                keyBoardType={'decimal-pad'}
                onSubmitEditing={event => {
                  Keyboard.dismiss()
                }}
              />
            </View>
          </View>
        </View>
      );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  viewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'black',
  },
});

