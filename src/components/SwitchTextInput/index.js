import React, { Component } from 'react';
import {
    View,
    Switch,
    Image,
    TouchableOpacity
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
        //console.log("SwitchTextInput renderSwitch :" + this.state.switchvalue)
        if(isDropDownVisbile){
            return (
                <TouchableOpacity onPress={()=>{this.props.onDropDownPressed()}}
                  style={{position: 'absolute', right: 10, top: 10}}>
                  <Image
              style={{width: 35, height: 35}}
              source={require('../.././public/images/dropDown.png')}
            />
                </TouchableOpacity>
              );  
        }
        return (
            <View
              style={{position: 'absolute', right: 10, top: 10}}>
              <Switch
                trackColor={colorConstants.SANT_RED_COLOR}
                value={this.state.switchvalue}
                 onValueChange={(value) => {this.setState({switchvalue:!this.state.switchvalue}); this.props.onRightPressed(value) }}
              />
            </View>
          );
    }

}
