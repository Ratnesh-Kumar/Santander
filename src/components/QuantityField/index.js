import React, { Component } from 'react';
import {
    View,
    Switch,
    TouchableOpacity,
    TextInput,
    Image,
    Alert
} from 'react-native';
import quantityStyle from './quantityStyle';
import quantityConstants from './quantityConstant';
import { Text } from 'native-base';
import CardView from 'react-native-cardview'
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
        if(this.props.isVarientQuantityView){
       return(
        <View style={{paddingTop:20,paddingLeft:20,paddingRight:20}}>
        <CardView 
        cardElevation={8}
        cardMaxElevation={8}
        corderOverlap={false}
      >
        <View style={{ flexDirection: 'row', backgroundColor: colorConstant.WHITE_COLOR, paddingTop: 10, paddingLeft: 10, paddingBottom: 10 }}>
        <View style>
        <Text style={{ paddingTop:5,color: colorConstant.BLACK_COLOR,fontSize:16,position:'absolute' }}>{this.props.title}
        </Text>
        </View>
        <View style={{ flex:1,justifyContent: 'center', alignItems: 'center' }}>
        {this.renderQuantityView()}
        </View>
        <TouchableOpacity onPress={() => this.props.onButtonPressed()}>
        <Image source={require('../../public/images/right_arrow.png')} style={{ height: 32, width: 24 }} />
        </TouchableOpacity>
         </View>
        </CardView>
        </View>
        
       );
        }
        else{
            return (
                <View
                    style={quantityStyle.containerStyle}>
                    <Text style={quantityStyle.textStyle}>{this.props.title}</Text>
                    {this.renderQuantityView()}
                </View>
            );
        }
    }

    renderQuantityView() {

        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                {this.renderMinusView()}
                <View style={{ height: 32, width: 60,borderWidth:1,borderColor: colorConstant.SANT_BLUE_COLOR, justifyContent: 'center', alignItems: 'center' }}>
                    <TextInput 
                    numeric value
                    keyboardType={'numeric'}
                    onChangeText={quantityValue=>this.changeQtyValue(quantityValue)}
                    style={{ fontSize: 18 }}
                    >{this.state.quantityValue}</TextInput>
                </View>
                {this.renderPlusView()}
            </View>
        )
    }

    changeQtyValue(quantityValue){
        if (quantityValue > 0) {
            this.setState({
                quantityValue: quantityValue 
            })
            this.props.updatedQuantity(quantityValue);
        }

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
            if (parseInt(this.state.quantityValue) > 0) {
                this.setState({
                    quantityValue: parseInt(this.state.quantityValue) + 1
                })
                this.props.updatedQuantity(parseInt(this.state.quantityValue) + 1);
            }

        } else {
            if (parseInt(this.state.quantityValue) > 1) {
                this.setState({
                    quantityValue: parseInt(this.state.quantityValue) - 1
                })
                this.props.updatedQuantity(parseInt(this.state.quantityValue) - 1);
            }
        }

    }

}
