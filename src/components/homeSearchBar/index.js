import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';
import homeSearchStyle from './homeSearchStyle';
var colorConstants = require('../../config/colorConstant')
var homeSearchConstant = require('./homeSearchConstants')

export default class HomeSearchBar extends Component {

    constructor(props){
        super(props)

        this.state={
            searchText: ''
        }
    }

    render() {
        return (
            <View style={homeSearchStyle.container}>
                <View style={{ flexDirection: "row", height: 32 }}>
                    <View style={{ flex: 0.7, backgroundColor: colorConstants.GRAY_LIGHT_COLOR, borderRadius: 3, padding:0 }}>
                        <TextInput
                            style={{ flex:1, fontSize: 14, paddingTop:5, paddingBottom:5, paddingLeft: 10,  margin:0 }}
                            placeholder={homeSearchConstant.SEARCH_PLACE_HOLDER}
                            value={this.state.searchText}
                            onChangeText={(text) => this.setState({ searchText: text })}
                        />
                    </View>
                    <TouchableOpacity onPress={()=>{
                        alert("Search Button Pressed!")
                    }}
                    style={{ flex: 0.3, backgroundColor: colorConstants.LOGIN_BUTTON_BLUE, justifyContent: 'center', alignItems: 'center', borderRadius: 3 }}>
                        <Text style={{ color: colorConstants.WHITE_COLOR }}>{homeSearchConstant.SEARCH_BUTTON}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
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

