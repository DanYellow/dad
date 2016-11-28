import axios from 'axios'

export default class APIManager {
  /**
   * Retrieve classified advertisements for a given category
   * @param  {String?} category        classified advertisements category
   * @param  {Number?} page            page of classified advertisements to retrieve contents
   * @param  {Function} successCallback callback function success to call when API call succeed
   * @param  {Function} errorCallback   callback function fail to call when API call failed
   * @return null
   */
  static getClassifiedAdvertisements(category = "all", page = 1, successCallback, errorCallback) {
    APIManager.instance.get('/classifiedadvertisements', {
        params: {
          category: category,
          page: page
        }
      })
      .then(function (response) {
        successCallback(response);
      })
      .catch(function (error) {
        errorCallback(error);
      });
  }

  /**
   * Retrieve one classified advertisement for a given id
   * @param  {Number} id              Id of the classified advertisement
   * @param  {Function} successCallback callback function success to call when API call succeed
   * @param  {Function} errorCallback   callback function fail to call when API call failed
   * @return null
   */
  static getClassifiedAdvertisement(id, successCallback, errorCallback) {
    APIManager.instance.get('/classifiedadvertisement', {
        params: {
          id: id
        }
      })
      .then(function (response) {
        successCallback(response);
      })
      .catch(function (error) {
        errorCallback(error);
      });
  }
}

APIManager.instance = axios.create({
  baseURL: 'http:localhost:3000',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
