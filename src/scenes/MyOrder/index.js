import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';
import orderStyle from './orderStyle';
import SearchBar from '../../components/SearchBar';
import BaseComponent from '../../BaseComponent';
import CardView from 'react-native-cardview'
import { TouchableOpacity } from 'react-native-gesture-handler';
var orderConstants = require('./orderConstants');
var colorConstants = require('../../config/colorConstant');

export default class MyOrder extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
      searchText: ''
    }
  }
  render() {
    return (
      <View style={orderStyle.container}>
        <Header title={orderConstants.MANAGE_ORDER} isleftArrowDisplay={false} />
        <SearchBar onSearchPressed={(searchText) => { this.setState({ searchText: searchText }) }} />
        <View style={orderStyle.viewContainer}>
          {/* <View>
            <Text>{"order.orderDate"}</Text>
          </View> */}
          {this.renderFlatList()}
        </View>
      </View>
    );
  }

  renderFlatList() {
    return (
      <View>
        <FlatList
          data={orderConstants.ORDER_DATA_ARRAY}
          renderItem={({ item, index }) => this.renderItemView(item, index)}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 10 }}
        />
      </View>
    )
  }

  renderItemView = (item, index) => {
    if (this.isValidString(item)) {
      return (
        <TouchableOpacity onPress={() => Actions.editOrder()}>
          <View style={{ padding: 10 }}>

            <CardView
              cardElevation={8}
              cardMaxElevation={8}
              corderOverlap={false}
            >
              <View style={{ flexDirection: 'row', backgroundColor: colorConstants.WHITE_COLOR, paddingTop: 10, paddingLeft: 10, paddingBottom: 10 }}>
                <View>
                  <Text style={{ color: colorConstants.GREY_DARK_COLOR1 }}>{item.orderDate}</Text>
                  <Text style={{ color: colorConstants.BLACK_COLOR, fontSize: 18, fontWeight: 'bold' }}>{item.orderNumber}</Text>
                  <Text style={{ color: colorConstants.BLACK_COLOR, fontSize: 18, paddingTop: 2 }}>{item.orderStatus}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: colorConstants.BLACK_COLOR, fontSize: 17, marginLeft: 20 }}>{"Amount - " + item.orderAmount}</Text>
                </View>
                <View style={{ justifyContent: 'center' }}>

                  <Image source={require('../../public/images/right_arrow.png')} style={{ height: 32, width: 24 }} />

                </View>
              </View>

            </CardView>

          </View>
        </TouchableOpacity>
      )
    }
  }
}

