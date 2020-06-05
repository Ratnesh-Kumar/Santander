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
  },
  headerText: {
    color: colorConstants.RED_COLOR,
    fontSize: 20,
    fontWeight:"bold",
    //marginLeft: 20
    //marginLeft: 20, flex:1
  },
  leftImageView:{
    marginLeft:10,
  }
};

export default header;
