import {StyleSheet, Dimensions, Platform} from 'react-native';
var colorConstant = require('../../config/colorConstant')
var constants = require('../../config/Constants')
const MARGIN = 50;

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
    width: constants.SCREEN_WIDTH - 40,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 20,
    color: '#000000',
    marginTop: 15,
  },
  inputWrapper: {
    width: constants.SCREEN_WIDTH - 20, marginTop:10
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
    //tintColor: 'rgba(0,0,0,0.2)',
    marginTop:-35,
    marginRight:5,
    resizeMode:'contain'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorConstant.SANT_RED_COLOR,
    height: MARGIN,
    paddingTop:3, paddingBottom:5,borderWidth:2,borderRadius: 20, borderColor:'transparent'
  },
  signInButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: MARGIN,
    paddingTop:3, paddingBottom:5,borderWidth:1,borderRadius: 20, borderColor:colorConstant.BLACK_COLOR
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
    flex: 1, backgroundColor: colorConstant.WHITE_COLOR , marginTop: (Platform.OS === 'ios') ? 50 : 20,
  },
  touchIdContainer: {
    marginTop: 20, alignItems: 'center'
  },
  touchIdLinkView: {
    fontWeight: 'bold', fontSize: 18, textDecorationLine: 'underline', color: colorConstant.TBC_COLOR
  },
  forgotTitleText:{
    fontSize: 18, color: colorConstant.SANTANDAR_COLOR 
  },
  loginTitleView:{
    justifyContent: 'center', alignItems: 'center', marginTop: 20
  },
  loginTitleText:{
    fontSize: 28, color: colorConstant.BLACK_COLOR ,  fontWeight: 'bold'
  },
  loginTitleSubText:{
    fontSize: 15, color: colorConstant.BLACK_COLOR ,  textAlign:'center', marginTop: 30
  },
  loginSumbitButtonView:{
    paddingLeft: 20, paddingRight: 20
  },
  loginSubmitButtonText:{
    color: colorConstant.WHITE_COLOR, fontSize: 20, fontWeight: 'bold', 
  },
  signUpButtonText:{
    color: colorConstant.GREY_DARK_COLOR, fontSize: 20,fontWeight: 'bold', 
  },
  termsAndConditionView:{
   margin: 25 , alignItems:'center'
  },
  UpdatedView:{
    alignItems:'center',flex:1
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
