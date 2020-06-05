import {StyleSheet, Dimensions} from 'react-native';
import Constants from '../../config/Constants';
var colorConstant = require('../../config/colorConstant')

const DEVICE_WIDTH = Dimensions.get('window').width;
const MARGIN = 40;

// eslint-disable-next-line no-undef
export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  viewContainer: {
    paddingLeft:15,
    paddingTop:10

  },
  viewAddressContainer: {
    marginTop:10,marginLeft:15

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
  }



}));