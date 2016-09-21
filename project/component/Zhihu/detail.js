import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  Navigator,
  TouchableOpacity,
  WebView,
  View
} from 'react-native';

import {Header} from '../Main/header.js'


class Detail extends Component {
  constructor(props) {
    super(props);
    this.state={detail:'<div style="margin-top:50px;text-align:center">正在加载数据...</div>'}
  }
  componentDidMount(){
      fetch("http://news-at.zhihu.com/api/4/news/"+this.props.id)
      .then((response) => response.json())
      .then((responseJson) => {
        if(this.refs.webWiewId){
          this.setState({detail:responseJson.body})
        }
      })
  }
  render() {
    return (
      <View style={{flexDirection:'column',flex:1}}>
          <View style={{alignItems:'stretch',height:50}}>
            <Header headerName="日报详情" navigator={this.props.navigator} hasBack="true"/>
          </View>
          <WebView
              ref = "webWiewId"
              style={{flex:1}}
              source={{html: this.state.detail}}
              />
      </View>
    );
  }
}
const styles  = StyleSheet.create({

})
export default Detail;
