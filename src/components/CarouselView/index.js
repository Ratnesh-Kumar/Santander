import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';
import Carousel from 'react-native-snap-carousel';
import carouselStyle from './carouselStyle';
var colorConstants = require('../../config/colorConstant')
var carouselConstant = require('./carouselConstants')
var constants = require('../../config/Constants')


export default class CarouselView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            entries: props.entriesData
        }
    }

    render() {
        console.log("############ render : " + JSON.stringify(this.props.entriesData))
        return (
            <View style={{backgroundColor: (this.props.darkTheme)? colorConstants.GREY_DARK_COLOR : colorConstants.WHITE_COLOR, marginTop: 10, paddingBottom: 25}}>
                <View style={{ paddingLeft: 10, paddingTop: 10, paddingBottom: 15 }}>
                    <Text style={{ fontSize: 18 }}>{this.props.title}</Text>
                </View>
                <Carousel
                    layout={'default'}
                    ref={(c) => { this._carousel = c; }}
                    data={this.props.entriesData}
                    renderItem={(item) => this.renderItem(item.item)}
                    sliderWidth={constants.SCREEN_WIDTH}
                    itemWidth={constants.SCREEN_WIDTH - 150}
                    activeSlideAlignment='center'
                />
            </View>
        );
    }

    renderItem(item) {
        // console.log("############ renderItem 1: " + JSON.stringify(item))
        console.log("############ renderItem 2: " + item.description)
        return (
            <View style={{ width: 250 }}>
                <View style={{ backgroundColor: colorConstants.GRAY_LIGHT_COLOR, borderRadius: 20 }}>
                    <View style={{ height: 280, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../public/images/thumbnail_placeholder.png')}
                            style={{ height: 80, width: 80, resizeMode: 'contain' }}
                        />
                        <View style={{position: 'absolute', top: 10, right: 10}}>
                            <Image source={require('../../public/images/heart_favourite.png')}
                            style={{height: 40, width: 40, resizeMode:'contain', tintColor: colorConstants.GREY_DARK_COLOR}}/>
                        </View>
                    </View>
                    <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: (this.props.darkTheme)? colorConstants.GREY_DARK_COLOR_A: colorConstants.GRAY_MEDIUM_COLOR, padding: 10, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
                        <Text style={{ fontSize: 11, textAlign: "center", color: (this.props.darkTheme)? colorConstants.WHITE_COLOR: colorConstants.GREY_DARK_COLOR_A }}>
                            {item.description}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    viewContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: 'black',
    },
});

