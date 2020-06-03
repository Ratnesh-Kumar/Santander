import React, { Component } from 'react';
import {
    View,
    Switch,
    TouchableOpacity
} from 'react-native';
import quantityStyle from './quantityStyle';
import quantityConstants from './quantityConstant';
import { Text } from 'native-base';
var colorConstant = require('../../config/colorConstant')
export default class QuantityField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantityValue: 1
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <View
                style={quantityStyle.containerStyle}>
                <Text style={quantityStyle.textStyle}>{this.props.title}</Text>
                {this.renderQuantityView()}
            </View>
        );
    }

    renderQuantityView() {

        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                {this.renderMinusView()}
                <View style={{ height: 32, width: 32, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18 }}>{this.state.quantityValue}</Text>
                </View>
                {this.renderPlusView()}
            </View>
        )
    }

    renderMinusView() {
        return (
            <TouchableOpacity onPress={() => {
                this.updateQuantity(false)
            }}
                style={quantityStyle.minusView}>
                <View style={{ width: 12, height: 2, backgroundColor: colorConstant.SANT_BLUE_COLOR }} />
            </TouchableOpacity>
        )
    }

    renderPlusView() {
        return (
            <TouchableOpacity onPress={() => {
                this.updateQuantity(true)
            }}
                style={quantityStyle.plusView}>
                <Text style={{ fontSize: 28, color: colorConstant.SANT_BLUE_COLOR, marginBottom: 2 }} >{'+'}</Text>
            </TouchableOpacity>
        )
    }

    updateQuantity(isPlus) {
        if (isPlus) {
            if (this.state.quantityValue > 0) {
                this.setState({
                    quantityValue: this.state.quantityValue + 1
                })
                this.props.updatedQuantity(this.state.quantityValue + 1);
            }

        } else {
            if (this.state.quantityValue > 1) {
                this.setState({
                    quantityValue: this.state.quantityValue - 1
                })
                this.props.updatedQuantity(this.state.quantityValue - 1);
            }
        }

    }

}
