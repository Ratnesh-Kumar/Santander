import { StyleSheet, Dimensions } from 'react-native';
var constants = require('../../config/Constants');
var colorConstants = require('../../config/colorConstant')

// eslint-disable-next-line no-undef
export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorConstants.WHITE_COLOR,
  },
  viewContainer: {
    justifyContent: 'center', alignItems:'center'
  },
  seperateLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colorConstants.GRAY_MEDIUM_COLOR,
  },
  homeListHeaderView: {
    padding: 10, flex: 1, alignItems: 'center'
  },
  homeListHeaderText: {
    fontSize: 16, color: colorConstants.TBC_COLOR
  },
  renderItemContainer: {
    flex: 1, backgroundColor: colorConstants.WHITE_COLOR, marginBottom: 10
  },
  renderItemMainView: {
    flex: 1, padding: 20
  },
  renderItemSubView: {
    flexDirection: 'row'
  },
  renderItemSubViewOne: {
    flexDirection: 'row', paddingTop: 3
  },
  renderItemText: {
    width: 60
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: colorConstants.SANT_RED_COLOR,
  },
  graphViewStyle:{
    justifyContent: 'center',
    alignItems: 'center', 
    width: constants.SCREEN_WIDTH - 40,
    height:constants.SCREEN_HEIGHT/3,
    // borderColor:colorConstants.GRAY_MEDIUM_COLOR,
    // borderWidth:2,
    // borderRadius:1,
    marginTop:10
  },
  cardViewStyle: {
    backgroundColor: colorConstants.WHITE_COLOR,
    marginTop: 30,
    marginLeft: 5,
    marginRight: 5
  }
}));
