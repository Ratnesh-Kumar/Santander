/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-native/no-inline-forgotPasswordStyle */
/* eslint-disable react/no-string-refs */
import React, { Component } from 'react';
import {
  View,
  ScrollView
} from 'react-native';
import TextInputMaterial from '../../components/textInputMaterial';
import PropTypes from 'prop-types';
import { strings } from '../../i18next/i18n';
import termsStyle from './termsAndPrivacyStyle';
import Header from '../../components/Header';
import { Text } from 'native-base';
var commonConstants = require('../../config/Constants');
var colorConstant = require('../../config/colorConstant');

export default class TermsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
  }

  componentDidMount(){

  }

  
  render() {
    let title = this.props.selectedTitle === 'terms' ? strings('termsScreen.termsTitle') : strings('termsScreen.privacyTitle')
    return (
      <View style={termsStyle.renderContainer}>
        <Header isleftArrowDisplay={true} title={title} />
        {this.renderScrollView()}
      </View>
    );
  }

  renderScrollView(){
    return(
      <ScrollView style={termsStyle.textScrollView}>
        {/* <Text>{'LOAD TERMS AND CONDITION'}</Text> */}
      </ScrollView>  
    );
  }

  
}
TermsScreen.propTypes = {
  source: PropTypes.number.isRequired,
  placeholder: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool,
  autoCorrect: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  returnKeyType: PropTypes.string,
};
