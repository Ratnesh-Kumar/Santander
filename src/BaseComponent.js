import React, { Component } from 'react';

export default class BaseComponent extends Component {

    constructor() {
        super();
        
    }

    setUserIdFlurry(userId)
    {
        
    }
    logEventFlurry(eventName) {
        
    }

    componentDidMount() {
        
    }
    isValidArray(dataArray) {
        if (dataArray != '' && dataArray != undefined && dataArray.length > 0) {
            return true;
        }
        return false;
    }

    isValidString(data) {
        if (data != '' && data != undefined && data != null && data != NaN) {
            return true;
        }
        return false;
    }

}