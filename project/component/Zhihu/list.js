import React,{Component} from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  WebView
}from 'react-native'

export default class  DayList extends Component {
    constructor(props){
      super(props)
    }
    render(){
      let item = this.props.data;

      return(
        <View style={styles.textContent}>

          <Text style={styles.word}>
            {item.title}
          </Text>
          <Image
            source={{uri:item.images[0]}}
            style={{width: 100, height:100}}
          />
          https://github.com/izzyleung/ZhihuDailyPurify/wiki/%E7%9F%A5%E4%B9%8E%E6%97%A5%E6%8A%A5-API-%E5%88%86%E6%9E%90
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
    borderColor:'#ddd'
  },
  word:{
    fontSize:20,
    lineHeight:30,
    fontWeight: 'bold',
  }
})
