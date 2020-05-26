import { StyleSheet, Platform } from 'react-native';
var colorConstants = require('../../config/colorConstant');

const header = {
  container: {
    flex:1,
    backgroundColor: colorConstants.TBC_COLOR,
  },
  viewContainer: {
    height: (Platform.OS === 'ios') ? 50 : 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colorConstants.TBC_COLOR
  },
  headerText: {
    color: colorConstants.WHITE_COLOR,
    fontSize: 18,
    marginLeft: 20
  },
  leftImageView:{
    marginLeft: 20

  }
};

export default header;
