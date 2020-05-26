import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from './style';
var Constants = require('../../Config/Constants');

export default class NoResults extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Icon name="info" size={100} color={Constants.PRIMARY_TEXT_COLOR} />
        <Text style={styles.text}>No Results Found</Text>
      </View>
    );
  }
}
