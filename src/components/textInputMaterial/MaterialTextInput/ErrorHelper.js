import React, {PureComponent} from 'react';
import {Text} from 'react-native';
import PropTypes from 'prop-types';

export default class extends PureComponent {
  static propTypes = {
    error: PropTypes.string,
    errorPaddingTop: PropTypes.number,
    errorColor: PropTypes.string,
    errorFontSize: PropTypes.number,
  };

  static defaultProps = {
    errorPaddingTop: 8,
    errorColor: '#fc1f4a',
    errorFontSize: 12,
  };

  render() {
    let {error, errorColor, errorPaddingTop, errorFontSize} = this.props;

    return (
      <Text
        testID={'textinputcomponent_text_' + error}
        accessibilityLabel={'textinputcomponent_text_' + error}
        style={{
          paddingTop: errorPaddingTop,
          color: errorColor,
          fontSize: errorFontSize,
        }}>
        {error}
      </Text>
    );
  }
}
