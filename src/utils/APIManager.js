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

  // slant
  /*** 
   *       ________                _ _____          __   ___       __                __  _                                __      
   *      / ____/ /___ ___________(_) __(_)__  ____/ /  /   | ____/ /   _____  _____/ /_(_)_______  ____ ___  ___  ____  / /______
   *     / /   / / __ `/ ___/ ___/ / /_/ / _ \/ __  /  / /| |/ __  / | / / _ \/ ___/ __/ / ___/ _ \/ __ `__ \/ _ \/ __ \/ __/ ___/
   *    / /___/ / /_/ (__  |__  ) / __/ /  __/ /_/ /  / ___ / /_/ /| |/ /  __/ /  / /_/ (__  )  __/ / / / / /  __/ / / / /_(__  ) 
   *    \____/_/\__,_/____/____/_/_/ /_/\___/\__,_/  /_/  |_\__,_/ |___/\___/_/   \__/_/____/\___/_/ /_/ /_/\___/_/ /_/\__/____/  
   *                                                                                                                              
   */

  /**
   * Retrieve classified advertisements for a given params (page, category, query/search)
   * @param  {Object} [params={p: 1, q: null, cat: null}]          queryString params
   * @param  {[type]} successCallback Callback function success to call when API call succeed
   * @param  {[type]} errorCallback   Callback function fail to call when API call failed
   * @return null
   */
  static getClassifiedAdvertisements(params={p: 1, q: null, cat: null}, successCallback, errorCallback) {

    let request = new Request(`${APIManager.baseURL}/classified_advertisements/${params.p}${Utils.objectToQueryString(params)}`, APIManager.fetchConfig);
    fetch(request, {method: 'GET'}).then(function(response) {
      return response.json();
    }).then(function(data) {
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
    let request = new Request(`${APIManager.baseURL}/classified_advertisement/${id}`, APIManager.fetchConfig);

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
    let request = new Request(`${APIManager.baseURL}/classified_advertisement/${bodyParams.id}`, APIManager.fetchConfig);

    fetch(request, {method: 'POST'}).then(function(response) {
      return response.json();
    }).then(function(data) {
      successCallback(data);
    }).catch(function() {
      errorCallback("Booo");
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


  /***
   *       _____ _             ____         _______ _             __  __    
   *      / ___/(_)___ _____  /  _/___    _/_/ ___/(_)___ _____  / / / /___ 
   *      \__ \/ / __ `/ __ \ / // __ \ _/_/ \__ \/ / __ `/ __ \/ / / / __ \
   *     ___/ / / /_/ / / / // // / / //_/  ___/ / / /_/ / / / / /_/ / /_/ /
   *    /____/_/\__, /_/ /_/___/_/ /_/_/   /____/_/\__, /_/ /_/\____/ .___/ 
   *           /____/                             /____/           /_/      
   */
  static signIn(formDatas, successCallback, errorCallback) {
    let request = new Request(`${APIManager.baseURL}/api/get_token`, APIManager.fetchConfig);

    fetch(request, {method: 'POST'}).then(function(response) {
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
APIManager.header.append('X-TOKEN', window.sessionStorage.getItem('token'));

APIManager.fetchConfig = { 
  headers: APIManager.header,
  mode: 'cors',
  cache: 'default'
};
