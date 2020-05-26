import { StyleSheet, Dimensions } from 'react-native';

// eslint-disable-next-line no-undef
export default (styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    marginTop: 15,
    marginLeft: 10, 
    marginRight: 10,
    marginBottom: 5,
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