import React, { Component } from 'react';
import { Linking } from 'react-native';
import { Actions } from "react-native-router-flux";
import ImgToBase64 from 'react-native-image-base64';
import { ShareDialog } from 'react-native-fbsdk';

let facebookParameters = ""
let TwitterParameters = '';
// let FacebookShareURL = "https://img.freepik.com/free-vector/broken-frosted-glass-realistic-icon_1284-12125.jpg?size=338&ext=jpg";
let FacebookShareURL = "https://www.santanderbank.com/"
let FacebookShareMessage = '';
let TwitterShareURL = 'https://aboutreact.com';
let TweetContent = 'Hello Guys, This is a testing of twitter share example';
let TwitterViaAccount = 'AboutReact';
var singleInstance = null;
var image = require('../public/images/barcode_icon.png')
var base64Image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII=";
const sharePhotoContent = {
    contentType: 'photo',
    photos: [{ imageUrl: image }],
    redirect_uri: "https://www.santanderbank.com/",
    hashtag: "test",
    quote: "abcd \nefgh"
}
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

    shareOnFacebook() {
        var tmp = this;
        ShareDialog.show(sharePhotoContent);
    }
    postOnFacebook = (globalData) => {
        FacebookShareMessage = (globalData.getTitleCampaign() + '\n\r'+ "Product Description :" + globalData.getdescriptionCampaign() + '\n\r' + "Available Quantity :" + globalData.getQuantityCampaign() + '\n\r' + "Price :" + globalData.getPriceCampaign() + '\n\r' + "Sale Price :" + globalData.getSalesPriceCampaign());
        if (FacebookShareURL != undefined) {
            if (facebookParameters.includes("?") == false) {
                facebookParameters = facebookParameters + "?u=" + encodeURI(FacebookShareURL) + "&hashtag=" + ("%23" + globalData.getCategoriesCampaign()) + "&title=" + "&images=" + { base64Image };
            } else {
                facebookParameters = facebookParameters + "&u=" + encodeURI(FacebookShareURL) + "&hashtag=" + ("%23" + globalData.getCategoriesCampaign()) + "&images=" + { base64Image };
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
