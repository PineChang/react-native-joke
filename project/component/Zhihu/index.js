import React,{Component} from 'react'
import{
  View,
  StyleSheet,
  TouchableOpacity,
  ListView,
  Text
}from 'react-native'

import DayList from './list'

class Zhihu extends Component {
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
    fetch('http://news-at.zhihu.com/api/4/news/latest')
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
        <ListView
           dataSource={this.state.ds}
           renderRow={(rowData) =><DayList data={rowData} navigator={this.props.navigator} />}
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
export default Zhihu
