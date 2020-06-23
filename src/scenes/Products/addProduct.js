import React, { Component } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, Image, TextInput, ScrollView, Alert, TouchableOpacity, Keyboard, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';
import productStyle from './productStyle';
import { strings } from '../../i18next/i18n';
import * as RNLocalize from "react-native-localize";
// import {RNFirebase, firestore} from 'react-native-firebase';
import GlobalData from '../../utils/GlobalData';
import BaseComponent from '../../BaseComponent';
import TextInputMaterial from '../../components/textInputMaterial';
import AppButton from '../../components/AppButton'
import Stepper from '../../components/Stepper/stepper'
var globalData = new GlobalData();
var constants = require('../../config/Constants');
var productConstants = require('./productConstants')
var colorConstant = require('../../config/colorConstant')
import SwitchTextInput from '../../components/SwitchTextInput';
import ImagePicker from "react-native-image-picker";
import { fetchProductGET } from '../../services/FetchData';
import ActivityIndicatorView from '../../components/activityindicator/ActivityIndicator';
import DialogModalView from '../../components/modalcomponent/DialogModal';
import { RNS3 } from 'react-native-aws3';
import Picker from 'react-native-picker';
var isUpdate = "";
var itemId = "";
var imageFile = {}
var options = {}
var productInfo = "";
var weightType = [];
export default class AddProductScreen extends BaseComponent {

  constructor(props) {
    super(props)
    this.state = {
      productName: '',
      productDescription: '',
      productPriceValue: '',
      productSaleValue: '',
      productCostValue: '',
      productProfitValue: '',
      productMarginValue: '',
      productSkuValue: '',
      productBarcodeValue: '',
      pickedImage: productConstants.CAMERA_ICON,
      isBarcodeDisplay: false,
      showImage: false,
      productWeight: '',
      fetchData: '',
      isActivityIndicatorVisible: false,
      activityIndicatorText: '',
      isDialogModalVisible: false,
      dialogModalText: '',
      dialogModalTitle: '',
      weightUnit: ''

    }
    itemId = props.itemId;
    isUpdate = props.isUpdate ? props.isUpdate : false;
  }

  componentDidMount() {
    if (isUpdate) {
      this.getProductData();
    }
  }

