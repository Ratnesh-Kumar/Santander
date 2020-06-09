//const URI = 'https://jsonplaceholder.typicode.com/users';
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
        console.log('There has been a problem with your fetch operation: fetchIdentityPOST' + constants.UNABLE_TO_COMMUNICATE);

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
      headers: PARTY_POST_HEADER,
      body: JSON.stringify(bodyData),
    })
      .then((response) => response.json())
      .then((responseData) => {
        resolve(responseData);
      })
      .catch((error) => {
        error.message = "Unable to communicate with server.";
        console.log('There has been a problem with your fetch operation: fetchPartyPOST' + constants.UNABLE_TO_COMMUNICATE);

        resolve(error.message);
        reject(() => {
        });
      }).done();
  }
  )
}

export {
  fetchJsonGET,
  fetchPartyPOST,
  fetchIdentityPOST
};