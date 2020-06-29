/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { Router, Scene, ActionConst, Reducer, Actions } from 'react-native-router-flux';
import splashscreen from './src/scenes/Splash';
import {
  GoogleAnalyticsTracker,
  GoogleAnalyticsSettings,
} from 'react-native-google-analytics-bridge';
import { strings } from './src/i18next/i18n';
import LoginScreen from './src/scenes/Login';
import ForgotPasswordScreen from './src/scenes/ForgotPassword';
import TermsScreen from './src/scenes/TermsAndPrivacy';
// import Realm from 'realm';
import HomeScreen from './src/scenes/Home';
import TabIcon from './src/TabIcon';
import Campaign from './src/scenes/Campaign'
import CreateCampaign from './src/scenes/Campaign/createCampaign';
import ShopSettingScreen from './src/scenes/ShopSettings'
import RegisterCreateCampaign from './src/scenes/Campaign/registerCreateCampaign';
import CreateCampaignShare from './src/scenes/Campaign/createCampaignShare';
import BusinessProfile from './src/scenes/BusinessProfile';
import RegisterScreen from './src/scenes/Register';
import QRCode from './src/scenes/QRCode';
import Browser from './src/components/Browser';
import MyOrder from './src/scenes/MyOrder';
import EditOrder from './src/scenes/MyOrder/editOrder';
import ManageCampaign from './src/scenes/Campaign/manageCampaign';
import TrackInformation from './src/scenes/MyOrder/trackInformation';
import ShopTabScreen from './src/scenes/ShopTab'
import ManageProduct from './src/scenes/Products';
import AddProduct from './src/scenes/Products/addProduct';
import AddProductCategory from './src/scenes/Products/addProductCategory';
import VarientDetail from './src/scenes/Campaign/varientDetail';
import ProductVarientDetail from './src/scenes/Products/productVarientDetail'
import {
  StyleSheet
} from 'react-native'

console.disableYellowBox = true;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 48
  },

  tabBarStyle: {
    borderTopWidth: 1,
    borderTopColor: 'transparent',
    height: 48,
  },
  tabBarSelectedItemStyle: {
    height: 48
  },
});

let realm;
let tracker = new GoogleAnalyticsTracker('G-LC2MDJK4YT');

// const store = configureStore();

