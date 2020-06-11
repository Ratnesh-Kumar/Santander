import React, { Component } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TextInput, ScrollView, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';
import productStyle from './productStyle';
import { strings } from '../../i18next/i18n';
import Stepper from '../../components/Stepper/stepper'
import * as RNLocalize from "react-native-localize";
// import {RNFirebase, firestore} from 'react-native-firebase';
import GlobalData from '../../utils/GlobalData';
import BaseComponent from '../../BaseComponent';
import TextInputMaterial from '../../components/textInputMaterial';
import AppButton from '../../components/AppButton'
import SwitchTextInput from '../../components/SwitchTextInput';
import QuantityField from '../../components/QuantityField';
import CreateTagView from './productTagView'
import { color } from 'react-native-reanimated';
var globalData = new GlobalData();
var constants = require('../../config/Constants');
var productConstants = require('./productConstants')
var colorConstant = require('../../config/colorConstant')
export default class CampaignScreen extends BaseComponent {

  constructor(props) {
    super(props)
    this.state = {
      productName: '',
      productQuantity: 1,
      variantsList: [],
      categoryList: [],
      salesTaxType:'',
      salesTax:''
    }
  }

  async componentDidMount() {

  }
  render() {
    return (
      <View style={productStyle.container}>
        <Header title={strings('productScreen.addProduct')} isCrossIconVisible={false} />
        <Stepper count={2} currentCount={2}/>
        <ScrollView keyboardShouldPersistTaps={'always'} style={{ marginTop: 10 }}>

          <View>
            {this.renderSwitchTextInput()}
            {this.renderProductQuantity()}
            <View style={{ height: 0.7, backgroundColor: "#b8b2b2", marginTop: 10, width: "100%" }} />
            {this.renderCategoryTagView()}
            {this.renderVariantsQantityView()}
            {this.renderSalesTaxView()}
            {this.renderSalesTaxInput()}
          </View>
          <AppButton isLightTheme={false} buttonText={strings('productScreen.saveButtonText')} onButtonPressed={() => {
            this.showAlert()
          }} />
        </ScrollView>
      </View>
    );
  }
  showAlert() {
    Alert.alert(
      'Information',
      'Your product successfully saved.',
      [
        { text: 'OK', onPress: () => Actions.manageProduct() },
      ]
    );
  }

  renderVariantsQantityView() {
    let variantList = [];
    if (this.isValidArray(this.state.variantsList)) {
      for (let i = 0; i < this.state.variantsList.length; i++) {
        variantList.push(this.renderQuantityView(this.state.variantsList[i]))
      }
    }
    return (
      <View>
        {variantList}
      </View>
    )
  }

  renderQuantityView(quantityTitle) {
    return (
      <QuantityField isVarientQuantityView={true} 
      onButtonPressed={() => {
        Actions.productVarient()
      }}
      title={quantityTitle} updatedQuantity={(quantity) => {
        this.setState({
          productQuantity: quantity
        })
      }} />
    )
  }

  renderCategoryTagView() {
    return (
      <View style={{ paddingLeft:10,paddingTop: 20 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', paddingLeft: 10 }}>{strings('createCampaign.categoryTagText')}</Text>
        <CreateTagView labelName={strings('createCampaign.categoryTagTextInput')} updatedList={(categoryList) => { globalData.setCategoriesCampaign(categoryList); this.setState({ categoryList: categoryList }) }} />
        <View style={{ height: 0.7, backgroundColor: "#b8b2b2", marginTop: 10, width: "100%" }} />
        <View style={{ paddingTop: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', paddingLeft: 10 }}>{strings('createCampaign.variantsTagText')}</Text>
        <CreateTagView labelName={strings('createCampaign.variantsTagTextInput')} updatedList={(variantList) => { globalData.setVariantsCampaign(variantList); this.setState({ variantsList: variantList }) }} />
      </View>
      </View>
    )
  }

  renderProductQuantity() {
    return (
      <QuantityField title={strings('createCampaign.quanitytTitle')} updatedQuantity={(quantity) => { globalData.setQuantityCampaign(quantity) }} />
    )
  }

  renderSwitchTextInput() {
    return (
      <View style={{ marginTop: 10 }}>
        {this.renderSwitchFields(strings('createCampaignCategories.trackSwitchText'))}
      </View>
    );
  }
  renderSwitchFields(title) {
    return (
      <View>
        <SwitchTextInput
          defaultSwitchValue={true}
          onRightPressed={(value) => { console.log('SWITCH VA:UE ::::', value) }}
          title={title}
        />
      </View>
    );
  }
  renderSalesTaxView(){
    return(
        <View style={{ marginTop: 10 }}>
        {this.renderSwitchFields(strings('createCampaignCategories.salesTaxSwitchText'))}
      </View>
     
    )
  }

  renderSalesTaxInput(){
    return(
      <View
        style={productStyle.priceTextInputContainer}>
        <View style={productStyle.priceInputWrapper}>
          <View style={[productStyle.priceFormSubView, { paddingRight: 15 }]}>
            <TextInputMaterial
              blurText={this.state.campaignPriceValue}
              refsValue={'campaignPrice'}
              ref={'campaignPrice'}
              label={strings('createCampaignCategories.salesTaxTypeTextInput')}
              maxLength={100}
              autoCapitalize={'none'}
              onChangeText={text => { this.setState({ salesTaxType: text }) }}
              returnKeyType={'next'}
              autoCorrect={false}
              isLoginScreen={false}
              style={productStyle.input}
              placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
              underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
              value={this.state.campaignPriceValue}
              textInputName={this.state.campaignPriceValue}
              // errorText={strings('createCampaign.priceErrorText')}
              underlineHeight={2}
              keyboardType={'email-address'}
              onSubmitEditing={event => {
                this.refs.salesTaxPercent.focus();
              }}
            />
          </View>
        </View>
        <View style={productStyle.priceInputWrapper}>
          <View style={[productStyle.priceFormSubView, { paddingLeft: 15 }]}>
            <TextInputMaterial
              blurText={this.state.campaignSaleValue}
              refsValue={'salesTaxPercent'}
              ref={'salesTaxPercent'}
              label={strings('createCampaignCategories.salesTaxTextInput')}
              maxLength={100}
              autoCapitalize={'none'}
              onChangeText={text => {  this.setState({ salesTax: text }) }}
              returnKeyType={'next'}
              autoCorrect={false}
              isLoginScreen={false}
              keyboardType={'number-pad'}
              style={productStyle.input}
              placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
              underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
              value={this.state.campaignSaleValue}
              textInputName={this.state.campaignSaleValue}
              // errorText={strings('createCampaign.campaignNameErrorText')}
              underlineHeight={2}
              onSubmitEditing={event => {
              }}
            />
          </View>
        </View>
      </View>
    )
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

