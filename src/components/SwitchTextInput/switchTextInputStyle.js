import { StyleSheet, Platform } from 'react-native';
var colorConstants = require('../../config/colorConstant');
var constants = require('../../config/Constants')

const header = {
  container: {
    flex:1,
    backgroundColor: colorConstants.TBC_COLOR,
  },
  containerStyle:{
    width:constants.SCREEN_WIDTH-40,
    backgroundColor:colorConstants.WHITE_COLOR,
    height:60,
    //borderColor:colorConstants.GREY_BORDER_COLOR,
    //borderWidth:2,
    //borderRadius:2,
    //borderBottomColor:colorConstants.GREY_DARK_COLOR,
    marginRight: 20,
    marginLeft: 20, 
    marginTop: 5,
    marginBottom : 5
  },
  containerStyleWithBorder:{
    width:constants.SCREEN_WIDTH-40,
    backgroundColor:colorConstants.WHITE_COLOR,
    height:60,
    borderColor:colorConstants.GREY_BORDER_COLOR,
    borderWidth:2,
    borderRadius:2,
    borderBottomColor:colorConstants.GREY_DARK_COLOR,
    marginRight: 20,
    marginLeft: 20, 
    marginTop: 5,
    marginBottom : 5
  },
  textStyle:{
    paddingLeft:5,
    paddingRight:70,
    textAlign:'left',
    marginTop:20
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
    //marginLeft: 20, flex:1
  },
  leftImageView:{
    marginLeft:20,
  }
};

export default header;
