/*关于页面*/
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import {Header} from '../Main/header.js'


export default class About extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={{flexDirection:'column',flex:1,backgroundColor:'#ddd'}}>
          <View style={{alignItems:'stretch',height:50}}>
            <Header headerName="关于软件" navigator={this.props.navigator} hasBack="1"/>
          </View>
          <Text style={styles.word}>1：本软件属于个人学习产品，本着学习的原则，非盈利！</Text>
          <Text style={styles.word}>2：当前版本 1.0.0，不定期更新</Text>
      </View>
    )
  }
}
const styles  = StyleSheet.create({
  word:{
    lineHeight:20,
    fontSize:16,
    padding:5,
    marginTop:10
  }
})
