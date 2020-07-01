/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-native/no-inline-forgotPasswordStyle */
/* eslint-disable react/no-string-refs */
import React, { Component } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard
} from 'react-native';
import CardView from 'react-native-cardview';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import AppButton from '../../components/AppButton';
import { strings } from '../../i18next/i18n';
import { Actions } from 'react-native-router-flux';
import GlobalData from '../../utils/GlobalData';
import BaseComponent from '../../BaseComponent';
import ActivityIndicatorView from '../../components/activityindicator/ActivityIndicator';
import DialogModalView from '../../components/modalcomponent/DialogModal';
import { ScrollView } from 'react-native-gesture-handler';
import ProductListView from './productListView'
import orderStyle from './orderStyle';
var constants = require('../../config/Constants');
var globalData = new GlobalData();
var colorConstants = require('../../config/colorConstant');
var orderConstants = require('./orderConstants');
var productSelectedArr = [];

export default class CreateOrder extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      isActivityIndicatorVisible: false,
      activityIndicatorText: '',
      isDialogModalVisible: false,
      dialogModalText: '',
      dialogModalTitle: '',
      orderNotes:'',
      productArr:[],
    };
    productSelectedArr=[];
  }

  componentDidUpdate(){
  }

  componentWillMount(){
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (this.isValidString(props.productInfo)) {
      this.updateProductArray(props.productInfo);
    }
  }

  componentDidMount(){
  }


  updateProductArray(productInfo){
      if(this.isValidString(productInfo)){
        let productDict = {};
        productDict.productSKU = "123456";//productInfo.sku;
        productDict.Amount = productInfo.quantityOnHand
        productDict.productTitle = productInfo.variantName;
        productDict.variant = "COLORS";//productInfo.tags;
        productSelectedArr.push(productDict)
      }
      this.setState({
        productArr:productSelectedArr
      })
  }


  render() {
    return (
      <View style={orderStyle.container}>
        {this.renderModal()}
        <Header isleftArrowDisplay={true} title={strings('createOrder.title')} isCrossIconVisible={false} />
        <ScrollView style={{flex:1,marginTop:10}}>
           {this.renderAddProduct()}
           {this.renderAddCustomer()}
           {this.renderNoteView()}
        </ScrollView>    
      </View>
    );
  }
  renderAddCustomer(){
    return(
        <View style={orderStyle.subviews}>
            {this.renderSubtitleHeader(strings('createOrder.Customertext'))}
            <View style={orderStyle.addView}>
             <TouchableOpacity onPress={() => { }} >
               <Text style={orderStyle.subViewTitleText}>{'+ ' + strings('createOrder.addCustomertext')}</Text>
             </TouchableOpacity>
           </View>
        </View>    
    );      
 }

  renderAddProduct(){
     if(this.isValidArray(this.state.productArr)){
      return(
        <View style={orderStyle.subviews}>
            {this.renderSubtitleHeader(strings('createOrder.itemText'))}
            <ProductListView
              productVariantArr = {this.state.productArr}
            />
            <View style={orderStyle.horizontalLine}/>
        </View>    
      ); 
     }
     else {
       return (
         <View style={orderStyle.subviews}>
           {this.renderSubtitleHeader(strings('createOrder.itemText'))}
           <View style={orderStyle.addView}>
             <TouchableOpacity onPress={() => { Actions.manageProduct({ isComingFromOrders: true }) }} >
               <Text style={orderStyle.subViewTitleText}>{'+ ' + strings('createOrder.addItemText')}</Text>
             </TouchableOpacity>
           </View>
         </View>
       ); 
     }     
  }

  renderNoteView(){
    return(
      <View style={orderStyle.subviews}>
          {this.renderSubtitleHeader('NOTE')}
          <View style={{  borderWidth: 1, borderColor: 'gray', height: 80, marginTop:10 }}>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder={strings('createOrder.addNotesPlaceholder')}
              ref={'orderNotes'}
              placeholderTextColor={colorConstants.GREY_DARK_COLOR}
              autoCapitalize="none"
              style={{ fontSize: 16, textAlignVertical: 'top', paddingLeft: 10 }}
              multiline={true}
              maxLength={250}
              underlineHeight={2}
              underlineColor={colorConstants.SANT_TEXT_INPUT_DEFAULT}
              numberOfLines={3}
              value={this.state.orderNotes}
              onChangeText={text => { this.setState({ orderNotes: text }) }}
              onSubmitEditing={event => {
                Keyboard.dismiss()
              }}
            />
          </View>
      </View>    
  );
  }

  renderSubtitleHeader(subtitle){
    return(
      <View>
        <Text style={orderStyle.subtitleheaderText}>{subtitle}</Text>
      </View>  
    );
  }


  renderActivityIndicatorShow() {
    this.setState({
      isActivityIndicatorVisible: true,
      activityIndicatorText: strings('common.loading')
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

