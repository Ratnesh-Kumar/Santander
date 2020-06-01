import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';
import homeStyle from './homeStyle';
import { strings } from '../../i18next/i18n';
var constants = require('../../config/Constants');
var homeConstants = require('./homeConstants')
import * as RNLocalize from "react-native-localize";
// import {RNFirebase, firestore} from 'react-native-firebase';
import { getTermsAndConditions, getPrivacyPolicy, getRemoteConfig } from '../../config/firebaseFirestore';
import GlobalData from '../../utils/GlobalData';
var globalData = new GlobalData();
export default class HomeScreen extends Component {

  constructor(props) {
    super(props)
    
  }

  async componentDidMount(){
    let remoteConfig = await getRemoteConfig();
    console.log("################ remoteConfig : "+globalData.isVerifyEmail());
    let termsAndConditions = await getTermsAndConditions(constants.LOCALE_ES);
    console.log("################ termsAndConditions : "+termsAndConditions)
    let privacyPolicy = await getPrivacyPolicy(constants.LOCALE_ES)
    console.log("################ privacyPolicy : "+privacyPolicy)
  }
  render() {
    
    return (
      <View style={homeStyle.container}>
        <Header title={strings('screens.homeScreen')} />
        <View style={homeStyle.viewContainer}>
          <Text style={homeStyle.welcome}>{strings('screens.homeScreen')}</Text>
        </View>
      </View>
    );
  }

  async displayConsole() {
    console.log("############# : " + JSON.stringify(RNLocalize.getLocales()));
    console.log("############# : " + RNLocalize.getCurrencies());
    console.log("############# : " + RNLocalize.getCountry());
    console.log("############# : " + RNLocalize.getCalendar());
    console.log("############# : " + RNLocalize.getTemperatureUnit());
    console.log("############# : " + RNLocalize.getTimeZone());
    console.log("############# : " + RNLocalize.uses24HourClock());
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

