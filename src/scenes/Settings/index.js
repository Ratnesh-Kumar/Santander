import React, { Component } from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';
import settingsStyle from './settingsStyle';
import ImagePicker from 'react-native-image-picker';
var settingConstants = require('./settingsConstants')

export default class SettingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filePath: {},
    };
  }
  chooseFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          filePath: source,
        });
      }
    });
  };

  render() {
    return (
      <View style={settingsStyle.container}>
        <Header title={settingConstants.SETTINGS_SCREEN} />
        <View style={settingsStyle.viewContainer}>
          <Text style={settingsStyle.welcome}>{settingConstants.SETTINGS_SCREEN}</Text>
          <View style={styles.container}>
          {/*<Image 
          source={{ uri: this.state.filePath.path}} 
          style={{width: 100, height: 100}} />*/}
          <Image
            source={{
              uri: 'data:image/jpeg;base64,' + this.state.filePath.data,
            }}
            style={{ width: 100, height: 100 }}
          />
          {/* <Image
            source={{ uri: this.state.filePath.uri }}
            style={{ width: 250, height: 250 }}
          /> */}
          <Text style={{ alignItems: 'center' }}>
            {this.state.filePath.uri}
          </Text>
          <TouchableOpacity onPress={this.chooseFile.bind(this)} >
            <Text>Choose File</Text>
            </TouchableOpacity>
        </View>
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

