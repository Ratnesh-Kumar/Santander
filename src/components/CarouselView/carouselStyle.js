import { StyleSheet, Dimensions } from 'react-native';

// eslint-disable-next-line no-undef
export default (styles = StyleSheet.create({
  container: {
    flex:1,
   height: 300, width: 300, backgroundColor: 'red'
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
}));