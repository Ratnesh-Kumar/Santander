import React, { Component } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TextInput, ScrollView, Alert, Platform, Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';
import productStyle from './productStyle';
import { strings } from '../../i18next/i18n';
import Stepper from '../../components/Stepper/stepper'
import { fetchProductPOST, fetchPartyPOST, fetchProductPUT } from '../../services/FetchData';
import * as RNLocalize from "react-native-localize";
// import {RNFirebase, firestore} from 'react-native-firebase';
import GlobalData from '../../utils/GlobalData';
import BaseComponent from '../../BaseComponent';
import TextInputMaterial from '../../components/textInputMaterial';
import AppButton from '../../components/AppButton'
import SwitchTextInput from '../../components/SwitchTextInput';
import QuantityField from '../../components/QuantityField';
import CreateTagView from './productTagView'
import ActivityIndicatorView from '../../components/activityindicator/ActivityIndicator';
import DialogModalView from '../../components/modalcomponent/DialogModal';
var globalData = new GlobalData();
var constants = require('../../config/Constants');
var productConstants = require('./productConstants')
var colorConstant = require('../../config/colorConstant')
var productDetails = "";
var productVariantArray = [];
var isUpdate = "";
var fetchProductData = "";
var productId = "";
export default class AddProductCategory extends BaseComponent {

  constructor(props) {
    super(props)
    this.state = {
      productName: '',
      productQuantity: "1",
      variantsList: [],
      categoryList: [],
      salesTaxType: '',
      salesTax: '',
      isActivityIndicatorVisible: false,
      activityIndicatorText: '',
      isDialogModalVisible: false,
      dialogModalText: '',
      dialogModalTitle: '',
      isTrackQuantity: true
    }
    productDetails = props.productDetails;
    isUpdate = props.isUpdate ? props.isUpdate : false
    productId = props.productId
    fetchProductData = this.getProductDetail();
    if (isUpdate) {
      this.setUpdateData();
    }

  }

  setUpdateData() {
    productVariantArray = [];
    if (this.isValidString(fetchProductData)) {
      if (this.isValidString(fetchProductData.tags)) {
        let tags = [];
        if (fetchProductData.tags.includes(",")) {
          tags = fetchProductData.tags.split(", ")

        } else {
          tags.push(fetchProductData.tags);

        }
        this.state.categoryList = tags
      }

      productDetails.productQuantity = fetchProductData.defaultDetails.quantityOnHand;
      this.setState({
        productQuantity: fetchProductData.defaultDetails.quantityOnHand
      })
      if (this.isValidArray(fetchProductData.productVariants)) {
        let productVariant = fetchProductData.productVariants;
        for (let i = 0; i < productVariant.length; i++) {
          let variant = productVariant[i];
          if (!variant.discountinuedProduct) {
            let variantDetail = {};
            this.state.variantsList.push(variant.variantName)
            variantDetail.name = variant.variantName;
            variantDetail.price = variant.comparePrice;
            variantDetail.barcode = variant.barCode;
            variantDetail.skuNumber = variant.sku;
            variantDetail.salePrice = variant.productPrice;
            variantDetail.productCost = variant.productCost;
            variantDetail.quantity = variant.quantityOnHand;
            variantDetail.discountinuedProduct = variant.discountinuedProduct;
            productVariantArray.push(variantDetail)
          }
        }
      }
    }
    this.forceUpdate()
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

  UNSAFE_componentWillReceiveProps(props) {
    if (this.isValidString(props.variantInfo)) {
      if (isUpdate) {
        this.updateProductVariantArray(props.variantInfo);
      } else {
        if (!this.isVariantExist(props.variantInfo)) {
          productVariantArray.push(props.variantInfo);
        }
      }
    }
  }

  isVariantExist(variantInfo) {
    if (this.isValidArray(productVariantArray) && this.isValidString(variantInfo)) {
      for (let i = 0; i < productVariantArray.length; i++) {
        if (productVariantArray[i].name === variantInfo.name) {
          productVariantArray[i].price = variantInfo.price;
          productVariantArray[i].barcode = variantInfo.barcode;
          productVariantArray[i].salePrice = variantInfo.salePrice;
          productVariantArray[i].skuNumber = variantInfo.skuNumber;
          productVariantArray[i].productCost = variantInfo.productCost;
          productVariantArray[i].quantity = variantInfo.quantity;
          return true
        }
      }
    }
    return false
  }

  updateProductVariantArray(variantInfo) {
    let isUpdatedFlag = false;
    if (this.isValidArray(productVariantArray) && this.isValidString(variantInfo)) {
      for (let i = 0; i < productVariantArray.length; i++) {
        if (productVariantArray[i].name === variantInfo.name) {
          isUpdatedFlag = true;
          productVariantArray[i].price = variantInfo.price;
          productVariantArray[i].barcode = variantInfo.barcode;
          productVariantArray[i].salePrice = variantInfo.salePrice;
          productVariantArray[i].skuNumber = variantInfo.skuNumber;
          productVariantArray[i].productCost = variantInfo.productCost;
          productVariantArray[i].quantity = variantInfo.quantity;
        }
      }
      if (!isUpdatedFlag) {
        productVariantArray.push(variantInfo);
      }
    } else if (this.isValidString(variantInfo)) {
      productVariantArray.push(variantInfo);
    }
  }

  componentDidMount() {
    if (isUpdate) {

    }
  }

  componentWillUnmount() {
    productVariantArray = [];
    this.setState({
      variantsList: [],
      categoryList: []
    })
  }

  render() {
    return (
      <KeyboardAvoidingView style={productStyle.container} behavior="padding" keyboardVerticalOffset={0}>
        {this.renderModal()}
        <Header title={strings('productScreen.addProduct')} isCrossIconVisible={false} onLeftArrowPressed={() => {
          productVariantArray = [];
          this.setState({
            variantsList: [],
            categoryList: []
          })
        }} />
        <Stepper count={2} currentCount={2} />
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
            this.addProduct()
          }} />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }


