import React, { Component } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';
import campaignStyle from './campaignStyle';
import { strings } from '../../i18next/i18n';
import * as RNLocalize from "react-native-localize";
// import {RNFirebase, firestore} from 'react-native-firebase';
import { getTermsAndConditions, getPrivacyPolicy, getRemoteConfig } from '../../config/firebaseFirestore';
import GlobalData from '../../utils/GlobalData';
import BaseComponent from '../../BaseComponent';
import TextInputMaterial from '../../components/textInputMaterial';
var globalData = new GlobalData();
var constants = require('../../config/Constants');
var compaignConstants = require('./campaignConstants')
var colorConstant = require('../../config/colorConstant')
export default class CampaignScreen extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            tagName: '',
            tagNameList: []
        }
    }

    async componentDidMount() {

    }
    render() {
        return (
            <View style={campaignStyle.container}>
                {this.renderInputText()}
                {this.renderTagContainerView()}
            </View>
        );
    }

    renderTagContainerView() {
        let tagList = [];
        for (let i = 0; i < this.state.tagNameList.length; i++) {
            tagList.push(this.renderTagView(this.state.tagNameList[i]))
        }
        return (
            <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 20, marginRight: 20, alignSelf: 'flex-start', flexDirection: 'row', width: constants.SCREEN_WIDTH - 20, flexWrap: 'wrap' }}>
                {tagList}
            </View>
        )
    }

    renderTagView(tagName) {
        return (
            <View style={{ height: 32, marginTop: 10, marginRight: 10, backgroundColor: colorConstant.GRAY_MEDIUM_COLOR, padding: 10, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => {
                    this.state.tagNameList.pop(tagName)
                    this.props.updatedList(this.state.tagNameList)
                    this.setState({
                        tagNameList: this.state.tagNameList
                    })
                }}>
                    <Image source={require('../../public/images/Close_icon.png')} style={{ height: 12, width: 12, tintColor: colorConstant.GREY_DARK_COLOR1 }} />
                </TouchableOpacity>
                <Text style={{ marginLeft: 5, color: colorConstant.GREY_DARK_COLOR1 }}>{tagName}</Text>
            </View>
        );
    }

    renderInputText() {
        return (
            <View style={{ alignItems: 'center' }}>
                <View style={campaignStyle.inputWrapper}>
                    <View style={campaignStyle.validFormSubView}>
                        <TextInputMaterial
                            blurText={this.state.tagName}
                            refsValue={'optional'}
                            ref={'optional'}
                            label={this.props.labelName}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={text => this.setState({ tagName: text })}
                            returnKeyType={'done'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            onFocus={() => { this.setState({ tagName: '' }) }}
                            onBlur1={() => {this.addItemToTagList()}}
                            style={campaignStyle.input}
                            placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={constants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.tagName}
                            textInputName={this.state.tagName}
                            errorText={strings('createCampaign.campaignNameErrorText')}
                            underlineHeight={2}
                            keyboardType="email-address"
                            isDefaultView={true}
                            onSubmitEditing={event => {
                                
                            }}
                        />
                    </View>
                </View>
            </View>
        );
    }

    addItemToTagList(){
        if (this.isValidString(this.state.tagName) && this.state.tagNameList.length < 11) {
            this.state.tagNameList.push(this.state.tagName)
            this.props.updatedList(this.state.tagNameList)
            this.setState({
                tagNameList: this.state.tagNameList,
                tagName:''
            })
        }
    }

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    viewContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: 'black',
    },
});

