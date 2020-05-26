import constants from '../Config/Constants';

export default {
  getListOfDealers: () =>
    fetch(`${constants.API_URL}/users`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }),
};