  getVariantItem(variant) {
    if (this.isValidArray(productVariantArray)) {
      for (let i = 0; i < productVariantArray.length; i++) {
        if (productVariantArray[i].name === variant) {
          return productVariantArray[i]
        }
      }
    }
    let variantItem = {};
    variantItem.name = variant;
    variantItem.price = "";
    variantItem.salePrice = "",
      variantItem.barcode = "";
    variantItem.skuNumber = "";
    variantItem.productCost = "";
    variantItem.quantity = "1"
    return variantItem;
  }

  async addProduct() {
    let variantList = [];
    this.renderActivityIndicatorShow()

    for (let i = 0; i < this.state.variantsList.length; i++) {
      let variantItem = this.getVariantItem(this.state.variantsList[i]);
      variantList.push(this.getProductVariant(variantItem))
    }
    productDetails.productCategory = this.isValidArray(this.state.categoryList) ? this.state.categoryList[0] : ""
    productDetails.productCategoryTags = this.getCategoryTags(this.state.categoryList)
    var requestBody = this.getRequestBody(productDetails, variantList);
    var responseData = "";
    if (isUpdate) {
      let productUpdateURL = constants.GET_PRODUCT_DETAIL.replace(constants.PRODUCT_ID, productId) + globalData.getBusinessId();
      responseData = await fetchProductPUT(productUpdateURL, requestBody)
    } else {
      responseData = await fetchPartyPOST(constants.GET_PRODUCT_LIST + globalData.getBusinessId(), requestBody)
    }
    if (this.isValidString(responseData) && this.isValidString(responseData.statusMessage)) {
      if (responseData.statusMessage === constants.SUCCESS_STATUS) {
        productVariantArray = [];
        this.setState({
          variantsList: [],
          categoryList: []
        })
        this.renderActivityIndicatorHide()
        this.setProductDetail("");
        setTimeout(() => {
          this.showAlert()
        }, 100)

      }
    }
    this.renderActivityIndicatorHide()
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

  showAlert() {
    Alert.alert(
      'Info',
      (isUpdate) ? 'Your product successfully updated.' : 'Your product successfully added.',
      [
        {
          text: 'OK', onPress: () => {
            Actions.manageProduct({ type: 'reset' });
            setTimeout(() => {
              Actions.refresh({ isRefresh: true });
            }, 100)
          }
        },
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

  productVariant() {
    return productVariant;
  }

  renderQuantityView(quantityTitle) {
    return (
      <QuantityField
        isVarientQuantityView={true}
        onButtonPressed={() => {
          Actions.productVarient({ "variantName": quantityTitle, variantDetail: this.getVariantObj(quantityTitle) })
        }}
        isTrackQuantity={this.state.isTrackQuantity}
        quantity={this.getVariantObj(quantityTitle).quantity}
        title={quantityTitle}
        updatedQuantity={(quantity) => {
          let variantObj = this.getVariantObj(quantityTitle);
          variantObj.quantity = quantity;
          this.setState({
            productQuantity: quantity
          })
        }} />
    )
  }

  getVariantObj(title) {
    if (this.isValidArray(productVariantArray)) {
      for (let i = 0; i < productVariantArray.length; i++) {
        if (productVariantArray[i].name == title) {
          return productVariantArray[i];
        }
      }
    }
    return "";
  }

  renderCategoryTagView() {
    return (
      <View style={{ paddingLeft: 10, paddingTop: 20 }}>
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
              this.updateProductVariantList(variantList)
              this.setState({ variantsList: variantList })
            }} />
        </View>
      </View>
    )
  }



  updateProductVariantList(variantList) {
    if (this.isValidArray(productVariantArray) && this.isValidArray(variantList)) {
      for (let i = 0; i < productVariantArray.length; i++) {
        let isExistFlag = false
        for (let j = 0; j < variantList.length; j++) {
          if (productVariantArray[i].name === variantList[j]) {
            isExistFlag = true;
          }
        }
        if (!isExistFlag) {
          productVariantArray.splice(productVariantArray.indexOf(productVariantArray[i]), 1)
        }
      }

    } else {
      productVariantArray = [];
    }

  }

  renderProductQuantity() {
    // console.log("################# isTrackQuantity : " + this.state.isTrackQuantity)
    if (this.state.isTrackQuantity) {
      return (
        <QuantityField
        title={strings('createCampaign.quanitytTitle')} 
        quantity={productDetails.productQuantity}isTrackQuantity
        isTrackQuantity={this.state.isTrackQuantity} 
        updatedQuantity={(quantity) => {
          globalData.setQuantityCampaign(quantity)
          productDetails.productQuantity = quantity
          this.setState({
            productQuantity: quantity
          })
        }} />
      )
    } else {
      return (
        <View />
      )
    }
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
          defaultSwitchValue={this.state.isTrackQuantity}
          onRightPressed={(flag) => { this.setState({ isTrackQuantity: flag }) }}
          title={title}
        />
      </View>
    );
  }
  renderSalesTaxView() {
    return (
      <View style={{ marginTop: 10 }}>
        {this.renderSwitchFields(strings('createCampaignCategories.salesTaxSwitchText'))}
      </View>

    )
  }

  renderSalesTaxInput() {
    return (
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
              onChangeText={text => { this.setState({ salesTax: text }) }}
              autoCorrect={false}
              isLoginScreen={false}
              returnKeyType={(Platform.OS === 'ios') ? 'done' : 'next'}
              keyBoardType={(Platform.OS === 'ios') ? 'number-pad' : 'number'}
              style={productStyle.input}
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

  getRequestBody(data, variantList) {
    return {
      "sourcePrimaryKey": "",
      "productName": data.productName,
      "productFamily": data.productCategory,
      "productDescription": data.productDescription,
      "salesDescription": "",
      "incomeAccount": "Sales",
      "costAccount": "Cost of Goods",
      "vendor": "Vendor 1",
      "tags": data.productCategoryTags,
      "defaultDetails": {
        "variantName": "default",
        "optionalValues": "none",
        "productPrice": data.productSalePrice,
        "barCode": "",
        "sku": data.skuNumber,
        "weight": data.weight,
        "weightUnit": data.weightUnit,
        "trackInventory": true,
        "reorderLevel": 10,
        "leadTime": 20,
        "quantityOnHand": this.isValidString(data.productQuantity) ? data.productQuantity : "1",
        "asOfDate": "12-Jan-2019",
        "requiredShipping": true,
        "taxable": true,
        "taxCode": "CA",
        "displayProduct": true,
        "comparePrice": data.productPrice,
        "productCost": data.productCost,
        "defaultProfitMargetSet": !this.isValidString(data.productCost),
        "productImage": data.productImage,
        "productURL": data.productURL
      },
      "productVariants": variantList,
      "extensions": []
    }
    //discountinuedProduct
  }

  getProductVariant(variant) {
    return {
      "variantId": "",
      "variantName": variant.name,
      "optionalValues": "",
      "productPrice": variant.salePrice,
      "barCode": "",
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
      "productCost": variant.productCost,
      "defaultProfitMargetSet": !this.isValidString(variant.productCost)
    }
  }

}



