import React, { Component } from 'react';
import {
    View,
    Switch,
    Image
} from 'react-native';
import switchTextInputStyle from './switchTextInputStyle';
import { Text } from 'native-base';
var colorConstants = require('../../config/colorConstant');
export default class SwitchTextInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            switchvalue:props.defaultSwitchValue
        }
    }

    componentDidMount() {
    }

    render() {
        return(
            <View
            style={this.props.isDropDownVisbile?switchTextInputStyle.containerStyleWithBorder:switchTextInputStyle.containerStyle}>
            <Text style={switchTextInputStyle.textStyle}>{this.props.title}</Text>  
            {this.renderSwitch(this.props.isDropDownVisbile)}
        </View>
        );
    }

    renderSwitch(isDropDownVisbile) {
        if(isDropDownVisbile){
            return (
                <View
                  style={{position: 'absolute', right: 10, top: 10}}>
                  <Image
              style={{width: 35, height: 35}}
              source={require('../.././public/images/dropDown.png')}
            />
                </View>
              );  
        }
        return (
            <View
              style={{position: 'absolute', right: 10, top: 10}}>
              <Switch
                onTintColor={colorConstants.SANT_RED_COLOR}
                value={this.state.switchvalue}
                 onValueChange={(value) => {this.setState({switchvalue:!this.state.switchvalue}); this.props.onRightPressed(value) }}
              />
            </View>
          );
    }

}
