import React, {PureComponent} from 'react';
import {View, TextInput, Platform, Image} from 'react-native';
import PropTypes from 'prop-types';
import Label from './Label';
import Placeholder from './Placeholder';
import Underline from './Underline';
import ErrorHelper from './ErrorHelper';
var colorConstants = require('../../../config/colorConstant');

export default class extends PureComponent {
  static propTypes = {
    ...TextInput.PropTypes,
    ...ErrorHelper.PropTypes,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChangeText: PropTypes.func,
    onContentSizeChange: PropTypes.func,
    minHeight: PropTypes.number,
    height: PropTypes.number,
    maxHeight: PropTypes.number,
    marginTop: PropTypes.number,
    marginRight: PropTypes.number,
    marginBottom: PropTypes.number,
    marginLeft: PropTypes.number,
    paddingTop: PropTypes.number,
    paddingRight: PropTypes.number,
    paddingBottom: PropTypes.number,
    paddingLeft: PropTypes.number,
    color: PropTypes.string,
    activeColor: PropTypes.string,
    fontFamily: PropTypes.string,
    fontSize: PropTypes.number,
    fontWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    ...ErrorHelper.defaultProps,
    onFocus: () => {},
    onBlur: () => {},
    onChangeText: () => {},
    onContentSizeChange: () => {},
    value: null,
    marginBottom: 8,
    paddingTop: 20,
    paddingRight: 0,
    paddingBottom: 8,
    paddingLeft: 8,
    color: '#273039',
    fontSize: 16,
    fontWeight: 'normal',
  };

  constructor(props) {
    super(props);

    this.state = {
      value: null,
      focused: false,
      height: props.fontSize * 1.5,
    };
  }

  passwordInputPaddingRight() {
    if (this.props.refsValue === 'passwordInput') {
      return {paddingRight: 35};
    }
    return {};
  }

