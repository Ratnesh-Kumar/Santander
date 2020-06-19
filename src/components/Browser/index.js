import React, { Component } from 'react';
import { View , Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { WebView } from 'react-native-webview';
import ActivityIndicatorView from '../../components/activityindicator/ActivityIndicator';
import { fetchCampaignPUT } from '../../services/FetchData';
import Header from '../Header';
import BaseComponent from '../../BaseComponent';
import GlobalData from '../../utils/GlobalData';
var colorConstants = require('../../config/colorConstant')
var constants = require('../../config/Constants')
var globalData = new GlobalData();
export default class Browser extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            isActivityIndicatorVisible: false,
            activityIndicatorText: 'Loading...',
        };
    }
    onNavigationStateChange(webViewState) {
       // console.log("################# onNavigationStateChange : " + webViewState.url)
        const { url } = (webViewState);
        console.log('URL: -- ', url);
        if (!url) return true;
        if (url.includes('dialog/share/submit')) {
            console.log('URL: inside dialog share modal -- ', url);
            setTimeout(() => {
                this.callPublishAPI()
            }, 100)
            return true;
        }
        if (!webViewState || (url === this.props.url)){
            return true;
        }
    }
    render() {
        //console.log("##########################################" + this.props.url);
        var publishURL = this.props.url;
        return (
            // <WebView source={{ uri: this.props.url }} />
            <View style={{
                flex: 1,
                backgroundColor: colorConstants.BLUE_COLOR
            }}>
                {this.renderIndicator()}
                <Header title={"Share"} isCrossIconVisible={false} isSignOutDisplay={false} />
                <View style={{ flex: 1 }}>
                    <WebView
                        ref="webview"
                        source={{ uri: publishURL }}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                    />
                </View>
            </View>
        )
    }
    renderIndicator() {
        if (this.state.isActivityIndicatorVisible) {
            return (
                <ActivityIndicatorView isVisible={this.state.isActivityIndicatorVisible} text={this.state.activityIndicatorText} />
            )
        }
    }
    renderActivityIndicatorShow() {
        this.setState({
            isActivityIndicatorVisible: true,
            activityIndicatorText: 'Loading...'
        });
    }
    renderActivityIndicatorHide() {
        this.setState({
            isActivityIndicatorVisible: false,
            activityIndicatorText: ''
        });
    }

    async callPublishAPI(){
        this.renderActivityIndicatorShow();
        let campaignRequestResponse = this.getCampaignResponse()
        let campaignID = this.getCampaignID();
        console.log('######## campaignID ',JSON.stringify(campaignID))
        console.log('######## campaignResponse in browser file ',JSON.stringify(campaignRequestResponse))
        let campaignUpdateURL = constants.GET_CAMPAIGN_DETAIL.replace(constants.BUISNESS_ID, globalData.getBusinessId())+campaignID;
        console.log('######## campaignUpdateURL ',JSON.stringify(campaignUpdateURL))
        let responseData = await fetchCampaignPUT(campaignUpdateURL, campaignRequestResponse)
        console.log('######## PUBLISHED RESPONSE ',JSON.stringify(responseData))
        if (this.isValidString(responseData) && this.isValidString(responseData.statusMessage)) {
            if (responseData.statusMessage === constants.SUCCESS_STATUS) {
                this.renderActivityIndicatorHide()
                setTimeout(() => {
                    this.showFacebookAlert()
                }, 100)
            }
        }
        this.renderActivityIndicatorHide()
    }

    showFacebookAlert() {
        Alert.alert(
          'Info',
          'Your campaign published successfully.',
          [
            {
              text: 'OK', onPress: () => {
                 // Actions.pop({refresh: {sendData: true}} )
                Actions.manageCampaign({ type: 'reset' });
                setTimeout(() => {
                  Actions.refresh({ isRefresh: true });
                }, 100)
             }
            },
          ]
        );
      }
}