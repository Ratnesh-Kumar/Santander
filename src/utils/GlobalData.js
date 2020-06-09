import React, { Component } from 'react';
var singleInstance = null;
var isFirebaseInitialize = false;
var verifyEmail = false;
var googleUserInfo = '';
var isAddCampaignStart = false;

//Add publish remote config flag
var isEmailEnabled = false;
var isFacebookMarketplaceEnabled = false;
var isFacebookMessangerEnable = false;
var isFacebookPageEnabled = false;
var isFacebookShopEnabled = false;
var isInstagramEnabled = false;
var isPinterestEnabled = false;
var isTextSmsEnabled = false;
var isWhatsAppEnable = false;
var userInfo = "";
var userTokenKey = "";
var titleCampaign = "";
var imageCampaign = "";
var descriptionCampaign = "";
var quantityCampaign = 0;
var categoriesCampaign = "";
var variantsCampaign = "";

export class GlobalData extends Component {
    constructor() {
        super();
        if (!singleInstance) {
            singleInstance = this;
        }
        return singleInstance;
    }

    setTitleCampaign(title) {
        titleCampaign = title;
    }
    getTitleCampaign() {
        return titleCampaign;
    }

    setImageCampaign(image) {
        imageCampaign = image;
    }
    getImageCampaign() {
        return imageCampaign;
    }

    setdescriptionCampaign(description) {
        descriptionCampaign = description;
    }
    getdescriptionCampaign() {
        return descriptionCampaign;
    }

    setQuantityCampaign(quantity) {
        quantityCampaign = quantity;
    }
    getQuantityCampaign() {
        return quantityCampaign;
    }

    setCategoriesCampaign(categories) {
        categoriesCampaign = categories;
    }
    getCategoriesCampaign() {
        return categoriesCampaign;
    }
    setVariantsCampaign(variants) {
        variantsCampaign = variants;
    }
    getVariantsCampaign() {
        return variantsCampaign;
    }

    setFirebaseInitialize(flag) {
        isFirebaseInitialize = flag;
    }

    isFirebaseInitialize() {
        return isFirebaseInitialize;
    }

    setVerifyEmail(flag) {
        verifyEmail = flag;
    }

    isVerifyEmail() {
        return verifyEmail;
    }

    setGoogleUserInfo(userInfo) {
        googleUserInfo = userInfo;
    }

    getGoogleUserInfo() {
        return googleUserInfo;
    }

    setAddCampaignStart(flag) {
        isAddCampaignStart = flag;
    }

    isAddCampaignStart() {
        return isAddCampaignStart;
    }

    setEmailEnabled(flag) {
        isEmailEnabled = flag;
    }

    isEmailEnabled() {
        return isEmailEnabled;
    }

    setWhatsAppEnable(flag) {
        isWhatsAppEnable = flag;
    }

    isWhatsAppEnable() {
        return isWhatsAppEnable;
    }

    setTextSmsEnabled(flag) {
        isTextSmsEnabled = flag;
    }

    isTextSmsEnabled() {
        return isTextSmsEnabled;
    }

    setPinterestEnabled(flag) {
        isPinterestEnabled = flag;
    }

    isPinterestEnabled() {
        return isPinterestEnabled;
    }

    setInstagramEnabled(flag) {
        isInstagramEnabled = flag;
    }

    isInstagramEnabled() {
        return isInstagramEnabled;
    }

    setFacebookShopEnabled(flag) {
        isFacebookShopEnabled = flag;
    }

    isFacebookShopEnabled() {
        return isFacebookShopEnabled;
    }

    setFacebookPageEnabled(flag) {
        isFacebookPageEnabled = flag;
    }

    isFacebookPageEnabled() {
        return isFacebookPageEnabled;
    }

    setFacebookMessangerEnable(flag) {
        isFacebookMessangerEnable = flag;
    }

    isFacebookMessangerEnable() {
        return isFacebookMessangerEnable;
    }

    setFacebookMarketplaceEnabled(flag) {
        isFacebookMarketplaceEnabled = flag;
    }

    isFacebookMarketplaceEnabled() {
        return isFacebookMarketplaceEnabled;
    }

    setUserInfo(info) {
        userInfo = info;
    }

    getUserInfo() {
        return userInfo;
    }

    setUserTokenKey(key) {
        userTokenKey = key;
    }

    getUserTokenKey() {
        return userTokenKey;
    }
}

export default GlobalData;
