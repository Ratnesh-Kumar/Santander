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
var globalData = new GlobalData();
var constants = require('../../config/Constants');
var compaignConstants = require('./campaignConstants')
var colorConstant = require('../../config/colorConstant')
export default class CampaignScreen extends BaseComponent {

  constructor(props) {
    super(props)
    this.state = {
      campaignName: '',
    }
  }

  async componentDidMount() {

  }
  render() {
    return (
      <View style={campaignStyle.container}>
        <Header title={strings('createCampaign.screenTitle')} isCrossIconVisible={false} />
        <View style={campaignStyle.viewContainer}>
          <ScrollView keyboardShouldPersistTaps={'always'} style={{marginTop: 10 }}>
          {this.renderSwitchTextInput()}
            <AppButton buttonText={strings('createCampaign.nextButtonText')} onButtonPressed={() => {
              Actions.createCampaignShare()
            }} />
          </ScrollView>
        </View>
      </View>
    );
  }

  renderSwitchTextInput() {
    return (
      <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10 }}>
        {this.renderSwitchFields(strings('createCampaignCategories.trackSwitchText'))}
        {this.renderSwitchFields(strings('createCampaignCategories.allowPurchaseSwitchText'))}
      </View>
    );
  }
  renderSwitchFields(title) {
    return (
      <View style={{ paddingTop: 10, paddingRight: 10 }}>
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

