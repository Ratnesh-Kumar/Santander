import { StyleSheet, Dimensions } from 'react-native';
var constants = require('../../config/Constants');
var colorConstants = require('../../config/colorConstant')

// eslint-disable-next-line no-undef
export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorConstants.WHITE_COLOR,
    paddingBottom: 50
  },
  viewContainer: {
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
}));
