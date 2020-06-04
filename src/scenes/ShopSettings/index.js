import React, { Component } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TextInput, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';
import shopSettingStyle from './ShopSettingsStyle';
import { strings } from '../../i18next/i18n';
import SwitchTextInput from '../../components/SwitchTextInput';
import GlobalData from '../../utils/GlobalData';
import BaseComponent from '../../BaseComponent';
import TextInputMaterial from '../../components/textInputMaterial';
import AppButton from '../../components/AppButton'
var constants = require('../../config/Constants');
var shopSettingConstants = require('./ShopSettingsConstants')
var colorConstant = require('../../config/colorConstant')
export default class ShopSettingScreen extends BaseComponent {

  constructor(props) {
    super(props)
    this.state = {
      profitMarginValue:'',
      shippingCostValue:'',
      handlingCostValue:'',
      taxTypeValue:'',
      taxRateValue:''
    }
  }

  async componentDidMount() {

  }
  render() {
    return (
      <View style={shopSettingStyle.container}>
        <Header title={strings('shopSettingsScreen.ShopSettingsTitle')} isCrossIconVisible={false} />
        <View style={shopSettingStyle.viewContainer}>
          <ScrollView keyboardShouldPersistTaps={'always'} style={{marginBottom: 50}}>
            {this.renderPaymentBox()}
            {this.renderTaxBox()}
            {this.renderDiscountBox()}
            {this.renderDefaultsText()}
            {this.renderDefaultsTextInput()}
            <AppButton buttonText={strings('shopSettingsScreen.nextButtonText')} onButtonPressed={()=>{
                Actions.buisnessProfile();
            }}/>
          </ScrollView>
        </View>
      </View>
    );
  }

  renderDiscountBox(){
    return (
      <View style={{ marginTop: 10 }}>
        <SwitchTextInput isDropDownVisbile={false} defaultSwitchValue={true} 
        onRightPressed={(value) => { console.log('SWITCH VA:UE ::::', value) }} 
        title={strings('shopSettingsScreen.showDiscountSwitch')}
        />
        <SwitchTextInput isDropDownVisbile={false} defaultSwitchValue={true} 
        onRightPressed={(value) => { console.log('SWITCH VA:UE ::::', value) }} 
        title={strings('shopSettingsScreen.shipProductsSwitch')}
        />
        <SwitchTextInput isDropDownVisbile={true} title={strings('shopSettingsScreen.shippingCompany')}/>
        <SwitchTextInput isDropDownVisbile={false} defaultSwitchValue={true} 
        onRightPressed={(value) => { console.log('SWITCH VA:UE ::::', value) }} 
        title={strings('shopSettingsScreen.estimateProfit')}
        />
      </View>
    )
  }

  renderPaymentBox(){
    return (
      <View style={{ marginTop: 10 }}>
        <SwitchTextInput isDropDownVisbile={true} title={strings('shopSettingsScreen.paymentDropDownText')}/>
        <SwitchTextInput isDropDownVisbile={false} defaultSwitchValue={true} 
        onRightPressed={(value) => { console.log('SWITCH VA:UE ::::', value) }} 
        title={strings('shopSettingsScreen.taxInventory')}
        />
        <SwitchTextInput isDropDownVisbile={false} defaultSwitchValue={true} 
        onRightPressed={(value) => { console.log('SWITCH VA:UE ::::', value) }} 
        title={strings('shopSettingsScreen.taxOnSales')}
        />
      </View>
    )  
  }

