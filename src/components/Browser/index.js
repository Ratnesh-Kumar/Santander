import React, { Component } from 'react';
import { View , Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { WebView } from 'react-native-webview';
import ActivityIndicatorView from '../../components/activityindicator/ActivityIndicator';
import Header from '../Header';
var colorConstants = require('../../config/colorConstant')
var constants = require('../../config/Constants')

export default class Browser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActivityIndicatorVisible: true,
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
                this.showFacebookAlert()
            }, 100)
            return true;
        }
        if (!webViewState || (url === this.props.url)){
            this.renderActivityIndicatorHide();
            return true;
        }
    }
    render() {
        console.log("##########################################" + this.props.url);
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

    showFacebookAlert() {
        Alert.alert(
          'Info',
          'Your campaign published successfully.',
          [
            {
              text: 'OK', onPress: () => {
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