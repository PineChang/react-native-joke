import React,{Component} from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  WebView
}from 'react-native'

class TextContent extends Component {
    constructor(props){
      super(props)
    }
    output(text){
      text = text.replace(/<[^>]*>/g,"");
      return(
        <Text style={styles.word}>
          {text}
        </Text>
      )
    }
    render(){
      let item = this.props.data;

      return(
        <View style={styles.textContent}>
          {this.output(item.text)}
        </View>
      )

    }
}

class ImgContent extends Component{
  constructor(props){
    super(props)
  }
  output(text){
    text = text.replace(/<[^>]*>/g,"");
    return(
      <Text style={styles.word}>
        {text}
      </Text>
    )
  }
  render(){
    let item = this.props.data;

    return(
      <View style={styles.textContent}>
        <Text style={styles.word}>{item.title}</Text>
        <Image
          source={{uri:item.img}}
          style={{width: 400, height:400}} 
          />
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
    fontSize:16,
    lineHeight:30
  }
})

export {TextContent,ImgContent}
