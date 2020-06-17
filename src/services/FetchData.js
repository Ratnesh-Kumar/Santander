//const URI = 'https://jsonplaceholder.typicode.com/users';

import { AsyncStorage } from 'react-native';
import GlobalData from '../utils/GlobalData';
var globalData = new GlobalData();

const IDENTITY_POST_HEADER = {
  "Content-Type": "application/json;charset=utf-8",
  "Accept": "application/json",
  "SAN.AppId": "SAN.digitalShop",
  "SAN.AppSecret": "4d9100df-8187-406e-836f-721d04767874"
}
const PARTY_POST_HEADER = {
  "Content-Type": "application/json;charset=utf-8",
  "Accept": "application/json",
  "SAN.AppId": "SAN.digitalShop",
  "SAN.AppSecret": "a847fc1b-632a-4dbf-8fac-4ed55c722c3d"
}

function getTranscationPostHeader() {
  return {
    "Content-Type": "application/json;charset=utf-8",
    "Accept": "application/json",
    "SAN.AppId": "SAN.digitalShop",
    "SAN.AppSecret": "47baaefc-0603-486b-bce8-04e68bbf488f",
    "SAN.Key": globalData.getUserInfo().key,
    "SAN.Id": globalData.getUserInfo().username
  }
}

function getPartyPostHeader() {
  return {
    "Content-Type": "application/json;charset=utf-8",
    "Accept": "application/json",
    "SAN.AppId": "SAN.digitalShop",
    "SAN.AppSecret": "47baaefc-0603-486b-bce8-04e68bbf488f",
    "SAN.Key": globalData.getUserInfo().key,
    "SAN.Id": globalData.getUserInfo().username
  }
}

function fetchJsonGET(url) {
  return new Promise(function (resolve, reject) {
    fetch(url, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'SAN.AppId': 'SAN.digitalShop',
        'SAN.AppSecret': '4d9100df-8187-406e-836f-721d04767874',
        'Content-Type': 'application/json',
        'Connection': 'keep-alive',
        'Accept-Language': 'en;q=1',
        'Accept-Encoding': 'application/json',
        'Pragma': 'no-cache',
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        resolve(responseData);
      })
      .catch((error) => {
        console.log('There has been a problem with your fetch operation: fetchJsonGET' + error.message);
        reject(error.message);
      }).done();
  }
  )
}

function fetchProductGET(url) {
  return new Promise(function (resolve, reject) {
    fetch(url, {
      method: "GET",
      headers: getPartyPostHeader(),
    })
      .then((response) => response.json())
      .then((responseData) => {
        resolve(responseData);
      })
      .catch((error) => {
        console.log('There has been a problem with your fetch operation: fetchJsonGET' + error.message);
        reject(error.message);
      }).done();
  }
  )
}

function fetchCampaignGET(url) {
  return new Promise(function (resolve, reject) {
    fetch(url, {
      method: "GET",
      headers: getTranscationPostHeader(),
    })
      .then((response) => response.json())
      .then((responseData) => {
        resolve(responseData);
      })
      .catch((error) => {
        console.log('There has been a problem with your fetch operation: fetchJsonGET' + error.message);
        reject(error.message);
      }).done();
  }
  )
}


function fetchIdentityPOST(urlString, bodyData) {
  return new Promise(function (resolve, reject) {
    fetch(urlString, {
      method: "POST",
      timeout: 2000,
      headers: IDENTITY_POST_HEADER,
      body: JSON.stringify(bodyData),
    })
      .then((response) => response.json())
      .then((responseData) => {
        resolve(responseData);
      })
      .catch((error) => {
        error.message = "Unable to communicate with server.";
        console.log('There has been a problem with your fetch operation: fetchIdentityPOST');

        resolve(error.message);
        reject(() => {
        });
      }).done();
  }
  )
}

function fetchPartyPOST(urlString, bodyData) {
  return new Promise(function (resolve, reject) {
    fetch(urlString, {
      method: "POST",
      timeout: 2000,
      headers: getPartyPostHeader(),
      body: JSON.stringify(bodyData),
    })
      .then((response) => response.json())
      .then((responseData) => {
        resolve(responseData);
      })
      .catch((error) => {
        error.message = "Unable to communicate with server.";
        console.log('There has been a problem with your fetch operation: fetchPartyPOST');

        resolve(error.message);
        reject(() => {
        });
      }).done();
  }
  )
}

function fetchCampaignPOST(urlString, bodyData) {
  return new Promise(function (resolve, reject) {
    fetch(urlString, {
      method: "POST",
      timeout: 2000,
      headers: getTranscationPostHeader(),
      body: JSON.stringify(bodyData),
    })
      .then((response) => response.json())
      .then((responseData) => {
        resolve(responseData);
      })
      .catch((error) => {
        error.message = "Unable to communicate with server.";
        console.log('There has been a problem with your fetch operation: fetchPartyPOST');

        resolve(error.message);
        reject(() => {
        });
      }).done();
  }
  )
}


function fetchProductPOST(urlString, bodyData) {
  return new Promise(function (resolve, reject) {
    fetch(urlString, {
      method: "POST",
      timeout: 2000,
      headers: getPartyPostHeader(),
      body: JSON.stringify(bodyData),
    })
      .then((response) => response.json())
      .then((responseData) => {
        resolve(responseData);
      })
      .catch((error) => {
        error.message = "Unable to communicate with server.";
        console.log('There has been a problem with your fetch operation: fetchPartyPOST');

        resolve(error.message);
        reject(() => {
        });
      }).done();
  }
  )
}

function fetchProductPUT(urlString, bodyData) {
  return new Promise(function (resolve, reject) {
    fetch(urlString, {
      method: "PUT",
      timeout: 2000,
      headers: getPartyPostHeader(),
      body: JSON.stringify(bodyData),
    })
      .then((response) => response.json())
      .then((responseData) => {
        resolve(responseData);
      })
      .catch((error) => {
        error.message = "Unable to communicate with server.";
        console.log('There has been a problem with your fetch operation: fetchPartyPOST');

        resolve(error.message);
        reject(() => {
        });
      }).done();
  }
  )
}



export {
  fetchJsonGET,
  fetchProductGET,
  fetchCampaignGET,
  fetchCampaignPOST,
  fetchPartyPOST,
  fetchIdentityPOST,
  fetchProductPOST,
  fetchProductPUT
};