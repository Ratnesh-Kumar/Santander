import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';
import createCampaignStyle from './createCampaignStyle';
import { strings } from '../../i18next/i18n';
import CardView from 'react-native-cardview'

var createCampaignConstant = require('./createCampaignConstant')
var colorConstant = require('../../config/colorConstant')

export default class CreateCampaignScene extends Component {
  render() {
    return (
      <View style={createCampaignStyle.container}>
        <Header isleftArrowDisplay={false} title={createCampaignConstant.CREATE_STORE_SCREEN} />
        <View style={createCampaignStyle.viewContainer}>
          <CardView
            style={createCampaignStyle.cardViewStyle}
            cardElevation={8}
            cardMaxElevation={8}
            cornerOverlap={false}
            cornerRadius={5}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 18, margin: 20 }}>
                {strings("createCampaign.startRightAway")}
              </Text>
            </View>
            {this.renderCreateFirstCampaignButton()}
          </CardView>
            <TouchableOpacity style={{marginTop:10}} onPress={() => Actions.tabbar()}>
              <Text style={{fontSize:20, fontStyle:'italic' ,color:colorConstant.GREY_DARK_COLOR_A}}>{strings("createCampaign.skipStep")}</Text>
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