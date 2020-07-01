import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Platform } from 'react-native';
import { strings } from '../../i18next/i18n';
import * as RNLocalize from "react-native-localize";
// import {RNFirebase, firestore} from 'react-native-firebase';
import GlobalData from '../../utils/GlobalData';
import BaseComponent from '../../BaseComponent';
import TextInputMaterial from '../../components/textInputMaterial';
import AppButton from '../../components/AppButton';
import orderStyle from './orderStyle';
var constants = require('../../config/Constants');
var globalData = new GlobalData();
var colorConstants = require('../../config/colorConstant');
var orderConstants = require('./orderConstants');


export default class ProductList extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            variantArr: this.isValidArray(props.productVariantArr) ? props.productVariantArr :[]
        }
    }

    async componentDidMount() {

    }
    render() {
        console.log('######### this.state.variantArr : ',this.state.variantArr);
        return (
            <View style={orderStyle.container}>
                {this.renderProductItems()}
            </View>
        );
    }
    renderProductItems(){
        let productList = [];
        for (let i = 0; i < this.state.variantArr.length; i++) {
            productList.push(this.renderListView(this.state.variantArr[i]))
        }
        return (
            <View>
                {productList}
            </View>
        ) 
    }
    renderListView(item){
            return (
                <View style={{paddingTop:5,paddingBottom:5}}>
                    <Text style={{ paddingTop:5,paddingBottom:5,fontSize: 18, fontWeight: 'bold' }}>{item.productTitle+" - "+item.variant}</Text>
                    <Text style={{fontSize: 18}}>{"SKU - "+item.productSKU}</Text>
                    <Text style={{paddingTop:5,paddingBottom:5,fontSize: 18,  }}>{"Amount - "+item.Amount}</Text>
                </View>
            )
    }

}


