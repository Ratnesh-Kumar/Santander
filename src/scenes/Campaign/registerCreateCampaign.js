import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';
import createCampaignStyle from '../Campaign/campaignStyle';
import { strings } from '../../i18next/i18n';
import CardView from 'react-native-cardview'
import BaseComponent from '../../BaseComponent';
var constants = require('../../config/Constants');
var createCampaignConstant = require('../Campaign/campaignConstants')
var colorConstant = require('../../config/colorConstant')
import GlobalData from '../../utils/GlobalData';
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
            {this.renderCreateFirstCampaignButton()}
          </CardView>
          <TouchableOpacity style={{ marginTop: 10 }} onPress={() => {
            globalData.setAddCampaignStart(false)
            Actions.tabbar()

          }}>
            <Text style={{ fontSize: 18, fontStyle: 'italic', color: colorConstant.GREY_DARK_COLOR_A }}>{strings("createCampaign.skipStep")}</Text>
          </TouchableOpacity>
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