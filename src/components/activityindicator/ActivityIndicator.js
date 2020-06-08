import React from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
import Modal from 'react-native-modal';
import indicator from './indicatorStyle.js';
class ActivityIndicatorView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
    };
  }
  render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        backdropOpacity={0.1}
        onBackButtonPress={() => {
          this.setState({isModalFlag: false});
        }}>
        <View style={indicator.container}>
          <View style={indicator.containerView}>
            <ActivityIndicator
              animating={true}
              style={indicator.activityIndicator}
              size="large"
            />
            <View style={indicator.messageView}>
              <Text style={indicator.messageText}>{this.props.text}</Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default ActivityIndicatorView;
