import React, { Component } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TextInput, ScrollView, Alert, TouchableOpacity, ImageBackground, Keyboard } from 'react-native';
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
import ImagePicker from "react-native-image-picker";
import Stepper from '../../components/Stepper/stepper'
import { fetchCampaignPOST, fetchCampaignGET } from '../../services/FetchData';
import ActivityIndicatorView from '../../components/activityindicator/ActivityIndicator';
import DialogModalView from '../../components/modalcomponent/DialogModal';
var globalData = new GlobalData();
var constants = require('../../config/Constants');
var compaignConstants = require('./campaignConstants')
var colorConstant = require('../../config/colorConstant')
import { RNS3 } from 'react-native-aws3';
var campaignId = "";
var imageFile = {}
var options = {}
var isCampaignUpdate = false;
var descriptionViewScroll = 0;
var priceViewScroll = 0;
var skuBarcodeViewScroll = 0;


export default class CampaignScreen extends BaseComponent {

  constructor(props) {
    super(props)

    this.state = {
      campaignName: '',
      campaignDescription: '',
      campaignPriceValue: '',
      campaignSaleValue: '',
      campaignCostValue: '',
      campaignProfitValue: '',
      campaignMarginValue: '',
      campaignSku: '',
      campaignBarcodeValue: '',
      pickedImage: compaignConstants.CAMERA_ICON,
      isBarcodeDisplay: false,
      showImage: false,
      fetchData: '',
      isActivityIndicatorVisible: false,
      activityIndicatorText: '',
      isDialogModalVisible: false,
      dialogModalText: '',
      dialogModalTitle: '',
      handleKeyboardViewHeight: 0,
    }
    campaignId = props.campaignId;
    isCampaignUpdate = props.isCampaignUpdate ? props.isCampaignUpdate : false;
  }

  async componentDidMount() {
    if (isCampaignUpdate) {
      await this.getCampaignData()
    }
  }

  async getCampaignData() {
    this.renderActivityIndicatorShow();
    let campaignDetailURL = constants.GET_CAMPAIGN_DETAIL.replace(constants.BUISNESS_ID, globalData.getBusinessId()) + campaignId;
    let responseData = await fetchCampaignGET(campaignDetailURL);
    if (this.isValidString(responseData) && this.isValidString(responseData.statusMessage)) {
      if (responseData.statusMessage == constants.SUCCESS_STATUS) {
        let fetchData = responseData.properties[0].value;
        this.setState({ fetchData });
        this.setCampaignDetail(fetchData.products[0]);
        this.setCampaignData(fetchData);
      }
    }
    this.renderActivityIndicatorHide()
  }

  setCampaignData(fetchData) {
    if (this.isValidString(fetchData)) {
      let productItem = fetchData.products[0];

      this.setState({
        campaignName: productItem.productName,
        campaignDescription: productItem.productDescription,
        campaignPriceValue: productItem.defaultDetails.comparePrice + "",
        campaignSaleValue: productItem.defaultDetails.productPrice + "",
        campaignBarcodeValue: productItem.defaultDetails.barCode + "",
        campaignSku: productItem.defaultDetails.sku.toString().trim(),
        pickedImage: (this.isValidString(productItem.defaultDetails.productURL)) ? { uri: productItem.defaultDetails.productURL } : compaignConstants.CAMERA_ICON,
        showImage: (this.isValidString(productItem.defaultDetails.productURL)) ? true: false
      })
    }
  }


