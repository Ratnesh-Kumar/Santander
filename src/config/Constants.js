import { Dimensions } from 'react-native';

//API keys that are not able to keep on the .evn files for security reasons
//Environment definition  options sqm or sqs or prod
//*****************************************************************//

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const FETCHING_TODOS = 'FETCHING_TODOS';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';
export const UNDERLINE_COLOR_ANDROID = 'transparent';
export const BASE_URL = "http://dummy.restapiexample.com";
export const API_URL = BASE_URL + "/api/v1/employees";
export const LOGIN_BUTTON_TEXT = "Login";
export const ERROR_TEXT_INPUT_PASSWORD = "Please enter password";
export const TEXT_INPUT_PASSWORD ="passwordInput";
export const LABEL_PASSWORD = "Password";
export const ERROR_TEXT_INPUT_USERNAME = "Please enter your username/email";
export const TEXT_INPUT_USERNAME = "loginInputName";
export const LABEL_USERNAME = "Username";
export const EYE_ICON = require('../public/images/eye_icon.png');
export const DEFAULT_CITY_IMG = 'https://images.pexels.com/photos/59519/pexels-photo-59519.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb';
export const PRIMARY_TEXT_COLOR = "#e6e6ff";

