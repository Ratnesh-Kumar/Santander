import React, { Component } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TextInput, ScrollView, Alert } from 'react-native';
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
var globalData = new GlobalData();
var constants = require('../../config/Constants');
var compaignConstants = require('./campaignConstants')
var colorConstant = require('../../config/colorConstant')
import ImagePicker from "react-native-image-picker";
export default class CampaignScreen extends BaseComponent {

  constructor(props) {
    super(props)
    this.state = {
      campaignName: '',
      productDescription: '',
      campaignPriceValue: '',
      campaignSaleValue: '',
      campaignCostValue: '',
      campaignProfitValue: '',
      campaignMarginValue: '',
      campaignSkuValue: '',
      campaignBarcodeValue: '',
      pickedImage: compaignConstants.CAMERA_ICON,
      isBarcodeDisplay: false
    }
  }

  async componentDidMount() {

  }

  // UNSAFE_componentWillUpdate = nextProps => {
  //   this.state.refershData = nextProps.qrcodeData
  //   console.log("################## UNSAFE_componentWillUpdate : " + nextProps.qrcodeData)
  //   if (this.isValidString(nextProps.qrcodeData)) {
  //     // this.setState({
  //     //   campaignBarcodeValue: nextProps.qrcodeData
  //     // })
  //   }
  // }

  UNSAFE_componentWillReceiveProps(props) {
    if (this.isValidString(props.qrcodeData)) {
      this.setState({
        campaignBarcodeValue: props.qrcodeData
      })
    }
  }

  render() {
    return (
      <View style={campaignStyle.container}>
        <Header title={strings('createCampaign.screenTitle')} isCrossIconVisible={false} />
        <View>
          <ScrollView keyboardShouldPersistTaps={'always'} style={campaignStyle.scrollViewStyle}>
            {this.renderCampaignName()}
            {this.createCameraView()}
            {this.renderPriceView()}
            {this.renderCostView()}
            {this.renderSkuAndBarcode()}
            <AppButton isLightTheme={false} buttonText={strings('createCampaign.nextButtonText')} onButtonPressed={() => {
              Actions.createCampaign();
            }} />
          </ScrollView>
        </View>
      </View>
    );
  }

  renderSkuAndBarcode() {
    return (
      <View
        style={[campaignStyle.validFormViewContainer, { marginTop: 0 }]}>
        <View style={campaignStyle.inputWrapper}>
          <View style={campaignStyle.validFormSubView}>
            <TextInputMaterial
              blurText={this.state.campaignSku}
              refsValue={'campaignSku'}
              ref={'campaignSku'}
              label={strings('createCampaign.skuTextInput')}
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
              keyboardType="email-address"
              onSubmitEditing={event => {
                this.refs.campaignBarcdoe.focus();
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
              returnKeyType={'done'}
              autoCorrect={false}
              isLoginScreen={false}
              style={campaignStyle.input}
              placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
              underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
              value={this.state.campaignBarcodeValue}
              textInputName={this.state.campaignBarcodeValue}
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
                returnKeyType={'next'}
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
                keyboardType="number"
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
                  returnKeyType={'next'}
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
                  keyboardType="number"
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
        style={campaignStyle.priceTextInputContainer}>
        <View style={campaignStyle.priceInputWrapper}>
          <View style={[campaignStyle.priceFormSubView, { paddingRight: 15 }]}>
            <TextInputMaterial
              blurText={this.state.campaignPriceValue}
              refsValue={'campaignPrice'}
              ref={'campaignPrice'}
              label={strings('createCampaign.priceTextInput')}
              maxLength={100}
              autoCapitalize={'none'}
              onChangeText={text => { globalData.setPriceCampaign(text); this.setState({ campaignPriceValue: text }) }}
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
              keyboardType={'number-pad'}
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
              label={strings('createCampaign.salePriceTextInput')}
              maxLength={100}
              autoCapitalize={'none'}
              onChangeText={text => { globalData.setSalesPriceCampaign(text); this.setState({ campaignSaleValue: text }) }}
              returnKeyType={'next'}
              autoCorrect={false}
              isLoginScreen={false}
              keyboardType={'number-pad'}
              style={campaignStyle.input}
              placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
              underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
              value={this.state.campaignSaleValue}
              textInputName={this.state.campaignSaleValue}
              // errorText={strings('createCampaign.campaignNameErrorText')}
              underlineHeight={2}
              onSubmitEditing={event => {
                this.refs.campaignCost.focus();
              }}
            />
          </View>
        </View>
      </View>
    )
  }

  pickImageHandler = () => {
    ImagePicker.showImagePicker({ title: "Pick an Image", maxWidth: 800, maxHeight: 600 }, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        this.setState({
          pickedImage: { uri: res.uri }
        });

      }
    });
  }

  createCameraView() {
    return (
      <View style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
        <View style={{ height: 160, borderWidth: 1.2, borderColor: colorConstant.BLACK_COLOR, alignItems: 'center' }}>
          <Image source={this.state.pickedImage} style={{ height: 60, width: 60, marginTop: 20 }} />
          <Text onPress={() => this.pickImageHandler()} style={{ marginTop: 15, fontSize: 16 }}>{strings('createCampaign.uploadImageText')}</Text>

        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 20 }}>{strings('createCampaign.addDescriptionTitle')}</Text>
          <View style={{ backgroundColor: colorConstant.SANT_LIGHT_SKY_BLUE, borderWidth: 1, borderColor: colorConstant.SANT_MEDIUM_SKY_BLUE, height: 80, marginTop: 10 }}>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder={strings('createCampaign.addDescriptionPlaceholder')}
              ref={'campaignDescription'}
              placeholderTextColor={colorConstant.GREY_DARK_COLOR}
              autoCapitalize="none"
              style={{ fontSize: 16, textAlignVertical: 'top', paddingLeft: 10 }}
              multiline={true}
              maxLength={250}
              numberOfLines={3}
              onChangeText={text => { globalData.setdescriptionCampaign(text); this.setState({ productDescription: text }) }}
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

