import React, { Component } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TextInput, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';
import campaignStyle from './campaignStyle';
import { strings } from '../../i18next/i18n';
import * as RNLocalize from "react-native-localize";
// import {RNFirebase, firestore} from 'react-native-firebase';
import { getTermsAndConditions, getPrivacyPolicy, getRemoteConfig } from '../../config/firebaseFirestore';
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
export default class CampaignScreen extends BaseComponent {

  constructor(props) {
    super(props)
    this.state = {
      campaignName: '',
      productQuantity: 1,
      variantsList: [],
      categoryList: []
    }
  }

  async componentDidMount() {

  }
  render() {
    return (
      <View style={campaignStyle.container}>
        <Header title={strings('createCampaign.screenTitle')} isCrossIconVisible={false} />
        <ScrollView keyboardShouldPersistTaps={'always'} style={{ marginTop: 10 }}>

          <View>
            {this.renderSwitchTextInput()}
            {this.renderProductQuantity()}
            {this.renderCategoryTagView()}
            {this.renderVariantsQantityView()}
          </View>
          <AppButton isLightTheme={false}  buttonText={strings('createCampaign.nextButtonText')} onButtonPressed={() => {
            Actions.createCampaignShare()
          }} />
        </ScrollView>
      </View>
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
      <QuantityField title={quantityTitle} updatedQuantity={(quantity) => {
        this.setState({
          productQuantity: quantity
        })
      }} />
    )
  }

  renderCategoryTagView() {
    return (
      <View style={{ marginTop: 10 }}>
        <CreateTagView labelName={strings('createCampaign.categoryTagTextInput')} updatedList={(categoryList) => this.setState({ categoryList: categoryList })} />
        <CreateTagView labelName={strings('createCampaign.variantsTagTextInput')} updatedList={(variantList) => this.setState({ variantsList: variantList })} />
      </View>
    )
  }

  renderProductQuantity() {
    return (
      <QuantityField title={strings('createCampaign.quanitytTitle')} updatedQuantity={(quantity) => { }} />
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

