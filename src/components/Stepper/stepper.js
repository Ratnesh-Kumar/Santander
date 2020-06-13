import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import CardView from 'react-native-cardview'
import { View, Text, TouchableOpacity, StyleSheet, Platform, Image } from 'react-native';
var colorConstant = require('../../config/colorConstant')
var constants = require('../../config/Constants');
const BUTTON_SIZE = 56
const STEPPER_ONE_DEFAULT = require('../../public/images/stepper_one_gray.png')
const STEPPER_TWO_DEFAULT = require('../../public/images/stepper_two_gray.png')
const STEPPER_ONE_DEFAULT_WIDE = require('../../public/images/stepper_one_gray_wide.png')
const STEPPER_TWO_DEFAULT_WIDE = require('../../public/images/stepper_two_gray_wide.png')
const STEPPER_THREE_DEFAULT = require('../../public/images/stepper_three_gray.png')
const STEPPER_ONE = require('../../public/images/stepper_one.png')
const STEPPER_TWO = require('../../public/images/stepper_two.png')
const STEPPER_ONE_WIDE = require('../../public/images/stepper_one_wide.png')
const STEPPER_TWO_WIDE = require('../../public/images/stepper_two_wide.png')
const STEPPER_THREE = require('../../public/images/stepper_three.png')
const STEPPER_DONE = require('../../public/images/stepper_done.png')
const STEPPER_DONE_WIDE = require('../../public/images/stepper_done_wide.png')
export default class StepperView extends Component {
    render() {
        return (
            <View>
                {this.renderStepper()}
            </View>
        );
    }

    renderStepper() {
        if (this.props.count == 2) {
            return (
                <View style={{ flexDirection: 'row', marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                    {this.renderStepperItem(this.getStepperImage(1))}
                    {this.renderStepperItem(this.getStepperImage(2))}
                </View>
            )
        } else {
            return (
                <View style={{ flexDirection: 'row', marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                    {this.renderStepperItem(this.getStepperImage(1))}
                    {this.renderStepperItem(this.getStepperImage(2))}
                    {this.renderStepperItem(this.getStepperImage(3))}
                </View>
            )
        }
    }


    getStepperImage(stepperCount){
        if(this.props.currentCount == 1){
            if(stepperCount === 1){
                return (this.props.count === 2)? STEPPER_ONE_WIDE: STEPPER_ONE
            } else if(stepperCount === 2){
                return (this.props.count === 2)? STEPPER_TWO_DEFAULT_WIDE: STEPPER_TWO_DEFAULT
            } else if(stepperCount === 3){
                return STEPPER_THREE_DEFAULT
            }
        } else if(this.props.currentCount == 2){
            if(stepperCount === 1){
                return (this.props.count === 2)? STEPPER_DONE_WIDE: STEPPER_DONE
            } else if(stepperCount === 2){
                return (this.props.count === 2)? STEPPER_TWO_WIDE: STEPPER_TWO
            } else if(stepperCount === 3){
                return STEPPER_THREE_DEFAULT
            }
        }else if(this.props.currentCount == 3){
            if(stepperCount === 1){
                return STEPPER_DONE
            } else if(stepperCount === 2){
                return STEPPER_DONE
            } else if(stepperCount === 3){
                return STEPPER_THREE
            }
        }
        
    }

    renderStepperItem(IMAGE) {
        let imageWidth = (this.props.count === 3)? (constants.SCREEN_WIDTH - 50) / 3 : (constants.SCREEN_WIDTH - 20) / 2
        return (
            <View style={{ flex: 1, alignItems: 'center', marginLeft: 3 }}>
                <Image source={IMAGE} style={{ width:imageWidth, height: 30, resizeMode: 'contain' }} />
            </View>
        )
    }

}
const styles = StyleSheet.create({
    darkThemButtonStyle: {
        borderColor: colorConstant.GREY_BORDER_COLOR,
        borderWidth: 2,
        borderRadius: (Platform.OS == 'android') ? 5 : 20,
        justifyContent: 'center',
        margin: 20,
        height: 50,
        backgroundColor: colorConstant.SANT_RED_COLOR
    },
    lightThemButtonStyle: {
        borderColor: colorConstant.SANT_RED_COLOR,
        borderWidth: (Platform.OS === 'android') ? 0 : 1,
        borderRadius: (Platform.OS == 'android') ? 5 : 20,
        justifyContent: 'center',
        margin: 20,
        height: 50,
        backgroundColor: colorConstant.WHITE_COLOR
    },
    darkButtonText: {
        fontSize: 18, color: colorConstant.WHITE_COLOR, fontWeight: 'bold'
    },
    lightButtonText: {
        fontSize: 18, color: colorConstant.SANT_RED_COLOR, fontWeight: 'bold'
    }
});
