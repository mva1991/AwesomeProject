import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, ListView} from 'react-native';
import * as firebase from 'firebase';

const styles = require('./styles.js');
const firebaseConfig = {
  apiKey: "AIzaSyDKTvsqGoMn9ksXxaujXqciM2M5R0tuZlw",
  authDomain: "my-awesome-project-a8216.firebaseapp.com",
  databaseURL: "https://my-awesome-project-a8216.firebaseio.com",
  storageBucket: "my-awesome-project-a8216.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const StatusBar = require('./components/StatusBar');
const ActionButton = require('./components/ActionButton');
const ListItem = require('./components/ListItem');

class BlinkApp extends Component{

  constructor(props) {

  super(props);

  this.state = {
    dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  };
  this.itemsRef = this.getRef().child('items');
}

getRef() {
  console.log("Reference "+firebaseApp.database().ref().child('items'));
    return firebaseApp.database().ref();
  }

componentDidMount() {
  /*  this.setState({
      dataSource: this.state.dataSource.cloneWithRows([{ title: 'Pizza' }])
    })*/
    this.listenForItems(this.itemsRef);
  }
  _renderItem(item) {
      return (
        <ListItem item={item}  onPress = {() => {

        }}/>
      );

    }

    listenForItems(itemsRef) {
      console.log("Came 1");

    itemsRef.on('value', (snap) => {
      console.log("Came Here");

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        console.log("my data "+ child.key);
        items.push({
          title: child.val().title,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }
    render() {
      return (
        <View style={styles.container}>
          <StatusBar title="Potluck List" />
          <ListView dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)} style={styles.listview}/>

          <ActionButton title="Add" onpress={() => {}} />

        </View>
      );
    }


}






AppRegistry.registerComponent('AwesomeProject' , () => BlinkApp );
