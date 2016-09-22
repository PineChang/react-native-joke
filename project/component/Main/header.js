import React,{Component} from 'react'
import{
  View,
  Text,
  StyleSheet,
  TouchableOpacity
}from 'react-native'

import ScrollableTabView from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons'
import ZhihuNew from '../Zhihu/index'
import ZhihuTheme from '../Zhihu/theme'
import About from '../About/about'
import Detail from '../Zhihu/detail'

//普通header
class Header extends  Component {
  constructor(props) {
    super(props)
  }
  _onPressBack(){
    const {navigator} = this.props;
    navigator.pop()
  }
  _showBack(){
    if(this.props.hasBack == 1){
      return (
        <TouchableOpacity  style={styles.backBtn} onPress={this._onPressBack.bind(this)}>
          <View style={{flexDirection: 'row', alignItems: 'center' }}>
              <Icon
                  name='ios-arrow-dropleft'
                  size={25}
                  color='#fff'
              />
          </View>
        </TouchableOpacity>
      )
    }
  }
  render (){
    return(
      <View style={styles.header}>
        {this._showBack()}
        <Text style={styles.name} numberOfLines={1}>{this.props.headerName}</Text>
        <Text style={{flex:this.props.hasBack == 1 ? 1 : 0}}></Text>
      </View>
    )
  }
}

class HomeHeader extends  Component {
  constructor(props) {
    super(props)
  }
  _onPressBack(){
    const {navigator} = this.props;
    navigator.push({
        name: 'About',
        component: About
    })
  }
  render (){
    return(
      <View style={styles.header}>
        <Text style={{flex:1}}></Text>
        <Text style={styles.name} numberOfLines={1}>{this.props.headerName}</Text>
        <TouchableOpacity  style={styles.backBtn} onPress={this._onPressBack.bind(this)}>
            <View style={{flexDirection: 'row', alignItems: 'center' }}>
                <Icon
                    name='ios-information-outline'
                    size={25}
                    color='#fff'
                />
            </View>
        </TouchableOpacity>
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
        let color = this.props.activeTab == i ? "#099fde" : "#888";
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
            tabNames: ['每日最新','文字', '图片'],
            tabIconNames: ['ios-home-outline', 'ios-list-outline', 'ios-list-outline']
        }
    }

    render() {
        return (
            <View   style={{flex: 1}}>
              <HomeHeader navigator={this.props.navigator} headerName="知乎简报" />
              <ScrollableTabView
                  style={{backgroundColor: '#FCFCFC'}}
                  locked={false}
                  scrollWithoutAnimation={true}
                  tabBarPosition={'bottom'}
                  renderTabBar={() => <Tabbar tabNames={this.state.tabNames} tabIconNames={this.state.tabIconNames}/>}
              >
                  <ZhihuNew tabLabel="每日最新" navigator={this.props.navigator}/>
                  <ZhihuTheme tabLabel="分类主题" navigator={this.props.navigator}/>
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
      flex:5,
      textAlign:'center'
    },
    tabs: {
        flexDirection: 'row',
        height: 55,
        borderTopWidth: 1,
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
    },
    backBtn:{
      flex:1,
      height:50,
      justifyContent:'center',
      alignItems:'center'
    }
})

export {ScrollHeader,Header}
