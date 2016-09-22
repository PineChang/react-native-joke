import React,{Component} from 'react'
import{
  View,
  ListView
}from 'react-native'

import ThemeList from '../Theme/indexList'
import CommonLoading from '../Common/loading'

class ZhihuTheme extends Component {
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
    fetch('http://news-at.zhihu.com/api/4/themes')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        listResource:this.state.listResource.concat(responseJson.others),
        pageIndex:this.state.pageIndex +1,
        ds:this.state.ds.cloneWithRows(this.state.listResource.concat(responseJson.others))
      })
      if(responseJson.others.length < 10){
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
           renderRow={(rowData) =><ThemeList data={rowData} navigator={this.props.navigator} />}
         />
      )
    }else{
      return (
         <CommonLoading />
      )
    }
  }
}

export default ZhihuTheme
