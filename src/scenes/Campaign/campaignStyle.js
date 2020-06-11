import { StyleSheet, Platform } from 'react-native';
var constants = require('../../config/Constants');
var colorConstants = require('../../config/colorConstant')
const MARGIN = 50
// eslint-disable-next-line no-undef
export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorConstants.WHITE_COLOR,
  },
  viewContainer: {
    marginLeft: 20, marginRight: 20,
  },
  registerCreateCampaignContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewStyle:{
    ...Platform.select({
      ios: {
        marginBottom: 100
      },
      android: {
        marginBottom: 80
      }
    })
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
    marginTop: 10,
    marginLeft:10,
    marginRight: 10,
    marginBottom: 10,
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
  inputWrapperSmall:{
    width: (constants.SCREEN_WIDTH - 20)/2, marginTop:10
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
  UpdatedView: {
    alignItems: 'center', flex: 1
  },
  createShopButtonView: {
    paddingLeft: 20, paddingRight: 20, marginTop:10
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorConstants.WHITE_COLOR,
    height: MARGIN,
    borderColor: colorConstants.SANT_RED_COLOR,
    paddingTop: 3, paddingBottom: 5, borderWidth: 1, borderRadius: 25
  },
  createShopButtonText: {
    color: colorConstants.SANT_RED_COLOR, fontSize: 18, fontWeight:'bold'
  },
  cardViewStyle: {
    backgroundColor: colorConstants.WHITE_COLOR,
    marginTop: 50,
    marginLeft: 5,
    marginRight: 5
  }
}));
