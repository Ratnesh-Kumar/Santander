import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, FlatList, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';
import orderStyle from './orderStyle';
import AppButton from '../../components/AppButton'
var orderConstants = require('./orderConstants');
import SwitchTextInput from '../../components/SwitchTextInput';
import { ScrollView } from 'react-native-gesture-handler';
import { strings } from '../../i18next/i18n';

var orderNumber = 'OrderNumber';
var fullfilled = 'Unfullfilled'
var line1 = 'addressInfo.line1';
var city = "addressInfo.city";
var state = "addressInfo.state";
var country = "addressInfo.country";
var zipcode = "addressInfo.zipcode";
var fullName = "contactInfo.fullName";


export default class EditOrder extends Component {
    render() {
        return (
            <View style={orderStyle.container}>
                <Header title={strings('editOrder.title')} isleftArrowDisplay={true} />

                {this.renderOrderNumber()}
                {this.renderAddressDetail()}
                <ScrollView>
                    {this.renderProductDetail()}
                </ScrollView>
                {this.renderSwitchFields('Enter Tracking Information')}
                <AppButton buttonText={"Mark as FullFilled"} onButtonPressed={() => {
                    Alert.alert('fullfilled')
                }} />

            </View>
        );
    }

    renderSwitchFields(title) {
        return (
            <TouchableOpacity onPress={() => Alert.alert('hello')}>
                <View style={orderStyle.containerStyleWithBorder}>
                    <Text style={orderStyle.textStyle}>{title}</Text>
                    <View
                        style={{ position: 'absolute', right: 10, top: 10 }}>
                        <Image
                            style={{ width: 35, height: 35 }}
                            source={require('../../public/images/right_arrow.png')}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    renderOrderNumber() {
        return (
            <View style={orderStyle.viewContainer}>
                <View style={{ flexDirection: "row" }}>
                    <View style={orderStyle.orderNumberView}>
                        <Text style={orderStyle.orderText}>{strings('editOrder.orderText')} </Text>
                        <Text style={orderStyle.orderText}>{orderNumber}</Text>
                    </View>
                    <View>
                        <Text>{fullfilled}</Text>
                    </View>
                </View>
                <View style={{ height: 0.7, backgroundColor: "#000000", marginTop: 10, width: "95%" }}></View>
            </View>
        )
    }

    renderAddressDetail() {

        return (
            <View style={orderStyle.viewAddressContainer}>
                <Text style={orderStyle.addressText}>{fullName}</Text>
                <Text style={orderStyle.addressText}>{line1}</Text>
                <Text style={orderStyle.addressText}>{city + ', ' + state}</Text>
                <Text style={orderStyle.addressText}>{country}</Text>
                <Text style={orderStyle.addressText}>{zipcode}</Text>
                <View style={{ height: 0.7, backgroundColor: "#000000", marginTop: 10, width: "95%" }}></View>
            </View >
        )

    }
    renderProducts = (item, index) => {
        return (
            <View>
                <View style={{ paddingTop: 10 }}>
                    <Text style={orderStyle.productNameText}>{item.productName}</Text>
                </View>
                <View style={orderStyle.showSKUView}>
                    <Text>{strings("editOrder.SkuText")}</Text>
                    <Text>{item.productSKU}</Text>
                </View>
                <View style={orderStyle.showSKUView}>
                    <View style={{ flexDirection: "row" }}>
                        <Text>{strings("editOrder.QtyText")}</Text>
                        <Text>{item.productQty}</Text>
                    </View>
                    <View style={orderStyle.renderAmtView}>
                        <Text>{strings("editOrder.AmtText")}</Text>
                        <Text>{item.productAmt}</Text>
                    </View>
                </View>
            </View>

        )


    }


    renderProductDetail() {

        return (
            <View style={orderStyle.viewContainer}>
                <Text style={orderStyle.orderText}>{strings("editOrder.productsText")}</Text>

                <FlatList
                    data={orderConstants.PRODUCT_DATA_ARRAY}
                    renderItem={({ item, index }) => this.renderProducts(item, index)}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ paddingBottom: 10 }}
                />

            </View>
        )
    }


}