import axios from 'axios'

export default class APIManager {

  static getMessageForStatusCode(statusCode) {
    let message = '';
    switch (statusCode) {
      case 1000:
        message = 'Élément crée';
        break;
      case 1001:
        message = 'Élément mis à jour';
        break;
      case 1002:
        message = 'Élément supprimé';
        break;
      case 1004:
        message = 'Élément non trouvé';
        break;
      case 1005:
        message = 'Token invalide';
        break;
      default:
        message = '';
        break;
    }
    return message;
  }

  /**
   * Retrieve classified advertisements for a given category
   * @param  {String} [category=all]      Classified advertisements category
   * @param  {Number} [page=1]            Page of classified advertisements to retrieve contents
   * @param  {String} [query=null]        User research
   * @param  {Function} successCallback Callback function success to call when API call succeed
   * @param  {Function} errorCallback   Callback function fail to call when API call failed
   * @return null
   */
  static getClassifiedAdvertisements(category = 'all', page = 1, query = null, successCallback, errorCallback) {
    APIManager.axios.get('/classified_advertisements', {
      params: {
        p: page,
        q: query,
        cat: category
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
   * Create a classified advertisement
   * @param  {Object} bodyParams      [description]
   * @param  {Function} successCallback [description]
   * @param  {Function} errorCallback   [description]
   * @return null
   */
  static createClassifiedAdvertisement(bodyParams, successCallback, errorCallback) {
    APIManager.axios.post('/classified_advertisement', {
      data: {
        title: bodyParams.title,
        description: bodyParams.description,
        price: bodyParams.price,
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
   * Update a classified advertisement
   * @param  {[type]} bodyParams      [description]
   * @param  {[type]} successCallback [description]
   * @param  {[type]} errorCallback   [description]
   * @return {[type]}                 [description]
   */
  static updateClassifiedAdvertisement(bodyParams, successCallback, errorCallback) {
    APIManager.axios.post(`/classified_advertisement/${bodyParams.id}`, {
      data: {
        title: bodyParams.title,
        description: bodyParams.description,
        price: bodyParams.price,
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
   * Delete a classified advertisement
   * @param  {Object} bodyParams      [description]
   * @param  {Function} successCallback [description]
   * @param  {Function} errorCallback   [description]
   * @return null
   */
  static deleteClassifiedAdvertisement(bodyParams, successCallback, errorCallback) {
    APIManager.axios.delete(`/classified_advertisement/${bodyParams.id}`)
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
  // static getClassifiedAdvertisement(id, successCallback, errorCallback) {
  //   APIManager.axios.get(`/classified_advertisement?id=${id}`)
  //   .then(function (response) {
  //     successCallback(response);
  //   })
  //   .catch(function (error) {
  //     errorCallback(error);
  //   });
  // }
}

APIManager.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api' : 'http://localhost:9000/api'

APIManager.axios = axios.create({
  baseURL: APIManager.baseURL,
  timeout: 1000,
  headers: { 'X-TOKEN': window.sessionStorage.getItem('session_token') }
});
