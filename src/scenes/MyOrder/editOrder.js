import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
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
            <View style={{ paddingTop: 15 }}>
                <SwitchTextInput
                    isDropDownVisbile={true}
                    title={title}
                />
            </View>
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
    renderProducts(productName, productSKU, productQty, productAmt) {
        return (
            <View>
                <View style={{ paddingTop: 10 }}>
                    <Text style={orderStyle.productNameText}>{productName}</Text>
                </View>
                <View style={orderStyle.showSKUView}>
                    <Text>{strings("editOrder.SkuText")}</Text>
                    <Text>{productSKU}</Text>
                </View>
                <View style={orderStyle.showSKUView}>
                    <View style={{ flexDirection: "row" }}>
                        <Text>{strings("editOrder.QtyText")}</Text>
                        <Text>{productQty}</Text>
                    </View>
                    <View style={orderStyle.renderAmtView}>
                        <Text>{strings("editOrder.AmtText")}</Text>
                        <Text>{productAmt}</Text>
                    </View>
                </View>
            </View>

        )


    }
    renderProductTitle() {
        <View style={orderStyle.viewContainer}>

        </View>
    }

    renderProductDetail() {
        let productName = "ProductName";
        let productSKU = "ProductSKU";
        let productQty = "ProductQty";
        let productAmt = "ProductAmt";
        return (
            <View style={orderStyle.viewContainer}>
                <Text style={orderStyle.orderText}>{strings("editOrder.productsText")}</Text>
                {this.renderProducts(productName, productSKU, productQty, productAmt)}
                {this.renderProducts(productName, productSKU, productQty, productAmt)}
                {this.renderProducts(productName, productSKU, productQty, productAmt)}
                {this.renderProducts(productName, productSKU, productQty, productAmt)}
                {this.renderProducts(productName, productSKU, productQty, productAmt)}
                {this.renderProducts(productName, productSKU, productQty, productAmt)}
                {this.renderProducts(productName, productSKU, productQty, productAmt)}
                {this.renderProducts(productName, productSKU, productQty, productAmt)}
                {this.renderProducts(productName, productSKU, productQty, productAmt)}
                {this.renderProducts(productName, productSKU, productQty, productAmt)}

            </View>
        )
    }


}