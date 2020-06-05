import { StyleSheet, Dimensions } from 'react-native';
var colorConstant = require('../../config/colorConstant')
var constants = require('../../config/Constants')
const DEVICE_WIDTH = Dimensions.get('window').width;
const MARGIN = 50;

export default (styles = StyleSheet.create({

    renderContainer: {
        flex: 1, backgroundColor: colorConstant.WHITE_COLOR
    },
    viewContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
      },
    validFormViewContainer: {
        marginTop: 50,
        alignItems: 'center'
    },
    validFormSubView: {
        paddingLeft: 15, paddingRight: 15
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: constants.SCREEN_WIDTH - 40,
        height: 40,
        marginHorizontal: 20,
        paddingLeft: 45,
        borderRadius: 20,
        color: '#000000',
        marginTop: 15,
    },
    inputWrapper: {
        width: DEVICE_WIDTH - 20,
    },
    inputWrapperSmall: {
        width: (DEVICE_WIDTH - 20)/2,
    },
    validFormSecondFieldView: {
        marginTop: 15,paddingLeft:15,paddingRight:15
    },
    validFormSecondFieldViewZip:{
        marginTop: 15,paddingRight:15
    },
    
    validAddressViewContainer: {
        marginTop: 10,
        alignItems: 'center'
    },

    validFormViewContainerZip: {
        paddingLeft:10,flexDirection:'row'
        
    },


}))
