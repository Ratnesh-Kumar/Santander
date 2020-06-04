import {StyleSheet, Dimensions} from 'react-native';
var colorConstant = require('../../config/colorConstant')
var constants = require('../../config/Constants')
const DEVICE_WIDTH = Dimensions.get('window').width;
const MARGIN = 50;

// eslint-disable-next-line no-undef
export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  renderContainer: {
    flex: 1, backgroundColor: colorConstant.WHITE_COLOR
  },
  forgotPasswordButtonView:{
    paddingLeft: 20, paddingRight: 20 ,marginTop:20
  },
  forgotPasswordButtonText:{
    color: colorConstant.WHITE_COLOR, fontSize: 20, fontWeight: 'bold', 
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorConstant.RED_COLOR,
    height: MARGIN,
    paddingTop:3, paddingBottom:5,borderWidth:2,borderRadius: 20, borderColor:'transparent'
  },
  forgotTitleView:{
    alignItems: 'center'
  },
  forgotTitleText:{
    fontSize: 18, color: colorConstant.BLACK_COLOR ,  fontWeight: 'bold'
  },
  forgotTitleSubText:{
    fontSize: 15, color: colorConstant.BLACK_COLOR , textAlign:'center', marginTop:40 , marginBottom: 20
  },
  validFormViewContainer:{
    alignItems: 'center'
  },
  validFormSubView:{
    paddingLeft: 15, paddingRight: 15
  },
  validFormSecondFieldView:{
    marginTop: 15
  },
  inputWrapper: {
    width: DEVICE_WIDTH - 20,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: DEVICE_WIDTH - 40,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 20,
    color: '#000000',
    marginTop: 15,
  },
}));
