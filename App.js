
import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View
  } from 'react-native';
import {createStackNavigator} from 'react-navigation'
import Principal from "./src/components/principal.js";
import Detail from "./src/components/detail.js";
import Breakfast from "./src/components/breakfast.js";
var SQLite = require('react-native-sqlite-storage')
var db = SQLite.openDatabase({name: 'Newdatabase.db', createFromLocation: '~hotelData.db'})

type Props = {};
 export default class App extends Component<Props> {
  render() {
    return (
      <AppStackNavigator/>
    );
  }
}
const AppStackNavigator = createStackNavigator({
  Principal: Principal,
  Detail: Detail,
  Breakfast: Breakfast
})
