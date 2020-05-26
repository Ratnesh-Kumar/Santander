import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';
import { fetchJsonGET, fetchJsonPOST } from '../../services/FetchData'
import BaseComponent from '../../BaseComponent';
import SearchBar from '../../components/homeSearchBar';
import SquareBox from './homeTopSquareBox'
import CarouselView from '../../components/CarouselView';
import Carousel from 'react-native-snap-carousel';
var constants = require('../../config/Constants')
var colorConstants = require('../../config/colorConstant')
var homeConstants = require('./homeConstants');
import homeStyle from './homeStyle';

export default class HomeScreen extends BaseComponent {
    constructor(props) {
        super(props)
        this.state = {
            employeeList: [],
            showFlatList: false,
            loadingString: 'Fetching...',
            activeIndex: 0
        }
    }

    componentDidMount() {
        // this.fetchData()
    }

    async fetchData() {
        let responseData = await fetchJsonGET(constants.API_URL);
        console.log("fetchdata :" + JSON.stringify(responseData));
        if (this.isValidString(responseData)) {
            if (responseData.status === "success") {
                if (this.isValidArray(responseData.data)) {
                    this.setState({
                        employeeList: responseData.data
                    })
                }
            }
        }
        return responseData;
    }

    render() {
        return (
            <View style={homeStyle.container}>
                <SearchBar />
                <View style={homeStyle.viewContainer}>
                    <ScrollView style={{ flex: 1 }}>
                        {this.renderSquareBox()}
                        {this.renderCarouselView()}
                    </ScrollView>
                </View>
            </View>
        );
    }

    renderCarouselView() {
        return (
            <View>
                <CarouselView entriesData={homeConstants.CAROUSEL_HOME_TOP_ARRAY} title={homeConstants.TOP_HOME_CAROUSEL_TITLE} darkTheme={false} />
                <View style={{ marginTop: 10 }}>
                    <CarouselView entriesData={homeConstants.CAROUSEL_HOME_BOTTOM_ARRAY} title={homeConstants.BOTTOM_HOME_CAROUSEL_TITLE} darkTheme={true} />
                </View>
                {/* <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                <Carousel
                  layout={"default"}
                  ref={ref => this.carousel = ref}
                  data={homeConstants.CAROUSEL_HOME_ARRAY}
                  sliderWidth={300}
                  itemWidth={300}
                  renderItem={this._renderItem}
                  onSnapToItem = { index => this.setState({activeIndex:index}) } /> */}
            </View>
        );
    }

    _renderItem({ item, index }) {
        return (
            <View style={{
                backgroundColor: 'floralwhite',
                borderRadius: 5,
                height: 250,
                padding: 50,
                marginLeft: 25,
                marginRight: 25,
            }}>
                <Text style={{ fontSize: 30 }}>{item.title}</Text>
                <Text>{item.text}</Text>
            </View>

        )
    }

    renderSquareBox() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <SquareBox title={homeConstants.SQUARE_BOX_ONE_TITLE}
                    squareBoxClicked={() => {
                        alert('Square Box One');
                    }} />
                <SquareBox title={homeConstants.SQUARE_BOX_TWO_TITLE}
                    squareBoxClicked={() => {
                        alert('Square Box Two');
                    }} />
                <SquareBox title={homeConstants.SQUARE_BOX_THREE_TITLE}
                    squareBoxClicked={() => {
                        alert('Square Box Three');
                    }} />
            </View>
        )
    }

    renderFlatList() {
        return (
            <View>
                <FlatList
                    extraData={this.state}
                    ref={ref => (this.listView = ref)}
                    renderItem={data => this.renderItem(data.item)}
                    data={this.state.employeeList}
                    ListHeaderComponent={() => this.renderHeaderView()}
                    ItemSeparatorComponent={(sectionId, rowId) => (
                        <View key={rowId} style={homeStyle.seperateLine} />
                    )}
                />
            </View>
        )
    }

    renderHeaderView() {
        return (
            <View style={homeStyle.homeListHeaderView}>
                <Text style={homeStyle.homeListHeaderText}>{homeConstants.LIST_HEADER}</Text>
            </View>
        )
    }

    renderItem(employeeItem) {
        return (
            <View style={homeStyle.renderItemContainer}>
                <View style={homeStyle.seperateLine} />
                <View style={homeStyle.renderItemMainView}>
                    <View style={homeStyle.renderItemSubView}>
                        <Text style={homeStyle.renderItemText}>{homeConstants.LIST_ROW_NAME}</Text>
                        <Text style={{}}>{employeeItem.employee_name}</Text>
                    </View>
                    <View style={homeStyle.renderItemSubViewOne}>
                        <Text style={homeStyle.renderItemText}>{homeConstants.LIST_ROW_AGE}</Text>
                        <Text style={{}}>{employeeItem.employee_age}</Text>
                    </View>
                </View>
            </View>
        );
    }
}


