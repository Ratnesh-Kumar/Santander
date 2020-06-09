//const URI = 'https://jsonplaceholder.typicode.com/users';
const POST_HEADER = {
  "Content-Type": "application/json;charset=utf-8",
  "Accept": "application/json",
  "SAN.AppId": "SAN.digitalShop",
  "SAN.AppSecret": "4d9100df-8187-406e-836f-721d04767874"
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


function fetchJsonPOST(urlString, bodyData) {
  return new Promise(function (resolve, reject) {
    fetch(urlString, {
      method: "POST",
      timeout: 2000,
      headers: POST_HEADER,
      body: JSON.stringify(bodyData),
    })
      .then((response) => response.json())
      .then((responseData) => {
        resolve(responseData);
      })
      .catch((error) => {
        error.message = "Unable to communicate with server.";
        console.log('There has been a problem with your fetch operation: fetchJsonPOST' + constants.UNABLE_TO_COMMUNICATE);

        resolve(error.message);
        reject(() => {
        });
      }).done();
  }
  )
}

export {
  fetchJsonGET,
  fetchJsonPOST
};