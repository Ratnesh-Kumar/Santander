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
var constants = require('../../config/Constants');

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
        <ScrollView style={{paddingBottom: 50}}>
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
        <AppButton buttonText={strings('createCampaignShare.publishNowText')} onButtonPressed={()=>{
          this.showAlert()
        }}/>
    );
  }

  showAlert() {  
    Alert.alert(  
        'Information',  
        'You campaign successfully published.',  
        [   
            {text: 'OK', onPress: () => Actions.home()},  
        ]  
    );  
}  
  renderSwitchTextInput() {
    return (
      <View style={{ marginTop: 10 }}>
        {this.renderSwitchFields(strings('createCampaignShare.whatsAppText'))}
        {this.renderSwitchFields(strings('createCampaignShare.facebookText'))}
        {this.renderSwitchFields(strings('createCampaignShare.textSmsText'))}
        {this.renderSwitchFields(strings('createCampaignShare.emailText'))}
        {this.renderSwitchFields(strings('createCampaignShare.facebookPageText'))}
        {this.renderSwitchFields(strings('createCampaignShare.facebookShopText'))}
        {this.renderSwitchFields(strings('createCampaignShare.facebookMarketText'))}
        {this.renderSwitchFields(strings('createCampaignShare.pinterestText'))}
        {this.renderSwitchFields(strings('createCampaignShare.instagramText'))}
      </View>
    );
  }

  renderSwitchFields(title) {
    return (
      <View>
        <SwitchTextInput
          defaultSwitchValue={true}
          onRightPressed={(value) => { console.log('SWITCH VA:UE ::::', value) }}
          title={title}
        />
      </View>
    );
  }



}

