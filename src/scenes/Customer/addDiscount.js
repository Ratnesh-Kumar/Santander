import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    KeyboardAvoidingView,
    TouchableOpacity,
    ScrollView,
    Alert,
    Keyboard,
    Switch,
} from 'react-native';
import BaseComponent from '../../BaseComponent';
import TextInputMaterial from '../../components/textInputMaterial';
import Header from '../../components/Header';
import AppButton from '../../components/AppButton';
import { strings } from '../../i18next/i18n';
import { Actions } from 'react-native-router-flux';
import GlobalData from '../../utils/GlobalData';
import customerStyle from './customerStyles';
import RadioButton from '../../components/RadioButton'
var constants = require('../../config/Constants');
var colorConstant = require('../../config/colorConstant');
var customerConstants = require('./customerConstant')
var globalData = new GlobalData();

export default class AddDiscount extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            reason: '',
            isAmount: true,
            isPercentage: false
        }
    }
    render() {
        return (
            <View style={customerStyle.renderContainer}>
                <Header isleftArrowDisplay={true} isCrossIconVisible={false} title={'Add Discount'} />
                <View style={{ marginTop: 10 }}>
                    {this.renderRadioButtons()}
                    {this.renderAmount()}
                    <AppButton buttonText={'Add Discount'} onButtonPressed={() => { }} />
                </View>
            </View>
        )
    }

    renderRadioButtons() {
        return (
            <View style={{ flexDirection: 'row', paddingLeft: 20 }}>
                <RadioButton
                    isSelected={this.state.isAmount}
                    size={14}
                    innerColor={this.state.isAmount ? '#ec0000' : ''}
                    outerColor={this.state.isAmount ? '#ec0000' : 'gray'}
                    onPress={() => this.setState({
                        isAmount: true,
                        isPercentage: false
                    })}
                    title={strings('addCustomer.AmountRadioText')}
                />
                <View style={{ paddingLeft: 20 }}>
                    <RadioButton
                        isSelected={this.state.isPercentage}
                        size={14}
                        innerColor={this.state.isPercentage ? '#ec0000' : ''}
                        outerColor={this.state.isPercentage ? '#ec0000' : 'gray'}
                        onPress={() => this.setState({
                            isPercentage: true,
                            isAmount: false
                        })}
                        title={strings('addCustomer.PercentRadioText')}
                    />
                </View>
            </View>
        )
    }

    renderAmount() {
        return (
            <View style={customerStyle.validAddressViewContainer}>
                <View style={customerStyle.inputWrapper}>
                    <View style={customerStyle.validFormSecondFieldView}>
                        <TextInputMaterial
                            blurText={this.state.amount}
                            refsValue={'Amount'}
                            ref={'Amount'}
                            label={'Amount ($)'}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={amount => this.setState({ amount })}
                            returnKeyType={'next'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={customerStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.amount}
                            textInputName={this.state.amount}
                            //errorText={strings('BuisnessProfile.FirstNameTextInputError')}
                            underlineHeight={2}
                            keyboardType="email-address"
                            onFocus={() => { }}

                            onSubmitEditing={event => {
                                this.refs.Reason.focus();
                            }}
                        />
                    </View>
                </View>
                <View style={customerStyle.inputWrapper}>
                    <View style={customerStyle.validFormSecondFieldView}>
                        <TextInputMaterial
                            blurText={this.state.reason}
                            refsValue={'Reason'}
                            ref={'Reason'}
                            label={'Reason'}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={reason => this.setState({ reason })}
                            returnKeyType={'next'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={customerStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.reason}
                            textInputName={this.state.reason}
                            //errorText={strings('BuisnessProfile.FirstNameTextInputError')}
                            underlineHeight={2}
                            keyboardType="email-address"
                            onFocus={() => { }}
                            onSubmitEditing={event => {
                                Keyboard.dismiss()
                            }}
                        />
                    </View>
                </View>
            </View>
        )
    }
}