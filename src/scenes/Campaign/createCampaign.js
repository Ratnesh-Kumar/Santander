import React, { Component } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, Keyboard, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';
import campaignStyle from './campaignStyle';
import { strings } from '../../i18next/i18n';
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
import ActivityIndicatorView from '../../components/activityindicator/ActivityIndicator';
import DialogModalView from '../../components/modalcomponent/DialogModal';
import { fetchCampaignPOST, fetchCampaignPUT } from '../../services/FetchData';
//import TaxData from '../../i18next/taxData.json';
//import Picker from 'react-native-picker';
var globalData = new GlobalData();
var constants = require('../../config/Constants');
var compaignConstants = require('./campaignConstants')
var colorConstant = require('../../config/colorConstant')
var campaignDetails = "";
var campaignVariantArray = [];
var isCampaignUpdate = "";
var campaignId = "";
var fetchCampaignData = "";
var taxType = [];
var categoriesViewScroll = 0;
var variantViewScroll = 0;
var salesTaxViewScroll = 0;
export default class CampaignScreen extends BaseComponent {

  constructor(props) {
    super(props)
    this.state = {
      campaignName: '',
      campaignQuantity: "1",
      variantListObject: [],
      variantsList: [],
      categoryList: [],
      salesTax: (this.isValidString(globalData.getSalesTax())) ? globalData.getSalesTax() + "" : "0.0",
      salesTaxType: globalData.getSalesTaxType(),
      isActivityIndicatorVisible: false,
      activityIndicatorText: '',
      isDialogModalVisible: false,
      dialogModalText: '',
      dialogModalTitle: '',
      isTrackQuantity: globalData.isTrackQuantityDisplay(),
      isSalesTax: false,
      handleKeyboardViewHeight: 0,
    }
    campaignDetails = props.campaignDetails;
    isCampaignUpdate = props.isCampaignUpdate ? props.isCampaignUpdate : false
    campaignId = props.campaignId
    fetchCampaignData = this.getCampaignDetail();
    if (isCampaignUpdate) {
      this.setUpdateData(fetchCampaignData);
    }

  }