  UNSAFE_componentWillReceiveProps(props) {
    if (this.isValidString(props.qrcodeData)) {
      this.setState({
        campaignBarcodeValue: props.qrcodeData
      })
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

  onDragScroll() {
    Keyboard.dismiss();
    this.setState({
      handleKeyboardViewHeight: 0
    })
  }

  render() {
    return (
      <View style={campaignStyle.container}>
        {this.renderModal()}
        <Header title={strings('createCampaign.screenTitle')} isCrossIconVisible={false} />
        <Stepper count={3} currentCount={1} />
        <View style={{flex:1}}>
          <ScrollView 
          ref='scrollView'
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps={'always'} 
          onScrollBeginDrag={() => this.onDragScroll()}
          >
          {/* //style={campaignStyle.scrollViewStyle} */}
            {this.renderCampaignName()}
            {this.createCameraView()}
            {this.renderPriceView()}
            {this.renderSkuAndBarcode()}
            <AppButton isLightTheme={false} buttonText={strings('createCampaign.nextButtonText')} onButtonPressed={() => {
              this.nextButtonTapped()
            }} />
            <View style={{ height: this.state.handleKeyboardViewHeight }}>
            </View>  
          </ScrollView>
        </View>

      </View>
    );
  }

  renderSkuAndBarcode() {
    return (
      <View
      onLayout={event => {
        const layout = event.nativeEvent.layout;
        skuBarcodeViewScroll = layout.y
      }}
        style={[campaignStyle.validFormViewContainer, { marginTop: 10 }]}>
        <View style={campaignStyle.inputWrapper}>
          <View style={campaignStyle.validFormSubView}>
            <TextInputMaterial
              blurText={this.state.campaignSku}
              refsValue={'campaignSku'}
              ref={'campaignSku'}
              label={strings('createCampaign.skuTextInput')}
              onFocus={() => this.inputFocused("campaignSku")}
              onBlur1={() => this.inputBlurred("campaignSku")}
              maxLength={100}
              autoCapitalize={'none'}
              onChangeText={text => this.setState({ campaignSku: text })}
              returnKeyType={'next'}
              autoCorrect={false}
              isLoginScreen={false}
              style={campaignStyle.input}
              placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
              underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
              value={this.state.campaignSku}
              textInputName={this.state.campaignSku}
              // errorText={strings('createCampaign.skuErrorText')}
              underlineHeight={2}
              returnKeyType={(Platform.OS === 'ios') ? 'done' : 'done'}
              keyBoardType={(Platform.OS === 'ios') ? 'number-pad' : 'number'}
              onSubmitEditing={event => {
                Keyboard.dismiss()
                this.setState({
                  handleKeyboardViewHeight: 0
                })
                //this.refs.campaignBarcdoe.focus();
              }}
            />
          </View>
        </View>

        <View style={[campaignStyle.inputWrapper, { marginTop: 20 }]}>
          <View style={campaignStyle.validFormSubView}>
            <TextInputMaterial
              blurText={this.state.campaignBarcodeValue}
              refsValue={'campaignBarcdoe'}
              ref={'campaignBarcdoe'}
              label={strings('createCampaign.barcodeTextInput')}
              maxLength={100}
              autoCapitalize={'none'}
              onChangeText={text => this.setState({ campaignBarcodeValue: text })}
              autoCorrect={false}
              isLoginScreen={false}
              style={campaignStyle.input}
              placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
              underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
              value={this.state.campaignBarcodeValue}
              textInputName={this.state.campaignBarcodeValue}
              // errorText={strings('createCampaign.campaignNameErrorText')}
              underlineHeight={2}
              returnKeyType={(Platform.OS === 'ios') ? 'done' : 'done'}
              keyBoardType={(Platform.OS === 'ios') ? 'number-pad' : 'number'}
              editable={false}
              isBarcodeDisplay={true}
              onBarcodeTapped={() => { Actions.qrCode({ title: "Barcode Scanner" }) }}
              onSubmitEditing={event => {
                Keyboard.dismiss()
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
          <View style={campaignStyle.inputWrapper}>
            <View style={campaignStyle.validFormSubView}>
              <TextInputMaterial
                blurText={this.state.campaignCostValue}
                refsValue={'campaignCost'}
                ref={'campaignCost'}
                label={strings('createCampaign.costTextInput')}
                maxLength={100}
                autoCapitalize={'none'}
                onChangeText={text => this.setState({ campaignCostValue: text })}
                backgroundColor={colorConstant.GRAY_LIGHT_COLOR}
                autoCorrect={false}
                isLoginScreen={false}
                style={{ backgroundColor: colorConstant.GRAY_LIGHT_COLOR }}
                placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                value={this.state.campaignCostValue}
                textInputName={this.state.campaignCostValue}
                // errorText={strings('createCampaign.campaignNameErrorText')}
                underlineHeight={2}
                returnKeyType={(Platform.OS === 'ios') ? 'done' : 'done'}
                keyBoardType={(Platform.OS === 'ios') ? 'number-pad' : 'number'}
                onSubmitEditing={event => {
                  this.refs.campaignProfit.focus();
                }}
              />
            </View>
          </View>
          <View
            style={{ flexDirection: 'row', marginTop: 20 }}>
            <View style={campaignStyle.priceInputWrapper}>
              <View style={[campaignStyle.priceFormSubView, { paddingRight: 15 }]}>
                <TextInputMaterial
                  blurText={this.state.campaignProfitValue}
                  refsValue={'campaignProfit'}
                  ref={'campaignProfit'}
                  label={strings('createCampaign.profitTextInput')}
                  maxLength={100}
                  autoCapitalize={'none'}
                  onChangeText={text => this.setState({ campaignProfitValue: text })}
                  backgroundColor={colorConstant.GRAY_LIGHT_COLOR}
                  autoCorrect={false}
                  isLoginScreen={false}
                  style={campaignStyle.input}
                  placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                  underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                  value={this.state.campaignProfitValue}
                  textInputName={this.state.campaignProfitValue}
                  // errorText={strings('createCampaign.priceErrorText')}
                  underlineHeight={2}
                  returnKeyType={(Platform.OS === 'ios') ? 'done' : 'done'}
                  keyBoardType={(Platform.OS === 'ios') ? 'number-pad' : 'number'}
                  onSubmitEditing={event => {
                    this.refs.campaignMargin.focus();
                  }}
                />
              </View>
            </View>
            <View style={campaignStyle.priceInputWrapper}>
              <View style={[campaignStyle.priceFormSubView, { paddingLeft: 15 }]}>
                <TextInputMaterial
                  blurText={this.state.campaignMarginValue}
                  refsValue={'campaignMargin'}
                  ref={'campaignMargin'}
                  label={strings('createCampaign.marginTextInput')}
                  maxLength={100}
                  autoCapitalize={'none'}
                  onChangeText={text => this.setState({ campaignMarginValue: text })}
                  returnKeyType={'next'}
                  backgroundColor={colorConstant.GRAY_LIGHT_COLOR}
                  autoCorrect={false}
                  isLoginScreen={false}
                  style={campaignStyle.input}
                  placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                  underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                  value={this.state.campaignMarginValue}
                  textInputName={this.state.campaignMarginValue}
                  // errorText={strings('createCampaign.campaignNameErrorText')}
                  underlineHeight={2}
                  keyboardType="email-address"
                  onSubmitEditing={event => {
                    this.refs.campaignSku.focus();
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
      onLayout={event => {
        const layout = event.nativeEvent.layout;
        priceViewScroll = layout.y
      }}
        style={campaignStyle.priceTextInputContainer}>
        <View style={campaignStyle.priceInputWrapper}>
          <View style={[campaignStyle.priceFormSubView, { paddingRight: 15 }]}>
            <TextInputMaterial
              blurText={this.state.campaignPriceValue}
              refsValue={'campaignPrice'}
              ref={'campaignPrice'}
              onFocus={() => this.inputFocused("campaignPrice")}
              onBlur1={() => this.inputBlurred("campaignPrice")}
              label={strings('createCampaign.priceTextInput')}
              maxLength={100}
              autoCapitalize={'none'}
              onChangeText={text => { globalData.setPriceCampaign(text); this.setState({ campaignPriceValue: text }) }}
              autoCorrect={false}
              isLoginScreen={false}
              style={campaignStyle.input}
              placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
              underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
              value={this.state.campaignPriceValue}
              textInputName={this.state.campaignPriceValue}
              // errorText={strings('createCampaign.priceErrorText')}
              underlineHeight={2}
              returnKeyType={(Platform.OS === 'ios') ? 'done' : 'next'}
              keyBoardType={'decimal-pad'}
              onSubmitEditing={event => {
                this.refs.campaignSalePrice.focus();
              }}
            />
          </View>
        </View>
        <View style={campaignStyle.priceInputWrapper}>
          <View style={[campaignStyle.priceFormSubView, { paddingLeft: 15 }]}>
            <TextInputMaterial
              blurText={this.state.campaignSaleValue}
              refsValue={'campaignSalePrice'}
              ref={'campaignSalePrice'}
              onFocus={() => this.inputFocused("campaignSalePrice")}
              onBlur1={() => this.inputBlurred("campaignSalePrice")}
              label={strings('createCampaign.salePriceTextInput')}
              maxLength={100}
              autoCapitalize={'none'}
              onChangeText={text => { globalData.setSalesPriceCampaign(text); this.setState({ campaignSaleValue: text }) }}
              autoCorrect={false}
              isLoginScreen={false}
              returnKeyType={(Platform.OS === 'ios') ? 'done' : 'next'}
              keyBoardType={'decimal-pad'}
              style={campaignStyle.input}
              placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
              underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
              value={this.state.campaignSaleValue}
              textInputName={this.state.campaignSaleValue}
              // errorText={strings('createCampaign.campaignNameErrorText')}
              underlineHeight={2}
              onSubmitEditing={event => {
                this.refs.campaignSku.focus();
              }}
            />
          </View>
        </View>
      </View>
    )
  }

  inputBlurred(refName) {
    console.log('######### descriptionViewScroll ::: inputBlurred',descriptionViewScroll);
    console.log('######### priceViewScroll inputBlurred :: ',priceViewScroll)
    console.log('######### skuBarcodeViewScroll inputBlurred :: ',skuBarcodeViewScroll)
    if (this.refs.scrollView !== null && this.refs.scrollView !== undefined) {
      if(refName == 'campaignDescription'){
          this.refs.scrollView.scrollTo({ x: 0, y: descriptionViewScroll, animated: true })
      }
      if(refName == 'campaignSalePrice' || refName == 'campaignPrice'){
          this.refs.scrollView.scrollTo({ x: 0, y: priceViewScroll, animated: true })
      }
      if(refName == 'campaignSku'){
        if (Platform.OS === 'ios') {
          this.setState({
            handleKeyboardViewHeight: 0
          })
        }
        this.refs.scrollView.scrollTo({ x: 0, y: skuBarcodeViewScroll, animated: true })
      }
    }
  }
  inputFocused(refName) {
    console.log('######### descriptionViewScroll ::: inputFocused',descriptionViewScroll);
    console.log('######### priceViewScroll inputFocused :: ',priceViewScroll)
    console.log('######### skuBarcodeViewScroll inputFocused :: ',skuBarcodeViewScroll)
    if (this.refs.scrollView !== null && this.refs.scrollView !== undefined) {
      if (Platform.OS === 'ios') {
        this.setState({
          handleKeyboardViewHeight: 200
        })
      }
      if(refName == 'campaignDescription'){
        setTimeout(() => {
          this.refs.scrollView.scrollTo({ x: 0, y: descriptionViewScroll, animated: true })
        }, 100); 
      }
      if(refName == 'campaignSalePrice' || refName == 'campaignPrice'){
        setTimeout(() => {
          this.refs.scrollView.scrollTo({ x: 0, y: priceViewScroll, animated: true })
        }, 100); 
      }
      if(refName == 'campaignSku'){
        setTimeout(() => {
          this.refs.scrollView.scrollTo({ x: 0, y: skuBarcodeViewScroll, animated: true })
        }, 100); 
      }
          
           
      }
  }

  initializeOptions() {
    options.keyPrefix = compaignConstants.S3_UPLOAD_FOLDER;
    options.bucket = globalData.getS3BucketName();
    options.region = globalData.getS3RegionName();
    options.accessKey = globalData.getS3AccessKey();
    options.secretKey = globalData.getS3SecretKey();
    options.successActionStatus = compaignConstants.S3_SUCCESS_ACTION_STATUS;
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
            globalData.setImagePathCampaign(response.body.postResponse.location);
          }
        });
      }
    });
  }

