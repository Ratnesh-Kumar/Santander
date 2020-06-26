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
var colorConstants = require('./config/colorConstant')


const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
  resource: PropTypes.require,
};
const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    height: 24,
    width: 24,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedcontainer: {
    overflow: 'hidden',
    height: 24,
    width: 24,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewContainer: {
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'transparent',
    borderTopWidth: 1,
    borderTopColor: colorConstants.GREY_DARK_COLOR
  },
  selectedViewContainer: {
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'transparent',
    borderTopWidth: 2,
    borderTopColor: colorConstants.SANT_RED_COLOR
  }

});

const TabIcon = props => (
  <View style={props.focused ? styles.selectedViewContainer : styles.viewContainer}>
    <Image
      style={styles.container}
      source={getTabIcon(props)}
    //style={{tintColor:'black'}}
    />
    <Text
      style={{
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'sans-serif',
        color: props.focused ? colorConstants.SANT_RED_COLOR : colorConstants.GREY_DARK_COLOR_A,
        textAlign: 'center',
      }}>
      {props.title}
    </Text>
  </View>
);

function getTabIcon(props) {
  if (props.focused) {
    if (props.title == "Home") {
      return require('./public/images/home_tab_select_icon.png')
    } else if (props.title == "Products") {
      return require('./public/images/product_tab_select_icon.png')
    } else if (props.title == "Order") {
      return require('./public/images/order_tab_select_icon.png')
    } else if (props.title == "Settings") {
      return require('./public/images/setting_tab_select_icon.png')
    }
  } else {
    if (props.title == "Home") {
      return require('./public/images/home_tab_icon.png')
    } else if (props.title == "Products") {
      return require('./public/images/product_tab_icon.png')
    } else if (props.title == "Order") {
      return require('./public/images/order_tab_icon.png')
    } else if (props.title == "Settings") {
      return require('./public/images/setting_tab_icon.png')
    }
  }

}
TabIcon.propTypes = propTypes;

export default TabIcon;
