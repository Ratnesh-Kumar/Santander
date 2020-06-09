import React, { Component } from 'react';
import { View } from 'react-native';
import { WebView, Linking } from 'react-native-webview';
import Header from '../Header';
var colorConstants = require('../../config/colorConstant')

export default class Browser extends Component {
    constructor(props) {
        super(props);
    }
    onNavigationStateChange(webViewState) {
        console.log(webViewState.url)
    }
    render() {
        console.log("##########################################" + this.props.url);
        var publishURL = this.props.url;
        return (
            <View style={{
                flex: 1,
                backgroundColor: colorConstants.WHITE_COLOR
            }}>
                <Header title={"Share"} isCrossIconVisible={false} isSignOutDisplay={false} />
                <View style={{ backgroundColor: 'green' }}>
                    <WebView
                        ref="webview"
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        source={{ publishURL }}
                        onNavigationStateChange={(event) => {
                            if (event.url !== uri) {
                                this.webview.stopLoading();
                                Linking.openURL(event.url).then((data) => {
                                }).catch(() => {
                                    console.log('Something went wrong');
                                });

                            }
                        }}
                    />
                </View>
            </View>
        )
    }
}