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
    renderImgOrText(item){
      if(item.images){
        return (
          <TouchableOpacity onPress={this.goDetail.bind(this,item.id)} style={styles.textContent}>
              <View style={{flex:2,alignItems:'flex-start'}}>
                  <Image
                    source={{uri:item.images[0]}}
                    style={{width: 70, height:70}}
                  />
              </View>
              <Text style={styles.word} numberOfLines={2}>
                {item.title}
              </Text>
         </TouchableOpacity>
        )
      }else{
        return (
          <TouchableOpacity onPress={this.goDetail.bind(this,item.id)} style={styles.textContent}>
              <Text style={styles.word} numberOfLines={2}>
                {item.title}
              </Text>
          </TouchableOpacity>
        )
      }
    }
    render(){
      let item = this.props.data;

      return(
        <View style={{backgroundColor:'#ddd'}}>
          {this.renderImgOrText(item)}
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
    paddingLeft:5,
    paddingRight:5,
    marginTop:10,
    borderRadius:4,
    height:100,
    flexDirection:'row',
    borderColor:'#fff',
    borderWidth:1
  },
  word:{
    fontSize:18,
    lineHeight:30,
    flex:7,
    paddingRight:5
  }
})
