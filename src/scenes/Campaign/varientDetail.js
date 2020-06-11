import React, { Component } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TextInput, ScrollView, Alert, TouchableOpacity } from 'react-native';
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
import { color } from 'react-native-reanimated';
var globalData = new GlobalData();
var constants = require('../../config/Constants');
var compaignConstants = require('./campaignConstants')
var colorConstant = require('../../config/colorConstant')

export default class VarientDetailScreen extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            varientPriceValue: "",
            varientSaleValue: "",
            varientSku:"",
            varientBarcodeValue:""
        }
    }

    async componentDidMount() {

    }
    render() {
        return (
            <View style={campaignStyle.container}>
                <Header title={strings('variantCampaign.title')} isCrossIconVisible={false} />
                <ScrollView keyboardShouldPersistTaps={'always'} style={{ marginTop: 10 }}>
                    <View>
                    </View>
                    {this.renderPriceView()}
                    {this.renderSkuAndBarcode()}
                    <AppButton isLightTheme={false} buttonText={strings('variantCampaign.saveButtonText')} onButtonPressed={() => {
                        Alert.alert('varient Detail Saved')
                        Actions.pop()
                    }} />
                </ScrollView>
            </View>
        )
    }

    renderSkuAndBarcode() {
        return (
            <View
                style={[campaignStyle.validFormViewContainer, { marginTop: 10 }]}>
                <View style={campaignStyle.inputWrapper}>
                    <View style={campaignStyle.validFormSubView}>
                        <TextInputMaterial
                            blurText={this.state.varientSku}
                            refsValue={'varientSku'}
                            ref={'varientSku'}
                            label={strings('createCampaign.skuTextInput')}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={text => this.setState({ varientSku: text })}
                            returnKeyType={'next'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={campaignStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.varientSku}
                            textInputName={this.state.varientSku}
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
                            refsValue={'varientBarcdoe'}
                            ref={'varientBarcdoe'}
                            label={strings('createCampaign.barcodeTextInput')}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={text => this.setState({ varientBarcodeValue: text })}
                            returnKeyType={'done'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={campaignStyle.input}
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
                style={campaignStyle.priceTextInputContainer}>
                <View style={campaignStyle.priceInputWrapper}>
                    <View style={[campaignStyle.priceFormSubView, { paddingRight: 15 }]}>
                        <TextInputMaterial
                            blurText={this.state.varientPriceValue}
                            refsValue={'varientPrice'}
                            ref={'varientPrice'}
                            label={strings('createCampaign.priceTextInput')}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={text => { this.setState({ varientPriceValue: text }) }}
                            returnKeyType={'next'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={campaignStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.varientPriceValue}
                            textInputName={this.state.varientPriceValue}
                            // errorText={strings('createCampaign.priceErrorText')}
                            underlineHeight={2}
                            keyboardType={'number-pad'}
                            onSubmitEditing={event => {
                                this.refs.varientSalePrice.focus();
                            }}
                        />
                    </View>
                </View>
                <View style={campaignStyle.priceInputWrapper}>
                    <View style={[campaignStyle.priceFormSubView, { paddingLeft: 15 }]}>
                        <TextInputMaterial
                            blurText={this.state.varientSaleValue}
                            refsValue={'varientSalePrice'}
                            ref={'varientSalePrice'}
                            label={strings('createCampaign.salePriceTextInput')}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={text => { this.setState({ varientSaleValue: text }) }}
                            returnKeyType={'next'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            keyboardType={'number-pad'}
                            style={campaignStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.varientSaleValue}
                            textInputName={this.state.varientSaleValue}
                            // errorText={strings('createCampaign.campaignNameErrorText')}
                            underlineHeight={2}
                            onSubmitEditing={event => {
                                this.refs.varientSku.focus();
                            }}
                        />
                    </View>
                </View>
            </View>
        )
    }

}