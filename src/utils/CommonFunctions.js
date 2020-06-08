import { Component } from "react";
import {Linking} from 'react-native';
let facebookParameters = ""
let TwitterParameters = '';
let FacebookShareURL= "https://img.freepik.com/free-vector/broken-frosted-glass-realistic-icon_1284-12125.jpg?size=338&ext=jpg";
let FacebookShareMessage= 'facebook share';
let TwitterShareURL= 'https://aboutreact.com';
let TweetContent= 'Hello Guys, This is a testing of twitter share example';
let TwitterViaAccount= 'AboutReact';
var singleInstance = null;

export class CommonFunctions extends Component {
    constructor() {
        super();
        if (!singleInstance) {
            singleInstance = this;
        }
        return singleInstance;
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
        Linking.openURL(url)
            .then(data => {
                console.log('@@@@@@@@@@@@@@@@@@@@@@@Twitter Opened url :' + url);
            })
            .catch(() => {
                console.log('######################Something went wrong');
            });
    };

    postOnFacebook = () => {
        if (FacebookShareURL != undefined) {
            if (facebookParameters.includes("?") == false) {
                facebookParameters = facebookParameters + "?u=" + encodeURI(FacebookShareURL) + "&hashtag=" + ("%23tag");
            } else {
                facebookParameters = facebookParameters + "&u=" + encodeURI(FacebookShareURL) + "&hashtag=" + ("%23tag");
            }
        }
        if (FacebookShareMessage != undefined) {
            if (facebookParameters.includes("?") == false) {
                facebookParameters = facebookParameters + "?quote=" + encodeURI(FacebookShareMessage) + "&hashtag=" + ("%23tag");
            } else {
                facebookParameters = facebookParameters + "&quote=" + encodeURI(FacebookShareMessage) + "&hashtag=" + ("%23tag");
            }
        }
        let url = 'https://www.facebook.com/sharer/sharer.php' + facebookParameters;
        console.log("##########################################" + url)
        Linking.openURL(url).then((data) => {

        }).catch(() => {
            console.log('Something went wrong');
        });
    }
}
export default CommonFunctions;
