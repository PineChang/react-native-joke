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
import CommonLoading from '../Common/loading'

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state={
      detail:null,
      css:null
    }
  }
  componentDidMount(){
    setTimeout(()=>{
      this.getData()
    },300)
  }
  getData(){
    fetch("http://news-at.zhihu.com/api/4/news/"+this.props.id)
    .then((response) => response.json())
    .then((responseJson) => {
      fetch('http://daily.zhihu.com/css/share.css?v=5956a')
      .then((responseCSS) => {
        // alert(JSON.stringify(responseCSS._bodyInit))  拼接css
        if(this.refs.webviewbridge){
          let cssLink = '<style>'+responseCSS._bodyInit+'</style>',
              imgLink = '<div class="img-wrap"><h1 class="headline-title">'+responseJson.title+'</h1><span class="img-source"></span><img src="'+responseJson.image+'" alt=""><div class="img-mask"></div></div>';
          this.setState({
            detail: cssLink + responseJson.body.replace(/<div class=\"img-place-holder\"><\/div>/,imgLink),
            css:responseJson.css[0]
          })
        }
      })
    })
  }
  renderHtml(){
    if(this.state.detail){
      return(
        <WebView
            style={{flex:1}}
            javaScriptEnabled={false}
            source={{html: this.state.detail}}
            />
      )
    }else{
      return (
        <CommonLoading />
      )
    }
  }
  render() {
    return (
      <View ref = "webviewbridge" style={{flexDirection:'column',flex:1,backgroundColor:'#ddd'}}>
          <View style={{alignItems:'stretch',height:50}}>
            <Header headerName="日报详情" navigator={this.props.navigator} hasBack="1"/>
          </View>
          {this.renderHtml()}
      </View>
    );
  }
}
const styles  = StyleSheet.create({

})
export default Detail;
