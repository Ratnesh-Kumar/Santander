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
        alignItems: 'center',
        marginTop: 20,
    },
    validFormSubView: {
        paddingLeft: 10, paddingRight: 10
    },
    
    inputWrapper: {
        width: DEVICE_WIDTH - 20,
    },
    inputWrapperSmall: {
        width: (DEVICE_WIDTH - 20) / 2,
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
        marginTop: 10, paddingLeft: 10, paddingRight: 10
    },
    validFormSecondFieldViewZip: {
        marginTop: 10, paddingRight: 10
    },

    validAddressViewContainer: {
        marginTop: 10,
        alignItems: 'center'
    },

    validFormViewContainerZip: {
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row'

    },
    phoneInput: {
        borderWidth: 1, marginLeft: 10, height: 55, borderColor: 'gray', borderBottomColor: '#257fa4', marginTop: 10
    },
    scrollViewStyle: {
        ...Platform.select({
            ios: {
                marginBottom: 130
            },
            android: {
                marginBottom: 80
            }
        })
    },


}))
