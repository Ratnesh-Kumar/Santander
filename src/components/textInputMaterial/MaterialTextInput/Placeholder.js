/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import {Text} from 'react-native';
import PropTypes from 'prop-types';

export default class extends PureComponent {
  static propTypes = {
    placeholder: PropTypes.string,
    placeholderColor: PropTypes.string,
  };

  static defaultProps = {
    placeholderColor: '#273039',
  };

  render() {
    let {
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      fontFamily,
      fontSize,
      fontWeight,
      placeholder,
      placeholderColor,
      hasValue,
      focused,
    } = this.props;

    return (
      <Text
        testID={'textinputcomponent_text_' + placeholder}
        accessibilityLabel={'textinputcomponent_text_' + placeholder}
        style={{
          position: 'absolute',
          top: 0,
          paddingTop,
          paddingRight,
          paddingBottom,
          paddingLeft,
          color: placeholderColor,
          backgroundColor: 'transparent',
          opacity: focused && !hasValue ? 1 : 0,
          fontFamily,
          fontSize,
          fontWeight,
        }}
        pointerEvents="none"
        numberOfLines={1}>
        {placeholder}
      </Text>
    );
  }
}
