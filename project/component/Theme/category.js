/*分类列表单个首页*/
import React,{Component} from 'react'
import{
  View,
  StyleSheet,
  ListView
}from 'react-native'

import DayList from '../Zhihu/list'
import {Header} from '../Main/header'
import CommonLoading from '../Common/loading'

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
      if(this.refs.categoryId ){
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
      }
    })
  }
  componentDidMount(){
      setTimeout(()=>{
        this.getData()
      },300)
  }
  renderList(){
    if(this.state.listResource.length){
      return (
            <ListView
             dataSource={this.state.ds}
             initialListSize ={10}
             renderRow={(rowData) =><DayList data={rowData} navigator={this.props.navigator} />}
           />
       )
    }else{
      return (
         <CommonLoading />
      )
    }
  }
  render(){

    return (
      <View ref="categoryId" style={{flex:1,backgroundColor:'#ddd'}}>
          <Header headerName={this.props.name} hasBack="1" navigator={this.props.navigator} />
          {this.renderList()}
      </View>
    )
  }
}

const styles = StyleSheet.create({

})
