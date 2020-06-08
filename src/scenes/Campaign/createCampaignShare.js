/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-native/no-inline-forgotPasswordStyle */
/* eslint-disable react/no-string-refs */
import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';
import PropTypes from 'prop-types';
import createStyle from './campaignStyle';
import Header from '../../components/Header';
import SwitchTextInput from '../../components/SwitchTextInput';
import AppButton from '../../components/AppButton';
import { strings } from '../../i18next/i18n';
import { Actions } from 'react-native-router-flux';
import GlobalData from '../../utils/GlobalData';
import CommonFunctions from '../../utils/CommonFunctions';
var campaignConstants = require('./campaignConstants');
var constants = require('../../config/Constants');
var globalData = new GlobalData();
var comonFunctions = new CommonFunctions();

export default class CreateCampaiganShare extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }



  render() {
    return (
      <View style={createStyle.container}>
        <Header isleftArrowDisplay={true} title={strings('createCampaign.screenTitle')} />
        <ScrollView style={{ paddingBottom: 50 }}>
          {this.renderSwitchTextInput()}
          {this.renderBottomView()}
        </ScrollView>
      </View>
    );
  }

  renderBottomView() {
    return (
      <View>
        <Text style={createStyle.bottomTextStyle}>{strings('createCampaignShare.campaignShareMessage')}</Text>
        {this.renderPublishButton()}
      </View>
    );
  }

  renderPublishButton() {
    return (
      <AppButton isLightTheme={false} buttonText={strings('createCampaignShare.publishNowText')} onButtonPressed={() => {
        comonFunctions.postOnFacebook();
      }} />
    );
  }

  showAlert() {
    Alert.alert(
      'Information',
      'You campaign successfully published.',
      [
        { text: 'OK', onPress: () => Actions.home() },
      ]
    );
  }
  renderSwitchTextInput() {
    return (
      <View style={{ marginTop: 10 }}>
        {this.renderSwitchFields(campaignConstants.PUBLISH_WHATSAPP, strings('createCampaignShare.whatsAppText'), true)}
        {this.renderSwitchFields(campaignConstants.PUBLISH_FACEBOOK_MESSANGER, strings('createCampaignShare.facebookText'), false)}
        {this.renderSwitchFields(campaignConstants.PUBLISH_TEXT_SMS, strings('createCampaignShare.textSmsText'), false)}
        {this.renderSwitchFields(campaignConstants.PUBLISH_EMAIL, strings('createCampaignShare.emailText'), false)}
        {this.renderSwitchFields(campaignConstants.PUBLISH_FACEBOOK_PAGE, strings('createCampaignShare.facebookPageText'), true)}
        {this.renderSwitchFields(campaignConstants.PUBLISH_FACEBOOK_SHOP, strings('createCampaignShare.facebookShopText'), true)}
        {this.renderSwitchFields(campaignConstants.PUBLISH_FACEBOOK_MARKETPLACE, strings('createCampaignShare.facebookMarketText'), false)}
        {this.renderSwitchFields(campaignConstants.PUBLISH_PINTEREST, strings('createCampaignShare.pinterestText'), false)}
        {this.renderSwitchFields(campaignConstants.PUBLISH_INSTAGRAM, strings('createCampaignShare.instagramText'), true)}
      </View>
    );
  }



  renderSwitchFields(type, title, defaultvalue) {
    let isSwitchDisplay = false;
    switch (type) {
      case campaignConstants.PUBLISH_WHATSAPP:
        isSwitchDisplay = globalData.isWhatsAppEnable()
        break;

      case campaignConstants.PUBLISH_FACEBOOK_MESSANGER:
        isSwitchDisplay = globalData.isFacebookMessangerEnable()
        break;

      case campaignConstants.PUBLISH_TEXT_SMS:
        isSwitchDisplay = globalData.isTextSmsEnabled()
        break;

      case campaignConstants.PUBLISH_EMAIL:
        isSwitchDisplay = globalData.isEmailEnabled()
        break;

      case campaignConstants.PUBLISH_FACEBOOK_PAGE:
        isSwitchDisplay = globalData.isFacebookPageEnabled()
        break;

      case campaignConstants.PUBLISH_FACEBOOK_SHOP:
        isSwitchDisplay = globalData.isFacebookShopEnabled()
        break;

      case campaignConstants.PUBLISH_FACEBOOK_MARKETPLACE:
        isSwitchDisplay = globalData.isFacebookMarketplaceEnabled()
        break;

      case campaignConstants.PUBLISH_PINTEREST:
        isSwitchDisplay = globalData.isPinterestEnabled()
        break;

      case campaignConstants.PUBLISH_INSTAGRAM:
        isSwitchDisplay = globalData.isInstagramEnabled()
        break;

      default:
        console.log("############ firebase not running");

    }
    if (isSwitchDisplay) {
      return (
        <View>
          <SwitchTextInput
            defaultSwitchValue={defaultvalue}
            onRightPressed={(value) => { console.log('SWITCH VA:UE ::::', value) }}
            title={title}
          />
        </View>
      );
    } else {
      return (
        <View />
      )
    }

  }
}

