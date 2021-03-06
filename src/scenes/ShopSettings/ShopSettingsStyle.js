import { StyleSheet, Dimensions } from 'react-native';
var constants = require('../../config/Constants');
var colorConstants = require('../../config/colorConstant')
const MARGIN = 50
// eslint-disable-next-line no-undef
export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorConstants.WHITE_COLOR,
  },
  renderContainer: {
  },
  seperateLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colorConstants.GRAY_MEDIUM_COLOR,
  },
  validFormViewContainer:{
    alignItems: 'center',
    marginTop: 20,
  },
  priceTextInputContainer:{
    alignItems: 'center',
    marginTop: 20,
    marginLeft:10,
    marginRight: 10,
    flexDirection: 'row'
  },
  validFormSubView:{
    paddingLeft: 10, paddingRight: 10
  },
  priceFormSubView:{
    paddingLeft: 10, paddingRight: 10
  },
  validFormSecondFieldView:{
    marginTop: 15
  },
  inputWrapper: {
    width: constants.SCREEN_WIDTH - 20, marginTop:10
  },
  priceInputWrapper: {
    width: constants.SCREEN_WIDTH/2-10,
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
    color: colorConstants.WHITE_COLOR, fontSize: 20, fontWeight: 'bold', 
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorConstants.SANT_RED_COLOR,
    height: MARGIN,
    paddingTop:3, paddingBottom:5,borderWidth:2,borderRadius: 20, borderColor:'transparent'
  },
  bottomTextStyle:{
    fontSize: 15, color: colorConstants.BLACK_COLOR ,  textAlign:'center',padding:30 ,
  },
  textStyle:{
    paddingLeft:5,
    paddingRight:70,
    textAlign:'left',
    marginTop:20,
    fontSize:16
  },
  containerStyle:{
    width:constants.SCREEN_WIDTH-40,
    backgroundColor:colorConstants.WHITE_COLOR,
    height:50,
    //borderColor:colorConstants.GREY_BORDER_COLOR,
    //borderWidth:2,
    //borderRadius:2,
    //borderBottomColor:colorConstants.GREY_DARK_COLOR,
    marginRight: 20,
    marginLeft: 20, 
    marginTop: 5,
    marginBottom : 5
  },
  containerStyleWithBorder:{
    width:(constants.SCREEN_WIDTH-40)/2,
    backgroundColor:colorConstants.WHITE_COLOR,
    height:60,
    borderColor:colorConstants.GREY_BORDER_COLOR,
    borderWidth:2,
    borderRadius:2,
    borderBottomColor:colorConstants.GREY_DARK_COLOR,
    marginRight: 20, 
    marginTop: 5,
    marginBottom : 5
  },
}));
