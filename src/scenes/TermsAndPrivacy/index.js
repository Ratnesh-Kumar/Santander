/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-native/no-inline-forgotPasswordStyle */
/* eslint-disable react/no-string-refs */
import React, { Component } from 'react';
import {
  View,
  ScrollView
} from 'react-native';
import PropTypes from 'prop-types';
import { strings } from '../../i18next/i18n';
import termsStyle from './termsAndPrivacyStyle';
import Header from '../../components/Header';
import { getTermsAndConditions, getPrivacyPolicy } from '../../config/firebaseFirestore';
import { Text } from 'native-base';
var constants = require('../../config/Constants');

export default class TermsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      termsString: "",
    };
  }

  async componentDidMount(){
    let termStr = "";
    if(this.props.selectedTitle === 'terms'){
      termStr = await getTermsAndConditions(constants.LOCALE_EN);
    }
    else{
      termStr = await getPrivacyPolicy(constants.LOCALE_EN)
    }
    this.setState({termsString:termStr })
    
  }
  
  render() {
    let title = this.props.selectedTitle === 'terms' ? strings('termsScreen.termsTitle') : strings('termsScreen.privacyTitle')
    return (
      <View style={termsStyle.renderContainer}>
        <Header isleftArrowDisplay={true} title={title} isCrossIconVisible={true}/>
        {this.renderScrollView()}
      </View>
    );
  }

  renderScrollView(){
    return(
      <ScrollView style={termsStyle.textScrollView}>
        <Text style={{textAlign:'justify'}}>{this.state.termsString}</Text>
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
