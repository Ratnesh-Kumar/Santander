import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';
import shopStyle from './shopTabStyle';
import { strings } from '../../i18next/i18n';
var shopConstants = require('./shopTabConstants')
var listArr =[];
export default class ShopTabScreen extends Component {



  render() {
    this.renderListArray()
    return (
      <View style={shopStyle.container}>
        <Header title={shopConstants.SETTINGS_SCREEN} />
        <View style={shopStyle.viewContainer} onTouchStart={()=>{Actions.shopSetting()}}>
          <Text style={shopStyle.welcome}>{strings('shopTab.ShopSettingsTitle')}</Text>
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
        { title:strings('shopTab.ShopSettingsTitle') , imageResource: shopConstants.SHOP_SETTING , key:shopConstants.FLATLIST_KEY_SHOP},
        { title: strings('shopTab.BusinessProfileTitle'), imageResource: shopConstants.BUSINESS_PROFILE , key:shopConstants.FLATLIST_KEY_BUSINESS },
        { title: strings('shopTab.BusinessSettings'), imageResource: shopConstants.BUSINESS_SETTING , key:shopConstants.FLATLIST_KEY_BUSINESS_SETTING },
        { title: strings('shopTab.EnablePayment'), imageResource: shopConstants.ENABLE_PAYMENT , key:shopConstants.FLATLIST_KEY_ENABLE },
        { title: strings('shopTab.Delete'), imageResource: shopConstants.DELETE , key:shopConstants.FLATLIST_KEY_DELETE },
        { title: strings('shopTab.logout'), imageResource: shopConstants.LOGOUT , key:shopConstants.FLATLIST_KEY_LOGOUT },
    ];
}
  renderFlatListItems(item) {
    return (
        <View  style={shopStyle.flatListMainView} >
            <TouchableOpacity style={shopStyle.flatListButtonView} onPress={() => this.selectFlatListItem(item)}>
                <View  style={shopStyle.flatListSubView} >
                    <Image  style={shopStyle.imageView} source={item.imageResource} />
                    <Text  style={shopStyle.flatListTextView}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
selectFlatListItem(item){
  if(item.key === shopConstants.FLATLIST_KEY_SHOP){
    Actions.shopSetting()
  }
  if(item.key === shopConstants.FLATLIST_KEY_BUSINESS){
    Actions.businessProfile()
  }
  if(item.key === shopConstants.FLATLIST_KEY_LOGOUT){
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

