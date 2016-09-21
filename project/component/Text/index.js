import React,{Component} from 'react'
import{
  View,
  StyleSheet,
  TouchableOpacity,
  ListView,
  Text
}from 'react-native'

import {TextContent} from '../List/list'

class TextList extends Component {
  constructor(props){
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    super(props);
    this.state={
      listResource:[],
      isAllLoad:false,
      pageIndex:1,
      ds:ds
    };
  }
  getData(){
    fetch('http://apis.baidu.com/showapi_open_bus/showapi_joke/joke_text?page='+this.state.pageIndex, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "apikey":"3936415a8d4baff336b0f0470e24726a"
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        listResource:this.state.listResource.concat(responseJson.showapi_res_body.contentlist),
        pageIndex:this.state.pageIndex +1,
        ds:this.state.ds.cloneWithRows(this.state.listResource.concat(responseJson.showapi_res_body.contentlist))
      })
      if(responseJson.showapi_res_body.contentlist.length != 20){
        this.setState({
          isAllLoad:true
        })
      }
    })
  }
  componentDidMount(){
      this.getData()
  }
  _onEndReached(){
    if(this.state.isAllLoad){
      return ;
    }
    this.getData()
  }
  render(){
    if(this.state.listResource.length){
      return (
        <ListView
           dataSource={this.state.ds}
           onEndReached={this._onEndReached.bind(this)}
           renderRow={(rowData) =><TextContent data={rowData} navigator={this.props.navigator} />}
         />
      )
    }else{
      return (
         <View
               style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
         >
             <Text style={styles.info}>正在加载</Text>
         </View>
      )
    }
  }
}

const styles = StyleSheet.create({

})
export default TextList