  showPickedImage() {
    return (
      <TouchableOpacity onPress={() => this.pickImageHandler()} style={{ alignItems: 'center' }}>
        <Image source={this.state.pickedImage} style={{ height: 60, width: 60, marginTop: 20 }} />
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
              <Image source={compaignConstants.EDIT_ICON} style={{
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
      <View 
        onLayout={event => {
          const layout = event.nativeEvent.layout;
          descriptionViewScroll = layout.y
        }}
      style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
        <View style={{ height: 160, borderWidth: 1.2, borderColor: colorConstant.BLACK_COLOR, }}>
          {this.state.showImage === true ? this.renderImage() : this.showPickedImage()}
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 20 }}>{strings('createCampaign.addDescriptionTitle')}</Text>
          <View style={{ backgroundColor: colorConstant.SANT_LIGHT_SKY_BLUE, borderWidth: 1, borderColor: colorConstant.SANT_MEDIUM_SKY_BLUE, height: 80, marginTop: 10 }}>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder={strings('createCampaign.addDescriptionPlaceholder')}
              ref={'campaignDescription'}
              onFocus={() => this.inputFocused("campaignDescription")}
              onBlur={() => this.inputBlurred("campaignDescription")}
              placeholderTextColor={colorConstant.GREY_DARK_COLOR}
              autoCapitalize="none"
              style={{ fontSize: 16, textAlignVertical: 'top', paddingLeft: 10 }}
              multiline={true}
              maxLength={250}
              numberOfLines={3}
              value={this.state.campaignDescription}
              onChangeText={text => { globalData.setdescriptionCampaign(text); this.setState({ campaignDescription: text }) }}
              onSubmitEditing={event => {
                this.refs.campaignPrice.focus();
              }}
            />
          </View>
        </View>
      </View>
    );
  }


