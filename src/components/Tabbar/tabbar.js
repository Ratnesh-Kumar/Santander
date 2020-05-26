import React, { Component } from 'react';
import ScarletScreen from '../../scenes/TScenes/ScarletScreen';
import GrayScreen from '../../scenes/TScenes/GrayScreen';
import BlueScreen from '../../scenes/TScenes/BlueScreen';
import FBaseWrite from '../../scenes/FirebaseRW/FBaseWrite';
import FBaseReadItems from '../../scenes/FirebaseRW/FBaseReadItems';
import GoldScreen from '../../scenes/TScenes/GoldScreen';
import BlackScreen from '../../scenes/TScenes/BlackScreen';
import ModalScreen from '../../scenes/TScenes/ModalScreen';
import SearchScreen from '../../scenes/SearchScreen';
import { Router, Scene, ActionConst } from 'react-native-router-flux';
import TabIcon from '../TabIcon'
import {
StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
        alignItems: 'center',
    },

    tabBarStyle: {
        backgroundColor: '#fff',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#ddd',
    },
});

class Tabbar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Scene key="baseRoot" hideNavBar>
                {/* Tab Container */}
                <Scene
                    key="tabbar"
                    tabs={true}
                    tabBarStyle={styles.tabBarStyle} tabBarSelectedItemStyle={styles.tabBarStyle} hideNavBar={true} showLabel={false}>
                    {/* Tab and it's scenes */}
                    <Scene key="osu" title="OSU" icon={TabIcon} hideNavBar>
                        <Scene key="scarlet" component={ScarletScreen} title="Scarlet" />
                        <Scene key="gray" component={GrayScreen} title="Gray" hideNavBar />
                        <Scene
                            key="SearchScreenWithTabs"
                            component={SearchScreen}
                            title="Search With tabs"
                            direction="vertical"
                        />
                    </Scene>

                    {/* Tab and it's scenes */}
                    <Scene key="um" title="UM" icon={TabIcon} hideNavBar>
                        <Scene key="blue" component={BlueScreen} title="Blue" hideNavBar />
                        <Scene key="fbai" component={FBaseWrite} title="FB Add Item" />
                        <Scene key="fbri" component={FBaseReadItems} title="FB Read" />
                    </Scene>

                    {/* Tab and it's scenes */}
                    <Scene key="vu" title="VU" icon={TabIcon} hideNavBar>
                        <Scene key="gold" component={GoldScreen} title="Gold" />
                        <Scene key="black" component={BlackScreen} title="Black" />
                    </Scene>
                </Scene>
                <Scene
                    key="modal"
                    direction="vertical"
                    component={ModalScreen}
                    title="Modal"
                    hideNavBar
                />
                <Scene
                    key="SearchScreen"
                    component={SearchScreen}
                    title="Search"
                    duration={0}
                />
                {this.renderTabbar()}
            </Scene>
        )
    }

    
}
export default Tabbar;