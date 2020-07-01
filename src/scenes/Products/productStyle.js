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
        marginBottom: 130
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
  emptyNoProducttext:{
    color: colorConstants.SANT_RED_COLOR, fontSize: 18, fontWeight:'bold'
  },
  cardViewStyle: {
    backgroundColor: colorConstants.WHITE_COLOR,
    marginTop: 50,
    marginLeft: 5,
    marginRight: 5
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
  modalcontainer: {
    alignItems: 'center',
    borderRadius: 5,
    flex:1,
  },
  modaltopContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop:constants.SCREEN_HEIGHT/4
  },
  modalHorizontalLine: {
    height: 0.4,
    opacity: 0.7,
    backgroundColor: colorConstants.BLACK_COLOR,
  },
  categoryText: {
    fontSize: 16,
    paddingBottom: 5,
    paddingTop:15,
    paddingLeft:15,
    color: 'black',
    fontWeight: 'bold',
  },
  variantQuantityText:{
    fontSize: 14,
    paddingBottom: 15,
    paddingLeft:15,
    color: 'black',
  },
  variantCategoryText:{
    fontSize: 18,
    paddingBottom: 15,
    paddingTop:15,
    paddingLeft:15,
    color: 'black',
  }
}));
