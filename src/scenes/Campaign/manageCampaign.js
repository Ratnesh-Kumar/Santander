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
var campaignConstants = require('./campaignConstants');
var constants = require('../../config/Constants');
var globalData = new GlobalData();
var colorConstants = require('../../config/colorConstant');

export default class ManageCampaign extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
        searchText: ''
    };
  }



  render() {
    return (
      <View style={createStyle.container}>
        <FloatingButton onFloatButtonPressed={()=>{
          Actions.campaign()
        }}/>
        <Header isleftArrowDisplay={true} title={strings('manageCampaignScreen.ManageCampaign')} />
        <SearchBar onSearchPressed={(searchText) => { this.setState({ searchText: searchText }) }} />
        <View style={{margin:10}}>
          {this.renderFlatList()}
        </View>
      </View>
    );
  }

  renderFlatList() {
    if(this.isValidArray(campaignConstants.CAMPAIGN_ARRAY)){
      return (
        <View>
          <FlatList
            data={campaignConstants.CAMPAIGN_ARRAY}
            renderItem={({ item, index }) => this.renderItemView(item, index)}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 10 }}
          />
        </View>
      )
    }
    else{
      return (
        <View style={{alignItems:'center',justifyContent:'center',marginTop:constants.SCREEN_HEIGHT/3}}>
          <Text style={createStyle.emptyNoCampaignText}>{strings('manageCampaignScreen.errorNoCampaignFound')}</Text>
        </View>
      )
    }
  }

  renderItemView = (item, index) => {
    if (this.isValidString(item)) {
      return (
        <TouchableOpacity onPress={() => { }}>
          <View style={{ padding: 10 }}>
            <CardView
              cardElevation={(Platform.OS === 'ios') ? 3 : 8}
              cardMaxElevation={(Platform.OS === 'ios') ? 3 : 8}
              corderOverlap={false}
            >
              <View style={{ flexDirection: 'row', backgroundColor: colorConstants.WHITE_COLOR, paddingTop: 10, paddingLeft: 10, paddingBottom: 10 }}>
                <View style={{flex:1}}>
                  <Text style={{ color: colorConstants.GREY_DARK_COLOR1 }}>{item.campaignDate}</Text>
                  <Text style={{ color: colorConstants.BLACK_COLOR, fontSize: 18, fontWeight: 'bold' }}>{item.campaignName}</Text>
                  <Text style={{ color: (item.publishStatus == 'Published') ? 'green' : colorConstants.SANT_RED_COLOR  , fontSize: 14 }}>{item.publishStatus}</Text>
                </View>
                <View style={{flex:1,flexDirection:'row'}}>
                <View style={{ flex: 1, justifyContent: 'center', }}>
                  <Text style={{ color: colorConstants.BLACK_COLOR, fontSize: 17,}}>{"Revenue - " + item.cost}</Text>                
                  </View>
                <View style={{ justifyContent: 'center', }}>
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
}

