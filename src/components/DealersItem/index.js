import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableHighlight, ImageBackground} from 'react-native';
import Constants from '../../Config/Constants';
import styles from './style';

const DealersItem = ({dealer, event}) => (
  <TouchableHighlight onPress={() => event(dealer.name)}>
    <View style={styles.container}>
      {dealer.id ? (
        <View style={styles.listitem}>
          <Text style={styles.title}>
            {dealer.name}, {dealer.username}
          </Text>
          <Text style={styles.subtitle}>{dealer.email}</Text>
        </View>
      ) : (
        <ImageBackground
          source={{uri: Constants.DEFAULT_CITY_IMG}}
          style={styles.backgroundImage}>
          <View style={styles.listitem}>
            <Text style={styles.title}>All Tyre Dealers</Text>
            <Text style={styles.subtitle}>See All TBCC Tyre Dealers List</Text>
          </View>
        </ImageBackground>
      )}
    </View>
  </TouchableHighlight>
);

DealersItem.propTypes = {
  dealer: PropTypes.object.isRequired,
  event: PropTypes.func.isRequired,
};

export default DealersItem;
