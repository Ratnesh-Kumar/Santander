import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';
import createCampaignStyle from '../Campaign/campaignStyle';
import { strings } from '../../i18next/i18n';
import CardView from 'react-native-cardview'
import BaseComponent from '../../BaseComponent';
import AppButton from '../../components/AppButton'

var constants = require('../../config/Constants');
var createCampaignConstant = require('../Campaign/campaignConstants')
var colorConstant = require('../../config/colorConstant')
import GlobalData from '../../utils/GlobalData';
import campaignStyle from '../Campaign/campaignStyle';
var globalData = new GlobalData();
export default class CreateCampaignScene extends BaseComponent {
  render() {
    return (
      <View style={createCampaignStyle.container}>
        <Header isleftArrowDisplay={false} title={createCampaignConstant.CREATE_STORE_SCREEN} />
        <View style={createCampaignStyle.registerCreateCampaignContainer}>
          <CardView
            style={createCampaignStyle.cardViewStyle}
            cardElevation={8}
            cardMaxElevation={8}
            cornerOverlap={false}
            cornerRadius={5}>
            <View style={{ justifyContent: 'center', alignItems: 'center', width: constants.SCREEN_WIDTH - 40 }}>
              <Text style={{ fontSize: 16, margin: 20 }}>
                {strings("createCampaign.startRightAway")}
              </Text>
            </View>
            <AppButton isLightTheme={true} buttonText={strings('createCampaign.createFirstCampaign')} onButtonPressed={() => {
              globalData.setAddCampaignStart(true)
              Actions.tabbar();
              Actions.campaign();
            }} />
            <TouchableOpacity style={{ marginBottom: 20, alignItems:'center' }} onPress={() => {
              globalData.setAddCampaignStart(false)
              Actions.tabbar()
            }}>
              <Text style={{ fontSize: 18, color: colorConstant.SANT_LIGHT_BLUE, fontWeight:'bold' }}>{strings("createCampaign.skipStep")}</Text>
            </TouchableOpacity>
          </CardView>

          {(globalData.getIsAutoCreated())?<CardView
            style={campaignStyle.cardViewStyleRegister}
            cardElevation={8}
            cardMaxElevation={8}
            cornerOverlap={false}
            cornerRadius={5}>
            <View style={{ justifyContent: 'center', alignItems: 'center', width: constants.SCREEN_WIDTH - 40 }}>
              <Text style={{ fontSize: 16, margin: 10 }}>
                {strings("createCampaign.businessDetailMessage")}
              </Text>
              <TouchableOpacity onPress={()=>{
                Actions.tabbar();
                Actions.shopSetting({isComingFromHomePage: true})
                }}>
                <Text style={{ fontSize: 14, margin: 10, textDecorationLine: 'underline', color: colorConstant.SANT_RED_COLOR, fontWeight: 'bold' }}>
                  {strings("createCampaign.businessDetailTitle")}
                </Text>
              </TouchableOpacity>
            </View>
          </CardView>: <View/>}

        </View>
      </View>
    );
  }

  renderCreateFirstCampaignButton() {
    return (
      <View style={createCampaignStyle.createShopButtonView}>
        <TouchableOpacity
          style={createCampaignStyle.button}
          onPress={() => {
            globalData.setAddCampaignStart(true)
            Actions.tabbar();
            Actions.campaign();
          }}
          activeOpacity={1}>
          {}
          <Text
            style={createCampaignStyle.createShopButtonText}>
            {strings("createCampaign.createFirstCampaign")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

}