import {StyleSheet, Dimensions} from 'react-native';
import Constants from '../../config/Constants';
var colorConstant = require('../../config/colorConstant')

const DEVICE_WIDTH = Dimensions.get('window').width;
const MARGIN = 40;

// eslint-disable-next-line no-undef
export default (styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: colorConstant.WHITE_COLOR, justifyContent: 'center', alignItems: 'center'
  },
  containerText:{
    fontSize: 32, fontWeight: 'bold', color: colorConstant.TBC_COLOR
  }
}));