import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from '../NoResults/style';
var Constants = require('../../Config/Constants');

export default class Error extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Icon
          name="alert-triangle"
          size={100}
          color={Constants.PRIMARY_TEXT_COLOR}
        />
        <Text style={styles.text}>Something Went Wrong</Text>
      </View>
    );
  }
}
