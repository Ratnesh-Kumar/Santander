/* eslint-disable radix */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import PropTypes from 'prop-types';
import CardView from 'react-native-cardview';
import {
  StyleSheet,
  Image,
  ImageBackground,
  View,
  Text,
  Platform,
} from 'react-native';
var colorConstants = require('../config/colorConstant')


const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
  resource: PropTypes.require,
};
const styles = StyleSheet.create({
  container: {
    tintColor: colorConstants.BLACK_COLOR,
    overflow: 'hidden',
    height: 24,
    width: 24,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewContainer: { width: "100%", justifyContent: 'center', alignItems: 'center', height: 70, backgroundColor:'transparent' },
  selectedcontainer: {
    tintColor: colorConstants.TBC_COLOR,
    overflow: 'hidden',
    height: 24,
    width: 24,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const TabIcon = props => (
  <View style={[styles.viewContainer,
  {
    borderTopLeftRadius: (props.title == "Explore") ? 40 : 0,
    borderTopRightRadius: (props.title == "Plus") ? 40 : 0,
    borderTopWidth: 1.2, borderLeftWidth: (props.title == "Explore") ? 1.2 : 0,
    borderRightWidth: (props.title == "Plus") ? 1.2 : 0,
    borderColor: colorConstants.GREY_DARK_COLOR, paddingTop: (props.homeTabar) ? 0 : 10
  }]}>
    <Image
      style={props.focused ? [styles.selectedcontainer, { height: (props.homeTabar) ? 36 : 24, width: (props.homeTabar) ? 36 : 24 }] : [styles.container, { height: (props.homeTabar) ? 36 : 24, width: (props.homeTabar) ? 36 : 24 }]}
      source={props.resource}
    //style={{tintColor:'black'}}
    />
    <Text
      style={{
        fontSize: 12,
        paddingTop: (props.homeTabar) ? 0 : 2,
        fontWeight: 'bold',
        fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'sans-serif',
        color: props.focused ? colorConstants.TBC_COLOR : colorConstants.BLACK_COLOR,
        textAlign: 'center',
      }}>
      {props.title.replace(" ", "\n")}
    </Text>
  </View>
);
TabIcon.propTypes = propTypes;

export default TabIcon;
