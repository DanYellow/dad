import Utils from './Utils'

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
   * Retrieve classified advertisements for a given params (page, category, query/search)
   * @param  {Object} [params={p: 1, q: null, cat: null}]          queryString params
   * @param  {[type]} successCallback Callback function success to call when API call succeed
   * @param  {[type]} errorCallback   Callback function fail to call when API call failed
   * @return null
   */
  static getClassifiedAdvertisements(params={p: 1, q: null, cat: null}, successCallback, errorCallback) {
    let request = new Request(`${APIManager.baseURL}/classified_advertisements${Utils.objectToQueryString(params)}`, APIManager.fetchConfig);
    console.log(errorCallback)
    fetch(request, {method: 'GET'}).then(function(response) {
      return response.json();
    }).then(function(data) {
      console.log(data, "trtrtr");
      successCallback(data);
    }).catch(function() {
      errorCallback("Booo");
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
    let request = new Request(`${APIManager.baseURL}/classified_advertisement?id=${id}`, APIManager.fetchConfig);

    fetch(request, {method: 'GET'}).then(function(response) {
      return response.json();
    }).then(function(data) {
      successCallback(data);
    }).catch(function() {
      errorCallback("Booo");
    });
  }

  /**
   * Create a classified advertisement
   * @param  {Object} params      [description]
   * @param  {Function} successCallback [description]
   * @param  {Function} errorCallback   [description]
   * @return null
   */
  static createClassifiedAdvertisement(params, successCallback, errorCallback) {
    // APIManager.axios.post('/classified_advertisement', {
    //   data: {
    //     title: queryStringParams.title,
    //     description: queryStringParams.description,
    //     price: queryStringParams.price,
    //   }
    // })
    // .then(function (response) {
    //   console.log('response', response)
    //   successCallback(response.data);
    // })
    // .catch(function (error) {
    //   errorCallback(error);
    // });
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
   * @param  {Number} id              Id of the classified advertisement to delete
   * @param  {Function} successCallback callback function success to call when API call succeed
   * @param  {Function} errorCallback   callback function fail to call when API call failed
   * @return null
   */
  static deleteClassifiedAdvertisement(id, successCallback, errorCallback) {
    let request = new Request(`${APIManager.baseURL}/classified_advertisement?id=${id}`, APIManager.fetchConfig);

    fetch(request, {method: 'DELETE'}).then(function(response) {
      return response.json();
    }).then(function(data) {
      successCallback(data);
    }).catch(function() {
      errorCallback("Booo");
    });
  }
}

APIManager.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api' : 'http://localhost:9000/api'

APIManager.header = new Headers();

APIManager.fetchConfig = { 
  headers: APIManager.header,
  mode: 'cors',
  cache: 'default'
};
