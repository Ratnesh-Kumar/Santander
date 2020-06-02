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
        <Header title={createCampaignConstant.CREATE_STORE_SCREEN} />
        <View style={createCampaignStyle.viewContainer}>
          <CardView
            style={{ backgroundColor: 'white',  height: 160, marginTop:50, marginLeft:10, marginRight:10}}
            cardElevation={8}
            cardMaxElevation={8}
            cornerOverlap={false}
            cornerRadius={5}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 18, margin: 20 }}>
                {'Start right away by creating a campaign \nwhich will also create your first product'}
              </Text>
            </View>
            {this.renderCreateFirstCampaignButton()}
          </CardView>
            <TouchableOpacity style={{marginTop:10}}>
              <Text style={{fontSize:18}}>{'Skip this step'}</Text>
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
            // Actions.tabbar();
          }}
          activeOpacity={1}>
          {}
          <Text
            style={createCampaignStyle.createShopButtonText}>
            {'Create your first campaign'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

}