  renderCampaignName() {
    return (
      <View
        style={campaignStyle.validFormViewContainer}>
        <View style={campaignStyle.inputWrapper}>
          <View style={campaignStyle.validFormSubView}>
            <TextInputMaterial
              blurText={this.state.campaignName}
              isMandatory={true}
              refsValue={'campaignName'}
              ref={'campaignName'}
              label={strings('createCampaign.campaignTextInput')}
              maxLength={100}
              autoCapitalize={'none'}
              onChangeText={text => { globalData.setTitleCampaign(text); this.setState({ campaignName: text }) }}
              returnKeyType={'next'}
              autoCorrect={false}
              isLoginScreen={false}
              style={campaignStyle.input}
              placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
              underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
              value={this.state.campaignName}
              textInputName={this.state.campaignName}
              errorText={strings('createCampaign.campaignNameErrorText')}
              underlineHeight={2}
              keyboardType="email-address"
              onSubmitEditing={event => {
                this.refs.campaignDescription.focus();
              }}
            />
          </View>
        </View>
      </View>
    );
  }

  nextButtonTapped() {
    if (this.isValidString(this.state.campaignName)) {
      let campaignDetails = {
        "campaignName": this.state.campaignName,
        "campaignDescription": this.state.campaignDescription,
        "campaignPrice": this.state.campaignPriceValue,
        "campaignSalePrice": this.state.campaignSaleValue,
        "camapignbarcode": this.state.camapignbarcode,
        "campaignskuNumber": this.state.campaignSku,
        "productImage": imageFile.name,
        "productURL": globalData.getImagePathCampaign()
      }
      Actions.createCampaign({ campaignDetails: campaignDetails, isCampaignUpdate: isCampaignUpdate, campaignId: campaignId });
    } else {
      Alert.alert(
        'Info',
        'Please provide valid campaign title.',
        [
          { text: 'OK' },
        ]
      );
    }
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

