import { StyleSheet, Dimensions } from 'react-native';
var colorConstant = require('../../config/colorConstant')
var constants = require('../../config/Constants')
const DEVICE_WIDTH = Dimensions.get('window').width;
const MARGIN = 50;

export default (styles = StyleSheet.create({

    renderContainer: {
        flex: 1, backgroundColor: colorConstant.WHITE_COLOR
    },
    validFormViewContainer: {
        marginTop:50,
        alignItems: 'center'
    },
    inputWrapper: {
        width: DEVICE_WIDTH - 20,
    },
    validFormSecondFieldView: {
        marginTop: 15
    },
    registerSumbitButtonView: {
        paddingTop:35,paddingLeft: 20, paddingRight: 20
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colorConstant.RED_COLOR,
        height: MARGIN,
        paddingTop: 3, paddingBottom: 5, borderWidth: 2, borderRadius: 20, borderColor: 'transparent'
    },
    registerSubmitButtonText: {
        color: colorConstant.WHITE_COLOR, fontSize: 20, fontWeight: 'bold',
    },
    UpdatedView: {
        alignItems: 'center', flex: 1
    },
    termsAndConditionView: {
        margin: 25, alignItems: 'center'
    },
    btnEye: {
        flex: 1,
        flexDirection: 'row-reverse',
        position: 'relative',
    },
    registerTitleView: {
        height: constants.SCREEN_HEIGHT / 9,  justifyContent: 'center', alignItems: 'center'
    },
    registerTitleText: {
        fontSize: 28, color: colorConstant.BLACK_COLOR, fontWeight: 'bold'
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: DEVICE_WIDTH - 40,
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



}))