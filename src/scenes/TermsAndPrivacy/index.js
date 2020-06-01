import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';
import termsAndPrivacyStyle from './termsAndPrivacyStyle';
import { ScrollView } from 'react-native-gesture-handler';
import { getTermsAndConditions, getPrivacyPolicy, getRemoteConfig } from '../../config/firebaseFirestore';
var constants = require('../../config/Constants');
var termsConstant = require('./termsAndPrivacyStyleConstants')
let termsText = "";
let privacyText = "";


export default class TermsScreen extends Component {

  // async componentDidMount(){
  //   termsText = await getTermsAndConditions(constants.LOCALE_ES);
  //   console.log("################ termsAndConditions : "+termsText)
  //   privacyText = await getPrivacyPolicy(constants.LOCALE_ES)
  //   console.log("################ privacyPolicy : "+privacyText)
  // }


  render() {
    return (
      <View style={termsAndPrivacyStyle.container}>
        <Header isleftArrowDisplay={true} title={termsConstant.TERMS_TITLE} />
        <View style={termsAndPrivacyStyle.temsTextcontainer}>
          <Text>{termsConstant.TERMS_TITLE}</Text>
        </View> 
        <ScrollView style={termsAndPrivacyStyle.textScrollView}>
          <Text>{termsConstant.TERMS_TEXT}</Text>
        </ScrollView>
      </View>
    );
  }
}

