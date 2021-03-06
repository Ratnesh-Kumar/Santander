import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';
import homeStyle from './homeStyle';
import { strings } from '../../i18next/i18n';
import CardView from 'react-native-cardview';
var constants = require('../../config/Constants');
var homeConstants = require('./homeConstants')
import * as RNLocalize from "react-native-localize";
// import {RNFirebase, firestore} from 'react-native-firebase';
import { getRemoteConfig } from '../../config/firebaseFirestore';
import GlobalData from '../../utils/GlobalData';
import BaseComponent from '../../BaseComponent';
import AppButton from '../../components/AppButton'
var globalData = new GlobalData();
var colorConstant = require('../../config/colorConstant')
export default class HomeScreen extends BaseComponent {

  constructor(props) {
    super(props)
    this.state = {
      isSignOutDisplay: false
    }
    // console.log("############ userInfo : "+JSON.stringify(globalData.getUserInfo()))
    // console.log("############ userInfo token : "+globalData.getUserTokenKey())
    // console.log("############ userInfo token : " + globalData.getIsAutoCreated())
  }

  async componentDidMount() {
    let isUserAlreadySignIn = await this.isSignedIn();
    if (isUserAlreadySignIn) {
      let currentUserInfo = await this.getCurrentUser();
      this.setState({
        isSignOutDisplay: isUserAlreadySignIn
      })
    }
    this.displayConsole()
    // await getRemoteConfig();
  }
  renderGraphView() {
    return (
      <View style={homeStyle.graphViewStyle}>
        <Image 
        style={{width: constants.SCREEN_WIDTH /2,
          height:constants.SCREEN_HEIGHT/5, }}
        source={require('../.././public/images/digishop_latest.jpg')} />
        <Text style={{ paddingTop:10,fontSize: 16,  fontWeight:'bold' }}>
          {strings('screens.learnHow')}
        </Text>
        <Text style={{ fontSize: 32,  fontWeight:'bold',color:colorConstant.SANT_RED_COLOR }}>
          {strings('screens.homeScreen')}
        </Text>
        <Text style={{ fontSize: 16,  fontWeight:'bold'}}>
          {strings('screens.mobileAppEffectively')}
        </Text>
        <View style={{height:3,marginTop:5,backgroundColor:colorConstant.GREY_DARK_COLOR,width:constants.SCREEN_WIDTH/3+40}}/>
      </View>
    );
  }
  render() { 
    return (
      <View style={homeStyle.container}>
        <Header isleftArrowDisplay={false} title={strings('screens.homeScreen')} isSignOutDisplay={this.state.isSignOutDisplay} rightText={strings('screens.signOut')} onRightPressed={() => {
          this.googleSignOut();
        }} isCrossIconVisible={false} />
        <View style={homeStyle.viewContainer}>
          {this.renderGraphView()}
          <CardView
            style={homeStyle.cardViewStyle}
            cardElevation={8}
            cardMaxElevation={8}
            cornerOverlap={false}
            cornerRadius={5}>
            <View style={{ justifyContent: 'center', alignItems: 'center', width: constants.SCREEN_WIDTH - 40 }}>
              <Text style={{ fontSize: 16, margin: 10 }}>
                {strings("screens.manageScreen")}
              </Text>
            </View>
            <AppButton isLightTheme={true} buttonText={strings('screens.manageCampaigan')} onButtonPressed={() => {
              Actions.manageCampaign()
            }} />
          </CardView>

          {/* {(globalData.getIsAutoCreated())?<CardView
            style={homeStyle.cardViewStyle}
            cardElevation={8}
            cardMaxElevation={8}
            cornerOverlap={false}
            cornerRadius={5}>
            <View style={{ justifyContent: 'center', alignItems: 'center', width: constants.SCREEN_WIDTH - 40 }}>
              <Text style={{ fontSize: 16, margin: 10 }}>
                {"Please provide your business details."}
              </Text>
              <TouchableOpacity onPress={()=>{Actions.shopSetting({isComingFromHomePage: true})}}>
                <Text style={{ fontSize: 14, margin: 10, textDecorationLine: 'underline', color: colorConstant.SANT_RED_COLOR, fontWeight: 'bold' }}>
                  {"Business Detail"}
                </Text>
              </TouchableOpacity>
            </View>
          </CardView>: <View/>} */}

        </View>
        {/* <View style={homeStyle.viewContainer} onTouchStart={()=>{Actions.campaign()}}>
          <Text style={homeStyle.welcome}>{strings('screens.addCampaign')}</Text>
        </View> */}
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

