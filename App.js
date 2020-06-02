/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { Router, Scene, ActionConst } from 'react-native-router-flux';
import splashscreen from './src/scenes/Splash';

import {
  GoogleAnalyticsTracker,
  GoogleAnalyticsSettings,
} from 'react-native-google-analytics-bridge';
import LoginScreen from './src/scenes/Login';
import ForgotPasswordScreen from './src/scenes/ForgotPassword';
import TermsScreen from './src/scenes/TermsAndPrivacy';
// import Realm from 'realm';
import HomeScreen from './src/scenes/Home';
import MyProfileScreen from './src/scenes/MyProfile';
import MoreScreen from './src/scenes/More';
import FavouriteScreen from './src/scenes/Favourites';
import SettingsScreen from './src/scenes/Settings';
import FBaseWrite from './src/scenes/FirebaseRW/FBaseWrite';
import FBaseReadItems from './src/scenes/FirebaseRW/FBaseReadItems';
import TabIcon from './src/components/TabIcon';
import Campaign from './src/scenes/Campaign'

import {
  StyleSheet
} from 'react-native'
console.disableYellowBox = true;
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    height:70
  },
  
  tabBarStyle: {
    borderTopWidth:1,
    borderTopColor:'transparent',
    height:70,
  },
  tabBarSelectedItemStyle: {
    height:70
  },
});

let realm;
let tracker = new GoogleAnalyticsTracker('G-LC2MDJK4YT');

// const store = configureStore();

export default class App extends Component {
  constructor(props) {
    super(props);
    // realm = new Realm({
    //   path: 'UserDatabase.realm',
    //   schema: [
    //     {
    //       name: 'user_details',
    //       properties: {
    //         user_name: 'string',
    //         user_password: 'string',
    //       },
    //     },
    //   ],
    // });
    // YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
    // YellowBox.ignoreWarnings(['Setting a timer']);
    // YellowBox.ignoreWarnings(['Warning: componentWillReceiveProps has been renamed']);

  }
  componentDidMount() {
    tracker.trackScreenView('Home Screen');
    GoogleAnalyticsSettings.setDispatchInterval(30);
  }

  render() {
    return (
      // <Provider /*store={store}*/>
      <Router hideNavBar={true}>
        <Scene key="root" hideNavBar>
          <Scene
            key="splash"
            component={splashscreen}
            initial={true}
            title="splash"
            duration={0}
          />
          <Scene
            key="login"
            type={ActionConst.RESET}
            component={LoginScreen}
            title="login"
            duration={0}
          />
          <Scene
            key="forgotPassword"
            component={ForgotPasswordScreen}
            title="Forgot Password"
            duration={0}
          />
          <Scene
            key="termsAndPrivacy"
            component={TermsScreen}
            title="Terms"
            duration={0}
          />
          {this.renderTabbar()}
        </Scene>
      </Router>
      // </Provider>
    );
  }

  renderTabbar() {
    return (
      <Scene
        key="tabbar"
        tabs={true}
        navTransparent={true}
        tabBarStyle={styles.tabBarStyle} tabBarSelectedItemStyle={styles.tabBarStyle}  hideNavBar={true} showLabel={false}>
        {/* Tab and it's scenes */}
        

        {/* Tab and it's scenes */}
        <Scene key="homeTab" title="HOME" icon={TabIcon}  initial={true} resource={require('./src/public/images/tab_home.png')} hideNavBar>
          <Scene key="home" component={HomeScreen} title="Blue" hideNavBar />
          <Scene key="createCampaign" component={Campaign} title="Blue" hideNavBar />
        </Scene>

        <Scene key="productTab" title="PRODUCTS" icon={TabIcon} resource={require('./src/public/images/tab_save.png')} hideNavBar>
          <Scene key="favourite" component={FavouriteScreen} title="home" />
        </Scene>

        <Scene key="orderTab" title="ORDER" icon={TabIcon}  resource={require('./src/public/images/tab_shop.png')} hideNavBar>
          <Scene key="order" component={MyProfileScreen} title="home" />
        </Scene>

        <Scene key="shopTab" title="SHOP" icon={TabIcon} resource={require('./src/public/images/tabbar_more.png')} hideNavBar>
          <Scene key="shop" component={SettingsScreen} title="home" />
        </Scene>

        {/* <Scene key="homeTab" title="My Procedures" icon={TabIcon} initial={true} homeTabar={true} resource={require('./src/public/images/letter_a_icon.png')} hideNavBar>
          <Scene key="home" component={HomeScreen} title="home" />
        </Scene> */}

        {/* Tab and it's scenes */}
        {/* <Scene key="plusTab" title="Plus" icon={TabIcon}  resource={require('./src/public/images/tabbar_more.png')}  hideNavBar>
          <Scene key="more" component={MoreScreen} title="More" />
        </Scene> */}
      </Scene>
    )
  }

  renderLaunchScreen() {
    return (
      <Scene key="splashRoot">
        <Scene
          key="splashScreen"
          component={splashscreen}
          title="Splash"
          initial
          hideNavBar
        />
      </Scene>
    );
  }
}
