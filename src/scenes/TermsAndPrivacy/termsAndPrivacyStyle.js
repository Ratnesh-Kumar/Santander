import { StyleSheet, Dimensions } from 'react-native';

// eslint-disable-next-line no-undef
export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  viewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  temsTextcontainer: {
    paddingLeft: 10,
    paddingRight: 10,
    margin: 20,
    justifyContent:'center',
    alignItems:'center',
    fontWeight: 'bold',
  },
  textScrollView: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
  },
}));