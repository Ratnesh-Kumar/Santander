import React, { Component } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import Header from '../Header';
var colorConstants = require('../../config/colorConstant')
var constants = require('../../config/Constants')

export default class Browser extends Component {
    constructor(props) {
        super(props);
    }
    onNavigationStateChange(webViewState) {
        console.log("################# onNavigationStateChange : " + webViewState.url)
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
                <Header title={"Share"} isCrossIconVisible={false} isSignOutDisplay={false} />
                <View style={{ flex: 1 }}>
                    <WebView
                        ref="webview"
                        source={{ uri: publishURL }}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        onNavigationStateChange={() => this.onNavigationStateChange.bind(this)}
                    />
                </View>
            </View>
        )
    }
}