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
import ActivityIndicatorView from '../../components/activityindicator/ActivityIndicator';
import DialogModalView from '../../components/modalcomponent/DialogModal';
import { fetchJsonPOST } from '../../services/FetchData';
import BaseComponent from '../../BaseComponent';
var comonFunctions = new CommonFunctions();
var campaignConstants = require('./campaignConstants');
var constants = require('../../config/Constants');
var globalData = new GlobalData();

export default class CreateCampaiganShare extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      isActivityIndicatorVisible: false,
      activityIndicatorText: '',
      isDialogModalVisible: false,
      dialogModalText: '',
      dialogModalTitle: '',
    };
  }



  render() {
    return (
      <View style={createStyle.container}>
        {this.renderModal()}
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
       //this.publishButtonClick()
       comonFunctions.postOnFacebook();
      }} />
    );
  }

  async publishButtonClick(){
    //check for shop name already exists or not . 
    this.renderActivityIndicatorShow()
    let bodyData = this.getShopNameBodyData()
    console.log("@@@@@@@@@@@@@@@@@@@  bodyData : " + JSON.stringify(bodyData))
    var responseData = await fetchJsonPOST(constants.CREATE_SHOP_URL, bodyData)
    debugger;
    console.log("@@@@@@@@@@@@@@@@@@@  responseData : " + JSON.stringify(responseData))
    if (this.isValidString(responseData) && this.isValidString(responseData.statusMessage)) {
      // if (responseData.statusMessage == constants.USER_LOGIN_STATUS) {
      // }
      // else {
      //   this.renderDialogModal('Publish error', responseData.statusMessage);
      // }
    }
    this.renderActivityIndicatorHide()
  }

  getShopNameBodyData() {
    let locale = constants.DEVICE_LOCALE.replace("-","_").toLocaleLowerCase()
    let bodyData = {
      "shopName": 'HOLD',
      "country": constants.COUNTRY_NAME,
      "locale":locale,
    };
    return bodyData
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
  renderActivityIndicatorShow() {
    this.setState({
      isActivityIndicatorVisible: true,
      activityIndicatorText: 'Loading...'
    });
  }

  renderActivityIndicatorHide() {
    this.setState({
      isActivityIndicatorVisible: false,
      activityIndicatorText: ''
    });
  }

  renderDialogModal(title, message) {
    this.setState({
      isDialogModalVisible: true,
      dialogModalText: message,
      dialogModalTitle: title
    });
    message = '';
  }

  renderModal() {
    if (this.state.isDialogModalVisible) {
      return (
        <DialogModalView isVisible={this.state.isDialogModalVisible}
          title={this.state.dialogModalTitle}
          message={this.state.dialogModalText}
          handleClick={() => { this.setState({ isDialogModalVisible: false, dialogModalText: '' }) }} />);
    } else if (this.state.isActivityIndicatorVisible) {
      return (
        <ActivityIndicatorView isVisible={this.state.isActivityIndicatorVisible} text={this.state.activityIndicatorText} />
      );
    }
  }
}

