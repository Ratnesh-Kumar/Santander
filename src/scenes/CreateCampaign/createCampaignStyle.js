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
        flex: 1
      },
      termsAndConditionView:{
        margin: 25 , alignItems:'center'
       },
       UpdatedView:{
        alignItems:'center',flex:1
      },
      createShopButtonView:{
        paddingLeft: 20, paddingRight: 20
      },
      button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colorConstant.SANT_RED_COLOR,
        height: MARGIN,
        paddingTop:3, paddingBottom:5,borderWidth:2,borderRadius: 20, borderColor:'transparent'
      },
      createShopButtonText:{
        color: colorConstant.WHITE_COLOR, fontSize: 20, fontWeight: 'bold', 
      },
}));
