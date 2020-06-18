import React, { Component } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, Keyboard, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';
import campaignStyle from './campaignStyle';
import { strings } from '../../i18next/i18n';
import * as RNLocalize from "react-native-localize";
// import {RNFirebase, firestore} from 'react-native-firebase';
import GlobalData from '../../utils/GlobalData';
import BaseComponent from '../../BaseComponent';
import TextInputMaterial from '../../components/textInputMaterial';
import AppButton from '../../components/AppButton'
import SwitchTextInput from '../../components/SwitchTextInput';
import QuantityField from '../../components/QuantityField';
import CreateTagView from './categoryTagView'
import Stepper from '../../components/Stepper/stepper'
import { color } from 'react-native-reanimated';
var globalData = new GlobalData();
var constants = require('../../config/Constants');
var compaignConstants = require('./campaignConstants')
var colorConstant = require('../../config/colorConstant')
var campaignDetails = "";
var campaignVariantArray = [];
var isUpdate = "";
var campaignId = "";
var fetchCampaignData = "";

export default class CampaignScreen extends BaseComponent {

  constructor(props) {
    super(props)
    this.state = {
      campaignName: '',
      campaignQuantity: "1",
      variantsList: [],
      categoryList: [],
      salesTax:'',
      salesTaxType:''
    }
    campaignDetails = props.campaignDetails;
    isUpdate = props.isUpdate ? props.isUpdate : false
    campaignId = props.campaignId
    fetchCampaignData = this.getProductDetail();
    // if (isUpdate) {
    //   this.setUpdateData();
    // }
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (this.isValidString(props.variantInfo)) {
      if (isUpdate) {
        this.updateCampaignVariantArray(props.variantInfo);
      } else {
        if (!this.isVariantExist(props.variantInfo)) {
          campaignVariantArray.push(props.variantInfo);
        }
      }
    }
  }

  isVariantExist(variantInfo) {
    if (this.isValidArray(campaignVariantArray) && this.isValidString(variantInfo)) {
      for (let i = 0; i < campaignVariantArray.length; i++) {
        if (campaignVariantArray[i].name === variantInfo.name) {
          campaignVariantArray[i].price = variantInfo.price;
          campaignVariantArray[i].barcode = variantInfo.barcode;
          campaignVariantArray[i].salePrice = variantInfo.salePrice;
          campaignVariantArray[i].skuNumber = variantInfo.skuNumber;
          campaignVariantArray[i].quantity = variantInfo.quantity;
          return true
        }
      }
    }
    return false
  }

  updateCampaignVariantArray(variantInfo) {
    let isUpdatedFlag = false;
    if (this.isValidArray(campaignVariantArray) && this.isValidString(variantInfo)) {
      for (let i = 0; i < campaignVariantArray.length; i++) {
        if (campaignVariantArray[i].name === variantInfo.name) {
          isUpdatedFlag = true;
          campaignVariantArray[i].price = variantInfo.price;
          campaignVariantArray[i].barcode = variantInfo.barcode;
          campaignVariantArray[i].salePrice = variantInfo.salePrice;
          campaignVariantArray[i].skuNumber = variantInfo.skuNumber;
          campaignVariantArray[i].quantity = variantInfo.quantity;
        }
      }
      if (!isUpdatedFlag) {
        campaignVariantArray.push(variantInfo);
      }
    } else if (this.isValidString(variantInfo)) {
      campaignVariantArray.push(variantInfo);
    }
  }

  componentWillUnmount() {
    campaignVariantArray = [];
    this.setState({
      variantsList: [],
      categoryList: []
    })
  }


