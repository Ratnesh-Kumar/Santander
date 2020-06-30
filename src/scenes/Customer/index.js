import React, { Component } from 'react';
import {
    View,
    FlatList,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import CardView from 'react-native-cardview';
import customerStyle from './customerStyles';

import Header from '../../components/Header';
import FloatingButton from '../../components/FloatingButton';
import { strings } from '../../i18next/i18n';
import { Actions } from 'react-native-router-flux';
import GlobalData from '../../utils/GlobalData';
import SearchBar from '../../components/SearchBar';
import BaseComponent from '../../BaseComponent';
var constants = require('../../config/Constants');
var globalData = new GlobalData();
var colorConstants = require('../../config/colorConstant');
var customerConst = require('./customerConstant')

export default class ManageCustomers extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
        }
    }

    render() {
        return (
            <View style={customerStyle.renderContainer}>
                <FloatingButton onFloatButtonPressed={() => {
                }} />
                <Header isleftArrowDisplay={true} title={strings('addCustomer.title')} isCrossIconVisible={false} isleftArrowDisplay={true} />
                <SearchBar placeholder={strings('common.search')} onSearchPressed={(searchText) => { this.setState({ searchText: searchText }) }} />
                <View style={{ margin: 10 }}>
                    {this.renderFlatList()}
                </View>
            </View>
        )
    }
    renderFlatList() {
        return (
            <View>
                <FlatList
                    data={customerConst.CUSTOMER_DATA_ARRAY}
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
                <TouchableOpacity onPress={() => { }}>
                    <View style={{ padding: 10 }}>

                        <CardView
                            cardElevation={8}
                            cardMaxElevation={8}
                            corderOverlap={false}
                        >
                            <View style={{ flexDirection: 'row', backgroundColor: colorConstants.WHITE_COLOR, paddingTop: 10, paddingLeft: 10, paddingBottom: 10 }}>
                                <View style={{width:40,height:40,borderRadius:20,backgroundColor:'#dbdbdb',borderColor:"#707070",borderWidth:1}}></View>
                                <View style={{ flex: 1,paddingLeft:10 }}>
                                    <Text style={{ color: colorConstants.BLACK_COLOR, fontSize: 14, fontWeight: 'bold' }}>{item.name}</Text>
                                    <View style={{paddingTop:5, flexDirection: 'row' }}>
                                        <Text style={{ color: colorConstants.BLACK_COLOR, }}>{item.order + " order - "}</Text>
                                        <Text style={{ color: colorConstants.BLACK_COLOR, }}>{item.orderAmount}</Text>
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