import { StyleSheet, Platform } from 'react-native';
var colorConstants = require('../../config/colorConstant');
var constants = require('../../config/Constants')

const header = {
  container: {
    flex:1,
    backgroundColor: colorConstants.TBC_COLOR,
  },
  viewContainer: {
    height: (Platform.OS === 'ios') ? 50 : 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colorConstants.WHITE_COLOR,
    justifyContent:'space-between'
  },
  headerText: {
    color: colorConstants.RED_COLOR,
    fontSize: 18,
    fontWeight:"bold",
    //marginLeft: 20
  },
  leftImageView:{
    marginLeft:20,
  }
};

export default header;
