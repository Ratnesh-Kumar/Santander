import {StyleSheet, Dimensions} from 'react-native';
var colorConstant = require('../../config/colorConstant')
var constants = require('../../config/Constants')
const DEVICE_WIDTH = Dimensions.get('window').width;
const MARGIN = 50;

// eslint-disable-next-line no-undef
export default (styles = StyleSheet.create({
  renderContainer: {
    flex: 1, backgroundColor: colorConstant.WHITE_COLOR
  },
  textScrollView: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop:20,
    marginBottom: 20,
  },
}));
