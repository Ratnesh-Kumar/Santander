import React, { Component } from 'react';
var singleInstance = null;
var isFirebaseInitialize = false;
var verifyEmail = false;
var googleUserInfo = '';
var isAddCampaignStart = false;
var constants = require('../config/Constants');

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
var isTrackQuantityDisplay = false;
var isBusinessProfileFBPage = false;
var isBusinessProfileYelp = false;
var userInfo = "";
var userTokenKey = "";
var titleCampaign = "";
var imageCampaign = "";
var descriptionCampaign = "";
var quantityCampaign = 1;
var categoriesCampaign = "";
var variantsCampaign = "";
var priceCampaign = 0;
var salesPriceCampaign = 0;
var salesTaxType = '';
var salesTax = 0;
var imagePathCampaign = "";
var imagePathProduct = "";
var s3BucketName = "";
var s3RegsionName = "";
var s3accessKey = "";
var s3SecretKey = "";
var successActionStatus = 201;
var businessId = '';
var shopName = '';
var shopAutoCreated = false;
var salesTaxTypeList = [];
export class GlobalData extends Component {
    constructor() {
        super();
        if (!singleInstance) {
            singleInstance = this;
        }
        return singleInstance;
    }

    setS3BucketName(bucketName) {
        s3BucketName = bucketName;
    }
    getS3BucketName() {
        return s3BucketName;
    }
    setS3RegionName(regionName) {
        s3RegsionName = regionName;
    }
    getS3RegionName() {
        return s3RegsionName;
    }
    setS3SecretKey(secretKey) {
        s3SecretKey = secretKey;
    }
    getS3SecretKey() {
        return s3SecretKey;
    }
    setS3AccessKey(accessKey) {
        s3accessKey = accessKey;
    }
    getS3AccessKey() {
        return s3accessKey;
    }
    setSuccessActionStatus(actionStatus) {
        successActionStatus = actionStatus;
    }
    setSuccessActionStatus() {
        return successActionStatus;
    }
    setTitleCampaign(title) {
        titleCampaign = title;
    }
    getTitleCampaign() {
        return titleCampaign;
    }

    setIsAutoCrated(flag) {
        shopAutoCreated = flag;
    }
    getIsAutoCreated() {
        return shopAutoCreated;
    }
    setImagePathCampaign(path) {
        imagePathCampaign = path;
    }
    getImagePathCampaign() {
        return imagePathCampaign;
    }

    setImagePathProduct(path) {
        imagePathProduct = path;
    }
    getImagePathProduct() {
        return imagePathProduct;
    }

    setImageCampaign(image) {
        imageCampaign = image;
    }
    getImageCampaign() {
        return imageCampaign;
    }
    setPriceCampaign(price) {
        priceCampaign = price;
    }
    getPriceCampaign() {
        return priceCampaign;
    }
    setSalesPriceCampaign(price) {
        salesPriceCampaign = price;
    }
    getSalesPriceCampaign() {
        return salesPriceCampaign;
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

    setTrackQuantityDisplay(flag) {
        isTrackQuantityDisplay = flag
    }

    isTrackQuantityDisplay() {
        return isTrackQuantityDisplay;
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

    setBusinessProfileFBPage(flag) {
        isBusinessProfileFBPage = flag;
    }

    isBusinessProfileFBPage() {
        return isBusinessProfileFBPage;
    }

    setBusinessProfileYelp(flag) {
        isBusinessProfileYelp = flag;
    }

    isBusinessProfileYelp() {
        return isBusinessProfileYelp;
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

    setSalesTaxType(TaxType) {
        salesTaxType = TaxType;
    }

    getSalesTaxType() {
        return salesTaxType;
    }

    setSalesTax(Tax) {
        salesTax = Tax;
    }

    getSalesTax() {
        return salesTax;
    }

    setBusinessId(text) {
        businessId = text;
    }
    getBusinessId() {
        return businessId;
    }

    setShopName(text) {
        shopName = text;
    }
    getShopName() {
        return shopName;
    }

    setSalesTaxTypeList(list) {
        if (this.isValidArray(list)) {
            salesTaxTypeList = JSON.parse(list);
            for (let i = 0; i < salesTaxTypeList.length; i++) {
                if (constants.COUNTRY_NAME == salesTaxTypeList[i].code) {
                    this.setSalesTax(salesTaxTypeList[i].rate);
                    this.setSalesTaxType(salesTaxTypeList[i].type);
                }
            }
        }
    }
    getSalesTaxTypeList() {
        return salesTaxTypeList;
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

export default GlobalData;
