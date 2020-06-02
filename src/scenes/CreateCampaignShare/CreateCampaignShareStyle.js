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
  },
  publishButtonView:{
    paddingLeft: 20, paddingRight: 20, paddingBottom:60
  },
  publishButtonText:{
    color: colorConstant.WHITE_COLOR, fontSize: 20, fontWeight: 'bold', 
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorConstant.SANT_RED_COLOR,
    height: MARGIN,
    paddingTop:3, paddingBottom:5,borderWidth:2,borderRadius: 20, borderColor:'transparent'
  },
  bottomTextStyle:{
    fontSize: 15, color: colorConstant.BLACK_COLOR ,  textAlign:'center',padding:30 ,
  }
}));
