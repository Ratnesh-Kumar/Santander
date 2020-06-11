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
    height:40,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  textStyle:{
    paddingLeft:5,
    paddingRight:70,
    textAlign:'left',
    flex:1
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
  },
  minusView:{
    height: 32, width: 40, borderWidth: 1, borderColor: colorConstants.SANT_BLUE_COLOR, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, justifyContent: 'center', alignItems: "center"
  },
  plusView:{
    height: 32, width: 40, borderWidth: 1, borderColor: colorConstants.SANT_BLUE_COLOR, borderTopRightRadius: 5, borderBottomRightRadius: 5, justifyContent: 'center', alignItems: "center" 
  }
};

export default header;
