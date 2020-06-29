/* eslint-disable radix */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import PropTypes from 'prop-types';
import CardView from 'react-native-cardview';
import { Actions } from 'react-native-router-flux'
import {
  StyleSheet,
  Image,
  ImageBackground,
  View,
  Text,
  Platform,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import GlobalData from './utils/GlobalData'
var globalData = new GlobalData();
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
  <TouchableHighlight onPress={() => { tabPressed(props.tabTitle) }}
    underlayColor='transparent'
    style={props.focused ? styles.selectedViewContainer : styles.viewContainer}>
    <View>
      <View style={{justifyContent:'center', alignItems:'center'}}>
      <Image
        style={styles.container}
        source={getTabIcon(props)}
      //style={{tintColor:'black'}}
      />
      </View>
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
  </TouchableHighlight>
);

function getTabIcon(props) {
  if (props.focused) {
    if (props.tabTitle == "Home") {
      return require('./public/images/home_tab_select_icon.png')
    } else if (props.tabTitle == "Products") {
      return require('./public/images/product_tab_select_icon.png')
    } else if (props.tabTitle == "Order") {
      return require('./public/images/order_tab_select_icon.png')
    } else if (props.tabTitle == "Settings") {
      return require('./public/images/setting_tab_select_icon.png')
    }
  } else {
    if (props.tabTitle == "Home") {
      return require('./public/images/home_tab_icon.png')
    } else if (props.tabTitle == "Products") {
      return require('./public/images/product_tab_icon.png')
    } else if (props.tabTitle == "Order") {
      return require('./public/images/order_tab_icon.png')
    } else if (props.tabTitle == "Settings") {
      return require('./public/images/setting_tab_icon.png')
    }
  }

}
function tabPressed(title) {
  if (title == "Home") {
    // globalData.setSelectedTab(1);
    Actions.home({ type: 'reset' });
  } else if (title == "Products") {
    // globalData.setSelectedTab(2);
    Actions.manageProduct({ type: 'reset' });
  } else if (title == "Order") {
    // globalData.setSelectedTab(3);
    Actions.myOrder({ type: 'reset', refresh: {} });
  } else if (title == "Settings") {
    // globalData.setSelectedTab(4);
    Actions.shop({ type: 'reset' });
  }
}

TabIcon.propTypes = propTypes;

export default TabIcon;
