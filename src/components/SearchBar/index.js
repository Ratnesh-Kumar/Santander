import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import CardView from 'react-native-cardview'
import { View, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { strings } from '../../i18next/i18n';
var colorConstant = require('../../config/colorConstant')
var constants = require('../../config/Constants');
export default class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: ''
    }
  }
  render() {
    return (
      <View>
        <View style={{ backgroundColor: colorConstant.GRAY_LIGHT_COLOR, height: 40, margin: 20, borderRadius: 22, flexDirection: 'row' }}>
          <TextInput
            underlineColorAndroid="transparent"
            ref={'campaignDescription'}
            placeholderTextColor={colorConstant.GREY_DARK_COLOR}
            autoCapitalize="none"
            style={{ fontSize: 16, textAlignVertical: 'top', paddingLeft: 20, flex: 1 }}
            onChangeText={text => { this.setState({ searchText: text }) }}
            value={this.state.searchText}
            onSubmitEditing={event => {
              this.props.onSearchPressed(this.state.searchText)
            }}
          />
          <TouchableOpacity onPress={() => { this.props.onSearchPressed(this.state.searchText) }} style={{ height: 40, width: 60, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../public/images/Search_Icon.png')} style={{ height: 20, width: 20, alignSelf: 'center', tintColor: colorConstant.GREY_DARK_COLOR }} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  lightButtonText: {
    fontSize: 18, color: colorConstant.SANT_RED_COLOR, fontWeight: 'bold'
  }
});
