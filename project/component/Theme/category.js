/*分类列表单个首页*/
import React,{Component} from 'react'
import{
  View,
  StyleSheet,
  TouchableOpacity,
  ListView,
  Text
}from 'react-native'

import DayList from '../Zhihu/list'
import {Header} from '../Main/header'

export default class Category extends Component {
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
    fetch('http://news-at.zhihu.com/api/4/theme/'+this.props.id)
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({
          listResource:this.state.listResource.concat(responseJson.stories),
          pageIndex:this.state.pageIndex +1,
          ds:this.state.ds.cloneWithRows(this.state.listResource.concat(responseJson.stories))
        })
        if(responseJson.stories.length < 10){
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
        <View style={{flex:1,backgroundColor:'#ddd'}}>
            <Header headerName={this.props.name} hasBack="1" navigator={this.props.navigator} />
            <ListView
               dataSource={this.state.ds}
               renderRow={(rowData) =><DayList data={rowData} navigator={this.props.navigator} />}
             />
        </View>
      )
    }else{
      return (
         <View style={{flex:1,backgroundColor:'#ddd'}}>
             <Header headerName={this.props.name} hasBack="1" navigator={this.props.navigator} />
             <View
                   style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
             >
                 <Text style={styles.info}>正在加载</Text>
             </View>
         </View>
      )
    }
  }
}

const styles = StyleSheet.create({

})
