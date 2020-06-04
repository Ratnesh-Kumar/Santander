import { StyleSheet, Dimensions } from 'react-native';
var colorConstant = require('../../config/colorConstant')
var constants = require('../../config/Constants')
// eslint-disable-next-line no-undef
export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  viewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'black',
  },
  flatListMainView: {
    height:60,
    borderColor:colorConstant.GREY_BORDER_COLOR,
    marginLeft:20
},
imageView: {
  resizeMode: 'contain',
  height: 30,
  width: 30,
  justifyContent: 'flex-start'
},

flatListButtonView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
},

flatListSubView: {
    backgroundColor: colorConstant.WHITE_COLOR,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
},

flatListTextView: {
    color: colorConstant.BLACK_COLOR,
    fontSize:16,
    marginLeft:15
},
}));