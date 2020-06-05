import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';
import settingsStyle from './settingsStyle';
import { strings } from '../../i18next/i18n';
var settingConstants = require('./settingsConstants')
var listArr =[];
export default class SettingScreen extends Component {



  render() {
    this.renderListArray()
    return (
      <View style={settingsStyle.container}>
        <Header title={settingConstants.SETTINGS_SCREEN} />
        <View style={settingsStyle.viewContainer} onTouchStart={()=>{Actions.shopSetting()}}>
          <Text style={settingsStyle.welcome}>{strings('shopTab.ShopSettingsTitle')}</Text>
        </View>
        {/* <FlatList
          style={{marginTop:20}}
          data={listArr}
          renderItem={({ item }) => this.renderFlatListItems(item)}
        /> */}
      </View>
    );
  }
  renderListArray() {
    listArr = [
        { title:strings('shopTab.ShopSettingsTitle') , imageResource: settingConstants.SHOP_SETTING , key:settingConstants.FLATLIST_KEY_SHOP},
        { title: strings('shopTab.BusinessProfileTitle'), imageResource: settingConstants.BUSINESS_PROFILE , key:settingConstants.FLATLIST_KEY_BUSINESS },
        { title: strings('shopTab.BusinessSettings'), imageResource: settingConstants.BUSINESS_SETTING , key:settingConstants.FLATLIST_KEY_BUSINESS_SETTING },
        { title: strings('shopTab.EnablePayment'), imageResource: settingConstants.ENABLE_PAYMENT , key:settingConstants.FLATLIST_KEY_ENABLE },
        { title: strings('shopTab.Delete'), imageResource: settingConstants.DELETE , key:settingConstants.FLATLIST_KEY_DELETE },
        { title: strings('shopTab.logout'), imageResource: settingConstants.LOGOUT , key:settingConstants.FLATLIST_KEY_LOGOUT },
    ];
}
  renderFlatListItems(item) {
    return (
        <View  style={settingsStyle.flatListMainView} >
            <TouchableOpacity style={settingsStyle.flatListButtonView} onPress={() => this.selectFlatListItem(item)}>
                <View  style={settingsStyle.flatListSubView} >
                    <Image  style={settingsStyle.imageView} source={item.imageResource} />
                    <Text  style={settingsStyle.flatListTextView}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
selectFlatListItem(item){
  if(item.key === settingConstants.FLATLIST_KEY_SHOP){
    Actions.shopSetting()
  }
  if(item.key === settingConstants.FLATLIST_KEY_BUSINESS){
    Actions.businessProfile()
  }
  if(item.key === settingConstants.FLATLIST_KEY_LOGOUT){
    Actions.login();
  }
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  viewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'black',
  },
});