  async getProductData() {
    this.renderActivityIndicatorShow();
    let productDetailURL = constants.GET_PRODUCT_DETAIL.replace(constants.PRODUCT_ID, itemId) + globalData.getBusinessId();
    let responseData = await fetchProductGET(productDetailURL);
    if (this.isValidString(responseData) && this.isValidString(responseData.statusMessage)) {
      if (responseData.statusMessage == constants.SUCCESS_STATUS) {
        let fetchData = responseData.properties[0].value;
        this.setState({ fetchData });
        this.setProductDetail(fetchData);
        this.setProductData(this.state.fetchData);
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

  setProductData(fetchData) {
    let productUrl = '';
    if (this.isValidString(fetchData)) {

      if (this.isValidString(fetchData.defaultDetails)) {
        productUrl = fetchData.defaultDetails.productURL
      }
      this.setState({
        productName: fetchData.productName,
        productDescription: fetchData.productDescription,
        productPriceValue: fetchData.defaultDetails.comparePrice + "",
        productSaleValue: fetchData.defaultDetails.productPrice + "",
        productWeight: fetchData.defaultDetails.weight + "",
        productBarcodeValue: fetchData.defaultDetails.barCode + "",
        productCostValue: fetchData.defaultDetails.productCost + "",
        productSkuValue: fetchData.defaultDetails.sku,
        pickedImage: (this.isValidString(productUrl)) ? { uri: productUrl } : productConstants.CAMERA_ICON,
        showImage: (this.isValidString(productUrl)) ? true : false
      })
    }
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (this.isValidString(props.qrcodeData)) {
      this.setState({
        productBarcodeValue: props.qrcodeData
      })
    }
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

  render() {
    return (
      <KeyboardAvoidingView style={productStyle.container} behavior="padding" keyboardVerticalOffset={0}>
        {this.renderModal()}
        <Header title={strings('productScreen.addProduct')} isCrossIconVisible={false} />
        <Stepper count={2} currentCount={1} />
        <View>
          <ScrollView ref='scrollView' keyboardShouldPersistTaps={'always'} style={productStyle.scrollViewStyle}>
            {this.renderProductName()}
            {this.createCameraView()}
            {this.renderPriceView()}
            {this.renderCostView()}
            {this.renderSkuAndBarcode()}
            {this.renderWeighView()}
            <AppButton isLightTheme={false} buttonText={strings('createCampaign.nextButtonText')} onButtonPressed={() => {
              this.handleAddProduct(isUpdate)
            }} />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }
  // handleUpdateProduct() {
  //   if (this.isValidString(this.state.productName)) {
  //     let productDetails = {
  //       "productName": this.state.productName,
  //       "productDescription": this.state.productDescription,
  //       "productPrice": this.state.productPriceValue,
  //       "barcode": this.state.productBarcodeValue,
  //       "skuNumber": this.state.productSkuValue,
  //       "weight": this.state.productWeight,
  //       "weightUnit": "lb"
  //     }

  //     Actions.addProductCategory({ productDetails: productDetails, isUpdate: true });
  //   }
  //   else {
  //     this.showAlert();
  //   }

  // }

  handleAddProduct(isUpdate) {
    if (this.isValidString(this.state.productName)) {
      let productDetails = {
        "productName": this.state.productName,
        "productDescription": this.state.productDescription,
        "productPrice": this.state.productPriceValue,
        "productSalePrice": this.state.productSaleValue,
        "productCost": this.state.productCostValue,
        "barcode": this.state.productBarcodeValue,
        "skuNumber": this.state.productSkuValue,
        "weight": this.state.productWeight,
        "weightUnit": this.state.weightUnit,
        "productImage": imageFile.name,
        "productURL": globalData.getImagePathProduct()
      }

      Actions.addProductCategory({ productDetails: productDetails, isUpdate: isUpdate, productId: itemId });
    } else {
      this.showAlert();
    }
  }
  showAlert() {
    Alert.alert(
      'Info',
      'Please provide valid product name.',
      [
        { text: 'OK' },
      ]
    );
  }


  renderWeighView() {
    let weightTitle = this.state.weightUnit == '' ? strings('productScreen.productWeightText') : this.state.weightUnit
    return (
      <View>
        <View style={{ paddingTop: 20, paddingLeft: 20 }}>
          <Text style={{ fontSize: 20 }}>{strings('productScreen.weightTitle')}</Text>
        </View>
        <View
          style={productStyle.priceTextInputContainer}>
          <View style={productStyle.priceInputWrapper}>
            <View style={[productStyle.priceFormSubView, { paddingRight: 15 }]}>
              <View
                style={productStyle.containerStyleWithBorder}>
                <Text style={{ paddingLeft: 10, paddingRight: 70, textAlign: 'left', marginTop: 20, fontSize: 16 }}>
                  {weightTitle}</Text>
                <View
                  style={{ position: 'absolute', right: 10, top: 10 }}>
                  <TouchableOpacity onPress={() => this.renderWeightPicker()}>
                    <Image
                      style={{ width: 35, height: 35, tintColor: colorConstant.GREY_DARK_COLOR }}
                      source={require('../.././public/images/dropDown.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={productStyle.priceInputWrapper}>
            <View style={[productStyle.priceFormSubView, { paddingLeft: 15 }]}>
              <TextInputMaterial
                blurText={this.state.productWeight}
                refsValue={'productWeight'}
                ref={'productWeight'}
                label={strings('productScreen.productWeightInputText')}
                maxLength={100}
                autoCapitalize={'none'}
                onChangeText={text => { this.setState({ productWeight: text }) }}
                autoCorrect={false}
                isLoginScreen={false}
                returnKeyType={(Platform.OS === 'ios') ? 'done' : 'done'}
                keyBoardType={(Platform.OS === 'ios') ? 'number-pad' : 'number'}
                style={productStyle.input}
                placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                value={this.state.productWeight}
                textInputName={this.state.productWeight}
                // errorText={strings('createCampaign.campaignNameErrorText')}
                underlineHeight={2}
                onSubmitEditing={event => {
                  Keyboard.dismiss()
                  //this.refs.productCost.focus();
                }}
              />
            </View>
          </View>
        </View>
      </View>
    )

  }

  renderSkuAndBarcode() {
    return (
      <View
        style={[productStyle.validFormViewContainer, { marginTop: 0 }]}>
        <View style={productStyle.inputWrapper}>
          <View style={productStyle.validFormSubView}>
            <TextInputMaterial
              blurText={this.state.productSkuValue}
              refsValue={'productSkuValue'}
              ref={'productSkuValue'}
              label={strings('createCampaign.skuTextInput')}
              maxLength={100}
              autoCapitalize={'none'}
              onChangeText={text => this.setState({ productSkuValue: text })}
              returnKeyType={'next'}
              autoCorrect={false}
              isLoginScreen={false}
              style={productStyle.input}
              placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
              underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
              value={this.state.productSkuValue}
              textInputName={this.state.productSkuValue}
              // errorText={strings('createCampaign.skuErrorText')}
              underlineHeight={2}
              keyboardType="email-address"
              onSubmitEditing={event => {
                this.refs.productWeight.focus();
              }}
            />
          </View>
        </View>

        <View style={[productStyle.inputWrapper, { marginTop: 20 }]}>
          <View style={productStyle.validFormSubView}>
            <TextInputMaterial
              blurText={this.state.productBarcodeValue}
              refsValue={'productBarcdoe'}
              ref={'productBarcdoe'}
              label={strings('createCampaign.barcodeTextInput')}
              maxLength={100}
              autoCapitalize={'none'}
              onChangeText={text => this.setState({ productBarcodeValue: text })}
              returnKeyType={'done'}
              autoCorrect={false}
              isLoginScreen={false}
              style={productStyle.input}
              placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
              underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
              value={this.state.productBarcodeValue}
              textInputName={this.state.productBarcodeValue}
              // errorText={strings('createCampaign.campaignNameErrorText')}
              underlineHeight={2}
              keyboardType="email-address"
              editable={false}
              isBarcodeDisplay={true}
              onBarcodeTapped={() => { Actions.qrCode({ title: "Barcode Scanner" }) }}
              onSubmitEditing={event => {
              }}
            />
          </View>
        </View>
      </View>
    );
  }

  renderCostView() {
    return (
      <View style={{ marginTop: 20, marginBottom: 10 }}>
        <View style={{ paddingTop: 10, paddingBottom: 20, paddingLeft: 10, paddingRight: 10, backgroundColor: colorConstant.GRAY_LIGHT_COLOR }}>
          <View style={productStyle.inputWrapper}>
            <View style={productStyle.validFormSubView}>
              <TextInputMaterial
                blurText={this.state.productCostValue}
                refsValue={'productCost'}
                ref={'productCost'}
                label={strings('createCampaign.costTextInput')}
                maxLength={100}
                autoCapitalize={'none'}
                onChangeText={text => this.setState({ productCostValue: text })}
                returnKeyType={'next'}
                backgroundColor={colorConstant.GRAY_LIGHT_COLOR}
                autoCorrect={false}
                isLoginScreen={false}
                onBlur1={()=>{
                  this.handleCostMarginProfit(this.state.productSaleValue, true, false, false)
                }}
                style={{ backgroundColor: colorConstant.GRAY_LIGHT_COLOR }}
                placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                value={this.isValidString(this.state.productCostValue)? this.state.productCostValue: ""}
                textInputName={this.state.productCostValue}
                // errorText={strings('createCampaign.campaignNameErrorText')}
                underlineHeight={2}
                returnKeyType={(Platform.OS === 'ios') ? 'done' : 'next'}
                keyBoardType={(Platform.OS === 'ios') ? 'number-pad' : 'number'}
                onSubmitEditing={event => {
                  this.refs.productProfit.focus();
                }}
              />
            </View>
          </View>
          <View
            style={{ flexDirection: 'row', marginTop: 20 }}>
            <View style={productStyle.priceInputWrapper}>
              <View style={[productStyle.priceFormSubView, { paddingRight: 15 }]}>
                <TextInputMaterial
                  blurText={this.state.productProfitValue}
                  refsValue={'productProfit'}
                  ref={'productProfit'}
                  label={strings('createCampaign.profitTextInput')}
                  maxLength={100}
                  autoCapitalize={'none'}
                  onChangeText={text => this.setState({ productProfitValue: text })}
                  backgroundColor={colorConstant.GRAY_LIGHT_COLOR}
                  onBlur1={()=>{
                    this.handleCostMarginProfit(this.state.productSaleValue, false, true, false)
                  }}
                  autoCorrect={false}
                  isLoginScreen={false}
                  style={productStyle.input}
                  placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                  underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                  value={this.isValidString(this.state.productProfitValue)? this.state.productProfitValue: ""}
                  textInputName={this.state.productProfitValue}
                  // errorText={strings('createCampaign.priceErrorText')}
                  underlineHeight={2}
                  returnKeyType={(Platform.OS === 'ios') ? 'done' : 'next'}
                  keyBoardType={(Platform.OS === 'ios') ? 'number-pad' : 'number'}
                  onSubmitEditing={event => {
                    this.refs.productMargin.focus();
                  }}
                />
              </View>
            </View>
            <View style={productStyle.priceInputWrapper}>
              <View style={[productStyle.priceFormSubView, { paddingLeft: 15 }]}>
                <TextInputMaterial
                  blurText={this.state.productMarginValue}
                  refsValue={'productMargin'}
                  ref={'productMargin'}
                  label={strings('createCampaign.marginTextInput')}
                  maxLength={100}
                  autoCapitalize={'none'}
                  onChangeText={text => {
                    this.setState({ productMarginValue: text })
                  }}
                  onBlur1={()=>{
                    this.handleCostMarginProfit(this.state.productSaleValue, false, false, true)
                  }}
                  returnKeyType={'next'}
                  backgroundColor={colorConstant.GRAY_LIGHT_COLOR}
                  autoCorrect={false}
                  isLoginScreen={false}
                  style={productStyle.input}
                  placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                  underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                  value={this.isValidString(this.state.productMarginValue)? this.state.productMarginValue: ""}
                  textInputName={this.state.productMarginValue}
                  // errorText={strings('createCampaign.campaignNameErrorText')}
                  underlineHeight={2}
                  returnKeyType={(Platform.OS === 'ios') ? 'done' : 'done'}
                  keyBoardType={(Platform.OS === 'ios') ? 'number-pad' : 'number'}
                  onSubmitEditing={event => {
                    this.refs.productSkuValue.focus();
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }

  renderPriceView() {
    return (
      <View
        style={productStyle.priceTextInputContainer}>
        <View style={productStyle.priceInputWrapper}>
          <View style={[productStyle.priceFormSubView, { paddingRight: 15 }]}>
            <TextInputMaterial
              blurText={this.state.productPriceValue}
              refsValue={'productPrice'}
              ref={'productPrice'}
              label={strings('createCampaign.priceTextInput')}
              maxLength={100}
              autoCapitalize={'none'}
              onChangeText={text => { this.setState({ productPriceValue: text }) }}
              autoCorrect={false}
              isLoginScreen={false}
              style={productStyle.input}
              placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
              underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
              value={this.state.productPriceValue}
              textInputName={this.state.productPriceValue}
              // errorText={strings('createCampaign.priceErrorText')}
              underlineHeight={2}
              returnKeyType={(Platform.OS === 'ios') ? 'done' : 'next'}
              keyBoardType={'decimal-pad'}
              onSubmitEditing={event => {
                this.refs.productSalePrice.focus();
              }}
            />
          </View>
        </View>
        <View style={productStyle.priceInputWrapper}>
          <View style={[productStyle.priceFormSubView, { paddingLeft: 15 }]}>
            <TextInputMaterial
              blurText={this.state.productSaleValue}
              refsValue={'productSalePrice'}
              ref={'productSalePrice'}
              label={strings('createCampaign.salePriceTextInput')}
              maxLength={100}
              autoCapitalize={'none'}
              onChangeText={text => {
                console.log("########### text : " + text)
                this.setState({ productSaleValue: text })
                this.handleCostMarginProfit(text, false, false, false)
              }}
              autoCorrect={false}
              isLoginScreen={false}
              returnKeyType={(Platform.OS === 'ios') ? 'done' : 'next'}
              keyBoardType={'decimal-pad'}
              style={productStyle.input}
              placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
              underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
              value={this.state.productSaleValue}
              textInputName={this.state.productSaleValue}
              // errorText={strings('createCampaign.campaignNameErrorText')}
              underlineHeight={2}
              onSubmitEditing={event => {
                this.refs.productCost.focus();
              }}
            />
          </View>
        </View>
      </View>
    )
  }
  initializeOptions() {
    options.keyPrefix = productConstants.S3_UPLOAD_FOLDER;
    options.bucket = globalData.getS3BucketName();
    options.region = globalData.getS3RegionName();
    options.accessKey = globalData.getS3AccessKey();
    options.secretKey = globalData.getS3SecretKey();
    options.successActionStatus = productConstants.S3_SUCCESS_ACTION_STATUS;
  }
  pickImageHandler = () => {
    this.initializeOptions();
    ImagePicker.showImagePicker({ title: "Pick an Image", maxWidth: 800, maxHeight: 600 }, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        this.setState({
          pickedImage: { uri: res.uri },
          showImage: true
        });
        imageFile.uri = res.uri;
        imageFile.name = res.uri.replace(/^.*[\\\/]/, '');
        imageFile.type = (res.uri.split('.').pop() === 'png') ? "image/png" : "image/jpg";
        RNS3.put(imageFile, options).then(response => {
          if (response.status !== 201) {
            console.log("Failed to upload image to S3");
          }
          else {
            console.log("imagePath1 ##### - " + response.body.postResponse.location)
            globalData.setImagePathProduct(response.body.postResponse.location);
            console.log("image name  " + imageFile.name)
            console.log("image path globalData  " + globalData.getImagePathProduct())

          }
        });
      }
    });
  }

  showPickedImage() {
    return (
      <TouchableOpacity onPress={() => this.pickImageHandler()} style={{ alignItems: 'center' }}>
        <Image source={this.state.pickedImage ? this.state.pickedImage : null} style={{ height: 60, width: 60, marginTop: 20 }} />
        <Text style={{ marginTop: 15, fontSize: 16 }}>{strings('createCampaign.uploadImageText')}</Text>
      </TouchableOpacity>
    )
  }
  renderImage() {
    return (
      <View >
        <ImageBackground source={this.state.pickedImage} style={{ width: "100%", height: "100%" }} >
          <View style={{ paddingTop: 10, paddingRight: 20, flexDirection: 'row-reverse', }}>
            <TouchableOpacity style={{ height: 40, width: 40, borderRadius: 80, backgroundColor: '#ffffff', alignItems: 'center', opacity: 0.6, marginRight: 10 }} onPress={() => this.pickImageHandler()}>
              <Image source={productConstants.EDIT_ICON} style={{
                width: 25,
                height: 25,
                marginTop: 5,
                opacity: 1
              }} ></Image>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

    )
  }

  createCameraView() {
    return (
      <View style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
        <View style={{ height: 160, borderWidth: 1.2, borderColor: colorConstant.BLACK_COLOR, }}>
          {(this.state.showImage) ? this.renderImage() : this.showPickedImage()}
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 20 }}>{strings('createCampaign.addDescriptionTitle')}</Text>
          <View style={{ backgroundColor: colorConstant.SANT_LIGHT_SKY_BLUE, borderWidth: 1, borderColor: colorConstant.SANT_MEDIUM_SKY_BLUE, height: 80, marginTop: 10 }}>
            <TextInput
              value={this.state.productDescription}
              underlineColorAndroid="transparent"
              placeholder={strings('createCampaign.addDescriptionPlaceholder')}
              ref={'productDescription'}
              placeholderTextColor={colorConstant.GREY_DARK_COLOR}
              autoCapitalize="none"
              style={{ fontSize: 16, textAlignVertical: 'top', paddingLeft: 10 }}
              multiline={true}
              maxLength={250}
              returnKeyType={'next'}
              numberOfLines={3}
              onChangeText={text => { this.setState({ productDescription: text }) }}
              onSubmitEditing={event => {
                this.refs.productPrice.focus();
              }}
            />
          </View>
        </View>
      </View>
    );
  }


  renderProductName() {
    return (
      <View
        style={productStyle.validFormViewContainer}>
        <View style={productStyle.inputWrapper}>
          <View style={productStyle.validFormSubView}>
            <TextInputMaterial
              blurText={this.state.productName}
              isMandatory={true}
              refsValue={'productName'}
              ref={'productName'}
              label={strings('createCampaign.campaignTextInput')}
              maxLength={100}
              autoCapitalize={'none'}
              onChangeText={text => { globalData.setTitleCampaign(text); this.setState({ productName: text }) }}
              returnKeyType={'next'}
              autoCorrect={false}
              isLoginScreen={false}
              style={productStyle.input}
              placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
              underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
              value={this.state.productName}
              textInputName={this.state.productName}
              errorText={strings('createCampaign.campaignNameErrorText')}
              underlineHeight={2}
              keyboardType="email-address"
              onSubmitEditing={event => {
                this.refs.productDescription.focus();
              }}
            />
          </View>
        </View>
      </View>
    );
  }

  handleCostMarginProfit(salePrice, isCostHandle, isProfitHandle, isMarginHandle) {
    var productCost = 0;
    var productMargin = 0;
    var productProfit = 0;
    if (isCostHandle) {
      productCost = this.state.productCostValue;
      productMargin = Math.floor(this.getMargin(salePrice, this.state.productCostValue));
      productProfit = Math.floor(this.getProfit(salePrice, this.state.productCostValue))
    } else if (isProfitHandle) {
      productCost = salePrice - this.state.productProfitValue;
      productMargin = Math.floor(this.getMargin(salePrice, productCost));
      productProfit = this.state.productProfitValue
    } else if (isMarginHandle) {
      productCost = Math.floor(this.getCostFromProfitMargin(salePrice, this.state.productMarginValue));
      productMargin = this.state.productMarginValue
      productProfit = Math.floor(this.getProfit(salePrice, productCost))
    } else {
      productCost = Math.floor(this.getCostFromProfitMargin(salePrice, 50));
      productMargin = Math.floor(this.getMargin(salePrice, productCost));
      productProfit = Math.floor(this.getProfit(salePrice, productCost))
    }
    // console.log("##################### productCost 1: " + productCost)
    // console.log("##################### productMargin 2: " + productMargin)
    // console.log("##################### productProfit 3: " + productProfit)
    this.setState({
      productCostValue: productCost + "",
      productMarginValue: productMargin + "",
      productProfitValue: productProfit + ""
    })
  }

  getCostFromProfitMargin(salePrice, margin) {
    return ((100 - margin) * salePrice) / 100
  }

  getProfit(salePrice, cost) {
    return (salePrice - cost)
  }

  getMargin(salePrice, cost) {
    if(this.isValidString(salePrice)){
      return ((salePrice - cost) / salePrice) * 100
    }
    return 0;
  }


  renderWeightPicker() {
    Keyboard.dismiss();
    Picker.hide();
    weightType = ['kg', 'lb', 'oz', 'gram']
    Picker.init({
      pickerData: weightType,
      pickerTitleText: 'Select Weight Unit',
      pickerConfirmBtnText: 'Done',
      pickerCancelBtnText: 'Cancel',
      selectedValue: [weightType[0].toString().trim()],
      pickerBg: [255, 255, 255, 1],

      onPickerConfirm: data => {
        this.setState({
          weightUnit: data
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




  async googleSignOut() {
    this.googleConfiguration();
    await this.signOut();
    Actions.login();
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

