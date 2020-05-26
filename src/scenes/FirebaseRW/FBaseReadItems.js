import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ItemComponent from './ItemComponent';
import {TBC_COLOR} from '../../config/colorConstant';

import {db} from '../../config/db';

let itemsRef = db.ref('/items');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#2a8ab7',
  },
});

export default class ListItem extends Component {
  state = {
    items: [],
  };

  componentDidMount() {
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      this.setState({items});
    });
  }

  renderSeparator = () => {
    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: TBC_COLOR,
        }}
      />
    );
  };
  render() {
    return (
      <View style={styles.container}>
        {this.state.items.length > 0 ? (
          <ItemComponent items={this.state.items} />
        ) : (
          <Text>No items</Text>
        )}
      </View>
    );
  }
}
