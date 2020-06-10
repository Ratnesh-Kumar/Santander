import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import CardView from 'react-native-cardview'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
var colorConstant = require('../../config/colorConstant')
const BUTTON_SIZE = 56
export default class FloatingButton extends Component {
    render() {
        return (
            <View style={{ position: 'absolute', bottom: 5, right: 5, marginBottom: 15, marginRight: 15 }}>
                <CardView
                    style={{ height: BUTTON_SIZE, width: BUTTON_SIZE }}
                    cardElevation={5}
                    cardMaxElevation={5}
                    cornerRadius={BUTTON_SIZE/2}
                    cornerOverlap={false}>
                    <TouchableOpacity onPress={() => {
                        this.props.onFloatButtonPressed()
                    }} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: BUTTON_SIZE/2, backgroundColor: colorConstant.SANT_RED_COLOR }}>
                        <Text style={{fontSize: 35, color: colorConstant.WHITE_COLOR}}>
                            {"+"}
                        </Text>
                    </TouchableOpacity>
                </CardView>
            </View>
        );
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
