import {StyleSheet, Dimensions} from 'react-native';
import Constants from '../../config/Constants';
var colorConstant = require('../../config/colorConstant')
var constants = require('../../config/Constants');
const DEVICE_WIDTH = Dimensions.get('window').width;
const MARGIN = 40;

// eslint-disable-next-line no-undef
export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorConstant.WHITE_COLOR,
  },
  viewContainer: {
    flex: 1,
    margin: 10
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'black',
  },
  orderNumberView:{
    width:(DEVICE_WIDTH-110),
    flexDirection:'row'
  },
  addressText:{
    fontSize:14,paddingTop:5
  },
  orderText:{
    fontSize: 18 
  },
  showSKUView:{
    paddingTop:5,flexDirection:"row"
  },
  renderAmtView:{
    flexDirection:"row",paddingLeft:50
  },
  productNameText:{
    fontSize:14,fontWeight:'bold'
  },
  validFormViewContainer:{
    alignItems: 'center',
    marginTop: 20,
  },
  inputWrapper: {
    width: constants.SCREEN_WIDTH - 20, marginTop:10
  },
  priceInputWrapper: {
    width: constants.SCREEN_WIDTH/2-10,
  },
  validFormSubView:{
    paddingLeft: 10, paddingRight: 10
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
}));