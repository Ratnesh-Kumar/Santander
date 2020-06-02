import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';
import createCampaignStyle from './createCampaignStyle';
import { strings } from '../../i18next/i18n';
var createCampaignConstant = require('./createCampaignConstant')
var colorConstant = require('../../config/colorConstant')

export default class CreateCampaignScene extends Component {
    render() {
      return (
        <View style={createCampaignStyle.container}>
          <Header title={createCampaignConstant.CREATE_STORE_SCREEN} />
          <View style={createCampaignStyle.viewContainer}>
              {this.renderUserName()}
              {this.renderPhoneNumber()}
              {this.renderPassword()}
              {this.renderDigitalStoreName()}
              {this.renderCreateShopButton()}
              {this.renderTermsView()}
              {this.renderUpdateText()}
          </View>
        </View>
      );
    }
    renderUserName(){

    }
    renderPhoneNumber(){

    }
    renderPassword(){

    }
    renderDigitalStoreName(){

    }
    renderCreateShopButton() {
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
                {strings('createShop.createDigitalShop')}
              </Text>
            </TouchableOpacity>
          </View>
        );
      }

    renderTermsView() {
        return (
          <View style={createCampaignStyle.termsAndConditionView}>
            <Text style={{ fontSize: 16, textAlign: 'center' }}>
              <Text>{strings('loginScreen.TermsConditionTitle')}</Text>
              <Text style={{ color: colorConstant.SANTANDAR_COLOR }}>{strings('loginScreen.TermsConditionTitle1')}</Text>
              <Text>{strings('loginScreen.TermsConditionTitle2')}</Text>
              <Text style={{ color: colorConstant.SANTANDAR_COLOR }}>{strings('loginScreen.TermsConditionSubTitle')}</Text>
              <Text>{strings('loginScreen.TermsConditionSubTitle1')}</Text>
            </Text>
          </View>
        );
      }

      renderUpdateText() {
        return (
          <View style={createCampaignStyle.UpdatedView}>
            <Text style={{ position: 'absolute', bottom: 25, color:'#000' }}>{strings('loginScreen.UpdatedText')}</Text>
          </View>
        );
      }
  }