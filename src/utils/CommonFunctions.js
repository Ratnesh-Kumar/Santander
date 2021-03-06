import React, { Component } from 'react';
import { Linking } from 'react-native';
import { Actions } from "react-native-router-flux";
import ImgToBase64 from 'react-native-image-base64';

let facebookParameters = ""
let TwitterParameters = '';
// let FacebookShareURL = "https://img.freepik.com/free-vector/broken-frosted-glass-realistic-icon_1284-12125.jpg?size=338&ext=jpg";
let FacebookShareURL = "https://www.santanderbank.com/"
let FacebookShareMessage = '';
let TwitterShareURL = 'https://aboutreact.com';
let TweetContent = 'Hello Guys, This is a testing of twitter share example';
let TwitterViaAccount = 'AboutReact';
var singleInstance = null;


export class CommonFunctions extends Component {
    constructor() {
        super();
        if (!singleInstance) {
            singleInstance = this;
        }
        return singleInstance;
    }
    async getDataUrl(img) {
        // Create canvas
        return await ImgToBase64.getBase64String(img)
            .then(base64String => doSomethingWith(base64String))
            .catch(err => doSomethingWith(err));
    }

    tweetNow = () => {
        if (TwitterShareURL != undefined) {
            if (TwitterParameters.includes('?') == false) {
                TwitterParameters =
                    TwitterParameters + '?url=' + encodeURI(TwitterShareURL);
            } else {
                TwitterParameters =
                    TwitterParameters + '&url=' + encodeURI(TwitterShareURL);
            }
        }
        if (TweetContent != undefined) {
            if (TwitterParameters.includes('?') == false) {
                TwitterParameters =
                    TwitterParameters + '?text=' + encodeURI(TweetContent);
            } else {
                TwitterParameters =
                    TwitterParameters + '&text=' + encodeURI(TweetContent);
            }
        }
        if (TwitterViaAccount != undefined) {
            if (TwitterParameters.includes('?') == false) {
                TwitterParameters =
                    TwitterParameters + '?via=' + encodeURI(TwitterViaAccount) + "&hashtags=" + encodeURI("test,santandar");
            } else {
                TwitterParameters =
                    TwitterParameters + '&via=' + encodeURI(TwitterViaAccount) + "&hashtags=" + encodeURI("test,santandar");;
            }
        }
        let url = 'https://twitter.com/intent/tweet' + TwitterParameters;
        Actions.browser(url);
        // Linking.openURL(url)
        //     .then(data => {
        //         console.log('@@@@@@@@@@@@@@@@@@@@@@@Twitter Opened url :' + url);
        //     })
        //     .catch(() => {
        //         console.log('######################Something went wrong');
        //     });
    };

    isValidString(strText) {
        if (strText.toString().trim() !== "" && strText.toString().trim() !== " " && strText.toString().trim() !== undefined && strText.toString().trim() !== null) {
            return true;
        }
        return false;
    }

    postOnFacebook = (globalData) => {
        var campaignTitle = (this.isValidString(globalData.getTitleCampaign())) ? (globalData.getTitleCampaign().trim() + '\n\r') : "\n\r";
        var campaignProductDescription = (this.isValidString(globalData.getdescriptionCampaign())) ? (globalData.getdescriptionCampaign().trim() + '\n\r') : "\n\r";
        var campaignQuantity = (this.isValidString(globalData.getQuantityCampaign())) ? (globalData.getQuantityCampaign().toString().trim() + '\n\r') : "\n\r";
        var campaignPrice = (this.isValidString(globalData.getPriceCampaign())) ? (globalData.getPriceCampaign().toString().trim() + '\n\r') : "\n\r";
        var campaignSalesPrice = (this.isValidString(globalData.getSalesPriceCampaign())) ? globalData.getSalesPriceCampaign().toString().trim() : "\n\r";
        FacebookShareMessage = (campaignTitle + "Product Description :" + campaignProductDescription + "Available Quantity :" + campaignQuantity + "Price :" + campaignPrice + "Sale Price :" + campaignSalesPrice);
        FacebookShareURL = (globalData.getImagePathCampaign() !== "") ? globalData.getImagePathCampaign() : FacebookShareURL;
        if (FacebookShareURL != undefined) {
            if (facebookParameters.includes("?") == false) {
                facebookParameters = facebookParameters + "?u=" + encodeURI(FacebookShareURL) + "&hashtag=" + ("%23" + globalData.getCategoriesCampaign());
            } else {
                facebookParameters = facebookParameters + "&u=" + encodeURI(FacebookShareURL) + "&hashtag=" + ("%23" + globalData.getCategoriesCampaign());
            }
        }
        if (FacebookShareMessage != undefined) {
            if (facebookParameters.includes("?") == false) {
                facebookParameters = facebookParameters + "?quote=" + encodeURI(FacebookShareMessage);
            } else {
                facebookParameters = facebookParameters + "&quote=" + encodeURI(FacebookShareMessage);
            }
        }
        let url = 'https://www.facebook.com/sharer/sharer.php' + facebookParameters;
        Actions.browser({ url: url });
    }
}
export default CommonFunctions;
