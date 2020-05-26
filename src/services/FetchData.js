//const URI = 'https://jsonplaceholder.typicode.com/users';

function fetchJsonGET(url) {
  return new Promise(function (resolve, reject) {
    fetch(url, {
      method: "GET",
      headers: {
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


function fetchJsonPOST(urlString) {
  //console.log('@@AppID - ' + AppID)
  //console.log('@@DeviceInfo.getUserAgent() - ' + DeviceInfo.getUserAgent())
  return new Promise(function (resolve, reject) {
    fetch(urlString, {
      method: "POST",
      timeout: 2000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
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