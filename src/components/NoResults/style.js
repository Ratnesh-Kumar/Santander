import {StyleSheet, Dimensions} from 'react-native';
var Constants = require('../../Config/Constants');

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height,
    width,
    marginTop: -100,
  },
  text: {
    marginTop: 20,
    fontSize: 25,
    fontFamily: 'Avenir',
    color: Constants.PRIMARY_TEXT_COLOR,
  },
});
