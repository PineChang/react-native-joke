/*分类页面组件*/
import React,{Component} from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  PixelRatio,
  Dimensions
}from 'react-native'

import Category from './category'

export default class  ThemeList extends Component {
    constructor(props){
      super(props)
    }
    goCategory(id,name){
      const {navigator} = this.props;
      navigator.push({
          name: 'Category',
          component: Category,
          params:{
            id:id,
            name:name
          }
      })
    }
    render(){
      let item = this.props.data,
          {width}=Dimensions.get('window'),//屏幕宽度像素 px
          pixelRatio=PixelRatio.get(),//密度  200布局 * 密度 = 像素px
          imgWidth = width  - 20;
      return(
        <View style={{backgroundColor:'#ddd',paddingBottom:10}}>
          <TouchableOpacity onPress={this.goCategory.bind(this,item.id,item.name)} style={[styles.textContent,{height:imgWidth}]}>
            <Image
              source={{uri:item.thumbnail}}
              style={{height: imgWidth,width:imgWidth,borderRadius:4}}
              >
              <View style={[styles.intro,{width:imgWidth}]}>
                <Text style={styles.title} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.word} numberOfLines={2}>
                  {item.description}
                </Text>
              </View>
            </Image>
          </TouchableOpacity>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  textContent:{
    marginLeft:10,
    marginRight:10,
    marginTop:10,
    borderRadius:4,
    flexDirection:'row',
    borderColor:'#fff',
    overflow:'hidden'
  },
  intro:{
    bottom:0,
    position:'absolute',
    backgroundColor:'#000',
    opacity:0.6,
    height:90,
    flex:1
  },
  word:{
    fontSize:14,
    lineHeight:20,
    flex:1,
    padding:5,
    color:'#fff',
    opacity:1,
    height:40
  },
  title:{
    fontSize:20,
    flex:1,
    padding:5,
    color:'#fff',
    opacity:1,
    height:30,
    textAlign:'center'
  }
})
