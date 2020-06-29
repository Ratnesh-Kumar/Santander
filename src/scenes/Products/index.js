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
import productStyle from './productStyle';
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
import {fetchProductGET} from '../../services/FetchData';
import ActivityIndicatorView from '../../components/activityindicator/ActivityIndicator';
import DialogModalView from '../../components/modalcomponent/DialogModal';
var productConstants = require('./productConstants');
var constants = require('../../config/Constants');
var globalData = new GlobalData();
var colorConstants = require('../../config/colorConstant');
var itemId="";
var isUpdate="";

export default class ManageProducts extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      isActivityIndicatorVisible: false,
      activityIndicatorText: '',
      isDialogModalVisible: false,
      dialogModalText: '',
      dialogModalTitle: '',
      productArr:[]
    };
    this.setProductDetail("");
  }

  componentDidUpdate(){
  }

  componentWillMount(){
  }

  componentWillReceiveProps(props){
    if(props.isRefresh){
      this.getProductList()
    }
  }

  componentDidMount(){
    this.getProductList()
  }

  async getProductList(){
      this.renderActivityIndicatorShow() 
      let responseData = await fetchProductGET(constants.GET_PRODUCT_LIST+globalData.getBusinessId());
     // let responseData = await fetchProductGET(constants.GET_PRODUCT_LIST+"c3438f53-4dbe-49c4-ba4d-cf4d5188901c");
      if (this.isValidString(responseData) && this.isValidString(responseData.statusMessage )) {
        if (responseData.statusMessage == constants.SUCCESS_STATUS) {
          if (this.isValidArray(responseData.properties)) {
            let productArr = responseData.properties[0].value;
            this.setState({productArr})
          }
          else{
            this.renderDialogModal(strings('productScreen.Info'),strings('productScreen.errorNoProductFound'));
          }
        }
        else{
         // this.renderDialogModal(strings('productScreen.Info'),strings('productScreen.errorNoProductFound'));
        }
      }
     
      this.renderActivityIndicatorHide()
  }



  render() {
    return (
      <View style={productStyle.container}>
        {this.renderModal()}
        <FloatingButton onFloatButtonPressed={()=>{
          Actions.addProduct()
        }}/>
        <Header isleftArrowDisplay={true} title={strings('productScreen.manageProducts')} isCrossIconVisible={false} isleftArrowDisplay={false} />
        <SearchBar placeholder={strings('common.search')} onSearchPressed={(searchText) => { this.setState({ searchText: searchText }) }} />
        <View style={{ margin: 10}}>
          {this.renderFlatList()}
        </View>
      </View>
    );
  }

  renderFlatList() {
    if(this.isValidArray(this.state.productArr)){
      return (
        <View >
          <FlatList
            data={this.state.productArr}
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
          <Text style={productStyle.emptyNoProducttext}>{strings('productScreen.errorNoProductFound')}</Text>
        </View>
      )
    }
    
  }

  renderItemView = (item, index) => {
    if (this.isValidString(item)) {
      return (
        <TouchableOpacity onPress={() => {Actions.addProduct({itemId:item.entityId,isUpdate:true}) }}>
          <View style={{ padding: 10 }}>

            <CardView
              cardElevation={(Platform.OS === 'ios') ? 3 : 8}
              cardMaxElevation={(Platform.OS === 'ios') ? 3 : 8}
              corderOverlap={false}
            >
              <View style={{ flexDirection: 'row', backgroundColor: colorConstants.WHITE_COLOR, paddingTop: 10, paddingLeft: 10, paddingBottom: 10 }}>
                <View style={{flex:1}}>
                  <Text style={{ color: colorConstants.GREY_DARK_COLOR1 }}>{item.productFamily}</Text>
                  <Text style={{ color: colorConstants.BLACK_COLOR, fontSize: 18, fontWeight: 'bold' }}>{item.productName}</Text>
                </View>
                <View style={{flex:1,flexDirection:'row'}}>
                <View style={{ flex: 1, justifyContent: 'center', }}>
                  <Text style={{ color: colorConstants.BLACK_COLOR, fontSize: 17,}}>{strings('productScreen.QuantityText') + item.defaultDetails.quantityOnHand}</Text>                
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

