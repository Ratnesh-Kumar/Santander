'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  AppState,
  Text
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Actions } from 'react-native-router-flux';
var constants = require('../../config/Constants');
var createReactClass = require('create-react-class');
var isBarcodeRead = false;

//const QR_IMAGE = require('../../../public/images/QRimage.webp')
var QRCodeScreen = createReactClass({
  componentWillMount() {
    this.setState({
      appState: AppState.currentState
    });
    this.barCodeFlag = true;
  },
  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  },

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  },
  _handleAppStateChange: function (nextAppState) {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
    }
    this.setState({ appState: nextAppState });
  },

  propTypes: {
    cancelButtonVisible: PropTypes.bool,
    cancelButtonTitle: PropTypes.string,
    onSucess: PropTypes.func,
    onCancel: PropTypes.func,
  },

  getDefaultProps: function () {
    return {
      cancelButtonVisible: false,
      cancelButtonTitle: 'Cancel',
    };
  },


  _onSucess: function (result) {
    //BARCODE RESULT{"type":"org.gs1.EAN-13","data":"0032917001023","bounds":{"size":{"width":"201.889163","height":"36.695842"},"origin":{"x":"98.329225","y":"319.208274"}}}
  },

  _onPressCancel: function () {
    // Actions.pop();
    Actions.pop()
    this.barCodeFlag = false;
  },

  _onBarCodeRead: function (result) {
    console.log("####### result data - " + result.data);
    if (!isBarcodeRead) {
      isBarcodeRead = true
      Actions.pop({ refresh: { qrcodeData: result.data } })
      setTimeout(() => {
        Actions.refresh({
          qrcodeData: result.data
        });
      }, 10);
    }

  },
  showAlert: function () {
    Alert.alert(
      '',
      'Sorry, this barcode is not recognized. Please try scanning again or browse for this product within our app.',
      [
        { text: 'Go Back', onPress: () => { Actions.pop() } },
        {
          text: 'Scan Again', onPress: () => {
            Actions.refresh();
          }
        },
      ],
      { cancelable: false }
    )
  },


  render: function () {
    var cancelButton = null;

    if (this.props.cancelButtonVisible) {
      cancelButton = <CancelButton onPress={this._onPressCancel} title={this.props.cancelButtonTitle} />;
    }
    if (this.state.appState !== "background") {
      return (
        <View accessibilityLabel="qrCodeScreen_view_container"
          testID="qrCodeScreen_view_container" >
          <View accessibilityLabel="qrCodeScreen_view_cancel"
            testID="qrCodeScreen_view_cancel" style={{ backgroundColor: 'black', height: 50 }} >
            <TouchableOpacity onPress={() => this._onPressCancel()}
              accessibilityLabel="qrCodeScreen_button_cancel" accessible={false}
              testID="qrCodeScreen_button_cancel">
              <Text style={{ color: 'red', textAlign: 'right', paddingTop: 25, paddingRight: 10 }}
                accessibilityLabel="qrCodeScreen_text_cancel"
                testID="qrCodeScreen_text_cancel">CANCEL</Text>
            </TouchableOpacity>
          </View>
          <RNCamera onBarCodeRead={this._onBarCodeRead} style={styles.camera} accessibilityLabel="qrCodeScreen_view_camera"
            testID="qrCodeScreen_view_camera"
            onStatusChange={({ camera, cameraStatus, recordAudioPermissionStatus }) => {
              if (cameraStatus == 'NOT_AUTHORIZED') {
                Alert.alert(
                  'Santander Camera Permission',
                  'Santander needs access to your camera so you can scan awesome products.',
                  [
                    { text: 'ok', onPress: () => Actions.pop(), style: 'cancel' },
                  ],
                  { cancelable: false }
                )
              }
            }}>
            <View accessibilityLabel="qrCodeScreen_view_cameraScanner"
              testID="qrCodeScreen_view_cameraScanner" style={styles.rectangleContainer}>
              <View style={styles.rectangle}>
              </View>
            </View>
            {cancelButton}
          </RNCamera>
        </View>
      );
    } else {
      return <View />
    }
  },
});

var CancelButton = createReactClass({
  render: function () {
    return (
      <View accessibilityLabel="cancelButton_view_container"
        testID="cancelButton_view_container" style={styles.cancelButton}>

        <TouchableOpacity onPress={this.props.onPress}
          accessibilityLabel="cancelButton_button_title" accessible={false}
          testID="cancelButton_button_title">
          <Text style={styles.cancelButtonText}
            accessibilityLabel="cancelButton_text_title"
            testID="cancelButton_text_title">{this.props.title}</Text>
        </TouchableOpacity>
      </View>
    );
  },
});

var styles = StyleSheet.create({

  camera: {
    height: constants.SCREEN_HEIGHT - 50,
    alignItems: 'center',
  },

  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  rectangle: {
    height: 250,
    width: 250,
    borderWidth: 2,
    borderColor: '#00FF00',
    backgroundColor: 'transparent',
  },

  cancelButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 3,
    padding: 15,
    width: 100,
    bottom: 10,
  },
  cancelButtonText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#0097CE',
  },
});

module.exports = QRCodeScreen;
