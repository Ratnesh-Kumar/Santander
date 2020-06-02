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
import BaseComponent from '../../BaseComponent';
var globalData = new GlobalData();
export default class HomeScreen extends BaseComponent {

  constructor(props) {
    super(props)
    console.log("################ { isAddCampaign : true} : "+props.isAddCampaign)
    this.state={
      isSignOutDisplay: false
    }
    if(globalData.isAddCampaignStart()){
      globalData.setAddCampaignStart(false)
      Actions.campaign();
    }
  }

  async componentDidMount(){
    
    let isUserAlreadySignIn = await this.isSignedIn();
    if(isUserAlreadySignIn){
      let currentUserInfo = await this.getCurrentUser();
      this.setState({
        isSignOutDisplay: isUserAlreadySignIn
      })
    }
  }
  render() {
    return (
      <View style={homeStyle.container}>
        <Header isleftArrowDisplay={false} title={strings('screens.homeScreen')} isSignOutDisplay={this.state.isSignOutDisplay} rightText={strings('screens.signOut')} onRightPressed={() =>{
          this.googleSignOut();
        }} isCrossIconVisible={false}/>
        <View style={homeStyle.viewContainer} onTouchStart={()=>{Actions.campaign()}}>
          <Text style={homeStyle.welcome}>{strings('screens.homeScreen')}</Text>
        </View>
      </View>
    );
  }

  async displayConsole() {
    // console.log("############# : " + JSON.stringify(RNLocalize.getLocales()));
    // console.log("############# : " + RNLocalize.getCurrencies());
    // console.log("############# : " + RNLocalize.getCountry());
    // console.log("############# : " + RNLocalize.getCalendar());
    // console.log("############# : " + RNLocalize.getTemperatureUnit());
    // console.log("############# : " + RNLocalize.getTimeZone());
    // console.log("############# : " + RNLocalize.uses24HourClock());
  }

  async googleSignOut(){
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

