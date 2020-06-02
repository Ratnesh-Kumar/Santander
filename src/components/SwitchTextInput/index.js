import React, { Component } from 'react';
import {
    View,
    Switch,
} from 'react-native';
import switchTextInputStyle from './switchTextInputStyle';
import { Text } from 'native-base';

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
            style={switchTextInputStyle.containerStyle}>
            <Text style={switchTextInputStyle.textStyle}>{this.props.title}</Text>  
            {this.renderSwitch()}
        </View>
        );
    }

    renderSwitch() {
        return (
            <View
              style={{position: 'absolute', right: 10, top: 10}}>
              <Switch
                value={this.state.switchvalue}
                 onValueChange={(value) => {this.setState({switchvalue:!this.state.switchvalue}); this.props.onRightPressed(value) }}
              />
            </View>
          );
    }

}
