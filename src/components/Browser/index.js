import React, { Component } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
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
        return (
            <View style={{
                flex:1,
                backgroundColor: colorConstants.WHITE_COLOR
            }}>
                <Header title={"Share"} isCrossIconVisible={false} isSignOutDisplay={false} />
                <View style={{backfaceVisibility:'green'}}>
                    <WebView
                        ref="webview"
                        onNavigationStateChange={()=>this.onNavigationStateChange.bind(this)}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        source={{ url: this.props.url }}
                    />
                </View>
            </View>
        )
    }
}