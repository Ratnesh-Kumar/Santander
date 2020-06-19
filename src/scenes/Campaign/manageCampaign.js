/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-native/no-inline-forgotPasswordStyle */
/* eslint-disable react/no-string-refs */
import React, { Component } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import CardView from 'react-native-cardview';
import PropTypes from 'prop-types';
import createStyle from './campaignStyle';
import Header from '../../components/Header';
import SwitchTextInput from '../../components/SwitchTextInput';
import AppButton from '../../components/AppButton';
import FloatingButton from '../../components/FloatingButton';
import { strings } from '../../i18next/i18n';
import { Actions } from 'react-native-router-flux';
import GlobalData from '../../utils/GlobalData';
import CommonFunctions from '../../utils/CommonFunctions';
import SearchBar from '../../components/SearchBar';
import BaseComponent from '../../BaseComponent';
import { create } from 'react-test-renderer';
import { fetchCampaignGET } from '../../services/FetchData';
import ActivityIndicatorView from '../../components/activityindicator/ActivityIndicator';
import DialogModalView from '../../components/modalcomponent/DialogModal';
var campaignConstants = require('./campaignConstants');
var constants = require('../../config/Constants');
var globalData = new GlobalData();
var colorConstants = require('../../config/colorConstant');

export default class ManageCampaign extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      isActivityIndicatorVisible: false,
      activityIndicatorText: '',
      isDialogModalVisible: false,
      dialogModalText: '',
      dialogModalTitle: '',
      manageCampaignArr: []
    };
  }

  componentDidMount() {
    this.setCampaignID("");
    this.setCampaignResponse("");
    this.getCampaignList()
  }

  async getCampaignList() {
    this.renderActivityIndicatorShow()
    let campaignSaveURL = constants.GET_CAMPAIGN_LIST.replace(constants.BUISNESS_ID, globalData.getBusinessId());

    let responseData = await fetchCampaignGET(campaignSaveURL);
    if (this.isValidString(responseData) && this.isValidString(responseData.statusMessage)) {
      if (responseData.statusMessage == constants.SUCCESS_STATUS) {
        if (this.isValidArray(responseData.properties)) {
          let manageCampaignArr = responseData.properties[0].value;
          this.setState({ manageCampaignArr })
        }
        else {
          this.renderDialogModal(strings('manageCampaignScreen.Info'), strings('manageCampaignScreen.errorNoCampaignFound'));
        }
      }
      else {
        // this.renderDialogModal(strings('productScreen.Info'),strings('productScreen.errorNoProductFound'));
      }
    }

    this.renderActivityIndicatorHide()
  }

  render() {
    return (
      <View style={createStyle.container}>
        {this.renderModal()}
        <FloatingButton onFloatButtonPressed={() => {
          Actions.campaign()
        }} />
        <Header isleftArrowDisplay={true} title={strings('manageCampaignScreen.ManageCampaign')} />
        <SearchBar onSearchPressed={(searchText) => { this.setState({ searchText: searchText }) }} />
        <View style={{ margin: 10 }}>
          {this.renderFlatList()}
        </View>
      </View>
    );
  }

  renderFlatList() {
    if (this.isValidArray(campaignConstants.CAMPAIGN_ARRAY)) {
      return (
        <View>
          <FlatList
            data={this.state.manageCampaignArr}
            renderItem={({ item, index }) => this.renderItemView(item, index)}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 10 }}
          />
        </View>
      )
    }
    else {
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: constants.SCREEN_HEIGHT / 3 }}>
          <Text style={createStyle.emptyNoCampaignText}>{strings('manageCampaignScreen.errorNoCampaignFound')}</Text>
        </View>
      )
    }
  }

  renderItemView = (item, index) => {
    let productItem = item.products[0];
    if (this.isValidString(item)) {
      return (
        <TouchableOpacity onPress={() => {
          this.setCampaignDetail(productItem)
          Actions.campaign({ campaignId: item.campaignId, isCampaignUpdate: true })
        }}>
          <View style={{ padding: 10 }}>
            <CardView
              cardElevation={(Platform.OS === 'ios') ? 3 : 8}
              cardMaxElevation={(Platform.OS === 'ios') ? 3 : 8}
              corderOverlap={false}
            >
              <View style={{ flexDirection: 'row', backgroundColor: colorConstants.WHITE_COLOR, paddingTop: 10, paddingLeft: 10, paddingBottom: 10 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: colorConstants.GREY_DARK_COLOR1 }}>{productItem.defaultDetails.asOfDate}</Text>
                  <Text style={{ color: colorConstants.BLACK_COLOR, fontSize: 18, fontWeight: 'bold' }}>{productItem.productName}</Text>
                  <Text style={{ color: (item.campaignStatus === 'PUBLISHED') ? 'green' : colorConstants.SANT_RED_COLOR, fontSize: 14 }}>{item.campaignStatus}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ flex: 1, justifyContent: 'center', }}>
                    <Text style={{ color: colorConstants.BLACK_COLOR, fontSize: 17, }}>{"Revenue - " + productItem.defaultDetails.productPrice}</Text>
                  </View>
                  <View style={{ justifyContent: 'center', marginRight: 5 }}>
                    <Image source={require('../../public/images/right_arrow.png')} style={{ height: 32, width: 24 }} />
                  </View>
                </View>
              </View>
            </CardView>
          </View>
        </TouchableOpacity>
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

