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
}

export default GlobalData;
