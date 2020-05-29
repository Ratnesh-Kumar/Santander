import React, { Component } from 'react';
import Config from 'react-native-config';
import {
    Platform
} from 'react-native';
var singleInstance = null;

//TODO  Modify for other environemnets
const ENV_DEV = 'dev';
const ENV_PREPROD = 'preprod';
const ENV_PRD = 'prod'; //production

const PROTOCOL = 'https://';
const OD_DOMAIN = '.santander.com';

const DEV_COLLECTION_NAME = "santander_dev";
const PROD_COLLECTION_NAME = "santander_prod";

export default class Environment extends Component {

    constructor() {
        super();
        if (!singleInstance) {
            singleInstance = this;
        }
        return singleInstance;
    }

    getEnvironment() {
        //By default will pointing to sqm TODO changing to specific environment if Config.ENV is undefined
        var envType = (Config.ENV == undefined) ? ENV_DEV : Config.ENV;
        var environment = {}
        if (envType == ENV_DEV) {
            environment = {
                collectionName: DEV_COLLECTION_NAME
            };

        } else if (envType == ENV_PREPROD) {

            environment = {
                collectionName: DEV_COLLECTION_NAME
            };
        } else if (envType == ENV_PRD) {
            environment = {
                collectionName: PROD_COLLECTION_NAME
            };
        }
        environment.envType = envType;
        //Pass to Module ios and android
        return environment;
    }
}