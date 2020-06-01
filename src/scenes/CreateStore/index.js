import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';
import createStoreStyle from './createStoreStyle';
import { strings } from '../../i18next/i18n';
var createStoreConstant = require('./createStoreConstant')
var colorConstant = require('../../config/colorConstant')

export default class CreateStoreScene extends Component {
    render() {
      return (
        <View style={createStoreStyle.container}>
          <Header title={createStoreConstant.CREATE_STORE_SCREEN} />
          <View style={createStoreStyle.viewContainer}>
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
          <View style={createStoreStyle.createShopButtonView}>
            <TouchableOpacity
              style={createStoreStyle.button}
              onPress={() => {
                // Actions.tabbar();
              }}
              activeOpacity={1}>
              {}
              <Text
                style={createStoreStyle.createShopButtonText}>
                {strings('createShop.createDigitalShop')}
              </Text>
            </TouchableOpacity>
          </View>
        );
      }

    renderTermsView() {
        return (
          <View style={createStoreStyle.termsAndConditionView}>
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
          <View style={createStoreStyle.UpdatedView}>
            <Text style={{ position: 'absolute', bottom: 25, color:'#000' }}>{strings('loginScreen.UpdatedText')}</Text>
          </View>
        );
      }
  }