  renderTaxBox(){
    return(
      <View
        style={[shopSettingStyle.validFormViewContainer,{marginTop: 0}]}>
        <View style={shopSettingStyle.inputWrapper}>
          <View style={shopSettingStyle.validFormSubView}>
            <TextInputMaterial
              blurText={this.state.taxTypeValue}
              refsValue={'taxType'}
              ref={'taxType'}
              label={strings('shopSettingsScreen.taxTypeInput')}
              maxLength={100}
              autoCapitalize={'none'}
              onChangeText={text => this.setState({ taxRateValue: text })}
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
                this.refs.campaignBarcdoe.focus();
              }}
            />
          </View>
        </View>
        <View style={{marginTop:10}}>
        <SwitchTextInput isDropDownVisbile={false} defaultSwitchValue={true}
          onRightPressed={(value) => { console.log('SWITCH VA:UE ::::', value) }}
          title={strings('shopSettingsScreen.flatTaxSwitch')}
        />
        </View>
        <View style={[shopSettingStyle.inputWrapper, {marginTop: 10}]}>
          <View style={shopSettingStyle.validFormSubView}>
            <TextInputMaterial
              blurText={this.state.taxRateValue}
              refsValue={'taxRate'}
              ref={'taxRate'}
              label={strings('shopSettingsScreen.taxRateInput')}
              maxLength={100}
              autoCapitalize={'none'}
              onChangeText={text => this.setState({ taxRateValue: text })}
              returnKeyType={'done'}
              autoCorrect={false}
              isLoginScreen={false}
              style={shopSettingStyle.input}
              placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
              underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
              value={this.state.taxRateValue}
              textInputName={this.state.taxRateValue}
              // errorText={strings('createCampaign.campaignNameErrorText')}
              underlineHeight={2}
              keyboardType="number"
              onSubmitEditing={event => {
              }}
            />
          </View>
        </View>
      </View>
    );
  }


  renderDefaultsText(){
    return(
      <View style={{ margin: 20 }}>
          <Text style={{ fontSize: 20 ,textAlign:'left'}}>{strings('shopSettingsScreen.defaultsTitle')}</Text>
      </View>    
    );
  }

  renderDefaultsTextInput(){
    
    return(
      <View
        style={[shopSettingStyle.validFormViewContainer,{marginTop: 0}]}>
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
              returnKeyType={'done'}
              autoCorrect={false}
              isLoginScreen={false}
              style={shopSettingStyle.input}
              placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
              underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
              value={this.state.profitMarginValue}
              textInputName={this.state.profitMarginValue}
              // errorText={strings('createCampaign.skuErrorText')}
              underlineHeight={2}
              keyboardType="number"
              onSubmitEditing={event => {
                this.refs.campaignBarcdoe.focus();
              }}
            />
          </View>
        </View>

        <View style={[shopSettingStyle.inputWrapper, {marginTop: 20}]}>
          <View style={shopSettingStyle.validFormSubView}>
            <TextInputMaterial
              blurText={this.state.shippingCostValue}
              refsValue={'shippingCost'}
              ref={'shippingCost'}
              label={strings('shopSettingsScreen.shippingCostInput')}
              maxLength={100}
              autoCapitalize={'none'}
              onChangeText={text => this.setState({ shippingCostValue: text })}
              returnKeyType={'done'}
              autoCorrect={false}
              isLoginScreen={false}
              style={shopSettingStyle.input}
              placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
              underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
              value={this.state.shippingCostValue}
              textInputName={this.state.shippingCostValue}
              // errorText={strings('createCampaign.campaignNameErrorText')}
              underlineHeight={2}
              keyboardType="number"
              onSubmitEditing={event => {
              }}
            />
          </View>
        </View>

        <View style={[shopSettingStyle.inputWrapper, {marginTop: 20}]}>
          <View style={shopSettingStyle.validFormSubView}>
            <TextInputMaterial
              blurText={this.state.handlingCostValue}
              refsValue={'handlingCost'}
              ref={'handlingCost'}
              label={strings('shopSettingsScreen.handlingCostInput')}
              maxLength={100}
              autoCapitalize={'none'}
              onChangeText={text => this.setState({ handlingCostValue: text })}
              returnKeyType={'done'}
              autoCorrect={false}
              isLoginScreen={false}
              style={shopSettingStyle.input}
              placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
              underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
              value={this.state.handlingCostValue}
              textInputName={this.state.handlingCostValue}
              // errorText={strings('createCampaign.campaignNameErrorText')}
              underlineHeight={2}
              keyboardType="number"
              onSubmitEditing={event => {
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

