import React,{Component} from 'react'
import{
  View,
  Text,
  StyleSheet,
  TouchableOpacity
}from 'react-native'

import ScrollableTabView from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons'
import TextList from '../Text/index'
import ImageList from '../Img/index'


//普通header
class Header extends  Component {
  constructor(props) {
    super(props)
  }
  _showBack(){
    if(this.props.hasBack){
      return (
        <View>
        </View>
      )
    }
  }
  render (){
    return(
      <View style={styles.header}>
        {this._showBack()}
        <Text style={styles.name} numberOfLines={1}>{this.props.headeName}</Text>
      </View>
    )
  }
}


//scroll组件header
class Tabbar extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    _renderTab(tab, i) {
        let color = this.props.activeTab == i ? "#33cd5f" : "#888";
        return (
            <TouchableOpacity
                onPress={()=>this.props.goToPage(i)}
                style={styles.tab}
                key={i}
            >
                <View style={styles.tabItem}>
                    <Icon
                        name={this.props.tabIconNames[i]}
                        size={25}
                        color={color}
                    />
                    <Text style={{color: color}}>{tab}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.tabs}>
                {this.props.tabs.map((tab, i) => this._renderTab(tab, i))}
            </View>
        )
    }
}

class ScrollHeader extends Component{
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['文字', '图片'],
            tabIconNames: ['ios-home-outline', 'ios-list-outline']
        }
    }

    render() {
        return (
            <View   style={{flex: 1}}>
              <Header navigator={this.props.navigator} headeName="开心笑一笑" hasBack="false" />
              <ScrollableTabView
                  style={{backgroundColor: '#FCFCFC'}}
                  locked={false}
                  scrollWithoutAnimation={true}
                  tabBarPosition={'top'}
                  renderTabBar={() => <Tabbar tabNames={this.state.tabNames} tabIconNames={this.state.tabIconNames}/>}
              >
                  <TextList tabLabel="文字" navigator={this.props.navigator}/>
                  <ImageList tabLabel="图片" navigator={this.props.navigator}/>
              </ScrollableTabView>
          </View>
        )
    }
}


const styles = StyleSheet.create({
    header:{
      height:50,
      backgroundColor:'#099fde',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'
    },
    name:{
      color:'#fff',
      fontSize:14,
      flex:10,
      textAlign:'center'
    },
    tabs: {
        flexDirection: 'row',
        height: 55,
        borderBottomWidth: 1,
        borderColor: '#ddd'
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabItem: {
        flexDirection: 'column',
        alignItems: 'center'
    }
})

export {ScrollHeader,Header}
