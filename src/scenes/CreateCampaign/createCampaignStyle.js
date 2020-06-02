import { StyleSheet, Dimensions } from 'react-native';
var colorConstant = require('../../config/colorConstant')
const DEVICE_WIDTH = Dimensions.get('window').width;
const MARGIN = 50;
export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  viewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsAndConditionView: {
    margin: 25, alignItems: 'center'
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
    backgroundColor: colorConstant.WHITE_COLOR,
    height: MARGIN,
    borderColor: colorConstant.SANT_RED_COLOR,
    paddingTop: 3, paddingBottom: 5, borderWidth: 1, borderRadius: 20
  },
  createShopButtonText: {
    color: colorConstant.SANT_RED_COLOR, fontSize: 20, fontWeight:'bold'
  },
  cardViewStyle: {
    backgroundColor: colorConstant.WHITE_COLOR,
    height: 180,
    marginTop: 50,
    marginLeft: 5,
    marginRight: 5
  }
}));
