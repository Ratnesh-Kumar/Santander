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
        width: (DEVICE_WIDTH - 20) / 2,
    },
    containerStyleWithBorder:{
        width: (DEVICE_WIDTH - 60) / 2,
        backgroundColor:colorConstant.WHITE_COLOR,
        height:60,
        borderColor:colorConstant.GREY_BORDER_COLOR,
        borderWidth:2,
        borderRadius:2,
        borderBottomColor:colorConstant.GREY_DARK_COLOR,
        marginTop: 10,
        marginLeft:10
      },
    inputWrapperPhoneCode: {
        flex: 1
        // width: (DEVICE_WIDTH - 20)/3,
    },
    inputWrapperPhone: {
        flex: 3
        // width: (DEVICE_WIDTH - 150),
    },

    validFormSecondFieldView: {
        marginTop: 15, paddingLeft: 15, paddingRight: 15
    },
    validFormSecondFieldViewZip: {
        marginTop: 15, paddingRight: 15
    },

    validAddressViewContainer: {
        marginTop: 10,
        alignItems: 'center'
    },

    validFormViewContainerZip: {
        flex: 1,
        marginLeft: 10, marginRight: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'

    },
    phoneInput: {
        borderWidth: 1, marginLeft: 10, height: 55, borderColor: 'gray', borderBottomColor: '#257fa4', marginTop: 15
    }


}))
