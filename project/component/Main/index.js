/*
入口文件
*/
import React ,{Component} from 'react';
import {
   View,
   Navigator,
   BackAndroid,
   ToastAndroid
} from 'react-native';

// import HomePage from '../Home/index.js';
import {ScrollHeader} from './header.js'

export default class SampleComponent extends Component {
  constructor(props) {
      super(props);
      this._onBackAndroid = this._onBackAndroid.bind(this);
  }
  componentWillMount() {
      BackAndroid.addEventListener('hardwareBackPress', this._onBackAndroid);
  }
  _onBackAndroid() {
      let navigator = this.refs.navigator;
      let routers = navigator.getCurrentRoutes();
      if (routers.length > 1) {
          navigator.pop();
          return true;
      } else {
          if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
              return false;
          }
          this.lastBackPressed = Date.now();
          ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
          return true;
      }

  }
  render() {
       let Home = 'ScrollHeader',
           homeComponent = ScrollHeader;
       return (
       <Navigator
         ref="navigator"
         initialRoute={{ name: Home, component: homeComponent }}
         configureScene={(route) => {
                return Navigator.SceneConfigs.FloatFromRight  ;
              }}
         renderScene={(route, navigator) => {
           let Component = route.component;
           return <Component {...route.params} navigator={navigator} />
         }} />
       );
   }
}