export default class App extends Component {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    tracker.trackScreenView('Home Screen');
    GoogleAnalyticsSettings.setDispatchInterval(30);
  }

  render() {
    return (
      // <Provider /*store={store}*/>
      <Router hideNavBar={true} createReducer={reducerCreate}>
        <Scene key="root" hideNavBar>
          <Scene key="splash" component={splashscreen} initial={true} title="splash" duration={0} />
          <Scene key="login" type={ActionConst.RESET} component={LoginScreen} title="login" duration={0} />
          <Scene key="forgotPassword" component={ForgotPasswordScreen} title="Forgot Password" duration={0} />
          <Scene key="termsAndPrivacy" component={TermsScreen} title="Terms" duration={0} />
          <Scene key="registerCreateCampaign" component={RegisterCreateCampaign} title="Terms" duration={0} />
          <Scene key="register" component={RegisterScreen} title="register" duration={0} />
          <Scene key="browser" component={Browser} title="Facebook Share" duration={0} />

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
        tabBarStyle={styles.tabBarStyle} tabBarSelectedItemStyle={styles.tabBarStyle} hideNavBar={true} showLabel={false}>
        {/* Tab and it's scenes */}


        {/* Tab and it's scenes */}
        <Scene key="homeTab" title={strings("tabs.homeTab")} tabTitle="Home" icon={TabIcon} initial={true} resource={require('./src/public/images/tab_home.png')} hideNavBar>
          <Scene key="home" component={HomeScreen} title="Blue" hideNavBar />
          <Scene key="campaign" component={Campaign} title="Blue" hideNavBar />
          <Scene key="createCampaign" component={CreateCampaign} title="Blue" hideNavBar />
          <Scene key="createCampaignShare" component={CreateCampaignShare} title="Terms" hideNavBar />
          <Scene key="manageCampaign" component={ManageCampaign} title="Manage Campaign" hideNavBar />
          <Scene key="qrCode" component={QRCode} title="Terms" hideNavBar />
          <Scene key="campaignVarient" component={VarientDetail} title="Varient Detail" hideNavBar />
          <Scene key="browser" component={Browser} title="Facebook Share" duration={0} />
        </Scene>

        <Scene key="productTab" title={strings("tabs.productTab")} tabTitle="Products" icon={TabIcon} resource={require('./src/public/images/tab_save.png')} hideNavBar>
          {/* <Scene key="favourit" component={FavouriteScreen} title="Blue" hideNavBar /> */}
          <Scene key="manageProduct" component={ManageProduct} title="Blue" hideNavBar />
          <Scene key="addProduct" component={AddProduct} title="Blue" hideNavBar />
          <Scene key="addProductCategory" component={AddProductCategory} title="Terms" hideNavBar />
          <Scene key="productVarient" component={ProductVarientDetail} title="Varient Detail" hideNavBar />
        </Scene>

        <Scene key="orderTab" title={strings("tabs.orderTab")} tabTitle="Order" icon={TabIcon} resource={require('./src/public/images/tab_shop.png')} hideNavBar>
          <Scene key="myOrder" component={MyOrder} title="home" />
          <Scene key="editOrder" component={EditOrder} title="editOrder" />
          <Scene key="trackInformation" component={TrackInformation} title="Track Information" />
        </Scene>

        <Scene key="shopTab" title={strings("tabs.settingTab")} tabTitle="Settings" icon={TabIcon} resource={require('./src/public/images/tabbar_more.png')} hideNavBar>
          <Scene key="shop" component={ShopTabScreen} title="home" />
          <Scene key="businessProfile" component={BusinessProfile} title="businessProfile" duration={0} />
          <Scene key="shopSetting" component={ShopSettingScreen} title="Shop Settings" hideNavBar />
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
/*Method Name   : inTabMenu
    Description     : Check Clicked Action key present in Tab
    Author          : Avnish Chuchra*/
const inTabMenu = (state) => {
  // console.log(JSON.stringify(state))
  if (state && state.routes && state.routes.length > 1) {
    if (state.routes[1].routeName == "tabbar") {
      return true
    }
  }
  return false;
};

const getChildLength = (state) => {
  if (state && state.children && state.children.length > 0) {
    return state.children.length;
  }
  return false;
}
/*Method Name   : getChildName
    Description     : Get childe scene of tabbar
    Author          : Avnish Chuchra*/
const getChildName = (state, index) => {
  if (state && state.children && state.children.length > 0) {
    return state.children[index].name;
  }
  return false;
}


/*Method Name   : getActiveTabName
    Description     : Get open tabbar Name
    Author          : Avnish Chuchra*/
const getActiveTabName = (state) => {
  if (state && state.routes && state.routes.length > 1) {
    let route = state.routes[1]

    if (route.routeName == "tabbar") {
      let routeIndex = route.index;
      let routeItem = route.routes[routeIndex];
      return routeItem.key
    }
    return undefined;
  }
};
/*Method Name   : getTabTreeIndex
    Description     : Get index of open class on tabbar
    Author          : Avnish Chuchra*/
const getTabTreeIndex = (state) => {
  if (state && state.children && state.children.length > 0) {
    let cbase, parent = null, base = state;
    while (cbase = base.children) {
      parent = base;
      base = cbase[base.index];
    }
    return parent.index;
  }
  return undefined;
};


/*Method Name   : getTabRootName
    Description     : Get Root class of tabbar
    Author          : Avnish Chuchra*/
const getTabRootName = (state) => {
  if (state && state.children && state.children.length > 0) {
    let cbase, parent = null, base = state;
    while (cbase = base.children) {
      parent = base;
      base = cbase[base.index];
    }
    return parent.children[0].name;
  }
  return undefined;
};
/*Method Name   : reducerCreate
    Description     : Created to handle Tab Actions
    Author          : Avnish Chuchra*/
const reducerCreate = params => {
  const defaultReducer = Reducer(params);
  return (state, action) => {
    // this part makes sure that when a menuIcon is pressed AND you are already in that menu tree,
    // it goes back to the root of that tree
    if (action.type === ActionConst.REFRESH) {
      // console.log('action.key######################$$$$$$$$$$$$$' + action.type);
      let activeTabName = getActiveTabName(state);
      action.key = activeTabName;
    }
    // if (inTabMenu(state)) {
    //   let activeTabName = getActiveTabName(state);
    //   console.log("--------------- activeTabName : " + activeTabName)
    //   console.log("--------------- action.key : " + action.key)
    //   // We only want to reset if the icon is tapped when we're already in the view
    //   if (activeTabName === action.key) {
    //     // if we're already at root, do not do anything.
    //     let rootName = getTabRootName(state);
    //     if (getTabTreeIndex(state) === 0) {
    //       if (action.key == 'productTab') {
    //         Actions.manageProduct({ type: 'reset' });
    //       }
    //       return state;
    //     }
    //     // snap to root.
    //     if (rootName) {
    //       previousState = state;
    //       return defaultReducer(state, { key: rootName });
    //     }
    //   }
    //   else if (inTabMenu(state)) {
    //     let activeTabName = getActiveTabName(state);
    //     let rootName = getTabRootName(state);
    //     if (action.key == 'homeTab') {
    //       // globalData.setselectedTab(1);
    //       Actions.home({ type: 'reset' });
    //     } else if (action.key == 'productTab') {
    //       // globalData.setselectedTab(2);
    //       Actions.manageProduct({ type: 'reset' });
    //     } else if (action.key == 'orderTab') {
    //       // globalData.setselectedTab(3);
    //       Actions.myOrder({ type: 'reset', refresh: {} });
    //     } else if (action.key == 'shopTab') {
    //       // globalData.setselectedTab(4);
    //       Actions.shop({ type: 'reset' });
    //     }
    //   }
    // } else if (action.type === ActionConst.PUSH) {
    //   let activeTabName = getActiveTabName(state);
    //   action.key = changeActionKey(activeTabName, action.key)
    // }
    previousState = state;
    return defaultReducer(state, action);
  }
};