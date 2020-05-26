import React, { Component } from 'react';
import {
    TextInput,
    View,
    Image,
    TouchableOpacity,
    Platform,
    SegmentedControlIOS,
    Keyboard,
    SafeAreaView
} from 'react-native';
import headerStyle from './headerStyle';
import { Text } from 'native-base';
import { fetchJsonGET } from '../../services/FetchData'
import { Actions } from 'react-native-router-flux';
var headerConstants = require('./headerConstant')
var constants = require('../../config/Constants')
var colorConstants = require('../../config/colorConstant');

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }


    }
    componentDidMount() {
    }

    async fetchData() {
        let responseData = await fetchJsonGET(constants.API_URL);
        console.log("############### responseData")
    }


    render() {
        return (
            <SafeAreaView style={{
                backgroundColor: colorConstants.TBC_COLOR
            }}>

                {this.renderBrowseHeader()}

            </SafeAreaView>
        );
    }

    renderBrowseHeader() {
        let isleftArrowDisplay = this.props.isleftArrowDisplay === undefined ? true : this.props.isleftArrowDisplay
        return (
            <View style={headerStyle.viewContainer}>
                {this.renderLeftView(isleftArrowDisplay)}
                <Text style={headerStyle.headerText}>{this.props.title}</Text>
            </View>
        );
    }

    renderLeftView(flag) {
        if (flag) {
            return (<TouchableOpacity testID="browseHeader_button_leftArrow" accessibilityLabel="browseHeader_button_leftArrow" accessible={false} onPress={() => {
                Actions.pop();
            }}>
                <View testID="browseHeader_imageView_leftArrow" accessibilityLabel="browseHeader_imageView_leftArrow" style={headerStyle.leftImageView}>
                    <Image testID="browseHeader_image_leftArrow" accessibilityLabel="browseHeader_image_leftArrow" source={headerConstants.LEFT_ARROW} style={{ marging: 15, height: 20, width: 15, tintColor: 'white' }}>
                    </Image>
                </View>
            </TouchableOpacity>)
        } else {
            return <View></View>
        }

    }

    // renderCartLayout(flag) {
    //     if (!flag) {
    //         let cartItemCount = parseInt(this.props.cartItemCount);
    //         return (
    //             <TouchableOpacity
    //                 testID="browseHeader_button_cart"
    //                 accessibilityLabel="browseHeader_button_cart"
    //                 accessible={false}
    //                 onPress={() => {
    //                     firebaseAnalytics.logEvent('BROWSEHEADER_CLICK_CART');
    //                     Actions.cart();
    //                     // this.props.navigation.navigate('Cart', { onGoBack: this.props.onGoBack })
    //                 }}
    //                 style={{
    //                     width: constants.SCREEN_WIDTH / 8,
    //                     justifyContent: 'center',
    //                     alignItems: 'center',
    //                 }}>
    //                 {this.renderRedBubble(cartItemCount)}
    //                 <Image
    //                     testID="browseHeader_image_cart"
    //                     accessibilityLabel="browseHeader_image_cart"
    //                     style={{ height: 28, width: 28, resizeMode: 'contain', marginTop: 5 }} source={require('../../../public/images/icon-cart.png')} />
    //             </TouchableOpacity>
    //         )
    //     }


    // }
    // renderRedBubble(count) {
    //     var imageWidth = 22;
    //     let textSize = 11;
    //     if (count != '' && count != undefined) {
    //         var totalCountInt = parseInt(count);
    //         if (totalCountInt > 999) {
    //             imageWidth = imageWidth + 5
    //             textSize = 9;
    //         }
    //         if (totalCountInt > 99) {
    //             textSize = 10;
    //         }
    //     }
    //     if (count > 0) {
    //         return (
    //             <View
    //                 testID={"browseHeader_textView_itemCountRedBubble"} accessibilityLabel={"browseHeader_textView_itemCountRedBubble"}
    //                 style={{
    //                     backgroundColor: colorConstants.PREFERENCE_RED_TEXT_DARK,
    //                     width: imageWidth,
    //                     height: 22,
    //                     position: 'absolute',
    //                     top: -3,
    //                     right: 4,
    //                     borderRadius: 12,
    //                     justifyContent: 'center',
    //                     alignItems: 'center',
    //                     zIndex: 999
    //                 }}>
    //                 <Text testID={"browseHeader_text_itemCountRedBubble"} accessibilityLabel={"browseHeader_text_itemCountRedBubble"}
    //                     style={{ fontSize: textSize, color: 'white', fontWeight: 'bold' }}>{totalCountInt}</Text>
    //             </View>
    //         )
    //     }
    // }

    // renderLeftView(flag, isShoppingListFlag) {
    //     let isVisible = true;
    //     if (isShoppingListFlag) {
    //         if (!this.props.isComingFromShoppingListDetail) {
    //             isVisible = false
    //         }
    //     }
    //     if (isVisible) {
    //         return (
    //             <TouchableOpacity testID="browseHeader_button_leftArrow" accessibilityLabel="browseHeader_button_leftArrow" accessible={false} onPress={() => {
    //                 if (!flag) {
    //                     firebaseAnalytics.logEvent('BROWSEHEADER_CLICK_LEFTPRESSED');
    //                     this.props.leftPressed()
    //                 }
    //             }}>
    //                 <View testID="browseHeader_imageView_leftArrow" accessibilityLabel="browseHeader_imageView_leftArrow" style={header.leftImageView}>
    //                     <Image testID="browseHeader_image_leftArrow" accessibilityLabel="browseHeader_image_leftArrow" source={constant.LEFT_ARROW} style={[!flag ? header.arrowLeftImage : header.hideImageView, { height: 32, width: 32, }]}>
    //                     </Image>
    //                 </View>
    //             </TouchableOpacity>
    //         );
    //     }
    // }

    // renderSearchBox() {
    //     if (this.state.textInputStyle) {
    //         setTimeout(() => {
    //             this.handleRecentSearch(this.state.searchText);
    //         }, 500);
    //         this.setState({ textInputStyle: false })
    //     }
    //     return <View accessibilityLabel={"browseHeader_outerView_renderSearchBox" + this.props.title}
    //         testID={"browseHeader_outerView_renderSearchBox" + this.props.title} style={header.searchBoxMainContainer}>
    //         <View accessibilityLabel={"browseHeader_innerView_renderSearchBox" + this.props.title}
    //             testID={"browseHeader_innerView_renderSearchBox" + this.props.title} style={header.searchBoxTopView}>
    //             <View style={header.searchBox} accessibilityLabel="browseHeader_view_searchTextInput" testID="browseHeader_view_searchTextInput">
    //                 <View testID="browseHeader_imageView_iconSearch" accessibilityLabel="browseHeader_imageView_iconSearch" style={{ flex: 0 }}>
    //                     <Image testID="browseHeader_image_iconSearch" accessibilityLabel="browseHeader_image_iconSearch" style={[header.searchImage, { height: 16, width: 16 }]} source={constant.SEARCH_ICON} />
    //                 </View>
    //                 <View accessibilityLabel="browseHeader_textView_searchTextInput" testID="browseHeader_textView_searchTextInput" style={header.textInputEnd}>
    //                     <TextInput
    //                         ref={ref => this.searchProduct = ref}
    //                         style={header.searchTextInput}
    //                         placeholder={SEARCH_PRODUCTS}
    //                         placeholderTextColor={colorConstants.BLACK_COLOR}
    //                         underlineColorAndroid="transparent"
    //                         onChangeText={(text) => { this.onTextChange(text) }}
    //                         onFocus={() => { this.removedTextInput(!this.isValidString(this.state.searchText)); }}
    //                         onKeyPress={() => { "" }}
    //                         multiline={false}
    //                         autoFocus={true}
    //                         autoCapitalize={'none'}
    //                         value={this.state.searchText}
    //                         returnKeyType='search'
    //                         onSubmitEditing={(event) => { this.onSubmitEnter(this.state.searchText) }}
    //                         accessibilityLabel="browseHeader_textInput_searchTextInput" testID="browseHeader_textInput_searchTextInput"
    //                     />
    //                 </View>
    //                 {this.renderDeleteIcon(SEARCH_PRODUCTS)}
    //             </View>
    //         </View>
    //         {this.renderCancelButton()}
    //     </View>
    // }

    // seteSearchButton(isComingFromStoreMode) {
    //     if (!isComingFromStoreMode) {
    //         return (
    //             <TouchableOpacity testID="browseHeader_button_iconSearch" accessibilityLabel="browseHeader_button_iconSearch" accessible={false} onPress={() => {
    //                 if (firebaseAnalytics != null) {
    //                     firebaseAnalytics.logEvent('BROWSEHEADER_CLICK_SEARCHBTN');
    //                 }
    //                 if (!isComingFromStoreMode) {
    //                     this.setState({
    //                         isSearchVisible: true, textInputStyle: true
    //                     })
    //                 }
    //             }}>
    //                 <View testID="browseHeader_imageView_iconSearch" accessibilityLabel="browseHeader_imageView_iconSearch" style={header.rightImageView}>
    //                     <Image testID="browseHeader_image_iconSearch" accessibilityLabel="browseHeader_image_iconSearch" source={constant.SEARCH_ICON} style={!isComingFromStoreMode ? [header.searchHeaderImage, { height: 24, width: 24 }] : header.hideImageView}>
    //                     </Image>
    //                 </View>
    //             </TouchableOpacity>
    //         );
    //     }
    // }

    // onSubmitEnter(text) {
    //     let searchText = text;
    //     if (this.isValidString(searchText)) {
    //         let searchEmojiText = this.emojiFyText(searchText);
    //         this.saveRecentSearch(searchEmojiText);
    //         Actions.browseProductList({
    //             productTitle: searchEmojiText,
    //             isComingFromSearch: true,
    //             isComingFromPDP: this.props.isComingFromPDP
    //         })
    //         this.onCancelPressButton();
    //     }
    // }

    // onSubmitRecentSearchEnter(emojiText) {
    //     Actions.browseProductList({ productTitle: emojiText, isComingFromSearch: true, isRecentSearch: this.getIsRecentSearch(), })
    //     // this.props.navigation.push('BrowseProductList', { productTitle: emojiText, isComingFromSearch: true, isRecentSearch: this.getIsRecentSearch(), onGoBack: this.props.onGoBack })
    // }

    // handleIndexChange(index) {

    //     if (index === 0) {
    //         this.setState({
    //             selectedIndex: index,
    //             selectedIndexvalue: 'cartridge'
    //         });
    //     } else if (index === 1) {
    //         this.setState({
    //             selectedIndex: index,
    //             selectedIndexvalue: 'printer'
    //         });
    //     }
    //     if (this.state.showListView) {
    //         this.fetchRecommendedData(this.state.searchText);
    //     }
    // }
    // renderSegmentControl() {
    //     if (this.props.comingFrom == constants.CONST_COMING_FROM_INKFINDER) {
    //         if (Platform.OS === 'ios') {
    //             return (<SegmentedControlIOS
    //                 accessibilityLabel="browseHeader_segmentedControlTab_category" testID="browseHeader_segmentedControlTab_category"
    //                 values={['Cartridge Number', 'Printer Modal']}
    //                 selectedIndex={this.state.selectedIndex}
    //                 tintColor={colorConstants.BLUE_COLOR}
    //                 style={header.tabsContainerStyle}
    //                 onChange={(event) => {
    //                     this.handleIndexChange(event.nativeEvent.selectedSegmentIndex)
    //                 }}
    //             />);
    //         } else {
    //             return (
    //                 <SegmentedControlTab tabsContainerStyle={header.tabsContainerStyle}
    //                     accessibilityLabel="browseHeader_segmentedControlTab_category" testID="browseHeader_segmentedControlTab_category"
    //                     tabStyle={header.tabStyle}
    //                     tabTextStyle={header.tabTextStyle}
    //                     activeTabStyle={header.activeTabStyle}
    //                     activeTabTextStyle={header.activeTabTextStyle}
    //                     values={['Cartridge Number', 'Printer Modal']}
    //                     selectedIndex={this.state.selectedIndex}
    //                     onTabPress={this.handleIndexChange.bind(this)}
    //                 />
    //             );

    //         }
    //     }
    // }
    // onTextChange(text) {
    //     this.setState({ searchText: text })
    //     this.comingFrom = this.props.comingFrom;
    //     this.selectedIndex = this.state.selectedIndexvalue;
    //     let searchUnEmojiText = this.unEmojiFyText(text);
    //     this.setState({ searchText: text, searchFlag: false })
    //     this.handleRecentSearch(searchUnEmojiText);
    //     this.handleRecommendedData(searchUnEmojiText);
    //     // this.handleRecentSearch(text);
    //     // this.handleRecommendedData(text);
    // }

    // handleRecentSearch(text) {
    //     filteredRecentSearchArray = this.iterateRecentSearchArray(recentSearchArray, text);
    //     if (this.isValidArray(filteredRecentSearchArray)) {
    //         this.setSelectionListItem(filteredRecentSearchArray, constants.SUGGESTION_TITLE_RECENT_SEARCH);
    //         this.setState({
    //             showListView: true,
    //         })
    //     }
    // }
    // refreshRecentSearch() {
    //     //this.setSelectionListItem(responseData.searchSuggestions, constants.SUGGESTION_TITLE_RECOMMENDATION);
    //     this.setState({
    //         showListView: true,
    //     });
    // }

    // async handleRecommendedData(text) {
    //     let responseData = await this.fetchRecommendedData(text);
    //     if (this.isValidString(responseData)) {
    //         predictiveSearchArray = responseData.searchSuggestions;
    //     }
    //     if (this.isValidArray(predictiveSearchArray)) {
    //         this.setSelectionListItem(predictiveSearchArray, constants.SUGGESTION_TITLE_RECOMMENDATION);
    //         this.setState({
    //             showListView: true
    //         });
    //     }
    // }


    // renderCancelButton() {
    //     if (!this.state.textInputStyle) {
    //         return <TouchableOpacity accessibilityLabel="browseHeader_button_cancelText"
    //             testID="browseHeader_button_cancelText" style={header.othercontainer} onPress={() => { firebaseAnalytics.logEvent('BROWSEHEADER_CLICK_CANCELBTN'); this.onCancelPressButton() }}
    //             accessible={false}>
    //             <Text style={header.cancelText}
    //                 accessibilityLabel="browseHeader_text_cancelText"
    //                 testID="browseHeader_text_cancelText">{constant.CANCEL_TEXT}</Text>
    //         </TouchableOpacity>;
    //     }
    // }

    // onCancelPressButton() {
    //     Keyboard.dismiss();
    //     if (this.props.isComingFromShoppingListDetail) {
    //         this.props.onCancelPressed();
    //     }

    //     this.setState({
    //         isSearchVisible: false,
    //         textInputStyle: false,
    //         searchText: '',
    //         showListView: false
    //     });
    // }
    // renderDeleteIcon(inputType) {
    //     switch (inputType) {
    //         case SEARCH_PRODUCTS:
    //             if (this.state.searchText !== '') {
    //                 return (
    //                     <View style={{ flexDirection: 'row', marginRight: 0 }}>
    //                         <TouchableOpacity accessibilityLabel="browseHeader_button_deleteIcon" testID="browseHeader_button_deleteIcon" onPress={() => { firebaseAnalytics.logEvent('BROWSEHEADER_CLICK_DELETEICON'); this.onTextChange(''), this.setState({ searchText: '' }) }}
    //                             accessible={false}>
    //                             <Image style={header.deleteicon} source={constants.DELETE_ICON}
    //                                 accessibilityLabel="browseHeader_image_deleteIcon" testID="browseHeader_image_deleteIcon" />
    //                         </TouchableOpacity>
    //                     </View>
    //                 );
    //             } else if (!this.state.textInputStyle) {
    //                 return (
    //                     <View style={{ flexDirection: 'row', marginRight: 5 }}>
    //                         <TouchableOpacity testID="homeHeader_button_scanIcon"
    //                             accessibilityLabel="homeHeader_button_scanIcon" accessible={false}
    //                             onPress={() => { Actions.qrcode(); }}>
    //                             <Image testID="homeHeader_image_scanIcon" accessibilityLabel="homeHeader_image_scanIcon" style={[header.scanIcon, { height: 18, resizeMode: 'contain', marginTop: 2 }]} source={constant.BARCODE_ICON} />
    //                         </TouchableOpacity>
    //                     </View>
    //                 );
    //             }
    //             break;
    //     }
    // }

    isValidString(data) {
        if (data != '' && data != undefined) {
            return true;
        }
        return false;
    }
}
