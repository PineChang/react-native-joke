import React,{Component} from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity
}from 'react-native'

import Detail from './detail'
//  https://github.com/izzyleung/ZhihuDailyPurify/wiki/%E7%9F%A5%E4%B9%8E%E6%97%A5%E6%8A%A5-API-%E5%88%86%E6%9E%90
export default class  DayList extends Component {
    constructor(props){
      super(props)
    }
    goDetail(id){
      const {navigator} = this.props;
      navigator.push({
          name: 'Detail',
          component: Detail,
          params:{
            id:id
          }
      })
    }
    render(){
      let item = this.props.data;

      return(
        <View >
          <TouchableOpacity onPress={this.goDetail.bind(this,item.id)} style={styles.textContent}>
            <Text style={styles.word} numberOfLines={3}>
            {item.title}
            </Text>
            <View style={{flex:3}}>
                <Image
                  source={{uri:item.images[0]}}
                  style={{width: 100, height:100}}
                />
            </View>
          </TouchableOpacity>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  textContent:{
    backgroundColor:'#fff',
    marginLeft:5,
    marginRight:5,
    paddingTop:15,
    paddingBottom:15,
    borderBottomWidth:1,
    borderColor:'#ddd',
    height:130,
    flexDirection:'row'
  },
  word:{
    fontSize:18,
    lineHeight:30,
    flex:7,
    paddingRight:5
  }
})
