/* eslint-disable eqeqeq */
import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Modal from 'react-native-modal';
import dialogModal from './dialogModalStyle.js';
import {Actions} from 'react-native-router-flux';
var isModalFlag = false;
var hideModalPressed = false;
const LOGOUT_MESSAGE = 'You are required to login before using this feature.';

class DialogModalView extends React.Component {
  constructor() {
    super();
    this.state = {
      isModalVisible: false,
    };
  }

  render() {
    isModalFlag = this.props.isVisible;
    if (hideModalPressed) {
      isModalFlag = false;
      hideModalPressed = false;
    }
    return (
      <Modal
        isVisible={isModalFlag}
        onBackButtonPress={() => {
          this.setState({isModalFlag: false});
        }}>
        <View style={dialogModal.container}>
          <View style={dialogModal.topContainer}>
            <View style={dialogModal.messageTopView}>
              <View style={dialogModal.messageView}>
                <Text style={dialogModal.titleMessageText}>
                  {this.props.title}
                </Text>
                <Text style={dialogModal.messageText}>
                  {this.props.message}
                </Text>
              </View>
            </View>
            <View style={dialogModal.modalHorizontalLine} />
            <TouchableOpacity
              onPress={() => {
                this.handleErrorDialog(this.props.message);
              }}>
              <View style={dialogModal.actionView}>
                <Text style={dialogModal.actionText}>OK</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  handleErrorDialog(message) {
    this.props.handleClick();
    if (message != '' && message != undefined) {
      if (message == LOGOUT_MESSAGE) {
        Actions.pop();
        setTimeout(() => {
          Actions.pop({refresh: {logoutFlag: true}});
        }, 100);
      }
    }
  }

  hideModal() {
    hideModalPressed = true;
    isModalFlag = false;
    this.setState({
      isModalVisible: false,
    });
  }
}

export default DialogModalView;
