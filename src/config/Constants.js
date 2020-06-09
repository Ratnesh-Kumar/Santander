import { Dimensions } from 'react-native';
import Environment from './Environment';
import * as RNLocalize from "react-native-localize";
var env = new Environment();

//API keys that are not able to keep on the .evn files for security reasons
//Environment definition  options sqm or sqs or prod
//*****************************************************************//
export const ENV = env.getEnvironment();
export const COLLECTION_NAME = ENV.collectionName;
export const WEB_CLIENT_ID = ENV.webClientID;
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const FETCHING_TODOS = 'FETCHING_TODOS';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';
export const UNDERLINE_COLOR_ANDROID = 'transparent';
export const API_URL = BASE_URL + "/api/v1/employees";
export const LOGIN_BUTTON_TEXT = "Sign In with email";
export const ERROR_TEXT_INPUT_PASSWORD = "Please enter password";
export const TEXT_INPUT_PASSWORD ="passwordInput";
export const LABEL_PASSWORD = "Password";
export const ERROR_TEXT_INPUT_USERNAME = "Please enter your username/email";
export const TEXT_INPUT_USERNAME = "loginInputName";
export const LABEL_USERNAME = "Username";
export const EYE_ICON = require('../public/images/eye_invisible.png');
export const EYE_ICON_VISIBLE = require('../public/images/eye_visible.png');
export const DEFAULT_CITY_IMG = 'https://images.pexels.com/photos/59519/pexels-photo-59519.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb';
export const PRIMARY_TEXT_COLOR = "#e6e6ff";

export const LOCALE_EN = "en";
export const LOCALE_ES = "es";

//API urls
export const COUNTRY_NAME = RNLocalize.getCountry();
export const DEVICE_LOCALE = RNLocalize.getLocales()[0].languageTag;
export const BASE_URL = "http://3.135.192.164";
export const IDENTITY_SERVICE_PORT =":8096";
export const PARTY_SERVICE_PORT =":8094";
export const BASE_IDENTITY_SERVICE_URL = BASE_URL+IDENTITY_SERVICE_PORT;
export const BASE_PARTY_SERVICE_URL = BASE_URL+PARTY_SERVICE_PORT;
export const USER_REGISTRATION_URL = BASE_IDENTITY_SERVICE_URL+"/v1/users";
export const USER_LOGIN_URL = BASE_IDENTITY_SERVICE_URL+"/v1/users/login";
export const USER_REGISTERED_STATUS = "Registered";
export const USER_RESET_PASSWORD_URL=BASE_IDENTITY_SERVICE_URL+"/v1/users/forgotpassword";
export const USER_RESET_PASSWORD_STATUS="OK";
export const USER_LOGIN_STATUS = "Login Success";

//Party Shop API Url

export const CREATE_SHOP_URL = BASE_PARTY_SERVICE_URL+"/v1/party/shop";
export const CREATE_SHOP_STATUS = "Success";

