import {StyleSheet, Dimensions} from 'react-native';
var colorConstant = require('../../config/colorConstant')
var constants = require('../../config/Constants')
const DEVICE_WIDTH = Dimensions.get('window').width;
const MARGIN = 40;

// eslint-disable-next-line no-undef
export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'cover',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 195,
    height: 90,
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
  inputWrapper: {
    width: DEVICE_WIDTH - 20,
  },
  inlineImg: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 9,
  },
  btnEye: {
    flex: 1,
    flexDirection: 'row-reverse',
    position: 'relative',
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
    marginTop:-25
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorConstant.TBC_COLOR,
    height: MARGIN,
    borderRadius: 0,
    paddingTop:3, paddingBottom:5,
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: '#F035E0',
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: '#F035E0',
  },
  renderContainer: {
    flex: 1, backgroundColor: colorConstant.WHITE_COLOR
  },
  touchIdContainer: {
    marginTop: 20, alignItems: 'center'
  },
  touchIdLinkView: {
    fontWeight: 'bold', fontSize: 18, textDecorationLine: 'underline', color: colorConstant.TBC_COLOR
  },
  loginTitleView:{
    height: constants.SCREEN_HEIGHT / 3, justifyContent: 'center', alignItems: 'center'
  },
  loginTitleText:{
    fontSize: 32, color: colorConstant.TBC_COLOR 
  },
  loginSumbitButtonView:{
    paddingLeft: 30, paddingRight: 30, marginTop: 60 
  },
  loginSubmitButtonText:{
    color: colorConstant.WHITE_COLOR, fontSize: 20, fontWeight: 'bold'
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
  reCaptchaView:{
    marginTop: 10 
  }
}));