  render() {
    let {focused, height} = this.state;
    let value = this.props.value != null ? this.props.value : this.state.value;
    let hasValue = value && value.length > 0;
    let active = focused || hasValue;
    let {
      minHeight,
      maxHeight,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      color,
      activeColor,
      fontFamily,
      fontSize,
      fontWeight,
      label,
      labelDuration,
      labelColor,
      labelActiveTop,
      labelActiveColor,
      labelActiveScale,
      placeholder,
      placeholderColor,
      underlineDuration,
      underlineHeight,
      underlineColor,
      underlineActiveColor,
      underlineActiveHeight,
      error,
      errorColor,
      errorPaddingTop,
      errorFontSize,
      ...props
    } = this.props;
    let labelProps = {
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      activeColor,
      fontFamily,
      fontSize,
      fontWeight,
      label,
      labelDuration,
      labelColor,
      labelActiveTop,
      labelActiveColor,
      labelActiveScale,
      focused,
      hasValue,
      error,
      errorColor,
    };
    let placeholderProps = {
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      fontFamily,
      fontSize,
      fontWeight,
      placeholder,
      placeholderColor,
      focused,
      hasValue,
    };
    let underlineProps = {
      activeColor,
      underlineDuration,
      underlineHeight,
      underlineColor,
      underlineActiveColor,
      underlineActiveHeight,
      focused,
      error,
      errorColor,
    };
    let containerStyle = {
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
    };
    if (props.multiline && props.height) {
      // Disable autogrow if height prop
      height = props.height;
    }
    
    let inputStyle = {
      minHeight,
      maxHeight,
      paddingTop,
      paddingBottom,
      paddingLeft,
      color,
      fontFamily,
      fontSize,
      fontWeight,
      ...Platform.select({
        ios: {
          height:
            paddingTop +
            paddingBottom +
            (props.multiline ? height : fontSize * 1.5),
            
        },
        android: {
          height: props.multiline
            ? height
            : fontSize * 1.5 + paddingTop + paddingBottom,
          textAlignVertical: 'top',
           
        },
      }),
    };
    let errorProps = {
      error,
      errorColor,
      errorPaddingTop,
      errorFontSize,
    };
    let paddingStyle = this.passwordInputPaddingRight();
    return (
      <View
        testID={'textinputcomponent_view_' + value}
        accessibilityLabel={'textinputcomponent_view_' + value}
        style={containerStyle}>
        <Label {...labelProps} />
        {placeholder ? <Placeholder {...placeholderProps} /> : null}
        <TextInput
          testID={'textinputcomponent_image_' + value}
          accessibilityLabel={'textinputcomponent_image_' + value}
          ref="input"
          style={[inputStyle, paddingStyle]}
          underlineColorAndroid="transparent"
          onFocus={this._handleFocus}
          onBlur={this._handleBlur}
          onChangeText={this._handleChangeText}
          onContentSizeChange={this._handleContentSizeChange}
          value={value}
          returnKeyType={this.props.returnKeyType}
          keyboardType={this.props.keyboardType}
          autoCompleteType={this.props.autoCompleteType}
          autoCorrect={this.props.autoCorrect}
          textContentType={this.props.textContentType}
          maxLength={this.props.maxLength}
          autoCapitalize={this.props.autoCapitalize}
          multiline={this.props.multiline}
          numberOfLines={this.props.numberOfLines}
          onSubmitEditing={this.props.onSubmitEditing}
          secureTextEntry={this.props.secureTextEntry}
          pointerEvents={this.props.pointerEvents}
          onBlur1={this.props.onBlur1}
          editable={this.props.editable}
          onTouchStartLabel={this.props.onTouchStartLabel}
          onTouchStart={this.props.onTouchStart}
        />
        {this.renderIcon()}
        <Underline {...underlineProps} />
        {error ? <ErrorHelper {...errorProps} /> : null}
      </View>
    );
  }
  renderIcon() {
    let showIcon = this.props.showIcon == false ? false : true;
    if (showIcon) {
      if (
        this.props.underlineColor == colorConstants.MATERIAL_DESIGN_ERROR_COLOR
      ) {
        return (
          <View
            testID={'textinputcomponent_view_iconCrossCheck'}
            accessibilityLabel={'textinputcomponent_view_iconCrossCheck'}
            style={{position: 'absolute', right: 10, top: 20}}>
            <Image
              testID={'textinputcomponent_image_iconCrossCheck'}
              accessibilityLabel={'textinputcomponent_image_iconCrossCheck'}
              style={{width: 20, height: 20}}
              source={require('../../.././public/images/icon-cross-check.png')}
            />
          </View>
        );
      } else if (
        this.props.underlineColor ==
        colorConstants.MATERIAL_DESIGN_SUCCESS_COLOR
      ) {
        return (
          <View
            testID={'textinputcomponent_view_iconConfirmCheck'}
            accessibilityLabel={'textinputcomponent_view_iconConfirmCheck'}
            style={{position: 'absolute', right: 10, top: 20}}>
            <Image
              testID={'textinputcomponent_image_iconConfirmCheck'}
              accessibilityLabel={'textinputcomponent_image_iconConfirmCheck'}
              style={{width: 20, height: 20}}
              source={require('../../.././public/images/icon-confirm-check.png')}
            />
          </View>
        );
      }
    }
  }
  inputRef() {
    return this.refs.input;
  }

  focus() {
    this.inputRef().focus();
  }
  blur() {
    this.inputRef().blur();
  }

  _handleFocus = (...args) => {
    let {onFocus} = this.props;
    this.setState({focused: true});
    onFocus(...args);
  };

  _handleBlur = (...args) => {
    let {onBlur} = this.props;
    this.setState({focused: false});
    onBlur(...args);
  };

  _handleChangeText = (...args) => {
    let {onChangeText, value} = this.props;

    // Make support of uncontrolled component
    if (value == null) {
      this.setState({value: args[0]});
    }

    onChangeText(...args);
  };

  _handleContentSizeChange = event => {
    let {onContentSizeChange, fontSize} = this.props;
    let {height} = event.nativeEvent.contentSize;

    this.setState({
      height: Math.max(fontSize * 1.5, Math.ceil(height)),
    });

    onContentSizeChange(event);
  };
}
