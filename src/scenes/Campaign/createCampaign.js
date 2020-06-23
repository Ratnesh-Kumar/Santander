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
import TaxData from '../../i18next/taxData.json';
import Picker from 'react-native-picker';
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
      variantsList: [],
      categoryList: [],
      salesTax: '',
      salesTaxType: '',
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
      this.setState({
        campaignQuantity: fetchCampaignData.defaultDetails.quantityOnHand
      })
      if (this.isValidArray(fetchCampaignData.productVariants)) {
        let productVariant = fetchCampaignData.productVariants;
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

  onDragScroll() {
    Keyboard.dismiss();
    this.setState({
      handleKeyboardViewHeight: 0
    })
  }
  render() {
    return (
      <View style={campaignStyle.container} >
        {this.renderModal()}
        <Header title={strings('createCampaign.screenTitle')} isCrossIconVisible={false} onLeftArrowPressed={() => {
          campaignVariantArray = [];
          Picker.hide()
          this.setState({
            variantsList: [],
            categoryList: []
          })
        }} />
        <Stepper count={3} currentCount={2} />
        <View style={{flex:1}}>
        <ScrollView 
        ref='scrollView'
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps={'always'} 
        onScrollBeginDrag={() => this.onDragScroll()}
        keyboardShouldPersistTaps={'always'} style={{ marginTop: 10, marginBottom: 20 }}>
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
            //Actions.createCampaignShare()
            Picker.hide();
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
    variantItem.quantity = "1"
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
        variantList.push(this.renderQuantityView(this.state.variantsList[i]))
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
        inputFocus={()=> { this.inputFocused('variantQuantity') }}
        inputBlur={()=> { this.inputBlurred('variantQuantity') } }
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
            inputFocus={()=> { this.inputFocused('variantTagView') }}
            inputBlur={()=> { this.inputBlurred('variantTagView') } }
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
    if (this.state.isTrackQuantity) {
      return (
        <QuantityField
          title={strings('createCampaign.quanitytTitle')}
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
    let salesTaxTypeTitle=this.state.salesTaxType==''?strings('createCampaignCategories.salesTaxTypeTextInput'):this.state.salesTaxType
    if (this.state.isSalesTax)
      return (
        <View
        onLayout={event => {
          const layout = event.nativeEvent.layout;
          salesTaxViewScroll = layout.y
        }}
          style={campaignStyle.priceTextInputContainer}>
          {/* <View style={campaignStyle.priceInputWrapper}>
          <View style={[campaignStyle.priceFormSubView, { paddingRight: 15 }]}>
            <TextInputMaterial
              blurText={this.state.salesTaxType}
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
        </View> */}

          <View style={campaignStyle.priceInputWrapper}>
            <View style={[campaignStyle.priceFormSubView, { paddingRight: 15 }]}>
              <View
                style={campaignStyle.containerStyleWithBorder}>
                <Text style={{ paddingLeft: 10, paddingRight: 70, textAlign: 'left', marginTop: 20, fontSize: 16 }}>
                  {salesTaxTypeTitle}</Text>
                <View
                  style={{ position: 'absolute', right: 10, top: 10 }}>
                  <TouchableOpacity onPress={() => this.handleTaxPicker()}>
                    <Image
                      style={{ width: 35, height: 35 }}
                      source={require('../.././public/images/dropDown.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={campaignStyle.priceInputWrapper}>
            <View style={[campaignStyle.priceFormSubView, { paddingLeft: 15 }]}>
              <TextInputMaterial
                blurText={this.state.salesTax}
                refsValue={'salesTaxPercent'}
                ref={'salesTaxPercent'}
                onFocus={() => this.inputFocused("salesTaxPercent")}
                onBlur1={() => this.inputBlurred("salesTaxPercent")}
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
      if(refName === 'salesTaxPercent'){
        this.refs.scrollView.scrollTo({ x: 0, y: salesTaxViewScroll, animated: true })
      }
      if(refName === 'variantTagView'){
          this.refs.scrollView.scrollTo({ x: 0, y: categoriesViewScroll, animated: true })
      }
      if(refName === 'variantQuantity'){
        this.refs.scrollView.scrollTo({ x: 0, y: variantViewScroll, animated: true })
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
      if(refName === 'variantTagView'){
        setTimeout(() => {
          this.refs.scrollView.scrollTo({ x: 0, y: categoriesViewScroll, animated: true })
        }, 100); 
      }
      if(refName === 'salesTaxPercent'){
        setTimeout(() => {
          this.refs.scrollView.scrollTo({ x: 0, y: salesTaxViewScroll, animated: true })
        }, 100); 
      }
      if(refName === 'variantQuantity'){
        setTimeout(() => {
          this.refs.scrollView.scrollTo({ x: 0, y: variantViewScroll, animated: true })
        }, 100); 
      }
      }
  }


  handleTaxPicker(){
    // for (let data of TaxData) {
    //   taxType.push(data['type'])
    // }
    taxType=['PL-VAT','ES-VAT','UK-VAT','MX-Sales Tax','BR-Sales Tax','US-Sales Tax','DE-VAT','AR-VAT','CL-VAT']
    Keyboard.dismiss()
    Picker.hide()
    Picker.init({
      pickerData: taxType,
      pickerTitleText: 'Select Tax',
      pickerConfirmBtnText: 'Done',
      pickerCancelBtnText: 'Cancel',
      selectedValue: [taxType[0].toString().trim()],
      pickerBg: [255, 255, 255, 1],

      onPickerConfirm: data => {
        this.getTaxData(data)
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
  async getTaxData(data) {
    let taxRate = await TaxData.filter(obj => obj.type === data.toString().trim())[0].rate

    this.setState({
      salesTax: taxRate,
      salesTaxType: data

    })
  }

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
        "asOfDate": "12-Jan-2019",
        "requiredShipping": true,
        "taxable": true,
        "taxCode": "CA",
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
      "asOfDate": "12-Jan-2019",
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

