import React, { Component } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';
import productStyle from './productStyle';
import { strings } from '../../i18next/i18n';
import * as RNLocalize from "react-native-localize";
// import {RNFirebase, firestore} from 'react-native-firebase';
import GlobalData from '../../utils/GlobalData';
import BaseComponent from '../../BaseComponent';
import TextInputMaterial from '../../components/textInputMaterial';
import AddProductCategory from './addProductCategory';
import AppButton from '../../components/AppButton';
var globalData = new GlobalData();
var constants = require('../../config/Constants');
var productConstants = require('./productConstants')
var colorConstant = require('../../config/colorConstant')
var variantDetails = "";
export default class ProductVarientDetailScreen extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
      varientPriceValue: (this.isValidString(props.variantDetail)) ? (this.isValidString(props.variantDetail.price) ? props.variantDetail.price.toString() : "") : "",
      varientSaleValue: (this.isValidString(props.variantDetail)) ? (this.isValidString(props.variantDetail.salePrice) ? props.variantDetail.salePrice.toString() : "") : "",
      varientCostValue: (this.isValidString(props.variantDetail)) ? (this.isValidString(props.variantDetail.productCost) ? props.variantDetail.productCost.toString() : "") : "",
      varientProfitValue: "",
      varientMarginValue: "",
      varientSku: (this.isValidString(props.variantDetail)) ? (this.isValidString(props.variantDetail.skuNumber) ? props.variantDetail.skuNumber.toString() : "") : "",
      varientBarcodeValue: (this.isValidString(props.variantDetail)) ? (this.isValidString(props.variantDetail.barcode) ? props.variantDetail.barcode.toString() : "") : "",
    }
    variantDetails = props.variantDetail;
    // this.setUpdateData(variantDetails)

  }
  componentDidMount() {
  }

  // setUpdateData(variantDetails) {

  //   let variantInfo = {
  //     "price": variantDetails.price.toString(),
  //     "salePrice": variantDetails.salePrice.toString(),
  //     "productCost": variantDetails.productCost.toString(),
  //     "skuNumber": variantDetails.skuNumber.toString(),
  //     "barcode": variantDetails.barcode.toString(),
  //   };
  //   if (this.isValidString(variantDetails)) {
  //     console.log("############### variantDetails 1: " + JSON.stringify(variantDetails))
  //     this.setState({
  //       varientPriceValue: variantInfo.price,
  //       varientSaleValue: variantInfo.salePrice,
  //       varientCostValue: variantInfo.productCost,
  //       varientSku: variantInfo.skuNumber,
  //       varientBarcodeValue: variantInfo.barcode
  //     })
  //     console.log("############### variantDetails 2: " + this.state.varientBarcodeValue)
  //   }
  // }

  async componentDidMount() {

  }
  render() {
    return (
      <View style={productStyle.container}>
        <Header title={strings('variantCampaign.title')} isCrossIconVisible={false} />
        <ScrollView keyboardShouldPersistTaps={'always'} style={{ marginTop: 10 }}>
          <View>
          </View>
          {this.renderPriceView()}
          {this.renderCostView()}
          {this.renderSkuAndBarcode()}
          <AppButton isLightTheme={false} buttonText={strings('variantCampaign.saveButtonText')} onButtonPressed={() => {
            this.saveVariant()
          }} />
        </ScrollView>
      </View>
    )
  }

  saveVariant() {
    let variantInfo = {
      "name": this.props.variantName,
      "price": this.state.varientPriceValue,
      "barcode": this.state.varientBarcodeValue,
      "skuNumber": this.state.varientSku,
      "productCost": this.state.varientCostValue,
      "salePrice": this.state.varientSaleValue
    }
    // Alert.alert('varient Detail Saved')
    Actions.pop({ refresh: { variantInfo: variantInfo } });
    setTimeout(() => {
      Actions.refresh({ variantInfo: variantInfo })
    }, 100)
    // Actions.refresh({variantInfo: variantInfo})
  }

  renderCostView() {
    return (
      <View style={{ marginTop: 20, marginBottom: 10 }}>
        <View style={{ paddingTop: 10, paddingBottom: 20, paddingLeft: 10, paddingRight: 10, backgroundColor: colorConstant.GRAY_LIGHT_COLOR }}>
          <View style={productStyle.inputWrapper}>
            <View style={productStyle.validFormSubView}>
              <TextInputMaterial
                blurText={this.state.varientCostValue}
                refsValue={'productVarientCost'}
                ref={'productVarientCost'}
                label={strings('createCampaign.costTextInput')}
                maxLength={100}
                autoCapitalize={'none'}
                onChangeText={text => this.setState({ varientCostValue: text })}
                backgroundColor={colorConstant.GRAY_LIGHT_COLOR}
                autoCorrect={false}
                isLoginScreen={false}
                style={{ backgroundColor: colorConstant.GRAY_LIGHT_COLOR }}
                placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                value={this.state.varientCostValue}
                textInputName={this.state.varientCostValue}
                // errorText={strings('createCampaign.campaignNameErrorText')}
                onBlur1={() => {
                  this.handleCostMarginProfit(this.state.varientSaleValue, true, false, false)
                }}
                underlineHeight={2}
                returnKeyType={(Platform.OS === 'ios') ? 'done' : 'next'}
                keyBoardType={(Platform.OS === 'ios') ? 'number-pad' : 'number'}
                onSubmitEditing={event => {
                  this.refs.varientProfit.focus();
                }}
              />
            </View>
          </View>
          <View
            style={{ flexDirection: 'row', marginTop: 20 }}>
            <View style={productStyle.priceInputWrapper}>
              <View style={[productStyle.priceFormSubView, { paddingRight: 15 }]}>
                <TextInputMaterial
                  blurText={this.state.varientProfitValue}
                  refsValue={'varientProfit'}
                  ref={'varientProfit'}
                  label={strings('createCampaign.profitTextInput')}
                  maxLength={100}
                  autoCapitalize={'none'}
                  onChangeText={text => { this.setState({ varientProfitValue: text }) }}
                  backgroundColor={colorConstant.GRAY_LIGHT_COLOR}
                  autoCorrect={false}
                  isLoginScreen={false}
                  style={productStyle.input}
                  placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                  underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                  value={this.state.varientProfitValue}
                  textInputName={this.state.varientProfitValue}
                  onBlur1={() => {
                    this.handleCostMarginProfit(this.state.varientSaleValue, false, true, false)
                  }}
                  // errorText={strings('createCampaign.priceErrorText')}
                  underlineHeight={2}
                  returnKeyType={(Platform.OS === 'ios') ? 'done' : 'next'}
                  keyBoardType={(Platform.OS === 'ios') ? 'number-pad' : 'number'}
                  onSubmitEditing={event => {
                    this.refs.productVarientMargin.focus();
                  }}
                />
              </View>
            </View>
            <View style={productStyle.priceInputWrapper}>
              <View style={[productStyle.priceFormSubView, { paddingLeft: 15 }]}>
                <TextInputMaterial
                  blurText={this.state.varientMarginValue}
                  refsValue={'productVarientMargin'}
                  ref={'productVarientMargin'}
                  label={strings('createCampaign.marginTextInput')}
                  maxLength={100}
                  autoCapitalize={'none'}
                  onChangeText={text => this.setState({ varientMarginValue: text })}
                  backgroundColor={colorConstant.GRAY_LIGHT_COLOR}
                  autoCorrect={false}
                  isLoginScreen={false}
                  style={productStyle.input}
                  placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                  underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                  value={this.isValidString(this.state.varientMarginValue) ? this.state.varientMarginValue : ""}
                  textInputName={this.state.varientMarginValue}
                  // errorText={strings('createCampaign.campaignNameErrorText')}
                  onBlur1={() => {
                    this.handleCostMarginProfit(this.state.varientSaleValue, false, false, true)
                  }}
                  underlineHeight={2}
                  returnKeyType={(Platform.OS === 'ios') ? 'done' : 'next'}
                  keyBoardType={(Platform.OS === 'ios') ? 'number-pad' : 'number'}
                  onSubmitEditing={event => {
                    this.refs.productVarientSku.focus();
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }

  renderSkuAndBarcode() {
    return (
      <View
        style={[productStyle.validFormViewContainer, { marginTop: 10 }]}>
        <View style={productStyle.inputWrapper}>
          <View style={productStyle.validFormSubView}>
            <TextInputMaterial
              blurText={this.state.varientSku}
              refsValue={'productVarientSku'}
              ref={'productVarientSku'}
              label={strings('createCampaign.skuTextInput')}
              maxLength={100}
              autoCapitalize={'none'}
              onChangeText={text => this.setState({ varientSku: text })}
              returnKeyType={'next'}
              autoCorrect={false}
              isLoginScreen={false}
              style={productStyle.input}
              placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
              underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
              value={this.state.varientSku}
              textInputName={this.state.varientSku}
              // errorText={strings('createCampaign.skuErrorText')}
              underlineHeight={2}
              keyboardType="email-address"
              onSubmitEditing={event => {
                this.refs.productVarientBarcdoe.focus();
              }}
            />
          </View>
        </View>

        <View style={[productStyle.inputWrapper, { marginTop: 20 }]}>
          <View style={productStyle.validFormSubView}>
            <TextInputMaterial
              blurText={this.state.varientBarcodeValue}
              refsValue={'productVarientBarcdoe'}
              ref={'productVarientBarcdoe'}
              label={strings('createCampaign.barcodeTextInput')}
              maxLength={100}
              autoCapitalize={'none'}
              onChangeText={text => this.setState({ varientBarcodeValue: text })}
              returnKeyType={'done'}
              autoCorrect={false}
              isLoginScreen={false}
              style={productStyle.input}
              placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
              underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
              value={this.state.varientBarcodeValue}
              textInputName={this.state.varientBarcodeValue}
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


  renderPriceView() {
    return (
      <View
        style={productStyle.priceTextInputContainer}>
        <View style={productStyle.priceInputWrapper}>
          <View style={[productStyle.priceFormSubView, { paddingRight: 15 }]}>
            <TextInputMaterial
              blurText={this.state.varientPriceValue}
              refsValue={'productVarientPrice'}
              ref={'productVarientPrice'}
              label={strings('createCampaign.priceTextInput')}
              maxLength={100}
              autoCapitalize={'none'}
              onChangeText={text => { this.setState({ varientPriceValue: text }) }}
              autoCorrect={false}
              isLoginScreen={false}
              style={productStyle.input}
              placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
              underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
              value={(this.isValidString(this.state.varientPriceValue)) ? this.state.varientPriceValue.toString() : this.state.varientPriceValue}
              textInputName={this.state.varientPriceValue}
              // errorText={strings('createCampaign.priceErrorText')}
              underlineHeight={2}
              returnKeyType={(Platform.OS === 'ios') ? 'done' : 'next'}
              keyBoardType={(Platform.OS === 'ios') ? 'number-pad' : 'number'}
              onSubmitEditing={event => {
                this.refs.productVarientSalePrice.focus();
              }}
            />
          </View>
        </View>
        <View style={productStyle.priceInputWrapper}>
          <View style={[productStyle.priceFormSubView, { paddingLeft: 15 }]}>
            <TextInputMaterial
              blurText={this.state.varientSaleValue}
              refsValue={'productVarientSalePrice'}
              ref={'productVarientSalePrice'}
              label={strings('createCampaign.salePriceTextInput')}
              maxLength={100}
              autoCapitalize={'none'}
              onChangeText={text => {
                this.setState({ varientSaleValue: text })
                this.handleCostMarginProfit(text, false, false, false)
              }}
              autoCorrect={false}
              isLoginScreen={false}
              returnKeyType={(Platform.OS === 'ios') ? 'done' : 'next'}
              keyBoardType={(Platform.OS === 'ios') ? 'number-pad' : 'number'}
              style={productStyle.input}
              placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
              underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
              value={this.state.varientSaleValue}
              textInputName={this.state.varientSaleValue}
              // errorText={strings('createCampaign.campaignNameErrorText')}
              underlineHeight={2}
              onSubmitEditing={event => {
                this.refs.productVarientCost.focus();
              }}
            />
          </View>
        </View>
      </View>
    )
  }

  handleCostMarginProfit(salePrice, isCostHandle, isProfitHandle, isMarginHandle) {
    var productCost = 0;
    var productMargin = 0;
    var productProfit = 0;
    if (isCostHandle) {
      productCost = this.state.varientCostValue;
      productMargin = Math.floor(this.getMargin(salePrice, this.state.varientCostValue));
      productProfit = Math.floor(this.getProfit(salePrice, this.state.varientCostValue))
    } else if (isProfitHandle) {
      productCost = salePrice - this.state.varientProfitValue;
      productMargin = Math.floor(this.getMargin(salePrice, productCost));
      productProfit = this.state.varientProfitValue
    } else if (isMarginHandle) {
      productCost = Math.floor(this.getCostFromProfitMargin(salePrice, this.state.varientMarginValue));
      productMargin = this.state.varientMarginValue
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
      varientCostValue: productCost + "",
      varientMarginValue: productMargin + "",
      varientProfitValue: productProfit + ""
    })
  }


  getCostFromProfitMargin(salePrice, margin) {
    return ((100 - margin) * salePrice) / 100
  }

  getProfit(salePrice, cost) {
    return (salePrice - cost)
  }

  getMargin(salePrice, cost) {
    if (this.isValidString(salePrice)) {
      return ((salePrice - cost) / salePrice) * 100
    }
    return 0;
  }

}