  async componentDidMount() {

  }
  render() {
    return (
      <KeyboardAvoidingView style={campaignStyle.container} behavior={'padding'} >
        <Header title={strings('createCampaign.screenTitle')} isCrossIconVisible={false} onLeftArrowPressed={() => {
          campaignVariantArray = [];
          this.setState({
            variantsList: [],
            categoryList: []
          })
        }}/>
        <Stepper count={3} currentCount={2}/>
        <ScrollView keyboardShouldPersistTaps={'always'} style={{ marginTop: 10,marginBottom: 20  }}>
          <View>
            {this.renderSwitchTextInput()}
            {this.rendercampaignQuantity()}
            <View style={{ height: 0.7, backgroundColor: "#b8b2b2", marginTop: 10, width: "100%" }} />
            {this.renderCategoryTagView()}
            {this.renderVariantsQantityView()}
            {this.renderSalesTaxView()}
            {this.renderSalesTaxInput()}
          </View>
          <AppButton isLightTheme={false} buttonText={strings('createCampaign.nextButtonText')} onButtonPressed={() => {
            Actions.createCampaignShare()
            //this.addCampaign()
          }} />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  getCategoryTags(categoryList) {
    let categoryTags = "";
    if (this.isValidArray(categoryList)) {
      for (let i = 0; i < categoryList.length; i++) {
        let value = categoryList[i];
        if (this.isValidString(categoryTags)) {
          categoryTags = categoryTags + ", " + value
        } else {
          categoryTags = value;
        }
      }
    }
    return categoryTags;
  }

  getVariantItem(variant) {
    if (this.isValidArray(campaignVariantArray)) {
      for (let i = 0; i < campaignVariantArray.length; i++) {
        if (campaignVariantArray[i].name === variant) {
          return campaignVariantArray[i]
        }
      }
    }
    let variantItem = {};
    variantItem.name = variant;
    variantItem.price = "";
    variantItem.salePrice = "",
    variantItem.barcode = "";
    variantItem.skuNumber = "";
    variantItem.quantity="1"
    return variantItem;
  }
  
  addCampaign(){
    let variantList = [];
    //console.log('############# this.state.variantsList',this.state.variantsList);
    for (let i = 0; i < this.state.variantsList.length; i++) {
      let variantItem = this.getVariantItem(this.state.variantsList[i]);
      //console.log('############# variantItem',variantItem);
      variantList.push(this.getCampaignVariant(variantItem))
    }
    campaignDetails.campaignCategory = this.isValidArray(this.state.categoryList) ? this.state.categoryList[0] : ""
    campaignDetails.campaignCategoryTags = this.getCategoryTags(this.state.categoryList)
    let productListArr = [];
    productListArr.push(this.getProductRequestBody(campaignDetails, variantList));
    //console.log('############# productListArr ::::::',productListArr);
    var requestBody = this.getRequestBody(productListArr);
    console.log('############# requestBody ::::::',JSON.stringify(requestBody));



  }

  renderVariantsQantityView() {
    let variantList = [];
    if (this.isValidArray(this.state.variantsList)) {
      for (let i = 0; i < this.state.variantsList.length; i++) {
        variantList.push(this.renderQuantityView(this.state.variantsList[i]))
      }
    }
    return (
        <View >
              {variantList}
              </View>    
        
    )
  }

  renderQuantityView(quantityTitle) {
    return (
      <QuantityField isVarientQuantityView={true}
        onButtonPressed={() => {
          Actions.campaignVarient({ "variantName": quantityTitle, variantDetail: this.getVariantObj(quantityTitle) })
          //Actions.campaignVarient()
        }}
       title={quantityTitle} updatedQuantity={(quantity) => {
        this.setState({
          campaignQuantity: quantity
        })
      }} />
    )
  }

  getVariantObj(title) {
    if (this.isValidArray(campaignVariantArray)) {
      for (let i = 0; i < campaignVariantArray.length; i++) {
        if (campaignVariantArray[i].name == title) {
          return campaignVariantArray[i];
        }
      }
    }
    return "";
  }

  renderCategoryTagView() {
    return (
      <View style={{ paddingLeft:10,paddingTop: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', paddingLeft: 10 }}>{strings('createCampaign.categoryTagText')}</Text>
        <CreateTagView
          labelName={strings('createCampaign.categoryTagTextInput')}
          isCategoryTag={true}
          categoryList={this.state.categoryList}
          updatedList={(categoryList) => {
            globalData.setCategoriesCampaign(categoryList);
            this.setState({ categoryList: categoryList })
          }} />
        <View style={{ height: 0.7, backgroundColor: "#b8b2b2", marginTop: 10, width: "100%" }} />
        <View style={{ paddingTop: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', paddingLeft: 10 }}>{strings('createCampaign.variantsTagText')}</Text>
          <CreateTagView
            labelName={strings('createCampaign.variantsTagTextInput')}
            isCategoryTag={false}
            variantList={this.state.variantsList}
            updatedList={(variantList) => {
              globalData.setVariantsCampaign(variantList);
              //this.updateProductVariantList(variantList)
              this.setState({ variantsList: variantList })
            }} />
        </View>
      </View>
    )
  }

  rendercampaignQuantity() {
    return (
      <QuantityField title={strings('createCampaign.quanitytTitle')} quantity={campaignDetails.campaignQuantity} updatedQuantity={(quantity) => {
        globalData.setQuantityCampaign(quantity)
        campaignDetails.campaignQuantity = quantity
        this.setState({
          campaignQuantity: quantity
        })
      }} />
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
        style={campaignStyle.priceTextInputContainer}>
        <View style={campaignStyle.priceInputWrapper}>
          <View style={[campaignStyle.priceFormSubView, { paddingRight: 15 }]}>
            <TextInputMaterial
              blurText={this.state.campaignPriceValue}
              refsValue={'campaignPrice'}
              ref={'campaignPrice'}
              label={strings('createCampaignCategories.salesTaxTypeTextInput')}
              maxLength={100}
              autoCapitalize={'none'}
              onChangeText={text => { globalData.setSalesTaxType(text); this.setState({ salesTaxType: text }) }}
              returnKeyType={'next'}
              autoCorrect={false}
              isLoginScreen={false}
              style={campaignStyle.input}
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
        <View style={campaignStyle.priceInputWrapper}>
          <View style={[campaignStyle.priceFormSubView, { paddingLeft: 15 }]}>
            <TextInputMaterial
              blurText={this.state.campaignSaleValue}
              refsValue={'salesTaxPercent'}
              ref={'salesTaxPercent'}
              label={strings('createCampaignCategories.salesTaxTextInput')}
              maxLength={100}
              autoCapitalize={'none'}
              onChangeText={text => { globalData.setSalesTax(text); this.setState({ salesTax: text }) }}
              autoCorrect={false}
              isLoginScreen={false}
              returnKeyType={(Platform.OS === 'ios') ? 'done' : 'done'}
              keyBoardType={(Platform.OS === 'ios') ? 'number-pad' : 'number'}
              style={campaignStyle.input}
              placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
              underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
              value={this.state.campaignSaleValue}
              textInputName={this.state.campaignSaleValue}
              // errorText={strings('createCampaign.campaignNameErrorText')}
              underlineHeight={2}
              onSubmitEditing={event => {
                Keyboard.dismiss()
              }}
            />
          </View>
        </View>
      </View>
    )
  }

  getRequestBody(productArr){
    return{
      "campaignStatus": "DRAFT",
      "products": productArr,
    };
  }

  getProductRequestBody(data, variantList) {
    console.log('######### data :::: ',data);
    return {
      "productName": data.campaignName,
      "productFamily": data.campaignCategory,
      "productDescription": data.campaignDescription,
      "salesDescription": "",
      "incomeAccount": "Sales",
      "costAccount": "Cost of Goods",
      "vendor": "Vendor 1",
      "tags": data.campaignCategoryTags,
      "defaultDetails": {
        "variantName": "default",
        "optionalValues": "none",
        "productPrice": data.campaignSalePrice,
        "barCode": "9867543210",
        "sku": data.campaignskuNumber,
        "weight": data.weight,
        "weightUnit": data.weightUnit,
        "trackInventory": true,
        "reorderLevel": 10,
        "leadTime": 20,
        "quantityOnHand": this.isValidString(data.campaignQuantity) ? data.campaignQuantity : "1",
        "asOfDate": "12-Jan-2019",
        "requiredShipping": true,
        "taxable": true,
        "taxCode": "CA",
        "displayProduct": true,
        "comparePrice": data.campaignPrice,
      },
      "productVariants": variantList,
    }
    //discountinuedProduct
  }

  getCampaignVariant(variant) {
    console.log('######### getCampaignVariant :::: ',variant);
    return {
      "variantId": "",
      "variantName": variant.name,
      "optionalValues": "",
      "productPrice": variant.salePrice,
      "barCode": "9867543210",
      "sku": variant.skuNumber,
      "weight": 0,
      "weightUnit": "",
      "trackInventory": true,
      "reorderLevel": 10,
      "leadTime": 20,
      "quantityOnHand": this.isValidString(variant.quantity) ? variant.quantity : "1",
      "asOfDate": "12-Jan-2019",
      "requiredShipping": true,
      "taxable": true,
      "taxCode": "CA",
      "displayProduct": true,
      "comparePrice": variant.price,
    }
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

