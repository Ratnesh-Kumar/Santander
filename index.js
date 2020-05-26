/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Client} from 'bugsnag-react-native';

const bugsnag = new Client('e08179c820ef3268ff07fd7750b725c2');
AppRegistry.registerComponent(appName, () => App);
bugsnag.notify(new Error('Test error'));
