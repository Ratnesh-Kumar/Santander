import { db } from './db';
import firebase from "react-native-firebase"

//New Firebase DB Structure calls
function getFBRealtimeDBFeatureFlags() {
    let pathForValue = "/FeatureFlag";
   
    return new Promise(function (resolve, reject) {
        let userMobilePath = pathForValue;
        var itemsRef;

        itemsRef = db.ref(userMobilePath);
        itemsRef.on('value', (snapshot) => {
            let data = snapshot.val();
            resolve(data);
        }, function (err) {
            console.log("Firebase Error");
            reject(err);
        });
    })
}
export {
    getFBRealtimeDBFeatureFlags
};