  setUpdateData(fetchCampaignData) {
    campaignVariantArray = [];
    if (this.isValidString(fetchCampaignData)) {
      if (this.isValidString(fetchCampaignData.tags)) {
        let tags = [];
        if (fetchCampaignData.tags.includes(",")) {
          tags = fetchCampaignData.tags.split(", ")

        } else {
          tags.push(fetchCampaignData.tags);

        }
        this.state.categoryList = tags
      }

      campaignDetails.campaignQuantity = fetchCampaignData.defaultDetails.quantityOnHand;
      setTimeout(() => {
        this.setState({
          campaignQuantity: fetchCampaignData.defaultDetails.quantityOnHand,
          salesTaxType: fetchCampaignData.defaultDetails.taxCode,
          isSalesTax: fetchCampaignData.defaultDetails.taxable,
          salesTax:fetchCampaignData.defaultDetails.taxPercentage,
        })
      }, 100)

      if (this.isValidArray(fetchCampaignData.productVariants)) {
        let productVariant = fetchCampaignData.productVariants;
        for (let i = 0; i < productVariant.length; i++) {
          let variant = productVariant[i];
          if (!variant.discountinuedProduct) {
            let variantDetail = {};
            this.state.variantsList.push({ "name": variant.variantName, "quantity": variant.quantityOnHand })
            variantDetail.name = variant.variantName;
            variantDetail.price = variant.comparePrice;
            variantDetail.barcode = variant.barCode;
            variantDetail.skuNumber = variant.sku;
            variantDetail.salePrice = variant.productPrice;
            variantDetail.productCost = variant.productCost;
            variantDetail.quantity = variant.quantityOnHand;
            variantDetail.discountinuedProduct = variant.discountinuedProduct;
            campaignVariantArray.push(variantDetail)
          }
        }
      }
    }
    this.forceUpdate()
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (this.isValidString(props.variantInfo)) {
      if (isCampaignUpdate) {
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
      <View style={campaignStyle.container} >
        {this.renderModal()}
        <Header title={strings('createCampaign.screenTitle')} isCrossIconVisible={false} onLeftArrowPressed={() => {
          campaignVariantArray = [];
          //Picker.hide()
          this.setState({
            variantsList: [],
            categoryList: []
          })
        }} />
        <Stepper count={3} currentCount={2} />
        <View style={{ flex: 1 }}>
          <ScrollView
            ref='scrollView'
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps={'always'}
            onScrollBeginDrag={() => this.onDragScroll()}
            keyboardShouldPersistTaps={'always'} style={{ marginTop: 10 }}>
            <View>
              <View style={{ paddingLeft: 10, paddingTop: 20 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', paddingLeft: 10 }}>{strings('createCampaign.quantityTitle')}</Text>
              </View>
              {this.rendercampaignQuantity()}
              {this.renderSwitchTextInput()}
              <View style={{ height: 0.7, backgroundColor: "#b8b2b2", marginTop: 10, width: "100%" }} />
              {this.renderCategoryTagView()}
              {this.renderVariantsQantityView()}
              {this.renderSalesTaxView()}
              {this.renderSalesTaxInput()}
            </View>
            <AppButton isLightTheme={false} buttonText={strings('createCampaign.nextButtonText')} onButtonPressed={() => {
              //Actions.createCampaignShare()
              //Picker.hide();
              this.addCampaign()
            }} />
          </ScrollView>
          <View style={{ height: this.state.handleKeyboardViewHeight }}>
          </View>
        </View>
      </View>
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
        if (campaignVariantArray[i].name === variant.name) {
          return campaignVariantArray[i]
        }
      }
    }
    let variantItem = {};
    variantItem.name = variant.name;
    variantItem.price = "";
    variantItem.salePrice = "",
      variantItem.barcode = "";
    variantItem.skuNumber = "";
    variantItem.quantity = variant.quantity
    return variantItem;
  }

  async addCampaign() {
    this.renderActivityIndicatorShow()
    let variantList = [];
    let productListArr = [];
    for (let i = 0; i < this.state.variantsList.length; i++) {
      let variantItem = this.getVariantItem(this.state.variantsList[i]);
      variantList.push(this.getCampaignVariant(variantItem))
    }
    campaignDetails.campaignCategory = this.isValidArray(this.state.categoryList) ? this.state.categoryList[0] : ""
    campaignDetails.campaignCategoryTags = this.getCategoryTags(this.state.categoryList)
    productListArr.push(this.getProductRequestBody(campaignDetails, variantList));
    var requestBody = this.getRequestBody(productListArr, "DRAFT");
    // Call API for the save campaigan as a DRAFT 
    var responseData = "";
    if (isCampaignUpdate) {
      let campaignUpdateURL = constants.GET_CAMPAIGN_DETAIL.replace(constants.BUISNESS_ID, globalData.getBusinessId()) + campaignId;
      responseData = await fetchCampaignPUT(campaignUpdateURL, requestBody)
      this.setCampaignID(campaignId)
    } else {
      let campaignSaveURL = constants.GET_CAMPAIGN_LIST.replace(constants.BUISNESS_ID, globalData.getBusinessId());
      responseData = await fetchCampaignPOST(campaignSaveURL, requestBody)
      let campaiganIDCreated = responseData.properties[0].value.campaignId;
      this.setCampaignID(campaiganIDCreated)
    }

    if (this.isValidString(responseData) && this.isValidString(responseData.statusMessage)) {
      if (responseData.statusMessage === constants.SUCCESS_STATUS) {
        await this.createRequestBodyforPublish(productListArr)
        campaignVariantArray = [];
        this.setState({
          variantsList: [],
          categoryList: []
        })
        this.setCampaignDetail('');
        this.renderActivityIndicatorHide()
        //Actions.createCampaignShare()
        setTimeout(() => {
          this.showAlert()
        }, 100);
      }
    }
    this.renderActivityIndicatorHide()

  }

  createRequestBodyforPublish(productListArr) {
    let campaignRequestbody = this.getRequestBody(productListArr, "PUBLISHED");
    if (isCampaignUpdate) {
      this.setCampaignResponse(campaignRequestbody)
    } else {
      this.setCampaignResponse(campaignRequestbody)
    }
  }

  showAlert() {
    Alert.alert(
      'Info',
      'Your campaign successfully added as a draft. Do you want to publish it ?',
      [
        {
          text: 'PUBLISH', onPress: () => {
            Actions.createCampaignShare()
          }
        },
        {
          text: 'NO', onPress: () => {
            this.setCampaignID("")
            this.setCampaignResponse("")
            Actions.manageCampaign({ type: 'reset' });
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
        variantList.push(this.renderQuantityView(this.state.variantsList[i].name))
      }
    }
    return (
      <View
        onLayout={event => {
          const layout = event.nativeEvent.layout;
          variantViewScroll = layout.y
        }}
      >
        {variantList}
      </View>

    )
  }

  renderQuantityView(quantityTitle) {
    return (
      <QuantityField
        isVarientQuantityView={true}
        isTrackQuantity={this.state.isTrackQuantity}
        onButtonPressed={() => {
          Actions.campaignVarient({ "variantName": quantityTitle, variantDetail: this.getVariantObj(quantityTitle) })
        }}
        quantity={this.getVariantObj(quantityTitle).quantity}
        inputFocus={() => { this.inputFocused('variantQuantity') }}
        inputBlur={() => { this.inputBlurred('variantQuantity') }}
        title={quantityTitle}
        updatedQuantity={(quantity) => {
          let variantObj = this.getVariantObj(quantityTitle);
          variantObj.quantity = quantity;
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
    if (this.isValidArray(this.state.variantsList)) {
      for (let i = 0; i < this.state.variantsList.length; i++) {
        if (this.state.variantsList[i].name == title) {
          return this.state.variantsList[i];
        }
      }
    }

    return "";
  }

  renderCategoryTagView() {
    return (
      <View
        onLayout={event => {
          const layout = event.nativeEvent.layout;
          categoriesViewScroll = layout.y
        }}
        style={{ paddingLeft: 10, paddingTop: 20 }}>
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
            inputFocus={() => { this.inputFocused('variantTagView') }}
            inputBlur={() => { this.inputBlurred('variantTagView') }}
            updatedList={(variantList) => {
              globalData.setVariantsCampaign(variantList);
              this.updateVariantList(variantList)
              this.updateCampaignVariantList(variantList)

            }} />
        </View>
      </View>
    )
  }

  updateVariantList(variantList) {
    let newVariantList = [];

    for (let i = 0; i < variantList.length; i++) {
      let variantItem = "";
      for (let j = 0; j < this.state.variantsList.length; j++) {
        if (variantList[i] == this.state.variantsList[j].name) {
          variantItem = this.state.variantsList[j];
          break;
        }
      }
      if (!this.isValidString(variantItem)) {
        // variantItem.name= variantList[i];
        // variantItem.quantity="";
        newVariantList.push({ "name": variantList[i], quantity: "1" })
      } else {
        newVariantList.push(variantItem)
      }
    }
    this.setState({ variantsList: newVariantList })
  }

  updateCampaignVariantList(variantList) {
    if (this.isValidArray(campaignVariantArray) && this.isValidArray(variantList)) {
      for (let i = 0; i < campaignVariantArray.length; i++) {
        let isExistFlag = false
        for (let j = 0; j < variantList.length; j++) {
          if (campaignVariantArray[i].name === variantList[j]) {
            isExistFlag = true;
          }
        }
        if (!isExistFlag) {
          campaignVariantArray.splice(campaignVariantArray.indexOf(campaignVariantArray[i]), 1)
        }
      }
    } else if (this.isValidArray(variantList)) {
      campaignVariantArray = [];
    }

  }

  rendercampaignQuantity() {
    if (this.state.isTrackQuantity) {
      return (
        <QuantityField
          title={strings('createCampaign.quantityTotal')}
          quantity={campaignDetails.campaignQuantity}
          isTrackQuantity={this.state.isTrackQuantity}
          updatedQuantity={(quantity) => {
            globalData.setQuantityCampaign(quantity)
            campaignDetails.campaignQuantity = quantity
            this.setState({
              campaignQuantity: quantity
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

  renderSwitchFieldsSalesTax(title) {
    return (
      <View>
        <SwitchTextInput
          defaultSwitchValue={this.state.isSalesTax}
          onRightPressed={(flag) => { this.setState({ isSalesTax: flag }) }}
          title={title}
        />
      </View>
    );
  }

  renderSalesTaxView() {
    return (
      <View style={{ marginTop: 10 }}>
        {this.renderSwitchFieldsSalesTax(strings('createCampaignCategories.salesTaxSwitchText'))}
      </View>

    )
  }

  renderSalesTaxInput() {
    //let salesTaxTypeTitle=this.state.salesTaxType==''?strings('createCampaignCategories.salesTaxTypeTextInput'):this.state.salesTaxType
    if (this.state.isSalesTax)
      return (
        <View
          onLayout={event => {
            const layout = event.nativeEvent.layout;
            salesTaxViewScroll = layout.y
          }}
          style={campaignStyle.priceTextInputContainer}>
          <View style={campaignStyle.priceInputWrapper}>
            <View style={[campaignStyle.priceFormSubView, { paddingRight: 15 }]}>
              <TextInputMaterial
                blurText={this.state.salesTaxType}
                refsValue={'campaignTaxType'}
                ref={'campaignTaxType'}
                label={strings('createCampaignCategories.salesTaxTypeTextInput')}
                maxLength={100}
                autoCapitalize={'none'}
                onFocus={() => this.inputFocused("campaignTaxType")}
                onBlur1={() => this.inputBlurred("campaignTaxType")}
                onChangeText={text => { this.setState({ salesTaxType: text }) }}
                returnKeyType={'next'}
                autoCorrect={false}
                isLoginScreen={false}
                style={campaignStyle.input}
                placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                value={this.state.salesTaxType}
                textInputName={this.state.salesTaxType}
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
                blurText={this.state.salesTax}
                refsValue={'salesTaxPercent'}
                ref={'salesTaxPercent'}
                onFocus={() => this.inputFocused("salesTaxPercent")}
                onBlur1={() => {
                  this.inputBlurred("salesTaxPercent")
                  let tax = parseFloat(this.state.salesTax)
                  tax = tax.toFixed(2);
                  this.setState({ salesTax: tax + "" })
                }}
                label={strings('createCampaignCategories.salesTaxTextInput')}
                maxLength={100}
                autoCapitalize={'none'}
                onChangeText={text => { this.setState({ salesTax: text }) }}
                autoCorrect={false}
                isLoginScreen={false}
                returnKeyType={(Platform.OS === 'ios') ? 'done' : 'done'}
                keyBoardType={(Platform.OS === 'ios') ? 'number-pad' : 'number'}
                style={campaignStyle.input}
                placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                value={this.state.salesTax}
                textInputName={this.state.salesTax}
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

  onDragScroll() {
    Keyboard.dismiss();
    this.setState({
      handleKeyboardViewHeight: 0
    })
  }

  inputBlurred(refName) {
    if (this.refs.scrollView !== null && this.refs.scrollView !== undefined) {
      if (Platform.OS === 'ios') {
        this.setState({
          handleKeyboardViewHeight: 0
        })
      }
      if (refName === 'salesTaxPercent' || refName === 'campaignTaxType') {
        this.refs.scrollView.scrollTo({ x: 0, y: salesTaxViewScroll, animated: true })
      }
      if (refName === 'variantTagView') {
        this.refs.scrollView.scrollTo({ x: 0, y: categoriesViewScroll, animated: true })
      }
      if (refName === 'variantQuantity') {
        this.refs.scrollView.scrollTo({ x: 0, y: variantViewScroll, animated: true })
      }
    }
  }
  inputFocused(refName) {
    if (this.refs.scrollView !== null && this.refs.scrollView !== undefined) {
      if (Platform.OS === 'ios') {
        this.setState({
          handleKeyboardViewHeight: 250
        })
      }
      if (refName === 'variantTagView') {
        setTimeout(() => {
          this.refs.scrollView.scrollTo({ x: 0, y: categoriesViewScroll, animated: true })
        }, 100);
      }
      if (refName === 'salesTaxPercent' || refName === 'campaignTaxType') {
        setTimeout(() => {
          this.refs.scrollView.scrollTo({ x: 0, y: salesTaxViewScroll, animated: true })
        }, 100);
      }
      if (refName === 'variantQuantity') {
        setTimeout(() => {
          this.refs.scrollView.scrollTo({ x: 0, y: variantViewScroll, animated: true })
        }, 100);
      }
    }
  }


  // handleTaxPicker(){
  //   // for (let data of TaxData) {
  //   //   taxType.push(data['type'])
  //   // }
  //   taxType=['PL-VAT','ES-VAT','UK-VAT','MX-Sales Tax','BR-Sales Tax','US-Sales Tax','DE-VAT','AR-VAT','CL-VAT']
  //   Keyboard.dismiss()
  //   Picker.hide()
  //   Picker.init({
  //     pickerData: taxType,
  //     pickerTitleText: 'Select Tax',
  //     pickerConfirmBtnText: 'Done',
  //     pickerCancelBtnText: 'Cancel',
  //     selectedValue: [taxType[0].toString().trim()],
  //     pickerBg: [255, 255, 255, 1],

  //     onPickerConfirm: data => {
  //       this.getTaxData(data)
  //     },
  //     onPickerCancel: data => {
  //       Picker.hide();
  //     },
  //     onPickerSelect: data => {
  //       //console.log(data);
  //     }
  //   });
  //   Picker.show();
  // }
  // async getTaxData(data) {
  //   let taxRate = await TaxData.filter(obj => obj.type === data.toString().trim())[0].rate

  //   this.setState({
  //     salesTax: taxRate,
  //     salesTaxType: data

  //   })
  // }

  getRequestBody(productArr, campaignStatus) {
    return {
      "campaignStatus": campaignStatus,
      "products": productArr,
    };
  }

  getProductRequestBody(data, variantList) {
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
        "barCode": "",
        "sku": data.campaignskuNumber,
        "weight": data.weight,
        "weightUnit": data.weightUnit,
        "trackInventory": true,
        "reorderLevel": 10,
        "leadTime": 20,
        "quantityOnHand": this.isValidString(data.campaignQuantity) ? data.campaignQuantity : "1",
        "asOfDate": this.getFormattedDate(),
        "requiredShipping": true,
        "taxable": this.state.isSalesTax,
        "taxCode": this.state.salesTaxType,
        "taxPercentage":this.state.salesTax,
        "displayProduct": true,
        "comparePrice": data.campaignPrice,
        "productImage": data.productImage,
        "productURL": data.productURL
      },
      "productVariants": variantList,
    }
    //discountinuedProduct
  }

  getCampaignVariant(variant) {
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
      "asOfDate": this.getFormattedDate(),
      "requiredShipping": true,
      "taxable": true,
      "taxCode": "CA",
      "displayProduct": true,
      "comparePrice": variant.price,
    }
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

